/* Prototype-only: floating layout switcher between the two Application Notes list variants (Card, List). */
(() => {
  const current = document.body.dataset.variant;
  const V = [['card', 'index.html', 'Card'], ['list', 'list.html', 'List']];
  const css = document.createElement('style');
  css.textContent = '.vs{position:fixed;z-index:200;left:50%;bottom:16px;transform:translateX(-50%);display:flex;align-items:center;gap:4px;padding:4px;border:.5px solid var(--stroke-subtle,#e5e5e5);border-radius:12px;background:var(--surface-default,#fff);box-shadow:0 6px 16px rgba(0,0,0,.12);font:500 12px/16px var(--font-body,sans-serif)}.vs__l{padding:0 8px;color:var(--text-subtler,#777)}.vs a{white-space:nowrap;padding:6px 10px;border-radius:8px;color:var(--text-subtle,#333);text-decoration:none}.vs a:hover{background:var(--surface-subtle,#f3f3f3)}.vs a[aria-current=page]{background:var(--surface-primary,#f60);color:#fff}';
  document.head.appendChild(css);
  const nav = document.createElement('nav');
  nav.className = 'vs';
  nav.setAttribute('aria-label', 'List layout');
  nav.innerHTML = '<span class="vs__l">Layout</span>' + V.map(([k, href, l]) => `<a href="${href}"${k === current ? ' aria-current="page"' : ''}>${l}</a>`).join('');
  document.body.appendChild(nav);
})();
