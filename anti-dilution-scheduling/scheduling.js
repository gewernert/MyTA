(function () {
  var SUPABASE_URL = "https://vhayeiyuafaltrfnbqce.supabase.co";
  var SUPABASE_PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoYXllaXl1YWZhbHRyZm5icWNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwODgwNDgsImV4cCI6MjA5NTY2NDA0OH0.cOeVUWGxTMRlBQl7VoL-F1PQp1N1bVXiFVv6tpyCeFY";
  var TABLE_NAME = "meeting_availability";
  var LAST_NAME_KEY = "myta_anti_dilution_last_name";
  var SOURCE_TIMEZONE = "America/New_York";
  var SLOT_START_MINUTES = 8 * 60;
  var SLOT_END_MINUTES = 23 * 60;
  var SLOT_SIZE_MINUTES = 30;
  var DAY_COUNT = 8;

  var TEAM_MEMBERS = [
    { key: "grant_goldsmith", displayName: "Grant Goldsmith", shortName: "Grant", aliases: ["grant", "grant goldsmith"] },
    { key: "gavin_wernert", displayName: "Gavin Wernert", shortName: "Gavin", aliases: ["gavin", "gavin wernert"] },
    { key: "mark_rome", displayName: "Mark Rome", shortName: "Mark", aliases: ["mark", "mark rome"] },
    { key: "paul_cavounis", displayName: "Paul Cavounis", shortName: "Paul", aliases: ["paul", "paul cavounis"] }
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
  var signInButton = document.querySelector("[data-signin-button]");
  var saveButton = document.querySelector("[data-save-button]");
  var refreshButton = document.querySelector("[data-refresh-button]");
  var statusMessage = document.querySelector("[data-status-message]");
  var editingStatus = document.querySelector("[data-editing-status]");
  var displayTimezone = document.querySelector("[data-display-timezone]");
  var gridMode = document.querySelector("[data-grid-mode]");
  var grid = document.querySelector("[data-grid]");
  var bestTimes = document.querySelector("[data-best-times]");
  var participants = document.querySelector("[data-participants]");
  var tooltip = document.querySelector("[data-slot-tooltip]");

  if (!grid || !nameInput || !timezoneSelect || !signInButton || !saveButton) {
    return;
  }

  var supabaseClient = null;
  var weekStart = getSchedulingStart(new Date());
  var selectedSlots = new Set();
  var records = [];
  var slotCatalog = [];
  var slotInfoById = {};
  var currentSlotIds = new Set();
  var legacySlotMap = {};
  var signedInIdentity = null;
  var isDragging = false;
  var dragShouldSelect = true;
  var pointerHandledCell = false;

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

  function getTimezoneLabel(value) {
    var zone = TIMEZONES.find(function (item) {
      return item.value === value;
    });
    return zone ? zone.label : "Eastern";
  }

  function getSelectedTimezone() {
    return timezoneSelect.value || SOURCE_TIMEZONE;
  }

  function formatShortDate(date) {
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric"
    }).format(date);
  }

  function formatInTimezone(isoString, options) {
    return new Intl.DateTimeFormat("en-US", Object.assign({
      timeZone: getSelectedTimezone()
    }, options)).format(new Date(isoString));
  }

  function formatDayShortInTimezone(isoString) {
    return formatInTimezone(isoString, { weekday: "short" });
  }

  function formatShortDateInTimezone(isoString) {
    return formatInTimezone(isoString, { month: "short", day: "numeric" });
  }

  function formatLongDayTimeInTimezone(isoString) {
    return formatInTimezone(isoString, {
      weekday: "long",
      hour: "numeric",
      minute: "2-digit"
    });
  }

  function formatTimeInTimezone(isoString) {
    return formatInTimezone(isoString, {
      hour: "numeric",
      minute: "2-digit"
    });
  }

  function formatCompactTimeInTimezone(isoString) {
    return formatTimeInTimezone(isoString)
      .replace(":00 ", "")
      .replace(" AM", "a")
      .replace(" PM", "p");
  }

  function minutesToValue(minutes) {
    return pad(Math.floor(minutes / 60)) + ":" + pad(minutes % 60);
  }

  function getZonedParts(date, timeZone) {
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: timeZone,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }).formatToParts(date);
    var map = {};
    parts.forEach(function (part) {
      if (part.type !== "literal") {
        map[part.type] = Number(part.value);
      }
    });
    return map;
  }

  function zonedTimeToUtc(dateKey, minutes, timeZone) {
    var dateParts = dateKey.split("-").map(Number);
    var targetHour = Math.floor(minutes / 60);
    var targetMinute = minutes % 60;
    var targetAsUtc = Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2], targetHour, targetMinute);
    var guess = targetAsUtc;

    for (var index = 0; index < 3; index += 1) {
      var actual = getZonedParts(new Date(guess), timeZone);
      var actualAsUtc = Date.UTC(actual.year, actual.month - 1, actual.day, actual.hour, actual.minute);
      guess += targetAsUtc - actualAsUtc;
    }

    return new Date(guess);
  }

  function buildSlotCatalog() {
    var dates = getScheduleDates();
    slotCatalog = [];
    slotInfoById = {};
    currentSlotIds = new Set();
    legacySlotMap = {};

    for (var minutes = SLOT_START_MINUTES; minutes <= SLOT_END_MINUTES; minutes += SLOT_SIZE_MINUTES) {
      var row = [];
      dates.forEach(function (date, dayIndex) {
        var dateKey = formatDateKey(date);
        var iso = zonedTimeToUtc(dateKey, minutes, SOURCE_TIMEZONE).toISOString();
        var info = {
          id: iso,
          dayIndex: dayIndex,
          sourceDateKey: dateKey,
          easternMinutes: minutes
        };
        row.push(info);
        slotInfoById[iso] = info;
        currentSlotIds.add(iso);
        legacySlotMap[weekStart + "|" + dateKey + "|" + minutesToValue(minutes)] = iso;
      });
      slotCatalog.push(row);
    }
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
        shortName: matched.shortName,
        isCore: true
      };
    }

    return {
      key: normalizeKey(cleanName),
      displayName: titleCaseName(cleanName),
      shortName: titleCaseName(cleanName),
      isCore: false
    };
  }

  function toShortNames(names) {
    if (!names.length) {
      return "None";
    }
    return names.map(function (name) {
      var member = TEAM_MEMBERS.find(function (item) {
        return item.displayName === name;
      });
      return member ? member.shortName : name;
    }).join(", ");
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[character];
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
    var browserTimezone = SOURCE_TIMEZONE;

    try {
      browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || browserTimezone;
    } catch (error) {
      browserTimezone = SOURCE_TIMEZONE;
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
    timezoneSelect.value = match ? match.value : SOURCE_TIMEZONE;
  }

  function setWeekLabel() {
    var dates = getScheduleDates();
    weekLabel.textContent = formatShortDate(dates[0]) + " to " + formatShortDate(dates[dates.length - 1]);
  }

  function updateTimezoneLabels() {
    var label = getTimezoneLabel(getSelectedTimezone());
    displayTimezone.textContent = "Showing times in " + label;
  }

  function updateEditingState() {
    var isSignedIn = Boolean(signedInIdentity);
    grid.classList.toggle("is-locked", !isSignedIn);
    saveButton.disabled = !isSignedIn;
    editingStatus.textContent = isSignedIn ? "Editing as " + signedInIdentity.displayName : "Sign in to edit your availability.";
    gridMode.textContent = isSignedIn ? "Click or drag to mark your availability." : "Sign in to edit. You can still view team overlap.";
  }

  function renderGrid() {
    buildSlotCatalog();
    grid.innerHTML = "";

    var corner = document.createElement("div");
    corner.className = "grid-corner";
    corner.setAttribute("aria-hidden", "true");
    grid.appendChild(corner);

    for (var dayIndex = 0; dayIndex < DAY_COUNT; dayIndex += 1) {
      var firstSlot = slotCatalog[0][dayIndex];
      var dayHeader = document.createElement("div");
      dayHeader.className = "grid-day";
      dayHeader.innerHTML = "<strong>" + formatDayShortInTimezone(firstSlot.id) + "</strong><span>" + formatShortDateInTimezone(firstSlot.id) + "</span>";
      grid.appendChild(dayHeader);
    }

    slotCatalog.forEach(function (row) {
      var timeLabel = document.createElement("div");
      timeLabel.className = "grid-time";
      timeLabel.textContent = formatCompactTimeInTimezone(row[0].id);
      grid.appendChild(timeLabel);

      row.forEach(function (slot) {
        var cell = document.createElement("button");
        cell.type = "button";
        cell.className = "grid-cell";
        cell.dataset.slotId = slot.id;
        cell.setAttribute("aria-label", formatLongDayTimeInTimezone(slot.id));
        cell.setAttribute("aria-pressed", "false");
        cell.addEventListener("pointerdown", handlePointerDown);
        cell.addEventListener("pointerenter", handlePointerEnter);
        cell.addEventListener("click", handleCellClick);
        cell.addEventListener("mouseenter", showTooltip);
        cell.addEventListener("mousemove", moveTooltip);
        cell.addEventListener("mouseleave", hideTooltip);
        cell.addEventListener("focus", showTooltip);
        cell.addEventListener("blur", hideTooltip);
        grid.appendChild(cell);
      });
    });

    updateTimezoneLabels();
    updateEditingState();
    updateGrid();
  }

  function normalizeAvailabilitySlot(slotId) {
    if (typeof slotId !== "string") {
      return null;
    }
    if (currentSlotIds.has(slotId)) {
      return slotId;
    }
    if (legacySlotMap[slotId]) {
      return legacySlotMap[slotId];
    }

    var parsedDate = new Date(slotId);
    if (!Number.isNaN(parsedDate.getTime())) {
      var iso = parsedDate.toISOString();
      return currentSlotIds.has(iso) ? iso : null;
    }

    return null;
  }

  function getRecordSlots(record) {
    var slots = [];
    if (Array.isArray(record.availability_slots)) {
      slots = record.availability_slots;
    } else if (typeof record.availability_slots === "string") {
      try {
        var parsed = JSON.parse(record.availability_slots);
        slots = Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        slots = [];
      }
    }

    return slots.map(normalizeAvailabilitySlot).filter(Boolean);
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

  function getUnavailableNames(availableNames) {
    return TEAM_MEMBERS.map(function (member) {
      return member.displayName;
    }).filter(function (name) {
      return availableNames.indexOf(name) === -1;
    });
  }

  function getTooltipText(slotId) {
    var counts = getSlotCounts();
    var available = (counts[slotId] || []).slice().sort();
    var unavailable = getUnavailableNames(available);
    return {
      plain: formatLongDayTimeInTimezone(slotId) + "\n" + available.length + " of 4 available\nAvailable: " + toShortNames(available) + "\nUnavailable: " + toShortNames(unavailable),
      html: "<strong>" + escapeHtml(formatLongDayTimeInTimezone(slotId)) + "</strong>" +
        "<div>" + available.length + " of 4 available</div>" +
        "<div>Available: " + escapeHtml(toShortNames(available)) + "</div>" +
        "<div>Unavailable: " + escapeHtml(toShortNames(unavailable)) + "</div>"
    };
  }

  function updateGrid() {
    var counts = getSlotCounts();
    grid.querySelectorAll(".grid-cell").forEach(function (cell) {
      var slotId = cell.dataset.slotId;
      var names = counts[slotId] || [];
      var count = Math.min(names.length, TEAM_MEMBERS.length);
      var tooltipText = getTooltipText(slotId);
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
      cell.title = tooltipText.plain;
    });
    renderBestTimes();
    renderParticipants();
  }

  function canEditGrid() {
    if (signedInIdentity) {
      return true;
    }
    showStatus("Enter your name and click Sign in before editing.", "error");
    nameInput.focus();
    return false;
  }

  function handlePointerDown(event) {
    if (!canEditGrid()) {
      pointerHandledCell = true;
      return;
    }
    isDragging = true;
    pointerHandledCell = true;
    dragShouldSelect = !selectedSlots.has(event.currentTarget.dataset.slotId);
    setSlot(event.currentTarget.dataset.slotId, dragShouldSelect);
  }

  function handlePointerEnter(event) {
    if (!isDragging || !signedInIdentity) {
      return;
    }
    setSlot(event.currentTarget.dataset.slotId, dragShouldSelect);
  }

  function handleCellClick(event) {
    if (!signedInIdentity) {
      pointerHandledCell = false;
      return;
    }
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

  function moveTooltip(event) {
    if (!tooltip || tooltip.hidden) {
      return;
    }
    var offset = 14;
    var left = event.clientX + offset;
    var top = event.clientY + offset;
    var tooltipRect = tooltip.getBoundingClientRect();

    if (left + tooltipRect.width > window.innerWidth - 12) {
      left = event.clientX - tooltipRect.width - offset;
    }
    if (top + tooltipRect.height > window.innerHeight - 12) {
      top = event.clientY - tooltipRect.height - offset;
    }

    tooltip.style.left = Math.max(12, left) + "px";
    tooltip.style.top = Math.max(12, top) + "px";
  }

  function showTooltip(event) {
    if (!tooltip) {
      return;
    }
    var slotId = event.currentTarget.dataset.slotId;
    tooltip.innerHTML = getTooltipText(slotId).html;
    tooltip.hidden = false;

    if (event.type === "focus") {
      var rect = event.currentTarget.getBoundingClientRect();
      moveTooltip({ clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 });
    } else {
      moveTooltip(event);
    }
  }

  function hideTooltip() {
    if (tooltip) {
      tooltip.hidden = true;
    }
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

  function getBestWindows() {
    var counts = getSlotCounts();
    var windows = [];
    var current = null;

    slotCatalog.forEach(function (row) {
      current = null;
      row.forEach(function (slot) {
        var names = (counts[slot.id] || []).slice().sort();
        var key = names.join("|");
        var startMs = new Date(slot.id).getTime();
        var endMs = startMs + SLOT_SIZE_MINUTES * 60 * 1000;

        if (!names.length) {
          if (current) {
            windows.push(current);
            current = null;
          }
          return;
        }

        if (current && current.dayIndex === slot.dayIndex && current.namesKey === key && current.endMs === startMs) {
          current.endMs = endMs;
          current.endIso = new Date(endMs).toISOString();
        } else {
          if (current) {
            windows.push(current);
          }
          current = {
            dayIndex: slot.dayIndex,
            startMs: startMs,
            endMs: endMs,
            startIso: slot.id,
            endIso: new Date(endMs).toISOString(),
            count: names.length,
            names: names,
            namesKey: key
          };
        }
      });
      if (current) {
        windows.push(current);
      }
    });

    return windows.sort(function (a, b) {
      if (b.count !== a.count) {
        return b.count - a.count;
      }
      if ((b.endMs - b.startMs) !== (a.endMs - a.startMs)) {
        return (b.endMs - b.startMs) - (a.endMs - a.startMs);
      }
      if (a.dayIndex !== b.dayIndex) {
        return a.dayIndex - b.dayIndex;
      }
      return a.startMs - b.startMs;
    }).slice(0, 3);
  }

  function renderBestTimes() {
    bestTimes.innerHTML = "";
    var submittedCount = getSubmittedCoreCount();
    var timezoneLabel = getTimezoneLabel(getSelectedTimezone());

    if (submittedCount < TEAM_MEMBERS.length) {
      bestTimes.innerHTML = '<p class="empty-state">Waiting for all 4 team members to submit availability.</p><p class="empty-state">' + submittedCount + " of 4 submitted</p>";
      return;
    }

    var windows = getBestWindows();
    if (!windows.length) {
      bestTimes.innerHTML = '<p class="empty-state">All four team members have submitted, but no available times were selected.</p>';
      return;
    }

    var timezoneNote = document.createElement("p");
    timezoneNote.className = "empty-state";
    timezoneNote.textContent = "Times shown in " + timezoneLabel + ".";
    bestTimes.appendChild(timezoneNote);

    windows.forEach(function (windowItem) {
      var item = document.createElement("article");
      var unavailableNames = getUnavailableNames(windowItem.names);
      item.className = "best-time" + (windowItem.count === TEAM_MEMBERS.length ? " perfect" : "");
      item.innerHTML = "<strong>" + formatDayShortInTimezone(windowItem.startIso) + ", " + formatShortDateInTimezone(windowItem.startIso) + ", " + formatTimeInTimezone(windowItem.startIso) + " to " + formatTimeInTimezone(windowItem.endIso) + "</strong><p>" + windowItem.count + " of 4 available: " + windowItem.names.join(", ") + (unavailableNames.length ? "<br>Unavailable: " + unavailableNames.join(", ") : "") + "</p>";
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
    restoreSignedInAvailability();
    updateGrid();
  }

  function restoreSignedInAvailability() {
    if (!signedInIdentity) {
      return;
    }
    var record = records.find(function (item) {
      return getParticipantIdentity(item.participant_name).key === signedInIdentity.key;
    });
    selectedSlots = record ? new Set(getRecordSlots(record)) : new Set();
  }

  function signIn() {
    var identity = getParticipantIdentity(nameInput.value);

    if (!identity.displayName) {
      showStatus("Enter your name before signing in.", "error");
      nameInput.focus();
      return;
    }

    signedInIdentity = identity;
    nameInput.value = identity.displayName;
    restoreSignedInAvailability();

    try {
      window.localStorage.setItem(LAST_NAME_KEY, identity.displayName);
    } catch (error) {
      // Remembering the local name is only a convenience.
    }

    updateEditingState();
    updateGrid();

    if (identity.isCore) {
      clearStatus();
    } else {
      showStatus("This scheduler is set up for Grant, Gavin, Mark, and Paul. You can still save, but best overlap is based on the four core team members.", "warning");
    }
  }

  async function saveAvailability() {
    if (!supabaseClient) {
      showStatus("Supabase is not ready. Check the connection and try again.", "error");
      return;
    }

    if (!signedInIdentity) {
      showStatus("Enter your name and click Sign in before saving.", "error");
      nameInput.focus();
      return;
    }

    var timezone = timezoneSelect.value;

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
      participant_name: signedInIdentity.displayName,
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
    updateEditingState();

    if (response.error) {
      showStatus("We could not save your availability. Please try again.", "error");
      return;
    }

    try {
      window.localStorage.setItem(LAST_NAME_KEY, signedInIdentity.displayName);
    } catch (error) {
      // Saving the shared record matters more than remembering the local name.
    }

    showStatus(signedInIdentity.isCore ? "Availability saved." : "Availability saved. This scheduler is set up for Grant, Gavin, Mark, and Paul. Best overlap is based on the four core team members.", signedInIdentity.isCore ? "success" : "warning");
    await loadAvailability({ preserveStatus: true });
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

  function handleNameInput() {
    var identity = getParticipantIdentity(nameInput.value);

    if (signedInIdentity && identity.key !== signedInIdentity.key) {
      signedInIdentity = null;
      selectedSlots = new Set();
      updateEditingState();
      updateGrid();
      if (identity.displayName) {
        showStatus("Click Sign in to edit as " + identity.displayName + ".", "warning");
      }
      return;
    }

    if (identity.key && !identity.isCore) {
      showStatus("This scheduler is set up for Grant, Gavin, Mark, and Paul. You can still save, but best overlap is based on the four core team members.", "warning");
    } else if (identity.isCore) {
      clearStatus();
    }
  }

  function handleTimezoneChange() {
    updateTimezoneLabels();
    renderGrid();
    clearStatus();
  }

  function init() {
    populateTimezones();
    restoreLastName();
    setWeekLabel();
    renderGrid();
    initSupabase();
    loadAvailability();

    signInButton.addEventListener("click", signIn);
    saveButton.addEventListener("click", saveAvailability);
    refreshButton.addEventListener("click", loadAvailability);
    nameInput.addEventListener("input", handleNameInput);
    timezoneSelect.addEventListener("change", handleTimezoneChange);
    document.addEventListener("pointerup", function () {
      isDragging = false;
    });
  }

  init();
})();
