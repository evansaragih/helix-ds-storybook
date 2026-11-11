/* ==========================================================================
   Nusantics — Product Pipeline (pipeline.js)
   1. Live 3D Petri Dish renderer + pointer interaction (Intro 240:3439)
   2. Accessible Human / Animal Diagnostics pipeline tab switcher (265:8016)
   3. 3D Perspective Scientist & Sample Vial Hover Interaction (CTA 240:3848)
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Hero looping video: pause when prefers-reduced-motion is active */
  var heroVideo = document.getElementById("pipeline-hero-video");
  if (heroVideo && window.matchMedia) {
    var rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    var syncHeroVideo = function () {
      if (rm.matches) heroVideo.pause();
      else heroVideo.play().catch(function () {});
    };
    rm.addEventListener("change", syncHeroVideo);
    syncHeroVideo();
  }

  /* ------------------------------------------------------------------------
     1. Live 3D Petri Dish Renderer (Intro 240:3439 / 225:25218)
     ------------------------------------------------------------------------ */
  function initPetriDish3D() {
    var canvas = document.getElementById("petri-canvas");
    var stage = document.getElementById("petri-stage");
    if (!canvas || !stage || !window.PETRI_ASSETS) return;

    var ctx = canvas.getContext("2d");
    var LOOP_SECONDS = 6.0;
    var TAU = Math.PI * 2;

    var SPHERE_DEFS = [
      {
        key: "badge_lungs",
        label: "Respiratory",
        ax: -0.04,
        ay: 0.04,
        r: 45,
        bobAmp: 11.5,
        swayX: 6.5,
        phase: 0.0,
        tiltAmp: 0.07,
        glow: "rgba(56, 189, 248, 0.50)",
      },
      {
        key: "badge_livestock",
        label: "Livestock",
        ax: 0.24,
        ay: 0.2,
        r: 45,
        bobAmp: 10.5,
        swayX: 6.0,
        phase: 0.85,
        tiltAmp: 0.06,
        glow: "rgba(56, 189, 248, 0.45)",
      },
      {
        key: "badge_uterus",
        label: "Oncology & HPV",
        ax: 0.2,
        ay: -0.25,
        r: 40,
        bobAmp: 13.0,
        swayX: 7.5,
        phase: 1.7,
        tiltAmp: 0.08,
        glow: "rgba(251, 146, 60, 0.45)",
      },
      {
        key: "badge_fish",
        label: "Aquaculture",
        ax: 0.13,
        ay: -0.05,
        r: 35,
        bobAmp: 9.5,
        swayX: 5.5,
        phase: 2.55,
        tiltAmp: 0.07,
        glow: "rgba(56, 189, 248, 0.48)",
      },
      {
        key: "badge_blood_cells",
        label: "Hematology",
        ax: -0.23,
        ay: -0.04,
        r: 32,
        bobAmp: 10.5,
        swayX: 6.0,
        phase: 3.4,
        tiltAmp: 0.08,
        glow: "rgba(248, 113, 113, 0.42)",
      },
      {
        key: "badge_frosted_orb",
        label: "Reagent Bead",
        ax: -0.31,
        ay: 0.22,
        r: 30,
        bobAmp: 9.0,
        swayX: 5.0,
        phase: 4.15,
        tiltAmp: 0.05,
        glow: "rgba(125, 211, 252, 0.44)",
      },
      {
        key: "badge_pathogens",
        label: "Infectious Disease",
        ax: -0.1,
        ay: -0.23,
        r: 28,
        bobAmp: 11.5,
        swayX: 6.0,
        phase: 4.9,
        tiltAmp: 0.09,
        glow: "rgba(56, 189, 248, 0.44)",
      },
      {
        key: "badge_shrimp",
        label: "Crustacean Dx",
        ax: -0.02,
        ay: -0.15,
        r: 26,
        bobAmp: 8.5,
        swayX: 5.0,
        phase: 5.45,
        tiltAmp: 0.08,
        glow: "rgba(251, 146, 60, 0.42)",
      },
      {
        key: "badge_cancer_cells",
        label: "Cellular Assay",
        ax: 0.03,
        ay: -0.33,
        r: 25,
        bobAmp: 12.5,
        swayX: 6.5,
        phase: 1.2,
        tiltAmp: 0.09,
        glow: "rgba(248, 113, 113, 0.44)",
      },
      {
        key: "white_bead",
        procedural: "pearl",
        ax: -0.2,
        ay: -0.35,
        r: 14,
        bobAmp: 9.5,
        swayX: 4.5,
        phase: 2.1,
        tiltAmp: 0,
        glow: "rgba(255, 255, 255, 0.5)",
      },
      {
        key: "cyan_orb",
        procedural: "cyan",
        ax: 0.31,
        ay: -0.24,
        r: 28,
        bobAmp: 10.5,
        swayX: 5.5,
        phase: 0.4,
        tiltAmp: 0,
        glow: "rgba(56, 189, 248, 0.55)",
      },
      {
        key: "grey_bead",
        procedural: "pearl",
        ax: 0.36,
        ay: -0.3,
        r: 15,
        bobAmp: 8.5,
        swayX: 4.0,
        phase: 3.8,
        tiltAmp: 0,
        glow: "rgba(226, 232, 240, 0.42)",
      },
    ];

    var PARTICLES = [];
    for (var i = 0; i < 24; i++) {
      var s = (i * 9301 + 49297) % 233280;
      var rnd = s / 233280;
      var angle = (i / 24) * TAU + rnd * 0.5;
      var rad = 0.08 + (i % 7) * 0.052;
      PARTICLES.push({
        ax: Math.cos(angle) * rad * 1.15,
        ay: Math.sin(angle) * rad * 0.65 + 0.03,
        phase: (i / 24) * TAU,
        size: 1.8 + (i % 4) * 1.0,
        hue: i % 3 === 0 ? "#7dd3fc" : i % 3 === 1 ? "#38bdf8" : "#fdba74",
      });
    }

    var images = {};
    var loadedCount = 0;
    var assetKeys = Object.keys(window.PETRI_ASSETS);

    assetKeys.forEach(function (k) {
      var img = new Image();
      img.onload = function () {
        loadedCount++;
        if (loadedCount === assetKeys.length) {
          renderFrame(0.35);
        }
      };
      img.src = window.PETRI_ASSETS[k];
      images[k] = img;
    });

    var pointerX = 0;
    var pointerY = 0;
    var targetPointerX = 0;
    var targetPointerY = 0;

    stage.addEventListener("pointermove", function (e) {
      var rect = stage.getBoundingClientRect();
      targetPointerX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetPointerY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    });

    stage.addEventListener("pointerleave", function () {
      targetPointerX = 0;
      targetPointerY = 0;
    });

    function renderFrame(tSeconds) {
      if (loadedCount < assetKeys.length) return;
      var W = canvas.width;
      var H = canvas.height;
      var phase = ((tSeconds % LOOP_SECONDS) / LOOP_SECONDS) * TAU;

      pointerX += (targetPointerX - pointerX) * 0.08;
      pointerY += (targetPointerY - pointerY) * 0.08;

      ctx.clearRect(0, 0, W, H);

      var dishYaw = Math.sin(phase) * 0.022 + pointerX * 0.055;
      var dishPitch = Math.cos(phase) * 0.016 + pointerY * 0.04;
      var dishFloatY = Math.sin(phase) * 6.5;
      var dishBreath = 1 + Math.sin(phase * 2) * 0.006;

      var cx = W * 0.49 + pointerX * 12;
      var cy = H * 0.54 + dishFloatY + pointerY * 8;
      var dishW = W * 0.88 * dishBreath;
      var dishH = dishW * (740 / 1194) * (1 - dishPitch * 0.24);

      /* 1. Ambient floor glow */
      ctx.save();
      var baseGlow = ctx.createRadialGradient(
        cx,
        cy + dishH * 0.17,
        dishW * 0.05,
        cx,
        cy + dishH * 0.17,
        dishW * 0.48
      );
      var glowPulse = 0.24 + 0.08 * Math.sin(phase * 2);
      baseGlow.addColorStop(0, "rgba(56, 189, 248, " + glowPulse.toFixed(3) + ")");
      baseGlow.addColorStop(0.52, "rgba(14, 165, 233, 0.09)");
      baseGlow.addColorStop(1, "rgba(14, 165, 233, 0)");
      ctx.fillStyle = baseGlow;
      ctx.beginPath();
      ctx.ellipse(
        cx,
        cy + dishH * 0.17,
        dishW * 0.47,
        dishH * 0.34,
        0,
        0,
        TAU
      );
      ctx.fill();
      ctx.restore();

      /* 2. Clean 3D Glass Petri Dish + Microarray Base */
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(dishYaw * 0.38);
      ctx.transform(1, dishPitch * 0.08, -dishYaw * 0.12, 1, 0, 0);
      ctx.drawImage(
        images.petri_dish_clean,
        -dishW / 2,
        -dishH / 2,
        dishW,
        dishH
      );

      /* 3. Animated barcode microarray luminescence scan + glass rim sweep */
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(0, dishH * 0.02, dishW * 0.42, dishH * 0.33, 0, 0, TAU);
      ctx.clip();

      var scanY = Math.sin(phase) * (dishH * 0.24);
      var scanGrad = ctx.createLinearGradient(
        0,
        scanY - dishH * 0.12,
        0,
        scanY + dishH * 0.12
      );
      scanGrad.addColorStop(0, "rgba(56, 189, 248, 0)");
      scanGrad.addColorStop(0.5, "rgba(125, 211, 252, 0.22)");
      scanGrad.addColorStop(1, "rgba(56, 189, 248, 0)");
      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = scanGrad;
      ctx.fillRect(-dishW * 0.45, -dishH * 0.36, dishW * 0.9, dishH * 0.72);

      var sweepAngle = phase;
      var sx = Math.cos(sweepAngle) * dishW * 0.34;
      var sy = Math.sin(sweepAngle) * dishH * 0.24;
      var rimGlow = ctx.createRadialGradient(sx, sy, 2, sx, sy, dishW * 0.22);
      rimGlow.addColorStop(0, "rgba(224, 242, 254, 0.28)");
      rimGlow.addColorStop(0.5, "rgba(56, 189, 248, 0.1)");
      rimGlow.addColorStop(1, "rgba(56, 189, 248, 0)");
      ctx.fillStyle = rimGlow;
      ctx.fillRect(-dishW * 0.5, -dishH * 0.5, dishW, dishH);
      ctx.restore();

      /* 4. Rising bioluminescent micro-particles */
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      for (var pIdx = 0; pIdx < PARTICLES.length; pIdx++) {
        var pt = PARTICLES[pIdx];
        var pProg = (phase + pt.phase) % TAU;
        var norm = pProg / TAU;
        var alpha = Math.sin(norm * Math.PI) * 0.65;
        var px = pt.ax * dishW + Math.sin(phase + pt.phase) * 7;
        var py = pt.ay * dishH - norm * 42;
        ctx.fillStyle = pt.hue;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(px, py, pt.size, 0, TAU);
        ctx.fill();
      }
      ctx.restore();
      ctx.restore();

      /* 5. Shadows cast by floating spheres onto the microarray glass plane */
      var sortedSpheres = SPHERE_DEFS.slice().sort(function (a, b) {
        return a.ay - b.ay;
      });

      for (var sIdx = 0; sIdx < sortedSpheres.length; sIdx++) {
        var sp = sortedSpheres[sIdx];
        var bob = Math.sin(phase + sp.phase) * sp.bobAmp;
        var sway = Math.cos(phase + sp.phase * 1.1) * sp.swayX;
        var heightFactor = (bob + sp.bobAmp) / (2 * sp.bobAmp || 1);
        var sxPos = cx + sp.ax * dishW + sway * 0.6 + pointerX * 8;
        var syPos =
          cy +
          (sp.ay + 0.11) * dishH +
          Math.min(dishH * 0.27, Math.max(-dishH * 0.19, sp.ay * dishH * 0.25));
        if (sp.ay > -0.28) {
          ctx.save();
          var shRadius = sp.r * (0.72 - heightFactor * 0.18);
          var shGrad = ctx.createRadialGradient(
            sxPos,
            syPos,
            1,
            sxPos,
            syPos,
            shRadius
          );
          shGrad.addColorStop(
            0,
            "rgba(8, 22, 48, " + (0.32 - heightFactor * 0.12).toFixed(3) + ")"
          );
          shGrad.addColorStop(1, "rgba(8, 22, 48, 0)");
          ctx.fillStyle = shGrad;
          ctx.beginPath();
          ctx.ellipse(sxPos, syPos, shRadius, shRadius * 0.55, 0, 0, TAU);
          ctx.fill();
          ctx.restore();
        }
      }

      /* 6. Floating 3D Diagnostic Spheres */
      for (var j = 0; j < sortedSpheres.length; j++) {
        var item = sortedSpheres[j];
        var bobY = Math.sin(phase + item.phase) * item.bobAmp;
        var swayX = Math.cos(phase + item.phase) * item.swayX;
        var scalePulse = 1 + Math.sin(phase + item.phase) * 0.032;
        var depthParallax = 1 + (0.35 - item.ay) * 0.35;

        var x =
          cx +
          item.ax * dishW +
          swayX +
          pointerX * 15 * depthParallax -
          dishYaw * 24 * depthParallax;
        var y =
          cy +
          item.ay * dishH +
          bobY +
          pointerY * 11 * depthParallax -
          dishPitch * 18 * depthParallax;
        var r = item.r * scalePulse * (W / 1200);
        var rot = Math.sin(phase + item.phase) * item.tiltAmp + pointerX * 0.05;

        ctx.save();
        ctx.translate(x, y);

        var halo = ctx.createRadialGradient(0, 0, r * 0.55, 0, 0, r * 1.36);
        halo.addColorStop(0, item.glow);
        halo.addColorStop(1, "rgba(56, 189, 248, 0)");
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(0, 0, r * 1.36, 0, TAU);
        ctx.fill();

        if (item.procedural === "cyan") {
          var cg = ctx.createRadialGradient(-r * 0.3, -r * 0.3, r * 0.1, 0, 0, r);
          cg.addColorStop(0, "rgba(240, 253, 255, 0.96)");
          cg.addColorStop(0.55, "rgba(125, 211, 252, 0.85)");
          cg.addColorStop(1, "rgba(14, 165, 233, 0.60)");
          ctx.fillStyle = cg;
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, TAU);
          ctx.fill();
        } else if (item.procedural === "pearl") {
          var pg = ctx.createRadialGradient(-r * 0.32, -r * 0.32, r * 0.08, 0, 0, r);
          pg.addColorStop(0, "#ffffff");
          pg.addColorStop(0.65, "#e2e8f0");
          pg.addColorStop(1, "#94a3b8");
          ctx.fillStyle = pg;
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, TAU);
          ctx.fill();
        } else {
          var tex = images[item.key];
          ctx.save();
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, TAU);
          ctx.closePath();
          ctx.clip();
          ctx.rotate(rot);
          ctx.drawImage(tex, -r * 1.03, -r * 1.03, r * 2.06, r * 2.06);

          var shade = ctx.createRadialGradient(
            -r * 0.34,
            -r * 0.36,
            r * 0.12,
            0,
            0,
            r
          );
          shade.addColorStop(0, "rgba(255, 255, 255, 0.32)");
          shade.addColorStop(0.55, "rgba(255, 255, 255, 0)");
          shade.addColorStop(0.84, "rgba(15, 23, 42, 0.06)");
          shade.addColorStop(1, "rgba(14, 165, 233, 0.22)");
          ctx.fillStyle = shade;
          ctx.fillRect(-r, -r, r * 2, r * 2);
          ctx.restore();

          ctx.strokeStyle = "rgba(255, 255, 255, 0.65)";
          ctx.lineWidth = Math.max(1.2, r * 0.036);
          ctx.beginPath();
          ctx.arc(0, 0, r - ctx.lineWidth * 0.5, 0, TAU);
          ctx.stroke();

          ctx.fillStyle = "rgba(255, 255, 255, 0.52)";
          ctx.beginPath();
          ctx.ellipse(
            -r * 0.34,
            -r * 0.38,
            r * 0.22,
            r * 0.11,
            -0.55,
            0,
            TAU
          );
          ctx.fill();
        }

        ctx.restore();
      }
    }

    if (reduceMotion) {
      renderFrame(0.35);
      return;
    }

    var startTime = performance.now();
    function tick(now) {
      var elapsed = (now - startTime) / 1000;
      renderFrame(elapsed);
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ------------------------------------------------------------------------
     2. Pipeline Stage Board Tabs (Figma 265:8016)
     ------------------------------------------------------------------------ */
  function initPipelineTabs() {
    var tablist = document.querySelector(".p-tabs");
    if (!tablist) return;

    var tabs = Array.prototype.slice.call(
      tablist.querySelectorAll('[role="tab"]')
    );
    var panels = tabs.map(function (t) {
      return document.getElementById(t.getAttribute("aria-controls"));
    });

    function activateTab(nextTab, focus) {
      tabs.forEach(function (tab, idx) {
        var selected = tab === nextTab;
        tab.setAttribute("aria-selected", selected ? "true" : "false");
        tab.tabIndex = selected ? 0 : -1;
        if (panels[idx]) {
          panels[idx].hidden = !selected;
        }
      });
      if (focus) nextTab.focus();
    }

    tabs.forEach(function (tab, idx) {
      tab.addEventListener("click", function () {
        activateTab(tab, false);
      });

      tab.addEventListener("keydown", function (e) {
        var nextIdx = idx;
        if (e.key === "ArrowRight") nextIdx = (idx + 1) % tabs.length;
        else if (e.key === "ArrowLeft")
          nextIdx = (idx - 1 + tabs.length) % tabs.length;
        else if (e.key === "Home") nextIdx = 0;
        else if (e.key === "End") nextIdx = tabs.length - 1;
        else return;
        e.preventDefault();
        activateTab(tabs[nextIdx], true);
      });
    });
  }

  /* ------------------------------------------------------------------------
     3. 3D Interactive Scientist Photo & Sample Vial Aura (CTA 240:3848)
     ------------------------------------------------------------------------ */
  function initScientist3D() {
    var ctaSection = document.querySelector(".p-cta");
    var stage = document.getElementById("scientist-stage");
    if (!ctaSection || !stage || reduceMotion) return;

    var curX = 0;
    var curY = 0;
    var targetX = 0;
    var targetY = 0;
    var curAura = 0;
    var targetAura = 0;
    var rafId = null;

    function updateSpring() {
      curX += (targetX - curX) * 0.11;
      curY += (targetY - curY) * 0.11;
      curAura += (targetAura - curAura) * 0.1;

      /* RotateY up to ±13deg, RotateX up to ±8deg */
      var ry = (curX * 13).toFixed(2) + "deg";
      var rx = (-curY * 8).toFixed(2) + "deg";
      var tx = (curX * 16).toFixed(2) + "px";
      var ty = (curY * 9).toFixed(2) + "px";
      var shX = (-curX * 22).toFixed(1) + "px";
      var shY = (18 - curY * 10).toFixed(1) + "px";

      stage.style.setProperty("--ry", ry);
      stage.style.setProperty("--rx", rx);
      stage.style.setProperty("--tx", tx);
      stage.style.setProperty("--ty", ty);
      stage.style.setProperty("--shadow-x", shX);
      stage.style.setProperty("--shadow-y", shY);
      stage.style.setProperty("--aura", curAura.toFixed(3));

      if (
        Math.abs(targetX - curX) > 0.002 ||
        Math.abs(targetY - curY) > 0.002 ||
        Math.abs(targetAura - curAura) > 0.003
      ) {
        rafId = requestAnimationFrame(updateSpring);
      } else {
        rafId = null;
      }
    }

    function scheduleSpring() {
      if (!rafId) {
        rafId = requestAnimationFrame(updateSpring);
      }
    }

    ctaSection.addEventListener("pointermove", function (e) {
      var rect = stage.getBoundingClientRect();
      var cx = rect.left + rect.width * 0.5;
      var cy = rect.top + rect.height * 0.5;

      /* Normalized -1 .. 1 relative to scientist stage center */
      var nx = Math.max(-1.15, Math.min(1.15, (e.clientX - cx) / (rect.width * 0.55)));
      var ny = Math.max(-1.0, Math.min(1.0, (e.clientY - cy) / (rect.height * 0.55)));

      targetX = nx;
      targetY = ny;

      /* Full aura when hovering directly over the scientist stage, subtle aura across CTA section */
      var dist = Math.hypot(nx, ny);
      targetAura = dist < 1.05 ? 1.0 : 0.45;

      var ctaRect = ctaSection.getBoundingClientRect();
      var spotX = (((e.clientX - ctaRect.left) / ctaRect.width) * 100).toFixed(1) + "%";
      var spotY = (((e.clientY - ctaRect.top) / ctaRect.height) * 100).toFixed(1) + "%";
      ctaSection.style.setProperty("--cta-spot-x", spotX);
      ctaSection.style.setProperty("--cta-spot-y", spotY);

      stage.classList.add("is-tracking");
      stage.classList.toggle("is-active", dist < 1.05);
      scheduleSpring();
    });

    ctaSection.addEventListener("pointerleave", function () {
      targetX = 0;
      targetY = 0;
      targetAura = 0;
      stage.classList.remove("is-tracking", "is-active");
      scheduleSpring();
    });

    /* Also react when keyboard-focusing the CTA glass buttons */
    var ctaBtns = ctaSection.querySelectorAll(".p-btn-glass");
    ctaBtns.forEach(function (btn, idx) {
      btn.addEventListener("focus", function () {
        targetX = idx === 0 ? 0.42 : 0.65;
        targetY = -0.15;
        targetAura = 0.95;
        stage.classList.add("is-active");
        scheduleSpring();
      });
      btn.addEventListener("blur", function () {
        targetX = 0;
        targetY = 0;
        targetAura = 0;
        stage.classList.remove("is-active");
        scheduleSpring();
      });
    });

    if (window.location.search.indexOf("hover=cta") !== -1) {
      targetX = -0.58;
      targetY = -0.38;
      targetAura = 1.0;
      curX = -0.58;
      curY = -0.38;
      curAura = 1.0;
      stage.classList.add("is-active");
      updateSpring();
    }
  }

  initPetriDish3D();
  initPipelineTabs();
  initScientist3D();
})();
