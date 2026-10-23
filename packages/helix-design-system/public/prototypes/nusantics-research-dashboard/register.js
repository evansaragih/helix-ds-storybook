// Registration: 3 steps (institution -> personal data -> review), then OTP.
(() => {
  const INSTITUTIONS = [
    { name: 'Institut Teknologi Bandung', domain: 'itb.ac.id' },
    { name: 'Institut Pertanian Bogor', domain: 'apps.ipb.ac.id' },
    { name: 'Institut Teknologi Sepuluh Nopember', domain: 'its.ac.id' },
    { name: 'Universitas Indonesia', domain: 'ui.ac.id' },
    { name: 'Universitas Gadjah Mada', domain: 'ugm.ac.id' },
    { name: 'Universitas Airlangga', domain: 'unair.ac.id' },
    { name: 'Universitas Brawijaya', domain: 'ub.ac.id' },
    { name: 'Universitas Padjadjaran', domain: 'unpad.ac.id' },
    { name: 'Universitas Diponegoro', domain: 'undip.ac.id' },
    { name: 'Universitas Hasanuddin', domain: 'unhas.ac.id' },
    { name: 'Universitas Sebelas Maret', domain: 'uns.ac.id' },
    { name: 'Badan Riset dan Inovasi Nasional (BRIN)', domain: 'brin.go.id' },
  ];
  const STEP_BUTTON = { 1: 'Lanjut Isi Data Diri', 2: 'Lanjut Review Data', 3: 'Buat Akun & Verifikasi' };
  const DESC_NEW = 'Daftarkan diri dan buat kelompok studi baru di institusi Anda! Jika sudah terdaftar, minta Lead kelompok Anda untuk mengundang, jadi tidak perlu mendaftar ulang.';
  const DESC_REVIEW = 'Periksa kembali data Anda sebelum membuat akun. Kode verifikasi akan dikirim ke email institusional Anda.';
  const EMAIL_RE = /^[^\s@]+@([^\s@]+\.(?:ac\.id|go\.id|or\.id))$/i;

  const $ = (id) => document.getElementById(id);
  const form = $('reg-form'), next = $('next'), back = $('back'), toastEl = $('toast');
  const email = $('email'), inst = $('inst'), group = $('group'), first = $('first'), last = $('last'), phone = $('phone');
  const pop = $('inst-pop'), list = $('inst-list'), empty = $('inst-empty');
  const stepEls = [...document.querySelectorAll('.step')];
  const stepperItems = [...document.querySelectorAll('.stepper__item')];

  let step = 1, selected = null, active = -1, toastTimer = null;

  const toast = (text) => {
    toastEl.textContent = text; toastEl.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { toastEl.hidden = true; }, 3600);
  };

  // ---- field messages ----
  const hints = {};
  const msgOf = (input) => $(input.getAttribute('aria-describedby'));
  function setState(input, state, text) {
    const field = input.closest('.field'), msg = msgOf(input);
    if (!(input.id in hints)) hints[input.id] = msg ? msg.textContent : '';
    field.classList.toggle('field--error', state === 'error');
    field.classList.toggle('field--success', state === 'success');
    input.setAttribute('aria-invalid', state === 'error' ? 'true' : 'false');
    if (!msg) return;
    msg.textContent = text ?? hints[input.id];
    msg.hidden = !msg.textContent;
  }
  const clear = (input) => setState(input, 'idle');

  // ---- email / institution ----
  const domainOf = (v) => { const m = EMAIL_RE.exec(v.trim()); return m ? m[1].toLowerCase() : ''; };
  const matchByDomain = (d) => INSTITUTIONS.find((i) => d === i.domain || d.endsWith('.' + i.domain));

  function checkDomainHint() {
    const d = domainOf(email.value);
    const hit = d && matchByDomain(d);
    if (hit) {
      setState(email, 'success', 'Domain email sesuai dengan ' + hit.name);
      if (!selected && !inst.value.trim()) choose(hit, false);
    } else clear(email);
  }

  function renderList(query) {
    const q = query.trim().toLowerCase();
    const items = INSTITUTIONS.filter((i) => i.name.toLowerCase().includes(q));
    list.innerHTML = '';
    items.forEach((i, idx) => {
      const li = document.createElement('li');
      li.className = 'combo__opt'; li.role = 'option'; li.id = 'opt-' + idx; li.textContent = i.name;
      li.setAttribute('aria-selected', selected === i ? 'true' : 'false');
      li.addEventListener('mousedown', (e) => { e.preventDefault(); choose(i, true); });
      list.appendChild(li);
    });
    list.hidden = items.length === 0;
    empty.hidden = items.length !== 0 || !q;
    active = -1;
    return items;
  }
  function openPop() { renderList(selected ? '' : inst.value); pop.hidden = list.hidden && empty.hidden; inst.setAttribute('aria-expanded', String(!pop.hidden)); }
  function closePop() { pop.hidden = true; inst.setAttribute('aria-expanded', 'false'); inst.removeAttribute('aria-activedescendant'); }
  function choose(i, fromList) {
    selected = i; inst.value = i.name; clear(inst); closePop();
    if (fromList) inst.focus();
  }
  function moveActive(delta) {
    const opts = [...list.children]; if (!opts.length) return;
    active = (active + delta + opts.length) % opts.length;
    opts.forEach((o, k) => o.classList.toggle('is-active', k === active));
    inst.setAttribute('aria-activedescendant', opts[active].id);
    opts[active].scrollIntoView({ block: 'nearest' });
  }

  inst.addEventListener('focus', openPop);
  inst.addEventListener('input', () => { selected = null; clear(inst); renderList(inst.value); pop.hidden = list.hidden && empty.hidden; inst.setAttribute('aria-expanded', String(!pop.hidden)); });
  inst.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); if (pop.hidden) openPop(); moveActive(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); moveActive(-1); }
    else if (e.key === 'Enter' && !pop.hidden && active >= 0) { e.preventDefault(); const o = INSTITUTIONS.filter((i) => i.name.toLowerCase().includes(inst.value.trim().toLowerCase()))[active]; if (o) choose(o, false); }
    else if (e.key === 'Escape' && !pop.hidden) { e.preventDefault(); closePop(); }
  });
  inst.addEventListener('blur', () => setTimeout(closePop, 120));
  $('inst-toggle').addEventListener('mousedown', (e) => { e.preventDefault(); if (pop.hidden) { inst.focus(); openPop(); } else closePop(); });
  $('wa-support').addEventListener('click', (e) => { e.preventDefault(); toast('Tautan WhatsApp Support belum tersambung di mockup ini.'); });

  email.addEventListener('input', () => { clear(email); });
  email.addEventListener('blur', checkDomainHint);
  group.addEventListener('input', () => clear(group));
  first.addEventListener('input', () => clear(first));
  phone.addEventListener('input', () => clear(phone));

  // ---- validation ----
  const normPhone = () => phone.value.replace(/[\s-]/g, '').replace(/^0/, '');
  function validate() {
    const bad = [];
    const fail = (input, text) => { setState(input, 'error', text); bad.push(input); };
    if (step === 1) {
      const v = email.value.trim();
      if (!v) fail(email, 'Email institusional wajib diisi.');
      else if (!EMAIL_RE.test(v)) fail(email, 'Gunakan email institusi dengan domain .ac.id, .go.id, atau .or.id');
      if (!selected) fail(inst, inst.value.trim() ? 'Institusi tidak ada di daftar. Pilih dari daftar atau hubungi Nusantics Support.' : 'Nama institusi wajib dipilih.');
      if (!group.value.trim()) fail(group, 'Nama kelompok studi wajib diisi.');
    } else if (step === 2) {
      if (!first.value.trim()) fail(first, 'Nama depan wajib diisi.');
      if (!normPhone()) fail(phone, 'Nomor telepon wajib diisi.');
      else if (!/^8\d{8,11}$/.test(normPhone())) fail(phone, 'Nomor telepon tidak valid. Contoh: 812 3456 7890');
    }
    if (bad.length) bad[0].focus();
    return bad.length === 0;
  }

  // ---- steps ----
  function show(n) {
    step = n;
    stepEls.forEach((el) => { el.hidden = Number(el.dataset.step) !== n; });
    stepperItems.forEach((el, i) => {
      el.classList.toggle('is-done', i + 1 < n);
      el.classList.toggle('is-current', i + 1 === n);
      if (i + 1 === n) el.setAttribute('aria-current', 'step'); else el.removeAttribute('aria-current');
    });
    next.querySelector('.btn__label').textContent = STEP_BUTTON[n];
    $('otp-note').hidden = n === 1;
    $('reg-desc').textContent = n === 3 ? DESC_REVIEW : DESC_NEW;
    const target = stepEls[n - 1].querySelector('input'); if (target) target.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function fillReview() {
    $('r-email').textContent = email.value.trim();
    $('r-inst').textContent = selected.name;
    $('r-group').textContent = group.value.trim();
    $('r-first').textContent = first.value.trim();
    $('r-last').textContent = last.value.trim() || '—';
    $('r-phone').textContent = '+62' + normPhone();
  }

  back.addEventListener('click', (e) => { if (step > 1) { e.preventDefault(); show(step - 1); } });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (step < 3) { if (step === 2) fillReview(); show(step + 1); return; }
    next.setAttribute('aria-busy', 'true'); next.querySelector('.btn__label').textContent = 'Membuat akun…';
    try { sessionStorage.setItem('nrd.identity', JSON.stringify({ mode: 'email', value: email.value.trim() })); } catch (err) { /* storage blocked: otp page falls back to a sample value */ }
    toast('Akun dibuat. Mengirim kode verifikasi…');
    setTimeout(() => { window.location.href = 'otp.html'; }, 1100);
  });
})();
