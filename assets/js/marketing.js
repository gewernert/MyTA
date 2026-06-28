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
})();
