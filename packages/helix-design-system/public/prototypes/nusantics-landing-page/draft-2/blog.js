/* Blog list: category chips + "Other" menu, search, pagination. Posts come from the inline JSON in blog.html. */
(() => {
  const PAGE_SIZE = 11; // featured + 1, then rows of 3 (Figma 327:8660)
  const posts = JSON.parse(document.getElementById('posts').textContent);
  const CAT = { 9: 'reproductive', 5: 'human-diagnostics', 3: 'animal-diagnostics' };
  const LABEL = { all: 'All', respiratory: 'Respiratory', reproductive: 'Reproductive', 'human-diagnostics': 'Human Diagnostics', 'animal-diagnostics': 'Animal Diagnostics', genomics: 'Genomics', microbiome: 'Microbiome', 'company-news': 'Company News', events: 'Events' };
  const OTHER = new Set(['human-diagnostics', 'animal-diagnostics', 'genomics', 'microbiome', 'company-news', 'events']);
  const state = { cat: 'all', q: '', page: 1 };

  const $ = (s) => document.querySelector(s);
  const grid = $('#bl-grid'), status = $('#bl-status'), empty = $('#bl-empty'), pager = $('#bl-pager');
  const search = $('#bl-q'), chips = [...document.querySelectorAll('.kh-chip[data-filter]')];
  const otherChip = $('#bl-other'), menu = $('#bl-other-menu'), items = [...menu.querySelectorAll('[data-sub]')];
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  // Detail pages built so far; the rest open on the live site.
  const DETAIL = { 539: 'blog-detail.html', 540: 'blog-detail-pcr.html', 537: 'blog-detail-hpv-types.html', 536: 'blog-detail-hpv-foods.html', 532: 'blog-detail-vaginal-discharge.html' };
  const href = (p) => DETAIL[p.id] || `https://nusantics.com/en/blog/${p.slug}`;

  const matches = (p) => {
    if (state.cat !== 'all' && CAT[p.cat] !== state.cat) return false;
    const q = state.q.trim().toLowerCase();
    return !q || (p.title + ' ' + p.excerpt).toLowerCase().includes(q);
  };

  const card = (p, feat) => `<a class="blog-card bl-card kh-lift${feat ? ' bl-card--feat' : ''}" href="${href(p)}"${DETAIL[p.id] ? '' : ' target="_blank" rel="noopener noreferrer"'}>
    <img class="blog-card__img" src="${p.img}" alt="" width="${feat ? 736 : 352}" height="380" loading="lazy" decoding="async"><span class="blog-card__fade"></span>
    <div class="blog-card__copy"><h2 class="news-card__title">${esc(p.title)}</h2><p class="news-card__desc">${esc(p.excerpt)}</p></div></a>`;

  const pageList = (n, cur) => {
    if (n <= 7) return Array.from({ length: n }, (_, i) => i + 1);
    if (cur <= 3) return [1, 2, 3, '…', n - 2, n - 1, n];
    if (cur >= n - 2) return [1, 2, 3, '…', n - 2, n - 1, n];
    return [1, '…', cur - 1, cur, cur + 1, '…', n];
  };

  const renderPager = (n) => {
    pager.hidden = n <= 1;
    if (n <= 1) return;
    const b = (label, page, extra = '') => `<button class="kh-pager__btn${extra}" type="button" data-page="${page}"${extra.includes('is-active') ? ' aria-current="page"' : ''}>${label}</button>`;
    pager.innerHTML = `<button class="kh-pager__btn" type="button" data-page="${state.page - 1}"${state.page === 1 ? ' disabled' : ''}>Previous</button>
      <div class="kh-pager__pages">${pageList(n, state.page).map((p) => (p === '…' ? '<span class="kh-pager__btn bl-pager__gap" aria-hidden="true">…</span>' : b(p, p, p === state.page ? ' is-active' : ''))).join('')}</div>
      <button class="kh-pager__btn" type="button" data-page="${state.page + 1}"${state.page === n ? ' disabled' : ''}>Next</button>`;
  };

  const render = () => {
    const all = posts.filter(matches);
    const pages = Math.max(1, Math.ceil(all.length / PAGE_SIZE));
    state.page = Math.min(state.page, pages);
    const start = (state.page - 1) * PAGE_SIZE, slice = all.slice(start, start + PAGE_SIZE);
    const q = state.q.trim();

    chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.filter === state.cat)));
    otherChip.setAttribute('aria-pressed', String(OTHER.has(state.cat)));
    items.forEach((i) => i.setAttribute('aria-checked', String(i.dataset.sub === state.cat)));

    if (q) status.textContent = `${all.length} result${all.length === 1 ? '' : 's'} for “${q}”`;
    else if (state.cat !== 'all') status.textContent = `Showing ${all.length} article${all.length === 1 ? '' : 's'} in ${LABEL[state.cat]}`;
    else status.textContent = `Showing ${all.length ? start + 1 : 0}–${start + slice.length} of ${all.length} articles`;

    grid.hidden = !slice.length;
    empty.hidden = !!slice.length;
    grid.innerHTML = slice.map((p, i) => card(p, state.page === 1 && i === 0 && slice.length > 1)).join('');
    if (!slice.length) {
      $('#bl-empty-desc').textContent = q ? `We couldn’t find any article for “${q}”.\nCheck the spelling or try different keywords.` : `There are no articles in ${LABEL[state.cat]} yet. Try another category.`;
      $('#bl-clear').hidden = !q;
    }
    renderPager(slice.length ? pages : 0);
  };

  const set = (patch) => { Object.assign(state, { page: 1 }, patch); render(); };

  chips.forEach((c) => c.addEventListener('click', () => set({ cat: c.dataset.filter })));
  items.forEach((i) => i.addEventListener('click', () => { set({ cat: i.dataset.sub }); closeMenu(); }));
  search.addEventListener('input', () => set({ q: search.value }));
  pager.addEventListener('click', (e) => {
    const b = e.target.closest('[data-page]');
    if (!b || b.disabled) return;
    state.page = Number(b.dataset.page); render();
    document.querySelector('.bl-bar').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  });
  $('#bl-clear').addEventListener('click', () => { search.value = ''; set({ q: '' }); search.focus(); });
  $('#bl-all').addEventListener('click', () => { search.value = ''; set({ cat: 'all', q: '' }); });

  // "Other" dropdown
  function openMenu() { menu.hidden = false; menu.dataset.state = 'open'; otherChip.setAttribute('aria-expanded', 'true'); }
  function closeMenu() { menu.hidden = true; menu.dataset.state = 'closed'; otherChip.setAttribute('aria-expanded', 'false'); }
  otherChip.addEventListener('click', () => (menu.hidden ? openMenu() : closeMenu()));
  document.addEventListener('click', (e) => { if (!menu.hidden && !e.target.closest('.bl-dd')) closeMenu(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { closeMenu(); otherChip.focus(); } });

  render();
})();
