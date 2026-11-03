(function(){
  var A=Auth, I=A.I, root=A.$('#root'), mode='email', loading=false, error='', val={email:'',phone:''};
  var TITLE='Selamat datang kembali di Nusantics', DESC='Masukkan email institusi atau nomor telepon Anda untuk melanjutkan. Kami akan arahkan Anda ke langkah berikutnya.';

  function render(keepFocus){
    var em=mode==='email';
    root.innerHTML=
      '<header class="head"><h1>'+TITLE+'</h1><p>'+DESC+'</p></header>'+
      '<form class="stack" id="f" novalidate style="gap:32px"><div class="field"><label for="v">'+(em?'Email Institusional':'No. Telepon')+'</label>'+
        '<div class="box'+(error?' is-error':'')+'">'+(em?'':'<span class="pre">+62</span>')+'<input id="v" name="v" '+(em?'type="email" inputmode="email" autocomplete="email" placeholder="nama@institusi.ac.id"':'type="tel" inputmode="tel" autocomplete="tel-national" placeholder="8xx xxxx xxxx"')+' value="'+A.esc(val[mode])+'"'+(error?' aria-invalid="true" aria-describedby="e"':'')+'></div>'+
        (error?'<p class="err" id="e" role="alert">'+A.esc(error)+'</p>':(em?'':'<p class="hint">Silakan gunakan nomor telepon Anda yang aktif.</p>'))+'</div>'+
        '<button class="btn btn--primary" type="submit"'+(loading?' disabled':'')+'>'+(loading?'<span class="spin"></span>':'')+'Lanjutkan</button></form>'+
      '<div class="or">Atau lanjutkan dengan</div>'+
      '<div class="socials"><button class="btn" type="button" data-s="google">'+I.google.replace('<svg','<svg style="width:16px;height:16px"')+'Google</button><button class="btn" type="button" data-s="swap">'+(em?I.phone+'No. Telepon':I.mail+'Email')+'</button></div>'+
      '<p class="terms">Dengan melanjutkan, Anda menyetujui <a class="link" href="#">Syarat &amp; Ketentuan</a> dan <a class="link" href="#">Kebijakan Privasi</a> kami</p>';
    if(keepFocus){var i=A.$('#v',root); if(i){i.focus(); i.setSelectionRange(i.value.length,i.value.length);}}
  }
  function validate(v){
    if(mode==='email'){
      if(!v) return 'Email institusi wajib diisi';
      if(!A.okEmail(v)||!A.instEmail(v)) return 'Gunakan email institusi Anda (.ac.id, .go.id, .or.id).';
    }else{
      if(!v) return 'Nomor telepon wajib diisi';
      var n=A.normPhone(v);
      if(!/^\d+$/.test(n)||n.length<6||n.length>18) return 'Must consist of 6-18 digits.';
      if(!/^8\d{8,11}$/.test(n)) return 'Gunakan nomor telepon anda yang masih aktif.';
    }
    return '';
  }
  root.addEventListener('input',function(e){ if(e.target.id==='v'){val[mode]=e.target.value; if(error){error=''; var b=e.target.closest('.box'); b.classList.remove('is-error'); var m=A.$('#e',root); if(m) m.remove(); e.target.removeAttribute('aria-invalid');}} });
  root.addEventListener('click',function(e){
    var s=e.target.closest('[data-s]'); if(!s) return;
    if(s.dataset.s==='swap'){mode=mode==='email'?'phone':'email'; error=''; render(true);}
    else A.toast({kind:'error',title:'Google belum tersedia',text:'Masuk dengan Google belum aktif di prototipe ini. Gunakan email atau nomor telepon.'});
  });
  root.addEventListener('submit',function(e){
    e.preventDefault(); if(loading) return;
    var v=A.$('#v',root).value.trim(); val[mode]=v; error=validate(v);
    if(error){render(true); return;}
    loading=true; render();
    setTimeout(function(){
      var to=mode==='email'?v.toLowerCase():'+62'+A.normPhone(v), known=mode==='email'?A.KNOWN_EMAIL.indexOf(to)>-1:true;
      if(mode==='email'&&!known){ A.store.set('reg',{email:to}); location.href='register.html'; return; }   /* no account yet → register */
      A.store.set('otp',{flow:'login',via:mode==='email'?'email':'wa',to:to});
      location.href='otp.html';
    },900);
  });
  render();
})();
