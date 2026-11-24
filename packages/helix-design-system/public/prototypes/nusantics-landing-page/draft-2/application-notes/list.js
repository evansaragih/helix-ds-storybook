/* Application Notes list: category chips, search, pagination. Notes come from the inline JSON in index.html. */
(() => {
  const PAGE_SIZE = 10; // featured + 1, then rows of 3 (Figma 598:20098)
  const posts = JSON.parse(document.getElementById('posts').textContent);
  const LABEL = { all: 'All', 'complete-workflow': 'Complete workflow', 'sample-prep': 'Sample prep', 'library-prep': 'Library prep', sequencing: 'Sequencing', 'data-analysis': 'Data analysis', performance: 'Performance' };
  const state = { cat: 'all', q: '', page: 1 };

  const $ = (s) => document.querySelector(s);
  const grid = $('#bl-grid'), status = $('#bl-status'), empty = $('#bl-empty'), pager = $('#bl-pager');
  const search = $('#bl-q'), chips = [...document.querySelectorAll('.kh-chip[data-filter]')];
    const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  // Only one detail page is built so far; the rest stay inert.
  const href = (p) => p.href || '#';

  const matches = (p) => {
    if (state.cat !== 'all' && p.cat !== state.cat) return false;
    const q = state.q.trim().toLowerCase();
    return !q || (p.title + ' ' + p.excerpt).toLowerCase().includes(q);
  };

  const card = (p, feat) => `<a class="blog-card bl-card an-card kh-lift${feat ? ' bl-card--feat' : ''}" href="${href(p)}"${p.href ? '' : ' aria-disabled="true"'}>
    <img class="blog-card__img" src="${p.img}" alt="" width="${feat ? 736 : 352}" height="470" loading="lazy" decoding="async"><span class="blog-card__fade"></span>
    <div class="blog-card__copy"><span class="an-card__badge">${esc(p.badge)}</span><h2 class="news-card__title">${esc(p.title)}</h2><p class="news-card__desc">${esc(p.excerpt)}</p>
    <p class="an-card__meta">${esc(p.info)}</p>
    <ul class="an-card__tags">${p.tags.map((t) => `<li class="an-tag">${esc(t)}</li>`).join('')}</ul></div></a>`;

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

    if (q) status.textContent = `${all.length} result${all.length === 1 ? '' : 's'} for “${q}”`;
    else if (state.cat !== 'all') status.textContent = `Showing ${all.length} application note${all.length === 1 ? '' : 's'} in ${LABEL[state.cat]}`;
    else status.textContent = `Showing ${all.length} application notes`;

    grid.hidden = !slice.length;
    empty.hidden = !!slice.length;
    grid.innerHTML = slice.map((p, i) => card(p, state.page === 1 && i === 0 && slice.length > 1)).join('');
    if (!slice.length) {
      $('#bl-empty-desc').textContent = q ? `We couldn’t find any application note for “${q}”.\nCheck the spelling or try different keywords.` : `There are no application notes in ${LABEL[state.cat]} yet. Try another category.`;
      $('#bl-clear').hidden = !q;
    }
    renderPager(slice.length ? pages : 0);
  };

  const set = (patch) => { Object.assign(state, { page: 1 }, patch); render(); };

  chips.forEach((c) => c.addEventListener('click', () => set({ cat: c.dataset.filter })));
  search.addEventListener('input', () => set({ q: search.value }));
  pager.addEventListener('click', (e) => {
    const b = e.target.closest('[data-page]');
    if (!b || b.disabled) return;
    state.page = Number(b.dataset.page); render();
    document.querySelector('.bl-bar').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  });
  $('#bl-clear').addEventListener('click', () => { search.value = ''; set({ q: '' }); search.focus(); });
  $('#bl-all').addEventListener('click', () => { search.value = ''; set({ cat: 'all', q: '' }); });

  render();
})();
