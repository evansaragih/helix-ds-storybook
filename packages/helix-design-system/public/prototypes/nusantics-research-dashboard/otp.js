// OTP verification (mockup). Demo code that succeeds: 123456. Anything else shows the "invalid" state.
(() => {
  const DEMO_CODE = '123456';
  const COUNTDOWN = 30;
  const HOME_URL = '../plotly-workspace/nusantics-beranda-mock.html';
  const boxes = [...document.querySelectorAll('.otp__box')];
  const otp = document.getElementById('otp');
  const msg = document.getElementById('otp-msg');
  const form = document.getElementById('otp-form');
  const verify = document.getElementById('verify');
  const timerEl = document.getElementById('otp-timer');
  const alertEl = document.getElementById('alert');
  const toastEl = document.getElementById('toast');
  const help = document.getElementById('help');
  let remaining = COUNTDOWN, tick = null, toastTimer = null;

  // Where the code was sent (set by the login page)
  let target = '+628134567890';
  try { const s = JSON.parse(sessionStorage.getItem('nrd.identity') || 'null'); if (s && s.value) { target = s.value; if (s.mode === 'email') document.getElementById('otp-desc').firstChild.textContent = 'Masukkan kode verifikasi yang telah dikirim ke email '; } } catch (e) { /* keep sample */ }
  document.getElementById('otp-target').textContent = target;

  const code = () => boxes.map((b) => b.value).join('');
  function sync() { boxes.forEach((b) => b.classList.toggle('is-filled', Boolean(b.value))); }
  function setError(text) {
    otp.classList.toggle('otp--error', Boolean(text));
    boxes.forEach((b) => b.setAttribute('aria-invalid', text ? 'true' : 'false'));
    msg.hidden = !text; msg.textContent = text || '';
  }
  function showAlert(title, desc) {
    document.getElementById('alert-title').textContent = title; document.getElementById('alert-desc').textContent = desc; alertEl.hidden = false;
  }
  function toast(text) { toastEl.textContent = text; toastEl.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => { toastEl.hidden = true; }, 3600); }

  // Boxes: type, auto-advance, backspace, arrows, paste
  boxes.forEach((box, i) => {
    box.addEventListener('input', () => {
      box.value = box.value.replace(/[^0-9a-z]/gi, '').slice(-1).toUpperCase();
      setError(''); alertEl.hidden = true; sync();
      if (box.value && boxes[i + 1]) boxes[i + 1].focus();
    });
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !box.value && boxes[i - 1]) { boxes[i - 1].value = ''; boxes[i - 1].focus(); sync(); e.preventDefault(); }
      else if (e.key === 'ArrowLeft' && boxes[i - 1]) { boxes[i - 1].focus(); e.preventDefault(); }
      else if (e.key === 'ArrowRight' && boxes[i + 1]) { boxes[i + 1].focus(); e.preventDefault(); }
    });
    box.addEventListener('focus', () => box.select());
    box.addEventListener('paste', (e) => {
      e.preventDefault();
      const text = (e.clipboardData.getData('text') || '').replace(/[^0-9a-z]/gi, '').toUpperCase().slice(0, boxes.length);
      text.split('').forEach((ch, k) => { boxes[k].value = ch; });
      sync(); setError('');
      (boxes[Math.min(text.length, boxes.length - 1)]).focus();
    });
  });

  // Countdown / resend
  const fmt = (s) => '00:' + String(s).padStart(2, '0');
  function startTimer() {
    remaining = COUNTDOWN; clearInterval(tick);
    timerEl.innerHTML = 'Permintaan kode OTP baru dalam <strong class="accent" id="otp-count">' + fmt(remaining) + '</strong>';
    tick = setInterval(() => {
      remaining -= 1;
      const c = document.getElementById('otp-count');
      if (remaining > 0) { if (c) c.textContent = fmt(remaining); return; }
      clearInterval(tick);
      timerEl.innerHTML = 'Belum menerima kode? <button type="button" id="resend">Kirim ulang kode</button>';
      document.getElementById('resend').addEventListener('click', () => { boxes.forEach((b) => { b.value = ''; }); sync(); setError(''); alertEl.hidden = true; startTimer(); boxes[0].focus(); toast('Kode baru telah dikirim.'); });
    }, 1000);
  }

  // Verify
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const c = code();
    if (c.length < boxes.length) {
      setError('Silakan masukkan kode OTP sebelum mengklik verifikasi.');
      showAlert('Kode OTP Belum Diisi', 'Silakan masukkan 6 digit kode OTP yang dikirim ke ' + target + ' sebelum melanjutkan verifikasi.');
      (boxes.find((b) => !b.value) || boxes[0]).focus(); return;
    }
    verify.setAttribute('aria-busy', 'true'); verify.querySelector('.btn__label').textContent = 'Memverifikasi…'; boxes.forEach((b) => { b.disabled = true; });
    setTimeout(() => {
      verify.removeAttribute('aria-busy'); verify.querySelector('.btn__label').textContent = 'Verifikasi'; boxes.forEach((b) => { b.disabled = false; });
      if (c === DEMO_CODE) {
        toast('Verifikasi berhasil. Membuka beranda\u2026');
        verify.setAttribute('aria-busy', 'true'); boxes.forEach((b) => { b.disabled = true; });
        setTimeout(() => { window.location.href = HOME_URL; }, 700);
        return;
      }
      setError('Kode OTP yang Anda masukkan tidak valid. Silakan coba lagi.');
      showAlert('Verifikasi Gagal', 'Kode OTP yang Anda masukkan tidak valid atau sudah kedaluwarsa. Silakan coba lagi atau minta kode baru.');
      boxes[boxes.length - 1].focus();
    }, 900);
  });

  document.getElementById('alert-close').addEventListener('click', () => { alertEl.hidden = true; });

  // Help dialog
  document.getElementById('help-open').addEventListener('click', () => help.showModal());
  document.getElementById('help-close').addEventListener('click', () => help.close());
  help.addEventListener('click', (e) => { if (e.target === help) help.close(); });

  startTimer(); boxes[0].focus();
})();
