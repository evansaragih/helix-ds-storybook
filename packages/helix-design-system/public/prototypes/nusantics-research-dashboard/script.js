// Login: email / phone toggle, validation, loading state. The next step (OTP) is not built yet.
(() => {
  const form = document.getElementById('login-form');
  const field = document.getElementById('field');
  const input = document.getElementById('identity');
  const label = document.getElementById('field-label');
  const prefix = document.getElementById('field-prefix');
  const msg = document.getElementById('field-msg');
  const submit = document.getElementById('submit');
  const switchBtn = document.getElementById('switch');
  const switchLabel = document.getElementById('switch-label');
  const switchIcon = document.getElementById('switch-icon');
  const toastEl = document.getElementById('toast');
  const desc = document.getElementById('intro-desc');

  const ICON_PHONE = '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>';
  const ICON_MAIL = '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>';
  let mode = 'email';
  let toastTimer = null;

  function toast(text) {
    toastEl.textContent = text; toastEl.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { toastEl.hidden = true; }, 3600);
  }

  function setError(text) {
    field.classList.toggle('field--error', Boolean(text));
    input.setAttribute('aria-invalid', text ? 'true' : 'false');
    msg.hidden = !text; msg.textContent = text || '';
  }

  function setMode(next) {
    mode = next; input.value = ''; setError('');
    const phone = mode === 'phone';
    field.classList.toggle('field--phone', phone);
    prefix.hidden = !phone;
    input.type = phone ? 'tel' : 'email';
    input.inputMode = phone ? 'tel' : 'email';
    input.autocomplete = phone ? 'tel-national' : 'email';
    label.textContent = phone ? 'No. Telepon' : 'Email Institusional';
    switchLabel.textContent = phone ? 'Email' : 'No. Telepon';
    switchIcon.innerHTML = phone ? ICON_MAIL : ICON_PHONE;
    desc.textContent = phone
      ? 'Masukkan nomor telepon Anda untuk melanjutkan. Kami akan mengirim kode verifikasi ke nomor tersebut.'
      : 'Masukkan email institusi atau nomor telepon Anda untuk melanjutkan. Kami akan arahkan Anda ke langkah berikutnya.';
    input.focus();
  }

  function validate() {
    const v = input.value.trim();
    if (!v) return mode === 'phone' ? 'Nomor telepon wajib diisi.' : 'Email institusional wajib diisi.';
    if (mode === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Format email tidak valid. Contoh: nama@universitas.ac.id';
    const digits = v.replace(/[\s-]/g, '').replace(/^0/, '');
    return /^8\d{8,11}$/.test(digits) ? '' : 'Nomor telepon tidak valid. Contoh: 812 3456 7890';
  }

  input.addEventListener('input', () => { if (field.classList.contains('field--error')) setError(''); });
  switchBtn.addEventListener('click', () => setMode(mode === 'email' ? 'phone' : 'email'));
  document.getElementById('google').addEventListener('click', () => toast('Masuk dengan Google belum tersambung di mockup ini.'));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); input.focus(); return; }
    submit.setAttribute('aria-busy', 'true'); submit.querySelector('.btn__label').textContent = 'Memeriksa…'; input.disabled = true;
    const raw = input.value.trim();
    const value = mode === 'phone' ? '+62' + raw.replace(/[\s-]/g, '').replace(/^0/, '') : raw;
    try { sessionStorage.setItem('nrd.identity', JSON.stringify({ mode, value })); } catch (e) { /* storage blocked: otp page falls back to a sample value */ }
    setTimeout(() => { window.location.href = 'otp.html'; }, 900);
  });
})();
