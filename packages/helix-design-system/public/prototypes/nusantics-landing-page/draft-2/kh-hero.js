/* Knowledge Hub hero background animation:
   - Mode "bayer-dna" (default): 8x8 ordered Bayer-dithered logarithmic swirl
     fused with a 3D rotating DNA double-helix (strands + hydrogen-bonded base-pair rungs) in Nusantics orange.
   - Mode "legacy" (rollback): original Figma silk column-ripple + floating white helix dots.
   
   ROLLBACK / SWITCHING:
   1. Set DEFAULT_MODE = 'legacy' below (or copy kh-hero.legacy.js over kh-hero.js) to permanently rollback.
   2. Or preview live in the browser via URL query: ?hero=legacy or ?hero=bayer-dna
   3. Or in DevTools console: window.setKhHeroMode('legacy') / window.setKhHeroMode('bayer-dna') */
(() => {
  const DEFAULT_MODE = 'bayer-dna'; // Change to 'legacy' for instant rollback

  const heroEl = document.querySelector('.kh-hero');
  const silkCanvas = document.querySelector('.kh-hero__silk');
  const helixCanvas = document.querySelector('.kh-hero__helix');
  if (!heroEl || (!silkCanvas && !helixCanvas)) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const scriptEl = document.currentScript;
  const scriptBase = scriptEl && scriptEl.src ? new URL('.', scriptEl.src).href : '';

  function resolveMode() {
    try {
      const q = new URLSearchParams(window.location.search).get('hero');
      if (q === 'legacy' || q === 'bayer-dna') return q;
      const saved = localStorage.getItem('nusantics-kh-hero-mode');
      if (saved === 'legacy' || saved === 'bayer-dna') return saved;
    } catch (_) { /* ignore storage errors */ }
    return heroEl.dataset.heroMode || DEFAULT_MODE;
  }

  let activeCleanup = null;

  /* ============================================================================
     MODE 1: 8x8 BAYER DITHER SWIRL + NUSANTICS DNA DOUBLE HELIX
     ============================================================================ */
  function mountBayerDna() {
    heroEl.classList.add('is-dither');
    const nav = document.getElementById('nav');
    const navHadLight = nav ? nav.classList.contains('is-light') : false;
    if (nav) nav.classList.add('is-light');

    // We render the WebGL2 shader on a fresh canvas inside .kh-hero (or fallback to 2D canvas)
    // so switching between WebGL and 2D contexts never conflicts on the same canvas node.
    const glCanvas = document.createElement('canvas');
    glCanvas.className = 'kh-hero__dither-gl';
    glCanvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none;z-index:0;';
    heroEl.insertBefore(glCanvas, silkCanvas);
    if (silkCanvas) silkCanvas.style.visibility = 'hidden';

    const gl = glCanvas.getContext('webgl2', { alpha: false, antialias: false, depth: false, stencil: false, powerPreference: 'low-power' });

    const VERT_SRC = `#version 300 es
precision highp float;
layout(location = 0) in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

    // Exact 8x8 Bayer ordered dithering + logarithmic 6-arm swirl + 3D DNA Double Helix
    const FRAG_SRC = `#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_time;

out vec4 fragColor;

#define PI 3.14159265358979323846
#define TWO_PI 6.28318530717958647692

const int bayer8x8[64] = int[64](
   0, 32,  8, 40,  2, 34, 10, 42,
  48, 16, 56, 24, 50, 18, 58, 26,
  12, 44,  4, 36, 14, 46,  6, 38,
  60, 28, 52, 20, 62, 30, 54, 22,
   3, 35, 11, 43,  1, 33,  9, 41,
  51, 19, 59, 27, 49, 17, 57, 25,
  15, 47,  7, 39, 13, 45,  5, 37,
  63, 31, 55, 23, 61, 29, 53, 21
);

float getBayer8(vec2 cell) {
  ivec2 p = ivec2(mod(cell, 8.0));
  return float(bayer8x8[p.y * 8 + p.x]) / 64.0;
}

void main() {
  // 2px CSS pixel grid (pxSize = 2)
  float pxSize = 2.0 * u_pixelRatio;
  vec2 cell = floor(gl_FragCoord.xy / pxSize);
  vec2 snappedFrag = (cell + 0.5) * pxSize;

  // CSS pixel coordinates with (0,0) at top-left of .kh-hero
  vec2 cssSize = u_resolution / u_pixelRatio;
  vec2 cssPos = vec2(snappedFrag.x / u_pixelRatio, (u_resolution.y - snappedFrag.y) / u_pixelRatio);

  // Time scale & initial frame offset
  float t = 0.5 * u_time;
  float tSwirl = t + 344.95;

  // ── 1. Logarithmic Swirl Field ────────────────────────────────────────────
  // 1399x896 virtual box translated by (1px, -560px) with origin (0,0)
  float virtualH = 896.0;
  float virtualW = max(1399.0, cssSize.x);
  vec2 virtualPos = vec2(cssPos.x, cssPos.y + 560.0);
  vec2 normUV = (virtualPos / vec2(virtualW, virtualH)) - 0.5;
  vec2 boxOrigin = vec2(0.5, -0.5);
  vec2 objScale = vec2(virtualW / virtualH, 1.0);
  vec2 shapeUV = normUV * objScale + boxOrigin * (objScale - 1.0);

  // ── 2. Nusantics 3D DNA Double-Helix Field ────────────────────────────────
  // Flows across the header from left-center to the right edge, gently angled
  float xNorm = cssPos.x / max(cssSize.x, 1.0);
  float yNorm = cssPos.y / max(cssSize.y, 1.0);

  // Helix centerline & rotated local coordinates
  float tilt = -0.085;
  float refX = cssPos.x - cssSize.x * 0.58;
  float axisY = cssSize.y * 0.44 + tilt * refX + 7.0 * sin(cssPos.x * 0.005 - t * 0.65);
  float hx = cssPos.x;
  float hy = cssPos.y - axisY;

  // Helical phase (wavelength ~ 290px per full turn, rotating smoothly)
  float k = hx * 0.0215 - t * 1.35;
  float amp = min(56.0, cssSize.y * 0.21);

  float y1 = amp * sin(k);
  float z1 = cos(k); // +1 front, -1 back
  float y2 = -y1;    // sin(k + PI)
  float z2 = -z1;    // cos(k + PI)

  // Subtle phase coupling: the DNA helix gently ripples the swirl arms
  float helixRipple = 0.075 * exp(-abs(hy) / 85.0) * sin(k) * smoothstep(0.15, 0.45, xNorm);

  float l = length(shapeUV);
  float angle = 6.0 * atan(shapeUV.y, shapeUV.x) + 4.0 * tSwirl + helixRipple;
  float twist = 1.2;
  float offset = 1.0 / pow(max(l, 1e-4), twist) + angle / TWO_PI;
  float mid = smoothstep(0.0, 1.0, pow(l, twist));
  float swirl = mix(0.0, fract(offset), mid);

  // DNA Strands: 3D depth modulates ribbon width and dither density
  float d1 = abs(hy - y1);
  float d2 = abs(hy - y2);
  float w1 = mix(6.5, 13.5, 0.5 + 0.5 * z1);
  float w2 = mix(6.5, 13.5, 0.5 + 0.5 * z2);
  float s1 = smoothstep(w1, 1.2, d1) * mix(0.45, 0.96, 0.5 + 0.5 * z1);
  float s2 = smoothstep(w2, 1.2, d2) * mix(0.45, 0.96, 0.5 + 0.5 * z2);

  // Base-pair rungs (4 rungs per half-turn, vanishing cleanly at strand crossovers)
  float rungStep = PI / 4.0;
  float rungIdx = floor(k / rungStep + 0.5);
  float rungPhase = (k - rungIdx * rungStep) / 0.0215; // distance in CSS px to nearest rung
  float yMin = min(y1, y2);
  float yMax = max(y1, y2);
  float spanPad = smoothstep(8.0, 18.0, yMax - yMin); // hide rung right at crossover node
  float inSpan = smoothstep(2.5, -1.5, max(yMin - hy, hy - yMax));
  // Hydrogen-bond gap in the middle of each base pair
  float hBondGap = smoothstep(1.0, 4.2, abs(hy));
  float rung = smoothstep(4.2, 0.8, abs(rungPhase)) * inSpan * spanPad * mix(0.32, 0.82, hBondGap);

  // Nucleotide node glow at the ends of each base-pair rung
  float node1 = smoothstep(6.5, 1.5, length(vec2(rungPhase, hy - y1))) * spanPad * mix(0.6, 1.0, 0.5 + 0.5 * z1);
  float node2 = smoothstep(6.5, 1.5, length(vec2(rungPhase, hy - y2))) * spanPad * mix(0.6, 1.0, 0.5 + 0.5 * z2);

  // Envelope: keep DNA clear of the left-aligned "Knowledge Hub" title, prominent across center-right
  float titleSafe = 1.0 - smoothstep(420.0, 260.0, cssPos.x) * smoothstep(130.0, 185.0, cssPos.y);
  float dnaEnvX = smoothstep(0.20, 0.44, xNorm) * titleSafe;
  float dnaEnvY = smoothstep(0.02, 0.15, yNorm) * smoothstep(0.98, 0.72, yNorm);
  float dnaShape = max(max(s1, s2), max(rung, max(node1, node2))) * dnaEnvX * dnaEnvY;

  // Seamless bottom dissolve into --surface-subtle (#f7f7f7) so there is no hard cut at y = 300px
  float bottomFade = smoothstep(1.0, 0.68, yNorm);
  float swirlField = swirl * bottomFade;

  // ── 3. 8x8 Bayer Ordered Dithering ────────────────────────────────────────
  float bayer = getBayer8(cell) - 0.5;

  // Unified dither field: swirl waves + DNA double helix constructively fuse in the Bayer matrix
  float unifiedField = max(swirlField, dnaShape * 0.92) + 0.18 * swirlField * dnaShape;
  float baseBit = step(0.5, unifiedField + bayer);
  // Secondary Bayer threshold for 3D depth on the DNA backbone core & front nucleotide nodes
  float coreBit = step(0.5, dnaShape * 0.88 + bayer);

  // Colors (Nusantics design tokens)
  vec3 bgCol    = vec3(0.9686, 0.9686, 0.9686);                   // --surface-subtle (#f7f7f7)
  vec3 swirlCol = mix(bgCol, vec3(0.9608, 0.4941, 0.1255), 0.18); // 18% #f57e20 on #f7f7f7 (stipple base tone)
  vec3 dnaCol   = mix(bgCol, vec3(0.9608, 0.4941, 0.1255), 0.36); // 36% #f57e20 for DNA 3D foreground depth

  vec3 col = bgCol;
  col = mix(col, swirlCol, baseBit);
  col = mix(col, dnaCol, coreBit);

  fragColor = vec4(col, 1.0);
}`;

    function compileShader(type, source) {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, source);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('kh-hero shader error:', gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    }

    let prog = null, uRes = null, uPr = null, uTime = null, vbo = null;
    if (gl) {
      const vs = compileShader(gl.VERTEX_SHADER, VERT_SRC);
      const fs = compileShader(gl.FRAGMENT_SHADER, FRAG_SRC);
      if (vs && fs) {
        prog = gl.createProgram();
        gl.attachShader(prog, vs);
        gl.attachShader(prog, fs);
        gl.linkProgram(prog);
        if (gl.getProgramParameter(prog, gl.LINK_STATUS)) {
          uRes = gl.getUniformLocation(prog, 'u_resolution');
          uPr = gl.getUniformLocation(prog, 'u_pixelRatio');
          uTime = gl.getUniformLocation(prog, 'u_time');
          vbo = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
          gl.enableVertexAttribArray(0);
          gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        } else {
          prog = null;
        }
      }
    }

    // Companion overlay on .kh-hero__helix: crisp nucleotide accent dots & base-pair markers
    // synchronized with the exact same DNA helix equation in the shader
    const helixCtx = helixCanvas ? helixCanvas.getContext('2d') : null;
    let cw = 0, ch = 0, dpr = 1;

    function resize() {
      const r = heroEl.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cw = Math.max(1, Math.round(r.width));
      ch = Math.max(1, Math.round(r.height));
      if (prog) {
        glCanvas.width = Math.round(cw * dpr);
        glCanvas.height = Math.round(ch * dpr);
        gl.viewport(0, 0, glCanvas.width, glCanvas.height);
      }
      if (helixCtx && helixCanvas) {
        helixCanvas.width = Math.round(cw * dpr);
        helixCanvas.height = Math.round(ch * dpr);
        helixCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    }

    function drawHelixNodes(timeSec) {
      if (!helixCtx || !cw) return;
      helixCtx.clearRect(0, 0, cw, ch);
      const t = 0.5 * timeSec;
      const tilt = -0.085;
      const amp = Math.min(56, ch * 0.21);
      const rungStep = Math.PI / 4;

      // Subtle genetic coordinate grid ticks on the right
      helixCtx.fillStyle = '#f57e20';
      for (let x = Math.round(cw * 0.28); x < cw - 16; x += 32) {
        const xNorm = x / cw;
        for (let y = 24; y < ch - 48; y += 32) {
          const yNorm = y / ch;
          const alpha = 0.11 * xNorm * (1 - yNorm * 0.7);
          if (alpha <= 0.01) continue;
          helixCtx.globalAlpha = alpha;
          helixCtx.fillRect(x, y, 2, 2);
        }
      }

      // Crisp pixel-snapped nucleotide nodes along the two DNA strands at each rung interval
      const kMin = (cw * 0.22) * 0.0215 - t * 1.35;
      const kMax = cw * 0.0215 - t * 1.35;
      const idxStart = Math.floor(kMin / rungStep);
      const idxEnd = Math.ceil(kMax / rungStep);

      for (let idx = idxStart; idx <= idxEnd; idx++) {
        const k = idx * rungStep;
        const x = (k + t * 1.35) / 0.0215;
        if (x < cw * 0.22 || x > cw + 12) continue;

        const xNorm = x / cw;
        const envX = Math.min(1, Math.max(0, (xNorm - 0.22) / 0.22));
        if (envX <= 0) continue;

        const refX = x - cw * 0.58;
        const axisY = ch * 0.44 + tilt * refX + 7 * Math.sin(x * 0.005 - t * 0.65);
        const y1 = axisY + amp * Math.sin(k);
        const y2 = axisY - amp * Math.sin(k);
        const z1 = Math.cos(k);
        const z2 = -z1;

        const snap = (v) => Math.round(v / 2) * 2;
        const sx = snap(x), sy1 = snap(y1), sy2 = snap(y2);

        // Node 1
        const r1 = z1 > 0 ? 4 : 2;
        helixCtx.globalAlpha = envX * (0.28 + 0.34 * (0.5 + 0.5 * z1));
        helixCtx.fillRect(sx - r1 / 2, sy1 - r1 / 2, r1, r1);

        // Node 2
        const r2 = z2 > 0 ? 4 : 2;
        helixCtx.globalAlpha = envX * (0.28 + 0.34 * (0.5 + 0.5 * z2));
        helixCtx.fillRect(sx - r2 / 2, sy2 - r2 / 2, r2, r2);
      }
      helixCtx.globalAlpha = 1;
    }

    function drawFrame(timeSec) {
      if (prog && gl) {
        gl.useProgram(prog);
        gl.uniform2f(uRes, glCanvas.width, glCanvas.height);
        gl.uniform1f(uPr, dpr);
        gl.uniform1f(uTime, timeSec);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      drawHelixNodes(timeSec);
    }

    let raf = 0, visible = true, last = 0, clock = 0;
    function loop(now) {
      raf = 0;
      if (!visible || document.hidden || reduce.matches) return;
      const dt = Math.min(0.05, (now - (last || now)) / 1000);
      last = now;
      clock += dt;
      drawFrame(clock);
      raf = requestAnimationFrame(loop);
    }

    const start = () => {
      if (!raf && visible && !document.hidden && !reduce.matches) {
        last = 0;
        raf = requestAnimationFrame(loop);
      }
    };
    const stop = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    const still = () => drawFrame(clock);

    resize();
    still();

    const ro = new ResizeObserver(() => { resize(); still(); });
    ro.observe(heroEl);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      visible ? start() : stop();
    });
    io.observe(heroEl);
    const onVis = () => (document.hidden ? stop() : start());
    const onReduce = () => { if (reduce.matches) { stop(); still(); } else start(); };
    document.addEventListener('visibilitychange', onVis);
    reduce.addEventListener('change', onReduce);
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      reduce.removeEventListener('change', onReduce);
      if (gl && prog) {
        if (vbo) gl.deleteBuffer(vbo);
        gl.deleteProgram(prog);
      }
      glCanvas.remove();
      if (silkCanvas) silkCanvas.style.visibility = '';
      if (helixCtx && cw) helixCtx.clearRect(0, 0, cw, ch);
      heroEl.classList.remove('is-dither');
      if (nav && !navHadLight) nav.classList.remove('is-light');
    };
  }

  /* ============================================================================
     MODE 2: LEGACY (ORIGINAL FIGMA SILK RIPPLE + WHITE HELIX DOTS)
     ============================================================================ */
  function mountLegacy() {
    heroEl.classList.remove('is-dither');
    const SILK_SRC = scriptBase ? new URL('assets/knowledge/hero-silk.jpg', scriptBase).href : 'assets/knowledge/hero-silk.jpg';
    const IMG_W = 1024, IMG_H = 240;
    const COL = 4, AMP = 22;
    const img = new Image();
    let silkReady = false;
    const silk = silkCanvas && silkCanvas.getContext('2d');
    let sw = 0, sh = 0, sdpr = 1;
    if (silk) { img.onload = () => { silkReady = true; drawSilk(0); }; img.src = SILK_SRC; }

    function sizeSilk() {
      const r = silkCanvas.getBoundingClientRect();
      sdpr = Math.min(window.devicePixelRatio || 1, 2);
      sw = r.width; sh = r.height;
      silkCanvas.width = Math.round(sw * sdpr); silkCanvas.height = Math.round(sh * sdpr);
      silk.setTransform(sdpr, 0, 0, sdpr, 0, 0);
    }
    const lift = (x, t) => AMP * (0.6 * Math.sin(x * 0.008 + t * 0.55) + 0.4 * Math.sin(x * 0.015 - t * 0.37 + 1.7));

    function drawSilk(t) {
      if (!silk || !silkReady || !sw) return;
      const scale = sh / IMG_H;
      const drawW = Math.max(sw, IMG_W * scale);
      const offX = (sw - drawW) / 2;
      const k = IMG_W / drawW;
      silk.fillStyle = '#f59a4b'; silk.fillRect(0, 0, sw, sh / 2);
      silk.fillStyle = '#f7f7f7'; silk.fillRect(0, sh / 2, sw, sh / 2);
      for (let x = 0; x < sw; x += COL) {
        const dy = reduce.matches ? 0 : lift(x, t);
        const sx = (x - offX) * k;
        silk.drawImage(img, sx, 0, COL * k + 0.5, IMG_H, x, dy, COL + 0.5, sh);
      }
    }

    const STEP = 12, AMP_H = 58, WAVE = 38, SPEED = 0.28;
    const helix = helixCanvas && helixCanvas.getContext('2d');
    let hw = 0, hh = 0, phase = 0.6;
    function sizeHelix() {
      const r = helixCanvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      hw = r.width; hh = r.height;
      helixCanvas.width = Math.round(hw * dpr); helixCanvas.height = Math.round(hh * dpr);
      helix.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function dot(x, y, r, a) { helix.globalAlpha = a; helix.beginPath(); helix.arc(x, y, r, 0, Math.PI * 2); helix.fill(); }
    function drawHelix() {
      if (!helix || !hw) return;
      helix.clearRect(0, 0, hw, hh);
      helix.fillStyle = '#fff';
      const mid = hh * 0.5;
      for (let x = hw * 0.18; x <= hw; x += 24) {
        const t = x / hw;
        for (let y = 24; y < hh; y += 24) dot(x, y, 1.2, 0.1 * t);
      }
      for (let x = 0, i = 0; x <= hw; x += STEP, i += 1) {
        const t = x / hw;
        const a = Math.min(0.5, (0.34 * Math.pow(t, 1.2) + 0.02) * 1.5);
        const y1 = mid + AMP_H * Math.sin(x / WAVE + phase);
        const y2 = mid + AMP_H * Math.sin(x / WAVE + phase + Math.PI);
        dot(x, y1, 2.6, a); dot(x, y2, 2.6, a);
        if (i % 3 === 0) for (let k = 1; k < 5; k += 1) dot(x, y1 + ((y2 - y1) * k) / 5, 1.4, a * 0.7);
      }
      helix.globalAlpha = 1;
    }

    let raf = 0, visible = true, last = 0, clock = 0;
    function frame(now) {
      raf = 0;
      if (!visible || document.hidden || reduce.matches) return;
      const dt = Math.min(0.05, (now - (last || now)) / 1000); last = now;
      clock += dt; phase += dt * SPEED;
      drawSilk(clock); drawHelix();
      raf = requestAnimationFrame(frame);
    }
    const start = () => { if (!raf && visible && !document.hidden && !reduce.matches) { last = 0; raf = requestAnimationFrame(frame); } };
    const stop = () => { if (raf) { cancelAnimationFrame(raf); raf = 0; } };
    const still = () => { drawSilk(0); drawHelix(); };

    if (silk) sizeSilk();
    if (helix) sizeHelix();
    still();
    const host = silkCanvas || helixCanvas;
    const ro = new ResizeObserver(() => { if (silk) sizeSilk(); if (helix) sizeHelix(); still(); });
    ro.observe(host.parentElement);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); });
    io.observe(host);
    const onVis = () => (document.hidden ? stop() : start());
    const onReduce = () => { if (reduce.matches) { stop(); still(); } else start(); };
    document.addEventListener('visibilitychange', onVis);
    reduce.addEventListener('change', onReduce);
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      reduce.removeEventListener('change', onReduce);
    };
  }

  function applyMode(mode) {
    if (activeCleanup) {
      activeCleanup();
      activeCleanup = null;
    }
    activeCleanup = mode === 'legacy' ? mountLegacy() : mountBayerDna();
  }

  // Expose live runtime switcher for instant testing/rollback in console
  window.setKhHeroMode = (mode) => {
    const next = mode === 'legacy' ? 'legacy' : 'bayer-dna';
    try {
      if (mode === null) localStorage.removeItem('nusantics-kh-hero-mode');
      else localStorage.setItem('nusantics-kh-hero-mode', next);
    } catch (_) { /* ignore */ }
    applyMode(next);
    return next;
  };

  applyMode(resolveMode());
})();
