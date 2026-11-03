/* Kredit page (kredit.html) — balance hero, redeem SKU, credit history, transaction detail sheet, help accordions.
   Query: ?role=member (Lead-only lock) · ?panel=need|how|none · ?page=N · ?detail=deduksi|redeem|system · ?error=invalid|used · ?credit=N
   Shared with the Run page: localStorage "nusantics-credit-v2" (balance), sessionStorage "nrd-role". Language follows the shell. */
(function(){
  var $=function(s,r){return (r||document).querySelector(s)};
  var esc=function(x){return String(x).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
  var Q=function(k){var m=location.search.match(new RegExp('[?&]'+k+'=([^&]*)')); return m?decodeURIComponent(m[1]):null};
  var CREDIT_KEY='nusantics-credit-v2', TOTAL_PAGES=10, PER=10;

  var TX={
    id:{
      page:'Kredit',study:'Kelompok Studi',studyName:'Genetika dan Bioteknologi Molekuler',
      saldo:'Saldo Kredit',left:function(n){return n+' kredit tersisa'},enough:function(n){return n>0?'Cukup untuk menganalisis hingga '+n+' sampel':'Belum ada kredit. Redeem kode SKU untuk menambah kredit.'},
      rT:'Redeem Kode Kit BiomeSeq',rS:'Punya kit baru? Masukkan kodenya di bawah ini.',sku:'Kode SKU BiomeSeq',skuTip:'Setiap kode hanya bisa digunakan satu kali. BiomeSeq 48 reaksi = 48 kredit.',skuPh:'BSQ-XXXX-XXXX-XXXX',validate:'Validasi dan tambah',
      eInvalid:'Kode SKU tidak ditemukan. Periksa kembali kode pada kemasan kit BiomeSeq Anda.',eUsed:'Kode ini sudah pernah digunakan. Setiap kode hanya bisa digunakan satu kali.',eEmpty:'Masukkan kode SKU terlebih dahulu.',
      tInvalid:'Kode SKU tidak valid',tInvalidP:'Kode yang Anda masukkan tidak ditemukan. Periksa kembali dan coba lagi.',tUsed:'Kode SKU sudah digunakan',tUsedP:'Kode ini sudah pernah ditukarkan dan tidak bisa dipakai lagi.',tOk:'Kode SKU berhasil ditukarkan',tOkP:function(n){return n+' kredit telah ditambahkan ke akun Anda.'},
      leadT:'Hanya Lead yang Dapat Reedem Kit atau Top-up Kredit',leadD:'Kelompok studi Anda memerlukan persetujuan Lead untuk Redeem Kit atau Top-up Kredit. Hubungi Lead Anda.',leadRole:'Lead • Genetika dan Bioteknologi Molekuler',contact:'Hubungi',contactT:'Pesan dikirim ke dr. Andi Gunawan',contactP:'Lead Anda akan menghubungi Anda segera.',
      hist:'Riwayat Kredit',histS:'Redeem dan pemakaian kredit di Genetika dan Bioteknologi Molekuler',
      cDate:'Tanggal',cType:'Jenis',cDesc:'Deskripsi',cRef:'Referensi',detail:'Lihat detail transaksi',
      deduksi:'Deduksi',system:'System',redeem:'Redeem',
      page_:function(p,n){return 'Page '+p+' of '+n},goPage:'Loncat ke halaman',prev:'Previous',next:'Next',pageNav:'Navigasi halaman',goN:function(n){return 'Halaman '+n},
      needT:'Butuh Kredit Tambahan?',n1:'Hubungi Tim Nusantics',n1d:'Klik tombol WhatsApp di bawah. Pesan sudah diisi otomatis dengan info akun Anda.',n2:'Terima Invoice',n2d:'Tim kami kirim invoice resmi. Pembayaran via transfer bank.',n3:'Kredit Ditambahkan',n3d:'Tim kami kirim invoice resmi. Pembayaran via transfer bank.',wa:'Hubungi via WhatsApp',
      howT:'Cara Kerja Kredit',h1:'1 Kredit = 1 Sampel Dianalisis',h1d:'Satu kredit mencakup seluruh analisis untuk satu sampel. Kredit dipotong saat konfirmasi analisis bukan saat upload.',h2:'Kredit Dipotong Saat Konfirmasi',h2d:'Pemotongan hanya terjadi saat Anda menekan konfirmasi analisis hanya untuk sampel yang lolos validasi.',h3:'Kredit dari Kit BiomeSeq',h3d:'Setiap kit BiomeSeq yang dibeli datang dengan kode SKU unik. Redeem kode tersebut untuk menambah kredit ke akun Anda.',h4:'Kredit Tidak Kedaluwarsa',h4d:'Kredit yang sudah ditambahkan ke akun tidak memiliki batas waktu.',
      sT:'Detail Transaksi Kredit',close:'Tutup',saldoAfter:function(n){return 'Saldo: '+n+' kredit'},
      relRun:'Run Terkait',info:'Keterangan',runTitle:'Praktikum Mikrobiologi — Semester Ganjil 2026',runMeta:'RUN-2026-0022 • dr. Andi Gunawan • 27 Sampel • 20 jam yang lalu',
      dt:'Tanggal & Waktu',type:'Jenis',desc:'Deskripsi',ref:'Referensi',amount:'Jumlah',after:'Saldo Setelah Transaksi',by:'Dilakukan Oleh',skuLbl:'Kode SKU BiomeSeq',skuHint:'Sertakan saat menghubungi support',copy:'Salin kode',copied:'Kode disalin',
      adjT:'Penyesuaian kredit oleh Tim Nusantics',adjS:'Manual adjustment',adjD:'Penyesuaian kredit oleh tim Nusantics',
      kredit:function(n){return n+' kredit'},sampel:function(n){return n+' sampel'}
    },
    en:{
      page:'Credit',study:'Study Group',studyName:'Genetics and Molecular Biotechnology',
      saldo:'Credit Balance',left:function(n){return n+' credits left'},enough:function(n){return n>0?'Enough to analyse up to '+n+' samples':'No credits yet. Redeem an SKU code to add credits.'},
      rT:'Redeem BiomeSeq Kit Code',rS:'Got a new kit? Enter its code below.',sku:'BiomeSeq SKU code',skuTip:'Each code can only be used once. BiomeSeq 48 reactions = 48 credits.',skuPh:'BSQ-XXXX-XXXX-XXXX',validate:'Validate and add',
      eInvalid:'SKU code not found. Check the code on your BiomeSeq kit packaging.',eUsed:'This code has already been used. Each code can only be used once.',eEmpty:'Enter an SKU code first.',
      tInvalid:'Invalid SKU code',tInvalidP:'The code you entered was not found. Check it and try again.',tUsed:'SKU code already used',tUsedP:'This code has already been redeemed and cannot be used again.',tOk:'SKU code redeemed',tOkP:function(n){return n+' credits have been added to your account.'},
      leadT:'Only a Lead Can Redeem a Kit or Top Up Credits',leadD:'Your study group needs its Lead to approve kit redemption and credit top-ups. Contact your Lead.',leadRole:'Lead • Genetics and Molecular Biotechnology',contact:'Contact',contactT:'Message sent to dr. Andi Gunawan',contactP:'Your Lead will get in touch soon.',
      hist:'Credit History',histS:'Redemptions and credit usage in Genetics and Molecular Biotechnology',
      cDate:'Date',cType:'Type',cDesc:'Description',cRef:'Reference',detail:'View transaction detail',
      deduksi:'Deduction',system:'System',redeem:'Redeem',
      page_:function(p,n){return 'Page '+p+' of '+n},goPage:'Jump to page',prev:'Previous',next:'Next',pageNav:'Page navigation',goN:function(n){return 'Page '+n},
      needT:'Need More Credits?',n1:'Contact the Nusantics Team',n1d:'Click the WhatsApp button below. The message is pre-filled with your account info.',n2:'Receive an Invoice',n2d:'Our team sends an official invoice. Pay by bank transfer.',n3:'Credits Added',n3d:'Our team sends an official invoice. Pay by bank transfer.',wa:'Contact via WhatsApp',
      howT:'How Credits Work',h1:'1 Credit = 1 Sample Analysed',h1d:'One credit covers the whole analysis of one sample. Credits are deducted when you confirm the analysis, not on upload.',h2:'Credits Are Deducted on Confirmation',h2d:'Deduction only happens when you confirm the analysis, and only for samples that passed validation.',h3:'Credits from a BiomeSeq Kit',h3d:'Every BiomeSeq kit you buy comes with a unique SKU code. Redeem that code to add credits to your account.',h4:'Credits Never Expire',h4d:'Credits added to your account have no time limit.',
      sT:'Credit Transaction Detail',close:'Close',saldoAfter:function(n){return 'Balance: '+n+' credits'},
      relRun:'Related Run',info:'Details',runTitle:'Microbiology Practicum — Odd Semester 2026',runMeta:'RUN-2026-0022 • dr. Andi Gunawan • 27 Samples • 20 hours ago',
      dt:'Date & Time',type:'Type',desc:'Description',ref:'Reference',amount:'Amount',after:'Balance After Transaction',by:'Performed By',skuLbl:'BiomeSeq SKU code',skuHint:'Include it when contacting support',copy:'Copy code',copied:'Code copied',
      adjT:'Credit adjustment by the Nusantics Team',adjS:'Manual adjustment',adjD:'Credit adjustment by the Nusantics team',
      kredit:function(n){return n+' credits'},sampel:function(n){return n+' samples'}
    }
  };
  var LANG='id'; var t=function(k,a,b){var v=TX[LANG][k];return typeof v==='function'?v(a,b):v};

  /* ───────── Icons ───────── */
  var P={
    down:'m6 9 6 6 6-6', x:'M18 6 6 18M6 6l12 12', arrow:'M5 12h14M13 6l6 6-6 6',
    info:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 11v5M12 8h.01',
    copy:'M9 9h10v12H9zM5 15V3h10',
    lock:'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4',
    chat:'M3 21l1.7-5A9 9 0 1 1 8 19.3L3 21z',
    coin:'M12 8c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3zM4 5v4c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 9v4c0 1.7 3.6 3 8 3s8-1.3 8-3V9M4 13v4c0 1.7 3.6 3 8 3s8-1.3 8-3v-4',
    wa:'M3 21l1.7-5A8.5 8.5 0 1 1 8 19.3L3 21zM9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2-1.9.6z',
    doc:'M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h6'
  };
  var ico=function(n,c){return '<svg class="rn-i s'+(c?' '+c:'')+'" viewBox="0 0 24 24" aria-hidden="true"><path d="'+P[n]+'"/></svg>'};
  var solidErr='<svg class="rn-i" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m8.5 8.5 7 7M15.5 8.5l-7 7" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></svg>';
  var solidOk='<svg class="rn-i" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m7.5 12.5 3 3 6-6.5" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var infoFill='<svg class="rn-i" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 11v5M12 8h.01" fill="none" stroke="#a8530b" stroke-width="2" stroke-linecap="round"/></svg>';

  /* pixel-square texture used on the hero and on the sheet's amount tile (deterministic, so it never shimmers on re-render) */
  function pix(w,h,seed,cols){
    var s=seed, rnd=function(){s=(s*1664525+1013904223)>>>0; return s/4294967296}, out='', S=cols||18, i, j;
    for(i=0;i<Math.ceil(w/S);i++) for(j=0;j<Math.ceil(h/S);j++){
      var cx=i*S+S/2, d=Math.abs(cx-w*.62)/(w*.42), f=Math.max(0,1-d*d);
      if(rnd()<.16*f+.01) out+='<rect x="'+i*S+'" y="'+j*S+'" width="'+(S-2)+'" height="'+(S-2)+'" rx="2" fill="#fff" fill-opacity="'+(.04+rnd()*.1*f).toFixed(3)+'"/>';
    }
    return '<svg class="kr-pix" width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'" aria-hidden="true">'+out+'</svg>';
  }

  /* ───────── State & data (mock) ───────── */
  var ROLE=(function(){var m=Q('role'); try{ if(m) sessionStorage.setItem('nrd-role',m); return sessionStorage.getItem('nrd-role')||'lead'; }catch(e){return m||'lead'}})();
  var DEFAULT_BAL=49;
  function getBal(){var q=Q('credit'); if(q!==null){try{localStorage.setItem(CREDIT_KEY,String(+q))}catch(e){} return +q}
    try{var v=localStorage.getItem(CREDIT_KEY); return v===null?DEFAULT_BAL:+v}catch(e){return DEFAULT_BAL}}
  function setBal(n){try{localStorage.setItem(CREDIT_KEY,String(n))}catch(e){}}
  var state={bal:getBal(),page:Math.min(TOTAL_PAGES,Math.max(1,+(Q('page')||1))),panel:Q('panel')||'need',detail:Q('detail'),sku:'',err:null,errVal:'',added:[]};
  if(Q('error')){state.err=Q('error'); state.errVal=state.err==='used'?'BSQ-7K2M-9PQ4-XD81':'BSQ-1234-ABCD-9XYZ'; if(!Q('panel')) state.panel='how'; if(Q('toast')!=='0') setTimeout(function(){toast('error',t(state.err==='used'?'tUsed':'tInvalid'),t(state.err==='used'?'tUsedP':'tInvalidP'))},950)}
  /* the same 10-row pattern the Figma table uses, repeated per page */
  var PATTERN=[['deduksi','','RUN-2026-0022',-27],['system','adjD','',48],['deduksi','Praktikum Mikrobiologi — Semester Ganjil 2026','RUN-2026-0021',-20],
    ['redeem','','',48],['redeem','','',48],['redeem','','',48],['redeem','','',48],['redeem','','',48],['redeem','','',48],['redeem','','',48]];
  function rowsFor(p){
    var base=[]; if(p===1) base=state.added.slice().reverse();
    return base.concat(PATTERN.map(function(r,i){return {type:r[0],desc:r[1],ref:r[2],amt:r[3],i:i,date:'28 Apr 2026'}})).slice(0,PER);
  }
  var DETAIL={deduksi:{type:'deduksi',amt:-27,saldo:48,ref:'RUN-2026-0022',cls:'red'},redeem:{type:'redeem',amt:48,saldo:48,cls:'green'},system:{type:'system',amt:48,saldo:76,cls:'green'}};

  /* ───────── Toast (same markup as the Run page) ───────── */
  var toastHost;
  function toast(kind,title,text){
    if(!toastHost){toastHost=document.createElement('div'); toastHost.className='rn-toasts'; toastHost.setAttribute('aria-live','polite'); document.body.appendChild(toastHost);}
    var el=document.createElement('div'); el.className='rn-toast rn-toast--'+kind; el.setAttribute('role',kind==='error'?'alert':'status');
    el.innerHTML='<span class="rn-toast__ic">'+(kind==='error'?solidErr:solidOk)+'</span><div class="rn-toast__tx"><b>'+esc(title)+'</b><p>'+esc(text)+'</p></div><button class="rn-toast__x" type="button" aria-label="'+t('close')+'">'+ico('x')+'</button>';
    var gone=false, close=function(){if(gone) return; gone=true; el.classList.add('is-out'); setTimeout(function(){el.remove()},200)};
    el.querySelector('.rn-toast__x').onclick=close; toastHost.appendChild(el); setTimeout(close,6000);
  }

  /* ───────── Pieces ───────── */
  var host=$('#krApp');
  function hero(){
    return '<section class="kr-hero" aria-label="'+t('saldo')+'">'+pix(684,146,7)+
      '<div class="kr-hero__top"><h2>'+t('saldo')+'</h2><div class="kr-hero__bg"><span>'+t('study')+'</span><span class="kr-hero__pill">'+t('studyName')+'</span></div></div>'+
      '<div class="kr-hero__bal"><span class="kr-hero__tile">'+ico('coin')+'</span><b>'+t('left',state.bal)+'</b></div>'+
      '<p class="kr-hero__note">'+infoFill+t('enough',state.bal)+'</p></section>';
  }
  function redeemCard(){
    var head='<div class="kr-rc__head"><h2>'+t('rT')+'</h2><p>'+t('rS')+'</p></div>';
    if(ROLE!=='lead'){
      return '<section class="kr-rc kr-rc--lock">'+head+'<div class="kr-lock"><div class="kr-lock__top"><span class="kr-lock__ic">'+ico('lock')+'</span><div><h3>'+t('leadT')+'</h3><p>'+t('leadD')+'</p></div></div>'+
        '<div class="kr-lead"><span class="kr-av">D</span><div class="kr-lead__tx"><b>dr. Andi Gunawan</b><span>'+t('leadRole')+'</span></div><button class="rn-btn rn-btn--tint" type="button" data-contact>'+ico('chat')+t('contact')+'</button></div></div></section>';
    }
    var bad=!!state.err, msg=bad?t(state.err==='used'?'eUsed':state.err==='empty'?'eEmpty':'eInvalid'):'';
    return '<section class="kr-rc kr-rc--lead">'+head+
      '<div class="kr-rc__form"><label class="kr-lbl" for="krSku">'+t('sku')+' <span class="kr-tip" tabindex="0" role="img" aria-label="'+esc(t('skuTip'))+'">'+ico('info')+'<span class="kr-tip__b" role="tooltip">'+esc(t('skuTip'))+'</span></span></label>'+
      '<div class="kr-in'+(bad?' is-invalid':'')+'"><input id="krSku" type="text" autocomplete="off" spellcheck="false" placeholder="'+t('skuPh')+'" value="'+esc(state.errVal||state.sku)+'"'+(bad?' aria-invalid="true" aria-describedby="krMsg"':'')+'><button class="kr-in__go" type="button" data-redeem>'+t('validate')+'</button></div>'+
      (bad?'<p class="kr-msg" id="krMsg" role="alert">'+msg+'</p>':'')+'</div></section>';
  }
  function badge(type){return '<span class="kr-bd kr-bd--'+type+'">'+t(type)+'</span>'}
  function row(r){
    var k=r.type;
    return '<tr class="kr-row" data-d="'+k+'"><td>'+r.date+'</td><td>'+badge(k)+'</td><td>'+(r.desc?esc(r.desc==='adjD'?t('adjD'):r.desc):'-')+'</td><td>'+(r.ref||'-')+'</td>'+
      '<td class="kr-act"><button class="kr-ib" type="button" data-d="'+k+'" aria-label="'+t('detail')+'">'+ico('doc')+'</button></td></tr>';
  }
  function pager(){
    var p=state.page, list=p<=3?[1,2,3,'…',8,9,10]:p<8?[1,'…',p-1,p,p+1,'…',10]:[1,'…',8,9,10];
    var btns=list.map(function(v){return v==='…'?'<span class="rn-gap">…</span>':'<button type="button" data-pg="'+v+'"'+(v===p?' aria-current="page"':'')+' aria-label="'+t('goN',v)+'">'+v+'</button>'}).join('');
    var opts='';for(var i=1;i<=TOTAL_PAGES;i++)opts+='<option value="'+i+'"'+(i===p?' selected':'')+'>'+i+'</option>';
    return '<div class="rn-pg kr-pg"><div class="rn-pg__left"><span>'+t('page_',p,TOTAL_PAGES)+'</span><label class="kr-sel"><span class="sr-only">'+t('goPage')+'</span><select id="krGo">'+opts+'</select>'+ico('down')+'</label></div>'+
      '<nav class="rn-pg__nav" aria-label="'+t('pageNav')+'"><button type="button" data-pg="prev"'+(p===1?' disabled':'')+'>'+t('prev')+'</button>'+btns+'<button type="button" data-pg="next"'+(p===TOTAL_PAGES?' disabled':'')+'>'+t('next')+'</button></nav></div>';
  }
  function history(){
    return '<section class="kr-hist"><div class="kr-hist__head"><h2>'+t('hist')+'</h2><p>'+t('histS')+'</p></div>'+
      '<div class="kr-hist__body"><div class="kr-tbl"><table><thead><tr><th>'+t('cDate')+'</th><th>'+t('cType')+'</th><th>'+t('cDesc')+'</th><th>'+t('cRef')+'</th><th class="kr-act"></th></tr></thead><tbody>'+rowsFor(state.page).map(row).join('')+'</tbody></table></div>'+pager()+'</div></section>';
  }
  function acc(key,title,body){
    var open=state.panel===key;
    return '<section class="kr-acc'+(open?' is-open':'')+'"><button class="kr-acc__h" type="button" data-acc="'+key+'" aria-expanded="'+open+'" aria-controls="kr-'+key+'"><span>'+title+'</span>'+ico('down')+'</button>'+
      '<div class="kr-acc__b" id="kr-'+key+'"'+(open?'':' hidden')+'>'+body+'</div></section>';
  }
  function side(){
    var steps=[['n1','1'],['n2','2'],['n3','3']].map(function(s){return '<li><span class="kr-step">'+s[1]+'</span><div><b>'+t(s[0])+'</b><p>'+t(s[0]+'d')+'</p></div></li>'}).join('');
    var need='<ol class="kr-steps">'+steps+'</ol><a class="rn-btn rn-btn--primary rn-btn--block" href="#" data-wa>'+ico('wa')+t('wa')+'</a>';
    var how=['h1','h2','h3','h4'].map(function(k){return '<div class="kr-how"><b>'+t(k)+'</b><p>'+t(k+'d')+'</p></div>'}).join('');
    return '<aside class="kr-side">'+acc('need',t('needT'),need)+acc('how',t('howT'),how)+'</aside>';
  }
  function sheet(){
    var d=DETAIL[state.detail]; if(!d) return '';
    var k=d.type, plus=d.amt>0;
    var who='<span class="kr-av">D</span><div class="kr-who"><b>dr. Andi Gunawan</b><span>andi@itb.ac.id</span></div>';
    var rows=function(items){return items.map(function(r){return '<div class="kr-kv"><span>'+r[0]+'</span><b>'+r[1]+'</b></div>'}).join('')};
    var rel='<div class="kr-rel"><img src="assets/run-illustration.svg" width="40" height="40" alt=""><div><b>'+(k==='system'?t('adjT'):t('runTitle'))+'</b><p>'+(k==='system'?t('adjS'):t('runMeta'))+'</p></div></div>';
    var body='';
    if(k==='deduksi') body=rel+rows([[t('dt'),'28 April 2026, 14:32 WIB'],[t('type'),badge(k)],[t('desc'),'-'],[t('ref'),d.ref+' • '+t('sampel',27)],[t('amount'),t('kredit',-27)],[t('after'),t('kredit',d.saldo)]]);
    if(k==='redeem') body='<div class="kr-sku"><b>'+t('skuLbl')+'</b><div class="kr-sku__box"><span>TXN-2026-CR-004821</span><button type="button" data-copy aria-label="'+t('copy')+'">'+ico('copy')+'</button></div><p>'+t('skuHint')+'</p></div>'+rows([[t('dt'),'28 April 2026, 14:32 WIB'],[t('type'),badge(k)],[t('desc'),'-'],[t('ref'),'-']]);
    if(k==='system') body=rel+rows([[t('dt'),'28 April 2026, 14:32 WIB'],[t('type'),badge(k)],[t('desc'),t('adjD')],[t('ref'),'-']]);
    return '<div class="kr-scrim" data-sheet="scrim"><aside class="kr-sheet" role="dialog" aria-modal="true" aria-labelledby="krShT">'+
      '<div class="kr-sheet__head"><h2 id="krShT">'+t('sT')+'</h2><button class="rn-modal__x" type="button" data-sheet="close" aria-label="'+t('close')+'">'+ico('x')+'</button></div>'+
      '<div class="kr-sheet__body"><div class="kr-amt kr-amt--'+d.cls+'">'+pix(356,94,k==='deduksi'?11:23,16)+'<span class="kr-amt__t">'+t(k)+'</span><b>'+(plus?'+':'-')+Math.abs(d.amt)+'</b><span class="kr-amt__s">'+t('saldoAfter',d.saldo)+'</span></div>'+
      '<section class="kr-info"><h3>'+(k==='deduksi'?t('relRun'):t('info'))+'</h3><div class="kr-info__in">'+body+'<div class="kr-kv kr-kv--by"><span>'+t('by')+'</span><div class="kr-by">'+who+'</div></div></div></section></div></aside></div>';
  }

  /* ───────── Render ───────── */
  var sheetOpener=null;
  function render(){
    var keep=host.querySelector('.kr-main'), sc=keep?keep.scrollTop:0, active=document.activeElement&&document.activeElement.id;
    host.innerHTML='<div class="kr-cols"><div class="kr-main">'+hero()+redeemCard()+history()+'</div>'+side()+'</div>'+sheet();
    var m=host.querySelector('.kr-main'); if(m) m.scrollTop=sc;
    if(active==='krSku'){var i=$('#krSku'); if(i){i.focus(); i.setSelectionRange(i.value.length,i.value.length)}}
    if(state.detail){var x=$('[data-sheet="close"]'); if(x&&!sheetOpener) x.focus();}
  }
  function openSheet(k,el){state.detail=k; sheetOpener=el; render(); var x=$('[data-sheet="close"]'); if(x) x.focus();}
  function closeSheet(){
    var s=$('.kr-scrim'); if(!s) return;
    s.classList.add('is-leaving'); var op=sheetOpener;
    setTimeout(function(){state.detail=null; sheetOpener=null; render(); if(op&&document.body.contains(op)) op.focus(); else {var b=$('.kr-row .kr-ib'); if(b) b.focus()}},180);
  }
  function redeem(){
    var el=$('#krSku'), v=(el?el.value:'').trim().toUpperCase(); state.sku=v;
    if(!v){state.err='empty'; state.errVal=''; render(); var f=$('#krSku'); if(f) f.focus(); return;}
    var m=v.match(/^NUS-BQ002\.(\d{1,3})-\d{6}-[A-Z]{3}$/), n=m?+m[1]:(v==='BSQ-A1B2-C3D4-E5F6'?48:0);
    if(n){
      state.bal+=n; setBal(state.bal); state.err=null; state.errVal=''; state.sku=''; state.page=1; state.added.push({type:'redeem',desc:'',ref:'',amt:n,date:'4 Nov 2026'});
      render(); toast('success',t('tOk'),t('tOkP',n)); return;
    }
    state.err=(v==='BSQ-7K2M-9PQ4-XD81')?'used':'invalid'; state.errVal=v;
    render(); toast('error',t(state.err==='used'?'tUsed':'tInvalid'),t(state.err==='used'?'tUsedP':'tInvalidP')); var f2=$('#krSku'); if(f2) f2.focus();
  }

  host.addEventListener('click',function(e){
    var b;
    if((b=e.target.closest('[data-redeem]'))) return redeem();
    if((b=e.target.closest('[data-acc]'))){var k=b.getAttribute('data-acc'); state.panel=state.panel===k?'none':k; return render();}
    if((b=e.target.closest('[data-d]'))){return openSheet(b.getAttribute('data-d'),b.closest('tr')?b.closest('tr').querySelector('.kr-ib'):b);}
    if((b=e.target.closest('[data-pg]'))){var v=b.getAttribute('data-pg'); state.page=v==='prev'?state.page-1:v==='next'?state.page+1:+v; return render();}
    if((b=e.target.closest('[data-sheet="close"]'))) return closeSheet();
    if(e.target.matches('[data-sheet="scrim"]')) return closeSheet();
    if((b=e.target.closest('[data-copy]'))){try{navigator.clipboard.writeText('TXN-2026-CR-004821')}catch(_){} return toast('success',t('copied'),'TXN-2026-CR-004821');}
    if((b=e.target.closest('[data-contact]'))){return toast('success',t('contactT'),t('contactP'));}
    if((b=e.target.closest('[data-wa]'))) e.preventDefault();
  });
  host.addEventListener('change',function(e){if(e.target.id==='krGo'){state.page=+e.target.value; render();}});
  host.addEventListener('keydown',function(e){
    if(e.target.id==='krSku'&&e.key==='Enter'){e.preventDefault(); redeem();}
    if(e.key==='Escape'&&state.detail){e.preventDefault(); closeSheet();}
  });
  host.addEventListener('input',function(e){if(e.target.id==='krSku'&&state.err){state.err=null; state.errVal=e.target.value; var w=e.target.closest('.kr-in'); if(w) w.classList.remove('is-invalid'); var m=$('#krMsg'); if(m) m.remove();}});

  function onLang(l){
    LANG=l; document.title='Nusantics – '+t('page');
    var c=document.getElementById('crumbPage'); if(c) c.textContent=t('page');
    render();
  }
  if(window.HelixShell) HelixShell.onLang(onLang); else onLang('id');
})();
