/* Run workflow, step 2: Unggah FASTQ & Validasi Data (Figma 4732:1246). Uploads and validation are simulated in the browser. */
(function(){
  var F=Flow, $=F.$, esc=F.esc, ico=F.ico, toast=F.toast, modal=F.modal, cdlg=F.cdlg, run=F.run, balance=F.balance, band=F.band;
  var THRESH=20000;
  var codes=(function(){ try{ var s=JSON.parse(sessionStorage.getItem('nrd-samples')||'null'); if(s&&s.length) return s.map(function(x){return x.code}).slice(0,12); }catch(e){} var a=[]; for(var i=1;i<=10;i++) a.push('ITB-PRK-'+String(i).padStart(3,'0')); return a; })();
  var idxOf=function(c){return codes.indexOf(c)};
  var S={rail:false,samples:codes.map(function(c){return {code:c,layout:'paired-end',files:{R1:null,R2:null},st:'wait',reads:0}}),locked:false,lockedAt:'',progOpen:false,f:[],fOpen:null,fAdd:false,uploads:[],drawer:null,drawerOpen:true,rejected:[],tab:'all'};
  if(/[?&]empty=1/.test(location.search)) S.samples=[];
  var FL=[['code','Kode Sampel'],['st','Status Validasi'],['size','Ukuran File'],['reads','Jumlah Reads']];
  var ST={wait:['Menunggu file','chip-wait'],queue:['Dalam antrian','chip-wait'],run:['Validasi file berjalan','chip-run'],ok:['Lolos','chip-ok'],low:['Reads Rendah','chip-low'],fail:['Gagal','chip-fail']};
  var num=function(v){return +String(v).replace(/[^\d]/g,'')||0};
  var fmtReads=function(n){return String(n).replace(/\B(?=(\d{3})+(?!\d))/g,'.')};
  var sizeOf=function(f){return f?f.size:0};
  var host=$('#fl');

  /* ── derived ── */
  var have=function(s){return !!(s.files.R1&&s.files.R2)};
  var uploaded=function(s){return have(s)&&s.files.R1.st==='ok'&&s.files.R2.st==='ok'};
  function counts(){var c={ok:0,low:0,fail:0,run:0,queue:0,wait:0}; S.samples.forEach(function(s){c[s.st]++}); return c;}
  function match(s){
    return S.f.every(function(f){
      if(!f.v) return true; var v=f.v.toLowerCase();
      if(f.k==='code') return s.code.toLowerCase().indexOf(v)>-1;
      if(f.k==='st') return ST[s.st][0].toLowerCase().indexOf(v)>-1;
      if(f.k==='size') return Math.max(sizeOf(s.files.R1),sizeOf(s.files.R2))>num(v);
      if(f.k==='reads') return s.reads>num(v);
      return true;
    });
  }
  function resultFor(s){   /* deterministic mock result per sample */
    var n=idxOf(s.code)+1;
    if(n%10===7) return {st:'fail',reads:0};
    if(n%10===6) return {st:'low',reads:8442};
    return {st:'ok',reads:48203-n*517};
  }

  /* ── pieces ── */
  function progBar(){
    var c=counts(), n=S.samples.length||1, done=c.ok+c.low+c.fail, seg=function(v,cl){return v?'<i class="'+cl+'" style="width:'+(v/n*100)+'%"></i>':''};
    return '<div class="fq-pg"><button class="fq-pg__h" type="button" data-a="pg" aria-expanded="'+S.progOpen+'"><span>Progress Validasi</span><span class="sp"></span><span>'+done+'/'+S.samples.length+' sampel selesai</span>'+ico('down')+'</button><div class="fq-pg__bar">'+seg(c.ok,'ok')+seg(c.run+c.queue,'run')+seg(c.low,'low')+seg(c.fail,'fail')+'</div>'+
      (S.progOpen?'<div class="fq-pg__l"><span><i class="ok"></i>Lolos '+c.ok+'</span><span><i class="run"></i>Berjalan '+(c.run+c.queue)+'</span><span><i class="low"></i>Reads rendah '+c.low+'</span><span><i class="fail"></i>Gagal '+c.fail+'</span><span><i class="wait"></i>Menunggu file '+c.wait+'</span></div>':'')+'</div>';
  }
  function fileRow(s,r){
    var f=s.files[r], R=s.code+'_'+r+'.fastq.gz';
    if(!f) return '<div class="fq-fr fq-fr--miss"><span class="fq-ic miss">'+ico('dots')+'</span><div><b>Belum ada file '+r+'</b><span>Diperlukan agar sampel ini dapat divalidasi</span></div><button class="fq-up" type="button" data-a="up1" data-c="'+esc(s.code)+'" data-r="'+r+'" '+(S.locked?'disabled':'')+'>'+ico('up')+'Unggah</button></div>';
    var state=f.st==='ok'?(s.st==='run'&&r==='R2'?'run':s.st==='queue'?'queue':'ok'):f.st;
    var sub=f.st==='ok'?(s.st==='ok'||s.st==='low'?'Validasi file sampel — MD5 cocok':s.st==='fail'&&r==='R2'?'File tidak ditemukan atau rusak':s.st==='run'?'Validasi file sampel — sedang menghitung MD5…':'Validasi file sampel — menunggu antrian'):'Mengunggah… '+Math.round(f.pct)+'%';
    var ic=f.st!=='ok'?'<span class="fq-ic run"><i class="fq-spin"></i></span>':s.st==='fail'&&r==='R2'?'<span class="fq-ic bad">'+ico('x')+'</span>':s.st==='ok'||s.st==='low'?'<span class="fq-ic ok">'+ico('check')+'</span>':s.st==='run'?'<span class="fq-ic run"><i class="fq-spin"></i></span>':'<span class="fq-ic q">'+ico('dots')+'</span>';
    return '<div class="fq-fr'+(s.st==='fail'&&r==='R2'?' fq-fr--bad':'')+'">'+ic+'<div><b>'+esc(f.name)+'</b><span>'+sub+'</span></div><em class="fq-sz">'+(f.size>=1000?(f.size/1000).toFixed(2)+' GB':f.size+' MB')+'</em></div>';
  }
  function readsPane(s){
    if(s.st==='wait') return '<div class="fq-rd"><span class="l">VALIDASI READS SAMPEL</span><b class="w">Unggah file dahulu</b><span class="s">Menunggu file lengkap</span></div>';
    if(s.st==='queue'||s.st==='run') return '<div class="fq-rd"><span class="l">VALIDASI READS SAMPEL</span><b class="b">Menunggu validasi file selesai</b><span class="s">Estimasi selesai: 14:45 WIB</span></div>';
    if(s.st==='fail') return '<div class="fq-rd"><span class="l">VALIDASI READS SAMPEL</span><b class="r">Tidak dapat dihitung</b><span class="s">File R2 bermasalah</span></div>';
    return '<div class="fq-rd"><span class="l">VALIDASI READS SAMPEL</span><b class="'+(s.st==='ok'?'g':'a')+'">'+fmtReads(s.reads)+' reads</b><span class="s">'+(s.st==='ok'?'Prt. 10.000 reads — terpenuhi':'Di bawah threshold '+fmtReads(THRESH)+' reads')+'</span></div>';
  }
  function sampleCard(s){
    var t=ST[s.st];
    return '<article class="fq-sc fq-sc--'+s.st+'"><div class="fq-sc__h"><b>'+esc(s.code)+'</b><span class="fq-tag">'+s.layout+'</span><span class="fq-chip '+t[1]+'">'+(s.st==='ok'?ico('check'):'')+t[0]+'</span><span class="sp"></span><a href="#" data-a="det" data-c="'+esc(s.code)+'">Lihat detail</a></div><div class="fq-sc__b"><div class="fq-sc__f">'+fileRow(s,'R1')+fileRow(s,'R2')+'</div>'+readsPane(s)+'</div></article>';
  }
  function filterBar(){
    var chips=S.f.map(function(f,i){var lab=FL.filter(function(x){return x[0]===f.k})[0][1], open=S.fOpen===i, val=f.v?(f.k==='size'?'> '+f.v+' MB':f.k==='reads'?'> '+fmtReads(num(f.v)):f.v):'';
      return '<span class="fl-fw"><button class="fl-fc" type="button" data-a="fchip" data-i="'+i+'" aria-expanded="'+open+'">'+lab+(val?': '+esc(val):'')+ico('down')+'</button>'+(open?'<div class="fl-pop fl-pop--f"><div class="fl-pop__h"><b>'+lab+'</b><button class="fl-ibx" type="button" data-a="fdel" data-i="'+i+'" aria-label="Hapus filter">'+ico('trash')+'</button></div><div class="fl-pop__s"><input id="fq" data-a="fq" data-i="'+i+'" placeholder="'+(f.k==='size'?'Ukuran minimum (MB)':f.k==='reads'?'Reads minimum':'Search')+'" value="'+esc(f.v)+'" autocomplete="off"></div></div>':'')+'</span>';}).join('');
    var used=S.f.map(function(f){return f.k}), avail=FL.filter(function(x){return used.indexOf(x[0])<0});
    return (S.f.length||S.fAdd?'<div class="fl-fb" style="padding:0 0 12px">'+chips+(avail.length?'<span class="fl-fw"><button class="fl-fadd" type="button" data-a="fadd">'+ico('plus')+'Filter</button>'+(S.fAdd?'<div class="fl-pop fl-pop--m">'+avail.map(function(x){return '<button type="button" data-a="fpick" data-k="'+x[0]+'">'+x[1]+'</button>'}).join('')+'</div>':'')+'</span>':'')+(S.f.length?'<button class="fl-reset" type="button" data-a="freset">Reset</button>':'')+'</div>':'');
  }
  function dropzone(){
    if(S.locked) return '';
    return '<label class="fq-dz" id="dz" tabindex="0">'+ico('up')+'<div><b>Unggah Beberapa File Sekaligus</b><span>Seret dan lepas atau klik untuk cari file. Format: .fastq.gz, .fq.gz • Maks. 5 GB/file</span><a href="#" data-a="demo">Gunakan contoh file</a></div><input class="sr-only" id="fi" type="file" multiple accept=".gz,.fastq,.fq" tabindex="-1"></label>';
  }
  function lowBanner(){
    var n=counts().low; if(!n||S.locked) return '';
    return '<div class="fq-warn">'+'<span class="fq-warn__ic">'+ico('tri')+'</span><div><b>'+n+' sampel dengan reads rendah ikut dianalisis</b><span>Kredit tetap dipotong dan hasil analisis menjadi tanggung jawab Anda.</span></div><button class="rn-btn" type="button" data-a="seelow">Lihat sampel</button></div>';
  }
  function body(){
    if(!S.samples.length) return {h:'<div><h2>Daftar Sampel</h2><p>0 sampel terdaftar</p></div><button class="fl-ib" type="button" data-a="refresh" aria-label="Muat ulang">'+ico('reset')+'</button>',
      b:'<div class="fq-empty"><img src="assets/no-data-illustration.svg" alt=""><h3>Data Sampel Tidak Ditemukan</h3><p>Silakan upload data sampel Anda terlebih dahulu</p><a class="rn-btn rn-btn--primary" href="identifikasi.html">Upload Data Sampel</a></div>'};
    var list=S.samples.filter(match);
    return {h:'<div><h2>Daftar Sampel</h2><p>'+S.samples.length+' sampel terdaftar</p></div>'+(S.locked?'':'<button class="rn-btn rn-btn--danger" type="button" data-a="delall">'+ico('trash')+'Hapus Semua File</button>')+'<button class="fl-ib fq-fbtn" type="button" data-a="fadd" aria-label="Filter"'+(S.f.length?' data-n="'+S.f.length+'"':'')+'>'+ico('filter')+'</button><button class="fl-ib" type="button" data-a="refresh" aria-label="Muat ulang">'+ico('reset')+'</button>',
      b:lowBanner()+progBar()+filterBar()+(list.length?'<div class="fq-sl">'+list.map(sampleCard).join('')+'</div>':'<div class="fq-empty"><img src="assets/no-data-illustration.svg" alt=""><h3>Maaf, tidak ada informasi yang tersedia.</h3><p>Coba gunakan filter yang berbeda untuk mencari data yang Anda butuhkan.</p></div>')};
  }
  function drawer(){
    var u=S.uploads; if(!u.length&&!S.rejected.length) return '';
    var total=u.length, done=u.filter(function(x){return x.f.st==='ok'}).length, pend=u.filter(function(x){return x.f.st!=='ok'}), pct=total?Math.round(u.reduce(function(a,x){return a+(x.f.st==='ok'?100:x.f.pct)},0)/total):0, fin=total&&done===total;
    var rows=function(x){var r=Math.round(x.f.pct);return '<div class="fq-dr"><div><b>'+esc(x.f.name)+'</b><span>'+x.f.size+' MB • '+(r>0?(Math.round(4+(x.f.size%7))+' MB/s • ~'+Math.max(1,Math.round((100-r)/12))+'s'):'menunggu antrean')+'</span></div><button class="fq-x" type="button" data-a="ucancel" data-k="'+x.key+'" aria-label="Batalkan '+esc(x.f.name)+'">'+ico('x')+'</button><span class="fq-ring" style="--p:'+r+'"><i>'+r+'%</i></span></div>'}; 
    return '<aside class="fq-drawer" aria-label="Unggahan file"><div class="fq-drawer__h"><b>'+(fin?'Unggahan selesai':'Mengunggah file…')+'</b><span class="fq-cnt">'+done+'/'+total+' file</span><button class="fl-ibx" type="button" data-a="dtoggle" aria-expanded="'+S.drawerOpen+'" aria-label="'+(S.drawerOpen?'Ciutkan':'Perluas')+'">'+ico(S.drawerOpen?'down':'max')+'</button>'+(fin?'<button class="fl-ibx" type="button" data-a="dclose" aria-label="Tutup">'+ico('x')+'</button>':'')+'</div>'+
      (S.drawerOpen?'<div class="fq-drawer__b"><div class="fq-dp"><div class="fl-pb"><i style="width:'+pct+'%"></i></div><span>'+pct+'%</span>'+(fin?'':'<button type="button" data-a="ucancelall">Batalkan</button>')+'</div>'+
        (pend.length?'<h4>MENUNGGU</h4>'+pend.map(rows).join(''):'')+
        (S.rejected.length?'<h4>GAGAL</h4>'+S.rejected.map(function(x){return '<div class="fq-dr fq-dr--bad"><div><b>'+esc(x.name)+'</b><span>Ditolak — kode sampel tidak ditemukan</span></div><span class="fq-ic bad">'+ico('tri')+'</span><button class="fq-x" type="button" data-a="rdel" data-n="'+esc(x.name)+'" aria-label="Hapus">'+ico('x')+'</button></div>'}).join(''):'')+
        (done?'<h4>BERHASIL</h4>'+u.filter(function(x){return x.f.st==='ok'}).slice(-3).map(function(x){return '<div class="fq-dr fq-dr--ok"><div><b>'+esc(x.f.name)+'</b><span>'+x.f.size+' MB</span></div><span class="fq-ic ok">'+ico('check')+'</span></div>'}).join(''):'')+'</div>':'')+'</aside>';
  }
  function footer(){
    var c=counts(), files=0, bad=S.rejected.length+c.fail;
    S.samples.forEach(function(s){ if(s.files.R1) files++; if(s.files.R2) files++; });
    var any=S.samples.some(function(s){return s.files.R1||s.files.R2});
    var left='';
    if(S.locked) left='<div class="fq-fl"><span class="fl-chip fl-chip--ok">'+(c.ok+c.low)*2+' berhasil</span>'+(bad?'<span class="fl-chip fl-chip--bad">'+bad+' gagal</span>':'')+(c.low?'<span class="fl-chip" style="background:#fef3e2;color:#a66800">'+c.low+' reads rendah</span>':'')+'<span class="fq-lk">Dikunci pada '+esc(S.lockedAt)+' <a href="#" data-a="files">Lihat daftar file</a></span><span class="fq-lk2">Submisi telah dikunci — tidak dapat diubah</span></div>';
    else if(c.low) left='<div class="fq-fl"><span class="fl-chip" style="background:#fef3e2;color:#a66800">'+c.low+' reads rendah</span><span class="fq-lk">Sampel di bawah threshold tetap dipotong kredit jika dianalisis <a href="#" data-a="lowinfo">Lihat info</a></span></div>';
    return '<footer class="fl-foot">'+left+'<button class="rn-btn" type="button" data-a="back">'+ico('left')+'Kembali</button><button class="rn-btn rn-btn--primary" type="button" data-a="next"'+(any||S.locked?'':' disabled')+'>Lanjut ke Konfirmasi'+ico('right')+'</button></footer>';
  }
  function render(keep){
    var v=body(), cb=$('.fl-card__b',host), top=keep&&cb?cb.scrollTop:0;
    host.innerHTML='<div class="fl-row">'+F.progress(S.rail,2)+'<section class="fl-main">'+band()+'<div class="fl-card"><div class="fq-card__dz">'+dropzone()+'</div><div class="fl-card__h">'+v.h+'</div><div class="fl-card__b">'+v.b+'</div></div></section></div>'+footer()+'<div id="dwr">'+drawer()+'</div>';
    var b=$('.fl-card__b',host); if(b&&top) b.scrollTop=top;
  }
  var upd=function(){var d=$('#dwr',host); if(d) d.innerHTML=drawer(); var dc=$('.fl-card__b',host); };

  /* ── simulation: upload then validate ── */
  var key=0, tUp, tVal;
  function addFiles(list){   /* [{name,size,slot?:{c,r}}] */
    list.forEach(function(x){
      var s,r,m;
      if(x.slot){s=S.samples.filter(function(q){return q.code===x.slot.c})[0]; r=x.slot.r;}
      else{ m=/^(.+?)_R([12])\.f(?:ast)?q\.gz$/i.exec(x.name); if(m){ s=S.samples.filter(function(q){return q.code.toLowerCase()===m[1].toLowerCase()})[0]; r='R'+m[2]; } }
      if(!s||!r){ S.rejected.push({name:x.name}); return; }
      var f={name:x.name,size:x.size,st:'up',pct:0}; s.files[r]=f; S.uploads.push({key:++key,f:f,s:s});
      if(s.st==='wait') s.st='wait';
    });
    S.drawerOpen=true; render(true); startUpload();
  }
  function startUpload(){
    if(tUp) return;
    tUp=setInterval(function(){
      var act=S.uploads.filter(function(x){return x.f.st==='up'});
      act.slice(0,3).forEach(function(x){ x.f.pct=Math.min(100,x.f.pct+10+Math.random()*12); if(x.f.pct>=100){x.f.pct=100; x.f.st='ok'; sampleReady(x.s);} });
      if(!act.length){clearInterval(tUp); tUp=null;}
      var d=$('#dwr',host); if(d) d.innerHTML=drawer();
      if(!act.length||act.some(function(x){return x.f.st==='ok'})) { var cb=$('.fl-card__b',host); var t=cb?cb.scrollTop:0; render(true); }
    },260);
  }
  function sampleReady(s){ if(uploaded(s)&&s.st==='wait'){ s.st='queue'; pumpValidation(); } }
  function pumpValidation(){
    if(tVal) return;
    tVal=setInterval(function(){
      var run1=S.samples.filter(function(s){return s.st==='run'})[0];
      if(run1){ var r=resultFor(run1); run1.st=r.st; run1.reads=r.reads; render(true); return; }
      var nxt=S.samples.filter(function(s){return s.st==='queue'})[0];
      if(nxt){ nxt.st='run'; render(true); } else { clearInterval(tVal); tVal=null; }
    },900);
  }
  function demoFiles(){   /* complete files for every sample except the last (R2 missing), plus one unknown file */
    var out=[]; S.samples.forEach(function(s,i){ out.push({name:s.code+'_R1.fastq.gz',size:700+((i*37)%240)}); if(i<S.samples.length-1) out.push({name:s.code+'_R2.fastq.gz',size:700+((i*53)%260)}); });
    out.push({name:'unannotated_sample_001.fastq.gz',size:43}); return out;
  }

  /* ── dialogs ── */
  function detail(code){
    var s=S.samples.filter(function(x){return x.code===code})[0], t=ST[s.st];
    var chk=function(r){var f=s.files[r]; if(!f) return '<div class="fq-dd bad"><b>'+esc(s.code)+'_'+r+'.fastq.gz</b><div><span class="fq-ck bad">'+ico('x')+' File tidak ditemukan</span></div></div>';
      var bad=s.st==='fail'&&r==='R2'; return '<div class="fq-dd'+(bad?' bad':'')+'"><b>'+esc(f.name)+'</b><div><span class="fq-ck ok">'+ico('check')+' Transfer (MD5)</span>'+(bad?'<span class="fq-ck bad">'+ico('x')+' File tidak ditemukan</span>':'<span class="fq-ck ok">'+ico('check')+' Integritas FASTQ</span>')+'</div></div>';};
    var pct=Math.min(100,s.reads/THRESH*100*(s.st==='ok'?.7:1));
    var note=s.st==='ok'?'<span class="fq-ck ok">'+ico('check')+' Di atas threshold minimum — '+fmtReads(s.reads)+' ≥ '+fmtReads(THRESH)+' reads</span>':s.st==='low'?'<span class="fq-ck low">'+ico('tri')+' Di bawah threshold minimum — '+fmtReads(s.reads)+' dari '+fmtReads(THRESH)+' reads ('+Math.round(s.reads/THRESH*100)+'%)</span>':s.st==='fail'?'<div class="fq-bad">'+ico('x')+' Pemeriksaan integritas FASTQ gagal, estimasi reads tidak dapat dihitung. Sampel ini tidak dapat disertakan dalam analisis.</div>':'<span class="fq-ck">Menunggu validasi</span>';
    var m=modal('<div class="rn-modal__box fl-ed fq-dlg" role="dialog" aria-modal="true" aria-labelledby="dT"><div class="fl-ed__h"><div><h2 id="dT">'+esc(s.code)+'</h2><p>Validasi: EWS</p></div><button class="fl-ibx" type="button" data-x aria-label="Tutup">'+ico('x')+'</button></div><div class="fl-ed__b"><div class="fq-tags"><span class="fq-tag">'+s.layout+'</span><span class="fq-chip '+t[1]+'">'+t[0]+'</span></div><h4 class="fq-h">Pemeriksaan File</h4>'+chk('R1')+chk('R2')+'<h4 class="fq-h">Estimasi Reads (Non-Chimeric)</h4>'+(s.st==='fail'?'':'<div class="fq-rr"><b class="'+(s.st==='ok'?'g':'a')+'">'+fmtReads(s.reads)+' reads</b><span>Treshold: '+fmtReads(THRESH)+'</span></div><div class="fl-pb fq-pb '+(s.st==='ok'?'':'low')+'"><i style="width:'+pct+'%"></i></div>')+note+'</div><div class="fl-ed__f" style="justify-content:flex-end"><button class="rn-btn" type="button" data-x>Tutup</button></div></div>');
    m.el.addEventListener('click',function(e){ if(e.target.closest('[data-x]')) m.close(); }); $('[data-x]',m.el).focus();
  }
  function lowInfo(){
    var n=counts().low||2, m=modal('<div class="rn-modal__box fl-cd" style="width:500px" role="alertdialog" aria-modal="true" aria-labelledby="liT"><div class="fl-cd__b"><span class="fl-cd__ic fl-cd__ic--amber">'+ico('tri')+'</span><h2 id="liT">'+n+' sampel memiliki reads di bawah threshold</h2><p>Reads antara 1–'+fmtReads(THRESH-1)+' tidak memenuhi threshold minimum analisis ('+fmtReads(THRESH)+' reads). Sampel ini mungkin menghasilkan klasifikasi taksonomi yang tidak akurat atau tidak lengkap.</p><p>Anda tetap bisa melanjutkan dengan menyertakannya — tapi kredit tetap dipotong dan hasilnya menjadi tanggung jawab Anda. Tindakan tidak dapat dibatalkan setelah konfirmasi.</p></div><div class="fl-ed__f" style="justify-content:flex-end"><button class="rn-btn" type="button" data-x>Kembali</button></div></div>');
    m.el.addEventListener('click',function(e){ if(e.target.closest('[data-x]')) m.close(); }); $('[data-x]',m.el).focus();
  }
  function filesDialog(){
    var all=[]; S.samples.forEach(function(s){ ['R1','R2'].forEach(function(r){ var f=s.files[r]; if(f) all.push({n:f.name,sz:f.size,st:(s.st==='fail'&&r==='R2')?'fail':s.st==='low'?'low':'ok'}); }); }); S.rejected.forEach(function(x){all.push({n:x.name,sz:43,st:'fail'})});
    var cnt={ok:all.filter(function(x){return x.st==='ok'}).length,fail:all.filter(function(x){return x.st==='fail'}).length,low:all.filter(function(x){return x.st==='low'}).length};
    var tab='all', m=modal('<div class="rn-modal__box fl-ed fq-dlg" role="dialog" aria-modal="true" aria-labelledby="fT"><div class="fl-ed__h"><div><h2 id="fT">Daftar File yang Diunggah</h2><p>'+cnt.ok+' berhasil • '+cnt.fail+' ditolak • '+cnt.low+' reads rendah • Dikunci pada '+esc(S.lockedAt)+'</p></div><button class="fl-ibx" type="button" data-x aria-label="Tutup">'+ico('x')+'</button></div><div class="fq-tabs" role="tablist"></div><div class="fl-ed__b fq-fl"></div><div class="fl-ed__f" style="justify-content:flex-end"><button class="rn-btn" type="button" data-x>Tutup</button></div></div>');
    function draw(){
      var T=[['all','Semua',all.length],['ok','Berhasil',cnt.ok],['fail','Gagal',cnt.fail],['low','Reads Rendah',cnt.low]];
      $('.fq-tabs',m.el).innerHTML=T.map(function(x){return '<button type="button" role="tab" aria-selected="'+(tab===x[0])+'" data-t="'+x[0]+'">'+x[1]+' <i>'+x[2]+'</i></button>'}).join('');
      $('.fq-fl',m.el).innerHTML=all.filter(function(x){return tab==='all'||x.st===tab}).map(function(x){return '<div class="fq-fi"><span class="fq-ic '+(x.st==='ok'?'ok':x.st==='low'?'low':'bad')+'">'+(x.st==='ok'?ico('check'):x.st==='low'?ico('tri'):ico('x'))+'</span><div><b>'+esc(x.n)+'</b><span>'+x.sz+' MB</span></div><span class="fq-chip '+(x.st==='ok'?'chip-ok':x.st==='low'?'chip-low':'chip-fail')+'">'+(x.st==='ok'?'Berhasil':x.st==='low'?'Reads Rendah':'Gagal')+'</span></div>'}).join('')||'<p style="color:#828282;padding:12px">Tidak ada file.</p>';
    }
    draw(); m.el.addEventListener('click',function(e){ if(e.target.closest('[data-x]')) m.close(); var t=e.target.closest('[data-t]'); if(t){tab=t.dataset.t; draw();} });
  }
  function fastqGuide(){
    var m=modal('<div class="rn-modal__box fl-ed fq-dlg" role="dialog" aria-modal="true" aria-labelledby="gT"><div class="fl-ed__h"><div><h2 id="gT">Panduan Nama File FASTQ</h2><p>Nama file harus sesuai kode sampel agar terdeteksi otomatis</p></div><button class="fl-ibx" type="button" data-x aria-label="Tutup">'+ico('x')+'</button></div><div class="fl-ed__b"><p>Gunakan format <b>KODE-SAMPEL_R1.fastq.gz</b> dan <b>KODE-SAMPEL_R2.fastq.gz</b>.</p><div class="fl-gd__fmt" style="margin-top:12px"><p class="g">✓ ITB-PRK-001_R1.fastq.gz (valid)</p><p class="g">✓ ITB-PRK-001_R2.fq.gz (valid)</p><p class="r">✗ itb-prk-001_1.fastq (ditolak, bukan _R1/_R2 dan .gz)</p><p class="r">✗ sample_001_R1.fastq.gz (ditolak, kode tidak terdaftar)</p></div></div><div class="fl-ed__f" style="justify-content:flex-end"><button class="rn-btn" type="button" data-x>Tutup</button></div></div>');
    m.el.addEventListener('click',function(e){ if(e.target.closest('[data-x]')) m.close(); }); $('[data-x]',m.el).focus();
  }
  function lockIt(drop){
    if(drop&&drop.length) S.samples=S.samples.filter(function(s){return drop.indexOf(s.code)<0});
    var d=new Date(), p=function(n){return String(n).padStart(2,'0')}, mo=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
    S.locked=true; S.lockedAt=d.getDate()+' '+mo[d.getMonth()]+' '+d.getFullYear()+', '+p(d.getHours())+'.'+p(d.getMinutes())+' WIB'; render(true);
    toast('success','Submisi Dikunci','Data FASTQ dikunci dan siap dikonfirmasi.');
  }
  function next(){
    if(S.locked){ location.href='konfirmasi.html'; return; }
    var proc=S.samples.filter(function(s){return s.st==='run'||s.st==='queue'});
    var up=S.uploads.some(function(x){return x.f.st==='up'});
    if(proc.length||up){
      var m=modal('<div class="rn-modal__box fl-cd" style="width:500px" role="alertdialog" aria-modal="true" aria-labelledby="vT"><div class="fl-cd__b"><span class="fl-cd__ic" style="background:#eaf1ff;color:#2563eb"><i class="fq-spin"></i></span><h2 id="vT">Validasi Masih Berjalan</h2><p>Beberapa sampel masih dalam proses validasi. Harap tunggu hingga semua proses selesai untuk melanjutkan ke konfirmasi.</p><div class="fq-ls"><h4>Sampel Masih Diproses ('+Math.max(proc.length,1)+')</h4>'+proc.map(function(s){return '<div class="fq-li"><div><b>'+esc(s.code)+'</b><span>'+(s.st==='run'?'Sedang menghitung MD5 file R2…':'Menunggu antrian validasi')+'</span></div><span class="fq-chip '+(s.st==='run'?'chip-run':'chip-wait')+'">'+(s.st==='run'?'Validasi file berjalan':'Dalam antrian')+'</span></div>'}).join('')+'</div></div><div style="padding:12px"><button class="rn-btn rn-btn--primary rn-btn--block" type="button" data-x>Sembunyikan &amp; Tunggu</button></div></div>');
      m.el.addEventListener('click',function(e){ if(e.target.closest('[data-x]')) m.close(); }); $('[data-x]',m.el).focus(); return;
    }
    var inc=S.samples.filter(function(s){return !have(s)||s.st==='wait'});
    if(inc.length){
      var m2=modal('<div class="rn-modal__box fl-cd" style="width:500px" role="alertdialog" aria-modal="true" aria-labelledby="iT"><div class="fl-cd__b"><span class="fl-cd__ic fl-cd__ic--amber">'+ico('tri')+'</span><h2 id="iT">Sampel Belum Lengkap</h2><p>'+inc.length+' dari '+S.samples.length+' sampel belum memiliki file FASTQ lengkap. Lengkapi dulu sebelum melanjutkan ke konfirmasi, atau lanjutkan tanpa '+inc.length+' sampel tersebut.</p><div class="fq-ls"><h4>Sampel Belum Lengkap ('+inc.length+')</h4>'+inc.map(function(s){var miss=(!s.files.R1&&!s.files.R2)?'Belum ada file R1 dan R2':!s.files.R1?'Belum ada file R1':'Belum ada file R2'; return '<div class="fq-li"><div><b>'+esc(s.code)+'</b><span>'+miss+'</span></div><span class="fq-chip chip-wait" style="background:#fef3e2;color:#a66800">Menunggu file</span></div>'}).join('')+'</div></div><div class="fl-cd__f"><button class="rn-btn" type="button" data-x>Lengkapi Dulu</button><button class="rn-btn rn-btn--primary" type="button" data-go>Lanjutkan Tanpa '+inc.length+' Sampel</button></div></div>');
      m2.el.addEventListener('click',function(e){ if(e.target.closest('[data-x]')) m2.close(); else if(e.target.closest('[data-go]')) m2.close(function(){lockIt(inc.map(function(s){return s.code}))}); }); $('[data-x]',m2.el).focus(); return;
    }
    cdlg({tone:'amber',title:'Kunci Submisi FASTQ?',text:'Setelah dikunci, file dan daftar sampel tidak dapat diubah lagi.',cancel:'Batalkan',ok:'Ya, Kunci',onOk:function(){lockIt()}});
  }

  /* ── events ── */
  function openPicker(opt){ var i=document.createElement('input'); i.type='file'; if(!opt.single) i.multiple=true; i.accept='.gz,.fastq,.fq'; i.onchange=function(){ var fs=[].slice.call(i.files).map(function(f){return {name:f.name,size:Math.max(1,Math.round(f.size/1048576)),slot:opt.slot}}); if(fs.length) addFiles(fs); }; i.click(); }
  host.addEventListener('click',function(e){
    var t=e.target, a=t.closest('[data-a]'); if(!a){ return; }
    var k=a.dataset.a, i=+a.dataset.i;
    if(k==='rail'){S.rail=!S.rail; render(true);}
    else if(k==='guide'){e.preventDefault(); fastqGuide();}
    else if(k==='runinfo') toast('success',run.name,run.kit+' kredit digunakan dari '+balance+' kredit.');
    else if(k==='demo'){e.preventDefault(); e.stopPropagation(); addFiles(demoFiles());}
    else if(k==='up1') openPicker({single:true,slot:{c:a.dataset.c,r:a.dataset.r}});
    else if(k==='pg'){S.progOpen=!S.progOpen; render(true);}
    else if(k==='det'){e.preventDefault(); detail(a.dataset.c);}
    else if(k==='delall') cdlg({tone:'red',title:'Hapus Semua File?',text:'Semua file FASTQ yang sudah diunggah akan dihapus dari daftar sampel. Tindakan ini tidak dapat dibatalkan.',cancel:'Batal',ok:'Hapus Semua',danger:true,onOk:function(){ S.samples.forEach(function(s){s.files={R1:null,R2:null}; s.st='wait'; s.reads=0;}); S.uploads=[]; S.rejected=[]; clearInterval(tUp); clearInterval(tVal); tUp=tVal=null; render(true); }});
    else if(k==='refresh'){ toast('success','Status Diperbarui','Status validasi sampel sudah yang terbaru.'); }
    else if(k==='fadd'){ S.fAdd=!S.fAdd; S.fOpen=null; render(true); }
    else if(k==='fpick'){ S.f.push({k:a.dataset.k,v:''}); S.fAdd=false; S.fOpen=S.f.length-1; render(true); var q=$('#fq',host); if(q) q.focus(); }
    else if(k==='fchip'){ S.fOpen=S.fOpen===i?null:i; S.fAdd=false; render(true); var q2=$('#fq',host); if(q2) q2.focus(); }
    else if(k==='fdel'){ S.f.splice(i,1); S.fOpen=null; render(true); }
    else if(k==='freset'){ S.f=[]; S.fOpen=null; S.fAdd=false; render(true); }
    else if(k==='seelow'){ S.f=[{k:'st',v:'Reads Rendah'}]; S.fOpen=null; render(true); }
    else if(k==='dtoggle'){ S.drawerOpen=!S.drawerOpen; upd(); }
    else if(k==='dclose'){ S.uploads=S.uploads.filter(function(x){return x.f.st!=='ok'}); S.rejected=[]; upd(); }
    else if(k==='ucancel'){ var u=S.uploads.filter(function(x){return x.key===+a.dataset.k})[0]; if(u){ Object.keys(u.s.files).forEach(function(r){ if(u.s.files[r]===u.f) u.s.files[r]=null; }); S.uploads=S.uploads.filter(function(x){return x!==u}); render(true); } }
    else if(k==='ucancelall'){ S.uploads.filter(function(x){return x.f.st==='up'}).forEach(function(u){ Object.keys(u.s.files).forEach(function(r){ if(u.s.files[r]===u.f) u.s.files[r]=null; }); }); S.uploads=S.uploads.filter(function(x){return x.f.st==='ok'}); render(true); toast('success','Unggahan Dibatalkan','File yang belum selesai dibatalkan.'); }
    else if(k==='rdel'){ S.rejected=S.rejected.filter(function(x){return x.name!==a.dataset.n}); upd(); }
    else if(k==='files'){ e.preventDefault(); filesDialog(); }
    else if(k==='lowinfo'){ e.preventDefault(); lowInfo(); }
    else if(k==='back'){ location.href='identifikasi.html'; }
    else if(k==='next') next();
  });
  host.addEventListener('input',function(e){ var t=e.target; if(t.dataset.a==='fq'){ S.f[+t.dataset.i].v=t.value; render(true); var q=$('#fq',host); q.focus(); q.setSelectionRange(q.value.length,q.value.length); } });
  host.addEventListener('change',function(e){ if(e.target.id==='fi'){ var fs=[].slice.call(e.target.files).map(function(f){return {name:f.name,size:Math.max(1,Math.round(f.size/1048576))}}); if(fs.length) addFiles(fs); } });
  host.addEventListener('dragover',function(e){var z=e.target.closest('#dz'); if(z){e.preventDefault(); z.classList.add('is-over');}});
  host.addEventListener('dragleave',function(e){var z=e.target.closest('#dz'); if(z) z.classList.remove('is-over');});
  host.addEventListener('drop',function(e){var z=e.target.closest('#dz'); if(z){e.preventDefault(); var fs=[].slice.call(e.dataTransfer.files).map(function(f){return {name:f.name,size:Math.max(1,Math.round(f.size/1048576))}}); if(fs.length) addFiles(fs);}});
  host.addEventListener('keydown',function(e){ var z=e.target.closest&&e.target.closest('#dz'); if(z&&(e.key==='Enter'||e.key===' ')){e.preventDefault(); $('#fi',host).click();} });
  document.addEventListener('mousedown',function(e){ if((S.fOpen!==null||S.fAdd)&&!e.target.closest('.fl-fw')&&!e.target.closest('.fq-fbtn')){ S.fOpen=null; S.fAdd=false; render(true); } });
  render();
})();
