/* Knowledge Hub hero, two quiet layers on one animation loop:
   1. silk: the Figma silk image (gradient, waves, grey glow) drawn in thin columns that each rise and fall a few pixels, so the edge ripples
      like cloth. At rest it is pixel-for-pixel the Figma export, and the gradient keeps its Y 68% to 0 because the image always spans the full hero height.
   2. helix: dots on two strands drifting along a sine path (about 22 s per turn), dimmer toward the title.
   Paused off-screen and in a hidden tab; a single still frame with reduced motion. */
(() => {
  const silkCanvas = document.querySelector('.kh-hero__silk');
  const helixCanvas = document.querySelector('.kh-hero__helix');
  if (!silkCanvas && !helixCanvas) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');

  /* ---- silk ---- */
  const SILK_SRC = 'assets/knowledge/hero-silk.jpg', IMG_W = 1024, IMG_H = 240;
  const COL = 4;      // css px per column
  const AMP = 22;     // px the edge rises and falls at most
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
  // vertical offset of a column: two slow waves of different length and speed
  const lift = (x, t) => AMP * (0.6 * Math.sin(x * 0.008 + t * 0.55) + 0.4 * Math.sin(x * 0.015 - t * 0.37 + 1.7));

  function drawSilk(t) {
    if (!silk || !silkReady || !sw) return;
    const scale = sh / IMG_H;                       // full image height always fits the hero height
    const drawW = Math.max(sw, IMG_W * scale);      // only the width stretches or crops
    const offX = (sw - drawW) / 2;
    const k = IMG_W / drawW;
    // colour above and below the image, for the few px a column can lift or sink
    silk.fillStyle = '#f59a4b'; silk.fillRect(0, 0, sw, sh / 2);
    silk.fillStyle = '#f7f7f7'; silk.fillRect(0, sh / 2, sw, sh / 2);
    for (let x = 0; x < sw; x += COL) {
      const dy = reduce.matches ? 0 : lift(x, t);
      const sx = (x - offX) * k;
      silk.drawImage(img, sx, 0, COL * k + 0.5, IMG_H, x, dy, COL + 0.5, sh);
    }
  }

  /* ---- helix ---- */
  const STEP = 12, AMP_H = 58, WAVE = 38, SPEED = 0.28; // px between dots, strand radius, px per radian, radians per second
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

  /* ---- one loop ---- */
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
  new ResizeObserver(() => { if (silk) sizeSilk(); if (helix) sizeHelix(); still(); }).observe(host.parentElement);
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); }).observe(host);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  reduce.addEventListener('change', () => { if (reduce.matches) { stop(); still(); } else start(); });
  start();
})();
