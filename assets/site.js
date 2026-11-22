/* Homepage interactions: theme toggle, mobile nav, header state,
   scroll reveal, reading progress, and the fluctuating-curves hero plot. */
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

  /* ---- Hero: a family of fluctuating curves ----------------------------
     On the unit square (u → right, v → down) curve k is
       v_k(u, t) = v₀ + k·Δv − A_k(t)·exp(−(u − μ(t) − k·δ)² / 2s²) − β·u,
     where each amplitude A_k follows an Ornstein–Uhlenbeck process
       A ← A + θ (Ā − A) Δt + σ √Δt ξ,   ξ ~ N(0, 1),
     and the crest position μ(t) drifts slowly. A crosshair tracks the crest
     of the middle curve. */
  var canvas = document.querySelector(".hero-canvas");
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext("2d");
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0, running = false, visible = true, raf = 0, t = 0;
  var N = 11, v0 = 0.64, dv = 0.04, delta = -0.012, s = 0.16, beta = 0.12;
  var Abar = 0.3, theta = 0.8, sigma = 0.06, dt = 1 / 60;
  var A = [];
  for (var k = 0; k < N; k++) A.push(Abar);

  function gauss() {
    var a = 1 - Math.random(), b = Math.random();
    return Math.sqrt(-2 * Math.log(a)) * Math.cos(2 * Math.PI * b);
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

  function mu() { return 0.6 + 0.07 * Math.sin(0.35 * t); }

  function curveV(k, u, m) {
    var c = k - (N - 1) / 2, x = u - m - c * delta;
    return v0 + c * dv - A[k] * Math.exp(-(x * x) / (2 * s * s)) - beta * u;
  }

  function draw(step) {
    var i, k, u, m, sq = Math.sqrt(dt), steps = 90;
    if (step) {
      t += dt;
      for (k = 0; k < N; k++) A[k] += theta * (Abar - A[k]) * dt + sigma * sq * gauss();
    }
    m = mu();
    ctx.clearRect(0, 0, W, H);
    ctx.lineWidth = 1.1;
    ctx.strokeStyle = cssVar("--plot", "#6f9488");
    for (k = 0; k < N; k++) {
      ctx.beginPath();
      for (i = 0; i <= steps; i++) {
        u = i / steps;
        var y = curveV(k, u, m) * H;
        if (i === 0) ctx.moveTo(u * W, y); else ctx.lineTo(u * W, y);
      }
      ctx.stroke();
    }
    var mid = (N - 1) / 2, cx = m * W, cy = curveV(mid, m, m) * H;
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
})();
