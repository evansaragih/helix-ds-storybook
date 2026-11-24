/* Customer Story "Editorial": the video block is a placeholder, so Play only shows a short note. */
(() => {
  const btn = document.querySelector('.ces-play');
  const note = document.querySelector('.ces-video__note');
  if (!btn || !note) return;
  let timer;
  btn.addEventListener('click', () => {
    note.hidden = false;
    clearTimeout(timer);
    timer = setTimeout(() => { note.hidden = true; }, 3000);
  });
})();
