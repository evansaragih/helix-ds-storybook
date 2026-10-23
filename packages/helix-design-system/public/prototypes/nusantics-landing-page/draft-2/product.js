// Product detail page behaviour: gallery, size selector, workflow tabs, FAQ, checker grids and the testimonials carousel.

// Gallery: one photo at a time, prev/next, thumbnails and the page indicator stay in step.
(() => {
  const slides = [...document.querySelectorAll('.gallery__slide')];
  const thumbs = [...document.querySelectorAll('.thumb')];
  const dots = [...document.querySelectorAll('.gallery__dots span')];
  if (!slides.length) return;
  let index = 0;

  function show(next) {
    index = (next + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle('is-active', i === index));
    thumbs.forEach((t, i) => { t.classList.toggle('is-active', i === index); t.setAttribute('aria-selected', String(i === index)); });
    dots.forEach((d, i) => d.classList.toggle('dots__on', i === index));
  }
  document.getElementById('gallery-prev').addEventListener('click', () => show(index - 1));
  document.getElementById('gallery-next').addEventListener('click', () => show(index + 1));
  thumbs.forEach((t, i) => t.addEventListener('click', () => show(i)));
})();

// Size selector: catalog number and bundle contents follow the "Bandingkan ukuran bundle" table.
(() => {
  const buttons = [...document.querySelectorAll('.variant')];
  const sku = document.getElementById('sku-value');
  const title = document.getElementById('bundle-title');
  const list = document.getElementById('bundle-list');
  const box = list?.closest('.bundle');
  if (!buttons.length || !list) return;

  const BUNDLES = {
    48: {
      sku: 'NUS-BQ002.48',
      items: [
        ['BiomeSeq 16S rRNA NGS LibPrep Kit (48 reaksi)', 'NUS-BQ001.48', '×1'],
        ['NGS DNA Clean-Up Beads', 'NUS-CB001', '×1'],
        ['Elution Buffer', 'NUS-EB001.100', '×1'],
        ['Nextera XT Index Kit v2 Set A (96 indeks)', 'FC-131-2001', '×1'],
        ['Illumina PhiX Control v3', 'FC-110-3001', '×1'],
        ['MiSeq Reagent Kit v2 (500 siklus)', 'MS-102-2003', '×1'],
      ],
    },
    96: {
      sku: 'NUS-BQ002.96',
      items: [
        ['BiomeSeq 16S rRNA NGS LibPrep Kit (48 reaksi)', 'NUS-BQ001.48', '×2'],
        ['NGS DNA Clean-Up Beads', 'NUS-CB001', '×1'],
        ['Elution Buffer', 'NUS-EB001.100', '×1'],
        ['Nextera XT Index Kit v2 Set A (96 indeks)', 'FC-131-2001', '×1'],
        ['Illumina PhiX Control v3', 'FC-110-3001', '×1'],
        ['MiSeq Reagent Kit v2 (500 siklus)', 'MS-102-2003', '×1'],
      ],
    },
    192: {
      sku: 'NUS-BQ002.192',
      items: [
        ['BiomeSeq 16S rRNA NGS LibPrep Kit (48 reaksi)', 'NUS-BQ001.48', '×4'],
        ['NGS DNA Clean-Up Beads', 'NUS-CB001', '×2'],
        ['Elution Buffer', 'NUS-EB001.100', '×1'],
        ['Nextera XT Index Kit v2 Set A (96 indeks)', 'FC-131-2001', '×1'],
        ['Nextera XT Index Kit v2 Set B (96 indeks)', 'FC-131-2002', '×1'],
        ['Illumina PhiX Control v3', 'FC-110-3001', '×1'],
        ['MiSeq Reagent Kit v3 (600 siklus)', '', '×1'],
      ],
    },
  };

  // 12 reaksi: the Figma frame adds the option without its own data, so it shows the same bundle as the others.
  // The catalog number follows the NUS-BQ002.<reaksi> pattern and is not confirmed.
  BUNDLES[12] = { sku: 'NUS-BQ002.12', items: BUNDLES[48].items };

  function row([name, code, qty]) {
    const li = document.createElement('li');
    li.className = 'bundle__row';
    li.innerHTML = '<span class="bundle__name"></span><span class="bundle__code"></span><span class="bundle__qty"></span>';
    li.children[0].textContent = name;
    li.children[1].textContent = code;
    li.children[2].textContent = qty;
    return li;
  }

  function render(size) {
    const b = BUNDLES[size];
    sku.textContent = b.sku;
    title.textContent = `Isi bundle · ${size} reaksi`;
    list.replaceChildren(...b.items.map(row));
  }

  buttons.forEach((btn) => btn.addEventListener('click', () => {
    if (btn.classList.contains('is-selected')) return;
    buttons.forEach((o) => { const on = o === btn; o.classList.toggle('is-selected', on); o.setAttribute('aria-checked', String(on)); });
    box.classList.add('is-updating');
    setTimeout(() => { render(btn.dataset.size); box.classList.remove('is-updating'); }, 160);
  }));
  render('48');
})();

// Workflow tabs (WAI-ARIA tabs pattern: arrows, Home, End).
(() => {
  const tabs = [...document.querySelectorAll('.tab')];
  if (!tabs.length) return;
  function select(tab, focus) {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tab.focus();
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', (e) => {
      const to = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
      if (to === undefined) return;
      e.preventDefault();
      select(tabs[(to + tabs.length) % tabs.length], true);
    });
  });
})();

// FAQ accordion: one item open at a time.
(() => {
  const items = [...document.querySelectorAll('.faq-item')];
  items.forEach((item) => {
    const trigger = item.querySelector('.faq-item__trigger');
    trigger.addEventListener('click', () => {
      const open = !item.classList.contains('is-open');
      items.forEach((o) => { o.classList.remove('is-open'); o.querySelector('.faq-item__trigger').setAttribute('aria-expanded', 'false'); });
      if (open) { item.classList.add('is-open'); trigger.setAttribute('aria-expanded', 'true'); }
    });
  });
})();

// Soft checker grid (Figma "Empty State Soft Checker Grid" fill at 5% opacity), drawn on the dashboard band and the testimonials section.
// Same rules as the shader: 20px cells, hashed per cell into empty / filled / outlined, fading out from (50%, 35%).
(() => {
  const canvases = [...document.querySelectorAll('.dash__grid, .ready__grid')];
  if (!canvases.length) return;
  const CELL = 20, EMPTY = 0.55, FILLED = 0.55 + 0.2, STROKE = 0.02, FADE = 1.0, SOFT = 0.5, LAYER = 0.05;
  const hash = (x, y) => { const v = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123; return v - Math.floor(v); };
  const smooth = (a, b, v) => { const t = Math.min(1, Math.max(0, (v - a) / (b - a))); return t * t * (3 - 2 * t); };

  function paint(canvas) {
    const tint = canvas.dataset.tint || '254,242,233';
    const w = canvas.clientWidth, h = canvas.clientHeight, dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    const cx = w * 0.5, cy = h * 0.35, radius = FADE * Math.min(w, h), inner = radius * (1 - SOFT);
    ctx.lineWidth = Math.max(0.5, STROKE * CELL * 2);
    for (let i = 0; i * CELL < w; i++) {
      for (let j = 0; j * CELL < h; j++) {
        const v = hash(i, j);
        if (v < EMPTY) continue;
        const x = i * CELL, y = j * CELL;
        const fade = 1 - smooth(inner, radius, Math.hypot(x + CELL / 2 - cx, y + CELL / 2 - cy));
        if (fade <= 0) continue;
        const a = LAYER * fade;
        if (v < FILLED) { ctx.fillStyle = `rgba(${tint},${a})`; ctx.fillRect(x, y, CELL, CELL); }
        else { ctx.strokeStyle = `rgba(${tint},${a})`; ctx.strokeRect(x + 0.5, y + 0.5, CELL - 1, CELL - 1); }
      }
    }
  }
  canvases.forEach((canvas) => {
    paint(canvas);
    let timer;
    new ResizeObserver(() => { clearTimeout(timer); timer = setTimeout(() => paint(canvas), 120); }).observe(canvas);
  });
})();

// Testimonials carousel: prev / next slide the cards, the indicator follows.
(() => {
  const track = document.getElementById('ready-track');
  if (!track) return;
  const cards = [...track.children];
  const prev = document.getElementById('ready-prev');
  const next = document.getElementById('ready-next');
  const dots = [...document.querySelectorAll('.ready__dots span')];
  let index = 0;

  function render() {
    const step = cards[0].offsetWidth + 16;
    track.style.transform = `translateX(${-index * step}px)`;
    prev.disabled = index === 0;
    next.disabled = index === cards.length - 1;
    dots.forEach((d, i) => d.classList.toggle('dots__on', i === index));
    cards.forEach((c, i) => c.setAttribute('aria-hidden', String(i < index)));
  }
  prev.addEventListener('click', () => { index = Math.max(0, index - 1); render(); });
  next.addEventListener('click', () => { index = Math.min(cards.length - 1, index + 1); render(); });
  window.addEventListener('resize', render);
  render();
})();

// On-scroll bar: shows once the header breadcrumb has gone up under the navbar.
(() => {
  const bar = document.getElementById('pdp-bar');
  const crumbs = document.querySelector('.pdp > .crumbs');
  if (!bar || !crumbs) return;
  const NAV_H = 60;
  let ticking = false;
  function update() {
    ticking = false;
    const show = crumbs.getBoundingClientRect().bottom <= NAV_H;
    if (bar.classList.contains('is-visible') === show) return;
    bar.classList.toggle('is-visible', show);
    bar.toggleAttribute('inert', !show);
    bar.setAttribute('aria-hidden', String(!show));
  }
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
