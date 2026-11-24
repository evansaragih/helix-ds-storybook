// Customer Story Detail, Cover: share rail and scroll reveal. Navbar and menus come from ../script.js and ../mobile-menu.js.
(() => {
  const url = encodeURIComponent(location.href);
  document.querySelectorAll('[data-share]').forEach((a) => { a.href += url; });
  const btn = document.getElementById('cs-copy');
  const note = document.getElementById('cs-copied');
  btn?.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(location.href); note.textContent = 'Link copied'; } catch { note.textContent = 'Copy failed'; }
    setTimeout(() => { note.textContent = ''; }, 1800);
  });
})();

// Sections below the article rise in as they enter the viewport (html.js is only set when motion is allowed).
(() => {
  const items = document.querySelectorAll('.cs-reveal');
  if (!items.length) return;
  if (!document.documentElement.classList.contains('js') || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
  items.forEach((el) => io.observe(el));
})();
