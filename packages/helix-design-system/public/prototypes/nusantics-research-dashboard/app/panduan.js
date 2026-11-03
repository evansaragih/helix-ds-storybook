/* Panduan Penggunaan (panduan.html) — step list (expanded / minimised) + step content from panduan-data.js.
   Query: ?step=1..7 · ?min=1 (start with the list collapsed). The collapsed state is remembered per tab (sessionStorage "nrd-guide-min"). */
(function(){
  var DATA=window.PANDUAN||[], N=DATA.length;
  var $=function(s,r){return (r||document).querySelector(s)};
  var esc=function(x){return String(x==null?'':x).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
  var Q=function(k){var m=location.search.match(new RegExp('[?&]'+k+'=([^&]*)')); return m?decodeURIComponent(m[1]):null};
  var P={
    users:'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
    play:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM10 8l6 4-6 4z',
    flask:'M10 2v7.5L4 20a1 1 0 0 0 .9 1.5h14.2A1 1 0 0 0 20 20l-6-10.5V2M8.5 2h7',
    upload:'M16 16l-4-4-4 4M12 12v9M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3',
    check:'M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3',
    pulse:'M22 12h-4l-3 9L9 3l-3 9H2',
    barchart:'M12 20V10M18 20V4M6 20v-4',
    edit:'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z',
    box:'M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8',
    file:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6',
    filetext:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8',
    warn:'M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01',
    xcircle:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM15 9l-6 6M9 9l6 6',
    scissors:'M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12',
    network:'M9 3h6v6H9zM2 15h6v6H2zM16 15h6v6h-6zM12 9v3M5 15v-1a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1',
    leaf:'M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10zM2 21c0-3 1.85-5.36 5.08-6',
    layers:'M12 2 2 7l10 5 10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    tag:'M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01',
    list:'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
    clock:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2',
    download:'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3',
    sliders:'M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6',
    maximize:'M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3',
    chat:'M3 21l1.7-5A9 9 0 1 1 8 19.3L3 21z',
    info:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 16v-4M12 8h.01',
    left:'m15 18-6-6 6-6', right:'m9 18 6-6-6-6', down:'m6 9 6 6 6-6',
    collapse:'M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7',
    expand:'M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7',
    tick:'m5 12.5 4.5 4.5L19 7.5', cross:'M18 6 6 18M6 6l12 12'
  };
  var ico=function(n,c){return '<svg class="gd-i'+(c?' '+c:'')+'" viewBox="0 0 24 24" aria-hidden="true"><path d="'+P[n]+'"/></svg>'};
  var pad=function(n){return n<10?'0'+n:''+n};

  var state={step:Math.min(N,Math.max(1,+(Q('step')||1))),min:false,open:{}};
  try{state.min=Q('min')==='1'||(Q('min')===null&&sessionStorage.getItem('nrd-guide-min')==='1')}catch(e){state.min=Q('min')==='1'}
  var host=$('#gdApp');

  /* ───────── Pieces ───────── */
  function pix(w,h,seed){
    var s=seed*977+13, rnd=function(){s=(s*1664525+1013904223)>>>0; return s/4294967296}, out='', S=22, i, j;
    for(i=0;i<Math.ceil(w/S);i++) for(j=0;j<Math.ceil(h/S);j++){
      var f=Math.max(0,1-Math.abs(i*S-w*.68)/(w*.3));
      if(rnd()<.3*f) out+='<rect x="'+i*S+'" y="'+j*S+'" width="'+(S-2)+'" height="'+(S-2)+'" rx="2" fill="#000" fill-opacity="'+(.04+rnd()*.1*f).toFixed(3)+'"/>';
    }
    return '<svg class="gd-pix" viewBox="0 0 '+w+' '+h+'" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'+out+'</svg>';
  }
  function nav(){
    var items=DATA.map(function(s){
      var on=s.id===state.step;
      return '<li><button class="gd-step'+(on?' is-on':'')+'" type="button" data-step="'+s.id+'"'+(on?' aria-current="step"':'')+' aria-label="Langkah '+s.id+': '+esc(s.short)+'">'+
        '<span class="gd-tile" style="background:'+s.tile+'">'+ico(s.icon)+'</span>'+
        (state.min?'':'<span class="gd-step__tx"><small>LANGKAH '+pad(s.id)+'</small><b>'+esc(s.short)+'</b></span>'+ico('right','gd-step__go'))+'</button></li>';
    }).join('');
    var tog='<button class="gd-ib" type="button" data-toggle aria-expanded="'+!state.min+'" aria-label="'+(state.min?'Perluas daftar langkah':'Ciutkan daftar langkah')+'">'+ico(state.min?'expand':'collapse')+'</button>';
    return '<aside class="gd-nav'+(state.min?' is-min':'')+'" aria-label="Daftar langkah panduan">'+
      (state.min?'<div class="gd-nav__h">'+tog+'</div>':'<div class="gd-nav__h"><div><h1>Panduan Penggunaan</h1><p>'+N+' langkah mudah untuk memulai analisis sampel Anda</p></div>'+tog+'</div>')+
      '<ol class="gd-steps">'+items+'</ol></aside>';
  }
  function banner(s){
    return '<header class="gd-banner" style="background:'+s.color+'">'+pix(980,129,s.id)+'<span class="gd-pill">Langkah '+s.id+' dari '+N+'</span><h2>'+esc(s.short)+'</h2><p>'+esc(s.lead)+'</p></header>';
  }
  function itemCard(it){
    var tag=it.tag?'<span class="gd-tag'+(it.tagTone?' gd-tag--'+it.tagTone:'')+'">'+esc(it.tag)+'</span>':'';
    return '<div class="gd-item"><span class="gd-item__t">'+ico(it.icon||'file')+'</span><div class="gd-item__tx"><div class="gd-item__r"><b>'+esc(it.title)+'</b>'+tag+'</div><p>'+esc(it.desc)+'</p></div></div>';
  }
  function card(title,body,cls){return '<section class="gd-card'+(cls?' '+cls:'')+'"><h3 class="gd-card__h">'+esc(title)+'</h3>'+body+'</section>'}
  function table(sec){
    var head='<div class="gd-tr gd-tr--h"><span>'+esc(sec.cols[0])+'</span>'+sec.cols.slice(1).map(function(c){return '<span class="gd-c">'+esc(c)+'</span>'}).join('')+'</div>';
    var rows=sec.rows.map(function(r){return '<div class="gd-tr"><span>'+esc(r[0])+'</span>'+[1,2,3].map(function(i){return '<span class="gd-c" role="img" aria-label="'+(r[i]?'Bisa':'Tidak bisa')+'">'+ico(r[i]?'tick':'cross',r[i]?'is-y':'is-n')+'</span>'}).join('')+'</div>'}).join('');
    return card(sec.title,'<div class="gd-card__b"><div class="gd-table" role="table">'+head+rows+'</div></div>');
  }
  function notes(sec){
    var ic={warn:'warn',info:'info',ok:'tick'};
    return card(sec.title,'<div class="gd-card__b gd-card__b--white">'+sec.items.map(function(n){return '<div class="gd-note gd-note--'+n.tone+'"><span class="gd-note__t">'+ico(ic[n.tone])+'</span><p>'+esc(n.text)+'</p></div>'}).join('')+'</div>','gd-card--flat');
  }
  function faq(sec,key){
    return card(sec.title,'<div class="gd-card__b gd-card__b--white gd-faq">'+sec.items.map(function(f,i){
      var id=key+'-'+i, open=!!state.open[id];
      return '<div class="gd-q'+(open?' is-open':'')+'"><button type="button" data-q="'+id+'" aria-expanded="'+open+'" aria-controls="'+id+'"><span>'+esc(f.q)+'</span>'+ico('down')+'</button><div class="gd-q__a" id="'+id+'"'+(open?'':' hidden')+'><p>'+esc(f.a)+'</p></div></div>';
    }).join('')+'</div>','gd-card--flat');
  }
  function section(sec,i,s){
    if(sec.type==='table') return table(sec);
    if(sec.type==='notes') return notes(sec);
    if(sec.type==='faq') return faq(sec,'q'+s.id+'-'+i);
    if(sec.type==='block'){
      var body='<div class="gd-card__b gd-card__b--white">'+(sec.paras||[]).map(function(p){return '<p class="gd-p">'+esc(p)+'</p>'}).join('')+(sec.items.length?'<div class="gd-items">'+sec.items.map(itemCard).join('')+'</div>':'')+'</div>';
      return card(sec.title,body,'gd-card--flat');
    }
    return card(sec.title,'<div class="gd-card__b"><div class="gd-items">'+sec.items.map(itemCard).join('')+'</div></div>');
  }
  function pager(){
    return '<div class="gd-pager"><button class="gd-pg" type="button" data-go="-1"'+(state.step===1?' disabled':'')+' aria-label="Langkah sebelumnya">'+ico('left')+'</button><span>Langkah '+state.step+' dari '+N+'</span><button class="gd-pg" type="button" data-go="1"'+(state.step===N?' disabled':'')+' aria-label="Langkah berikutnya">'+ico('right')+'</button></div>';
  }
  function main(){
    var s=DATA[state.step-1];
    return '<div class="gd-main" id="gdMain" tabindex="-1" aria-label="Langkah '+s.id+': '+esc(s.short)+'">'+banner(s)+
      '<section class="gd-intro">'+s.intro.map(function(p){return '<p>'+esc(p)+'</p>'}).join('')+'</section>'+
      s.sections.map(function(sec,i){return section(sec,i,s)}).join('')+pager()+'</div>';
  }

  /* ───────── Render & events ───────── */
  function render(opt){
    opt=opt||{};
    host.innerHTML='<div class="gd-wrap">'+nav()+main()+'</div>';
    var m=$('#gdMain'); if(opt.enter&&m){m.classList.add('is-enter')}
    var act=opt.focus; if(act){var el=$(act); if(el) el.focus();}
    document.title='Nusantics – Panduan: '+DATA[state.step-1].short;
    try{var u=new URL(location.href); u.searchParams.set('step',state.step); history.replaceState(null,'',u)}catch(e){}
  }
  function go(n,focusMain){
    n=Math.min(N,Math.max(1,n)); if(n===state.step) return;
    state.step=n; render({enter:true,focus:focusMain?'#gdMain':'.gd-step.is-on'});
    var m=$('#gdMain'); if(m) m.scrollTop=0;
  }
  host.addEventListener('click',function(e){
    var b;
    if((b=e.target.closest('[data-step]'))) return go(+b.getAttribute('data-step'));
    if((b=e.target.closest('[data-go]'))) {go(state.step+ +b.getAttribute('data-go'),true); return;}
    if(e.target.closest('[data-toggle]')){
      state.min=!state.min; try{sessionStorage.setItem('nrd-guide-min',state.min?'1':'0')}catch(_){}
      var sc=$('#gdMain'), top=sc?sc.scrollTop:0; render({focus:'[data-toggle]'}); var m=$('#gdMain'); if(m) m.scrollTop=top; return;
    }
    if((b=e.target.closest('[data-q]'))){
      var id=b.getAttribute('data-q'); state.open[id]=!state.open[id];
      var q=b.closest('.gd-q'), a=$('#'+id,q); q.classList.toggle('is-open',state.open[id]); b.setAttribute('aria-expanded',!!state.open[id]); a.hidden=!state.open[id];
    }
  });
  host.addEventListener('keydown',function(e){
    if((e.key==='ArrowDown'||e.key==='ArrowUp')&&e.target.closest&&e.target.closest('.gd-steps')){
      e.preventDefault(); var d=e.key==='ArrowDown'?1:-1, n=Math.min(N,Math.max(1,state.step+d));
      if(n!==state.step){state.step=n; render({enter:true,focus:'.gd-step.is-on'}); var m=$('#gdMain'); if(m) m.scrollTop=0;}
    }
  });

  var c=document.getElementById('crumbPage'); if(c) c.textContent='Panduan';
  render();
})();
