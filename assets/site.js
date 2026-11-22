/* Homepage interactions: theme toggle, mobile nav, header state,
   scroll reveal, reading progress, palette picker, and the sample-path hero plot. */
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
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { /* storage blocked */ }
      syncLabel();
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

  /* ---- Scroll reveal --------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (!reduceMotion && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---- Hero: a family of stochastic sample paths ----------------------
     On the unit square (u → right, v → down) path k is a smooth mean plus
     a rough noise path,
       v_k(u) = v₀ + k·Δv − A·exp(−(u − μ − k·δ)² / 2s²) − β·u + η_k(u),
     where η_k is an Ornstein–Uhlenbeck process in u,
       η_{i+1} = η_i − θ η_i Δu + σ √Δu ξ_i,   ξ_i ~ N(0, 1).
     New samples enter on the right and the paths scroll left, so the
     picture is a live trace. A crosshair marks path k = mid at u = μ. */
  var canvas = document.querySelector(".hero-canvas");
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext("2d");
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0, running = false, visible = true, raf = 0, frame = 0;
  var N = 11, v0 = 0.64, dv = 0.04, delta = -0.012, s = 0.16, beta = 0.12, A = 0.3, mu = 0.6;
  var M = 220, du = 1 / (M - 1), theta = 6, sigma = 0.085;
  var eta = [];

  function gauss() {
    var a = 1 - Math.random(), b = Math.random();
    return Math.sqrt(-2 * Math.log(a)) * Math.cos(2 * Math.PI * b);
  }

  function ouStep(x) {
    return x - theta * x * du + sigma * Math.sqrt(du) * gauss();
  }

  for (var k = 0; k < N; k++) {
    var path = [sigma / Math.sqrt(2 * theta) * gauss()];
    for (var i = 1; i < M; i++) path.push(ouStep(path[i - 1]));
    eta.push(path);
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

  function meanV(k, u) {
    var c = k - (N - 1) / 2, x = u - mu - c * delta;
    return v0 + c * dv - A * Math.exp(-(x * x) / (2 * s * s)) - beta * u;
  }

  function advance() {
    for (var k = 0; k < N; k++) {
      var p = eta[k];
      p.shift();
      p.push(ouStep(p[p.length - 1]));
    }
  }

  function draw(step) {
    var i, k, u;
    if (step && (frame++ % 2 === 0)) advance();
    ctx.clearRect(0, 0, W, H);
    ctx.lineWidth = 1;
    ctx.lineJoin = "round";
    ctx.strokeStyle = cssVar("--plot", "#6f9488");
    for (k = 0; k < N; k++) {
      ctx.beginPath();
      for (i = 0; i < M; i++) {
        u = i * du;
        var y = (meanV(k, u) + eta[k][i]) * H;
        if (i === 0) ctx.moveTo(0, y); else ctx.lineTo(u * W, y);
      }
      ctx.stroke();
    }
    var mid = (N - 1) / 2, im = Math.round(mu / du);
    var cx = im * du * W, cy = (meanV(mid, im * du) + eta[mid][im]) * H;
    var copper = cssVar("--accent-2", "#b8693d");
    ctx.strokeStyle = copper;
    ctx.fillStyle = copper;
    ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.arc(cx, cy, 9, 0, 2 * Math.PI); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - 17, cy); ctx.lineTo(cx - 5, cy);
    ctx.moveTo(cx + 5, cy); ctx.lineTo(cx + 17, cy);
    ctx.moveTo(cx, cy - 17); ctx.lineTo(cx, cy - 5);
    ctx.moveTo(cx, cy + 5); ctx.lineTo(cx, cy + 17);
    ctx.stroke();
    ctx.beginPath(); ctx.arc(cx, cy, 2.6, 0, 2 * Math.PI); ctx.fill();
  }

  function loop() {
    if (!running) return;
    draw(true);
    raf = window.requestAnimationFrame(loop);
  }

  function start() {
    if (running || reduceMotion || !visible || document.hidden) return;
    running = true; raf = window.requestAnimationFrame(loop);
  }

  function stop() { running = false; window.cancelAnimationFrame(raf); }

  resize();
  draw(false);
  start();

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { resize(); draw(false); }, 150);
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop(); else start();
  });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) start(); else stop();
    }).observe(canvas);
  }

  if (themeBtn) themeBtn.addEventListener("click", function () { if (!running) draw(false); });
  document.addEventListener("palettechange", function () { if (!running) draw(false); });
})();
