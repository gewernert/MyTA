(function () {
  var navRoots = document.querySelectorAll("[data-marketing-nav]");

  navRoots.forEach(function (root) {
    var toggle = root.querySelector("[data-marketing-nav-toggle]");
    var panel = root.querySelector("[data-marketing-nav-panel]");

    if (!toggle || !panel) {
      return;
    }

    var setOpen = function (isOpen) {
      root.dataset.navOpen = isOpen ? "true" : "false";
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    };

    toggle.addEventListener("click", function () {
      setOpen(root.dataset.navOpen !== "true");
    });

    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    });

    setOpen(false);
  });

  var faqRoots = document.querySelectorAll("[data-marketing-faq]");

  faqRoots.forEach(function (root) {
    var items = Array.from(root.querySelectorAll("[data-marketing-faq-item]"));

    if (!items.length) {
      return;
    }

    root.classList.add("is-enhanced");

    var setOpen = function (selectedItem) {
      items.forEach(function (item) {
        var button = item.querySelector("[data-marketing-faq-button]");
        var panel = item.querySelector("[data-marketing-faq-panel]");
        var isSelected = item === selectedItem;

        if (!button || !panel) {
          return;
        }

        button.setAttribute("aria-expanded", isSelected ? "true" : "false");
        panel.hidden = !isSelected;
      });
    };

    items.forEach(function (item) {
      var button = item.querySelector("[data-marketing-faq-button]");

      if (!button) {
        return;
      }

      button.addEventListener("click", function () {
        setOpen(item);
      });
    });

    setOpen(items[0]);
  });

  var processRoot = document.querySelector("[data-myta-process]");

  if (processRoot) {
    var desktopQuery = window.matchMedia("(min-width: 1101px)");
    var checkpoints = Array.from(processRoot.querySelectorAll("[data-process-step]"));
    var images = Array.from(processRoot.querySelectorAll("[data-process-image]"));
    var triggers = Array.from(processRoot.querySelectorAll("[data-process-trigger]"));
    var observer = null;
    var activeStep = "1";

    var setActiveProcessStep = function (step) {
      if (!step || step === activeStep) {
        return;
      }

      activeStep = step;
      processRoot.dataset.activeStep = step;

      checkpoints.forEach(function (checkpoint) {
        var checkpointStep = checkpoint.getAttribute("data-process-step");
        var isActive = checkpointStep === step;
        var isComplete = Number(checkpointStep) < Number(step);

        checkpoint.classList.toggle("is-active", isActive);
        checkpoint.classList.toggle("is-complete", isComplete);
      });

      images.forEach(function (image) {
        image.classList.toggle("is-active", image.getAttribute("data-process-image") === step);
      });
    };

    var getClosestTriggerStep = function () {
      var viewportCenter = window.innerHeight / 2;
      var closestStep = activeStep;
      var closestDistance = Infinity;

      triggers.forEach(function (trigger) {
        var rect = trigger.getBoundingClientRect();
        var triggerCenter = rect.top + rect.height / 2;
        var distance = Math.abs(triggerCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestStep = trigger.getAttribute("data-process-trigger");
        }
      });

      return closestStep;
    };

    var initializeProcessState = function () {
      if (!triggers.length || !checkpoints.length || !images.length || !desktopQuery.matches) {
        processRoot.classList.remove("is-enhanced");
        return;
      }

      processRoot.classList.add("is-enhanced");
      setActiveProcessStep(getClosestTriggerStep() || "1");
    };

    var disconnectObserver = function () {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    };

    var setupObserver = function () {
      disconnectObserver();

      if (!desktopQuery.matches || !triggers.length) {
        initializeProcessState();
        return;
      }

      observer = new IntersectionObserver(function (entries) {
        var visibleEntries = entries.filter(function (entry) {
          return entry.isIntersecting;
        });

        if (!visibleEntries.length) {
          return;
        }

        visibleEntries.sort(function (a, b) {
          return b.intersectionRatio - a.intersectionRatio;
        });

        setActiveProcessStep(visibleEntries[0].target.getAttribute("data-process-trigger"));
      }, {
        root: null,
        rootMargin: "-42% 0px -42% 0px",
        threshold: [0, 0.35, 0.7, 1]
      });

      triggers.forEach(function (trigger) {
        observer.observe(trigger);
      });

      initializeProcessState();
    };

    if ("IntersectionObserver" in window) {
      setupObserver();
    } else {
      initializeProcessState();
    }

    if (typeof desktopQuery.addEventListener === "function") {
      desktopQuery.addEventListener("change", setupObserver);
    } else if (typeof desktopQuery.addListener === "function") {
      desktopQuery.addListener(setupObserver);
    }

    window.addEventListener("resize", function () {
      initializeProcessState();
    });
  }
})();
