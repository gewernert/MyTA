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

  var storyRoots = document.querySelectorAll("[data-marketing-story]");
  var prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  storyRoots.forEach(function (root) {
    var steps = Array.from(root.querySelectorAll("[data-marketing-story-step]"));
    var screens = Array.from(root.querySelectorAll("[data-marketing-story-screen]"));
    var label = root.querySelector("[data-marketing-story-label]");

    if (!steps.length || !screens.length) {
      return;
    }

    root.classList.add("is-enhanced");

    var setActive = function (target) {
      steps.forEach(function (step) {
        var isActive = step.getAttribute("data-marketing-story-target") === target;
        step.classList.toggle("is-active", isActive);
        step.setAttribute("aria-pressed", isActive ? "true" : "false");
      });

      screens.forEach(function (screen) {
        screen.classList.toggle("is-active", screen.getAttribute("data-marketing-story-screen") === target);
      });

      if (label) {
        var activeStep = steps.find(function (step) {
          return step.getAttribute("data-marketing-story-target") === target;
        });
        var title = activeStep ? activeStep.querySelector("strong") : null;
        label.textContent = title ? title.textContent.trim() : "Product story";
      }
    };

    steps.forEach(function (step) {
      step.addEventListener("click", function () {
        setActive(step.getAttribute("data-marketing-story-target"));
      });

      step.addEventListener("keydown", function (event) {
        var index = steps.indexOf(step);
        var nextIndex = index;

        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
          nextIndex = Math.min(steps.length - 1, index + 1);
        } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
          nextIndex = Math.max(0, index - 1);
        } else {
          return;
        }

        event.preventDefault();
        steps[nextIndex].focus();
        setActive(steps[nextIndex].getAttribute("data-marketing-story-target"));
      });
    });

    if ("IntersectionObserver" in window && !prefersReducedMotion) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActive(entry.target.getAttribute("data-marketing-story-target"));
          }
        });
      }, { rootMargin: "-35% 0px -45% 0px", threshold: 0.2 });

      steps.forEach(function (step) {
        observer.observe(step);
      });
    }

    setActive(steps[0].getAttribute("data-marketing-story-target"));
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

      button.addEventListener("keydown", function (event) {
        if (event.key !== "Enter" && event.key !== " ") {
          return;
        }

        event.preventDefault();
        setOpen(item);
      });
    });

    setOpen(items[0]);
  });
})();
