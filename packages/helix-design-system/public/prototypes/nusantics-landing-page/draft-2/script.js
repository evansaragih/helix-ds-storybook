// Ornament layer (Figma 33:5067). Each entry: [shape, x, y, width, height, depth], placed on the 1280px frame.
// y is measured from the top of the Figma frame; the layer starts below the hero, so HERO_H is subtracted and
// the ornaments that sat behind the hero are skipped (the hero covers them).
// depth 1 = far (drifts slower than the page), 2 = tracks the page, 3 = near (drifts faster).
(() => {
  const layer = document.querySelector('.ornaments');
  if (!layer) return;

  const FRAME = 1280;
  const HERO_H = 720;
  const FACTOR = { 1: 0.2, 2: 0, 3: -0.2 };
  const ORNAMENTS = [
    ['circle', 187, 3, 33, 33, 2], ['line-dark', 13, 94, 6, 71, 2], ['circle', 499, 133, 33, 33, 2],
    ['rounded-dark', 1112, 33, 44, 44, 2], ['half-circle-dark', 1058, 199, 35, 37, 2], ['circle-dark', 549, 403, 60, 61, 2],
    ['circle', 50, 560, 33, 33, 2], ['circle-dark', 1133, 640, 48, 48.8, 1], ['rounded-dark', 850, 760, 66, 66, 3],
    ['half-circle-dark', 113, 900, 28, 29.6, 1], ['line-dark', 612, 980, 6, 71, 2], ['circle', 1072, 1100, 33, 33, 2],
    ['circle', 271, 1200, 49.5, 49.5, 3], ['circle-dark', 739, 1330, 48, 48.8, 1], ['rounded-dark', 1153, 1450, 66, 66, 3],
    ['half-circle-dark', 75, 1560, 35, 37, 2], ['line-dark', 485, 1690, 4.8, 56.8, 1], ['circle', 998, 1800, 33, 33, 2],
    ['circle', 172, 1930, 49.5, 49.5, 3], ['circle-dark', 671, 2060, 60, 61, 2], ['rounded-dark', 1133, 2180, 35.2, 35.2, 1],
    ['half-circle-dark', 349, 2330, 35, 37, 2], ['line-dark', 915, 2460, 9, 106.5, 3], ['circle', 38, 2590, 26.4, 26.4, 1],
    ['circle', 578, 2720, 49.5, 49.5, 3], ['circle-dark', 1074, 2840, 60, 61, 2], ['rounded-dark', 222, 2980, 44, 44, 2],
    ['half-circle-dark', 801, 3100, 28, 29.6, 1], ['line-dark', 1220, 3240, 9, 106.5, 3], ['circle', 98, 3380, 49.5, 49.5, 3],
    ['circle', 524, 3500, 33, 33, 2], ['circle-dark', 961, 3640, 48, 48.8, 1], ['rounded-dark', 311, 3780, 35.2, 35.2, 1],
    ['half-circle-dark', 712, 3900, 52.5, 55.5, 3], ['line-dark', 1185, 4040, 6, 71, 2], ['circle', 137, 4180, 33, 33, 2],
    ['circle', 627, 4300, 26.4, 26.4, 1], ['circle-dark', 1000, 4420, 90, 91.5, 3], ['rounded-dark', 408, 4560, 44, 44, 2],
    ['half-circle-dark', 847, 4690, 35, 37, 2], ['line-dark', 64, 4820, 9, 106.5, 3], ['circle', 1128, 4920, 26.4, 26.4, 1],
  ];

  // A page can supply its own ornaments (already relative to the layer) through data-items; the landing page uses the list above.
  const custom = layer.dataset.items ? JSON.parse(layer.dataset.items) : null;
  const list = custom || ORNAMENTS.filter((o) => o[2] >= HERO_H);
  const items = list.map(([shape, x, fy, w, h, depth]) => {
    const y = custom ? fy : fy - HERO_H;
    const img = document.createElement('img');
    img.className = 'orn';
    img.alt = '';
    img.src = `../assets/ornament/parallax-${shape}.svg`;
    img.width = w;
    img.height = h;
    img.style.top = `${y}px`;
    layer.appendChild(img);
    return { img, x, y, h, depth };
  });

  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let ticking = false;

  function layout() {
    const scale = layer.clientWidth / FRAME;
    items.forEach((it) => { it.img.style.left = `${(it.x * scale).toFixed(1)}px`; });
    update();
  }

  function update() {
    ticking = false;
    const mid = window.scrollY + window.innerHeight / 2;
    items.forEach((it) => {
      const off = reduce.matches ? 0 : (mid - (layer.getBoundingClientRect().top + window.scrollY + it.y + it.h / 2)) * FACTOR[it.depth];
      it.img.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0)`;
    });
  }

  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  window.addEventListener('resize', layout);
  reduce.addEventListener('change', update);
  layout();
})();

// Hero carousel: autoplays 1 -> 2 -> 3 -> 1 on its own. Fade between slides, progress dots.
(() => {
  const frame = document.getElementById('top');
  if (!frame) return;
  const slides = [...frame.querySelectorAll('.hero__slide')];
  const dotsEl = document.getElementById('hero-dots');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const INTERVAL = 6000;
  let index = 0;
  let timer = null;

  const dots = slides.map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => { show(i); restart(); });
    dotsEl.appendChild(dot);
    return dot;
  });

  function show(next) {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.classList.toggle('is-active', active);
      slide.toggleAttribute('inert', !active);
    });
    dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === index)));
    // Light photo (slide 3): the navbar switches to its dark scheme while it is still transparent.
    document.getElementById('nav')?.classList.toggle('is-light', slides[index].dataset.nav === 'light');
  }

  frame.style.setProperty('--hero-interval', `${INTERVAL}ms`);
  function stop() { clearInterval(timer); timer = null; }
  function start() {
    if (reduceMotion.matches || document.hidden || timer) return;
    timer = setInterval(() => show(index + 1), INTERVAL);
  }
  function restart() { stop(); start(); }

  // Only the tab being hidden (or reduced motion) stops it; hovering or focusing the hero does not.
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  reduceMotion.addEventListener('change', () => (reduceMotion.matches ? stop() : start()));

  // Start from "no slide active" so the first slide's copy and card animate in on load, like every later slide.
  slides.forEach((slide) => { slide.classList.remove('is-active'); slide.setAttribute('inert', ''); });
  void frame.offsetWidth;
  requestAnimationFrame(() => { show(0); start(); });
})();

// Navbar: onTop (transparent, white) until the page moves, then onScroll (translucent white, dark) right away, even inside the hero.
(() => {
  const nav = document.getElementById('nav');
  if (!nav) return;
  let ticking = false;
  function update() { nav.classList.toggle('is-scrolled', window.scrollY > 8); ticking = false; }
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
})();

// Scroll reveal: sections and cards rise in as they enter the viewport.
// Only runs when the page opted in (html.js is set in <head> unless the user prefers reduced motion).
(() => {
  if (!document.documentElement.classList.contains('js') || !('IntersectionObserver' in window)) return;
  const groups = [
    '.section__head', '.field-group > .sub-title', '.field-card', '.partners__row img', '.news-card', '.paper',
    '.blog-card', '.join__img', '.join__intro > .section__text', '.join__intro > .btn', '.job', '.footer__top > *', '[data-reveal]',
  ];
  const targets = new Set();
  groups.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      const siblings = [...el.parentElement.children];
      el.style.setProperty('--reveal-delay', `${(siblings.indexOf(el) % 4) * 80}ms`);
      el.classList.add('reveal');
      targets.add(el);
    });
  });

  const REVEAL_MS = 560 + 3 * 80; // duration + longest stagger
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      io.unobserve(el);
      el.classList.add('is-visible');
      setTimeout(() => el.classList.add('reveal-done'), REVEAL_MS);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  targets.forEach((el) => io.observe(el));
})();

// Navbar dropdown menus (Helix Dropdown Menu pattern): click to open, Esc / outside click / focus-out to close.
(() => {
  const FADE_MS = 160; // = --motion-duration-fast (exit animation)
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const dropdowns = [...document.querySelectorAll('.nav-dd')].map((root) => ({
    root,
    trigger: root.querySelector('.nav-trigger'),
    menu: root.querySelector('.nav-menu'),
    timer: null,
  }));

  const items = (dd) => [...dd.menu.querySelectorAll('[role="menuitem"]')];

  function open(dd, focusFirst) {
    dropdowns.forEach((other) => { if (other !== dd) close(other); });
    clearTimeout(dd.timer);
    dd.menu.hidden = false;
    dd.menu.dataset.state = 'open';
    dd.trigger.setAttribute('aria-expanded', 'true');
    if (focusFirst) items(dd)[0]?.focus();
  }

  function close(dd, returnFocus) {
    if (dd.trigger.getAttribute('aria-expanded') !== 'true') return;
    dd.trigger.setAttribute('aria-expanded', 'false');
    dd.menu.dataset.state = 'closed';
    clearTimeout(dd.timer);
    dd.timer = setTimeout(() => { dd.menu.hidden = true; }, reduce.matches ? 0 : FADE_MS);
    if (returnFocus) dd.trigger.focus();
  }

  dropdowns.forEach((dd) => {
    dd.trigger.addEventListener('click', () => {
      if (dd.trigger.getAttribute('aria-expanded') === 'true') close(dd); else open(dd);
    });
    dd.trigger.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); open(dd, true); }
    });
    dd.menu.addEventListener('keydown', (e) => {
      const list = items(dd);
      const i = list.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); list[(i + 1) % list.length].focus(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); list[(i - 1 + list.length) % list.length].focus(); }
      else if (e.key === 'Home') { e.preventDefault(); list[0].focus(); }
      else if (e.key === 'End') { e.preventDefault(); list[list.length - 1].focus(); }
    });
    dd.menu.addEventListener('click', () => close(dd));
    dd.root.addEventListener('focusout', (e) => { if (!dd.root.contains(e.relatedTarget)) close(dd); });
  });

  document.addEventListener('click', (e) => dropdowns.forEach((dd) => { if (!dd.root.contains(e.target)) close(dd); }));
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    dropdowns.forEach((dd) => close(dd, dd.root.contains(document.activeElement)));
  });
})();
