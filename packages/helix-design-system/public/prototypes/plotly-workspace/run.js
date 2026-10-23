/* Run page — list + preview (nusantics-run-mock.html) and the separate empty state (nusantics-run-empty-mock.html).
   body[data-mode="list" | "empty"]. Language comes from the shared shell (HelixShell.onLang). */
(function(){
  var MODE=document.body.dataset.mode||'list';
  var ANALYSIS='nusantics-analisis-lanjutan-mock.html';
  var $=function(s,r){return (r||document).querySelector(s)};
  var esc=function(x){return String(x).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};

  /* ───────── Text ───────── */
  var TX={
    id:{
      page:'Run',crumb:'Run',study:'Kelompok Studi',studyName:'Genetika dan Bioteknologi Molekuler',role:'Role: Lead',roleSub:'Peneliti Utama',
      all:'Semua Run',total:function(n){return 'Total '+n+' Run'},done:function(n){return n+' Run Selesai'},proc:function(n){return n+' Run Diproses'},fail:function(n){return n+' Run Gagal'},
      filter:'Filter run',create:'Buat Run Baru',detail:'Lihat Detail',preview:'Lab Run Preview',
      draft:'Draft',proc_:'Diproses',fail_:'Gagal',done_:'Selesai',credit:function(n){return n+' kredit'},
      page_:function(p,n){return 'Page '+p+' of '+n},perPage:function(n){return n+' per page'},perPageLbl:'Jumlah per halaman',prev:'Previous',next:'Next',pageNav:'Navigasi halaman',goPage:function(n){return 'Halaman '+n},
      list:'Daftar run',
      pickT:'Pilih run untuk melihat detail',pickD:'Klik salah satu analisis di daftar sebelah kiri untuk mengetahui progress, status, atau melihat hasil akhir.',
      started:'Dimulai pada',eta:'Estimasi Selesai',finished:'Selesai pada',stopped:'Berhenti pada',remain:function(t){return '~'+t+' tersisa'},note:'Estimasi dapat berubah tergantung antrean server',
      passed:'Sampel Lolos',lowReads:'Sampel reads rendah disertakan',processed:'Sampel Diproses',used:'Kredit Digunakan',
      callT:'Sambil menunggu, siapkan metadata sampel',callD:'Pipeline berjalan otomatis di cloud, aman menutup browser. Gunakan waktu ini untuk menyiapkan metadata sampel, yaitu informasi kontekstual seperti lokasi, perlakuan, atau kondisi lingkungan yang akan membuka fitur analisis lanjutan saat pipeline selesai.',
      inProg:'Dalam Proses',waiting:'Menunggu',
      s1:'Identifikasi Sampel',s1d:'Data ini akan digunakan untuk mengidentifikasi dan mencocokkan file FASTQ Anda. Pastikan kode sampel sesuai dengan nama file FASTQ.',
      s2:'Unggah FASTQ & Validasi Data',s2d:'Unggah file FASTQ untuk sampel Anda. Nama file harus sesuai dengan kode sampel yang Anda daftarkan. Sistem akan memvalidasi file FASTQ Anda. Proses ini mungkin memakan waktu beberapa menit.',
      s3:'Analisis',s3d:'Jika ada yang ingin diubah, kembali ke step yang sesuai. Setelah konfirmasi, pipeline dimulai dan kredit langsung dipotong.',
      emptyT:'Belum ada run',emptyD:'Mulai analisis sampel pertama Anda dengan membuat run baru. Setiap run memakai kredit sesuai jumlah sampel yang dianalisis.',
      open:function(n){return 'Pilih run '+n},
      guide:'Panduan',nrT:'Buat Run Baru',nrS:'Konfigurasikan run sebelum mulai pengisian sampel',nrName:'Nama Run',nrNameErr:'Nama run wajib diisi',nrHint:'Kit menentukan jumlah sampel maksimum yang dapat dianalisis dalam satu run',nrKit:'Kit yang Digunakan',nrKitOpt:function(n){return 'BiomeSeq '+n+' reaksi'},nrNeed1:'Kit ini membutuhkan hingga ',nrNeed2:function(n){return n+' kredit'},nrNeed3:'. Saldo Anda cukup untuk menyelesaikan run ini.',nrGo:'Lanjut ke Pipeline',okT:function(n){return 'BiomeSeq 16S — '+n+' Reaksi terdeteksi'},okP:function(n){return n+' kredit akan ditambahkan ke akun Anda.'},dlgT:'Di mana Anda dapat menemukan SKU BiomeSeq Anda?',dlgP:'Temukan kode alfanumerik 16-digit di bagian belakang kartu aktivasi yang ada di dalam Kit BiomeSeq Anda. Cari kode alfanumerik 16-digit yang tercetak di belakang kartu aktivasi di dalam kotak kit Anda.',dlgHelp:'Butuh Bantuan?',dlgClose:'Tutup',skuWhere:'Di mana kode SKU saya?',buyQ:'Belum punya kit? ',buy:'Beli di sini',supQ:'Kode tidak terbaca? Hubungi Support',sup:'WhatsApp Support',gT:'Punya kit BiomeSeq? Kredit-mu sudah menunggu',gP:'Setiap kit BiomeSeq 16S rRNA NGS Kit Bundle yang Anda beli sudah termasuk kredit untuk analisis di Nusantics Research Dashboard. Masukkan kode SKU dari lembar insert produk di dalam kotak kit Anda untuk mengaktifkan kreditnya.',
      howT:'Cara menemukan kode SKU-mu:',how1:'Buka kotak kit BiomeSeq',how2:'Cari lembar insert produk, biasanya terselip di bagian atas kotak',how3:'Kode SKU tercetak di lembar tersebut, formatnya diawali dengan "NUS-BQ002"',
      noteP:'Kode terlihat seperti: NUS-BQ002.48-260601-ABC',kitAlt:'Kotak kit BiomeSeq dengan lembar insert berisi kode SKU',
      creditLeft:'Kredit Tersisa',history:'Lihat Riwayat Kredit',active:'kredit aktif',sku:'Kode SKU BiomeSeq',skuHelp:'Kredit dipotong hanya untuk sampel yang lolos validasi, jadi Anda masih bisa melanjutkan jika jumlah sampel aktual lebih sedikit.',
      redeem:'Redeem Kode SKU BiomeSeq',skuBad:'Format kode SKU tidak sesuai. Contoh: NUS-BQ002.48-260601-ABC',skuOk:function(n){return 'Berhasil! '+n+' kredit ditambahkan.'},
      afterT:'Setelah redeem, kamu bisa',locked:'Terkunci',opened:'Terbuka',f1:'Konfigurasi Run',f1d:'Pilih kit dan beri nama run-mu',f2:'Isi Data Sampel',f2d:'Upload metadata dan daftar sampelmu',f3:'Jalankan Pipeline',f3d:'Mulai analisis BiomeSeq otomatis'
    },
    en:{
      page:'Run',crumb:'Run',study:'Study Group',studyName:'Genetics and Molecular Biotechnology',role:'Role: Lead',roleSub:'Principal Investigator',
      all:'All Runs',total:function(n){return 'Total '+n+' Runs'},done:function(n){return n+' Completed'},proc:function(n){return n+' In Progress'},fail:function(n){return n+' Failed'},
      filter:'Filter runs',create:'New Run',detail:'View Detail',preview:'Lab Run Preview',
      draft:'Draft',proc_:'Processing',fail_:'Failed',done_:'Completed',credit:function(n){return n+' credit'+(n>1?'s':'')},
      page_:function(p,n){return 'Page '+p+' of '+n},perPage:function(n){return n+' per page'},perPageLbl:'Rows per page',prev:'Previous',next:'Next',pageNav:'Page navigation',goPage:function(n){return 'Page '+n},
      list:'Run list',
      pickT:'Select a run to see its details',pickD:'Click one of the analyses in the list on the left to check its progress, status, or see the final result.',
      started:'Started at',eta:'Estimated finish',finished:'Finished at',stopped:'Stopped at',remain:function(t){return '~'+t+' left'},note:'The estimate may change depending on the server queue',
      passed:'Samples Passed',lowReads:'Low-read samples included',processed:'Samples Processed',used:'Credits Used',
      callT:'While you wait, prepare the sample metadata',callD:'The pipeline runs automatically in the cloud, so it is safe to close the browser. Use this time to prepare the sample metadata — contextual information such as location, treatment or environmental conditions — which unlocks advanced analysis once the pipeline finishes.',
      inProg:'In Progress',waiting:'Waiting',
      s1:'Sample Identification',s1d:'This data is used to identify and match your FASTQ files. Make sure the sample codes match the FASTQ file names.',
      s2:'Upload FASTQ & Validate Data',s2d:'Upload the FASTQ files for your samples. File names must match the sample codes you registered. The system will validate your FASTQ files. This may take a few minutes.',
      s3:'Analysis',s3d:'If anything needs changing, go back to the relevant step. Once confirmed, the pipeline starts and the credits are deducted right away.',
      emptyT:'No runs yet',emptyD:'Start your first sample analysis by creating a new run. Each run uses credits based on the number of samples analysed.',
      open:function(n){return 'Select run '+n},
      guide:'Guide',nrT:'Create New Run',nrS:'Configure the run before you start entering samples',nrName:'Run Name',nrNameErr:'Run name is required',nrHint:'The kit sets the maximum number of samples that can be analysed in one run',nrKit:'Kit Used',nrKitOpt:function(n){return 'BiomeSeq '+n+' reactions'},nrNeed1:'This kit needs up to ',nrNeed2:function(n){return n+' credits'},nrNeed3:'. Your balance is enough to complete this run.',nrGo:'Continue to Pipeline',okT:function(n){return 'BiomeSeq 16S — '+n+' reactions detected'},okP:function(n){return n+' credits will be added to your account.'},dlgT:'Where can you find your BiomeSeq SKU?',dlgP:'Find the 16-character alphanumeric code on the back of the activation card inside your BiomeSeq Kit. Look for the 16-character alphanumeric code printed on the back of the activation card in your kit box.',dlgHelp:'Need help?',dlgClose:'Close',skuWhere:'Where is my SKU code?',buyQ:"Don't have a kit yet? ",buy:'Buy here',supQ:"Can't read the code? Contact Support",sup:'WhatsApp Support',gT:'Got a BiomeSeq kit? Your credits are already waiting',gP:'Every BiomeSeq 16S rRNA NGS Kit Bundle you buy already includes credits for analysis in the Nusantics Research Dashboard. Enter the SKU code from the product insert inside your kit box to activate them.',
      howT:'How to find your SKU code:',how1:'Open the BiomeSeq kit box',how2:'Look for the product insert, usually tucked in at the top of the box',how3:'The SKU code is printed on that sheet and starts with "NUS-BQ002"',
      noteP:'The code looks like: NUS-BQ002.48-260601-ABC',kitAlt:'BiomeSeq kit box with the insert sheet showing the SKU code',
      creditLeft:'Remaining Credits',history:'View Credit History',active:'active credits',sku:'BiomeSeq SKU code',skuHelp:'Credits are deducted only for samples that pass validation, so you can still continue if the actual number of samples is lower.',
      redeem:'Redeem BiomeSeq SKU Code',skuBad:'The SKU code format is not valid. Example: NUS-BQ002.48-260601-ABC',skuOk:function(n){return 'Done! '+n+' credits added.'},
      afterT:'After redeeming, you can',locked:'Locked',opened:'Unlocked',f1:'Configure Run',f1d:'Pick the kit and name your run',f2:'Fill in Sample Data',f2d:'Upload metadata and the list of your samples',f3:'Run the Pipeline',f3d:'Start the BiomeSeq analysis automatically'
    }
  };
  var LANG='id'; var t=function(k,a,b){var v=TX[LANG][k];return typeof v==='function'?v(a,b):v};

  /* ───────── Icons ───────── */
  var P={
    filter:'M3 6h18M7 12h10M10 18h4', plus:'M12 5v14M5 12h14', arrow:'M5 12h14M13 6l6 6-6 6', down:'m6 9 6 6 6-6',
    pen:'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z',
    users:'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
    book:'M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14zM20 17v4H6.5A2.5 2.5 0 0 1 4 19.5',
    info:'M12 11v5M12 8h.01',
    infoc:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 11v5M12 8h.01',
    bulb:'M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z',
    coin:'M12 8c4.4 0 8-1.300 8-3s-3.600-3-8-3-8 1.300-8 3 3.600 3 8 3zM4 5v4c0 1.700 3.600 3 8 3s8-1.300 8-3V5M4 9v4c0 1.700 3.600 3 8 3s8-1.300 8-3V9M4 13v4c0 1.700 3.600 3 8 3s8-1.300 8-3v-4',
    lock:'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4',
    gear:'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z',
    play:'M6 4l14 8-14 8z',
    check:'m7.5 12.5 3 3 6-6.5',
    tri:'M12 3 2 21h20L12 3zM12 10v5M12 18h.01',
    headset:'M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v5H5a1 1 0 0 1-1-1v-4zM20 14h-3v5h2a1 1 0 0 0 1-1v-4z',
    x:'M18 6 6 18M6 6l12 12',
    warn:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 7v6M12 16.5h.01',
    cart:'M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 8H6M10 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM18 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
    wa:'M3 21l1.7-5A8.5 8.5 0 1 1 8 19.3L3 21zM9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8c-1-.4-2-1.400-2.400-2.400l.8-1-1-2-1.900.6z',
    flask:'M10 2h4M14 2v6l5 10a2 2 0 0 1-1.800 3H6.800A2 2 0 0 1 5 18l5-10V2M7.500 15h9'
  };
  var ico=function(n,extra){return '<svg class="rn-i s'+(extra?' '+extra:'')+'" viewBox="0 0 24 24" aria-hidden="true"><path d="'+P[n]+'"/></svg>'};
  /* filled glyphs for the pending stepper (Figma uses solid react-icons there) */
  var PF={
    gear:'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z',
    flask:'M22.4 10 20.5 12 12 3.5 14 1.6zM13.650 5.250l5.100 5.100-8.400 8.400a3.600 3.600 0 0 1-5.100-5.100z',
    play:'M12 .5a11.500 11.500 0 1 0 0 23 11.500 11.500 0 0 0 0-23zM9.500 7l8 5-8 5z',
    doc:'M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM8 12h8v1.600H8zM8 15.500h8v1.600H8zM8 8.500h3v1.600H8z',
    lock:'M12 1.500a5 5 0 0 0-5 5V9H5.500A1.500 1.500 0 0 0 4 10.500v10A1.500 1.500 0 0 0 5.500 22h13a1.500 1.500 0 0 0 1.500-1.500v-10A1.500 1.500 0 0 0 18.500 9H17V6.500a5 5 0 0 0-5-5zM9 9V6.500a3 3 0 0 1 6 0V9z'
  };
  var fico=function(n){return '<svg class="rn-i f" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="'+PF[n]+'"/></svg>'};
  var solid=function(kind){  /* filled status glyphs */
    return kind==='done'
      ? '<svg class="rn-i" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m7.5 12.5 3 3 6-6.5" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      : '<svg class="rn-i" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m8.5 8.5 7 7M15.5 8.5l-7 7" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></svg>';
  };

  /* ───────── Data (mock) ───────── */
  var NAMES=['appconfigtrimprefix','mangrove-batch2','usus-kohortA','sedimen-pesisir','tanah-gambut','rhizosfer-padi'];
  var STATUS=['draft','proc','fail','done','done','done','proc','done','fail','done'];
  var RUNS=[]; for(var i=0;i<28;i++){
    var s=STATUS[i%STATUS.length], dt=new Date(2026,8,1-Math.floor(i/3)), d=dt.getFullYear()*10000+(dt.getMonth()+1)*100+dt.getDate();
    RUNS.push({name:d+'-'+NAMES[i%NAMES.length],code:'RUN-2609'+String(3-(i%3)).padStart(2,'0')+'-USU',id:'RUN-2026-'+String(22-i%23).padStart(4,'0'),owner:i%4===3?'Sari Wulandari':'Jason Limanjaya',date:(3-(i%3))+' Sep 2026, 16.49',credit:1+(i%4===1?2:0),status:s,
      started:'28 Apr 2026, 09:52 WIB',finished:'28 Apr 2026, 14:22 WIB',stopped:'28 Apr 2026, 16:49 WIB',startedClock:'09:52 WIB',etaClock:'14:22 WIB',min:270,ok:s==='fail'?1:(s==='proc'?4:27),low:2});
  }
  var state={page:1,per:10,sel:null};
  /* mock credit balance shared between pages (?credit=0 forces the no-credit flow) */
  var CREDIT_KEY='nusantics-credit-v2', CREDIT_PAGE='nusantics-run-credit-mock.html';
  function getCredit(){
    try{var v=localStorage.getItem(CREDIT_KEY); return v===null?0:+v;}catch(e){return 0;}
  }
  function setCredit(n){try{localStorage.setItem(CREDIT_KEY,String(n));}catch(e){}}
  (function(){var m=location.search.match(/[?&]credit=(\d+)/); if(m) setCredit(+m[1]);})();
  var count=function(st){return RUNS.filter(function(r){return r.status===st}).length};
  var dur=function(m){var h=Math.floor(m/60),mm=m%60;return (LANG==='id'?[h&&h+' jam',mm&&mm+' menit']:[h&&h+' h',mm&&mm+' min']).filter(Boolean).join(' ')};
  var stLabel={draft:'draft',proc:'proc_',fail:'fail_',done:'done_'};
  var badge=function(st){
    var ic=st==='draft'?ico('pen'):st==='proc'?'<span class="rn-spin" aria-hidden="true"></span>':st==='fail'?solid('fail'):solid('done');
    return '<span class="rn-st rn-st--'+st+'">'+ic+t(stLabel[st])+'</span>';
  };

  /* ───────── Pieces ───────── */
  function mini(){
    return '<div class="rn-mini">'+
      '<div class="rn-bg rn-bg--brand"><span>'+t('study')+'</span><span class="rn-pill rn-pill--brand">'+ico('book')+t('studyName')+'</span></div>'+
      '<div class="rn-bg rn-bg--blue"><span class="rn-pill rn-pill--blue">'+ico('users')+t('role')+'</span><span>'+t('roleSub')+'</span></div></div>';
  }
  function headBar(){
    return '<h2 class="rn-title" id="rnAllT">'+t('all')+'</h2><div class="rn-head-meta">'+
      '<span class="rn-chip rn-chip--blue">'+t('total',RUNS.length)+'</span><span class="rn-chip rn-chip--green">'+t('done',count('done'))+'</span>'+
      '<span class="rn-chip rn-chip--amber">'+t('proc',count('proc'))+'</span><span class="rn-chip rn-chip--red">'+t('fail',count('fail'))+'</span></div>'+
      '<div class="rn-head-actions"><button class="rn-ib" type="button" aria-label="'+t('filter')+'">'+ico('filter')+'</button>'+
      '<button class="rn-btn rn-btn--primary" type="button" data-create>'+ico('plus')+t('create')+'</button></div>';
  }
  function pages(n,p){
    if(n<=7){var a=[];for(var i=1;i<=n;i++)a.push(i);return a;}
    var out=[1];
    if(p<=3){out.push(2,3,'…',n-1,n);}
    else if(p>=n-2){out.push('…',n-2,n-1,n);}
    else{out.push('…',p-1,p,p+1,'…',n);}
    return out;
  }
  function pager(){
    var n=Math.ceil(RUNS.length/state.per), p=state.page;
    var nav='<button type="button" data-go="'+(p-1)+'"'+(p<=1?' disabled':'')+'>'+t('prev')+'</button>'+
      pages(n,p).map(function(x){return x==='…'?'<span class="rn-gap" aria-hidden="true">…</span>':'<button type="button" data-go="'+x+'"'+(x===p?' aria-current="page"':'')+' aria-label="'+t('goPage',x)+'">'+x+'</button>'}).join('')+
      '<button type="button" data-go="'+(p+1)+'"'+(p>=n?' disabled':'')+'>'+t('next')+'</button>';
    return '<div class="rn-pg"><div class="rn-pg__left"><span>'+t('page_',p,n)+'</span>'+
      '<label class="rn-select"><span class="sr-only">'+t('perPageLbl')+'</span><select id="rnPer">'+[10,20,50].map(function(v){return '<option value="'+v+'"'+(v===state.per?' selected':'')+'>'+t('perPage',v)+'</option>'}).join('')+'</select><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+P.down+'"/></svg></label></div>'+
      '<nav class="rn-pg__nav" aria-label="'+t('pageNav')+'">'+nav+'</nav></div>';
  }
  function row(r,i){
    var sel=state.sel===i;
    return '<li><div class="rn-row" data-i="'+i+'"'+(sel?' aria-current="true"':'')+'><div class="rn-row__in">'+
      '<button class="rn-sel" type="button" aria-pressed="'+sel+'" aria-label="'+esc(t('open',r.name))+'"><span class="rn-doc"><img src="assets/run-doc.png" alt=""></span>'+
      '<span class="rn-row__text"><span class="rn-row__name">'+esc(r.name)+'</span><span class="rn-row__meta">'+esc(r.code)+' • '+esc(r.owner)+' • '+esc(r.date)+' • '+t('credit',r.credit)+'</span></span></button>'+
      badge(r.status)+'<a class="rn-link" href="'+ANALYSIS+'">'+t('detail')+ico('arrow')+'</a></div></div></li>';
  }
  function chips(items){return '<div class="rn-counts">'+items.map(function(c){return '<span class="rn-count rn-count--'+c[0]+'">'+c[1]+'<b>'+c[2]+'</b></span>'}).join('')+'</div>'}
  function dl(parts){return '<dl class="rn-dl">'+parts.join('')+'</dl>'}
  function previewBody(r){
    var head='<h3 class="rn-pv-title">'+esc(r.name)+'</h3><p class="rn-pv-id">'+esc(r.id)+'</p>';
    if(r.status==='draft'){
      var step=function(n,now,tag,title,desc){return '<li class="rn-step'+(now?' rn-step--now':'')+'"><span class="rn-step__n">'+n+'</span><div><span class="rn-step__tag">'+tag+'</span><h3>'+title+'</h3><p>'+desc+'</p></div></li>'};
      return head+'<ol class="rn-steps" style="margin-top:16px">'+step(1,true,t('inProg'),t('s1'),t('s1d'))+step(2,false,t('waiting'),t('s2'),t('s2d'))+step(3,false,t('waiting'),t('s3'),t('s3d'))+'</ol>';
    }
    var art={proc:'run-processing.png',done:'run-done.png',fail:'run-failed.png'}[r.status], pos='right center', fit='cover';
    var info, extra='';
    if(r.status==='proc'){
      info=[['dt',t('started')],['dd',r.startedClock],['dt',t('eta')],['dd',r.etaClock],['r',t('remain',dur(r.min))],['n',t('note')]];
      extra='<hr class="rn-div">'+chips([['green',t('passed'),r.ok],['amber',t('lowReads'),r.low]])+'<hr class="rn-div"><div class="rn-callout"><span class="rn-callout__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="'+P.info+'"/></svg></span><div><h3>'+t('callT')+'</h3><p>'+t('callD')+'</p></div></div>';
    }else if(r.status==='done'){
      info=[['dt',t('finished')],['dd',r.finished],['dt',t('started')],['dd',r.started]];
      extra='<hr class="rn-div"><div class="rn-countrow">'+chips([['brand',t('processed'),r.ok]])+chips([['brand',t('used'),r.ok]])+'</div>';
    }else{
      info=[['dt',t('stopped')],['dd',r.stopped],['dt',t('started')],['dd',r.started]];
      extra='<hr class="rn-div">'+chips([['green',t('passed'),r.ok]]);
    }
    var dlh=dl(info.map(function(x){return x[0]==='dt'?'<dt>'+x[1]+'</dt>':x[0]==='dd'?'<dd>'+x[1]+'</dd>':x[0]==='r'?'<dd class="rn-remain">'+x[1]+'</dd>':'<dd class="rn-note">'+x[1]+'</dd>'}));
    return head+'<div class="rn-pv-main"><div class="rn-pv-art"><img src="assets/'+art+'" alt="" style="object-fit:'+fit+';object-position:'+pos+'">'+badge(r.status)+'</div>'+dlh+'</div>'+extra;
  }
  function preview(){
    var r=state.sel===null?null:RUNS[state.sel];
    var body=r?previewBody(r):'<div class="rn-empty"><div class="rn-empty__in"><img src="assets/microscope-illustration.svg" alt=""><div><h3>'+t('pickT')+'</h3><p>'+t('pickD')+'</p></div></div></div>';
    return '<section class="rn-card" aria-labelledby="rnPvT"><div class="rn-card__head"><h2 class="rn-title" id="rnPvT">'+t('preview')+'</h2></div><div class="rn-card__body" aria-live="polite">'+body+'</div>'+
      (r?'<div class="rn-card__foot"><a class="rn-btn rn-btn--primary rn-btn--block" href="'+ANALYSIS+'">'+t('detail')+ico('arrow')+'</a></div>':'')+'</section>';
  }

  /* ───────── Illustration (same anatomy + idle motion as Helix Illustration "lab-flask") ───────── */
  var FLASK='<svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M80 139C96.5685 139 110 136.761 110 134C110 131.239 96.5685 129 80 129C63.4315 129 50 131.239 50 134C50 136.761 63.4315 139 80 139Z" fill="#14171E" fill-opacity="0.08"/><path d="M70 32V72L38 122C34.6667 127.333 36 130 42 130H118C124 130 125.333 127.333 122 122L90 72V32H70Z" fill="#FEF2E9" stroke="#14171E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M64 32H96" stroke="#14171E" stroke-width="2.5" stroke-linecap="round"/><path d="M51 104H109L122 122C125.333 127.333 124 130 118 130H42C36 130 34.6667 127.333 38 122L51 104Z" fill="#F57E20"/><path d="M74 117.5C75.933 117.5 77.5 115.933 77.5 114C77.5 112.067 75.933 110.5 74 110.5C72.067 110.5 70.5 112.067 70.5 114C70.5 115.933 72.067 117.5 74 117.5Z" fill="#FEF2E9"/><path d="M92 123.8C93.5464 123.8 94.8 122.546 94.8 121C94.8 119.454 93.5464 118.2 92 118.2C90.4536 118.2 89.2 119.454 89.2 121C89.2 122.546 90.4536 123.8 92 123.8Z" fill="#FEF2E9"/><path d="M80 83C81.6569 83 83 81.6569 83 80C83 78.3431 81.6569 77 80 77C78.3431 77 77 78.3431 77 80C77 81.6569 78.3431 83 80 83Z" fill="#476142"/><path d="M72 54.5C73.3807 54.5 74.5 53.3807 74.5 52C74.5 50.6193 73.3807 49.5 72 49.5C70.6193 49.5 69.5 50.6193 69.5 52C69.5 53.3807 70.6193 54.5 72 54.5Z" fill="#476142"/><path d="M24 44L26.4 49.6L32 52L26.4 54.4L24 60L21.6 54.4L16 52L21.6 49.6L24 44Z" fill="#476142"/><path d="M132 51.5C133.933 51.5 135.5 49.933 135.5 48C135.5 46.067 133.933 44.5 132 44.5C130.067 44.5 128.5 46.067 128.5 48C128.5 49.933 130.067 51.5 132 51.5Z" fill="#F57E20"/></svg>';
  function illo(svg){   /* tag each path by role so CSS can float the body, twinkle the sparkle, drift the dots, rise the bubbles */
    var paths=svg.match(/<path\b[^>]*>/g)||[], meta=paths.map(function(p,i){
      var d=(/\sd="([^"]*)"/.exec(p)||[])[1]||'', fill=(/\sfill="([^"]*)"/.exec(p)||[])[1];
      return {i:i,d:d,fill:fill,stroke:/\sstroke="/.test(p),curves:(d.match(/C/g)||[]).length,lines:(d.match(/L/g)||[]).length};
    });
    var spark=-1; meta.some(function(m){if(m.curves===0&&m.lines===8){spark=m.i;return true}});
    var cnt={}, n=-1;
    var roles=meta.map(function(m){
      if(m.i===0) return 'shadow'; if(m.i===spark) return 'spark';
      if(!m.stroke&&m.fill&&m.fill!=='none'&&m.curves===4&&m.d.length>=137&&m.d.length<=163){
        if(m.fill.toUpperCase()==='#FEF2E9') return 'bubble'; return spark>=0&&m.i>spark?'dot':'node';
      }
      return 'body';
    });
    return svg.replace(/<path\b/g,function(){n++; var r=roles[n], i=cnt[r]=(cnt[r]===undefined?-1:cnt[r])+1; return '<path class="il-'+r+'" style="--i:'+i+'"';});
  }
  var FLASK_HTML=illo(FLASK);

  /* ───────── No credit: guide + redeem ───────── */
  var creditMsg=null, dlgOpen=false, dlgOpener=null, okDlg=null;   /* okDlg = {n} while the redeem-success alert is up */   /* {ok:bool, text} after a redeem attempt */
  function gcard(icon,title,right,body,o){
    o=o||{};
    return '<section class="rn-gcard'+(o.white?' rn-gcard--white':'')+'"><div class="rn-gcard__head">'+(icon?'<span class="rn-tile'+(o.amber?' rn-tile--amber':'')+'">'+ico(icon)+'</span>':'')+'<h2 class="rn-gtitle">'+title+'</h2>'+(right?'<span class="rn-gright">'+right+'</span>':'')+'</div><div class="rn-gcard__body"><div class="rn-gcard__in">'+body+'</div></div></section>';
  }
  function gi(icon,title,badge){   /* Group Item row (Figma): grey shell, white body; tile | title | badge | arrow, all on one line */
    return '<a class="rn-gi" href="#"><span class="rn-gi__in"><span class="rn-gi__tile">'+ico(icon)+'</span><b class="rn-gi__t">'+title.trim()+'</b><span class="rn-gi__badge">'+ico(icon==='cart'?'cart':'headset')+badge+'</span><span class="rn-gi__go">'+ico('arrow')+'</span></span></a>';
  }
  function creditPage(){
    var n=getCredit(), open=n>0;
    var guide='<div class="rn-guide"><h3>'+t('gT')+'</h3><img src="assets/biomeseq-kit.jpg" alt="'+t('kitAlt')+'"><p>'+t('gP')+'</p>'+
      '<div><p>'+t('howT')+'</p><ol><li>'+t('how1')+'</li><li>'+t('how2')+'</li><li>'+t('how3')+'</li></ol></div>'+
      '<div class="rn-warn"><span class="rn-warn__ic">'+ico('tri')+'</span><span class="t">'+t('noteP')+'</span></div>'+
      gi('cart',t('buyQ'),t('buy'))+gi('headset',t('supQ'),t('sup'))+'</div>';
    var msg=creditMsg?'<p class="rn-help rn-help--'+(creditMsg.ok?'ok':'err')+'" id="rnSkuMsg" role="'+(creditMsg.ok?'status':'alert')+'">'+creditMsg.text+'</p>':'';
    var redeem='<div class="rn-credit__n"><b>'+n+'</b><span>'+t('active')+'</span></div>'+
      '<div class="rn-fld"><div class="rn-float rn-float--lead'+(creditMsg&&!creditMsg.ok?' is-invalid':'')+'"><button class="rn-float__help" type="button" data-dlg="open" aria-haspopup="dialog" aria-label="'+t('skuWhere')+'"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 11v5M12 8h.01"/></svg></button><input class="rn-input" id="rnSku" type="text" autocomplete="off" spellcheck="false" required'+(creditMsg&&!creditMsg.ok?' aria-invalid="true" aria-describedby="rnSkuMsg"':'')+'><label for="rnSku">'+t('sku')+'</label><span class="rn-req" aria-hidden="true"></span></div>'+msg+
      '<p class="rn-help">'+t('skuHelp')+'</p></div>'+
      '<button class="rn-btn rn-btn--primary rn-btn--block rn-redeem" type="button" data-redeem>'+t('redeem')+'</button>';
    var steps=[['gear','f1'],['flask','f2'],['play','f3']].map(function(s){
      return '<li class="rn-fstep"><span class="rn-fstep__ic">'+fico(s[0])+'</span><div class="rn-fstep__tx"><span class="rn-fstep__st"><span class="rn-lock">'+fico('lock')+t('locked')+'</span></span><h4>'+t(s[1])+'</h4><p>'+t(s[1]+'d')+'</p></div></li>';
    }).join('');
    var right='<div class="rn-col2">'+gcard('coin',t('creditLeft'),'<a href="#">'+t('history')+ico('arrow')+'</a>',redeem,{white:true,amber:true})+
      '<section class="rn-gcard"><div class="rn-gcard__body"><div class="rn-gcard__in"><h2 class="rn-gtitle" style="white-space:normal">'+t('afterT')+'</h2><ol class="rn-flow">'+steps+'</ol></div></div></section></div>';
    var ok=okDlg?'<div class="rn-modal" data-dlg="okscrim"><div class="rn-modal__box rn-modal__box--alert" role="alertdialog" aria-modal="true" aria-labelledby="rnOkT" aria-describedby="rnOkP">'+
      '<div class="rn-modal__in"><div class="rn-alert__state"><span class="rn-il" aria-hidden="true">'+FLASK_HTML+'</span><div class="rn-alert__txt"><h2 id="rnOkT">'+t('okT',okDlg.n)+'</h2><p id="rnOkP">'+t('okP',okDlg.n)+'</p></div></div></div>'+
      '<button class="rn-modal__x rn-modal__x--abs" type="button" data-dlg="ok" aria-label="'+t('dlgClose')+'">'+ico('x')+'</button>'+
      '<div class="rn-modal__foot rn-modal__foot--end"><button class="rn-btn" type="button" data-dlg="ok">'+t('dlgClose')+'</button></div></div></div>':'';
    var dlg=ok||(dlgOpen?'<div class="rn-modal" data-dlg="scrim"><div class="rn-modal__box" role="dialog" aria-modal="true" aria-labelledby="rnDlgT"><div class="rn-modal__head"><h2 id="rnDlgT">'+t('dlgT')+'</h2><button class="rn-modal__x" type="button" data-dlg="close" aria-label="'+t('dlgClose')+'">'+ico('x')+'</button></div>'+
      '<div class="rn-modal__body"><img src="assets/biomeseq-kit-box.png" alt=""><p>'+t('dlgP')+'</p></div>'+
      '<div class="rn-modal__foot"><a class="rn-modal__link" href="#">'+t('dlgHelp')+'</a><button class="rn-btn" type="button" data-dlg="close">'+t('dlgClose')+'</button></div></div></div>':'');
    return dlg+'<div class="rn-cols rn-cols--credit">'+gcard('bulb',t('guide'),'',guide)+right+'</div>';
  }
  function setDlg(open){
    if(!open&&dlgOpen&&!leaving){ leave(function(){setDlg2(false)}); return; }
    setDlg2(open);
  }
  function setDlg2(open){
    var cur=$('#rnSku',host), val=cur?cur.value:'';
    dlgOpen=open; render();
    var nu=$('#rnSku',host); if(nu&&val){nu.value=val; nu.parentNode.classList.add('is-filled');}
    if(open){var x=$('.rn-modal__x',host); if(x) x.focus();}
    else if(dlgOpener){var o=$('[data-dlg="open"]',host); if(o) o.focus();}
  }
  var leaving=false;
  function leave(cb){   /* let the exit animation play before the dialog is removed */
    var m=$('.rn-modal',host);
    if(leaving) return;
    if(!m||(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)){cb();return;}
    leaving=true; m.classList.add('is-leaving');
    setTimeout(function(){leaving=false; cb();},170);
  }
  function closeOk(){
    if(!okDlg) return;
    leave(doCloseOk);
  }
  function doCloseOk(){
    setCredit(getCredit()+okDlg.n); okDlg=null; render();   /* "akan ditambahkan" — the credit lands once the alert is dismissed */
    var b=$('[data-redeem]',host); if(b) b.focus();
  }
  function redeemSku(){
    var el=$('#rnSku'), v=(el?el.value:'').trim().toUpperCase();
    var m=v.match(/^NUS-BQ002\.(\d{1,3})-\d{6}-[A-Z]{3}$/);   /* simulated: the real check happens server-side */
    if(m){okDlg={n:+m[1]}; creditMsg=null; render(); var x=$('.rn-modal__x',host); if(x) x.focus(); return;}
    creditMsg={ok:false,text:t('skuBad')};
    render();
    var f=$('#rnSku',host); if(f) f.focus();
  }

  /* ───────── Render ───────── */
  var host=$('#rnApp');
  function render(){
    if(MODE==='credit'){host.classList.add('rn-content--credit'); host.innerHTML=creditPage(); return;}
    if(MODE==='empty'){
      host.innerHTML=mini()+'<div class="rn-cols rn-cols--single"><section class="rn-card" aria-labelledby="rnAllT"><div class="rn-card__head">'+
        '<h2 class="rn-title" id="rnAllT">'+t('all')+'</h2><div class="rn-head-meta"><span class="rn-chip rn-chip--blue">'+t('total',0)+'</span></div>'+
        '<div class="rn-head-actions"><button class="rn-btn rn-btn--primary" type="button" data-create>'+ico('plus')+t('create')+'</button></div></div>'+
        '<div class="rn-card__body"><div class="rn-empty"><div class="rn-empty__in"><img src="assets/no-data-illustration.svg" alt=""><div><h3>'+t('emptyT')+'</h3><p>'+t('emptyD')+'</p></div>'+
        '<div class="rn-empty__acts"><button class="rn-btn rn-btn--primary" type="button" data-create>'+ico('plus')+t('create')+'</button></div></div></div></div></section></div>';
      return;
    }
    var start=(state.page-1)*state.per, items=RUNS.slice(start,start+state.per);
    var keep=$('.rn-card__body',host); var top=keep?keep.scrollTop:0;
    host.innerHTML=mini()+'<div class="rn-cols"><section class="rn-card" aria-labelledby="rnAllT"><div class="rn-card__head">'+headBar()+'</div>'+
      '<div class="rn-card__body"><ul class="rn-list" aria-label="'+t('list')+'">'+items.map(function(r,k){return row(r,start+k)}).join('')+'</ul></div>'+
      '<div class="rn-card__foot">'+pager()+'</div></section>'+preview()+'</div>';
    var nb=$('.rn-card__body',host); if(nb) nb.scrollTop=top;
  }
  function select(i,kbd){state.sel=(state.sel===i?null:i); render(); if(kbd){var b=host.querySelector('.rn-row[data-i="'+i+'"] .rn-sel'); if(b) b.focus();}}   /* only keyboard users need focus put back after the re-render */
  host.addEventListener('click',function(e){
    var cr=e.target.closest('[data-create]');
    if(cr){ if(getCredit()<=0) location.href=CREDIT_PAGE; else nrOpen(cr); return; }
    if(e.target.closest('[data-redeem]')){ redeemSku(); return; }
    var d=e.target.closest('[data-dlg]');
    if(d){ var k=d.dataset.dlg; if(k==='ok'||(k==='okscrim'&&e.target===d)){closeOk(); return;} if(k==='okscrim') return; if(k==='open'){dlgOpener=d; setDlg(true);} else if(k==='close'||(k==='scrim'&&e.target===d)) setDlg(false); return; }
    var go=e.target.closest('[data-go]');
    if(go&&!go.disabled){state.page=+go.dataset.go; render(); return;}
    if(e.target.closest('a')) return;
    var row=e.target.closest('.rn-row'); if(row) select(+row.dataset.i,e.detail===0);
  });
  host.addEventListener('input',function(e){ if(e.target.id==='rnSku') e.target.parentNode.classList.toggle('is-filled',e.target.value!==''); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'){ if(okDlg) closeOk(); else if(dlgOpen) setDlg(false); } });
  host.addEventListener('keydown',function(e){ if(e.key==='Enter'&&e.target.id==='rnSku') redeemSku(); });
  host.addEventListener('change',function(e){ if(e.target.id==='rnPer'){state.per=+e.target.value; state.page=1; render();} });

  /* ───────── Create run dialog (credit > 0) ───────── */
  var nrMount=document.createElement('div'), nr=null, nrTrigger=null, nrLeaving=false;
  document.body.appendChild(nrMount);
  function nrCallout(){
    return '<span class="rn-nr-ic">'+ico('check')+'</span><p>'+t('nrNeed1')+'<b>'+t('nrNeed2',nr.kit)+'</b>'+t('nrNeed3')+'</p>';
  }
  function nrRender(){
    if(!nr){nrMount.innerHTML=''; return;}
    var kits=[48,96,192].map(function(k){var on=nr.kit===k; return '<button class="rn-sel2__o'+(on?' is-on':'')+'" type="button" role="option" data-kit="'+k+'" aria-selected="'+on+'"><span>'+t('nrKitOpt',k)+'</span>'+(on?ico('check'):'')+'</button>'}).join('');
    nrMount.innerHTML='<div class="rn-modal" data-nr="scrim"><div class="rn-modal__box rn-modal__box--wide" role="dialog" aria-modal="true" aria-labelledby="rnNrT">'+
      '<div class="rn-modal__head rn-nr-head"><span class="rn-nr-tile">'+fico('doc')+'</span><div class="rn-nr-ht"><h2 id="rnNrT">'+t('nrT')+'</h2><p>'+t('nrS')+'</p></div><button class="rn-modal__x" type="button" data-nr="close" aria-label="'+t('dlgClose')+'">'+ico('x')+'</button></div>'+
      '<div class="rn-modal__body rn-nr-body"><div class="rn-nr-cols">'+
      '<section class="rn-nr-card"><canvas class="rn-dots" aria-hidden="true"></canvas><div class="rn-gcard__head"><span class="rn-tile rn-tile--amber">'+ico('coin')+'</span><h2 class="rn-gtitle">'+t('creditLeft')+'</h2><span class="rn-gright"><a href="#">'+t('history')+ico('arrow')+'</a></span></div>'+
      '<div class="rn-gcard__body"><div class="rn-gcard__in"><div class="rn-credit__n"><b>'+getCredit()+'</b><span>'+t('active')+'</span></div><div class="rn-nr-ok" id="nrCallout">'+nrCallout()+'</div></div></div></section>'+
      '<div class="rn-nr-form">'+
        '<div class="rn-nf"><label for="nrName">'+t('nrName')+' <span class="rn-nf__req" aria-hidden="true">*</span></label><input class="rn-nf__in'+(nr.err?' is-invalid':'')+'" id="nrName" type="text" autocomplete="off" required value="'+esc(nr.name)+'"'+(nr.err?' aria-invalid="true" aria-describedby="nrNameErr"':'')+'>'+(nr.err?'<p class="rn-help rn-help--err" id="nrNameErr" role="alert">'+t('nrNameErr')+'</p>':'')+'<p class="rn-help">'+t('nrHint')+'</p></div>'+
        '<div class="rn-nf"><label for="nrKit">'+t('nrKit')+' <span class="rn-nf__req" aria-hidden="true">*</span></label><div class="rn-sel2"><button class="rn-sel2__t" id="nrKit" type="button" aria-haspopup="listbox" aria-expanded="false"><span class="rn-sel2__v">'+t('nrKitOpt',nr.kit)+'</span>'+ico('down')+'</button><div class="rn-sel2__pop" hidden><div class="rn-sel2__list" role="listbox" aria-labelledby="nrKit">'+kits+'</div></div></div></div>'+
      '</div>'+
      '</div></div>'+
      '<div class="rn-modal__foot rn-modal__foot--end"><button class="rn-btn rn-btn--quiet" type="button" data-nr="close">'+t('dlgClose')+'</button><button class="rn-btn rn-btn--primary" type="button" data-nr="go">'+t('nrGo')+ico('arrow')+'</button></div></div></div>';
    nrDots();
  }
  /* Figma "Empty State Dot Grid" shader fill, same math as the WebGPU shader, drawn once on a 2D canvas */
  function paintDots(cv){
    var box=cv.parentNode, w=box.clientWidth, h=box.clientHeight, dpr=window.devicePixelRatio||1;
    if(!w||!h) return;
    cv.width=Math.round(w*dpr); cv.height=Math.round(h*dpr); cv.style.width=w+'px'; cv.style.height=h+'px';
    var g=cv.getContext('2d'); g.scale(dpr,dpr); g.clearRect(0,0,w,h);
    var SP=16, R=1, cx=.5*w, cy=.38*h, fadeR=1.2*Math.min(w,h), inner=fadeR*(1-.55), HL=.04;
    var ss=function(a,b,x){var t=Math.max(0,Math.min(1,(x-a)/(b-a))); return t*t*(3-2*t)};
    for(var iy=0;iy<Math.ceil(h/SP);iy++) for(var ix=0;ix<Math.ceil(w/SP);ix++){
      var px=(ix+.5)*SP, py=(iy+.5)*SP, fade=1-ss(inner,fadeR,Math.hypot(px-cx,py-cy));
      if(fade<=0) continue;
      var hh=(Math.imul(ix,374761393)+Math.imul(iy,668265263)+12345)>>>0;
      hh=Math.imul((hh^(hh>>>13))>>>0,1274126177)>>>0; hh=(hh^(hh>>>16))>>>0;
      var hi=((hh&16777215)/16777216)<HL;
      g.fillStyle=hi?'rgba(245,126,32,'+fade+')':'rgba(20,20,30,'+(.05*fade)+')';
      g.beginPath(); g.arc(px,py,R,0,6.2832); g.fill();
    }
  }
  function nrDots(){var cv=$('.rn-dots',nrMount); if(cv) paintDots(cv);}
  window.addEventListener('resize',nrDots);
  function nrOpen(trigger){nr={name:'',kit:192,err:false}; nrTrigger=trigger; nrRender(); var i=$('#nrName',nrMount); if(i) i.focus();}
  function nrClose(){
    if(!nr||nrLeaving) return;
    var m=$('.rn-modal',nrMount), done=function(){nrLeaving=false; nr=null; nrRender(); if(nrTrigger&&document.body.contains(nrTrigger)) nrTrigger.focus();};
    if(!m||(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)){done();return;}
    nrLeaving=true; m.classList.add('is-leaving'); setTimeout(done,170);
  }
  function nrGo(){
    var el=$('#nrName',nrMount); nr.name=el?el.value:nr.name;
    if(!nr.name.trim()){nr.err=true; nrRender(); var i=$('#nrName',nrMount); if(i) i.focus(); return;}
    nrClose();   /* the pipeline page is not built yet */
  }
  nrMount.addEventListener('click',function(e){
    var ko=e.target.closest('.rn-sel2__o'); if(ko){kitPick(+ko.dataset.kit); return;}
    if(e.target.closest('#nrKit')){kitToggle(!kitOpen()); return;}
    if(kitOpen()&&!e.target.closest('.rn-sel2__pop')) kitToggle(false);
    var d=e.target.closest('[data-nr]'); if(!d) return;
    var k=d.dataset.nr; if(k==='close'||(k==='scrim'&&e.target===d)) nrClose(); else if(k==='go') nrGo();
  });
  nrMount.addEventListener('input',function(e){ if(e.target.id==='nrName'){nr.name=e.target.value;} });
  /* Select: trigger + popover list, like the Helix Select (single) */
  function kitPop(){return $('.rn-sel2__pop',nrMount)}
  function kitOpen(){return !!(nr&&nr.kitOpen)}
  function kitToggle(open){
    var pop=kitPop(), tr=$('#nrKit',nrMount); if(!pop||!tr) return;
    nr.kitOpen=open; pop.hidden=!open; tr.setAttribute('aria-expanded',open);
    tr.classList.toggle('is-open',open);
    if(open){
      var r=tr.getBoundingClientRect(), h=pop.offsetHeight||160, below=innerHeight-r.bottom, up=below<h+16&&r.top>below;
      pop.style.left=r.left+'px'; pop.style.width=r.width+'px'; pop.style.top=(up?r.top-8-h:r.bottom+8)+'px';
      var on=$('.rn-sel2__o.is-on',pop)||$('.rn-sel2__o',pop); if(on) on.focus({preventScroll:true});
    }
  }
  function kitPick(v){
    nr.kit=v; kitToggle(false);
    $('.rn-sel2__v',nrMount).textContent=t('nrKitOpt',v);
    [].forEach.call(nrMount.querySelectorAll('.rn-sel2__o'),function(o){var on=+o.dataset.kit===v; o.classList.toggle('is-on',on); o.setAttribute('aria-selected',on); var ck=o.querySelector('svg'); if(on&&!ck) o.insertAdjacentHTML('beforeend',ico('check')); if(!on&&ck) ck.remove();});
    var c=$('#nrCallout',nrMount); if(c) c.innerHTML=nrCallout();
    var tr=$('#nrKit',nrMount); if(tr) tr.focus();
  }
  nrMount.addEventListener('keydown',function(e){
    var o=e.target.closest&&e.target.closest('.rn-sel2__o');
    if(o){
      var items=[].slice.call(nrMount.querySelectorAll('.rn-sel2__o')), i=items.indexOf(o), n=null;
      if(e.key==='ArrowDown') n=items[Math.min(i+1,items.length-1)]; else if(e.key==='ArrowUp') n=items[Math.max(i-1,0)]; else if(e.key==='Home') n=items[0]; else if(e.key==='End') n=items[items.length-1];
      if(n){e.preventDefault(); n.focus();}
      else if(e.key==='Tab') kitToggle(false);
    } else if(e.target.id==='nrKit'&&(e.key==='ArrowDown'||e.key==='ArrowUp')){e.preventDefault(); kitToggle(true);}
  });
  window.addEventListener('resize',function(){ if(kitOpen()) kitToggle(false); });
  nrMount.addEventListener('keydown',function(e){ if(e.key==='Enter'&&e.target.id==='nrName') nrGo(); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&nr){ if(kitOpen()){kitToggle(false); var tr=$('#nrKit',nrMount); if(tr) tr.focus();} else nrClose(); } });

  /* breadcrumb label + language */
  function onLang(l){
    LANG=l; document.title='Nusantics – '+t('page');
    var c=document.getElementById('crumbPage'); if(c) c.textContent=t('crumb');
    if(!booted){booted=true; bootSkeleton(); return;}
    render();
    if(nr) nrRender();
  }
  /* first load: skeleton while the (mock) request resolves, then render with a staggered entrance */
  var booted=false;
  function bootSkeleton(){
    var B=function(w,h,c){return '<span class="hx-sk'+(c?' '+c:'')+'" style="width:'+w+';height:'+h+'"></span>';};
    var rows='',k; for(k=0;k<5;k++) rows+='<div class="rn-sk-row">'+B('40px','40px','hx-sk--c')+'<div class="rn-sk-col">'+B('55%','14px')+B('80%','11px')+'</div>'+B('64px','20px')+'</div>';
    var list='<section class="rn-card rn-sk-card" style="position:relative"><div class="rn-sk-head">'+B('110px','18px')+B('90px','22px')+'<span style="flex:1"></span>'+B('110px','36px','hx-sk--b')+'</div><div class="rn-sk-body">'+rows+'</div></section>';
    var side=MODE==='list'?'<section class="rn-card rn-sk-card"><div class="rn-sk-body">'+B('60%','18px')+B('90%','12px')+B('100%','160px','hx-sk--b')+B('100%','48px','hx-sk--b')+'</div></section>':'';
    host.setAttribute('aria-busy','true'); host.classList.add('rn-booting');
    host.innerHTML='<div class="rn-cols'+(MODE==='list'?'':' rn-cols--single')+'" aria-hidden="true">'+list+side+'</div>';
    setTimeout(function(){
      host.removeAttribute('aria-busy'); host.classList.remove('rn-booting'); render();
      host.classList.add('hx-enter'); setTimeout(function(){host.classList.remove('hx-enter');},900);
    },700);
  }
  if(window.HelixShell) HelixShell.onLang(onLang); else onLang('id');
})();
