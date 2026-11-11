/* Language toggle: English stays in the HTML; Indonesian comes from i18n/id.js ("live" = copy from nusantics.com/id, "mt" = drafted here, needs review). Keys are the English text; unknown strings stay English. */
(() => {
  const KEY = 'nusantics-lang';
  const norm = (s) => s.replace(/\s+/g, ' ').trim().replace(/’/g, "'");
  const ATTRS = ['alt', 'aria-label', 'title', 'placeholder'];
  const param = new URLSearchParams(location.search).get('lang');
  if (param === 'id' || param === 'en') { try { localStorage.setItem(KEY, param); } catch (e) { /* storage unavailable */ } }

  let dict = null;
  let lang = 'en';
  const text = new Map(); // text node -> original value
  const attrs = new Map(); // element -> { attr: original value }
  const meta = document.querySelector('meta[name="description"]');
  const original = { title: document.title, desc: meta && meta.content };

  const tr = (s) => dict[norm(s)];
  const nodes = () => {
    const out = [];
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: (n) => (n.parentElement.closest('script,style,svg') || !n.nodeValue.trim() ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT) });
    while (w.nextNode()) out.push(w.currentNode);
    return out;
  };

  const toId = () => {
    nodes().forEach((n) => {
      const t = tr(n.nodeValue);
      if (t === undefined) return;
      if (!text.has(n)) text.set(n, n.nodeValue);
      n.nodeValue = n.nodeValue.replace(n.nodeValue.trim(), t);
    });
    document.querySelectorAll(ATTRS.map((a) => `[${a}]`).join(',')).forEach((el) => {
      ATTRS.forEach((a) => {
        const t = el.hasAttribute(a) && tr(el.getAttribute(a));
        if (!t) return;
        const o = attrs.get(el) || {};
        if (!(a in o)) o[a] = el.getAttribute(a);
        attrs.set(el, o);
        el.setAttribute(a, t);
      });
    });
    document.title = tr(original.title) || original.title;
    if (meta && tr(original.desc)) meta.content = tr(original.desc);
  };

  const toEn = () => {
    text.forEach((v, n) => { n.nodeValue = v; });
    attrs.forEach((o, el) => Object.entries(o).forEach(([a, v]) => el.setAttribute(a, v)));
    text.clear(); attrs.clear();
    document.title = original.title;
    if (meta) meta.content = original.desc;
  };

  const render = () => { if (!dict) return; toEn(); if (lang === 'id') toId(); };

  // Content added after load (map popups, controls) is translated as it appears.
  let queued = false;
  new MutationObserver(() => {
    if (queued || lang !== 'id' || !dict) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; toId(); });
  }).observe(document.body, { childList: true, subtree: true });

  document.addEventListener('nusantics:lang', (e) => { lang = e.detail; render(); });
  const d = window.NUSANTICS_ID;
  if (d) {
    dict = {};
    Object.entries({ ...d.live, ...d.mt }).forEach(([k, v]) => { dict[norm(k)] = v; });
    const saved = (() => { try { return localStorage.getItem(KEY); } catch (e) { return null; } })();
    if (saved === 'id') { lang = 'id'; render(); }
  }
})();
