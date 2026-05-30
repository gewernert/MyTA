(function () {
  var SUPABASE_URL = "https://vhayeiyuafaltrfnbqce.supabase.co";
  var SUPABASE_PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoYXllaXl1YWZhbHRyZm5icWNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwODgwNDgsImV4cCI6MjA5NTY2NDA0OH0.cOeVUWGxTMRlBQl7VoL-F1PQp1N1bVXiFVv6tpyCeFY";
  var TABLE_NAME = "meeting_availability";
  var LAST_NAME_KEY = "myta_anti_dilution_last_name";
  var SLOT_START_MINUTES = 7 * 60;
  var SLOT_END_MINUTES = 23 * 60;
  var SLOT_SIZE_MINUTES = 30;
  var DAY_COUNT = 8;

  var TEAM_MEMBERS = [
    { key: "grant_goldsmith", displayName: "Grant Goldsmith", aliases: ["grant", "grant goldsmith"] },
    { key: "gavin_wernert", displayName: "Gavin Wernert", aliases: ["gavin", "gavin wernert"] },
    { key: "mark_rome", displayName: "Mark Rome", aliases: ["mark", "mark rome"] },
    { key: "paul_cavounis", displayName: "Paul Cavounis", aliases: ["paul", "paul cavounis"] }
  ];

  var TIMEZONES = [
    { label: "Eastern", value: "America/New_York" },
    { label: "Central", value: "America/Chicago" },
    { label: "Mountain", value: "America/Denver" },
    { label: "Pacific", value: "America/Los_Angeles" }
  ];

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
  var weekStart = getSchedulingStart(new Date());
  var selectedSlots = new Set();
  var records = [];
  var isDragging = false;
  var dragShouldSelect = true;
  var pointerHandledCell = false;
  var currentMatchedIdentity = "";

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

  function getSchedulingStart(date) {
    return formatDateKey(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
  }

  function getScheduleDates() {
    var parts = weekStart.split("-").map(Number);
    var start = new Date(parts[0], parts[1] - 1, parts[2]);
    return Array.from({ length: DAY_COUNT }, function (_, index) {
      return addDays(start, index);
    });
  }

  function formatShortDate(date) {
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric"
    }).format(date);
  }

  function formatDayShort(date) {
    return new Intl.DateTimeFormat(undefined, {
      weekday: "short"
    }).format(date);
  }

  function formatSlotTime(minutes) {
    var hours = Math.floor(minutes / 60);
    var mins = minutes % 60;
    var suffix = hours >= 12 ? "PM" : "AM";
    var displayHour = hours % 12 || 12;
    return displayHour + ":" + pad(mins) + " " + suffix;
  }

  function formatCompactTime(minutes) {
    var hours = Math.floor(minutes / 60);
    var mins = minutes % 60;
    var suffix = hours >= 12 ? "p" : "a";
    var displayHour = hours % 12 || 12;
    return mins ? displayHour + ":" + pad(mins) + suffix : displayHour + suffix;
  }

  function minutesToValue(minutes) {
    return pad(Math.floor(minutes / 60)) + ":" + pad(minutes % 60);
  }

  function getSlotId(dayIndex, minutes) {
    return weekStart + "|" + formatDateKey(getScheduleDates()[dayIndex]) + "|" + minutesToValue(minutes);
  }

  function parseSlot(slotId) {
    var parts = String(slotId).split("|");
    var dates = getScheduleDates().map(formatDateKey);
    var dayIndex = dates.indexOf(parts[1]);
    var timeParts = (parts[2] || "00:00").split(":").map(Number);
    return {
      dayIndex: dayIndex,
      minutes: timeParts[0] * 60 + timeParts[1]
    };
  }

  function normalizeName(name) {
    return String(name || "").trim().replace(/\s+/g, " ");
  }

  function normalizeKey(name) {
    return normalizeName(name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");
  }

  function titleCaseName(name) {
    return normalizeName(name)
      .toLowerCase()
      .replace(/\b\w/g, function (letter) {
        return letter.toUpperCase();
      });
  }

  function getParticipantIdentity(name) {
    var cleanName = normalizeName(name);
    var alias = cleanName.toLowerCase();
    var matched = TEAM_MEMBERS.find(function (member) {
      return member.aliases.indexOf(alias) !== -1;
    });

    if (matched) {
      return {
        key: matched.key,
        displayName: matched.displayName,
        isCore: true
      };
    }

    return {
      key: normalizeKey(cleanName),
      displayName: titleCaseName(cleanName),
      isCore: false
    };
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
      showStatus("Supabase public key is not configured yet. Add the browser safe anon key to this page before saving availability.", "error");
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

    TIMEZONES.forEach(function (zone) {
      var option = document.createElement("option");
      option.value = zone.value;
      option.textContent = zone.label;
      timezoneSelect.appendChild(option);
    });

    var match = TIMEZONES.find(function (zone) {
      return zone.value === browserTimezone;
    });
    timezoneSelect.value = match ? match.value : "America/New_York";
  }

  function setWeekLabel() {
    var dates = getScheduleDates();
    weekLabel.textContent = formatShortDate(dates[0]) + " to " + formatShortDate(dates[dates.length - 1]);
  }

  function renderGrid() {
    var dates = getScheduleDates();
    grid.innerHTML = "";

    var corner = document.createElement("div");
    corner.className = "grid-corner";
    corner.setAttribute("aria-hidden", "true");
    grid.appendChild(corner);

    dates.forEach(function (date) {
      var dayHeader = document.createElement("div");
      dayHeader.className = "grid-day";
      dayHeader.innerHTML = "<strong>" + formatDayShort(date) + "</strong><span>" + formatShortDate(date) + "</span>";
      grid.appendChild(dayHeader);
    });

    for (var minutes = SLOT_START_MINUTES; minutes < SLOT_END_MINUTES; minutes += SLOT_SIZE_MINUTES) {
      var timeLabel = document.createElement("div");
      timeLabel.className = "grid-time";
      timeLabel.textContent = formatCompactTime(minutes);
      grid.appendChild(timeLabel);

      dates.forEach(function (date, dayIndex) {
        var slotId = getSlotId(dayIndex, minutes);
        var cell = document.createElement("button");
        cell.type = "button";
        cell.className = "grid-cell";
        cell.dataset.slotId = slotId;
        cell.setAttribute("aria-label", formatDayShort(date) + " " + formatShortDate(date) + " at " + formatSlotTime(minutes));
        cell.setAttribute("aria-pressed", "false");
        cell.addEventListener("pointerdown", handlePointerDown);
        cell.addEventListener("pointerenter", handlePointerEnter);
        cell.addEventListener("click", handleCellClick);
        grid.appendChild(cell);
      });
    }

    document.addEventListener("pointerup", function () {
      isDragging = false;
    });

    updateGrid();
  }

  function getRecordSlots(record) {
    if (Array.isArray(record.availability_slots)) {
      return record.availability_slots.filter(isCurrentWindowSlot);
    }
    if (typeof record.availability_slots === "string") {
      try {
        var parsed = JSON.parse(record.availability_slots);
        return Array.isArray(parsed) ? parsed.filter(isCurrentWindowSlot) : [];
      } catch (error) {
        return [];
      }
    }
    return [];
  }

  function isCurrentWindowSlot(slotId) {
    return typeof slotId === "string" && slotId.indexOf(weekStart + "|") === 0;
  }

  function getLatestCoreRecords() {
    var latest = {};

    records.forEach(function (record) {
      var identity = getParticipantIdentity(record.participant_name);
      if (!identity.isCore) {
        return;
      }
      var previous = latest[identity.key];
      var previousDate = previous ? new Date(previous.updated_at || previous.created_at || 0).getTime() : 0;
      var currentDate = new Date(record.updated_at || record.created_at || 0).getTime();
      if (!previous || currentDate >= previousDate) {
        latest[identity.key] = record;
      }
    });

    return latest;
  }

  function getSlotCounts() {
    var counts = {};
    var coreRecords = getLatestCoreRecords();

    Object.keys(coreRecords).forEach(function (key) {
      var record = coreRecords[key];
      var identity = getParticipantIdentity(record.participant_name);
      getRecordSlots(record).forEach(function (slotId) {
        counts[slotId] = counts[slotId] || [];
        if (counts[slotId].indexOf(identity.displayName) === -1) {
          counts[slotId].push(identity.displayName);
        }
      });
    });

    return counts;
  }

  function updateGrid() {
    var counts = getSlotCounts();
    grid.querySelectorAll(".grid-cell").forEach(function (cell) {
      var slotId = cell.dataset.slotId;
      var names = counts[slotId] || [];
      var count = Math.min(names.length, TEAM_MEMBERS.length);
      cell.className = "grid-cell";
      if (count > 0) {
        cell.classList.add("heat-" + count);
      }
      if (selectedSlots.has(slotId)) {
        cell.classList.add("is-selected");
        cell.setAttribute("aria-pressed", "true");
      } else {
        cell.setAttribute("aria-pressed", "false");
      }
      cell.title = count ? count + " available: " + names.join(", ") : "No overlap yet";
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

  function formatUpdatedTime(record) {
    var updated = record.updated_at || record.created_at;
    if (!updated) {
      return "recently";
    }
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    }).format(new Date(updated));
  }

  function renderParticipants() {
    participants.innerHTML = "";
    var coreRecords = getLatestCoreRecords();

    TEAM_MEMBERS.forEach(function (member) {
      var record = coreRecords[member.key];
      var item = document.createElement("article");
      item.className = "participant-item" + (record ? "" : " not-submitted");

      if (record) {
        item.innerHTML = "<strong>" + member.displayName + "</strong><p><span class=\"participant-status\">Submitted</span> with " + getRecordSlots(record).length + " slots selected. Updated " + formatUpdatedTime(record) + ".</p>";
      } else {
        item.innerHTML = "<strong>" + member.displayName + "</strong><p><span class=\"participant-status\">Not submitted</span></p>";
      }
      participants.appendChild(item);
    });

    records.forEach(function (record) {
      var identity = getParticipantIdentity(record.participant_name);
      if (identity.isCore) {
        return;
      }
      var item = document.createElement("article");
      item.className = "participant-item";
      item.innerHTML = "<strong>" + identity.displayName + "</strong><p>Additional response with " + getRecordSlots(record).length + " slots selected. Updated " + formatUpdatedTime(record) + ".</p>";
      participants.appendChild(item);
    });
  }

  function getSubmittedCoreCount() {
    return Object.keys(getLatestCoreRecords()).length;
  }

  function getUnavailableNames(availableNames) {
    return TEAM_MEMBERS.map(function (member) {
      return member.displayName;
    }).filter(function (name) {
      return availableNames.indexOf(name) === -1;
    });
  }

  function getBestWindows() {
    var counts = getSlotCounts();
    var windows = [];
    var current = null;

    for (var dayIndex = 0; dayIndex < DAY_COUNT; dayIndex += 1) {
      current = null;
      for (var minutes = SLOT_START_MINUTES; minutes < SLOT_END_MINUTES; minutes += SLOT_SIZE_MINUTES) {
        var slotId = getSlotId(dayIndex, minutes);
        var names = (counts[slotId] || []).slice().sort();
        var key = names.join("|");
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
            names: names,
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
    var submittedCount = getSubmittedCoreCount();

    if (submittedCount < TEAM_MEMBERS.length) {
      bestTimes.innerHTML = '<p class="empty-state">Waiting for all 4 team members to submit availability.</p><p class="empty-state">' + submittedCount + " of 4 submitted</p>";
      return;
    }

    var windows = getBestWindows();
    if (!windows.length) {
      bestTimes.innerHTML = '<p class="empty-state">All four team members have submitted, but no available times were selected.</p>';
      return;
    }

    windows.forEach(function (windowItem) {
      var item = document.createElement("article");
      var unavailableNames = getUnavailableNames(windowItem.names);
      item.className = "best-time" + (windowItem.count === TEAM_MEMBERS.length ? " perfect" : "");
      var date = getScheduleDates()[windowItem.dayIndex];
      var unavailableText = unavailableNames.length ? "<br>Unavailable: " + unavailableNames.join(", ") : "";
      item.innerHTML = "<strong>" + formatDayShort(date) + ", " + formatShortDate(date) + ", " + formatSlotTime(windowItem.start) + " to " + formatSlotTime(windowItem.end) + "</strong><p>" + windowItem.count + " of 4 available: " + windowItem.names.join(", ") + unavailableText + "</p>";
      bestTimes.appendChild(item);
    });
  }

  async function loadAvailability(options) {
    if (!supabaseClient) {
      return;
    }

    if (!options || !options.preserveStatus) {
      clearStatus();
    }
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
      showStatus("Supabase is not ready. Check the connection and try again.", "error");
      return;
    }

    var identity = getParticipantIdentity(nameInput.value);
    var existingRecord = records.find(function (item) {
      return getParticipantIdentity(item.participant_name).key === identity.key;
    });
    var participantName = existingRecord ? existingRecord.participant_name : identity.displayName;
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
      window.localStorage.setItem(LAST_NAME_KEY, identity.displayName);
    } catch (error) {
      // Saving the shared record matters more than remembering the local name.
    }

    nameInput.value = identity.displayName;
    showStatus(identity.isCore ? "Availability saved." : "Availability saved. This scheduler is set up for Grant, Gavin, Mark, and Paul. Best overlap is based on the four core team members.", identity.isCore ? "success" : "warning");
    await loadAvailability({ preserveStatus: true });
  }

  function restoreCurrentParticipantSlots() {
    var identity = getParticipantIdentity(nameInput.value);
    if (!identity.key || identity.key === currentMatchedIdentity) {
      return;
    }
    currentMatchedIdentity = identity.key;
    var record = records.find(function (item) {
      return getParticipantIdentity(item.participant_name).key === identity.key;
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

  function handleNameChange() {
    var identity = getParticipantIdentity(nameInput.value);
    nameInput.value = identity.displayName;
    restoreCurrentParticipantSlots();
    if (identity.key && !identity.isCore) {
      showStatus("This scheduler is set up for Grant, Gavin, Mark, and Paul. You can still save, but best overlap is based on the four core team members.", "warning");
    } else {
      clearStatus();
    }
  }

  function handleNameInput() {
    var identity = getParticipantIdentity(nameInput.value);
    if (identity.key && !identity.isCore) {
      showStatus("This scheduler is set up for Grant, Gavin, Mark, and Paul. You can still save, but best overlap is based on the four core team members.", "warning");
    } else if (identity.isCore) {
      clearStatus();
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
    nameInput.addEventListener("input", handleNameInput);
    nameInput.addEventListener("change", handleNameChange);
    nameInput.addEventListener("blur", handleNameChange);
    timezoneSelect.addEventListener("change", function () {
      clearStatus();
    });
  }

  init();
})();
