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
  const navRows = [...menu.children].map((el) => {
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

  // Language row (Figma Mobile Menu): a group row like the others, English (EN) with English and Bahasa Indonesia underneath
  const lang = nav.querySelector('.nav__actions .nav-dd--lang');
  const langItems = lang ? [...lang.querySelectorAll('.nav-menu__item[lang]')] : [];
  const langName = (o) => `${o.textContent.trim()} (${o.dataset.code})`;
  const flagOf = (o) => { const f = o.querySelector('img'); return f ? f.getAttribute('src') : ''; };
  const langRows = lang ? `<button class="mmenu__row mmenu__row--group mmenu__lang" type="button" aria-expanded="false" aria-controls="mmenu-lang"><span class="mmenu__lang-label"><img class="nav-flag" alt="" width="16" height="16"><span class="mmenu__lang-name"></span></span><span class="nav-chevron" aria-hidden="true"></span></button>`
    + `<div class="mmenu__sub" id="mmenu-lang" data-open="false"><div class="mmenu__sub-inner">${langItems.map((o) => `<a class="mmenu__row mmenu__row--sub" href="#" lang="${o.lang}"><img class="nav-flag" src="${esc(flagOf(o))}" alt="" width="16" height="16">${esc(o.textContent.trim())}</a>`).join('')}</div></div>` : '';

  // Legal block: same copy, links and social icons as the page footer
  const pageLinks = [...document.querySelectorAll('.footer__legal a')];
  const privacyHref = (pageLinks[0] && pageLinks[0].getAttribute('href')) || 'privacy.html';
  const termsHref = (pageLinks[1] && pageLinks[1].getAttribute('href')) || 'terms.html';
  const social = document.querySelector('.footer__social');
  const legal = `<div class="mmenu__legal">
        <p class="mmenu__copy">Copyright © 2026 PT Riset Nusantara Genetika, PT Nusantara Butuh Diagnostik. All Rights Reserved.</p>
        <div class="mmenu__links"><a href="${esc(privacyHref)}">Privacy Policy</a><a href="${esc(termsHref)}">Terms of Use</a></div>
        ${social ? `<div class="mmenu__social">${social.innerHTML}</div>` : ''}
      </div>`;

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
    <nav class="mmenu__body" aria-label="Mobile">${navRows}${langRows}</nav>
    <div class="mmenu__foot">
      <hr class="mmenu__rule">
      <div class="mmenu__actions">
        ${login ? `<a class="btn btn--white mmenu__btn" href="${esc(login.getAttribute('href'))}">${esc(login.textContent.trim())}</a>` : ''}
        ${contact ? `<a class="btn btn--primary mmenu__btn" href="${esc(contact.getAttribute('href'))}">${esc(contact.textContent.trim())}</a>` : ''}
      </div>
      ${legal}
    </div>`;
  nav.appendChild(panel); // inside the navbar's stacking context, so the bar itself stays above the panel

  // Language: the sub rows forward to the navbar dropdown items, so script.js and i18n.js stay the owners
  if (lang) {
    const name = panel.querySelector('.mmenu__lang-name');
    const flag = panel.querySelector('.mmenu__lang-label .nav-flag');
    const subs = [...panel.querySelectorAll('.mmenu__row--sub[lang]')];
    const sync = () => {
      langItems.forEach((o, i) => {
        const on = o.getAttribute('aria-current') === 'true';
        if (on) { name.textContent = langName(o); flag.src = flagOf(o); }
        if (on) subs[i].setAttribute('aria-current', 'true'); else subs[i].removeAttribute('aria-current');
      });
    };
    sync();
    document.addEventListener('nusantics:lang', sync);
    subs.forEach((row, i) => row.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation(); // stay open: only the group collapses
      langItems[i].click();
      const g = panel.querySelector('.mmenu__lang');
      g.setAttribute('aria-expanded', 'false');
      document.getElementById('mmenu-lang').dataset.open = 'false';
    }));
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
