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

      scroller.setAttribute("role", "region");
      scroller.tabIndex = 0;

      var maxScroll = scroller.scrollWidth - scroller.clientWidth;
      if (maxScroll <= 0) {
        return;
      }

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
      if (event.key === "Escape") {
        setOpen(false);
      }
    });

    setOpen(false);
  });

  document.querySelectorAll("[data-marketing-gallery]").forEach(function (root) {
    var tabs = Array.from(root.querySelectorAll("[data-marketing-gallery-tab]"));
    var panels = Array.from(root.querySelectorAll("[data-marketing-gallery-panel]"));

    if (!tabs.length || tabs.length !== panels.length) {
      return;
    }

    var activate = function (key, moveFocus) {
      tabs.forEach(function (tab) {
        var isActive = tab.getAttribute("data-marketing-gallery-tab") === key;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", isActive ? "true" : "false");
        tab.tabIndex = isActive ? 0 : -1;

        if (isActive && moveFocus) {
          tab.focus();
        }
      });

      panels.forEach(function (panel) {
        panel.hidden = panel.getAttribute("data-marketing-gallery-panel") !== key;
      });

      window.requestAnimationFrame(positionProductScrolls);
    };

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        activate(tab.getAttribute("data-marketing-gallery-tab"), false);
      });

      tab.addEventListener("keydown", function (event) {
        var nextIndex = index;

        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          nextIndex = (index + 1) % tabs.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          nextIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = tabs.length - 1;
        } else {
          return;
        }

        event.preventDefault();
        activate(tabs[nextIndex].getAttribute("data-marketing-gallery-tab"), true);
      });
    });

    root.classList.add("is-enhanced");
    activate(tabs[0].getAttribute("data-marketing-gallery-tab"), false);
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
