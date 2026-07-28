(() => {
  const story = document.querySelector("[data-product-story]");
  if (!story) return;

  const controls = [...story.querySelectorAll("[data-chapter-control]")];
  const frames = [...story.querySelectorAll("[data-product-frame]")];
  const steps = [...story.querySelectorAll("[data-chapter-step]")];
  const desktopQuery = window.matchMedia("(min-width: 900px)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let activeChapter = 0;
  let observer;

  const setActiveChapter = (index) => {
    if (index < 0 || index >= controls.length || index === activeChapter) return;
    activeChapter = index;

    controls.forEach((control, controlIndex) => {
      const isActive = controlIndex === index;
      control.setAttribute("aria-expanded", String(isActive));
      control.toggleAttribute("aria-current", isActive);
      const description = control.querySelector(".chapter-description");
      if (description) description.hidden = !isActive;
    });

    frames.forEach((frame, frameIndex) => {
      const isActive = frameIndex === index;
      frame.classList.toggle("is-active", isActive);
      frame.setAttribute("aria-hidden", String(!isActive));
    });
  };

  const initialChapter = Number.parseInt(new URLSearchParams(window.location.search).get("chapter"), 10) - 1;
  if (Number.isInteger(initialChapter) && initialChapter >= 0 && initialChapter < controls.length) {
    activeChapter = -1;
    setActiveChapter(initialChapter);
  }

  controls.forEach((control, index) => {
    control.addEventListener("click", () => {
      setActiveChapter(index);
      steps[index]?.scrollIntoView({
        behavior: reducedMotion.matches ? "auto" : "smooth",
        block: "center",
      });
    });
  });

  const startObserver = () => {
    observer?.disconnect();
    observer = undefined;
    if (!desktopQuery.matches) return;

    observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visibleEntry) return;
        setActiveChapter(Number(visibleEntry.target.dataset.chapterStep));
      },
      {
        rootMargin: "-42% 0px -42% 0px",
        threshold: [0, 0.1, 0.5, 1],
      },
    );

    steps.forEach((step) => observer.observe(step));
  };

  startObserver();
  if (desktopQuery.matches && Number.isInteger(initialChapter) && initialChapter >= 0 && initialChapter < steps.length) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setActiveChapter(initialChapter);
        steps[initialChapter]?.scrollIntoView({ behavior: "auto", block: "center" });
      });
    });
  }
  desktopQuery.addEventListener("change", startObserver);
})();
