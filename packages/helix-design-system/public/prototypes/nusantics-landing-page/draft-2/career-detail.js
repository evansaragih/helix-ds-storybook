(() => {
  const url = encodeURIComponent(location.href);
  document.querySelectorAll('[data-share]').forEach((a) => { a.href += url; });
  const btn = document.getElementById('jd-copy');
  const note = document.getElementById('jd-copied');
  btn?.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(location.href); note.textContent = 'Link copied'; } catch { note.textContent = 'Copy failed'; }
    setTimeout(() => { note.textContent = ''; }, 1800);
  });
})();
