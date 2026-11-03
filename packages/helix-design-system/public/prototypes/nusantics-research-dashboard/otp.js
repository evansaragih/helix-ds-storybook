(function(){
  var A=Auth, I=A.I, root=A.$('#root');
  var st=A.store.get('otp')||{flow:'login',via:'wa',to:'+628134567890'};
  var secs=30, errMsg='', digits=['','','','','',''], tmr;
  var fmt=function(n){return '00:'+String(n).padStart(2,'0')};
  function render(focus){
    root.className='form form--tight'; root.style.gap='12px';
    root.innerHTML='<a class="back" href="#" id="bk">'+I.back+'Kembali</a>'+
      '<header class="head head--dark"><h1>Masukkan kode 6 digit</h1><p>Masukkan kode verifikasi yang telah dikirim ke '+A.esc(st.to)+'</p></header>'+
      '<form class="stack" id="f" novalidate><div class="field"><div class="otp'+(errMsg?' is-error':'')+'" id="otp" role="group" aria-label="Kode OTP 6 digit">'+
      digits.map(function(d,i){return '<input inputmode="numeric" autocomplete="'+(i?'off':'one-time-code')+'" maxlength="1" aria-label="Digit '+(i+1)+'" data-i="'+i+'" value="'+d+'">'}).join('')+'</div>'+
      (errMsg?'<p class="err" id="oe" role="alert">'+A.esc(errMsg)+'</p>':'')+'</div>'+
      '<p class="timer" id="tm">'+timerHtml()+'</p>'+
      '<button class="btn btn--primary" type="submit">Verifikasi</button>'+
      '<p class="center" style="margin:12px 0 0"><button class="link" type="button" id="help">Ada masalah dengan OTP?</button></p></form>';
    if(focus!==false){var t=A.$('[data-i="'+(focus||0)+'"]',root); if(t) t.focus();}
  }
  var timerHtml=function(){return secs>0?'Permintaan kode OTP baru dalam <b>'+fmt(secs)+'</b>':'Tidak menerima kode? <button class="link" type="button" id="resend">Kirim ulang</button>'};
  function tick(){ clearInterval(tmr); tmr=setInterval(function(){ if(secs>0){secs--; var t=A.$('#tm',root); if(t) t.innerHTML=timerHtml();} else clearInterval(tmr); },1000); }

  var toastBad=function(title,text){A.toast({kind:'error',title:title,text:text,action:'Tutup'})};
  function submit(){
    var code=digits.join('');
    if(code.length<6){
      errMsg=code?'Kode OTP harus 6 digit.':'Silakan masukkan kode OTP sebelum mengklik verifikasi.';
      toastBad('Kode OTP Belum Diisi','Silakan masukkan 6 digit kode OTP yang dikirim ke '+st.to+' sebelum melanjutkan verifikasi.');
      render(code.length); return;
    }
    if(code!==A.DEMO_OTP){
      errMsg='Kode OTP yang Anda masukkan tidak valid. Silakan coba lagi.';
      toastBad('Verifikasi Gagal','Kode OTP yang Anda masukkan tidak valid atau sudah kedaluwarsa. Silakan coba lagi atau minta kode baru.'); render(5); return;
    }
    var b=A.$('.btn--primary',root); b.disabled=true; b.innerHTML='<span class="spin"></span>Verifikasi';
    setTimeout(function(){location.href=A.APP_HOME},700);
  }
  root.addEventListener('input',function(e){
    var t=e.target; if(t.dataset.i===undefined) return;
    var i=+t.dataset.i, v=t.value.replace(/\D/g,'');
    if(v.length>1){   /* paste or autofill */
      v.slice(0,6-i).split('').forEach(function(c,k){digits[i+k]=c;}); var n=Math.min(i+v.length,5); errMsg=''; render(n); return;
    }
    digits[i]=v; t.value=v; if(errMsg){errMsg=''; var m=A.$('#oe',root); if(m) m.remove(); A.$('#otp',root).classList.remove('is-error');}
    if(v&&i<5) A.$('[data-i="'+(i+1)+'"]',root).focus();
  });
  root.addEventListener('keydown',function(e){
    var t=e.target; if(t.dataset.i===undefined) return; var i=+t.dataset.i;
    if(e.key==='Backspace'&&!t.value&&i>0){digits[i-1]=''; var p=A.$('[data-i="'+(i-1)+'"]',root); p.value=''; p.focus(); e.preventDefault();}
    else if(e.key==='ArrowLeft'&&i>0){A.$('[data-i="'+(i-1)+'"]',root).focus(); e.preventDefault();}
    else if(e.key==='ArrowRight'&&i<5){A.$('[data-i="'+(i+1)+'"]',root).focus(); e.preventDefault();}
  });
  root.addEventListener('focusin',function(e){ if(e.target.dataset&&e.target.dataset.i!==undefined) e.target.select(); });
  root.addEventListener('click',function(e){
    var t=e.target;
    if(t.closest('#bk')){e.preventDefault(); history.length>1?history.back():(location.href=st.flow==='register'?'register.html':'login.html'); return;}
    if(t.closest('#resend')){secs=30; digits=['','','','','','']; errMsg=''; render(0); tick(); A.toast({kind:'success',title:'Kode OTP Dikirim Ulang',text:'Kode baru telah dikirim ke '+st.to+'.'}); return;}
    if(t.closest('#help')) helpDialog();
  });
  root.addEventListener('submit',function(e){e.preventDefault(); submit();});

  function helpDialog(){
    var items=[
      {i:I.mail,t:'Email masuk ke folder Spam atau Junk.',b:'1. Periksa folder Spam atau Junk di kotak masuk email Anda.<br>2. Tandai email dari kami sebagai ‘Bukan Spam’.<br>3. Minta kode baru.'},
      {i:I.at,t:'Ada kesalahan ketik pada alamat email Anda.',b:'1. Pastikan alamat email Anda ditulis dengan benar di web.<br>2. Minta kode baru.'},
      {i:I.wifioff,t:'Masalah koneksi internet.',b:'1. Pastikan perangkat Anda terhubung ke internet yang aktif.<br>2. Minta kode baru.'}];
    var html='<div class="dlg__body"><span class="dlg__ic">'+I.circlecheck+'</span><div><h2 class="dlg__t" id="dlgT">Kode OTP tidak diterima.</h2><p class="dlg__d">Anda mungkin mengalami salah satu dari hal berikut:</p></div><div class="stack">'+
      items.map(function(x,k){return '<div class="acc'+(k===0?' is-open':'')+'"><button class="acc__h" type="button" aria-expanded="'+(k===0)+'" aria-controls="ac'+k+'">'+x.i+'<span>'+x.t+'</span><i class="chev">'+I.chev+'</i></button><div class="acc__b" id="ac'+k+'"><div><div class="acc__c"><p>Cara mengatasinya:</p><p>'+x.b+'</p></div></div></div></div>'}).join('')+'</div></div>'+
      '<div class="dlg__f"><button class="btn btn--primary" type="button" data-close data-autofocus>Tutup</button></div>';
    var dg=A.dialog({html:html});
    dg.el.addEventListener('click',function(e){
      var h=e.target.closest('.acc__h'); if(!h) return; var a=h.parentNode, on=!a.classList.contains('is-open'); a.classList.toggle('is-open',on); h.setAttribute('aria-expanded',on);
    });
  }
  render(0); tick();
})();
