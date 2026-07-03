const fs = require("fs");
const path = require("path");
const http = require("http");
const { spawn } = require("child_process");

const root = process.cwd();
const artifacts = path.join(root, ".codex-artifacts");
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const port = 9337;
const url = "http://127.0.0.1:4214/";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getJson(target) {
  return new Promise((resolve, reject) => {
    http.get(target, (response) => {
      let body = "";
      response.on("data", (chunk) => (body += chunk));
      response.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(error);
        }
      });
    }).on("error", reject);
  });
}

async function waitForChrome() {
  for (let i = 0; i < 60; i += 1) {
    try {
      return await getJson(`http://127.0.0.1:${port}/json/version`);
    } catch (_error) {
      await delay(250);
    }
  }
  throw new Error("Chrome did not start");
}

function connect(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();
  const listeners = new Map();

  ws.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result || {});
      return;
    }

    const handlers = listeners.get(message.method);
    if (handlers) handlers.forEach((handler) => handler(message.params || {}));
  });

  return new Promise((resolve, reject) => {
    ws.addEventListener("open", () => {
      resolve({
        send(method, params = {}) {
          id += 1;
          ws.send(JSON.stringify({ id, method, params }));
          return new Promise((resolveRequest, rejectRequest) => {
            pending.set(id, { resolve: resolveRequest, reject: rejectRequest });
          });
        },
        once(method) {
          return new Promise((resolveEvent) => {
            const handler = (params) => {
              const handlers = listeners.get(method) || [];
              listeners.set(method, handlers.filter((item) => item !== handler));
              resolveEvent(params);
            };
            const handlers = listeners.get(method) || [];
            handlers.push(handler);
            listeners.set(method, handlers);
          });
        },
        on(method, handler) {
          const handlers = listeners.get(method) || [];
          handlers.push(handler);
          listeners.set(method, handlers);
        },
        close() {
          ws.close();
        },
      });
    });
    ws.addEventListener("error", reject);
  });
}

function padClip(rect, pad, viewportWidth) {
  const x = Math.max(0, rect.x - pad);
  const y = Math.max(0, rect.y - pad);
  const width = Math.min(viewportWidth - x, rect.width + pad * 2);
  return {
    x,
    y,
    width,
    height: rect.height + pad * 2,
    scale: 1,
  };
}

async function main() {
  fs.mkdirSync(artifacts, { recursive: true });

  const chrome = spawn(chromePath, [
    "--headless=new",
    "--disable-gpu",
    "--disable-gpu-compositing",
    "--disable-dev-shm-usage",
    "--no-sandbox",
    "--no-first-run",
    "--disable-extensions",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${path.join(artifacts, `chrome-profile-${Date.now()}`)}`,
    "about:blank",
  ], { stdio: "ignore" });

  await waitForChrome();
  const targets = await getJson(`http://127.0.0.1:${port}/json/list`);
  const pageTarget = targets.find((target) => target.type === "page");
  if (!pageTarget) {
    throw new Error("Chrome page target was not available");
  }
  const client = await connect(pageTarget.webSocketDebuggerUrl);
  const consoleMessages = [];

  client.on("Runtime.exceptionThrown", (event) => {
    consoleMessages.push({ type: "exception", text: event.exceptionDetails && event.exceptionDetails.text });
  });
  client.on("Log.entryAdded", (event) => {
    if (event.entry && event.entry.level === "error") {
      consoleMessages.push({ type: "log", text: event.entry.text });
    }
  });

  await client.send("Page.enable");
  await client.send("Runtime.enable");
  await client.send("Log.enable");

  async function setViewport(width, height) {
    await client.send("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width <= 480,
      screenWidth: width,
      screenHeight: height,
    });
  }

  async function evaluate(expression, awaitPromise = false) {
    const result = await client.send("Runtime.evaluate", {
      expression,
      awaitPromise,
      returnByValue: true,
    });
    if (result.exceptionDetails) {
      const details = result.exceptionDetails.exception && result.exceptionDetails.exception.description;
      throw new Error(details || result.exceptionDetails.text || "Runtime evaluation failed");
    }
    return result.result.value;
  }

  async function navigate(width = 1440, height = 980) {
    await setViewport(width, height);
    const loaded = client.once("Page.loadEventFired");
    await client.send("Page.navigate", { url });
    await loaded;
    await evaluate(`Promise.all(Array.from(document.images).map((img) => img.complete ? true : new Promise((resolve) => { img.addEventListener("load", resolve, { once: true }); img.addEventListener("error", resolve, { once: true }); })))`, true);
    await delay(600);
  }

  async function rect(selector) {
    return evaluate(`(() => {
      const el = document.querySelector(${JSON.stringify(selector)});
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.left + scrollX, y: r.top + scrollY, width: r.width, height: r.height, top: r.top + scrollY, left: r.left + scrollX, right: r.right + scrollX, bottom: r.bottom + scrollY };
    })()`);
  }

  async function rects(selector) {
    return evaluate(`Array.from(document.querySelectorAll(${JSON.stringify(selector)})).map((el) => {
      const r = el.getBoundingClientRect();
      return { x: r.left + scrollX, y: r.top + scrollY, width: r.width, height: r.height, top: r.top + scrollY, left: r.left + scrollX, right: r.right + scrollX, bottom: r.bottom + scrollY };
    })`);
  }

  async function screenshotSelector(name, selector, width = 1440, pad = 16) {
    const target = await rect(selector);
    if (!target) throw new Error(`Missing screenshot selector ${selector}`);
    const screenshot = await client.send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: true,
      clip: padClip(target, pad, width),
    });
    fs.writeFileSync(path.join(artifacts, name), Buffer.from(screenshot.data, "base64"));
  }

  async function screenshotFull(name, width, height) {
    await setViewport(width, height);
    await delay(250);
    const docHeight = await evaluate(`Math.ceil(Math.max(document.documentElement.scrollHeight, document.body.scrollHeight))`);
    const screenshot = await client.send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: true,
      clip: { x: 0, y: 0, width, height: docHeight, scale: 1 },
    });
    fs.writeFileSync(path.join(artifacts, name), Buffer.from(screenshot.data, "base64"));
  }

  function summarize(rectList) {
    return rectList.map((item) => ({
      width: Math.round(item.width * 100) / 100,
      height: Math.round(item.height * 100) / 100,
      top: Math.round(item.top * 100) / 100,
      left: Math.round(item.left * 100) / 100,
      right: Math.round(item.right * 100) / 100,
      bottom: Math.round(item.bottom * 100) / 100,
    }));
  }

  function centers(rectList) {
    return rectList.map((item) => ({
      x: Math.round((item.left + item.width / 2) * 100) / 100,
      y: Math.round((item.top + item.height / 2) * 100) / 100,
    }));
  }

  const report = { url, screenshots: [], consoleMessages };

  await navigate(1440, 980);
  await evaluate(`document.querySelector("[data-hero-carousel]")?.dispatchEvent(new Event("mouseenter"));`);

  report.carousel = [];
  for (const index of [0, 1, 2]) {
    await evaluate(`document.querySelector('[data-hero-slide-control="${index}"]')?.click();`);
    await delay(600);
    const slide = await evaluate(`(() => {
      const viewportEl = document.querySelector(".hero-carousel__slides");
      const img = document.querySelector('.hero-carousel__image.is-active');
      if (!viewportEl || !img) return { missing: true, activeImages: document.querySelectorAll('.hero-carousel__image.is-active').length };
      const viewport = viewportEl.getBoundingClientRect();
      const r = img.getBoundingClientRect();
      const natural = { width: img.naturalWidth, height: img.naturalHeight, src: img.getAttribute("src"), objectFit: getComputedStyle(img).objectFit };
      const scale = Math.min(viewport.width / natural.width, viewport.height / natural.height);
      return {
        viewport: { width: viewport.width, height: viewport.height },
        element: { width: r.width, height: r.height },
        renderedImage: { width: natural.width * scale, height: natural.height * scale },
        natural,
      };
    })()`);
    report.carousel.push(slide);
    const name = `hero-carousel-slide-${index + 1}-1440.png`;
    await screenshotSelector(name, ".hero-section", 1440, 0);
    report.screenshots.push(name);
  }

  await screenshotSelector("before-myta-1440.png", ".instructor-challenge", 1440, 12);
  await screenshotSelector("control-learning-1440.png", ".control-learning", 1440, 12);
  await screenshotSelector("lms-workflow-1440.png", ".existing-workflow", 1440, 12);
  report.screenshots.push("before-myta-1440.png", "control-learning-1440.png", "lms-workflow-1440.png");

  for (const [index, name] of ["publisher", "lms", "tutors"].entries()) {
    await evaluate(`Array.from(document.querySelectorAll(".difference-accordion__item")).forEach((item, idx) => { item.open = idx === ${index}; });`);
    await delay(350);
    const file = `comparison-${name}-1440.png`;
    await screenshotSelector(file, ".myta-difference", 1440, 12);
    report.screenshots.push(file);
  }

  await screenshotSelector("myta-panel-1440.png", ".difference-row--myta", 1440, 12);
  report.screenshots.push("myta-panel-1440.png");

  await screenshotFull("home-1440.png", 1440, 980);
  report.screenshots.push("home-1440.png");

  await navigate(1024, 900);
  await screenshotFull("home-1024.png", 1024, 900);
  report.screenshots.push("home-1024.png");

  await navigate(390, 900);
  await screenshotFull("home-390.png", 390, 900);
  report.screenshots.push("home-390.png");

  await navigate(1440, 980);
  await evaluate(`Array.from(document.querySelectorAll(".difference-accordion__item")).forEach((item, idx) => { item.open = idx === 0; });`);
  await delay(250);

  const timelineCards = await rects(".challenge-step__card");
  const timelineIcons = await rects(".challenge-step__icon");
  const timelineNumbers = await rects(".challenge-step__number");
  report.beforeMyTA = {
    summaryColumns: summarize(await rects(".challenge-summary__item")),
    timelineCards: summarize(timelineCards),
    timelineIcons: summarize(timelineIcons),
    timelineNumbers: summarize(timelineNumbers),
    iconToNumberGaps: timelineIcons.map((item, index) => Math.round((timelineNumbers[index].top - item.bottom) * 100) / 100),
    numberToCardGaps: timelineNumbers.map((item, index) => Math.round((timelineCards[index].top - item.bottom) * 100) / 100),
  };

  const leftPanel = await rect(".control-panel--course");
  const arrowRect = await rect(".course-context-arrow");
  const circleRect = await rect(".course-context-core");
  const calloutRect = await rect(".course-bound-callout");
  report.controlLearning = {
    coursePanel: summarize([leftPanel])[0],
    centers: {
      panel: centers([leftPanel])[0],
      arrow: centers([arrowRect])[0],
      circle: centers([circleRect])[0],
      callout: centers([calloutRect])[0],
    },
    sourceTiles: summarize(await rects(".course-inputs li")),
    principleCards: summarize(await rects(".learning-principles li:not(.learning-principles__featured)")),
    outerPanels: summarize(await rects(".control-panel")),
  };

  report.lmsContainment = {};
  for (const width of [1440, 1280, 1024]) {
    await navigate(width, 900);
    const panel = await rect(".workflow-panel--lms");
    const surface = await rect(".lms-flow");
    const sources = await rects(".lms-flow__sources li");
    const nodes = await rects(".lms-flow__node");
    const contains = [surface, ...sources, ...nodes].every((child) => child.left >= panel.left - 0.5 && child.right <= panel.right + 0.5 && child.top >= panel.top - 0.5 && child.bottom <= panel.bottom + 0.5)
      && [...sources, ...nodes].every((child) => child.left >= surface.left - 0.5 && child.right <= surface.right + 0.5 && child.top >= surface.top - 0.5 && child.bottom <= surface.bottom + 0.5);
    report.lmsContainment[width] = {
      panel: summarize([panel])[0],
      surface: summarize([surface])[0],
      sourceTiles: summarize(sources),
      nodes: summarize(nodes),
      contains,
    };
  }

  await navigate(1440, 980);
  report.comparison = {};
  for (const [index, name] of ["publisher", "lms", "tutors"].entries()) {
    await evaluate(`Array.from(document.querySelectorAll(".difference-accordion__item")).forEach((item, idx) => { item.open = idx === ${index}; });`);
    await delay(250);
    report.comparison[name] = {
      cards: summarize(await rects(".difference-accordion__item[open] .difference-detail")),
      headings: summarize(await rects(".difference-accordion__item[open] .difference-detail__heading")),
      chips: summarize(await rects(".difference-accordion__item[open] .difference-detail--focus li")),
    };
  }

  report.mytaPanel = {
    systemColumns: summarize(await rects(".myta-system-flow li")),
    systemCircles: summarize(await rects(".myta-system-flow span")),
    starCircle: summarize(await rects(".difference-myta-conclusion > span"))[0],
    centers: {
      identity: centers(await rects(".difference-myta-identity"))[0],
      systemGrid: centers(await rects(".myta-system-flow ol"))[0],
      conclusion: centers(await rects(".difference-myta-conclusion"))[0],
    },
  };

  report.overflow = {};
  for (const width of [1440, 1280, 1024, 768, 390]) {
    await navigate(width, 900);
    report.overflow[width] = await evaluate(`(() => {
      const clientWidth = document.documentElement.clientWidth;
      const offenders = Array.from(document.querySelectorAll("body *")).map((el) => {
        const r = el.getBoundingClientRect();
        return { tag: el.tagName.toLowerCase(), className: String(el.className || ""), id: el.id || "", left: r.left, right: r.right, width: r.width };
      }).filter((item) => item.right > clientWidth + 1 || item.left < -1).slice(0, 20);
      return { clientWidth, scrollWidth: document.documentElement.scrollWidth, hasHorizontalOverflow: document.documentElement.scrollWidth > clientWidth + 1, offenders };
    })()`);
  }

  fs.writeFileSync(path.join(artifacts, "layout-report.json"), JSON.stringify(report, null, 2));
  client.close();
  chrome.kill();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
