/* Run workflow page: step 1, Identifikasi Sampel (Figma 4697:163412). Shared pieces live in flow-common.js. */
(function(){
  var F=Flow, $=F.$, esc=F.esc, ico=F.ico, toast=F.toast, modal=F.modal, cdlg=F.cdlg, run=F.run, balance=F.balance, band=F.band, sel=F.sel;
  var progress=function(){return F.progress(S.rail,1)};
  var ORG=['Homo Sapiens (Manusia)','Litopenaeus vannamei (Udang Vaname)','Mus musculus (Mencit)','Bos taurus (Sapi)','Gallus gallus (Ayam)','Lainnya'];
  var TYPE=['Stool (Feses)','Swab','Shrimp Gut (Usus Udang)','Soil (Tanah)','Water (Air)','Blood (Darah)'];
  var S={rail:false,view:'choose',tried:false,samples:[],sel:{},file:null,pct:0,rows:[],f:[],fOpen:null,fAdd:false,menu:null};
  var FL=[['code','Kode Sampel'],['org','Organisme'],['type','Jenis Sampel'],['layout','Library Layout']];
  var shown=function(){return S.rows.map(function(r,i){return {r:r,i:i}}).filter(function(x){return S.f.every(function(f){return !f.v||String(x.r[f.k]).toLowerCase().indexOf(f.v.toLowerCase())>-1})})};
  var newSample=function(){return {code:'',org:'',type:'',layout:'',touched:false}};
  var ok=function(x){return x.code.trim()&&x.org&&x.type&&x.layout};

  /* ── pieces ── */
  /* ── views ── */
  function vChoose(){
    var li=function(t){return '<li>'+ico('ccheck')+t+'</li>'};
    return {h:'<div><h2>Masukkan Data Identifikasi Sampel</h2><p>Data ini akan digunakan untuk identifikasi &amp; pencocokan FASTQ</p></div><button class="fl-ib" type="button" data-a="help" aria-label="Info">'+ico('info')+'</button>',
      b:'<div class="fl-ch"><section class="fl-opt fl-opt--xl"><div class="fl-opt__c"><span class="fl-opt__ic">'+ico('sheet')+'</span><div><h3>Template Excel</h3><p class="fl-opt__s">Untuk submisi dengan 10+ sampel</p></div><h4>Keuntungan:</h4><ul>'+['Lebih cepat untuk banyak sampel','Bisa dikerjakan offline','Mudah di-copy dari file lain','Validasi otomatis setelah unggah'].map(li).join('')+'</ul></div><div class="fl-opt__f"><button class="rn-btn" type="button" data-a="tpl">Download Template</button><button class="rn-btn rn-btn--primary" type="button" data-a="upview">Upload Template</button></div></section>'+
      '<section class="fl-opt fl-opt--web"><div class="fl-opt__c"><span class="fl-opt__ic">'+ico('edit')+'</span><div><h3>Formulir Web</h3><p class="fl-opt__s">Untuk submisi dengan 1-5 sampel</p></div><h4>Keuntungan:</h4><ul>'+['Panduan langkah demi langkah','Validasi real-time','Dropdown untuk organisme','Lebih mudah untuk pemula'].map(li).join('')+'</ul></div><div class="fl-opt__f"><button class="rn-btn rn-btn--primary" type="button" data-a="formview">Isi Formulir</button></div></section></div>'};
  }
  function sampleCard(x,i){
    var show=S.tried||x.touched, done=ok(x), bad=show&&!done;
    var e=function(f,m){return show&&!x[f]?'<p class="fl-er">'+ico('warn')+m+'</p>':''};
    return '<article class="fl-sm" data-i="'+i+'"><div class="fl-sm__h"><span class="i">'+(i+1)+'</span><b>SAMPLE-'+String(i+1).padStart(2,'0')+'</b>'+(done?'<span class="fl-bg fl-bg--ok">Valid</span>':bad?'<span class="fl-bg fl-bg--bad">Belum Lengkap</span>':'')+'<span class="sp"></span><button class="rn-btn" type="button" data-a="dup" data-i="'+i+'">'+ico('copy')+'Duplikat</button><button class="fl-ib" type="button" data-a="del" data-i="'+i+'" aria-label="Hapus SAMPLE-'+String(i+1).padStart(2,'0')+'" style="color:#dc2626">'+ico('trash')+'</button></div>'+
      '<div class="fl-sm__b"><div class="fl-f"><label for="c'+i+'">Kode Sampel <span class="rq" aria-hidden="true">*</span></label><input class="fl-in'+(show&&!x.code.trim()?' is-bad':'')+'" id="c'+i+'" data-f="code" data-i="'+i+'" placeholder="Isi Kode Sampel" value="'+esc(x.code)+'" autocomplete="off">'+(show&&!x.code.trim()?'<p class="fl-er">'+ico('warn')+'Kode sampel wajib diisi</p>':'<p class="fl-eg">Cth. ABC-123-XYZ</p>')+'</div>'+
      '<div class="fl-f"><span class="lb">Organisme <span class="rq" aria-hidden="true">*</span></span>'+sel('org'+i,x.org,ORG,'Pilih Organisme',show&&!x.org)+(show&&!x.org?'<p class="fl-er">'+ico('warn')+'Organisme wajib dipilih</p>':'<p class="fl-eg">Cth. Homo sapiens</p>')+'</div>'+
      '<div class="fl-f"><span class="lb">Jenis Sampel <span class="rq" aria-hidden="true">*</span></span>'+sel('type'+i,x.type,TYPE,'Pilih Jenis Sampel',show&&!x.type)+(show&&!x.type?'<p class="fl-er">'+ico('warn')+'Jenis sampel wajib dipilih</p>':'<p class="fl-eg">Cth. Swab</p>')+'</div>'+
      '<div class="fl-f"><span class="lb">Library Layout <span class="rq" aria-hidden="true">*</span></span><div class="fl-rd" role="radiogroup"><label><input type="radio" name="l'+i+'" data-f="layout" data-i="'+i+'" value="Paired-end"'+(x.layout==='Paired-end'?' checked':'')+'>Paired-end</label><label><input type="radio" name="l'+i+'" data-f="layout" data-i="'+i+'" value="Single-end"'+(x.layout==='Single-end'?' checked':'')+'>Single-end</label></div>'+(show&&!x.layout?'<p class="fl-er">'+ico('warn')+'Library layout wajib dipilih</p>':'')+'</div></div></article>';
  }
  function vForm(){
    return {h:'<div><h2>Entri Data Identifikasi</h2><p>Isi data untuk setiap sampel yang akan Anda analisis</p></div><div class="fl-acts"><button class="rn-btn rn-btn--danger" type="button" data-a="delall">'+ico('trash')+'Hapus Semua Sampel</button><button class="rn-btn rn-btn--primary" type="button" data-a="add">'+ico('plus')+'Tambah Sampel</button></div>',
      b:'<div class="fl-sl">'+S.samples.map(sampleCard).join('')+'</div>'};
  }
  function vUpload(){
    return {h:'<div><h2>Upload Template Data Identifikasi</h2><p>Upload spreadsheet data identifikasi Anda yang sudah diisi</p></div><button class="rn-btn" type="button" data-a="tpl">'+ico('dl')+'Download Template</button>',
      b:'<label class="fl-dz" id="dz" tabindex="0">'+ico('up')+'<b>Seret dan lepas untuk mengunggah, atau Cari file...</b><span>Atau klik untuk memilih file • Format: .xlsx, .xls, .csv • Maks. 5 GB per file</span><input class="sr-only" id="fi" type="file" accept=".xlsx,.xls,.csv"></label>'};
  }
  function fileRow(done){
    var mb=S.file?(S.file.size/1048576):2.3, tot=Math.max(mb,.1);
    return '<div class="fl-fr"><div class="fl-fr__t"><span class="fl-fr__ic">'+ico('sheet')+'</span><div><b>'+esc(S.file?S.file.name:'sample_identifiers.xlsx')+'</b><span>'+(done?'Selesai diunggah • ':'Mengunggah... '+S.pct+'% • ')+(done?tot.toFixed(1)+' MB':(tot*S.pct/100).toFixed(1)+' MB dari '+tot.toFixed(1)+' MB')+'</span></div>'+(done?'<span class="fl-bg fl-bg--ok">Validasi Selesai</span>':'<span class="fl-bg" style="background:#eaf1ff;color:#2563eb">Mengunggah</span>')+'</div><div class="fl-pb" role="progressbar" aria-valuenow="'+(done?100:S.pct)+'" aria-valuemin="0" aria-valuemax="100"><i style="width:'+(done?100:S.pct)+'%"></i></div></div>';
  }
  function vUploading(){
    return {h:'<div><h2>Hasil File Unggah Sampel</h2><p>File sedang diunggah dan divalidasi</p></div><button class="rn-btn rn-btn--danger" type="button" data-a="cancelup">Batalkan Unggah</button>',b:fileRow(false)};
  }
  var cnt=function(){var c={valid:0,warn:0,err:0};S.rows.forEach(function(r){c[r.s==='w'?'warn':r.s==='e'?'err':'valid']++}); return c};
  function filterBar(){
    var chips=S.f.map(function(f,i){var lab=FL.filter(function(x){return x[0]===f.k})[0][1], open=S.fOpen===i;
      return '<span class="fl-fw"><button class="fl-fc'+(f.v?' is-on':'')+'" type="button" data-a="fchip" data-i="'+i+'" aria-expanded="'+open+'">'+lab+(f.v?': '+esc(f.v):'')+ico('down')+'</button>'+
        (open?'<div class="fl-pop fl-pop--f" role="dialog" aria-label="Filter '+lab+'"><div class="fl-pop__h"><b>'+lab+'</b><button class="fl-ibx" type="button" data-a="fdel" data-i="'+i+'" aria-label="Hapus filter '+lab+'">'+ico('trash')+'</button></div><div class="fl-pop__s">'+ico('search')+'<input id="fq" data-a="fq" data-i="'+i+'" placeholder="Search" value="'+esc(f.v)+'" autocomplete="off"></div></div>':'')+'</span>';}).join('');
    var used=S.f.map(function(f){return f.k}), avail=FL.filter(function(x){return used.indexOf(x[0])<0});
    return '<div class="fl-fb">'+chips+(avail.length?'<span class="fl-fw"><button class="fl-fadd" type="button" data-a="fadd" aria-expanded="'+S.fAdd+'">'+ico('plus')+'Filter</button>'+(S.fAdd?'<div class="fl-pop fl-pop--m" role="menu">'+avail.map(function(x){return '<button type="button" role="menuitem" data-a="fpick" data-k="'+x[0]+'">'+x[1]+'</button>'}).join('')+'</div>':'')+'</span>':'')+(S.f.length?'<button class="fl-reset" type="button" data-a="freset">Reset</button>':'')+'</div>';
  }
  function vDone(){
    var c=cnt(), n=S.rows.length, nsel=Object.keys(S.sel).filter(function(k){return S.sel[k]}).length, list=shown();
    var rows=list.map(function(x){var r=x.r,i=x.i,on=!!S.sel[i];
      return '<tr class="'+(r.s==='w'?'w':r.s==='e'?'e':'')+(on?' is-sel':'')+'"><td><input type="checkbox" data-a="pick" data-i="'+i+'" aria-label="Pilih '+esc(r.code)+'"'+(on?' checked':'')+'></td><td>'+esc(r.code)+'</td><td>'+esc(r.org)+'</td><td>'+esc(r.type)+'</td><td>'+esc(r.layout)+'</td><td style="text-align:center"><button class="fl-dots" type="button" data-a="menu" data-i="'+i+'" aria-haspopup="menu" aria-expanded="'+(S.menu===i)+'" aria-label="Aksi '+esc(r.code)+'">'+ico('dots')+'</button></td></tr>'+(r.note?'<tr class="note '+r.s+'"><td colspan="6">'+ico('warn').replace('class="rn-i s"','class="rn-i s" style="font-size:11px;vertical-align:-1px;margin-right:6px"')+esc(r.note)+'</td></tr>':'');}).join('')||'<tr><td colspan="6" style="text-align:center;padding:24px;color:#828282">Tidak ada sampel yang cocok dengan filter.</td></tr>';
    return {h:'<div><h2>Hasil File Unggah Sampel</h2></div><button class="rn-btn rn-btn--danger" type="button" data-a="reset">'+ico('reset')+'Reset Data Identifikasi</button>',
      b:fileRow(true)+'<section class="fl-vs"><div class="fl-vs__h"><div><h3>Ringkasan Validasi</h3><p>Redeem dan pemakaian kredit di Genetika dan Bioteknologi Molekuler</p></div><button class="rn-btn rn-btn--dangersolid" type="button" data-a="delsel"'+(nsel?'':' disabled')+'>'+ico('trash')+'Hapus Sampel'+(nsel?' ('+nsel+')':'')+'</button><button class="rn-btn rn-btn--primary" type="button" data-a="addrow">'+ico('plus')+'Tambah Sampel</button><input class="sr-only" id="fi2" type="file" accept=".xlsx,.xls,.csv" tabindex="-1" aria-hidden="true"></div>'+filterBar()+
      '<div class="fl-stats"><div class="fl-stat fl-stat--ok"><span>Valid</span><b>'+c.valid+'</b></div><div class="fl-stat fl-stat--w"><span>Warning</span><b>'+c.warn+'</b></div><div class="fl-stat fl-stat--e"><span>Error</span><b>'+c.err+'</b></div><div class="fl-stat fl-stat--t"><span>Total</span><b>'+n+'</b></div></div>'+
      '<div class="fl-tw"><table class="fl-tb"><thead><tr><th><input type="checkbox" data-a="pickall" aria-label="Pilih semua"'+(nsel&&nsel===n?' checked':'')+'></th><th>Kode Sampel</th><th>Organisme</th><th>Jenis Sampel</th><th>Library Layout</th><th style="text-align:center">Aksi</th></tr></thead><tbody>'+rows+'</tbody></table></div></section>'};
  }
  function mockRows(){   /* the validation result of an uploaded template: 143 valid, 2 warning, 1 error */
    var out=[], codes=['V-B-SG-1-KLA','V-B-SG-2-KLA','V-B-SG-3-KLA','V-C-SG-1-KLA'];
    for(var i=0;i<146;i++) out.push({code:codes[i%4].replace(/\d-KLA/,(1+i%9)+'-KLA'),org:'Litopenaeus vannamei',type:'Shrimp Gut',layout:'PAIRED_END',s:'v'});
    out[1].s='w'; out[1].note='Read depth rendah: 8.432 reads (diharapkan >20.000). Hasil analisis mungkin kurang akurat.';
    out[7].s='w'; out[7].note='Read depth rendah: 9.110 reads (diharapkan >20.000). Hasil analisis mungkin kurang akurat.';
    out[20].s='e'; out[20].note='Kode sampel duplikat dengan baris 4. Ubah atau hapus baris ini.';
    return out.slice(0,145);
  }

  /* ── footer + render ── */
  function footer(){
    var back='<button class="rn-btn" type="button" data-a="back">'+ico('left')+'Kembali</button>', v=S.view, left='', primary;
    if(v==='choose') primary='<button class="rn-btn rn-btn--primary" type="button" disabled>Lanjut Unggah Data Sampel'+ico('right')+'</button>';
    else if(v==='form'){
      var n=S.samples.length, good=S.samples.filter(ok).length, badn=n-good;
      left='<div class="fl-foot__l"><span class="fl-chip">Total '+n+' sampel</span>'+(good?'<span class="fl-chip fl-chip--ok">'+good+' Valid</span>':'')+(badn&&S.tried?'<span class="fl-chip fl-chip--bad">'+badn+' Belum Lengkap</span>':'')+'</div>';
      primary='<button class="rn-btn rn-btn--primary" type="button" data-a="save">'+(n&&!badn?'Lanjut Unggah Data Sampel':'Simpan Data Sampel')+ico('right')+'</button>';
    }else{
      var c=cnt(), can=v==='done'&&c.err===0;
      primary='<button class="rn-btn rn-btn--primary" type="button" data-a="next"'+(can?'':' disabled')+'>Lanjut ke Pipeline'+ico('right')+'</button>';
    }
    return '<footer class="fl-foot">'+left+back+primary+'</footer>';
  }
  var host=$('#fl');
  function render(keep){
    var v=({choose:vChoose,form:vForm,upload:vUpload,uploading:vUploading,done:vDone})[S.view]();
    var top=keep&&$('.fl-card__b',host)?$('.fl-card__b',host).scrollTop:0;
    host.innerHTML='<div class="fl-row">'+progress()+'<section class="fl-main">'+band()+'<div class="fl-card"><div class="fl-card__h">'+v.h+'</div><div class="fl-card__b">'+v.b+'</div></div></section></div>'+footer();
    var b=$('.fl-card__b',host); if(b&&top) b.scrollTop=top;
  }

  /* ── actions ── */
  function csv(){
    var blob=new Blob(['﻿Kode Sampel,Organisme,Jenis Sampel,Library Layout\nSAMPLE_01,Homo Sapiens (Manusia),Stool (Feses),Paired-end\n'],{type:'text/csv'});
    var a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='template-identifikasi-sampel.csv'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function(){URL.revokeObjectURL(a.href)},500);
  }
  var timer;
  function startUpload(f){
    S.file=f; S.pct=0; S.view='uploading'; render();
    clearInterval(timer); timer=setInterval(function(){
      S.pct=Math.min(100,S.pct+8+Math.round(Math.random()*6));
      if(S.pct>=100){clearInterval(timer); S.rows=mockRows(); S.sel={}; S.view='done'; render(); toast('success','Validasi Selesai','145 sampel dibaca dari '+(S.file.name)+'.'); }
      else{var fr=$('.fl-fr',host); if(fr) fr.outerHTML=fileRow(false);}
    },280);
  }
  var nextStep=function(){ if(S.view==='done'){ try{sessionStorage.setItem('nrd-samples',JSON.stringify(S.rows.slice(0,10).map(function(r){return {code:r.code}})))}catch(e){} } location.href='unggah-fastq.html'; };

  host.addEventListener('click',function(e){
    var t=e.target;
    var o=t.closest('.rn-sel2__o'), tr=t.closest('.rn-sel2__t');
    if(o){var w=o.closest('[data-sel]'), id=w.dataset.sel, m=id.match(/^(org|type)(\d+)$/); S.samples[+m[2]][m[1]]=o.dataset.v; closeSel(); render(true); return;}
    if(tr){var w2=tr.closest('[data-sel]'); toggleSel(w2); return;}
    closeSel();
    var a=t.closest('[data-a]'); if(!a) return;
    var k=a.dataset.a, i=+a.dataset.i;
    if(k==='rail'){S.rail=!S.rail; render(true);}
    else if(k==='runinfo') sheet();
    else if(k==='help') guide();
    else if(k==='guide'){e.preventDefault(); toast('success','Panduan Nama File FASTQ','Gunakan kode sampel yang sama dengan data identifikasi, mis. SAMPLE_01_R1.fastq.gz dan SAMPLE_01_R2.fastq.gz.');}
    else if(k==='tpl') csv();
    else if(k==='upview'){S.view='upload'; render();}
    else if(k==='formview'){S.view='form'; if(!S.samples.length) S.samples.push(newSample()); render();}
    else if(k==='add'){S.samples.push(newSample()); render(true); var ls=$('.fl-card__b',host); ls.scrollTop=ls.scrollHeight;}
    else if(k==='dup'){var s0=S.samples[i]; S.samples.splice(i+1,0,{code:s0.code,org:s0.org,type:s0.type,layout:s0.layout,touched:true}); render(true);}
    else if(k==='del'){ if(S.samples.length<=1){S.samples=[newSample()]; render(true);} else {S.samples.splice(i,1); render(true);} }
    else if(k==='delall') cdlg({tone:'red',title:'Hapus Semua Sampel',text:'Tindakan ini akan menghapus data yang sudah berhasil diinputkan.',cancel:'Batalkan',ok:'Ya, Hapus',danger:true,onOk:function(){S.samples=[newSample()]; S.tried=false; render();}});
    else if(k==='save'||k==='next'){
      if(S.view==='form'){S.tried=true; if(S.samples.length&&S.samples.every(ok)){ cdlg({tone:'amber',title:'Konfirmasi Batch Sample',text:'Anda akan menambahkan '+S.samples.length+' sample baru. Lanjutkan?',ok:'Ya, Lanjutkan',onOk:function(){ try{sessionStorage.setItem('nrd-samples',JSON.stringify(S.samples))}catch(x){} nextStep(); }}); } else {render(true); var b=$('.fl-in.is-bad,.rn-sel2__t.is-bad',host); if(b) b.focus();} }
      else nextStep();
    }
    else if(k==='back'){ if(S.view==='choose') location.href='run.html'; else {clearInterval(timer); S.view='choose'; S.tried=false; render();} }
    else if(k==='cancelup') cdlg({tone:'amber',title:'Batalkan Unggah Data?',text:'Tindakan ini akan menghapus data yang sedang diupload.',cancel:'Tidak',ok:'Ya, Batalkan',onOk:function(){clearInterval(timer); S.file=null; S.view='upload'; render();}});
    else if(k==='reset') cdlg({tone:'amber',title:'Reset Data Identifikasi?',text:'Hasil unggahan dan validasi akan dihapus. Anda perlu memilih metode identifikasi lagi.',cancel:'Batalkan',ok:'Ya, Reset',danger:true,onOk:function(){S.rows=[]; S.file=null; S.sel={}; S.view='choose'; render();}});
    else if(k==='pick'){S.sel[i]=a.checked; render(true);}
    else if(k==='pickall'){S.rows.forEach(function(r,j){S.sel[j]=a.checked}); render(true);}
    else if(k==='delsel'){var ks=Object.keys(S.sel).filter(function(x){return S.sel[x]}).map(Number); cdlg({tone:'red',title:'Hapus Sampel yang Dipilih',text:'Tindakan ini akan menghapus data sampel yang Anda pilih.',cancel:'Batalkan',ok:'Ya, Hapus',danger:true,onOk:function(){S.rows=S.rows.filter(function(r,j){return ks.indexOf(j)<0}); S.sel={}; render(true);}});}
    else if(k==='addrow') $('#fi2',host).click();
    else if(k==='menu'){ S.menu=i; showMenu(i,a); }
    else if(k==='fchip'){ S.fOpen=S.fOpen===i?null:i; S.fAdd=false; render(true); var q=$('#fq',host); if(q) q.focus(); }
    else if(k==='fadd'){ S.fAdd=!S.fAdd; S.fOpen=null; render(true); }
    else if(k==='fpick'){ S.f.push({k:a.dataset.k,v:''}); S.fAdd=false; S.fOpen=S.f.length-1; render(true); var q2=$('#fq',host); if(q2) q2.focus(); }
    else if(k==='fdel'){ S.f.splice(i,1); S.fOpen=null; render(true); }
    else if(k==='freset'){ S.f=[]; S.fOpen=null; S.fAdd=false; render(true); }
  });
  host.addEventListener('input',function(e){
    var t=e.target;
    if(t.dataset.a==='fq'){ S.f[+t.dataset.i].v=t.value; render(true); var q=$('#fq',host); q.focus(); q.setSelectionRange(q.value.length,q.value.length); return; }
    var f=t.dataset.f; if(!f) return; var x=S.samples[+t.dataset.i];
    if(f==='code'){x.code=t.value; x.touched=true; if(t.classList.contains('is-bad')&&t.value.trim()){render(true); var n=$('#c'+t.dataset.i,host); if(n){n.focus(); n.setSelectionRange(n.value.length,n.value.length);}} else refreshFoot();}
  });
  host.addEventListener('change',function(e){
    var t=e.target;
    if(t.dataset.f==='layout'){S.samples[+t.dataset.i].layout=t.value; S.samples[+t.dataset.i].touched=true; render(true);}
    else if(t.id==='fi'&&t.files[0]) startUpload(t.files[0]);
    else if(t.id==='fi2'&&t.files[0]){ var nn=12, fn=t.files[0].name; t.value=''; cdlg({tone:'amber',title:'Konfirmasi Batch Sample',text:'Anda akan menambahkan '+nn+' sample baru. Lanjutkan?',ok:'Ya, Lanjutkan',onOk:function(){ for(var q=0;q<nn;q++) S.rows.push({code:'V-N-SG-'+(q+1)+'-KLA',org:'Litopenaeus vannamei',type:'Shrimp Gut',layout:'PAIRED_END',s:'v'}); render(true); toast('success','Sampel Ditambahkan',nn+' sampel dari '+fn+' ditambahkan ke daftar.'); }}); }
  });
  var dz; host.addEventListener('dragover',function(e){var z=e.target.closest('#dz'); if(z){e.preventDefault(); z.classList.add('is-over');}});
  host.addEventListener('dragleave',function(e){var z=e.target.closest('#dz'); if(z) z.classList.remove('is-over');});
  host.addEventListener('drop',function(e){var z=e.target.closest('#dz'); if(z){e.preventDefault(); var f=e.dataTransfer.files[0]; if(f) startUpload(f);}});
  host.addEventListener('keydown',function(e){ if(e.key==='Escape') closeSel(); var z=e.target.closest&&e.target.closest('#dz'); if(z&&(e.key==='Enter'||e.key===' ')){e.preventDefault(); $('#fi',host).click();} });
  document.addEventListener('mousedown',function(e){
    if((S.fOpen!==null||S.fAdd)&&!e.target.closest('.fl-fw')){ S.fOpen=null; S.fAdd=false; render(true); }
  });
  function refreshFoot(){var f=$('.fl-foot',host); if(f) f.outerHTML=footer();}
  /* ── row action menu ── */
  var menuEl=null;
  function closeMenu(){ if(menuEl){menuEl.remove(); menuEl=null; document.removeEventListener('mousedown',menuOut,true); document.removeEventListener('keydown',menuKey);} if(S.menu!==null){S.menu=null; var b=$('[aria-expanded="true"].fl-dots',host); if(b) b.setAttribute('aria-expanded','false');} }
  function menuOut(e){ if(menuEl&&!menuEl.contains(e.target)) closeMenu(); }
  function menuKey(e){ if(e.key==='Escape') closeMenu(); }
  function showMenu(i,btn){
    closeMenu(); S.menu=i; btn.setAttribute('aria-expanded','true');
    menuEl=document.createElement('div'); menuEl.className='fl-pop fl-pop--m fl-pop--fixed'; menuEl.setAttribute('role','menu');
    menuEl.innerHTML='<button type="button" role="menuitem" data-m="edit">'+ico('edit')+'Ubah Sampel</button><button type="button" role="menuitem" data-m="del" style="color:#dc2626">'+ico('trash')+'Hapus</button>';
    document.body.appendChild(menuEl);
    var r=btn.getBoundingClientRect(); menuEl.style.top=Math.min(r.bottom+4,innerHeight-96)+'px'; menuEl.style.left=Math.max(8,r.right-menuEl.offsetWidth)+'px';
    menuEl.addEventListener('click',function(e){ var m=e.target.closest('[data-m]'); if(!m) return; closeMenu();
      if(m.dataset.m==='edit') editDialog(i);
      else cdlg({tone:'red',title:'Hapus Sampel yang Dipilih',text:'Tindakan ini akan menghapus data sampel yang Anda pilih.',cancel:'Batalkan',ok:'Ya, Hapus',danger:true,onOk:function(){ S.rows.splice(i,1); S.sel={}; render(true); toast('success','Sampel Dihapus','1 sampel dihapus dari daftar.'); }});
    });
    document.addEventListener('mousedown',menuOut,true); document.addEventListener('keydown',menuKey);
    var f=$('button',menuEl); if(f) f.focus();
  }
  /* ── edit one validated row ── */
  function editDialog(i){
    var r=S.rows[i], E={code:r.code,org:(ORG.filter(function(o){return o.indexOf(r.org)===0})[0])||r.org,type:(TYPE.filter(function(o){return o.indexOf(r.type)===0})[0])||r.type,layout:r.layout==='SINGLE_END'?'Single-end':'Paired-end',tried:false}, openS=null;
    function body(){
      var bc=E.tried&&!E.code.trim();
      return '<div class="fl-ed__g"><div class="fl-f"><label for="ec">Kode Sampel <span class="rq" aria-hidden="true">*</span></label><input class="fl-in'+(bc?' is-bad':'')+'" id="ec" value="'+esc(E.code)+'" autocomplete="off">'+(bc?'<p class="fl-er">'+ico('warn')+'Kode sampel wajib diisi</p>':'<p class="fl-eg">Cth. ABC-123-XYZ</p>')+'</div>'+
        '<div class="fl-f"><span class="lb">Organisme <span class="rq" aria-hidden="true">*</span></span>'+sel('eorg',E.org,ORG,'Pilih Organisme',false)+'<p class="fl-eg">Cth. Homo sapiens</p></div>'+
        '<div class="fl-f"><span class="lb">Jenis Sampel <span class="rq" aria-hidden="true">*</span></span>'+sel('etype',E.type,TYPE,'Pilih Jenis Sampel',false)+'<p class="fl-eg">Cth. Swab</p></div>'+
        '<div class="fl-f"><span class="lb">Library Layout <span class="rq" aria-hidden="true">*</span></span><div class="fl-rd" role="radiogroup"><label><input type="radio" name="el" value="Paired-end"'+(E.layout==='Paired-end'?' checked':'')+'>Paired-end</label><label><input type="radio" name="el" value="Single-end"'+(E.layout==='Single-end'?' checked':'')+'>Single-end</label></div></div></div>';
    }
    var m=modal('<div class="rn-modal__box fl-ed" role="dialog" aria-modal="true" aria-labelledby="edT"><div class="fl-ed__h"><div><h2 id="edT">Edit Data Identifikasi</h2><p>Ubah data identifikasi sampel</p></div><button class="fl-ibx" type="button" data-x aria-label="Tutup">'+ico('x')+'</button></div><div class="fl-ed__b" id="edb">'+body()+'</div><div class="fl-ed__f"><button class="rn-btn rn-btn--quiet" type="button" data-x>Batalkan</button><button class="rn-btn rn-btn--primary" type="button" id="edsave">Simpan Perubahan</button></div></div>');
    var bd=$('#edb',m.el);
    function redraw(){ bd.innerHTML=body(); }
    m.el.addEventListener('click',function(e){
      if(e.target.closest('[data-x]')){ m.close(); return; }
      var o=e.target.closest('.rn-sel2__o'), t=e.target.closest('.rn-sel2__t');
      if(o){ var id=o.closest('[data-sel]').dataset.sel; E[id==='eorg'?'org':'type']=o.dataset.v; openS=null; redraw(); return; }
      if(t){ var w=t.closest('[data-sel]'), was=openS===w; if(openS){ $('.rn-sel2__pop',openS).hidden=true; openS=null; } if(!was){ var p=$('.rn-sel2__pop',w); p.hidden=false; openS=w; var rc=t.getBoundingClientRect(); p.style.left=rc.left+'px'; p.style.width=rc.width+'px'; p.style.top=(rc.bottom+8)+'px'; } return; }
      if(openS&&!e.target.closest('.rn-sel2__pop')){ $('.rn-sel2__pop',openS).hidden=true; openS=null; }
      if(e.target.id==='edsave'){
        E.code=$('#ec',m.el).value; E.tried=true;
        if(!E.code.trim()){ redraw(); $('#ec',m.el).focus(); return; }
        cdlg({tone:'amber',title:'Konfirmasi Edit Sample',text:'Apakah Anda yakin ingin menyimpan perubahan pada data identifikasi sampel ini?',cancel:'Batalkan',ok:'Ya, Simpan',onOk:function(){
          var dup=S.rows.some(function(x,j){return j!==i&&x.code===E.code.trim()});
          S.rows[i]={code:E.code.trim(),org:E.org.split(' (')[0],type:E.type.split(' (')[0],layout:E.layout==='Single-end'?'SINGLE_END':'PAIRED_END',s:dup?'e':'v',note:dup?'Kode sampel duplikat dengan baris lain. Ubah atau hapus baris ini.':''};
          m.close(); render(true); toast('success','Perubahan Disimpan','Data identifikasi '+E.code.trim()+' diperbarui.');
        }});
      }
    });
    m.el.addEventListener('change',function(e){ if(e.target.name==='el'){ E.layout=e.target.value; } });
    m.el.addEventListener('input',function(e){ if(e.target.id==='ec') E.code=e.target.value; });
    $('#ec',m.el).focus();
  }
  /* ── guide dialog (Panduan Daftar Sampel) ── */
  function guide(){
    var m=modal('<div class="rn-modal__box fl-gd" role="dialog" aria-modal="true" aria-labelledby="gdT"><div class="fl-ed__h"><div><h2 id="gdT">Panduan Daftar Sampel</h2><p>Cara mengisi data identifikasi sampel dengan benar</p></div><button class="fl-ibx" type="button" data-x aria-label="Tutup">'+ico('x')+'</button></div>'+
      '<div class="fl-ed__b fl-gd__b"><div class="fl-gd__two"><div class="fl-gd__c"><b>Template Excel</b><p>10+ sampel. Download, isi offline, upload.</p></div><div class="fl-gd__c"><b>Formulir Web</b><p>1-5 sampel. Isi langsung dengan dropdown.</p></div></div>'+
      '<h3>Field Wajib per Sampel</h3><table class="fl-gd__t"><thead><tr><th>FIELD</th><th>KETERANGAN</th><th>CONTOH</th></tr></thead><tbody><tr><td>Kode Sampel</td><td>Unik. Huruf, angka, tanda hubung.</td><td>SAMP-001</td></tr><tr><td>Organism</td><td>Pilih dari daftar atau "Other".</td><td>Homo sapiens</td></tr><tr><td>Jenis Sampel</td><td>Pilih dari daftar atau "Other".</td><td>Swab</td></tr><tr><td>Library Layout</td><td>Jenis sekuensing.</td><td>PAIRED_END</td></tr></tbody></table>'+
      '<h3>Format Kode Sampel</h3><div class="fl-gd__fmt"><div class="fl-gd__tags"><span>Huruf A-Z, a-z</span><span>Angka 0-9</span><span>Tanda hubung -</span></div><p>Tidak boleh ada spasi, underscore, atau double-dash (--).</p><p class="g">✓ SAMP-001 (valid)</p><p class="r">✗ samp-001 (ditolak, beda huruf kapital)</p><p class="r">✗ SAMP_001 (ditolak, underscore tidak diizinkan)</p></div></div>'+
      '<div class="fl-ed__f"><button class="rn-btn" type="button" data-x>Tutup</button></div></div>');
    m.el.addEventListener('click',function(e){ if(e.target.closest('[data-x]')) m.close(); });
    $('[data-x]',m.el).focus();
  }
  /* ── right sheet: Detail ── */
  function sheet(){
    var m=modal('<aside class="fl-sheet" role="dialog" aria-modal="true" aria-labelledby="shT"><div class="fl-sheet__h"><h2 id="shT">Detail</h2><button class="fl-ibx" type="button" data-x aria-label="Tutup">'+ico('x')+'</button></div><div class="fl-sheet__b">'+
      '<div class="fl-sheet__two"><div class="fl-mt"><span>Kredit Sisa</span><div><b>'+balance+'</b><i>kredit</i></div></div><div class="fl-mt"><span>Kredit Digunakan</span><div><b>'+run.kit+'</b><i>kredit</i></div></div></div>'+
      '<section class="fl-sheet__k"><h3>Keterangan</h3><dl><div><dt>Institusi</dt><dd>Institut Teknologi Bandung</dd></div><div><dt>ID Kelompok Studi</dt><dd>DIV-0231</dd></div><div><dt>Kelompok Studi</dt><dd>Genetika dan Bioteknologi Molekuler</dd></div><div class="own"><span class="av">OR</span><div><dt>Run Owner</dt><dd>Olivia Rhye</dd></div></div><div><dt>Jenis Analisis</dt><dd>BioMeSeq Metabarcoding</dd></div></dl></section></div></aside>','fl-sheetwrap');
    m.el.addEventListener('click',function(e){ if(e.target.closest('[data-x]')) m.close(); });
    $('[data-x]',m.el).focus();
  }
  /* select popover (same pattern as the create-run dialog) */
  var openSelEl=null;
  function closeSel(){ if(!openSelEl) return; var p=$('.rn-sel2__pop',openSelEl), t=$('.rn-sel2__t',openSelEl); p.hidden=true; t.setAttribute('aria-expanded','false'); t.classList.remove('is-open'); openSelEl=null; }
  function toggleSel(w){
    var was=openSelEl===w; closeSel(); if(was) return;
    var p=$('.rn-sel2__pop',w), t=$('.rn-sel2__t',w); p.hidden=false; t.setAttribute('aria-expanded','true'); t.classList.add('is-open'); openSelEl=w;
    var r=t.getBoundingClientRect(), h=p.offsetHeight||200, up=innerHeight-r.bottom<h+16&&r.top>innerHeight-r.bottom;
    p.style.left=r.left+'px'; p.style.width=r.width+'px'; p.style.top=(up?r.top-8-h:r.bottom+8)+'px';
  }
  host.addEventListener('scroll',closeSel,true); window.addEventListener('resize',closeSel);
  document.addEventListener('mousedown',function(e){ if(openSelEl&&!e.target.closest('[data-sel]')) closeSel(); });
  render();
})();
