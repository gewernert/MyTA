(function () {
  var productScrolls = Array.from(document.querySelectorAll("[data-marketing-product-scroll]"));
  var mobileProductMedia = window.matchMedia("(max-width: 700px)");

  var positionProductScrolls = function () {
    productScrolls.forEach(function (scroller) {
      if (!mobileProductMedia.matches || scroller.closest("[hidden]")) {
        scroller.removeAttribute("role");
        scroller.removeAttribute("tabindex");
        if (!mobileProductMedia.matches) {
          scroller.scrollLeft = 0;
        }
        return;
      }

      var maxScroll = scroller.scrollWidth - scroller.clientWidth;
      if (maxScroll <= 0) {
        scroller.removeAttribute("role");
        scroller.removeAttribute("tabindex");
        return;
      }

      scroller.setAttribute("role", "region");
      scroller.tabIndex = 0;

      scroller.scrollLeft = scroller.getAttribute("data-marketing-product-scroll") === "end"
        ? maxScroll
        : maxScroll / 2;
    });
  };

  productScrolls.forEach(function (scroller) {
    var image = scroller.querySelector("img");
    if (image && !image.complete) {
      image.addEventListener("load", positionProductScrolls, { once: true });
    }
  });

  var productResizeFrame;
  window.addEventListener("resize", function () {
    window.cancelAnimationFrame(productResizeFrame);
    productResizeFrame = window.requestAnimationFrame(positionProductScrolls);
  });

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
      if (event.key === "Escape" && root.dataset.navOpen === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    setOpen(false);
  });

  document.querySelectorAll("[data-marketing-story]").forEach(function (root) {
    var steps = Array.from(root.querySelectorAll("[data-marketing-story-step]"));
    var screens = Array.from(root.querySelectorAll("[data-marketing-story-screen]"));
    var label = root.querySelector("[data-marketing-story-label]");
    var labels = {
      setup: "Instructor assignment creation",
      student: "Student assignment with guided AI",
      insight: "Assignment analytics"
    };

    if (!steps.length || steps.length !== screens.length) {
      return;
    }

    var activateStory = function (key) {
      steps.forEach(function (step) {
        step.classList.toggle("is-active", step.getAttribute("data-marketing-story-step") === key);
      });

      screens.forEach(function (screen) {
        screen.classList.toggle("is-active", screen.getAttribute("data-marketing-story-screen") === key);
      });

      if (label) {
        label.textContent = labels[key] || labels.setup;
      }
    };

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            activateStory(entry.target.getAttribute("data-marketing-story-step"));
          }
        });
      }, { rootMargin: "-46% 0px -46% 0px", threshold: 0 });

      steps.forEach(function (step) {
        observer.observe(step);
      });
    }

    activateStory("setup");
  });

  document.querySelectorAll("[data-marketing-mobile-story]").forEach(function (root) {
    var tabs = Array.from(root.querySelectorAll("[data-marketing-mobile-story-tab]"));
    var panels = Array.from(root.querySelectorAll("[data-marketing-mobile-story-panel]"));

    if (!tabs.length || tabs.length !== panels.length) {
      return;
    }

    var activateTab = function (key, moveFocus) {
      tabs.forEach(function (tab) {
        var isActive = tab.getAttribute("data-marketing-mobile-story-tab") === key;
        tab.setAttribute("aria-selected", isActive ? "true" : "false");
        tab.tabIndex = isActive ? 0 : -1;
        if (isActive && moveFocus) {
          tab.focus();
        }
      });

      panels.forEach(function (panel) {
        panel.hidden = panel.getAttribute("data-marketing-mobile-story-panel") !== key;
      });
    };

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        activateTab(tab.getAttribute("data-marketing-mobile-story-tab"), false);
      });

      tab.addEventListener("keydown", function (event) {
        var nextIndex;

        if (event.key === "ArrowRight") {
          nextIndex = (index + 1) % tabs.length;
        } else if (event.key === "ArrowLeft") {
          nextIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = tabs.length - 1;
        } else {
          return;
        }

        event.preventDefault();
        activateTab(tabs[nextIndex].getAttribute("data-marketing-mobile-story-tab"), true);
      });
    });

    root.classList.add("is-enhanced");
    activateTab(tabs[0].getAttribute("data-marketing-mobile-story-tab"), false);
  });

  document.querySelectorAll("[data-marketing-comparison]").forEach(function (root) {
    var toggles = Array.from(root.querySelectorAll("[data-marketing-comparison-toggle]"));
    var panels = Array.from(root.querySelectorAll("[data-marketing-comparison-panel]"));

    if (!toggles.length || toggles.length !== panels.length) {
      return;
    }

    var setComparison = function (key) {
      toggles.forEach(function (toggle) {
        toggle.setAttribute("aria-expanded", toggle.getAttribute("data-marketing-comparison-toggle") === key ? "true" : "false");
      });

      panels.forEach(function (panel) {
        panel.hidden = panel.getAttribute("data-marketing-comparison-panel") !== key;
      });
    };

    toggles.forEach(function (toggle) {
      var toggleComparison = function () {
        var key = toggle.getAttribute("data-marketing-comparison-toggle");
        setComparison(toggle.getAttribute("aria-expanded") === "true" ? "" : key);
      };

      toggle.addEventListener("click", toggleComparison);
      toggle.addEventListener("keydown", function (event) {
        if (event.key !== "Enter" && event.key !== " ") {
          return;
        }

        event.preventDefault();
        toggleComparison();
      });
    });

    root.classList.add("is-enhanced");
    setComparison(window.matchMedia("(min-width: 861px)").matches ? "lms" : "");
  });

  document.querySelectorAll("[data-marketing-feedback]").forEach(function (root) {
    var toggle = root.querySelector("[data-marketing-feedback-toggle]");
    var panel = root.querySelector("[data-marketing-feedback-panel]");
    var toggleLabel = toggle && toggle.querySelector("span");

    if (!toggle || !panel) {
      return;
    }

    var setFeedbackOpen = function (isOpen) {
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      panel.hidden = !isOpen;
      root.dataset.feedbackOpen = isOpen ? "true" : "false";

      if (toggleLabel) {
        toggleLabel.textContent = isOpen ? "Close the feedback form" : "Open the feedback form";
      }
    };

    toggle.addEventListener("click", function () {
      setFeedbackOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    root.classList.add("is-enhanced");
    setFeedbackOpen(window.location.hash === "#feedback-submitted");
  });

  positionProductScrolls();
})();
