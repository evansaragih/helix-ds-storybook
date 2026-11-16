/* Beranda (beranda.html) — Overview + stat tiles, Run Terbaru, Cara Kerja Platform (steps come from panduan-data.js).
   The notification sheet is part of the shell (bell in the navbar). Language follows the shell. */
(function(){
  var $=function(s,r){return (r||document).querySelector(s)};
  var esc=function(x){return String(x==null?'':x).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
  var TX={
    id:{page:'Beranda',ov:'Overview',inst:'Institusi Teknologi Bandung',create:'Buat Run Baru',
      sampel:'Sampel Dianalisis',kredit:'Kredit Aktif',selesai:'Run Selesai',total:'Total Run',
      latest:'Run Terbaru',all:'Lihat semua daftar',detail:'Lihat Detail',how:'Cara Kerja Platform',step:function(n){return 'Langkah '+n},
      draft:'Draft',proc:'Diproses',fail:'Gagal',done:'Selesai',credit:function(n){return n+' kredit'},goto:function(x){return 'Buka '+x}},
    en:{page:'Home',ov:'Overview',inst:'Institusi Teknologi Bandung',create:'Create New Run',
      sampel:'Samples Analysed',kredit:'Active Credits',selesai:'Completed Runs',total:'Total Runs',
      latest:'Latest Runs',all:'View all runs',detail:'View Detail',how:'How the Platform Works',step:function(n){return 'Step '+n},
      draft:'Draft',proc:'Processing',fail:'Failed',done:'Completed',credit:function(n){return n+' credit'+(n>1?'s':'')},goto:function(x){return 'Open '+x}}
  };
  var LANG='id', t=function(k,a){var v=TX[LANG][k];return typeof v==='function'?v(a):v};
  var P={chev:'m9 18 6-6-6-6',plus:'M12 5v14M5 12h14',pen:'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z',
    users:'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
    play:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM10 8l6 4-6 4z',flask:'M10 2v7.5L4 20a1 1 0 0 0 .9 1.5h14.2A1 1 0 0 0 20 20l-6-10.5V2M8.5 2h7',
    upload:'M16 16l-4-4-4 4M12 12v9M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3',check:'M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3',
    pulse:'M22 12h-4l-3 9L9 3l-3 9H2',barchart:'M12 20V10M18 20V4M6 20v-4'};
  var ico=function(n){return '<svg class="bd-i" viewBox="0 0 24 24" aria-hidden="true"><path d="'+P[n]+'"/></svg>'};
  var solid=function(ok){return '<svg class="rn-i" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="'+(ok?'m7.5 12.5 3 3 6-6.5':'m8.5 8.5 7 7M15.5 8.5l-7 7')+'" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'};

  var RUNS=[
    ['20260901-appconfigtrimprefix','draft','3 Sep 2026, 16.49'],['20260901-appconfigtrimprefix','proc','3 Sep 2026, 16.49'],
    ['20260901-appconfigtrimprefix','fail','3 Sep 2026, 16.49'],['20260901-appconfigtrimprefix','done','3 Sep 2026, 16.49'],
    ['20260901-appconfigtrimprefix','done','3 Sep 2026, 16.49'],['20260831-mangrove-batch2','done','2 Sep 2026, 11.20'],
    ['20260830-usus-kohortA','proc','1 Sep 2026, 09.05'],['20260829-sedimen-pesisir','done','31 Agu 2026, 14.32']];
  function badge(st){
    var ic=st==='draft'?'<svg class="rn-i s" viewBox="0 0 24 24" aria-hidden="true"><path d="'+P.pen+'"/></svg>':st==='proc'?'<span class="rn-spin" aria-hidden="true"></span>':solid(st==='done');
    return '<span class="rn-st rn-st--'+st+'">'+ic+t(st)+'</span>';
  }
  function credit(){
    var v=null; try{v=localStorage.getItem('nusantics-credit-v2')}catch(e){} return v===null?81:+v;
  }
  function pix(w,h,seed){
    var s=seed, rnd=function(){s=(s*1664525+1013904223)>>>0; return s/4294967296}, out='', S=22, i, j;
    for(i=0;i<Math.ceil(w/S);i++) for(j=0;j<Math.ceil(h/S);j++){
      var r=rnd(); if(r>.34) continue;
      out+='<rect x="'+i*S+'" y="'+j*S+'" width="'+(S-2)+'" height="'+(S-2)+'" rx="2" fill="'+(r<.17?'#fff':'#a84500')+'" fill-opacity="'+(.05+rnd()*.1).toFixed(3)+'"/>';
    }
    return '<svg class="bd-pix" viewBox="0 0 '+w+' '+h+'" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'+out+'</svg>';
  }
  function tile(cls,label,val,href){
    return '<a class="bd-tile bd-tile--'+cls+'" href="'+href+'" aria-label="'+esc(t('goto',label))+': '+val+'"><span class="bd-tile__h"><span>'+esc(label)+'</span><span class="bd-tile__go">'+ico('chev')+'</span></span><span class="bd-tile__v">'+val+'</span></a>';
  }
  /* horizontal strip: mouse wheel, click-and-drag and arrow keys all scroll it (the native scrollbar stays as a fallback) */
  function scrollable(el){
    if(!el) return;
    el.addEventListener('wheel',function(e){
      if(el.scrollWidth<=el.clientWidth||Math.abs(e.deltaY)<=Math.abs(e.deltaX)) return;
      var max=el.scrollWidth-el.clientWidth, next=el.scrollLeft+e.deltaY;
      if((e.deltaY<0&&el.scrollLeft<=0)||(e.deltaY>0&&el.scrollLeft>=max)) return;   // at an edge: let the page keep scrolling
      e.preventDefault(); el.scrollLeft=Math.max(0,Math.min(max,next));
    },{passive:false});
    var down=null, moved=false;
    el.addEventListener('pointerdown',function(e){ if(e.pointerType!=='mouse'||e.button!==0) return; down={x:e.clientX,l:el.scrollLeft}; moved=false; });
    window.addEventListener('pointermove',function(e){
      if(!down) return; var dx=e.clientX-down.x;
      if(!moved&&Math.abs(dx)>4){moved=true; el.classList.add('is-drag');}
      if(moved) el.scrollLeft=down.l-dx;
    });
    window.addEventListener('pointerup',function(){ if(!down) return; down=null; if(moved){ setTimeout(function(){el.classList.remove('is-drag');},0); } });
    el.addEventListener('click',function(e){ if(moved){ e.preventDefault(); e.stopPropagation(); moved=false; } },true);   // a drag must not open the step under the pointer
    el.addEventListener('keydown',function(e){
      if(e.target!==el||(e.key!=='ArrowRight'&&e.key!=='ArrowLeft')) return;
      e.preventDefault(); el.scrollBy({left:(e.key==='ArrowRight'?1:-1)*312,behavior:'smooth'});
    });
  }
  function render(){
    var steps=(window.PANDUAN||[]).map(function(s){
      return '<li><a class="bd-step" href="panduan.html?step='+s.id+'"><span class="bd-step__r"><span class="bd-step__t" style="background:'+s.tile+'">'+ico(s.icon)+'</span><b>'+esc(s.short)+'</b><span class="bd-tag">'+t('step',s.id)+'</span></span><p>'+esc(s.lead)+'</p></a></li>';
    }).join('');
    var runs=RUNS.map(function(r){
      return '<li class="bd-run"><span class="bd-run__ic"><img src="assets/run-doc.png" alt=""></span><div class="bd-run__tx"><b>'+esc(r[0])+'</b><span>RUN-260903-USU • Jason Limanjaya • '+r[2]+' • '+t('credit',1)+'</span></div><div class="bd-run__end">'+badge(r[1])+'<a class="bd-det" href="'+(r[1]==='done'?'analisis-lanjutan.html':'run.html')+'" aria-label="'+esc(t('detail')+': '+r[0])+'">'+t('detail')+ico('chev')+'</a></div></li>';
    }).join('');
    $('#bdApp').innerHTML='<div class="bd-grid">'+
      '<section class="bd-ov" aria-label="'+t('ov')+'">'+pix(520,720,5)+'<h2>'+t('ov')+'</h2>'+
        '<div><div class="bd-av"><span class="bd-av__da" aria-hidden="true">DA</span><span class="bd-av__org"><img src="assets/org-avatar.png" alt=""></span></div><div class="bd-name">dr. Andi Gunawan</div><div class="bd-org">'+esc(t('inst'))+'</div></div>'+
        '<a class="bd-new" href="run.html?new=1">'+ico('plus')+esc(t('create'))+'</a>'+
        '<div class="bd-stats">'+tile('sampel',t('sampel'),15,'analisis-lanjutan.html')+tile('kredit',t('kredit'),credit(),'kredit.html')+tile('selesai',t('selesai'),3,'run.html')+tile('total',t('total'),10,'run.html')+'</div>'+
      '</section>'+
      '<div class="bd-right">'+
        '<section class="bd-card" aria-labelledby="bdRunsT"><div class="bd-card__h"><h2 id="bdRunsT">'+t('latest')+'</h2><a class="bd-all" href="run.html">'+t('all')+ico('chev').replace('m9 18 6-6-6-6','M5 12h14M13 6l6 6-6 6')+'</a></div><ul class="bd-runs" tabindex="0" aria-label="'+t('latest')+'">'+runs+'</ul></section>'+
        '<section class="bd-card bd-how" aria-labelledby="bdHowT"><div class="bd-card__h"><h2 id="bdHowT">'+t('how')+'</h2></div><ul class="bd-steps" tabindex="0" aria-label="'+t('how')+'">'+steps+'</ul></section>'+
      '</div></div>';
    scrollable($('.bd-steps'));
    document.title='Nusantics – '+t('page');
    var c=document.getElementById('crumbPage'); if(c) c.textContent=t('page');
  }
  HelixShell.onLang(function(l){LANG=l==='en'?'en':'id'; render();});
})();
