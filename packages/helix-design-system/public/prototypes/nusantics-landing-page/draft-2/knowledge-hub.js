/* Paper & Publications: category chips and search filter the list together. */
(() => {
  const chips = document.querySelectorAll('.kh-chip');
  const items = [...document.querySelectorAll('[data-category]')];
  const search = document.getElementById('kh-q');
  const status = document.getElementById('kh-status');
  const empty = document.getElementById('kh-empty');
  const list = document.querySelector('.kh-list');
  const pager = document.querySelector('.kh-pager');
  const clear = document.getElementById('kh-clear');
  const state = { cat: 'all', q: '' };
  const text = new Map(items.map((el) => [el, (el.textContent + ' ' + (el.querySelector('img')?.alt || '')).replace(/\s+/g, ' ').toLowerCase()]));

  const render = () => {
    const raw = state.q.trim();
    const q = raw.toLowerCase();
    let shown = 0;
    items.forEach((el) => {
      const ok = (state.cat === 'all' || el.dataset.category === state.cat) && (!q || text.get(el).includes(q));
      el.hidden = !ok;
      if (ok) shown += 1;
    });
    chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.filter === state.cat)));

    status.hidden = !raw;
    if (raw) status.textContent = `${shown} result${shown === 1 ? '' : 's'} for “${raw}”`;
    list.hidden = shown === 0;
    empty.hidden = shown > 0;
    if (pager) pager.hidden = shown === 0;
    clear.hidden = !raw;
    if (!shown) {
      document.getElementById('kh-empty-desc').textContent = raw
        ? `We couldn’t find any publication for “${raw}”.\nCheck the spelling or try different keywords.`
        : 'There are no publications in this category yet.\nTry another category.';
    }
  };

  chips.forEach((chip) => chip.addEventListener('click', () => { state.cat = chip.dataset.filter; render(); }));
  search.addEventListener('input', () => { state.q = search.value; render(); });
  clear.addEventListener('click', () => { search.value = ''; state.q = ''; render(); search.focus(); });
  document.getElementById('kh-all').addEventListener('click', () => { search.value = ''; state.q = ''; state.cat = 'all'; render(); });
  render();
})();
