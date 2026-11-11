/* Mobile menu (Figma Mobile Menu 8698:8130): hamburger in the navbar below 1280px opens a full-screen panel.
   Built from the navbar's own links so the two never drift apart. */
(() => {
  const nav = document.getElementById('nav');
  const inner = nav && nav.querySelector('.nav__inner');
  const menu = nav && nav.querySelector('.nav__menu');
  if (!inner || !menu) return;

  const BP = matchMedia('(max-width: 1279px)');
  const svg = (d) => `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const ICON_MENU = svg('<path d="M4 6h16M4 12h16M4 18h16"/>');
  const ICON_CLOSE = svg('<path d="M18 6 6 18M6 6l12 12"/>');
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const label = (el) => [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.nodeValue).join('').trim();

  // Burger (closed state of Marketing Navbar Device=Mobile)
  const burger = document.createElement('button');
  burger.className = 'nav__burger';
  burger.type = 'button';
  burger.setAttribute('aria-label', 'Open menu');
  burger.setAttribute('aria-haspopup', 'dialog');
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-controls', 'mmenu');
  burger.innerHTML = `<span class="nav__burger-icon nav__burger-icon--menu">${ICON_MENU}</span><span class="nav__burger-icon nav__burger-icon--close">${ICON_CLOSE}</span>`;
  inner.appendChild(burger);

  // Rows from the navbar: dropdown groups become expandable rows, plain links stay links
  let n = 0;
  const rows = [...menu.children].map((el) => {
    const trigger = el.querySelector('.nav-trigger');
    if (!trigger) {
      return `<a class="mmenu__row" href="${esc(el.getAttribute('href'))}"${el.hasAttribute('aria-current') ? ' aria-current="page"' : ''}>${esc(el.textContent.trim())}</a>`;
    }
    let items = [...el.querySelectorAll('.nav-menu__list > *')];
    const at = items.findIndex((i) => i.classList.contains('nav-menu__divider'));
    if (at > -1) items = [...items.slice(at + 1), ...items.slice(0, at)]; // Figma lists Product Pipeline first
    items = items.filter((i) => !i.classList.contains('nav-menu__divider'));
    const id = `mmenu-sub-${++n}`;
    const current = items.some((i) => i.getAttribute('aria-current') === 'page');
    const subs = items.map((i) => `<a class="mmenu__row mmenu__row--sub" href="${esc(i.getAttribute('href'))}"${i.getAttribute('aria-current') === 'page' ? ' aria-current="page"' : ''}>${esc(i.textContent.trim())}</a>`).join('');
    return `<button class="mmenu__row mmenu__row--group" type="button" aria-expanded="${current}" aria-controls="${id}"><span>${esc(label(trigger))}</span><span class="nav-chevron" aria-hidden="true"></span></button>`
      + `<div class="mmenu__sub" id="${id}" data-open="${current}"><div class="mmenu__sub-inner">${subs}</div></div>`;
  }).join('');

  const lang = nav.querySelector('.nav__actions .toggle');
  const login = nav.querySelector('.nav__actions a.btn--white, .nav__actions a[href*="login"]');
  const contact = nav.querySelector('.nav__actions a.btn--primary');

  const panel = document.createElement('div');
  panel.className = 'mmenu';
  panel.id = 'mmenu';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('aria-label', 'Menu');
  panel.setAttribute('data-state', 'closed');
  panel.setAttribute('inert', '');
  panel.innerHTML = `
    <nav class="mmenu__body" aria-label="Mobile">${rows}</nav>
    <div class="mmenu__foot">
      <hr class="mmenu__rule">
      ${lang ? '<div class="toggle toggle--sm mmenu__toggle" role="radiogroup" aria-label="Language"></div>' : ''}
      <div class="mmenu__actions">
        ${login ? `<a class="btn btn--white mmenu__btn" href="${esc(login.getAttribute('href'))}">${esc(login.textContent.trim())}</a>` : ''}
        ${contact ? `<a class="btn btn--primary mmenu__btn" href="${esc(contact.getAttribute('href'))}">${esc(contact.textContent.trim())}</a>` : ''}
      </div>
    </div>`;
  nav.appendChild(panel); // inside the navbar's stacking context, so the bar itself stays above the panel

  // Language: the panel toggle mirrors the navbar toggle and forwards clicks to it, so i18n.js stays the single owner
  if (lang) {
    const mine = panel.querySelector('.mmenu__toggle');
    const orig = [...lang.querySelectorAll('.toggle__item')];
    orig.forEach((o) => {
      const b = o.cloneNode(true);
      b.addEventListener('click', () => { o.click(); sync(); });
      mine.appendChild(b);
    });
    const sync = () => [...mine.children].forEach((b, i) => { b.setAttribute('aria-checked', orig[i].getAttribute('aria-checked')); b.tabIndex = orig[i].tabIndex; });
    sync();
    document.addEventListener('nusantics:lang', sync);
  }

  // Groups expand and collapse
  panel.addEventListener('click', (e) => {
    const g = e.target.closest('.mmenu__row--group');
    if (g) {
      const open = g.getAttribute('aria-expanded') !== 'true';
      g.setAttribute('aria-expanded', String(open));
      document.getElementById(g.getAttribute('aria-controls')).dataset.open = String(open);
      return;
    }
    if (e.target.closest('a')) close(false);
  });

  let timer = 0;
  function open() {
    clearTimeout(timer);
    panel.removeAttribute('inert');
    panel.setAttribute('data-state', 'open');
    nav.classList.add('is-menu-open');
    document.documentElement.classList.add('mmenu-open');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Close menu');
  }
  function close(restore = true) {
    panel.setAttribute('data-state', 'closed');
    panel.setAttribute('inert', '');
    nav.classList.remove('is-menu-open');
    document.documentElement.classList.remove('mmenu-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
    if (restore) burger.focus({ preventScroll: true });
  }
  // The navbar stays put; its hamburger doubles as the close button
  burger.addEventListener('click', () => (panel.getAttribute('data-state') === 'open' ? close() : open()));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && panel.getAttribute('data-state') === 'open') close(); });
  // Keep Tab between the burger and the panel while it is open
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || panel.getAttribute('data-state') !== 'open') return;
    const f = [burger, ...panel.querySelectorAll('a[href],button:not([disabled])')].filter((x) => x.offsetParent !== null);
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  BP.addEventListener('change', () => { if (!BP.matches && panel.getAttribute('data-state') === 'open') close(false); });
})();
