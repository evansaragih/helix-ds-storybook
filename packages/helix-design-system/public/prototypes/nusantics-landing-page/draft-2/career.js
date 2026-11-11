// Career page: values carousel, Helix-style selects, filtered + paginated job list with a loading skeleton.
(() => {
  // ---------- Hero video: loops silently; paused when the visitor prefers reduced motion ----------
  const heroVideo = document.getElementById('career-video');
  if (heroVideo) {
    const rm = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => { if (rm.matches) heroVideo.pause(); else heroVideo.play().catch(() => {}); };
    rm.addEventListener('change', sync); sync();
  }

  // ---------- Values carousel ----------
  const root = document.getElementById('values-carousel');
  if (root) {
    const slides = [...root.querySelectorAll('.carousel__slide')];
    const dotsHost = root.querySelector('.carousel__dots');
    let index = 0;
    let timer = null;
    const INTERVAL = 5000;
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

    const dots = slides.map((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', `Slide ${i + 1}`);
      b.addEventListener('click', () => {
        show(i);
        restart();
      });
      dotsHost.appendChild(b);
      return b;
    });

    function show(next) {
      index = (next + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('is-active', i === index));
      dots.forEach((d, i) => d.setAttribute('aria-current', String(i === index)));
    }

    function stop() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function start() {
      if (reduceMotion.matches || document.hidden || timer) return;
      timer = setInterval(() => show(index + 1), INTERVAL);
    }

    function restart() {
      stop();
      start();
    }

    root.querySelector('.carousel__nav--prev')?.addEventListener('click', () => {
      show(index - 1);
      restart();
    });
    root.querySelector('.carousel__nav--next')?.addEventListener('click', () => {
      show(index + 1);
      restart();
    });

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
    reduceMotion.addEventListener('change', () => (reduceMotion.matches ? stop() : start()));

    show(0);
    start();
  }

  // ---------- Select (port of Helix Select, single) ----------
  const selects = [...document.querySelectorAll('.hselect')].map((el) => {
    const trigger = el.querySelector('.hselect__trigger');
    const pop = el.querySelector('.hselect__pop');
    const label = el.querySelector('.hselect__value');
    const opts = [...el.querySelectorAll('.hselect__opt')];
    const api = { el, value: '', open: false };
    let closeTimer = 0;

    function setValue(v) {
      api.value = v;
      const o = opts.find((x) => x.dataset.value === v) || opts[0];
      opts.forEach((x) => x.setAttribute('aria-selected', String(x === o)));
      label.textContent = o.querySelector('span').textContent;
      el.classList.toggle('has-value', Boolean(v));
    }
    function open() {
      selects.forEach((s) => s !== api && s.close());
      clearTimeout(closeTimer);
      pop.hidden = false; pop.dataset.state = 'open'; trigger.setAttribute('aria-expanded', 'true'); api.open = true;
      (opts.find((x) => x.getAttribute('aria-selected') === 'true') || opts[0]).focus();
    }
    function close(refocus) {
      if (!api.open) return;
      api.open = false; pop.dataset.state = 'closed'; trigger.setAttribute('aria-expanded', 'false');
      closeTimer = setTimeout(() => { pop.hidden = true; }, 160);
      if (refocus) trigger.focus();
    }
    function pick(o) { setValue(o.dataset.value); close(true); }

    trigger.addEventListener('click', () => (api.open ? close() : open()));
    trigger.addEventListener('keydown', (e) => { if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); open(); } });
    opts.forEach((o) => o.addEventListener('click', () => pick(o)));
    pop.addEventListener('keydown', (e) => {
      const i = opts.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); opts[Math.min(i + 1, opts.length - 1)].focus(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); opts[Math.max(i - 1, 0)].focus(); }
      else if (e.key === 'Home') { e.preventDefault(); opts[0].focus(); }
      else if (e.key === 'End') { e.preventDefault(); opts[opts.length - 1].focus(); }
      else if (e.key === 'Escape') { e.preventDefault(); close(true); }
      else if (e.key === 'Tab') close();
    });
    document.addEventListener('pointerdown', (e) => { if (api.open && !el.contains(e.target)) close(); });
    api.close = close; api.setValue = setValue;
    setValue('');
    return api;
  });
  const sel = (id) => selects.find((s) => s.el.dataset.select === id);

  // ---------- Jobs ----------
  const DEPTS = {
    animal: 'Commercial (AnimalDx)', human: 'Commercial (HumanDx)', finance: 'Finance, Accounting, & Tax',
    supply: 'Supply Chain Management', ops: 'Technical Operations', rnd: 'Research & Development', quality: 'Quality Assurance',
  };
  const TYPES = { full: 'Full-Time', part: 'Part-Time', intern: 'Internship' };
  const JOBS = [
    ['animal', 'Technical Account Manager', 'full'], ['animal', 'Sales Admin (Part Time)', 'part'], ['supply', 'Inventory Management Staff', 'full'],
    ['finance', 'Finance, Accounting & Tax Manager', 'full'], ['ops', 'QC Lead', 'full'], ['human', 'Medical Sales Representative', 'full'],
    ['rnd', 'Molecular Biologist', 'full'], ['rnd', 'Bioinformatics Engineer', 'full'], ['rnd', 'Research Assistant (Internship)', 'intern'],
    ['quality', 'Quality Assurance Officer', 'full'], ['quality', 'Document Control Specialist', 'part'], ['ops', 'Laboratory Technician', 'full'],
    ['ops', 'Production Supervisor', 'full'], ['supply', 'Procurement Specialist', 'full'], ['supply', 'Warehouse Staff', 'part'],
    ['animal', 'Aquaculture Field Technician', 'full'], ['animal', 'Key Account Executive (Shrimp)', 'full'], ['human', 'Clinical Specialist', 'full'],
    ['human', 'Customer Success Associate', 'part'], ['finance', 'Accounts Payable Staff', 'full'], ['finance', 'Tax Intern', 'intern'],
    ['rnd', 'Data Scientist', 'full'], ['quality', 'Regulatory Affairs Associate', 'full'], ['ops', 'Logistics Coordinator', 'part'],
  ].map(([d, title, t]) => ({ dept: d, title, type: t }));
  const PER_PAGE = 6;

  const list = document.getElementById('job-list');
  const empty = document.getElementById('job-empty');
  const pager = document.getElementById('pager');
  const form = document.getElementById('job-filters');
  if (!list || !form) return;

  const CLOCK = '<svg class="job__ico" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm.75 3.5v3.6l2.4 1.4-.75 1.25-3.15-1.85V4.5h1.5Z"/></svg>';
  const PIN = '<svg class="job__ico" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M8 1a5 5 0 0 0-5 5c0 3.6 5 9 5 9s5-5.4 5-9a5 5 0 0 0-5-5Zm0 6.8A1.8 1.8 0 1 1 8 4.2a1.8 1.8 0 0 1 0 3.6Z"/></svg>';
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');

  let filtered = JOBS, page = 1, token = 0;

  function row(j) {
    const DETAIL = j.title === 'Technical Account Manager' ? 'career-detail.html' : '#';
    return `<li class="job-row"><div class="job-row__main"><span class="badge">${esc(DEPTS[j.dept])}</span><h3 class="job-row__title">${esc(j.title)}</h3>` +
      `<p class="job-row__meta"><span>${CLOCK}${TYPES[j.type]}</span><span>${PIN}Jakarta</span></p></div><a class="job-row__apply" href="${DETAIL}" aria-label="Apply for ${esc(j.title)}">Apply for Role</a></li>`;
  }
  function skeletonRow() {
    return '<li class="job-row job-row--skel" aria-hidden="true"><div class="job-row__main"><span class="sk sk--badge"></span><span class="sk sk--title"></span><span class="sk sk--meta"></span></div><span class="sk sk--apply"></span></li>';
  }
  function pageList(n) {
    if (n <= 7) return Array.from({ length: n }, (_, i) => i + 1);
    const out = [1];
    if (page > 3) out.push('…');
    for (let p = Math.max(2, page - 1); p <= Math.min(n - 1, page + 1); p += 1) out.push(p);
    if (page < n - 2) out.push('…');
    out.push(n);
    return out;
  }
  function renderPager() {
    const n = Math.ceil(filtered.length / PER_PAGE);
    pager.hidden = n <= 1;
    if (n <= 1) { pager.innerHTML = ''; return; }
    pager.innerHTML = `<button class="pager__btn" type="button" data-go="${page - 1}"${page === 1 ? ' disabled' : ''}>Previous</button><div class="pager__pages">` +
      pageList(n).map((p) => (p === '…' ? '<span class="pager__btn pager__gap" aria-hidden="true">...</span>'
        : `<button class="pager__btn${p === page ? ' is-active' : ''}" type="button" data-go="${p}"${p === page ? ' aria-current="page"' : ''}>${p}</button>`)).join('') +
      `</div><button class="pager__btn" type="button" data-go="${page + 1}"${page === n ? ' disabled' : ''}>Next</button>`;
  }

  // Pretend the next page comes from a server: skeleton first, then the rows.
  function load(nextPage, scroll) {
    const mine = ++token;
    page = nextPage;
    list.setAttribute('aria-busy', 'true');
    empty.hidden = true; pager.classList.add('is-loading');
    list.innerHTML = Array.from({ length: PER_PAGE }, skeletonRow).join('');
    if (scroll) document.getElementById('positions').scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth', block: 'start' });
    setTimeout(() => {
      if (mine !== token) return;
      const start = (page - 1) * PER_PAGE;
      const rows = filtered.slice(start, start + PER_PAGE);
      list.innerHTML = rows.map(row).join('');
      list.setAttribute('aria-busy', 'false');
      empty.hidden = rows.length > 0;
      pager.classList.remove('is-loading');
      renderPager();
    }, reduce.matches ? 0 : 700);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const dept = sel('f-dept').value, type = sel('f-type').value;
    filtered = JOBS.filter((j) => (!dept || j.dept === dept) && (!type || j.type === type));
    pager.hidden = true;
    load(1, false);
  });
  pager.addEventListener('click', (e) => {
    const b = e.target.closest('[data-go]');
    if (!b || b.disabled || pager.classList.contains('is-loading')) return;
    load(Number(b.dataset.go), true);
  });

  renderPager();
  load(1, false);
})();
