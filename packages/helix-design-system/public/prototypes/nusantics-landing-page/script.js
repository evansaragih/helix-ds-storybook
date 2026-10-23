// Feature carousel: cycles the three guides and rotates the photo stack.
(() => {
  const slides = [
    {
      title: 'PCR: A Fast and Accurate Detection Technology in Modern Healthcare',
      desc: 'Every organism, including disease-causing viruses and bacteria, carries genetic material in the form of DNA or RNA. This genetic material holds information that can be used to identify an organism, including pathogens present in a biological sample.',
    },
    {
      title: 'Optimize Shrimp Health with A Structured Monitoring Schedule',
      desc: 'Regular Anco and PCR checks with CeKolam’s Real-Time PCR technology help shrimp farmers prevent disease through a structured monitoring schedule.',
    },
    {
      title: 'Beware of These HPV Types – Some Can Be Fatal!',
      desc: 'Learn about the highest-risk HPV types behind cervical cancer and other complications, and how vaccination and early screening protect you.',
    },
  ];

  const titleEl = document.getElementById('feature-title');
  const descEl = document.getElementById('feature-desc');
  const photos = [...document.querySelectorAll('.stack__photo')];
  const positions = ['back', 'mid', 'front'];
  let index = 0;

  const SWAP_MS = 160; // = --motion-duration-fast
  let swapTimer = null;

  function render() {
    // The photo whose slot is "front" advances one place each step.
    photos.forEach((photo, i) => {
      photo.dataset.pos = positions[(i + index) % positions.length];
    });
    // Text drifts out, swaps, then drifts back in.
    clearTimeout(swapTimer);
    titleEl.classList.add('is-swapping');
    descEl.classList.add('is-swapping');
    swapTimer = setTimeout(() => {
      titleEl.textContent = slides[index].title;
      descEl.textContent = slides[index].desc;
      titleEl.classList.remove('is-swapping');
      descEl.classList.remove('is-swapping');
    }, SWAP_MS);
  }

  function go(step) {
    index = (index + step + slides.length) % slides.length;
    render();
  }

  document.getElementById('feature-prev').addEventListener('click', () => go(-1));
  document.getElementById('feature-next').addEventListener('click', () => go(1));
})();

// Hero carousel: fade between slides, dot indicator, prev/next, autoplay.
(() => {
  const frame = document.getElementById('hero');
  if (!frame) return;
  const slides = [...frame.querySelectorAll('.hero__slide')];
  const dotsEl = document.getElementById('hero-dots');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const INTERVAL = 6000;
  let index = 0;
  let timer = null;

  const dots = slides.map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'page-indicator__dot';
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
  }

  frame.style.setProperty('--hero-interval', `${INTERVAL}ms`);
  function stop() { clearInterval(timer); timer = null; frame.classList.add('is-paused'); }
  function start() {
    if (reduceMotion.matches || document.hidden || timer) return;
    frame.classList.remove('is-paused');
    timer = setInterval(() => show(index + 1), INTERVAL);
  }
  function restart() { stop(); start(); }

  document.getElementById('hero-prev').addEventListener('click', () => { show(index - 1); restart(); });
  document.getElementById('hero-next').addEventListener('click', () => { show(index + 1); restart(); });

  // Pause while the pointer or keyboard focus is inside the carousel, and while the tab is hidden.
  frame.addEventListener('mouseenter', stop);
  frame.addEventListener('mouseleave', start);
  frame.addEventListener('focusin', stop);
  frame.addEventListener('focusout', start);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  reduceMotion.addEventListener('change', () => (reduceMotion.matches ? stop() : start()));

  show(0);
  start();
})();

// Navbar: gains a hairline and a denser background once the page scrolls.
(() => {
  const nav = document.querySelector('.site-nav');
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
    '.section-header', '.field-feature > *', '.field-grid > li', '.news-grid > *', '.hub-grid > *',
    '.feature__frame', '.careers__intro', '.job-list > *', '.closing .hx-cc',
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

// Ornaments (parallax). Layout comes from Figma frame 33:5067: x is a % of the width, y is px below the first fold.
// depth 1 = far (drifts slower than the page), 2 = tracks the page, 3 = near (drifts faster).
(() => {
  const layer = document.querySelector('.ornaments');
  const main = document.querySelector('main');
  const fold = document.querySelector('.fold');
  if (!layer || !fold) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const SIZE = { circle: [33, 33], 'circle-dark': [60, 61], 'rounded-dark': [44, 44], 'half-circle-dark': [35, 37], 'line-dark': [6, 71] };
  const SCALE = { 1: 0.8, 2: 1, 3: 1.5 };
  const FACTOR = { 1: 0.2, 2: 0, 3: -0.2 }; // extra drift per px scrolled, relative to the page
  const shapes = ['circle', 'circle-dark', 'rounded-dark', 'half-circle-dark', 'line-dark', 'circle'];
  const first = [['circle', 15, 3], ['line-dark', 1, 94], ['circle', 40, 133], ['rounded-dark', 90, 33], ['half-circle-dark', 85, 199], ['circle-dark', 45, 403]].map(([s, x, y]) => [s, x, y, 2]);
  const plan = [
    [4,560,2],[92,640,1],[70,760,3],[9,900,1],[48,980,2],[86,1100,2],[22,1200,3],[60,1330,1],[95,1450,3],[6,1560,2],
    [38,1690,1],[80,1800,2],[14,1930,3],[55,2060,2],[91,2180,1],[28,2330,2],[72,2460,3],[3,2590,1],[47,2720,3],[88,2840,2],
    [18,2980,2],[64,3100,1],[96,3240,3],[8,3380,3],[42,3500,2],[78,3640,1],[25,3780,1],[58,3900,3],[93,4040,2],[11,4180,2],
    [50,4300,1],[84,4420,3],[33,4560,2],[68,4690,2],[5,4820,3],[90,4920,1],
  ].map(([x, y, d], i) => [shapes[i % shapes.length], x, y, d]);

  const items = [...first, ...plan].map(([shape, xp, y, depth]) => {
    const [w, h] = SIZE[shape].map((n) => n * SCALE[depth]);
    const img = document.createElement('img');
    img.className = 'orn';
    img.alt = '';
    img.src = `assets/ornament/parallax-${shape}.svg`;
    img.width = w; img.height = h;
    layer.appendChild(img);
    return { img, xp, y, w, h, depth };
  });

  let top = 0, centers = [];
  function layout() {
    top = fold.offsetTop + fold.offsetHeight;
    layer.style.top = top + 'px';
    layer.style.height = Math.max(0, main.offsetHeight - top) + 'px';
    const W = layer.clientWidth;
    centers = items.map((it) => {
      it.img.style.left = Math.round((W - it.w) * it.xp / 100) + 'px';
      it.img.style.top = it.y + 'px';
      return top + it.y + it.h / 2;
    });
    update();
  }

  let ticking = false;
  function update() {
    ticking = false;
    const mid = window.scrollY + window.innerHeight / 2;
    items.forEach((it, i) => {
      const off = reduce.matches ? 0 : (mid - centers[i]) * FACTOR[it.depth];
      it.img.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0)`;
    });
  }
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  new ResizeObserver(layout).observe(main);
  window.addEventListener('load', layout);
  reduce.addEventListener('change', update);
  layout();
})();
