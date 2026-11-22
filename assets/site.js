/* Homepage interactions: theme toggle, mobile nav, header state,
   scroll reveal, reading progress, and the Brownian-particle hero. */
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

  /* ---- Hero: overdamped Brownian particles ----------------------------
     Each particle follows an Ornstein–Uhlenbeck step toward its home point,
       x ← x + θ (x₀ − x) Δt + σ √Δt ξ,   ξ ~ N(0, 1),
     and nearby particles are joined by faint bonds. */
  var canvas = document.querySelector(".hero-canvas");
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext("2d");
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0, particles = [], running = false, visible = true, raf = 0;
  var theta = 0.6, sigma = 26, dt = 1 / 60, bond = 92;

  function gauss() {
    var u = 1 - Math.random(), v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  function resize() {
    var r = canvas.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = Math.round(Math.min(64, Math.max(22, (W * H) / 9000)));
    particles = [];
    for (var i = 0; i < n; i++) {
      var hx = W * (0.35 + 0.65 * Math.random());
      var hy = H * Math.random();
      particles.push({ x: hx, y: hy, hx: hx, hy: hy, r: 1.2 + Math.random() * 2.2 });
    }
  }

  function rgb() {
    return getComputedStyle(root).getPropertyValue("--particle").trim() || "47, 84, 200";
  }

  function draw(step) {
    var c = rgb(), i, j, p, q, dx, dy, d2, b2 = bond * bond, sq = Math.sqrt(dt);
    ctx.clearRect(0, 0, W, H);
    if (step) {
      for (i = 0; i < particles.length; i++) {
        p = particles[i];
        p.x += theta * (p.hx - p.x) * dt + sigma * sq * gauss();
        p.y += theta * (p.hy - p.y) * dt + sigma * sq * gauss();
      }
    }
    ctx.lineWidth = 1;
    for (i = 0; i < particles.length; i++) {
      p = particles[i];
      for (j = i + 1; j < particles.length; j++) {
        q = particles[j];
        dx = p.x - q.x; dy = p.y - q.y; d2 = dx * dx + dy * dy;
        if (d2 < b2) {
          ctx.strokeStyle = "rgba(" + c + "," + (0.22 * (1 - d2 / b2)).toFixed(3) + ")";
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
    }
    ctx.fillStyle = "rgba(" + c + ",0.55)";
    for (i = 0; i < particles.length; i++) {
      p = particles[i];
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI); ctx.fill();
    }
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
  canvas.classList.add("is-ready");
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
