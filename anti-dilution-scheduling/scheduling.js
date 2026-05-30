(function () {
  var SUPABASE_URL = "https://vhayeiyuafaltrfnbqce.supabase.co";
  var SUPABASE_PUBLIC_KEY = "REPLACE_WITH_SUPABASE_PUBLIC_ANON_KEY";
  var TABLE_NAME = "meeting_availability";
  var LAST_NAME_KEY = "myta_anti_dilution_last_name";
  var SLOT_START_MINUTES = 7 * 60;
  var SLOT_END_MINUTES = 23 * 60;
  var SLOT_SIZE_MINUTES = 30;
  var DAY_KEYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  var DAY_LABELS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  var SHORT_DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  var weekLabel = document.querySelector("[data-week-label]");
  var nameInput = document.querySelector("[data-name-input]");
  var timezoneSelect = document.querySelector("[data-timezone-select]");
  var saveButton = document.querySelector("[data-save-button]");
  var refreshButton = document.querySelector("[data-refresh-button]");
  var statusMessage = document.querySelector("[data-status-message]");
  var grid = document.querySelector("[data-grid]");
  var bestTimes = document.querySelector("[data-best-times]");
  var participants = document.querySelector("[data-participants]");

  if (!grid || !nameInput || !timezoneSelect || !saveButton) {
    return;
  }

  var supabaseClient = null;
  var weekStart = getRelevantWeekStart(new Date());
  var selectedSlots = new Set();
  var records = [];
  var isDragging = false;
  var dragShouldSelect = true;
  var pointerHandledCell = false;
  var currentMatchedName = "";

  function pad(number) {
    return String(number).padStart(2, "0");
  }

  function formatDateKey(date) {
    return date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate());
  }

  function addDays(date, days) {
    var next = new Date(date);
    next.setDate(next.getDate() + days);
    return next;
  }

  function getRelevantWeekStart(date) {
    var local = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    var day = local.getDay();
    var offset = day === 0 ? 1 : 1 - day;
    return formatDateKey(addDays(local, offset));
  }

  function getWeekDates() {
    var parts = weekStart.split("-").map(Number);
    var monday = new Date(parts[0], parts[1] - 1, parts[2]);
    return DAY_KEYS.map(function (_, index) {
      return addDays(monday, index);
    });
  }

  function formatLongDate(date) {
    return new Intl.DateTimeFormat(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    }).format(date);
  }

  function formatShortDate(date) {
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric"
    }).format(date);
  }

  function formatSlotTime(minutes) {
    var hours = Math.floor(minutes / 60);
    var mins = minutes % 60;
    var suffix = hours >= 12 ? "PM" : "AM";
    var displayHour = hours % 12 || 12;
    return displayHour + ":" + pad(mins) + " " + suffix;
  }

  function minutesToValue(minutes) {
    return pad(Math.floor(minutes / 60)) + ":" + pad(minutes % 60);
  }

  function getSlotId(dayIndex, minutes) {
    return weekStart + "|" + DAY_KEYS[dayIndex] + "|" + minutesToValue(minutes);
  }

  function parseSlot(slotId) {
    var parts = String(slotId).split("|");
    var dayIndex = DAY_KEYS.indexOf(parts[1]);
    var timeParts = (parts[2] || "00:00").split(":").map(Number);
    return {
      dayIndex: dayIndex,
      minutes: timeParts[0] * 60 + timeParts[1]
    };
  }

  function normalizeName(name) {
    return name.trim().replace(/\s+/g, " ");
  }

  function displayName(name) {
    return normalizeName(name)
      .toLowerCase()
      .replace(/\b\w/g, function (letter) {
        return letter.toUpperCase();
      });
  }

  function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = "scheduler-status " + type;
    statusMessage.hidden = false;
  }

  function clearStatus() {
    statusMessage.textContent = "";
    statusMessage.hidden = true;
  }

  function isConfigured() {
    return SUPABASE_PUBLIC_KEY && SUPABASE_PUBLIC_KEY.indexOf("REPLACE_WITH") === -1;
  }

  function initSupabase() {
    if (!isConfigured()) {
      showStatus("Supabase public key is not configured yet. Add the browser-safe anon key to this page before saving availability.", "error");
      return;
    }

    if (!window.supabase || !window.supabase.createClient) {
      showStatus("Supabase could not load. Check the network connection and try again.", "error");
      return;
    }

    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
  }

  function populateTimezones() {
    var browserTimezone = "America/New_York";

    try {
      browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || browserTimezone;
    } catch (error) {
      browserTimezone = "America/New_York";
    }

    var zones = [
      browserTimezone,
      "America/New_York",
      "America/Chicago",
      "America/Denver",
      "America/Los_Angeles",
      "America/Phoenix",
      "Europe/London",
      "Europe/Paris",
      "Asia/Kolkata",
      "Asia/Shanghai",
      "Asia/Tokyo",
      "Australia/Sydney"
    ];

    if (Intl.supportedValuesOf) {
      try {
        zones = [browserTimezone].concat(Intl.supportedValuesOf("timeZone"));
      } catch (error) {
        zones = zones;
      }
    }

    Array.from(new Set(zones)).forEach(function (zone) {
      var option = document.createElement("option");
      option.value = zone;
      option.textContent = zone;
      timezoneSelect.appendChild(option);
    });

    timezoneSelect.value = browserTimezone;
  }

  function setWeekLabel() {
    var dates = getWeekDates();
    weekLabel.textContent = "Week of " + formatLongDate(dates[0]) + " to " + formatLongDate(dates[6]);
  }

  function renderGrid() {
    grid.innerHTML = "";
    var dates = getWeekDates();
    var corner = document.createElement("div");
    corner.className = "grid-day grid-corner";
    corner.textContent = "Time";
    grid.appendChild(corner);

    dates.forEach(function (date, index) {
      var day = document.createElement("div");
      day.className = "grid-day";
      day.innerHTML = SHORT_DAY_LABELS[index] + "<small>" + formatShortDate(date) + "</small>";
      grid.appendChild(day);
    });

    for (var minutes = SLOT_START_MINUTES; minutes < SLOT_END_MINUTES; minutes += SLOT_SIZE_MINUTES) {
      var time = document.createElement("div");
      time.className = "grid-time";
      time.textContent = formatSlotTime(minutes);
      grid.appendChild(time);

      for (var dayIndex = 0; dayIndex < 7; dayIndex += 1) {
        var slotId = getSlotId(dayIndex, minutes);
        var cell = document.createElement("button");
        cell.type = "button";
        cell.className = "grid-cell";
        cell.dataset.slotId = slotId;
        cell.setAttribute("aria-label", DAY_LABELS[dayIndex] + " at " + formatSlotTime(minutes));
        cell.addEventListener("pointerdown", handlePointerDown);
        cell.addEventListener("pointerenter", handlePointerEnter);
        cell.addEventListener("click", handleCellClick);
        grid.appendChild(cell);
      }
    }

    document.addEventListener("pointerup", function () {
      isDragging = false;
    });

    updateGrid();
  }

  function getSlotCounts() {
    var counts = {};
    records.forEach(function (record) {
      getRecordSlots(record).forEach(function (slotId) {
        counts[slotId] = counts[slotId] || [];
        if (counts[slotId].indexOf(record.participant_name) === -1) {
          counts[slotId].push(record.participant_name);
        }
      });
    });
    return counts;
  }

  function updateGrid() {
    var counts = getSlotCounts();
    var maxCount = Math.max(records.length, 1);
    grid.querySelectorAll(".grid-cell").forEach(function (cell) {
      var slotId = cell.dataset.slotId;
      var count = counts[slotId] ? counts[slotId].length : 0;
      cell.className = "grid-cell";
      if (count > 0) {
        cell.classList.add("heat-" + Math.min(5, Math.ceil((count / maxCount) * 5)));
      }
      if (selectedSlots.has(slotId)) {
        cell.classList.add("is-selected");
        cell.setAttribute("aria-pressed", "true");
      } else {
        cell.setAttribute("aria-pressed", "false");
      }
      cell.title = count ? count + " available: " + counts[slotId].join(", ") : "No one available yet";
    });
    renderBestTimes();
    renderParticipants();
  }

  function handlePointerDown(event) {
    isDragging = true;
    pointerHandledCell = true;
    dragShouldSelect = !selectedSlots.has(event.currentTarget.dataset.slotId);
    setSlot(event.currentTarget.dataset.slotId, dragShouldSelect);
  }

  function handlePointerEnter(event) {
    if (!isDragging) {
      return;
    }
    setSlot(event.currentTarget.dataset.slotId, dragShouldSelect);
  }

  function handleCellClick(event) {
    if (isDragging || pointerHandledCell) {
      pointerHandledCell = false;
      return;
    }
    toggleSlot(event.currentTarget.dataset.slotId);
  }

  function setSlot(slotId, shouldSelect) {
    if (shouldSelect) {
      selectedSlots.add(slotId);
    } else {
      selectedSlots.delete(slotId);
    }
    updateGrid();
  }

  function toggleSlot(slotId) {
    if (selectedSlots.has(slotId)) {
      selectedSlots.delete(slotId);
    } else {
      selectedSlots.add(slotId);
    }
    updateGrid();
  }

  function getRecordSlots(record) {
    if (Array.isArray(record.availability_slots)) {
      return record.availability_slots;
    }
    if (typeof record.availability_slots === "string") {
      try {
        var parsed = JSON.parse(record.availability_slots);
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        return [];
      }
    }
    return [];
  }

  function renderParticipants() {
    participants.innerHTML = "";
    if (!records.length) {
      participants.innerHTML = '<p class="empty-state">No one has submitted availability for this week yet.</p>';
      return;
    }

    records.forEach(function (record) {
      var item = document.createElement("article");
      item.className = "participant-item";
      var updated = record.updated_at || record.created_at;
      var updatedText = updated ? new Intl.DateTimeFormat(undefined, {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit"
      }).format(new Date(updated)) : "Recently";
      item.innerHTML = "<strong>" + record.participant_name + "</strong><p>" + getRecordSlots(record).length + " slots selected. Updated " + updatedText + ".</p>";
      participants.appendChild(item);
    });
  }

  function getBestWindows() {
    var counts = getSlotCounts();
    var windows = [];
    var current = null;

    for (var dayIndex = 0; dayIndex < 7; dayIndex += 1) {
      current = null;
      for (var minutes = SLOT_START_MINUTES; minutes < SLOT_END_MINUTES; minutes += SLOT_SIZE_MINUTES) {
        var slotId = getSlotId(dayIndex, minutes);
        var names = counts[slotId] || [];
        var key = names.slice().sort().join("|");
        if (!names.length) {
          if (current) {
            windows.push(current);
            current = null;
          }
          continue;
        }
        if (current && current.dayIndex === dayIndex && current.namesKey === key && current.end === minutes) {
          current.end = minutes + SLOT_SIZE_MINUTES;
        } else {
          if (current) {
            windows.push(current);
          }
          current = {
            dayIndex: dayIndex,
            start: minutes,
            end: minutes + SLOT_SIZE_MINUTES,
            count: names.length,
            names: names.slice().sort(),
            namesKey: key
          };
        }
      }
      if (current) {
        windows.push(current);
      }
    }

    return windows.sort(function (a, b) {
      if (b.count !== a.count) {
        return b.count - a.count;
      }
      if ((b.end - b.start) !== (a.end - a.start)) {
        return (b.end - b.start) - (a.end - a.start);
      }
      if (a.dayIndex !== b.dayIndex) {
        return a.dayIndex - b.dayIndex;
      }
      return a.start - b.start;
    }).slice(0, 3);
  }

  function renderBestTimes() {
    bestTimes.innerHTML = "";
    if (!records.length) {
      bestTimes.innerHTML = '<p class="empty-state">No one has submitted availability for this week yet.</p>';
      return;
    }

    var windows = getBestWindows();
    if (!windows.length) {
      bestTimes.innerHTML = '<p class="empty-state">No availability has been selected yet.</p>';
      return;
    }

    if (records.length === 1) {
      var singleNote = document.createElement("p");
      singleNote.className = "empty-state";
      singleNote.textContent = "One person has submitted. Overlap gets more useful after more people respond.";
      bestTimes.appendChild(singleNote);
    }

    windows.forEach(function (windowItem) {
      var item = document.createElement("article");
      item.className = "best-time";
      if (records.length > 1 && windowItem.count === records.length) {
        item.classList.add("perfect");
      }
      item.innerHTML = "<strong>" + DAY_LABELS[windowItem.dayIndex] + ", " + formatSlotTime(windowItem.start) + " to " + formatSlotTime(windowItem.end) + "</strong><p>" + windowItem.count + " available: " + windowItem.names.join(", ") + "</p>";
      bestTimes.appendChild(item);
    });
  }

  async function loadAvailability() {
    if (!supabaseClient) {
      return;
    }

    clearStatus();
    var response = await supabaseClient
      .from(TABLE_NAME)
      .select("*")
      .eq("week_start", weekStart)
      .order("updated_at", { ascending: false });

    if (response.error) {
      showStatus("We could not load shared availability. Check the Supabase table, RLS policy, and public key.", "error");
      return;
    }

    records = response.data || [];
    updateGrid();
    restoreCurrentParticipantSlots();
  }

  async function saveAvailability() {
    if (!supabaseClient) {
      showStatus("Supabase public key is not configured yet. Add the browser-safe anon key before saving availability.", "error");
      return;
    }

    var participantName = displayName(nameInput.value);
    var timezone = timezoneSelect.value;

    if (!participantName) {
      showStatus("Enter your name before saving.", "error");
      nameInput.focus();
      return;
    }

    if (!timezone) {
      showStatus("Select a timezone before saving.", "error");
      timezoneSelect.focus();
      return;
    }

    if (!selectedSlots.size) {
      showStatus("Select at least one available time before saving.", "error");
      grid.focus();
      return;
    }

    var payload = {
      week_start: weekStart,
      participant_name: participantName,
      timezone: timezone,
      availability_slots: Array.from(selectedSlots).sort(),
      updated_at: new Date().toISOString()
    };

    saveButton.disabled = true;
    saveButton.textContent = "Saving...";

    var response = await supabaseClient
      .from(TABLE_NAME)
      .upsert(payload, { onConflict: "week_start,participant_name" })
      .select();

    saveButton.disabled = false;
    saveButton.textContent = "Save availability";

    if (response.error) {
      showStatus("We could not save your availability. Please try again.", "error");
      return;
    }

    try {
      window.localStorage.setItem(LAST_NAME_KEY, participantName);
    } catch (error) {
      // Saving the shared record matters more than remembering the local name.
    }

    nameInput.value = participantName;
    showStatus("Availability saved.", "success");
    await loadAvailability();
  }

  function restoreCurrentParticipantSlots() {
    var participantName = displayName(nameInput.value);
    if (!participantName || participantName === currentMatchedName) {
      return;
    }
    currentMatchedName = participantName;
    var record = records.find(function (item) {
      return displayName(item.participant_name) === participantName;
    });
    if (record) {
      selectedSlots = new Set(getRecordSlots(record));
      updateGrid();
    }
  }

  function restoreLastName() {
    try {
      var saved = window.localStorage.getItem(LAST_NAME_KEY);
      if (saved) {
        nameInput.value = saved;
      }
    } catch (error) {
      return;
    }
  }

  function init() {
    populateTimezones();
    restoreLastName();
    setWeekLabel();
    renderGrid();
    initSupabase();
    loadAvailability();

    saveButton.addEventListener("click", saveAvailability);
    refreshButton.addEventListener("click", loadAvailability);
    nameInput.addEventListener("change", restoreCurrentParticipantSlots);
    nameInput.addEventListener("blur", function () {
      nameInput.value = displayName(nameInput.value);
      restoreCurrentParticipantSlots();
    });
    timezoneSelect.addEventListener("change", function () {
      clearStatus();
    });
  }

  init();
})();
