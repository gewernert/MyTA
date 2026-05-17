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

  var setStatus = function (form, message, state) {
    var status = form.querySelector("[data-form-status]");
    if (!status) {
      return;
    }

    window.clearTimeout(form.statusTimer);
    status.textContent = message;
    status.className = "form-status";
    if (state) {
      status.classList.add(state);
    }
  };

  var clearStatusLater = function (form) {
    form.statusTimer = window.setTimeout(function () {
      setStatus(form, "", "");
    }, 6000);
  };

  var setSubmitting = function (button, isSubmitting, originalText) {
    if (!button) {
      return;
    }

    button.disabled = isSubmitting;
    button.textContent = isSubmitting ? "Sending..." : originalText;
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
      var successMessage = form.getAttribute("data-success-message") || "Thank you. Your response was sent.";

      var getMissingRequiredField = function () {
        var requiredFields = form.querySelectorAll("[required]");
        for (var index = 0; index < requiredFields.length; index += 1) {
          var field = requiredFields[index];
          var type = (field.getAttribute("type") || "").toLowerCase();
          var isHidden = type === "hidden" || field.classList.contains("form-hidden") || field.offsetParent === null;

          if (field.disabled || isHidden) {
            continue;
          }

          if (!field.value.trim()) {
            return field;
          }
        }

        return null;
      };

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

        var missingRequiredField = getMissingRequiredField();
        if (missingRequiredField) {
          setStatus(form, "Please complete the required fields before submitting.", "error");
          missingRequiredField.focus();
          return;
        }

        var action = form.getAttribute("action");
        var method = form.getAttribute("method") || "POST";

        if (!action) {
          setStatus(form, "This form needs a live endpoint before launch.", "error");
          return;
        }

        setStatus(form, "Sending...", "loading");
        setSubmitting(submitButton, true, originalButtonText);

        fetch(action, {
          method: method.toUpperCase(),
          body: new FormData(form),
          headers: {
            Accept: "application/json"
          }
        })
          .then(function (response) {
            if (!response.ok) {
              throw new Error("Form submission failed");
            }

            form.reset();
            setStatus(form, successMessage, "success");
            clearStatusLater(form);
            trackEvent(form.getAttribute("data-analytics-submit"), {
              form: form.getAttribute("data-form-name")
            });
          })
          .catch(function () {
            setStatus(form, "Something went wrong. Please try again or email mytaeducation@gmail.com.", "error");
          })
          .finally(function () {
            setSubmitting(submitButton, false, originalButtonText);
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
