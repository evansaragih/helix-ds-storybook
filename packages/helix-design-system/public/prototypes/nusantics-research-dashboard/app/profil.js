/* Akun & Profil (profil.html) — profile hero, affiliation list, login access, plus every dialog/sheet from Figma "Akun & Profil".
   Query: ?open=edit|foto|buat|detail|detail-member|undang|alert-role|alert-email|alert-hapus|simpan|hapus-jabatan|edit-jabatan|batal-undangan
          &menu=akses|invite|jabatan|jabitem · ?err=1 (show validation errors) · ?sim=net|sys (simulate a failed request)
   Indonesian only (the shell's language button is hidden). All people and data are synthetic. */
(function(){
  var $=function(s,r){return (r||document).querySelector(s)};
  var esc=function(x){return String(x==null?'':x).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
  var Q=function(k){var m=location.search.match(new RegExp('[?&]'+k+'=([^&]*)')); return m?decodeURIComponent(m[1]):null};
  var SIM=Q('sim');

  /* ───────── Icons ───────── */
  var P={
    users:'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
    user:'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    camera:'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    edit:'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z',
    eye:'M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
    mail:'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6',
    phone:'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM12 18h.01',
    trash:'M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6',
    gear:'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z',
    check:'m5 12.5 4.5 4.5L19 7.5', plus:'M12 5v14M5 12h14', down:'m6 9 6 6 6-6', x:'M18 6 6 18M6 6l12 12', arrow:'M5 12h14M13 6l6 6-6 6',
    info:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 11v5M12 8h.01',
    warn:'M12 3 2 21h20L12 3zM12 10v5M12 18h.01',
    play:'M6 4l14 8-14 8z',
    coins:'M12 8c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3zM4 5v4c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 9v4c0 1.7 3.6 3 8 3s8-1.3 8-3V9M4 13v4c0 1.7 3.6 3 8 3s8-1.3 8-3v-4',
    dots:'M12 5h.01M12 12h.01M12 19h.01'
  };
  var ico=function(n,c){return '<svg class="pf-i'+(c?' '+c:'')+'" viewBox="0 0 24 24" aria-hidden="true"><path d="'+P[n]+'"/></svg>'};
  var solid=function(ok){return '<svg class="pf-si" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/>'+(ok?'<path d="m7.5 12.5 3 3 6-6.5" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="m8.5 8.5 7 7M15.5 8.5l-7 7" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>')+'</svg>'};

  /* ───────── Mock data ───────── */
  var S={
    profile:{first:'dr. Andi',last:'Gunawan',gender:'Laki-laki',age:26,addr:'Depok, Jawa Barat, Indonesia',
      bio:'Meneliti, menganalisis, dan mencipta solusi berbasis sains. Meneliti, menganalisis, dan mencipta solusi berbasis sains.Meneliti, menganalisis, dan mencipta solusi berbasis sains.',
      orcid:'0000-1111-2222-3333',scholar:'https://www.google.com',linkedin:'https://www.linkedin.com'},
    photo:null,
    groups:[
      {inst:'Institut Teknologi Bandung',type:'Universitas',items:[
        {id:'g1',name:'Genetika dan Bioteknologi Molekuler',code:'DIV-GBM-01',role:'Lead',pos:'Dosen',active:true,mine:true},
        {id:'g2',name:'Agroteknologi dan Teknologi Bioproduk',code:'DIV-GBM-01',role:'Member',pos:'Jabatan Anda'},
        {id:'g3',name:'Study Group Prof. Budi - Bioteknologi Molekuler',code:'DIV-GBM-01',role:'Member',pos:'Jabatan Anda'},
        {id:'g4',name:'Bioinformatika dan Genomika Komputasional',code:'DIV-GBM-01',role:'Lead',pos:'Jabatan Anda'}]},
      {inst:'Universitas Gadjah Mada',type:'Universitas',items:[
        {id:'g5',name:'Mikrobiologi Pangan dan Fermentasi',code:'DIV-GBM-01',role:'Lead',pos:'Jabatan Anda'}]}
    ],
    members:[
      {n:'dr. Andi Gunawan',e:'andi.gunawan@itb.ac.id',role:'Lead',you:true},
      {n:'Siti Rahmawati',e:'siti.rahmawati@itb.ac.id',role:'Member'},
      {n:'Budi Santoso',e:'budi.santoso@itb.ac.id',role:'Member'},
      {n:'Rina Wijaya',e:'rina.wijaya@itb.ac.id',role:'Diundang'}
    ],
    positions:['Lead','Member'],
    taken:['Agroteknologi dan Teknologi Bioproduk','Ekologi Mikroba Laut'],
    login:{email:'andigunawan@itb.ac.id',phone:'0878-8222-4576'}
  };
  var AV_COLORS=['#e0660a','#7a5c3a','#a66800','#59595a'];
  function initials(n){var p=n.replace(/^dr\.\s*/i,'').trim().split(/\s+/); return ((p[0]||'')[0]+(p[1]?p[1][0]:'')).toUpperCase()}
  function avatar(n,size,i){
    return '<span class="pf-av" style="--s:'+size+'px;background:'+AV_COLORS[(i||0)%AV_COLORS.length]+'">'+esc(initials(n))+'</span>';
  }
  function heroAvatar(){
    return S.photo?'<img class="pf-hero__photo" src="'+S.photo+'" alt="">':'<span class="pf-hero__init">'+esc(S.profile.first.trim().charAt(0).toUpperCase())+'</span>';
  }

  /* ───────── Toasts ───────── */
  var toastHost;
  function toast(kind,title,text){
    if(!toastHost){toastHost=document.createElement('div'); toastHost.className='rn-toasts'; toastHost.setAttribute('aria-live','polite'); document.body.appendChild(toastHost);}
    var el=document.createElement('div'); el.className='rn-toast rn-toast--'+kind; el.setAttribute('role',kind==='error'?'alert':'status');
    el.innerHTML='<span class="rn-toast__ic">'+solid(kind!=='error')+'</span><div class="rn-toast__tx"><b>'+esc(title)+'</b><p>'+esc(text)+'</p></div><button class="rn-toast__x" type="button" aria-label="Tutup">'+ico('x')+'</button>';
    var gone=false, close=function(){if(gone) return; gone=true; el.classList.add('is-out'); setTimeout(function(){el.remove()},200)};
    el.querySelector('.rn-toast__x').onclick=close; toastHost.appendChild(el); setTimeout(close,6500);
  }

  /* ───────── Page ───────── */
  var host=$('#pfApp'), ov=document.createElement('div'); ov.id='pfOv'; document.body.appendChild(ov);
  function tagRole(r){return '<span class="pf-tag pf-tag--blue">'+r+'</span>'}
  function groupRow(g){
    var lead=g.role==='Lead';
    return '<div class="pf-gi"><div class="pf-gi__in"><input class="pf-radio" type="radio" name="activeGroup" data-act="'+g.id+'" aria-label="Jadikan aktif: '+esc(g.name)+'"'+(g.active?' checked':'')+'>'+
      '<span class="pf-gi__tile'+(g.active?' is-on':'')+'">'+ico('users')+'</span>'+
      '<div class="pf-gi__tx"><b>'+esc(g.name)+'</b><div class="pf-gi__tags"><span class="pf-tag">'+g.code+'</span>'+tagRole(g.role)+'<span class="pf-tag pf-tag--amber">'+esc(g.pos)+'</span>'+
      '<button class="pf-link" type="button" data-detail="'+g.id+'">'+ico(lead?'edit':'eye')+(lead?'Ubah Kelompok Studi':'Lihat detail Kelompok Studi')+'</button></div></div>'+
      (g.active?'<span class="pf-tag pf-tag--brand">Aktif</span>':'')+
      '<span class="pf-stack">'+['Andi Gunawan','Siti Rahmawati','Budi Santoso'].map(function(n,i){return avatar(n,32,i)}).join('')+'</span></div></div>';
  }
  function page(){
    var p=S.profile, name=p.first+' '+p.last;
    var hero='<section class="pf-card pf-top"><div class="pf-hero"><div class="pf-hero__bar"><svg class="pf-pix" width="970" height="120" viewBox="0 0 970 120" aria-hidden="true">'+
      [[420,0,36],[440,18,22],[460,36,28],[480,60,22],[500,84,28]].map(function(r,i){return '<rect x="'+(r[0]+i*14)+'" y="'+r[1]+'" width="'+r[2]+'" height="'+r[2]+'" rx="3" fill="#fff" fill-opacity="'+(.05+i*.02)+'"/>'}).join('')+'</svg>'+
      '<h1 class="pf-hero__name">'+esc(name)+'</h1><div class="pf-hero__brand"><img src="assets/nusantics-logo.svg" alt="Nusantics" width="131" height="16"><b>Research Dashboard</b></div></div>'+
      '<div class="pf-hero__av">'+heroAvatar()+'<button class="pf-hero__cam" type="button" data-open="foto" aria-label="Ubah foto profil">'+ico('camera')+'</button></div></div>'+
      '<div class="pf-meta"><div class="pf-meta__tx"><p class="pf-meta__l">'+esc(p.gender)+' <i>•</i> '+p.age+' Tahun</p><p class="pf-meta__bio">'+esc(p.bio)+'</p></div>'+
      '<button class="pf-btn pf-btn--outline" type="button" data-open="edit">'+ico('edit')+'Edit Profil</button></div>@@STATS@@</section>';
    var stats='<section class="pf-stats"><div class="pf-stat"><span class="pf-stat__t pf-stat__t--img"><img src="assets/org-avatar.png" alt="" width="40" height="40"></span><div><b>Institut Teknologi Bandung</b><p>Genetika dan Bioteknologi Molekuler</p></div></div>'+
      '<a class="pf-stat" href="run.html"><span class="pf-stat__t">'+ico('play','fill')+'</span><div><b>Siap untuk buat sebuah Run baru?</b><p>Buat run dan lihat hasil analisis</p></div></a>'+
      '<a class="pf-stat" href="kredit.html"><span class="pf-stat__t">'+ico('coins')+'</span><div><b>169 Kredit tersisa</b><p>Total kredit digunakan 412 Kredit</p></div></a></section>';
    hero=hero.replace('@@STATS@@',stats);
    var aff='<section class="pf-card"><div class="pf-sec__h"><h2>Afiliasi Organisasi</h2><div class="pf-sec__act"><a class="pf-btn pf-btn--outline" href="#" data-help>Aturan &amp; Bantuan</a><button class="pf-btn pf-btn--primary" type="button" data-open="buat">'+ico('plus')+'Buat Kelompok Studi</button></div></div><div class="pf-sec__b">'+
      S.groups.map(function(g){return '<div class="pf-org"><div class="pf-org__h"><h3>'+esc(g.inst)+'</h3><span class="pf-tag">'+g.type+'</span></div><div class="pf-org__b">'+g.items.map(groupRow).join('')+'</div></div>'}).join('')+'</div></section>';
    var login='<section class="pf-card pf-login"><div class="pf-sec__h"><h2>Akses Login</h2></div><div class="pf-sec__b">'+
      '<div class="pf-row"><span class="pf-row__t">'+ico('mail')+'</span><div><b>Email</b><p>'+esc(S.login.email)+'</p></div><button class="pf-link pf-link--lg" type="button" data-alert="email">Ganti email Anda</button></div>'+
      '<div class="pf-row"><span class="pf-row__t">'+ico('phone')+'</span><div><b>WhatsApp</b><p>'+esc(S.login.phone)+'</p></div><button class="pf-link pf-link--lg" type="button" data-alert="phone">Ganti nomor telepon Anda</button></div>'+
      '<div class="pf-danger"><span class="pf-danger__t">'+ico('trash')+'</span><div><b>Hapus Akun Nusantics Anda?</b><p>Setelah dihapus, semua informasi akun akan hilang. Anda tidak akan dapat memulihkan informasi ini.</p></div><button class="pf-btn pf-btn--danger" type="button" data-alert="hapus">Hapus Akun Saya</button></div></div></section>';
    return '<div class="pf-scroll" id="pfScroll"><div class="pf-wrap">'+hero+aff+login+'</div></div>';
  }

  /* ───────── Overlay state ───────── */
  var O={modal:null,sheet:null,menu:null};   /* modal: {k,d}; sheet: {id,d}; menu: {k,anchor,m} */
  var lastFocus=null;
  function find(id){var r; S.groups.forEach(function(g){g.items.forEach(function(i){if(i.id===id) r=i})}); return r}

  function field(id,label,o){
    o=o||{};
    var err=o.err?'<p class="pf-err" id="'+id+'E" role="alert">'+esc(o.err)+'</p>':'';
    var tip=o.tip?'<span class="pf-tip" tabindex="0" role="img" aria-label="'+esc(o.tip)+'">'+ico('info')+'<span class="pf-tip__b" role="tooltip">'+esc(o.tip)+'</span></span>':'';
    var ctrl=o.area?'<textarea class="pf-in pf-in--area'+(o.err?' is-bad':'')+'" id="'+id+'" data-f="'+id+'" rows="4">'+esc(o.v)+'</textarea>':
      '<input class="pf-in'+(o.err?' is-bad':'')+'" id="'+id+'" data-f="'+id+'" type="text" autocomplete="off" value="'+esc(o.v)+'"'+(o.ph?' placeholder="'+esc(o.ph)+'"':'')+(o.dis?' disabled':'')+(o.err?' aria-invalid="true" aria-describedby="'+id+'E"':'')+'>';
    return '<div class="pf-fld'+(o.cls?' '+o.cls:'')+'"><label for="'+id+'">'+label+(o.req?' <i class="pf-req" aria-hidden="true">*</i>':'')+tip+'</label>'+ctrl+err+(o.hint&&!o.err?'<p class="pf-hint">'+o.hint+'</p>':'')+'</div>';
  }
  function section(title,body,right){return '<section class="pf-sc"><div class="pf-sc__h"><h3>'+title+'</h3>'+(right||'')+'</div><div class="pf-sc__b">'+body+'</div></section>'}
  function modal(o){   /* o: {w, title, sub, body, foot, id} */
    return '<div class="rn-modal pf-modal" data-scrim="modal"><div class="rn-modal__box pf-box" style="width:'+(o.w||592)+'px" role="dialog" aria-modal="true" aria-labelledby="pfMT">'+
      '<div class="pf-box__h"><div><h2 id="pfMT">'+o.title+'</h2>'+(o.sub?'<p>'+o.sub+'</p>':'')+'</div><button class="rn-modal__x" type="button" data-close="modal" aria-label="Tutup">'+ico('x')+'</button></div>'+
      '<div class="pf-box__b">'+o.body+'</div><div class="pf-box__f">'+o.foot+'</div></div></div>';
  }
  function alertBox(o){   /* o: {tone,icon,title,text,btns} */
    return '<div class="rn-modal pf-modal" data-scrim="modal"><div class="rn-modal__box pf-alert" role="alertdialog" aria-modal="true" aria-labelledby="pfMT" aria-describedby="pfMP">'+
      '<button class="pf-alert__x" type="button" data-close="modal" aria-label="Tutup">'+ico('x')+'</button>'+
      '<div class="pf-alert__b"><span class="pf-alert__ic pf-alert__ic--'+o.tone+'">'+ico(o.icon)+'</span><h2 id="pfMT">'+o.title+'</h2><p id="pfMP">'+o.text+'</p></div><div class="pf-alert__f">'+o.btns+'</div></div></div>';
  }

  /* ───────── Modals ───────── */
  function mEdit(d){
    var f=d, radio=function(v){return '<label class="pf-rc"><input type="radio" name="gender" value="'+v+'"'+(f.gender===v?' checked':'')+' data-f="gender"><span class="pf-rc__dot"></span>'+v+'</label>'};
    var main=
      '<div class="pf-2">'+field('first','Nama Depan',{req:1,v:f.first,err:d.errFirst})+field('last','Nama Belakang',{v:f.last})+'</div>'+
      '<div class="pf-fld"><label>Jenis Kelamin</label><div class="pf-2 pf-rcs">'+radio('Laki-laki')+radio('Perempuan')+'</div></div>'+
      field('addr','Alamat',{v:f.addr})+field('bio','Bio',{v:f.bio,area:1});
    var extra=field('orcid','ORCID Id',{req:1,v:f.orcid})+field('scholar','Google Scholar',{req:1,v:f.scholar})+field('linkedin','LinkedIn',{req:1,v:f.linkedin});
    return modal({title:'Edit Profil',body:section('DATA UTAMA',main)+section('DATA TAMBAHAN',extra),
      foot:'<button class="pf-btn pf-btn--ghost" type="button" data-close="modal">Batalkan</button><button class="pf-btn pf-btn--primary" type="button" data-do="saveProfile">Simpan Perubahan</button>'});
  }
  function mFoto(d){
    var img=d.src?'<img src="'+d.src+'" alt="" style="transform:scale('+(1+d.zoom/100)+')">':'<span class="pf-crop__init">'+esc(S.profile.first.trim().charAt(0).toUpperCase())+'</span>';
    var pct=d.zoom;
    return modal({title:'Edit Foto Profil',body:'<div class="pf-crop"><div class="pf-crop__c">'+img+'</div></div>'+
      '<div class="pf-zoom"><span class="pf-zoom__tip" style="left:calc('+pct+'% + '+(8-pct*.16)+'px)">'+pct+'</span><input type="range" min="0" max="100" value="'+pct+'" data-f="zoom" aria-label="Perbesar foto" style="--p:'+pct+'%"></div>'+
      '<p class="pf-p">Di Nusantics, kami meminta anggota untuk menggunakan identitas asli mereka, jadi ambil atau unggah foto diri Anda. Kemudian potong, filter, dan sesuaikan hingga sempurna.</p>'+
      '<div class="pf-btns"><label class="pf-btn pf-btn--outline pf-btn--file">'+ico('camera')+'Ubah<input id="pfFile" type="file" accept="image/*" hidden></label><button class="pf-btn pf-btn--danger" type="button" data-do="delPhoto">'+ico('trash')+'Hapus Foto Profil</button></div>',
      foot:'<button class="pf-btn pf-btn--ghost" type="button" data-close="modal">Batalkan</button><button class="pf-btn pf-btn--primary" type="button" data-do="savePhoto">Simpan Perubahan</button>',w:592});
  }
  function mBuat(d){
    var ready=d.name.trim()&&d.pos.trim();
    var body=section(d.name.trim()?esc(d.name):'Nama Kelompok Studi',
      '<div class="pf-fld"><label for="inst">Institusi <i class="pf-req" aria-hidden="true">*</i><span class="pf-tip" tabindex="0" role="img" aria-label="Anda hanya bisa membuat kelompok studi di institusi tempat Anda sudah terlibat.">'+ico('info')+'<span class="pf-tip__b" role="tooltip">Anda hanya bisa membuat kelompok studi di institusi tempat Anda sudah terlibat.</span></span></label><button class="pf-in pf-sel" id="inst" type="button" aria-haspopup="listbox"><span>Institut Teknologi Bandung (ITB)</span>'+ico('down')+'</button></div>'+
      field('bname','Nama Kelompok Studi',{req:1,v:d.name,ph:'cth. Ekologi Mikroba Laut',err:d.errName})+
      '<div class="pf-call"><span class="pf-call__ic">'+ico('info')+'</span><div><b>Gunakan nama yang jelas dan spesifik</b><p>Nama bidang riset atau nama Anda sebagai Lead. Cth. "Genetika dan Bioteknologi Molekuler" atau "Study Group Dr. Andi - Bioinformatika".</p></div></div>'+
      field('bpos','Jabatan Anda di Kelompok Studi Ini',{req:1,v:d.pos,ph:'cth. Dosen, Asisten Dosen, FAS',err:d.errPos,tip:'Jabatan atau gelar Anda sebagai Lead di kelompok studi ini, bukan jabatan Anda secara umum.'}));
    return modal({title:'Buat Kelompok Studi Baru',sub:'Anda akan menjadi Lead kelompok studi ini',body:body,
      foot:'<button class="pf-btn pf-btn--ghost" type="button" data-close="modal">Batalkan</button><button class="pf-btn pf-btn--primary" type="button" data-do="createGroup"'+(ready?'':' disabled')+'>Buat Kelompok Studi</button>'});
  }
  function mUndang(d){
    var rows=d.emails.map(function(e,i){return field('em'+i,'Email',{req:1,v:e.v,err:e.err,hint:i===0&&d.emails.length===1?'Gunakan email dengan domain institusi (contoh: @itb.ac.id)':''})}).join('');
    var add=d.emails.length<5?'<button class="pf-btn pf-btn--mini" type="button" data-do="addEmail">'+ico('plus')+'Tambah Anggota</button>':'';
    var body=section('Genetika dan Bioteknologi Molekuler',rows+'<div class="pf-2">'+field('uname','Nama Lengkap',{req:1,v:d.name,err:d.errName})+field('uphone','No. Telepon (opsional)',{v:d.phone,ph:'Contoh: 81234567890'})+'</div>',add);
    return modal({title:'Undang Anggota Baru',body:body,foot:'<button class="pf-btn pf-btn--ghost" type="button" data-close="modal">Batalkan</button><button class="pf-btn pf-btn--primary" type="button" data-do="sendInvite">Kirim Undangan</button>'});
  }
  function mJabatan(d){
    return modal({title:'Edit Jabatan',body:section('Genetika dan Bioteknologi Molekuler',field('jname','Nama Jabatan',{req:1,v:d.name,err:d.err})),
      foot:'<button class="pf-btn pf-btn--ghost" type="button" data-close="modal">Batalkan</button><button class="pf-btn pf-btn--primary" type="button" data-do="saveJabatan">Simpan</button>',w:592});
  }
  var ALERTS={
    role:{tone:'blue',icon:'info',title:'Hubungi Nusantics untuk Mengubah Role',text:'Perubahan role atau penghapusan anggota tidak dapat dilakukan sendiri saat ini. Hubungi tim Nusantics melalui WhatsApp atau Email Support di sidebar untuk mengajukan permintaan ini.'},
    email:{tone:'blue',icon:'info',title:'Hubungi Nusantics untuk Mengganti Email',text:'Perubahan email tidak dapat dilakukan sendiri saat ini. Hubungi tim Nusantics melalui WhatsApp atau Email Support di sidebar untuk mengajukan permintaan ini.'},
    phone:{tone:'blue',icon:'info',title:'Hubungi Nusantics untuk Mengganti Nomor Telepon',text:'Perubahan nomor telepon tidak dapat dilakukan sendiri saat ini. Hubungi tim Nusantics melalui WhatsApp atau Email Support di sidebar untuk mengajukan permintaan ini.'},
    hapus:{tone:'blue',icon:'info',title:'Hubungi Nusantics untuk Menghapus Akun',text:'Penghapusan akun tidak dapat dilakukan sendiri saat ini. Hubungi tim Nusantics melalui WhatsApp atau Email Support di sidebar untuk mengajukan permintaan ini.'}
  };
  function mAlert(k){var a=ALERTS[k]; return alertBox({tone:a.tone,icon:a.icon,title:a.title,text:a.text,btns:'<button class="pf-btn pf-btn--primary pf-btn--block" type="button" data-close="modal">Mengerti</button>'})}
  function mConfirm(d){
    var cfg={
      simpan:{tone:'amber',icon:'warn',title:'Simpan perubahan kelompok studi?',text:'Perubahan pada kelompok studi ini akan disimpan. Pastikan nama kelompok studi dan data anggota sudah benar sebelum melanjutkan.',no:'Batal',yes:'Ya, Simpan Perubahan',cls:'primary',act:'confirmSave'},
      hapusJab:{tone:'red',icon:'trash',title:'Hapus jabatan "'+esc(d.name||'')+'"?',text:'Jabatan ini akan dihapus dari daftar jabatan kelompok studi. Anggota yang memakai jabatan ini akan kehilangan jabatannya.',no:'Batal',yes:'Hapus Jabatan',cls:'danger',act:'confirmDelJab'},
      batal:{tone:'red',icon:'trash',title:'Batalkan undangan?',text:'Undangan untuk '+esc(d.email||'')+' akan dibatalkan dan tautan undangan tidak bisa dipakai lagi. Anda dapat mengundang kembali kapan saja.',no:'Kembali',yes:'Batalkan Undangan',cls:'danger',act:'confirmCancelInv'}
    }[d.kind];
    return alertBox({tone:cfg.tone,icon:cfg.icon,title:cfg.title,text:cfg.text,btns:'<button class="pf-btn pf-btn--ghost pf-btn--grow" type="button" data-close="modal">'+cfg.no+'</button><button class="pf-btn pf-btn--'+cfg.cls+' pf-btn--grow" type="button" data-do="'+cfg.act+'">'+cfg.yes+'</button>'});
  }

  /* ───────── Sheet: Detail Kelompok Studi ───────── */
  function sheetHtml(sh){
    var g=find(sh.id), lead=g.role==='Lead', ro=!lead;
    var chip=function(m,i){
      if(m.you) return '<span class="pf-you">Anda</span>'+tagRole('Lead');
      var open=O.menu&&O.menu.i===i;
      return '<button class="pf-chip'+(m.role==='Diundang'?' is-inv':'')+(open?' is-open':'')+'" type="button" data-menu="'+(m.role==='Diundang'?'invite':'akses')+'" data-i="'+i+'" aria-haspopup="menu" aria-expanded="'+(!!open)+'">'+m.role+ico('down')+'</button>';
    };
    var list=S.members.map(function(m,i){
      return '<div class="pf-mem'+(m.you?' is-you':'')+'">'+avatar(m.n,44,i)+'<div class="pf-mem__tx"><b>'+esc(m.n)+'</b><span>'+esc(m.e)+'</span></div>'+(ro?(m.you?'<span class="pf-you">Anda</span>':'')+tagRole(m.role==='Diundang'?'Diundang':m.role):chip(m,i))+'</div>';
    }).join('');
    var info='<div class="pf-call pf-call--sm"><span class="pf-call__ic">'+ico('info')+'</span><p>Ingin menjadikan anggota lain sebagai Lead, atau mengeluarkan seorang Lead dari kelompok studi ini? Hubungi tim Nusantics, kedua tindakan ini memerlukan bantuan langsung dari tim kami.</p></div>';
    var top=section(g.code,'<div class="pf-fld"><label for="sInst">Institusi</label><input class="pf-in" id="sInst" value="Institut Teknologi Bandung" disabled></div>'+field('sName','Nama Kelompok Studi',{req:!ro,v:sh.name,err:sh.err,dis:ro}));
    var mem='<section class="pf-sc"><div class="pf-sc__h"><h3>Daftar Anggota</h3>'+(ro?'':'<button class="pf-btn pf-btn--primary" type="button" data-open="undang">'+ico('mail')+'Undang Anggota</button>')+'</div><div class="pf-sc__b pf-sc__b--list">'+list+(ro?'':info)+'</div></section>';
    return '<div class="pf-scrim" data-scrim="sheet"><aside class="pf-sheet" role="dialog" aria-modal="true" aria-labelledby="pfST"><div class="pf-sheet__h"><h2 id="pfST">Detail Kelompok Studi</h2><button class="rn-modal__x" type="button" data-close="sheet" aria-label="Tutup">'+ico('x')+'</button></div>'+
      '<div class="pf-sheet__b">'+top+mem+'</div><div class="pf-sheet__f"><button class="pf-btn pf-btn--ghost" type="button" data-close="sheet">Tutup</button>'+(ro?'':'<button class="pf-btn pf-btn--primary" type="button" data-do="trySave">Simpan Perubahan</button>')+'</div></aside></div>';
  }

  /* ───────── Menus (popovers) ───────── */
  function mi(icon,label,act,o){o=o||{}; return '<button class="pf-mi'+(o.cls?' '+o.cls:'')+'" type="button" role="menuitem" data-do="'+act+'"'+(o.attr||'')+'>'+(icon?ico(icon):'<span class="pf-mi__sp"></span>')+'<span>'+label+'</span>'+(o.end||'')+'</button>'}
  function menuHtml(){
    var m=O.menu; if(!m) return '';
    var pop=function(cls,title,items,id){return '<div class="pf-pop '+cls+'" role="menu" id="'+id+'" data-pop><div class="pf-pop__t">'+title+'</div><div class="pf-pop__l">'+items+'</div></div>'};
    if(m.k==='invite') return pop('','Ubah Akses',mi('arrow','Kirim ulang Undangan','resend')+mi('trash','Batalkan Undangan','askCancel',{cls:'is-bad'}),'pfPop1');
    var check='<svg class="pf-i pf-mi__ck" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';
    var cur=S.members[m.i].role;
    var main=pop('','Ubah Akses',mi('user','Lead','toLead')+mi('users','Member','toMember',{end:cur==='Member'?check:''})+'<div class="pf-pop__sep"></div>'+mi('gear','Ubah Jabatan','showJab',{cls:m.jab?'is-on':''})+mi('trash','Hapus','toLead',{cls:'is-bad'}),'pfPop1');
    var jab='';
    if(m.jab){
      jab=pop('pf-pop--jab','Jabatan',S.positions.map(function(p,j){return '<div class="pf-mi pf-mi--row">'+ico(p==='Lead'?'user':'users')+'<span>'+esc(p)+'</span><button class="pf-mi__more" type="button" data-do="jabMenu" data-j="'+j+'" aria-label="Opsi jabatan '+esc(p)+'" aria-haspopup="menu">'+ico('dots')+'</button></div>'}).join('')+'<div class="pf-pop__sep"></div>'+mi('plus','Tambah Jabatan','addJab'),'pfPop2');
    }
    var jm=(m.jab&&m.jm!=null)?pop('pf-pop--jm','',mi('edit','Edit Jabatan','editJab')+mi('trash','Hapus Jabatan','askDelJab',{cls:'is-bad'}),'pfPop3').replace('<div class="pf-pop__t"></div>',''):'';
    return jab+main+jm;
  }
  function placeMenu(){
    var m=O.menu; if(!m||!m.anchor) return;
    var a=document.querySelector('[data-menu][data-i="'+m.i+'"]'); if(!a) return;
    var r=a.getBoundingClientRect(), p1=$('#pfPop1'), p2=$('#pfPop2'), p3=$('#pfPop3');
    var h1=p1.offsetHeight, top=r.bottom+6; if(top+h1>innerHeight-8) top=Math.max(8,r.top-h1-6);
    p1.style.top=top+'px'; p1.style.left=Math.min(innerWidth-p1.offsetWidth-8,r.right-p1.offsetWidth)+'px';
    if(p2){p2.style.top=(top-20)+'px'; p2.style.left=(parseFloat(p1.style.left)-p2.offsetWidth-12)+'px';}
    if(p3&&p2){var j=$('[data-j="'+m.jm+'"]',p2), jr=j?j.getBoundingClientRect():r; p3.style.top=(jr.bottom+4)+'px'; p3.style.left=(parseFloat(p2.style.left)+p2.offsetWidth-p3.offsetWidth+8)+'px';}
  }

  /* ───────── Render ───────── */
  function renderPage(){
    var sc=$('#pfScroll'), top=sc?sc.scrollTop:0; host.innerHTML=page(); var n=$('#pfScroll'); if(n) n.scrollTop=top;
  }
  function modalHtml(){
    var m=O.modal; if(!m) return '';
    return {edit:mEdit,foto:mFoto,buat:mBuat,undang:mUndang,jabatan:mJabatan,confirm:mConfirm}[m.k]?{edit:mEdit,foto:mFoto,buat:mBuat,undang:mUndang,jabatan:mJabatan,confirm:mConfirm}[m.k](m.d):mAlert(m.k.replace('alert-',''));
  }
  function renderOv(keepFocusId){
    var active=keepFocusId||(document.activeElement&&document.activeElement.id)||'';
    var ss=$('.pf-sheet__b'), st=ss?ss.scrollTop:0, bb=$('.pf-box__b'), bt=bb?bb.scrollTop:0;
    ov.innerHTML=(O.sheet?sheetHtml(O.sheet):'')+modalHtml()+menuHtml();
    var s2=$('.pf-sheet__b'); if(s2) s2.scrollTop=st; var b2=$('.pf-box__b'); if(b2) b2.scrollTop=bt;
    if(O.menu) placeMenu();
    if(active){var el=document.getElementById(active); if(el&&el.focus){el.focus(); if(el.setSelectionRange&&/text|search/.test(el.type||'')){try{el.setSelectionRange(el.value.length,el.value.length)}catch(e){}}}}
  }
  function focusFirst(){var el=$('.pf-box [data-f]:not([disabled])')||$('.pf-alert .pf-btn')||$('.pf-sheet [data-close]'); if(el) el.focus();}

  function openModal(k,d,opener){lastFocus=opener||document.activeElement; O.modal={k:k,d:d}; O.menu=null; renderOv(); focusFirst();}
  function closeLayer(layer){
    var sel=layer==='modal'?'.pf-modal':'.pf-scrim'; var el=$(sel);
    var done=function(){O[layer]=null; if(layer==='sheet') O.menu=null; renderOv(); var lf=lastFocus; if(!O.modal&&!O.sheet&&lf&&document.body.contains(lf)) lf.focus(); else if(layer==='modal'&&O.sheet){var x=$('.pf-sheet [data-close]'); if(x) x.focus();}};
    if(el){el.classList.add('is-leaving'); setTimeout(done,170)} else done();
  }
  function openSheet(id,opener){var g=find(id); lastFocus=opener||document.activeElement; O.sheet={id:id,name:g.name,err:null}; renderOv(); var x=$('.pf-sheet [data-close]'); if(x) x.focus();}

  /* ───────── Data actions ───────── */
  function readInputs(){   /* pull current input values into state before any re-render */
    var m=O.modal, d=m&&m.d, v=function(id){var e=document.getElementById(id); return e?e.value:undefined};
    if(m){
      if(m.k==='edit'){['first','last','addr','bio','orcid','scholar','linkedin'].forEach(function(k){if(v(k)!==undefined) d[k]=v(k)}); var g=$('input[name=gender]:checked'); if(g) d.gender=g.value;}
      if(m.k==='buat'){if(v('bname')!==undefined) d.name=v('bname'); if(v('bpos')!==undefined) d.pos=v('bpos');}
      if(m.k==='undang'){d.emails.forEach(function(e,i){if(v('em'+i)!==undefined) e.v=v('em'+i)}); if(v('uname')!==undefined) d.name=v('uname'); if(v('uphone')!==undefined) d.phone=v('uphone');}
      if(m.k==='jabatan'&&v('jname')!==undefined) d.name=v('jname');
    }
    if(O.sheet&&v('sName')!==undefined) O.sheet.name=v('sName');
  }
  function fail(kind,title,text){toast('error',title,text)}
  var A={
    saveProfile:function(){
      readInputs(); var d=O.modal.d;
      if(!d.first.trim()){d.errFirst='Nama depan wajib diisi'; renderOv('first'); return;}
      Object.assign(S.profile,{first:d.first.trim(),last:d.last.trim(),gender:d.gender,addr:d.addr,bio:d.bio,orcid:d.orcid,scholar:d.scholar,linkedin:d.linkedin});
      closeLayer('modal'); renderPage(); toast('success','Profil berhasil diperbarui','Perubahan data profil Anda telah disimpan.');
    },
    savePhoto:function(){
      var d=O.modal.d;
      if(SIM==='sys'){return fail('error','Foto profil gagal disimpan','Terjadi kesalahan pada sistem kami. Coba lagi dalam beberapa saat.');}
      S.photo=d.removed?null:(d.src||S.photo); closeLayer('modal'); renderPage(); toast('success','Foto profil berhasil diperbarui','Foto profil Anda telah diperbarui.');
    },
    delPhoto:function(){var d=O.modal.d; d.src=null; d.removed=true; renderOv(); toast('success','Foto profil berhasil dihapus','Foto profil Anda telah dihapus dan diganti dengan avatar default.');},
    createGroup:function(){
      readInputs(); var d=O.modal.d, n=d.name.trim(); d.errName=d.errPos=null;
      if(!d.pos.trim()) d.errPos='Masukkan Jabatan Anda';
      if(S.taken.concat(S.groups.reduce(function(a,g){return a.concat(g.items.map(function(i){return i.name}))},[])).some(function(x){return x.toLowerCase()===n.toLowerCase()})) d.errName='Nama Kelompok Studi sudah digunakan';
      if(d.errName||d.errPos){renderOv(d.errName?'bname':'bpos'); if(d.errName) fail('error','Nama Kelompok Studi sudah digunakan','Gunakan nama lain yang lebih spesifik untuk kelompok studi Anda.'); return;}
      if(SIM==='net') return fail('error','Gagal terhubung ke server','Periksa koneksi internet Anda, lalu coba buat kelompok studi kembali.');
      if(SIM==='sys') return fail('error','Kelompok Studi gagal dibuat','Terjadi kesalahan pada sistem kami. Coba lagi dalam beberapa saat.');
      var itb=S.groups[0]; itb.items.push({id:'g'+(Date.now()%100000),name:n,code:'DIV-GBM-0'+(itb.items.length+1),role:'Lead',pos:d.pos.trim()});
      closeLayer('modal'); renderPage(); toast('success','Kelompok Studi berhasil dibuat','"'+n+'" siap digunakan. Anda ditetapkan sebagai Lead kelompok studi ini.');
    },
    addEmail:function(){readInputs(); O.modal.d.emails.push({v:'',err:null}); renderOv('em'+(O.modal.d.emails.length-1));},
    sendInvite:function(){
      readInputs(); var d=O.modal.d, bad=false, seen={}, have=S.members.map(function(m){return m.e.toLowerCase()});
      d.errName=null;
      d.emails.forEach(function(e){
        var v=e.v.trim().toLowerCase(); e.err=null;
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) e.err='Masukkan alamat email yang valid';
        else if(have.indexOf(v)>-1) e.err=e.v.trim()+' sudah menjadi anggota kelompok studi ini.';
        else if(!/\.ac\.id$/.test(v)) e.err=e.v.trim()+' harus menggunakan domain institusi resmi.';
        else if(seen[v]) e.err='Ada email yang sama pada daftar undangan. Periksa kembali sebelum mengirim.';
        seen[v]=1; if(e.err) bad=true;
      });
      if(d.name.trim().length<3){d.errName='Nama lengkap minimal 3 karakter.'; bad=true;}
      if(bad){renderOv(); return;}
      d.emails.forEach(function(e){S.members.push({n:d.name.trim(),e:e.v.trim(),role:'Diundang'})});
      var n=d.emails.length; closeLayer('modal'); renderOv(); toast('success','Undangan berhasil dikirim',n>1?n+' undangan telah dikirim ke email anggota baru.':'Undangan telah dikirim ke '+d.emails[0].v.trim()+'.');
    },
    trySave:function(){
      readInputs(); var sh=O.sheet, g=find(sh.id), n=sh.name.trim(); sh.err=null;
      if(!n){sh.err='Nama Kelompok Studi wajib diisi'; renderOv('sName'); return;}
      if(n.toLowerCase()!==g.name.toLowerCase()&&S.taken.concat(S.groups.reduce(function(a,x){return a.concat(x.items.filter(function(i){return i!==g}).map(function(i){return i.name}))},[])).some(function(x){return x.toLowerCase()===n.toLowerCase()})){
        sh.err='Nama "'+n+'" sudah digunakan. Gunakan nama lain yang lebih spesifik.'; renderOv('sName'); fail('error','Nama Kelompok Studi gagal diubah','Nama "'+n+'" sudah digunakan. Gunakan nama lain yang lebih spesifik.'); return;
      }
      lastFocus=$('.pf-sheet__f .pf-btn--primary'); O.modal={k:'confirm',d:{kind:'simpan'}}; O.menu=null; renderOv(); focusFirst();
    },
    confirmSave:function(){
      var sh=O.sheet, g=find(sh.id), n=sh.name.trim(), renamed=n!==g.name;
      if(SIM==='sys'){closeLayer('modal'); return fail('error','Perubahan gagal disimpan','Terjadi kesalahan pada sistem kami. Coba lagi dalam beberapa saat.');}
      g.name=n; closeLayer('modal'); setTimeout(function(){closeLayer('sheet'); renderPage();},180);
      if(renamed) toast('success','Nama Kelompok Studi berhasil diubah','Kelompok studi ini sekarang bernama "'+n+'".');
      toast('success','Perubahan berhasil disimpan','Perubahan pada kelompok studi ini telah disimpan.');
    },
    resend:function(){var m=S.members[O.menu.i]; O.menu=null; renderOv(); if(SIM==='net') return fail('error','Undangan gagal dikirim ulang','Terjadi kesalahan pada sistem kami. Coba lagi dalam beberapa saat.'); toast('success','Undangan berhasil dikirim ulang','Undangan baru telah dikirim ke '+m.e+'.');},
    askCancel:function(){var m=S.members[O.menu.i]; O.cancelIdx=O.menu.i; lastFocus=document.querySelector('[data-menu][data-i="'+O.menu.i+'"]'); O.modal={k:'confirm',d:{kind:'batal',email:m.e}}; O.menu=null; renderOv(); focusFirst();},
    confirmCancelInv:function(){var m=S.members.splice(O.cancelIdx,1)[0]; closeLayer('modal'); toast('success','Undangan dibatalkan','Undangan untuk '+m.e+' telah dibatalkan.');},
    toLead:function(){lastFocus=document.querySelector('[data-menu][data-i="'+O.menu.i+'"]'); O.modal={k:'alert-role'}; O.menu=null; renderOv(); focusFirst();},
    toMember:function(){O.menu=null; renderOv();},
    showJab:function(){O.menu.jab=!O.menu.jab; O.menu.jm=null; renderOv();},
    jabMenu:function(e,b){O.menu.jm=+b.getAttribute('data-j'); renderOv();},
    addJab:function(){lastFocus=document.querySelector('[data-menu][data-i="'+O.menu.i+'"]'); O.modal={k:'jabatan',d:{name:'',idx:-1,err:null}}; O.menu=null; renderOv(); focusFirst();},
    editJab:function(){var j=O.menu.jm; lastFocus=document.querySelector('[data-menu][data-i="'+O.menu.i+'"]'); O.modal={k:'jabatan',d:{name:S.positions[j],idx:j,err:null}}; O.menu=null; renderOv(); focusFirst();},
    askDelJab:function(){var j=O.menu.jm; O.delJab=j; lastFocus=document.querySelector('[data-menu][data-i="'+O.menu.i+'"]'); O.modal={k:'confirm',d:{kind:'hapusJab',name:S.positions[j]}}; O.menu=null; renderOv(); focusFirst();},
    confirmDelJab:function(){var n=S.positions.splice(O.delJab,1)[0]; closeLayer('modal'); toast('success','Jabatan dihapus','Jabatan "'+n+'" telah dihapus dari daftar jabatan.');},
    saveJabatan:function(){
      readInputs(); var d=O.modal.d, n=d.name.trim(); d.err=null;
      if(!n) d.err='Nama jabatan wajib diisi'; else if(S.positions.some(function(p,i){return p.toLowerCase()===n.toLowerCase()&&i!==d.idx})) d.err='Nama jabatan sudah ada';
      if(d.err){renderOv('jname'); return;}
      if(d.idx>-1) S.positions[d.idx]=n; else S.positions.push(n);
      closeLayer('modal'); toast('success','Jabatan disimpan','Jabatan "'+n+'" telah disimpan.');
    }
  };

  /* ───────── Events ───────── */
  document.addEventListener('click',function(e){
    var t=e.target, b;
    if((b=t.closest('[data-do]'))){
      var act=b.getAttribute('data-do'); if(act==='jabMenu'){e.stopPropagation(); return A.jabMenu(e,b);} if(A[act]){e.preventDefault(); return A[act](e,b);}
    }
    if((b=t.closest('[data-menu]'))){
      var i=+b.getAttribute('data-i'), same=O.menu&&O.menu.i===i; O.menu=same?null:{k:b.getAttribute('data-menu'),i:i,anchor:1}; renderOv(); if(O.menu){var f=$('#pfPop1 .pf-mi'); if(f) f.focus();} return;
    }
    if(O.menu&&!t.closest('[data-pop]')){O.menu=null; renderOv();}
    if((b=t.closest('[data-close]'))) return closeLayer(b.getAttribute('data-close'));
    if(t.matches&&t.matches('[data-scrim]')) return closeLayer(t.getAttribute('data-scrim'));
    if((b=t.closest('[data-open]'))){
      var k=b.getAttribute('data-open'), p=S.profile;
      if(k==='edit') return openModal('edit',{first:p.first,last:p.last,gender:p.gender,addr:p.addr,bio:'Peneliti mikrobioma usus manusia, fokus pada gut-brain axis dan pengaruhnya terhadap kesehatan metabolik.',orcid:p.orcid,scholar:p.scholar,linkedin:p.linkedin},b);
      if(k==='foto') return openModal('foto',{src:S.photo,zoom:50,removed:false},b);
      if(k==='buat') return openModal('buat',{name:'',pos:''},b);
      if(k==='undang') return openModal('undang',{emails:[{v:'',err:null}],name:'',phone:'',errName:null},b);
    }
    if((b=t.closest('[data-detail]'))) return openSheet(b.getAttribute('data-detail'),b);
    if((b=t.closest('[data-alert]'))) return openModal('alert-'+b.getAttribute('data-alert'),null,b);
    if((b=t.closest('[data-act]'))){var id=b.getAttribute('data-act'); S.groups.forEach(function(g){g.items.forEach(function(i){i.active=i.id===id})}); renderPage(); var r=$('[data-act="'+id+'"]'); if(r) r.focus(); return;}
    if(t.closest('[data-help]')) e.preventDefault();
  });
  document.addEventListener('input',function(e){
    var t=e.target;
    if(t.id==='pfFile') return;
    if(t.getAttribute&&t.getAttribute('data-f')==='zoom'){O.modal.d.zoom=+t.value; var tip=$('.pf-zoom__tip'); if(tip){tip.textContent=t.value; tip.style.left='calc('+t.value+'% + '+(8-t.value*.16)+'px)';} t.style.setProperty('--p',t.value+'%'); var im=$('.pf-crop__c img'); if(im) im.style.transform='scale('+(1+t.value/100)+')'; return;}
    if(O.modal&&O.modal.k==='buat'&&(t.id==='bname'||t.id==='bpos')){
      readInputs(); var d=O.modal.d; var go=$('[data-do=createGroup]'); if(go) go.disabled=!(d.name.trim()&&d.pos.trim());
      var hd=$('.pf-sc__h h3'); if(hd&&t.id==='bname') hd.textContent=d.name.trim()||'Nama Kelompok Studi';
      if(t.id==='bname'&&d.errName){d.errName=null; t.classList.remove('is-bad'); var er=$('#bnameE'); if(er) er.remove();}
    }
    if(t.classList&&t.classList.contains('is-bad')){t.classList.remove('is-bad'); var er2=document.getElementById(t.id+'E'); if(er2) er2.remove();}
  });
  document.addEventListener('change',function(e){
    var t=e.target;
    if(t.id==='pfFile'&&t.files&&t.files[0]){
      var f=t.files[0];
      if(!/^image\/(jpeg|png)$/.test(f.type)){t.value=''; return fail('error','Format file tidak didukung','Gunakan file berformat JPG atau PNG.');}
      if(f.size>5*1024*1024){t.value=''; return fail('error','Ukuran file terlalu besar','Ukuran maksimal foto profil adalah 5MB.');}
      var rd=new FileReader(); rd.onload=function(){O.modal.d.src=rd.result; O.modal.d.removed=false; renderOv();}; rd.readAsDataURL(f);
    }
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){
      if(O.menu&&O.menu.jm!=null){O.menu.jm=null; renderOv(); e.preventDefault(); return;}
      if(O.menu){var a=document.querySelector('[data-menu][data-i="'+O.menu.i+'"]'); O.menu=null; renderOv(); if(a) a.focus(); e.preventDefault(); return;}
      if(O.modal){closeLayer('modal'); e.preventDefault(); return;}
      if(O.sheet){closeLayer('sheet'); e.preventDefault(); return;}
    }
    if(e.key==='Tab'){   /* keep focus inside the topmost layer */
      var root=O.modal?$('.pf-modal'):(O.sheet?$('.pf-sheet'):null); if(!root) return;
      var els=[].slice.call(root.querySelectorAll('button,[href],input:not([type=hidden]),textarea,select,[tabindex]:not([tabindex="-1"])')).filter(function(x){return !x.disabled&&x.offsetParent!==null});
      if(!els.length) return; var first=els[0], last=els[els.length-1];
      if(!root.contains(document.activeElement)){first.focus(); e.preventDefault();}
      else if(e.shiftKey&&document.activeElement===first){last.focus(); e.preventDefault();}
      else if(!e.shiftKey&&document.activeElement===last){first.focus(); e.preventDefault();}
    }
    if(e.key==='Enter'&&O.modal&&e.target.tagName==='INPUT'&&e.target.type==='text'){
      var go=$('.pf-box__f .pf-btn--primary:not([disabled])'); if(go){e.preventDefault(); go.click();}
    }
  });
  window.addEventListener('resize',function(){if(O.menu) placeMenu()});

  /* ───────── Boot ───────── */
  document.title='Nusantics – Profil';
  renderPage();
  (function(){
    var o=Q('open'); if(!o) return;
    var err=Q('err'), p=S.profile;
    var b=document.body;
    setTimeout(function(){
      if(o==='edit') {openModal('edit',{first:p.first,last:p.last,gender:p.gender,addr:p.addr,bio:'Peneliti mikrobioma usus manusia, fokus pada gut-brain axis dan pengaruhnya terhadap kesehatan metabolik.',orcid:p.orcid,scholar:p.scholar,linkedin:p.linkedin});}
      else if(o==='foto') openModal('foto',{src:null,zoom:50,removed:false});
      else if(o==='buat') openModal('buat',err?{name:'Ekologi Mikroba Laut',pos:'',errName:'Nama Kelompok Studi sudah digunakan',errPos:'Masukkan Jabatan Anda'}:{name:'',pos:''});
      else if(o==='undang') openModal('undang',err?{emails:[{v:'evan@itb.ac.id',err:'evan@itb.ac.id sudah menjadi anggota kelompok studi ini.'},{v:'evan@gmail.com',err:'evan@gmail.com harus menggunakan domain institusi resmi.'},{v:'evan@ugm.ac.id',err:'Ada email yang sama pada daftar undangan. Periksa kembali sebelum mengirim.'}],name:'a',phone:'',errName:'Nama lengkap minimal 3 karakter.'}:{emails:[{v:'jason@itb.ac.id',err:null}],name:'Jason',phone:'822371829',errName:null});
      else if(/^detail/.test(o)){openSheet(o==='detail-member'?'g2':'g1'); if(err) {O.sheet.err='Nama "Genetika dan Bioteknologi Molekuler" sudah digunakan. Gunakan nama lain yang lebih spesifik.'; renderOv();}}
      else if(/^alert-/.test(o)) {if(o==='alert-role'){openSheet('g1');} openModal(o,null);}
      else if(o==='simpan'){openSheet('g1'); A.trySave();}
      else if(o==='batal-undangan'){openSheet('g1'); O.cancelIdx=3; openModal('confirm',{kind:'batal',email:'rina.wijaya@itb.ac.id'});}
      else if(o==='hapus-jabatan'){openSheet('g1'); O.delJab=1; openModal('confirm',{kind:'hapusJab',name:'Member'});}
      else if(o==='edit-jabatan'){openSheet('g1'); openModal('jabatan',{name:'Member',idx:1,err:null});}
      var mn=Q('menu');
      if(mn&&O.sheet){var i=mn==='invite'?3:1; O.menu={k:mn==='invite'?'invite':'akses',i:i,anchor:1}; if(mn==='jabatan'||mn==='jabitem'){O.menu.jab=true;} if(mn==='jabitem') O.menu.jm=1; renderOv();}
    },60);
  })();
})();
