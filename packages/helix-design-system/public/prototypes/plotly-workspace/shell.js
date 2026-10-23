/* Nusantics dashboard shell — renders the Sidebar (Expanded/Collapsed) and the Dashboard Navbar shared by
   nusantics-beranda-mock.html and nusantics-analisis-lanjutan-mock.html. Styles: shell.css.
   Usage: <aside id="sidebar" data-hx-sidebar></aside> … <header data-hx-navbar></header>
          <template id="hx-breadcrumb">…page specific breadcrumb…</template>
          <script src="shell.js" data-current="beranda|run"></script>
   API:   HelixShell.lang · HelixShell.onLang(fn) (fn(lang) is called now and on every change)
   Events: 'hx:sidebar' {collapsed} · 'hx:popover-open' · 'hx:lang' {lang}
   Language is shared by every page (localStorage "nusantics-lang", default "id"). */
(function(){
  var script=document.currentScript, CURRENT=(script&&script.dataset.current)||'beranda';
  var PAGES={beranda:'nusantics-beranda-mock.html',run:'nusantics-run-mock.html',analysis:'nusantics-analisis-lanjutan-mock.html',login:'../nusantics-research-dashboard/login.html'};   /* run = the Run list page; analysis = one run's Analisis Lanjutan */
  var STORE='nusantics-sidebar', LSTORE='nusantics-lang';
  /* mock data — same 3 runs on every page */
  var RUNS=[
    {title:'Studi Diversitas Tanah Mangrove — Batch 2',id:'RUN-2026-0022',owner:'dr. Andi Gunawan',min:270},
    {title:'Profil Mikrobioma Usus — Kohort A',id:'RUN-2026-0021',owner:'dr. Andi Gunawan',min:95},
    {title:'Metagenomik Sedimen Pesisir — Batch 1',id:'RUN-2026-0019',owner:'Sari Wulandari',min:25}
  ];
  var D={
    id:{nav:'Navigasi utama',menu:'Menu utama',home:'Beranda',run:'Run',credit:'Kredit',guide:'Panduan',wa:'WhatsApp Support',email:'Email Support',account:'Menu akun',collapse:'Ciutkan sidebar',expand:'Perluas sidebar',notif:'Notifikasi, 2 belum dibaca',runsN:function(n){return n+' run berjalan'},org:'Pilih organisasi: Institut Teknologi Bandung',all:'Lihat Semua',open:function(i){return 'Buka run '+i},left:function(m){return '~'+dur(m,'id')+' tersisa'},lang:'Bahasa',logout:'Keluar'},
    en:{nav:'Main navigation',menu:'Main menu',home:'Home',run:'Run',credit:'Credit',guide:'Guide',wa:'WhatsApp Support',email:'Email Support',account:'Account menu',collapse:'Collapse sidebar',expand:'Expand sidebar',notif:'Notifications, 2 unread',runsN:function(n){return n+' runs in progress'},org:'Select organization: Institut Teknologi Bandung',all:'View all',open:function(i){return 'Open run '+i},left:function(m){return '~'+dur(m,'en')+' left'},lang:'Language',logout:'Log out'}
  };
  var SPRITE='<symbol id="hx-i-dashboard" viewBox="0 0 16 16"><path d="M7.33333 14H3.33333C2.6 14 2 13.4 2 12.6667V3.33333C2 2.6 2.6 2 3.33333 2H7.33333V14ZM8.66667 14H12.6667C13.4 14 14 13.4 14 12.6667V8H8.66667V14ZM14 6.66667V3.33333C14 2.6 13.4 2 12.6667 2H8.66667V6.66667H14Z"/></symbol><symbol id="hx-i-play" viewBox="0 0 16 16"><path fill-rule="evenodd" clip-rule="evenodd" d="M15 8C15 9.85652 14.2625 11.637 12.9497 12.9497C11.637 14.2625 9.85652 15 8 15C6.14348 15 4.36301 14.2625 3.05025 12.9497C1.7375 11.637 1 9.85652 1 8C1 6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1C9.85652 1 11.637 1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8ZM6.777 11.482L11.376 8.416C11.4445 8.37034 11.5006 8.30848 11.5395 8.23591C11.5783 8.16334 11.5986 8.08231 11.5986 8C11.5986 7.91769 11.5783 7.83666 11.5395 7.76409C11.5006 7.69152 11.4445 7.62966 11.376 7.584L6.777 4.518C6.70171 4.4679 6.61423 4.43915 6.52389 4.43483C6.43355 4.43051 6.34373 4.45077 6.264 4.49346C6.18427 4.53615 6.1176 4.59966 6.07111 4.67724C6.02462 4.75482 6.00005 4.84356 6 4.934V11.066C6.00005 11.1564 6.02462 11.2452 6.07111 11.3228C6.1176 11.4003 6.18427 11.4639 6.264 11.5065C6.34373 11.5492 6.43355 11.5695 6.52389 11.5652C6.61423 11.5608 6.70171 11.5321 6.777 11.482Z"/></symbol><symbol id="hx-i-coins" viewBox="0 0 16 16"><path d="M0 12.6656V14C0 15.1031 2.6875 16 6 16C9.3125 16 12 15.1031 12 14V12.6656C10.7094 13.575 8.35 14 6 14C3.65 14 1.29062 13.575 0 12.6656ZM10 4C13.3125 4 16 3.10313 16 2C16 0.896875 13.3125 0 10 0C6.6875 0 4 0.896875 4 2C4 3.10313 6.6875 4 10 4ZM0 9.3875V11C0 12.1031 2.6875 13 6 13C9.3125 13 12 12.1031 12 11V9.3875C10.7094 10.45 8.34688 11 6 11C3.65313 11 1.29062 10.45 0 9.3875ZM13 9.73125C14.7906 9.38437 16 8.74063 16 8V6.66563C15.275 7.17812 14.2094 7.52813 13 7.74375V9.73125ZM6 5C2.6875 5 0 6.11875 0 7.5C0 8.88125 2.6875 10 6 10C9.3125 10 12 8.88125 12 7.5C12 6.11875 9.3125 5 6 5ZM12.8531 6.75938C14.7281 6.42188 16 5.75938 16 5V3.66563C14.8906 4.45 12.9844 4.87188 10.9781 4.97188C11.9 5.41875 12.5781 6.01875 12.8531 6.75938Z"/></symbol><symbol id="hx-i-bulb" viewBox="0 0 16 16"><path d="M8.79998 2.39961C8.79998 2.18744 8.71569 1.98395 8.56566 1.83392C8.41563 1.68389 8.21215 1.59961 7.99998 1.59961C7.7878 1.59961 7.58432 1.68389 7.43429 1.83392C7.28426 1.98395 7.19998 2.18744 7.19998 2.39961V3.19961C7.19998 3.41178 7.28426 3.61527 7.43429 3.76529C7.58432 3.91532 7.7878 3.99961 7.99998 3.99961C8.21215 3.99961 8.41563 3.91532 8.56566 3.76529C8.71569 3.61527 8.79998 3.41178 8.79998 3.19961V2.39961ZM12.5256 4.60521C12.6713 4.45433 12.7519 4.25225 12.7501 4.04249C12.7483 3.83273 12.6642 3.63208 12.5158 3.48375C12.3675 3.33543 12.1669 3.25129 11.9571 3.24947C11.7473 3.24765 11.5453 3.32828 11.3944 3.47401L10.8288 4.03961C10.683 4.19049 10.6024 4.39257 10.6042 4.60233C10.6061 4.81209 10.6902 5.01274 10.8385 5.16106C10.9868 5.30939 11.1875 5.39353 11.3973 5.39535C11.607 5.39717 11.8091 5.31654 11.96 5.17081L12.5256 4.60521ZM14.4 7.99961C14.4 8.21178 14.3157 8.41527 14.1657 8.56529C14.0156 8.71532 13.8121 8.79961 13.6 8.79961H12.8C12.5878 8.79961 12.3843 8.71532 12.2343 8.56529C12.0843 8.41527 12 8.21178 12 7.99961C12 7.78744 12.0843 7.58395 12.2343 7.43392C12.3843 7.2839 12.5878 7.19961 12.8 7.19961H13.6C13.8121 7.19961 14.0156 7.2839 14.1657 7.43392C14.3157 7.58395 14.4 7.78744 14.4 7.99961ZM4.03998 5.17081C4.11377 5.24722 4.20205 5.30816 4.29965 5.35009C4.39726 5.39202 4.50223 5.41409 4.60845 5.41501C4.71468 5.41593 4.82002 5.39569 4.91834 5.35547C5.01666 5.31524 5.10598 5.25584 5.18109 5.18073C5.25621 5.10561 5.31561 5.01629 5.35583 4.91797C5.39606 4.81966 5.4163 4.71431 5.41538 4.60809C5.41445 4.50186 5.39238 4.39689 5.35046 4.29929C5.30853 4.20168 5.24758 4.11341 5.17118 4.03961L4.60558 3.47401C4.45469 3.32828 4.25261 3.24765 4.04285 3.24947C3.8331 3.25129 3.63245 3.33543 3.48412 3.48375C3.33579 3.63208 3.25166 3.83273 3.24984 4.04249C3.24801 4.25225 3.32865 4.45433 3.47438 4.60521L4.03998 5.17081ZM3.99998 7.99961C3.99998 8.21178 3.91569 8.41527 3.76566 8.56529C3.61563 8.71532 3.41215 8.79961 3.19998 8.79961H2.39998C2.1878 8.79961 1.98432 8.71532 1.83429 8.56529C1.68426 8.41527 1.59998 8.21178 1.59998 7.99961C1.59998 7.78744 1.68426 7.58395 1.83429 7.43392C1.98432 7.2839 2.1878 7.19961 2.39998 7.19961H3.19998C3.41215 7.19961 3.61563 7.2839 3.76566 7.43392C3.91569 7.58395 3.99998 7.78744 3.99998 7.99961ZM6.39998 12.7996V11.9996H9.59998V12.7996C9.59998 13.224 9.4314 13.6309 9.13135 13.931C8.83129 14.231 8.42432 14.3996 7.99998 14.3996C7.57563 14.3996 7.16866 14.231 6.86861 13.931C6.56855 13.6309 6.39998 13.224 6.39998 12.7996ZM9.59998 11.1996C9.61198 10.9276 9.76638 10.6828 9.98158 10.5124C10.5037 10.1006 10.8846 9.53638 11.0713 8.89813C11.258 8.25989 11.2412 7.57934 11.0233 6.95107C10.8053 6.32281 10.3971 5.77804 9.85525 5.3925C9.31344 5.00696 8.66496 4.79979 7.99998 4.79979C7.33499 4.79979 6.68652 5.00696 6.1447 5.3925C5.60288 5.77804 5.19463 6.32281 4.9767 6.95107C4.75877 7.57934 4.74198 8.25989 4.92866 8.89813C5.11535 9.53638 5.49623 10.1006 6.01838 10.5124C6.23438 10.6828 6.38798 10.9276 6.39918 11.1996H9.60078H9.59998Z"/></symbol><symbol id="hx-i-msg" viewBox="0 0 16 16"><path d="M1.59998 4.00039C1.59998 3.57604 1.76855 3.16908 2.0686 2.86902C2.36866 2.56896 2.77563 2.40039 3.19998 2.40039H8.79998C9.22432 2.40039 9.63129 2.56896 9.93135 2.86902C10.2314 3.16908 10.4 3.57604 10.4 4.00039V7.20039C10.4 7.62474 10.2314 8.0317 9.93135 8.33176C9.63129 8.63182 9.22432 8.80039 8.79998 8.80039H7.19998L4.79998 11.2004V8.80039H3.19998C2.77563 8.80039 2.36866 8.63182 2.0686 8.33176C1.76855 8.0317 1.59998 7.62474 1.59998 7.20039V4.00039Z"/><path d="M12 5.59961V7.19961C12 8.0483 11.6628 8.86223 11.0627 9.46235C10.4626 10.0625 9.64868 10.3996 8.79998 10.3996H7.86238L6.44958 11.8132C6.67358 11.9324 6.92878 11.9996 7.19998 11.9996H8.79998L11.2 14.3996V11.9996H12.8C13.2243 11.9996 13.6313 11.831 13.9314 11.531C14.2314 11.2309 14.4 10.824 14.4 10.3996V7.19961C14.4 6.77526 14.2314 6.3683 13.9314 6.06824C13.6313 5.76818 13.2243 5.59961 12.8 5.59961H12Z"/></symbol><symbol id="hx-i-mail" viewBox="0 0 16 16"><path d="M14.3938 4.6032L11.0312 8.0282C11.0063 8.0532 11.0063 8.0907 11.0312 8.1157L13.3844 10.622C13.5437 10.7813 13.5437 11.0376 13.3844 11.197C13.3062 11.2751 13.2 11.3157 13.0969 11.3157C12.9938 11.3157 12.8875 11.2751 12.8094 11.197L10.4656 8.70008C10.4406 8.67508 10.4 8.67508 10.375 8.70008L9.80313 9.28133C9.325 9.7657 8.69062 10.0345 8.00937 10.0376C7.31875 10.0407 6.6625 9.75008 6.17812 9.25945L5.62813 8.70008C5.60313 8.67508 5.5625 8.67508 5.5375 8.70008L3.19375 11.197C3.11562 11.2751 3.00937 11.3157 2.90625 11.3157C2.80313 11.3157 2.69688 11.2751 2.61875 11.197C2.45938 11.0376 2.45938 10.7813 2.61875 10.622L4.97188 8.1157C4.99375 8.0907 4.99375 8.0532 4.97188 8.0282L1.60625 4.6032C1.56563 4.56258 1.5 4.5907 1.5 4.64695V11.5001C1.5 12.0501 1.95 12.5001 2.5 12.5001H13.5C14.05 12.5001 14.5 12.0501 14.5 11.5001V4.64695C14.5 4.5907 14.4313 4.5657 14.3938 4.6032Z"/><path d="M8.00005 9.22188C8.46255 9.22188 8.89692 9.04063 9.22192 8.70938L14.125 3.71875C13.9532 3.58125 13.7407 3.5 13.5063 3.5H2.49692C2.26255 3.5 2.04692 3.58125 1.87817 3.71875L6.7813 8.70938C7.10317 9.0375 7.53755 9.22188 8.00005 9.22188Z"/></symbol><symbol id="hx-i-updown" viewBox="0 0 12 12"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.99997 1.7998C6.15909 1.79984 6.31167 1.86308 6.42417 1.9756L8.22417 3.7756C8.33346 3.88877 8.39394 4.04033 8.39257 4.19765C8.39121 4.35496 8.32811 4.50545 8.21686 4.6167C8.10562 4.72794 7.95513 4.79104 7.79781 4.79241C7.64049 4.79378 7.48893 4.7333 7.37577 4.624L5.99997 3.2482L4.62417 4.624C4.51101 4.7333 4.35945 4.79378 4.20213 4.79241C4.04481 4.79104 3.89432 4.72794 3.78308 4.6167C3.67183 4.50545 3.60873 4.35496 3.60736 4.19765C3.606 4.04033 3.66647 3.88877 3.77577 3.7756L5.57577 1.9756C5.68827 1.86308 5.84085 1.79984 5.99997 1.7998ZM3.77577 7.37561C3.88829 7.26312 4.04087 7.19993 4.19997 7.19993C4.35907 7.19993 4.51165 7.26312 4.62417 7.37561L5.99997 8.75141L7.37577 7.37561C7.48893 7.26631 7.64049 7.20583 7.79781 7.2072C7.95513 7.20857 8.10562 7.27167 8.21686 7.38291C8.32811 7.49416 8.39121 7.64465 8.39257 7.80196C8.39394 7.95928 8.33346 8.11084 8.22417 8.224L6.42417 10.024C6.31165 10.1365 6.15907 10.1997 5.99997 10.1997C5.84087 10.1997 5.68829 10.1365 5.57577 10.024L3.77577 8.224C3.66329 8.11149 3.6001 7.9589 3.6001 7.7998C3.6001 7.64071 3.66329 7.48812 3.77577 7.37561Z"/></symbol><symbol id="hx-i-bell" viewBox="0 0 14 14"><path d="M7.00002 14C7.9658 14 8.7492 13.2166 8.7492 12.25H5.25084C5.25084 13.2166 6.03424 14 7.00002 14ZM12.8896 9.90637C12.3613 9.33871 11.3728 8.48477 11.3728 5.6875C11.3728 3.56289 9.88314 1.86211 7.87447 1.44484V0.875C7.87447 0.391836 7.48291 0 7.00002 0C6.51713 0 6.12557 0.391836 6.12557 0.875V1.44484C4.11689 1.86211 2.62721 3.56289 2.62721 5.6875C2.62721 8.48477 1.63873 9.33871 1.11045 9.90637C0.946386 10.0827 0.873652 10.2936 0.875019 10.5C0.878027 10.9484 1.22994 11.375 1.75275 11.375H12.2473C12.7701 11.375 13.1223 10.9484 13.125 10.5C13.1264 10.2936 13.0537 10.0825 12.8896 9.90637Z"/></symbol><symbol id="hx-i-down" viewBox="0 0 14 14"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.0876 4.83785C3.31541 4.61004 3.68475 4.61004 3.91256 4.83785L7.00008 7.92537L10.0876 4.83785C10.3154 4.61004 10.6848 4.61004 10.9126 4.83785C11.1404 5.06565 11.1404 5.435 10.9126 5.6628L7.41256 9.1628C7.18475 9.39061 6.81541 9.39061 6.5876 9.1628L3.0876 5.6628C2.8598 5.435 2.8598 5.06565 3.0876 4.83785Z"/></symbol>';
  var LANG='id'; try{LANG=localStorage.getItem(LSTORE)==='en'?'en':'id';}catch(e){}
  var listeners=[];
  function dur(m,l){var h=Math.floor(m/60),mm=m%60;return (l==='id'?[h&&h+' jam',mm&&mm+' menit']:[h&&h+' h',mm&&mm+' min']).filter(Boolean).join(' ');}
  var t=function(k,a){var v=D[LANG][k];return typeof v==='function'?v(a):v;};
  var esc=function(x){return String(x).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
  var ico=function(id,cls){return '<svg class="hx-i'+(cls?' '+cls:'')+'" aria-hidden="true"><use href="#hx-'+id+'"/></svg>'};
  var $=function(s,r){return (r||document).querySelector(s)};

  function mount(){
    var sb=$('[data-hx-sidebar]'), nb=$('[data-hx-navbar]');
    if(!sb||!nb) return;
    var sp=document.createElement('div'); sp.setAttribute('aria-hidden','true'); sp.style.cssText='position:absolute;width:0;height:0;overflow:hidden';
    sp.innerHTML='<svg width="0" height="0" focusable="false"><defs>'+SPRITE+'</defs></svg>'; document.body.insertBefore(sp,document.body.firstChild);

    /* ───────── Sidebar (text is filled by render()) ───────── */
    var item=function(key,href,icon,k){
      return '<a class="hx-nav-item" href="'+href+'" data-k="'+k+'"'+(CURRENT===key?' aria-current="page"':'')+'>'+ico(icon)+'<span class="hx-label"></span></a>';
    };
    sb.classList.add('hx-sidebar');
    sb.innerHTML=
      '<div class="hx-sb-head"><a class="hx-logo" href="'+PAGES.beranda+'" aria-label="Nusantics"><img class="hx-logo-full" src="assets/nusantics-logo.svg" alt="Nusantics"><span class="hx-logo-mark"><img src="assets/nusantics-mark.svg" alt="Nusantics"></span></a><span class="hx-pill">Staging</span></div>'+
      '<nav class="hx-sb-nav">'+
        item('beranda',PAGES.beranda,'i-dashboard','home')+item('run',PAGES.run,'i-play','run')+item('kredit','#','i-coins','credit')+item('panduan','#','i-bulb','guide')+
      '</nav>'+
      '<div class="hx-sb-foot"><div class="hx-sb-links">'+item('wa','#','i-msg','wa')+item('email','#','i-mail','email')+
      '</div><div class="hx-user"><button class="hx-avatar" type="button" id="hxAvatar" tabindex="-1" aria-hidden="true"><span>OR</span></button><span class="hx-user-name">dr. Andi Gunawan</span><button class="hx-ib hx-ib--24" type="button" id="hxAccount">'+ico('i-updown','mut')+'</button></div></div>';

    /* ───────── Navbar: toggle · divider · [page breadcrumb]   …   language · bell · runs · organisation ───────── */
    nb.classList.add('hx-navbar');
    nb.innerHTML=
      '<div class="hx-nav-left"><button class="hx-ib hx-ib--36" type="button" id="sbToggle" aria-controls="sidebar" aria-expanded="true"><img src="assets/ic-panel.svg" alt=""></button><span class="hx-nav-div" aria-hidden="true"></span><div class="hx-crumb-slot" style="display:contents"></div></div>'+
      '<div class="hx-nav-right">'+
        '<button class="hx-lang" type="button" id="langBtn" aria-haspopup="menu" aria-expanded="false" aria-controls="langMenu"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.4 4 5.4 4 9s-1.4 6.6-4 9c-2.6-2.4-4-5.4-4-9s1.4-6.6 4-9z"/></svg><span id="langCode"></span>'+ico('i-down','mut')+'</button>'+
        '<button class="hx-ib hx-ib--36 hx-ib--ghost" type="button" id="hxBell">'+ico('i-bell','mut')+'<span class="hx-notif">2</span></button>'+
        '<button class="hx-btn hx-btn--run" type="button" id="runBtn" aria-haspopup="dialog" aria-expanded="false" aria-controls="runsPop"><span class="hx-spinner" aria-hidden="true"></span><span class="hx-txt" id="runPillText"></span>'+ico('i-down','mut')+'</button>'+
        '<button class="hx-btn hx-btn--dark" type="button" id="hxOrg"><img class="hx-org-logo" src="assets/org-avatar.png" alt=""><span class="hx-txt">Institut Teknologi Bandung</span>'+ico('i-down')+'</button>'+
      '</div>';
    var tpl=document.getElementById('hx-breadcrumb'), slot=$('.hx-crumb-slot',nb);
    if(tpl) slot.appendChild(tpl.content.cloneNode(true));

    /* ───────── Popovers: language menu + runs (one open at a time) ───────── */
    var langBtn=$('#langBtn'), runBtn=$('#runBtn'), toggle=$('#sbToggle');
    var lm=document.createElement('div'); lm.className='hx-menu'; lm.id='langMenu'; lm.setAttribute('role','menu'); lm.setAttribute('aria-labelledby','langBtn'); lm.hidden=true;
    lm.innerHTML=[['en','English'],['id','Bahasa Indonesia']].map(function(o){return '<button class="hx-menu-item" type="button" role="menuitemradio" data-lang="'+o[0]+'" aria-checked="false">'+o[1]+'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7"/></svg></button>'}).join('');
    document.body.appendChild(lm);
    var rp=document.createElement('div'); rp.className='hx-runs-pop'; rp.id='runsPop'; rp.setAttribute('role','dialog'); rp.setAttribute('aria-labelledby','runsTitle'); rp.hidden=true;
    rp.innerHTML='<div class="hx-runs-head"><h2 id="runsTitle"></h2><a class="hx-runs-all" id="runsAll" href="'+PAGES.run+'"><span></span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a></div><ul class="hx-runs-list" id="runsList"></ul>';
    document.body.appendChild(rp);
    var am=document.createElement('div'); am.className='hx-menu'; am.id='accountMenu'; am.setAttribute('role','menu'); am.setAttribute('aria-labelledby','hxAccount'); am.hidden=true;
    am.innerHTML='<div class="hx-menu-head"><b>dr. Andi Gunawan</b><span>andi@itb.ac.id</span></div><div class="hx-menu-sep" role="separator"></div><button class="hx-menu-item hx-menu-item--out" type="button" role="menuitem" id="hxLogout"><svg class="hx-mi-i" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg><span id="hxLogoutText"></span></button>';
    document.body.appendChild(am);

    var pops=[];
    function closeAll(except,refocus){pops.forEach(function(p){ if(p!==except&&!p.pop.hidden){p.pop.hidden=true;p.btn.setAttribute('aria-expanded','false');if(refocus)p.btn.focus();} });}
    function bindPop(btn,pop,focusSel,up,anchor){
      var p={btn:btn,pop:pop}; pops.push(p);
      btn.addEventListener('click',function(e){
        e.stopPropagation();
        if(!pop.hidden) return closeAll(null);
        closeAll(p); hideTip(); document.dispatchEvent(new CustomEvent('hx:popover-open'));
        pop.hidden=false; btn.setAttribute('aria-expanded','true');
        var r=(anchor?anchor():btn).getBoundingClientRect();
        if(up){ pop.style.left=Math.max(8,r.left)+'px'; pop.style.top=Math.max(8,r.top-pop.offsetHeight-8)+'px'; }   // opens above, left edge aligned (bottom-left account menu)
        else { pop.style.left=Math.max(8,r.right-pop.offsetWidth)+'px'; pop.style.top=(r.bottom+8)+'px'; }   // right edge aligned with its trigger
        var f=focusSel&&$(focusSel,pop); if(f) f.focus();
      });
      pop.addEventListener('click',function(e){e.stopPropagation();});
    }
    bindPop(langBtn,lm,'[aria-checked="true"]');
    bindPop(runBtn,rp,'.hx-run-card');
    var acc=$('#hxAccount'), avatar=$('#hxAvatar');
    bindPop(acc,am,'.hx-menu-item',true,function(){return sb.classList.contains('collapsed')?avatar:$('.hx-user',sb);});
    avatar.addEventListener('click',function(e){e.stopPropagation(); acc.click();});
    $('#hxLogout').addEventListener('click',function(){
      try{sessionStorage.removeItem('nrd.identity');}catch(e){}
      window.location.href=PAGES.login;
    });
    document.addEventListener('pointerdown',function(e){ pops.forEach(function(p){ if(!p.pop.hidden&&!p.pop.contains(e.target)&&!p.btn.contains(e.target)){p.pop.hidden=true;p.btn.setAttribute('aria-expanded','false');} }); },true);
    document.addEventListener('keydown',function(e){ if(e.key==='Escape') closeAll(null,true); });
    lm.addEventListener('click',function(e){ var o=e.target.closest('[data-lang]'); if(!o) return; setLang(o.dataset.lang); closeAll(null,true); });

    /* ───────── Collapse / expand (state shared across pages) ───────── */
    function setCollapsed(c,persist){
      sb.classList.toggle('collapsed',c);
      toggle.setAttribute('aria-expanded',String(!c));
      toggle.setAttribute('aria-label',t(c?'expand':'collapse'));
      if(persist){try{localStorage.setItem(STORE,c?'collapsed':'expanded');}catch(e){}}
    }
    var saved=null; try{saved=localStorage.getItem(STORE);}catch(e){}
    toggle.addEventListener('click',function(){
      var c=!sb.classList.contains('collapsed'); setCollapsed(c,true); hideTip();
      document.dispatchEvent(new CustomEvent('hx:sidebar',{detail:{collapsed:c}}));
    });

    /* ───────── Tooltip (Simple, side="right") on the icon-only rail ───────── */
    var tip=document.createElement('div'); tip.className='hx-tooltip hx-tooltip--simple'; tip.id='hxNavTip'; tip.setAttribute('role','tooltip'); tip.setAttribute('data-side','right');
    tip.innerHTML='<div class="hx-tooltip__in"><div class="hx-tooltip__simple"></div></div><span class="hx-tooltip__arrow" aria-hidden="true"></span>';
    document.body.appendChild(tip);
    var tipTimer=0;
    function hideTip(){clearTimeout(tipTimer);tip.classList.remove('on');}
    function showTip(el){
      if(!sb.classList.contains('collapsed')) return;
      tip.firstChild.firstChild.textContent=el.dataset.tip; tip.classList.add('on');
      var r=el.getBoundingClientRect(), h=tip.offsetHeight, top=Math.max(8,r.top+r.height/2-h/2);
      tip.style.left=(r.right+4)+'px'; tip.style.top=top+'px';
      tip.style.setProperty('--ay',Math.min(Math.max(r.top+r.height/2-top,12),h-12)+'px');
    }
    sb.querySelectorAll('.hx-nav-item').forEach(function(el){
      el.addEventListener('pointerenter',function(){clearTimeout(tipTimer);tipTimer=setTimeout(function(){showTip(el)},400);});   // Tooltip delayDuration default 400
      el.addEventListener('pointerleave',hideTip);
      el.addEventListener('focus',function(){showTip(el)});
      el.addEventListener('blur',hideTip);
    });
    document.addEventListener('keydown',function(e){if(e.key==='Escape')hideTip();});

    /* ───────── Text (re-rendered whenever the language changes) ───────── */
    function render(){
      sb.setAttribute('aria-label',t('nav')); $('.hx-sb-nav',sb).setAttribute('aria-label',t('menu'));
      sb.querySelectorAll('.hx-nav-item').forEach(function(el){var s=t(el.dataset.k); el.setAttribute('aria-label',s); el.dataset.tip=s; $('.hx-label',el).textContent=s;});
      $('#hxAccount').setAttribute('aria-label',t('account')); $('#hxLogoutText').textContent=t('logout'); $('#hxAvatar').setAttribute('aria-label',t('account'));
      $('#hxBell').setAttribute('aria-label',t('notif'));
      $('#hxOrg').setAttribute('aria-label',t('org'));
      toggle.setAttribute('aria-label',t(sb.classList.contains('collapsed')?'expand':'collapse'));
      var title=t('runsN',RUNS.length); $('#runPillText').textContent=title; $('#runsTitle').textContent=title; $('#runsAll span').textContent=t('all');
      $('#runsList').innerHTML=RUNS.map(function(r){return '<li><a class="hx-run-card" href="'+PAGES.analysis+'" aria-label="'+esc(t('open',r.id))+'"><span class="hx-run-in"><img src="assets/run-illustration.svg" alt=""><span class="hx-run-txt"><b title="'+esc(r.title)+'">'+esc(r.title)+'</b><span><em>'+esc(r.id)+' •</em> <em>'+esc(r.owner)+' •</em> <em>'+esc(t('left',r.min))+'</em></span></span></span></a></li>'}).join('');
      $('#langCode').textContent=LANG.toUpperCase(); langBtn.setAttribute('aria-label',t('lang'));
      lm.querySelectorAll('[data-lang]').forEach(function(o){o.setAttribute('aria-checked',String(o.dataset.lang===LANG));});
      document.documentElement.lang=LANG;
    }
    window.__hxRender=render;
    setCollapsed(saved==='collapsed',false);
    render();
  }

  function setLang(l){
    LANG=l==='en'?'en':'id';
    try{localStorage.setItem(LSTORE,LANG);}catch(e){}
    if(window.__hxRender) window.__hxRender();
    listeners.forEach(function(fn){fn(LANG);});
    document.dispatchEvent(new CustomEvent('hx:lang',{detail:{lang:LANG}}));
  }
  mount();
  window.HelixShell={
    pages:PAGES,runs:RUNS,
    get lang(){return LANG;},
    setLang:setLang,
    onLang:function(fn){listeners.push(fn);fn(LANG);}
  };
})();
