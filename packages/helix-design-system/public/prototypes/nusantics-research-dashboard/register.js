(function(){
  var A=Auth, I=A.I, root=A.$('#root');
  var d=A.store.get('regdata')||{}; var seed=A.store.get('reg')||{};
  var S={step:1, email:d.email||seed.email||'', inst:d.inst||'', instNew:!!d.instNew, group:d.group||'', first:d.first||'', last:d.last||'', phone:d.phone||'', file:'', err:{}, open:false, q:''};
  var save=function(){A.store.set('regdata',{email:S.email,inst:S.inst,instNew:S.instNew,group:S.group,first:S.first,last:S.last,phone:S.phone})};
  var DUP='811111111111';
  var tip=function(t){return '<span class="tip" tabindex="0" role="img" aria-label="'+A.esc(t)+'">'+I.info+'<span class="tip__b" role="tooltip">'+A.esc(t)+'</span></span>'};
  var domOf=function(e){return (e.split('@')[1]||'').toLowerCase()};
  var instByDomain=function(e){var x=domOf(e); return A.INSTITUTIONS.filter(function(i){return i.d===x})[0]};

  function stepper(){
    var n=S.step, c=function(i){return i<n?'is-done':i===n?'is-now':''};
    var dot=function(i){return '<span class="dot '+c(i)+'">'+(i<n?I.check:i)+'</span>'};
    return '<div class="steps" aria-label="Langkah '+n+' dari 3"><div class="steps__row">'+dot(1)+'<i></i>'+dot(2)+'<i></i>'+dot(3)+'</div><div class="steps__lbl"><span>Institusi dan<br>Kelompok Studi</span><span>Data Diri Anda</span><span>Review Data</span></div></div>';
  }
  function fld(id,label,req,tooltip,inner,msg,hint){
    return '<div class="field"><label for="'+id+'">'+label+(req?' <span class="req" aria-hidden="true">*</span>':'')+(tooltip?' '+tip(tooltip):'')+'</label>'+inner+(msg?'<p class="err" id="'+id+'-e" role="alert">'+A.esc(msg)+'</p>':(hint?'<p class="hint">'+hint+'</p>':''))+'</div>';
  }
  var box=function(id,inner,bad,dis){return '<div class="box'+(bad?' is-error':'')+(dis?' is-disabled':'')+'">'+inner+'</div>'};
  var inp=function(id,ph,v,bad,extra){return '<input id="'+id+'" name="'+id+'" placeholder="'+ph+'" value="'+A.esc(v)+'" autocomplete="off"'+(bad?' aria-invalid="true" aria-describedby="'+id+'-e"':'')+(extra||'')+'>'};
  var upload=function(){return '<div class="field"><span class="lbl" id="kl">Aktivasi Kit BiomeSeq (optional)</span><div class="file">'+I.cloud+'<span id="fn">'+(S.file?A.esc(S.file):'No file chosen')+'</span><label class="btn" style="cursor:pointer">Browse<input class="sr" id="kit" type="file" accept="image/*,.pdf" aria-labelledby="kl"></label></div></div>'};

  function body1(){
    var e=S.err, picked=S.inst;
    var list=A.INSTITUTIONS.filter(function(i){return !S.q||i.n.toLowerCase().indexOf(S.q.toLowerCase())>-1});
    var exact=A.INSTITUTIONS.some(function(i){return i.n.toLowerCase()===S.q.trim().toLowerCase()});
    var opts=list.map(function(i){return '<button type="button" class="cb__o'+(i.n===picked?' is-on':'')+'" role="option" aria-selected="'+(i.n===picked)+'" data-inst="'+A.esc(i.n)+'">'+A.esc(i.n)+'</button>'}).join('')+
      (S.q.trim()&&!exact?'<button type="button" class="cb__o cb__o--new" role="option" data-new="'+A.esc(S.q.trim())+'">Daftarkan “'+A.esc(S.q.trim())+'” sebagai institusi baru</button>':'')+
      (!list.length&&!S.q.trim()?'<div class="cb__o ph">Tidak ada institusi</div>':'');
    return fld('email','Email Institusional',1,'Gunakan email institusi Anda (.ac.id, .go.id, .or.id)',box('email',inp('email','nama@institusi.ac.id',S.email,e.email,' type="email" inputmode="email"'),e.email),e.email)+
      fld('instb','Nama Institusi',1,'Pilih dari daftar atau ketik nama baru untuk mendaftarkan institusi Anda',
        '<div class="cb'+(S.open?' is-open':'')+'" id="cb">'+box('instb','<button class="cb__t" id="instb" type="button" aria-haspopup="listbox" aria-expanded="'+S.open+'"'+(e.inst?' aria-invalid="true"':'')+'><span class="'+(picked?'':'ph')+'">'+(A.esc(picked)||'Cari nama institusi...')+'</span>'+I.chev+'</button>',e.inst)+
        '<div class="cb__p" '+(S.open?'':'hidden')+'><div class="cb__s">'+I.search+'<input id="q" placeholder="Cari nama institusi..." aria-label="Cari nama institusi" value="'+A.esc(S.q)+'" autocomplete="off"></div><div class="cb__l" role="listbox">'+opts+'</div></div></div>',e.inst)+
      fld('group','Kelompok Studi (Study Group)',1,'Anda dapat membuat kelompok studi baru di sini. Gunakan nama yang jelas dan spesifik, mis. nama bidang riset atau nama dosen pembimbing.',
        box('group',inp('group','Nama kelompok studi',S.group,e.group,picked?'':' disabled'),e.group,!picked),e.group)+
      upload();
  }
  function body2(){
    var e=S.err;
    return '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'+
      fld('first','Nama Depan',1,'',box('first',inp('first','Nama depan',S.first,e.first,' autocomplete="given-name"'),e.first),e.first)+
      fld('last','Nama Belakang',0,'',box('last',inp('last','Nama belakang',S.last,0,' autocomplete="family-name"'),0))+'</div>'+
      fld('phone','No. Telepon',1,'',box('phone','<span class="pre">+62</span>'+inp('phone','8xx xxxx xxxx',S.phone,e.phone,' type="tel" inputmode="tel"'),e.phone),e.phone,'Silakan gunakan nomor telepon Anda yang aktif.')+upload();
  }
  function body3(){
    return '<section class="sum" aria-labelledby="st"><h2 id="st">Ringkasan Pendaftaran</h2><dl><div><dt>Email Institusional</dt><dd>'+A.esc(S.email)+'</dd></div><div><dt>Nama Institusi</dt><dd>'+A.esc(S.inst)+'</dd></div><div><dt>Kelompok Studi</dt><dd>'+A.esc(S.group)+'</dd></div>'+
      '<div class="two"><div><dt>Nama Depan</dt><dd>'+A.esc(S.first)+'</dd></div><div><dt>Nama Belakang</dt><dd>'+(A.esc(S.last)||'-')+'</dd></div></div><div><dt>No. Telepon</dt><dd>+62'+A.esc(A.normPhone(S.phone))+'</dd></div></dl></section>';
  }
  function render(focus){
    var cta=['','Lanjut Isi Data Diri','Lanjut Review Data','Buat Akun & Verifikasi'][S.step];
    root.className='form form--tight'; root.style.gap='12px';
    root.innerHTML='<a class="back" href="#" id="bk">'+I.back+'Kembali</a>'+
      '<header class="head head--dark"><h1>Pendaftaran Akun</h1><p>Daftarkan diri dan buat kelompok studi baru di institusi Anda! Setelah terdaftar, minta Lead kelompok untuk mengundang, jadi tidak perlu mendaftar ulang.</p></header>'+
      stepper()+'<form class="stack" id="f" novalidate>'+[0,body1,body2,body3][S.step]()+'<button class="btn btn--primary" type="submit" style="margin-top:0">'+cta.replace('&','&amp;')+'</button>'+(S.step>1?'<p class="note">*OTP verifikasi akan dikirimkan ke email yang tertera di atas</p>':'')+'</form>';
    if(focus){var f=A.$(focus,root); if(f){f.focus(); try{f.setSelectionRange(f.value.length,f.value.length)}catch(x){}}}
  }

  /* ── validation ── */
  function checkDomain(){   /* email domain must belong to the chosen (existing) institution */
    var m=instByDomain(S.email);
    if(m&&S.inst&&!S.instNew&&m.n!==S.inst){ A.toast({kind:'error',title:'Domain Email Tidak Sesuai Institusi',text:'Email Anda (@'+domOf(S.email)+') terdaftar untuk '+m.n+', bukan “'+S.inst+'”. Pilih institusi yang sesuai atau gunakan email institusional yang benar.'}); return false; }
    if(m&&S.inst&&S.instNew){ A.toast({kind:'error',title:'Domain Email Tidak Sesuai Institusi',text:'Email Anda (@'+domOf(S.email)+') terdaftar untuk '+m.n+', bukan “'+S.inst+'”. Pilih institusi yang sesuai atau gunakan email institusional yang benar.'}); return false; }
    return true;
  }
  function v1(){
    var e={};
    if(!S.email.trim()) e.email='Email institusi wajib diisi'; else if(!A.okEmail(S.email)||!A.instEmail(S.email)) e.email='Gunakan email institusi Anda (.ac.id, .go.id, .or.id).';
    if(!S.inst) e.inst='Nama institusi wajib diisi';
    if(S.inst&&!S.group.trim()) e.group='Nama kelompok studi wajib diisi';
    S.err=e; if(!Object.keys(e).length&&!checkDomain()){S.err={email:' '}; }
    return !Object.keys(S.err).length;
  }
  function v2(){
    var e={}, n=A.normPhone(S.phone);
    if(!S.first.trim()) e.first='Nama depan wajib diisi';
    if(!S.phone.trim()) e.phone='Nomor telepon wajib diisi';
    else if(!/^8\d{9,12}$/.test(n)) e.phone='Nomor telepon tidak valid. Masukkan 10–13 digit nomor aktif tanpa spasi atau simbol.';
    else if(n===DUP) e.phone='Nomor telepon ini sudah terdaftar di akun lain. Gunakan nomor lain atau masuk dengan akun yang sudah ada.';
    S.err=e; return !Object.keys(e).length;
  }

  /* ── events ── */
  root.addEventListener('input',function(e){
    var t=e.target, id=t.id;
    if(id==='q'){S.q=t.value; render(); A.$('#q',root).focus(); return;}
    if(id==='kit') return;
    if(['email','group','first','last','phone'].indexOf(id)>-1){
      S[id]=t.value; if(S.err[id]){delete S.err[id]; t.closest('.box').classList.remove('is-error'); var m=A.$('#'+id+'-e',root); if(m) m.remove();}
      if(id==='email'&&!S.inst){var hit=instByDomain(S.email); if(hit){S.inst=hit.n; S.instNew=false; render('#email');}}   /* institution detected from the domain */
      save();
    }
  });
  root.addEventListener('change',function(e){ if(e.target.id==='kit'){S.file=e.target.files[0]?e.target.files[0].name:''; A.$('#fn',root).textContent=S.file||'No file chosen';} });
  root.addEventListener('click',function(e){
    var t=e.target;
    if(t.closest('#bk')){e.preventDefault(); if(S.step>1){S.step--; S.err={}; render();} else location.href='login.html'; return;}
    if(t.closest('#instb')){S.open=!S.open; S.q=''; render(S.open?'#q':'#instb'); return;}
    var o=t.closest('[data-inst]'), nw=t.closest('[data-new]');
    if(o){S.inst=o.dataset.inst; S.instNew=false; S.open=false; delete S.err.inst; save(); render('#instb'); return;}
    if(nw){S.inst=nw.dataset.new; S.instNew=true; S.open=false; delete S.err.inst; save(); render('#group');
      A.toast({kind:'success',title:'Institusi Baru Berhasil Didaftarkan',text:'“'+S.inst+'” telah berhasil didaftarkan. Anda bisa lanjutkan mendaftarkan kelompok studi Anda di institusi ini.'}); return;}
    if(S.open&&!t.closest('#cb')){S.open=false; render();}
  });
  root.addEventListener('keydown',function(e){ if(e.key==='Escape'&&S.open){S.open=false; render('#instb');} });
  root.addEventListener('submit',function(e){
    e.preventDefault();
    if(S.step===1){ if(!v1()){render(); var f=A.$('.is-error input,.is-error button',root); if(f) f.focus(); return;} S.step=2; S.err={}; save(); render(); }
    else if(S.step===2){ if(!v2()){render(); var g=A.$('.is-error input',root); if(g) g.focus(); return;} S.step=3; save(); render(); }
    else verifyDialog();
  });

  function verifyDialog(){
    var via='wa', wa='0812-xxxx-x'+A.normPhone(S.phone).slice(-2);
    var html='<div class="dlg__body"><span class="dlg__ic">'+I.circlecheck+'</span><div><h2 class="dlg__t" id="dlgT">Pilih Metode Verifikasi</h2><p class="dlg__d">Kode OTP 6-digit akan dikirimkan ke kontak yang Anda pilih.</p></div>'+
      '<div role="radiogroup" aria-label="Metode verifikasi" class="stack" style="gap:12px">'+
      '<button class="opt is-on" type="button" role="radio" aria-checked="true" data-via="wa"><span class="opt__in"><span class="opt__tile">'+I.wa+'</span><span class="opt__tx"><b>WhatsApp</b><span>Kirim ke nomor '+A.esc(wa)+'</span></span><span class="radio"></span></span></button>'+
      '<button class="opt" type="button" role="radio" aria-checked="false" data-via="email"><span class="opt__in"><span class="opt__tile opt__tile--dark">'+I.mail+'</span><span class="opt__tx"><b>Email</b><span>Kirim ke email institusional Anda</span></span><span class="radio"></span></span></button></div></div>'+
      '<div class="dlg__f"><button class="btn btn--quiet" type="button" data-close>Batal</button><button class="btn btn--primary" type="button" id="send" data-autofocus>Kirim Kode OTP</button></div>';
    var dg=A.dialog({html:html});
    dg.el.addEventListener('click',function(e){
      var o=e.target.closest('[data-via]');
      if(o){via=o.dataset.via; [].forEach.call(dg.el.querySelectorAll('.opt'),function(x){var on=x===o; x.classList.toggle('is-on',on); x.setAttribute('aria-checked',on);}); return;}
      if(e.target.closest('#send')){
        A.store.set('otp',{flow:'register',via:via,to:via==='wa'?'+62'+A.normPhone(S.phone):S.email.toLowerCase()});
        location.href='otp.html';
      }
    });
  }
  render();
})();
