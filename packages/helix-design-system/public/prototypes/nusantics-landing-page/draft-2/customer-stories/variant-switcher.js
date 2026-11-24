/* Prototype-only: floating layout switcher between the three detail variants of the same story. */
(() => {
  const m = location.pathname.match(/([a-z-]+)-(longform|cover|editorial)\.html$/);
  if (!m) return;
  const [, slug, current] = m;
  const V = [['longform', 'Long-form'], ['cover', 'Cover'], ['editorial', 'Editorial']];
  const css = document.createElement('style');
  css.textContent = '.vs{position:fixed;z-index:200;left:50%;bottom:16px;transform:translateX(-50%);display:flex;align-items:center;gap:4px;padding:4px;border:.5px solid var(--stroke-subtle,#e5e5e5);border-radius:12px;background:var(--surface-default,#fff);box-shadow:0 6px 16px rgba(0,0,0,.12);font:500 12px/16px var(--font-body,sans-serif)}.vs__l{padding:0 8px;color:var(--text-subtler,#777)}.vs a{padding:6px 10px;border-radius:8px;color:var(--text-subtle,#333);text-decoration:none}.vs a:hover{background:var(--surface-subtle,#f3f3f3)}.vs a[aria-current=page]{background:var(--surface-primary,#f60);color:#fff}';
  document.head.appendChild(css);
  const nav = document.createElement('nav');
  nav.className = 'vs';
  nav.setAttribute('aria-label', 'Story layout');
  nav.innerHTML = '<span class="vs__l">Layout</span>' + V.map(([k, l]) => `<a href="${slug}-${k}.html"${k === current ? ' aria-current="page"' : ''}>${l}</a>`).join('');
  document.body.appendChild(nav);
})();
