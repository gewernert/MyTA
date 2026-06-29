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

  var carouselRoots = document.querySelectorAll("[data-hero-carousel]");
  var reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  carouselRoots.forEach(function (root) {
    var slides = Array.from(root.querySelectorAll("[data-hero-slide]"));
    var controls = Array.from(root.querySelectorAll("[data-hero-slide-control]"));
    var activeIndex = 0;
    var timer = null;
    var isPaused = false;

    if (!slides.length || !controls.length) {
      return;
    }

    var setActiveSlide = function (index) {
      activeIndex = (index + slides.length) % slides.length;

      slides.forEach(function (slide, slideIndex) {
        slide.classList.toggle("is-active", slideIndex === activeIndex);
      });

      controls.forEach(function (control, controlIndex) {
        var isActive = controlIndex === activeIndex;
        control.classList.toggle("is-active", isActive);
        control.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
    };

    var stopRotation = function () {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    };

    var startRotation = function () {
      stopRotation();

      if (isPaused || reducedMotionQuery.matches || document.hidden) {
        return;
      }

      timer = window.setInterval(function () {
        setActiveSlide(activeIndex + 1);
      }, 5000);
    };

    controls.forEach(function (control, index) {
      control.addEventListener("click", function () {
        setActiveSlide(index);
        startRotation();
      });
    });

    root.addEventListener("mouseenter", function () {
      isPaused = true;
      stopRotation();
    });

    root.addEventListener("mouseleave", function () {
      isPaused = false;
      startRotation();
    });

    root.addEventListener("focusin", function () {
      isPaused = true;
      stopRotation();
    });

    root.addEventListener("focusout", function () {
      if (!root.contains(document.activeElement)) {
        isPaused = false;
        startRotation();
      }
    });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        stopRotation();
      } else {
        startRotation();
      }
    });

    if (typeof reducedMotionQuery.addEventListener === "function") {
      reducedMotionQuery.addEventListener("change", startRotation);
    } else if (typeof reducedMotionQuery.addListener === "function") {
      reducedMotionQuery.addListener(startRotation);
    }

    setActiveSlide(0);
    startRotation();
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
