(function () {
  var configuredEndpoint = function (action) {
    return action && action.indexOf("REPLACE_WITH_") === -1;
  };

  var trackEvent = function (name, data) {
    if (!name || typeof window.va !== "function") {
      return;
    }

    window.va("event", Object.assign({ name: name }, data || {}));
  };

  var setStatus = function (form, message, state) {
    var status = form.querySelector("[data-form-status]");
    if (!status) {
      return;
    }

    status.textContent = message;
    status.className = "form-status";
    if (state) {
      status.classList.add(state);
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

  var initForms = function () {
    document.querySelectorAll("form[data-form-name]").forEach(function (form) {
      var started = false;
      var submitButton = form.querySelector('button[type="submit"]');
      var originalButtonText = submitButton ? submitButton.textContent : "";

      form.addEventListener("focusin", function () {
        if (started) {
          return;
        }

        started = true;
        trackEvent(form.getAttribute("data-analytics-start"), {
          form: form.getAttribute("data-form-name")
        });
      });

      form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!configuredEndpoint(form.action)) {
          setStatus(form, "This form needs a live endpoint before launch.", "error");
          return;
        }

        setStatus(form, "Sending...", "loading");
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = "Sending...";
        }

        fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: {
            Accept: "application/json"
          }
        })
          .then(function (response) {
            if (!response.ok) {
              throw new Error("Form submission failed");
            }

            trackEvent(form.getAttribute("data-analytics-submit"), {
              form: form.getAttribute("data-form-name")
            });
            form.reset();
            setStatus(form, "Thank you. Your response was sent.", "success");
          })
          .catch(function () {
            setStatus(form, "Something went wrong. Please try again or email mytaeducation@gmail.com.", "error");
          })
          .finally(function () {
            if (submitButton) {
              submitButton.disabled = false;
              submitButton.textContent = originalButtonText;
            }
          });
      });
    });
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
  initForms();
  initDemoTracking();
})();
