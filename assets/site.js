/* Homepage interactions: theme toggle, mobile nav, header state,
   scroll reveal, page transitions, palette picker, and the sample-path hero plot. */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function isDark() {
    var t = root.getAttribute("data-theme");
    return t ? t === "dark" : darkQuery.matches;
  }

  /* ---- Theme toggle ---------------------------------------------------- */
  var themeBtn = document.querySelector(".theme-toggle");
  if (themeBtn) {
    var syncLabel = function () {
      themeBtn.setAttribute("aria-pressed", isDark() ? "true" : "false");
    };
    syncLabel();
    themeBtn.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      var apply = function () {
        root.setAttribute("data-theme", next);
        try { localStorage.setItem("theme", next); } catch (e) { /* storage blocked */ }
        syncLabel();
        document.dispatchEvent(new Event("themechange"));
      };
      /* Circular wipe from the toggle button where View Transitions exist */
      if (!document.startViewTransition || reduceMotion) { apply(); return; }
      var r = themeBtn.getBoundingClientRect();
      root.style.setProperty("--vt-x", (r.left + r.width / 2) + "px");
      root.style.setProperty("--vt-y", (r.top + r.height / 2) + "px");
      root.classList.add("theme-vt");
      var vt = document.startViewTransition(apply);
      vt.finished.finally(function () { root.classList.remove("theme-vt"); });
    });
  }

  /* ---- Palette picker ------------------------------------------------- */
  var swatches = document.querySelectorAll(".palette-picker button");
  function syncSwatches() {
    var cur = root.getAttribute("data-palette");
    swatches.forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-palette") === cur ? "true" : "false");
    });
  }
  swatches.forEach(function (b) {
    b.addEventListener("click", function () {
      var key = b.getAttribute("data-palette");
      root.setAttribute("data-palette", key);
      try { localStorage.setItem("palette", key); } catch (e) { /* storage blocked */ }
      syncSwatches();
      document.dispatchEvent(new Event("palettechange"));
    });
  });
  syncSwatches();

  /* ---- Mobile navigation ---------------------------------------------- */
  var navBtn = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (navBtn && nav) {
    navBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        navBtn.setAttribute("aria-expanded", "false");
        navBtn.focus();
      }
    });
  }

  /* ---- Header shadow + reading progress -------------------------------- */
  var header = document.querySelector(".site-header");
  var bar = document.querySelector(".read-progress");
  var isPost = document.body.classList.contains("layout-post");
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || root.scrollTop;
    if (header) header.classList.toggle("is-scrolled", y > 8);
    if (bar && isPost) {
      var max = root.scrollHeight - window.innerHeight;
      bar.style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0) + ")";
    }
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---- Scroll reveal --------------------------------------------------
     Content blocks on every page fade up as they enter the viewport.
     Items that enter together are staggered by 60 ms each. */
  var autoReveal = [
    ".page > h2", ".page > p", ".page > ul", ".page > blockquote",
    "ul.pub-list > li", "ul.timeline > li",
    ".post-body > h2", ".post-body > h3", ".post-body > p", ".post-body > ul",
    ".post-body > ol", ".post-body > blockquote", ".post-body > pre",
    ".post-body > .highlight", ".post-body > figure", ".post-body > img",
    ".feature", ".tag-cloud", ".post-footer-nav"
  ].join(",");
  document.querySelectorAll(autoReveal).forEach(function (el) {
    if (!el.closest(".reveal")) el.classList.add("reveal");
  });

  var revealEls = document.querySelectorAll(".reveal");
  if (!reduceMotion && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      var n = 0;
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = Math.min(n++, 8) * 60 + "ms";
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.04 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---- Hero: a static family of stochastic sample paths ---------------
     On the unit square (u → right, v → down) path k is a smooth mean plus
     a rough noise path,
       v_k(u) = k·Δv − A·exp(−(u − μ − k·δ)² / 2s²) − β·u + η_k(u),
     where η_k is an Ornstein–Uhlenbeck process in u,
       η_{i+1} = η_i − θ η_i Δu + σ √Δu ξ_i,   ξ_i ~ N(0, 1).
     The paths are sampled once from a fixed seed and scaled to fit the
     panel; CSS reveals the canvas from left to right once on load. */
  var canvas = document.querySelector(".hero-canvas");
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext("2d");
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0;
  var N = 11, dv = 0.04, delta = -0.012, s = 0.16, beta = 0.12, A = 0.3, mu = 0.6;
  var M = 220, du = 1 / (M - 1), theta = 6, sigma = 0.085, pad = 0.09;

  /* mulberry32: small seeded uniform RNG, so the picture is the same on every load */
  var seed = 20241105;
  function rand() {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  function gauss() {
    var a = 1 - rand(), b = rand();
    return Math.sqrt(-2 * Math.log(a)) * Math.cos(2 * Math.PI * b);
  }

  var paths = [], vmin = Infinity, vmax = -Infinity;
  for (var k = 0; k < N; k++) {
    var c = k - (N - 1) / 2, eta = sigma / Math.sqrt(2 * theta) * gauss(), row = [];
    for (var i = 0; i < M; i++) {
      var u = i * du, x = u - mu - c * delta;
      if (i > 0) eta = eta - theta * eta * du + sigma * Math.sqrt(du) * gauss();
      var v = c * dv - A * Math.exp(-(x * x) / (2 * s * s)) - beta * u + eta;
      row.push(v);
      if (v < vmin) vmin = v;
      if (v > vmax) vmax = v;
    }
    paths.push(row);
  }

  function cssVar(name, fallback) {
    return getComputedStyle(root).getPropertyValue(name).trim() || fallback;
  }

  function resize() {
    var r = canvas.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw() {
    var scale = (1 - 2 * pad) / (vmax - vmin);
    ctx.clearRect(0, 0, W, H);
    ctx.lineWidth = 1;
    ctx.lineJoin = "round";
    ctx.strokeStyle = cssVar("--plot", "#6f9488");
    for (var k = 0; k < N; k++) {
      ctx.beginPath();
      for (var i = 0; i < M; i++) {
        var y = (pad + (paths[k][i] - vmin) * scale) * H;
        if (i === 0) ctx.moveTo(0, y); else ctx.lineTo(i * du * W, y);
      }
      ctx.stroke();
    }
  }

  resize();
  draw();

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { resize(); draw(); }, 150);
  });
  document.addEventListener("themechange", draw);
  document.addEventListener("palettechange", draw);
})();
