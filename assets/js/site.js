(function () {
  var trackEvent = function (name, data) {
    if (!name || typeof window.va !== "function") {
      return;
    }

    try {
      window.va("event", name, data || {});
    } catch (error) {
      return;
    }
  };

  var initCtaTracking = function () {
    document.querySelectorAll("[data-analytics-event]").forEach(function (element) {
      element.addEventListener("click", function () {
        trackEvent(element.getAttribute("data-analytics-event"), {
          location: element.getAttribute("data-analytics-location") || "site",
          label: element.textContent.trim()
        });
      });
    });
  };

  var initFormStartTracking = function () {
    document.querySelectorAll("form[data-form-name]").forEach(function (form) {
      var started = false;

      form.addEventListener("focusin", function () {
        if (started) {
          return;
        }

        started = true;
        trackEvent(form.getAttribute("data-analytics-start"), {
          form: form.getAttribute("data-form-name")
        });
      });
    });
  };

  var initFormRedirectTargets = function () {
    document.querySelectorAll("[data-success-redirect]").forEach(function (input) {
      input.value = new URL(input.getAttribute("data-success-redirect"), window.location.origin).toString();
    });
  };

  var initFormSuccessMessages = function () {
    var successKey = window.location.hash.replace("#", "");
    if (!successKey) {
      return;
    }

    var message = document.querySelector('[data-success-message="' + successKey + '"]');
    if (!message) {
      return;
    }

    message.hidden = false;

    if (window.history && typeof window.history.replaceState === "function") {
      window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }

    window.setTimeout(function () {
      message.hidden = true;
    }, 6000);
  };

  var initDemoTracking = function () {
    if (!document.querySelector(".demo-main")) {
      return;
    }

    trackEvent("Demo page viewed", {
      page: "demo"
    });

    var thresholds = [25, 50, 75, 100];
    var seen = {};
    var ticking = false;

    var checkScrollDepth = function () {
      ticking = false;

      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      var pageHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      );
      var depth = Math.min(100, Math.round(((scrollTop + viewportHeight) / pageHeight) * 100));

      thresholds.forEach(function (threshold) {
        if (depth >= threshold && !seen[threshold]) {
          seen[threshold] = true;
          trackEvent("Demo page scroll depth", {
            page: "demo",
            depth: threshold
          });
        }
      });
    };

    var queueScrollCheck = function () {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(checkScrollDepth);
    };

    window.addEventListener("scroll", queueScrollCheck, { passive: true });
    window.addEventListener("resize", queueScrollCheck);
    checkScrollDepth();
  };

  initCtaTracking();
  initFormRedirectTargets();
  initFormStartTracking();
  initFormSuccessMessages();
  initDemoTracking();
})();
