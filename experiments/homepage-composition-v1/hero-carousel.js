(() => {
  const carousel = document.querySelector(".carousel");
  const slides = [...document.querySelectorAll(".carousel-slide")];
  const indicators = [...document.querySelectorAll("[data-slide-control]")];
  const previousButton = document.querySelector(".carousel-previous");
  const nextButton = document.querySelector(".carousel-next");
  const rotationButton = document.querySelector(".rotation-toggle");
  const status = document.querySelector("[data-carousel-status]");
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".header-navigation");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobileViewport = window.matchMedia("(max-width: 560px)");
  const slideNames = ["Assignment workspace", "Student dashboard", "Study workspace"];
  const rotationDelay = 5000;

  let activeIndex = 0;
  let timer = null;
  let pointerPaused = false;
  let focusPaused = false;
  let manualStopped = reducedMotion.matches;
  let touchStartX = null;
  let touchStartY = null;

  const rotationIsPaused = () =>
    manualStopped ||
    pointerPaused ||
    focusPaused ||
    document.hidden ||
    reducedMotion.matches ||
    mobileViewport.matches;

  const updateRotationButton = () => {
    const paused = manualStopped || reducedMotion.matches;
    rotationButton.hidden = mobileViewport.matches;
    rotationButton.disabled = mobileViewport.matches;
    rotationButton.setAttribute("aria-pressed", String(paused));
    rotationButton.setAttribute(
      "aria-label",
      paused ? "Play automatic slide rotation" : "Pause automatic slide rotation"
    );
  };

  const stopTimer = () => {
    if (timer !== null) {
      window.clearTimeout(timer);
      timer = null;
    }
  };

  const scheduleRotation = () => {
    stopTimer();
    if (rotationIsPaused()) return;
    timer = window.setTimeout(() => {
      showSlide((activeIndex + 1) % slides.length, { manual: false });
    }, rotationDelay);
  };

  const showSlide = (index, { manual = true, announce = manual } = {}) => {
    activeIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const position = (slideIndex - activeIndex + slides.length) % slides.length;
      slide.dataset.position = String(position);
      slide.setAttribute("aria-hidden", position === 0 ? "false" : "true");
    });

    indicators.forEach((indicator, indicatorIndex) => {
      if (indicatorIndex === activeIndex) {
        indicator.setAttribute("aria-current", "true");
      } else {
        indicator.removeAttribute("aria-current");
      }
    });

    if (manual) {
      manualStopped = true;
      updateRotationButton();
    }

    if (announce) {
      status.textContent = `${slideNames[activeIndex]}, slide ${activeIndex + 1} of ${slides.length}`;
    }

    scheduleRotation();
  };

  previousButton.addEventListener("click", () => showSlide(activeIndex - 1));
  nextButton.addEventListener("click", () => showSlide(activeIndex + 1));

  indicators.forEach((indicator) => {
    indicator.addEventListener("click", () => {
      showSlide(Number(indicator.dataset.slideControl));
    });
  });

  rotationButton.addEventListener("click", () => {
    manualStopped = !manualStopped;
    updateRotationButton();
    scheduleRotation();
  });

  carousel.addEventListener("mouseenter", () => {
    pointerPaused = true;
    stopTimer();
  });

  carousel.addEventListener("mouseleave", () => {
    pointerPaused = false;
    scheduleRotation();
  });

  carousel.addEventListener("focusin", () => {
    focusPaused = true;
    stopTimer();
  });

  carousel.addEventListener("focusout", () => {
    window.setTimeout(() => {
      focusPaused = carousel.contains(document.activeElement);
      scheduleRotation();
    }, 0);
  });

  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showSlide(activeIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showSlide(activeIndex + 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      showSlide(0);
    } else if (event.key === "End") {
      event.preventDefault();
      showSlide(slides.length - 1);
    }
  });

  carousel.addEventListener(
    "touchstart",
    (event) => {
      const touch = event.changedTouches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    },
    { passive: true }
  );

  carousel.addEventListener(
    "touchend",
    (event) => {
      if (touchStartX === null || touchStartY === null) return;
      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;
      touchStartX = null;
      touchStartY = null;

      if (Math.abs(deltaX) < 46 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
      showSlide(deltaX < 0 ? activeIndex + 1 : activeIndex - 1);
    },
    { passive: true }
  );

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopTimer();
    else scheduleRotation();
  });

  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) manualStopped = true;
    updateRotationButton();
    scheduleRotation();
  });

  mobileViewport.addEventListener("change", () => {
    updateRotationButton();
    scheduleRotation();
  });

  const closeMenu = ({ restoreFocus = false } = {}) => {
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.querySelector(".visually-hidden").textContent = "Open navigation";
    if (restoreFocus) menuButton.focus();
  };

  menuButton.addEventListener("click", () => {
    const opening = menuButton.getAttribute("aria-expanded") !== "true";
    if (opening) {
      navigation.classList.add("is-open");
      menuButton.setAttribute("aria-expanded", "true");
      menuButton.querySelector(".visually-hidden").textContent = "Close navigation";
      navigation.querySelector("a").focus();
    } else {
      closeMenu({ restoreFocus: true });
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      closeMenu({ restoreFocus: true });
    }
  });

  updateRotationButton();
  showSlide(0, { manual: false, announce: false });
})();
