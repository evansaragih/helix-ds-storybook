/* Shared helpers for the auth pages: icons, toast, dialog, mock accounts. */
(function(){
  var S=function(p,x){return '<svg viewBox="0 0 24 24" fill="'+(x&&x.fill||'none')+'" stroke="'+(x&&x.fill?'none':'currentColor')+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>'};
  var I={
    back:S('<path d="M19 12H5M12 19l-7-7 7-7"/>'),
    info:S('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>'),
    check:S('<path d="M20 6 9 17l-5-5"/>'),
    x:S('<path d="M18 6 6 18M6 6l12 12"/>'),
    chev:S('<path d="m6 9 6 6 6-6"/>'),
    search:S('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>'),
    cloud:S('<path d="M12 13v8M8 17l4-4 4 4"/><path d="M20 16.6A5 5 0 0 0 18 7h-1.3A8 8 0 1 0 4 15.3"/>'),
    phone:S('<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>'),
    mail:S('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>'),
    at:S('<circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/>'),
    wifioff:S('<path d="M2 2l20 20M8.5 16.5a5 5 0 0 1 7 0M2 8.8a15 15 0 0 1 4.2-2.6M10.7 5.1A15 15 0 0 1 22 8.8M5 12.9a10 10 0 0 1 5.2-2.7M13.7 10.2A10 10 0 0 1 19 12.9M12 20h.01"/>'),
    circlecheck:S('<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>'),
    xcircle:S('<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/>'),
    wa:S('<path d="M3 21l1.7-5A9 9 0 1 1 8 19.3L3 21z"/><path d="M9 9c0 3.500 2.500 6 6 6l1.200-1.500-2-1-1 .8c-1-.4-2-1.400-2.400-2.400l.8-1-1-2L9 9z"/>'),
    google:'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M23 12.3c0-.8-.1-1.600-.2-2.300H12v4.400h6.200a5.300 5.300 0 0 1-2.300 3.500v2.900h3.700c2.200-2 3.400-5 3.400-8.500z"/><path fill="#34A853" d="M12 24c3.100 0 5.700-1 7.600-2.800l-3.700-2.900c-1 .7-2.300 1.100-3.900 1.100-3 0-5.500-2-6.400-4.700H1.800v3A12 12 0 0 0 12 24z"/><path fill="#FBBC05" d="M5.600 14.700a7.200 7.200 0 0 1 0-4.600v-3H1.800a12 12 0 0 0 0 10.700l3.800-3.100z"/><path fill="#EA4335" d="M12 4.800c1.700 0 3.200.6 4.400 1.700l3.300-3.300A12 12 0 0 0 1.800 7.100l3.800 3C6.500 6.800 9 4.800 12 4.800z"/></svg>'
  };
  var $=function(s,r){return (r||document).querySelector(s)};
  var esc=function(x){return String(x).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};

  /* ── toast ── */
  var tHost; function host(){ if(!tHost){tHost=document.createElement('div'); tHost.className='toasts'; tHost.setAttribute('aria-live','polite'); document.body.appendChild(tHost);} return tHost; }
  function toast(o){   /* {kind:'success'|'error', title, text, action:'Tutup'|'Link'} */
    var el=document.createElement('div'); el.className='toast toast--'+o.kind; el.setAttribute('role',o.kind==='error'?'alert':'status');
    el.innerHTML='<span class="toast__ic">'+(o.kind==='error'?I.xcircle:I.circlecheck)+'</span><div class="toast__tx"><b>'+esc(o.title)+'</b><p>'+esc(o.text)+'</p></div><button class="toast__x" type="button" aria-label="Tutup">'+I.x+'</button><button class="toast__act" type="button">'+esc(o.action||'Tutup')+'</button>';
    var gone=false, close=function(){ if(gone) return; gone=true; el.classList.add('is-out'); setTimeout(function(){el.remove()},200); };
    el.querySelector('.toast__x').onclick=close; el.querySelector('.toast__act').onclick=function(){ if(o.onAction) o.onAction(); close(); };
    host().appendChild(el); setTimeout(close,o.ms||7000); return close;
  }

  /* ── dialog ── */
  function dialog(o){  /* {html, onClose} → {close, el} */
    var prev=document.activeElement, sc=document.createElement('div'); sc.className='scrim';
    sc.innerHTML='<div class="dlg" role="dialog" aria-modal="true" aria-labelledby="dlgT">'+o.html+'<button class="dlg__x" type="button" data-close aria-label="Tutup">'+I.x+'</button></div>';
    var closing=false;
    function close(){ if(closing) return; closing=true; sc.classList.add('is-out'); document.removeEventListener('keydown',key); setTimeout(function(){sc.remove(); if(prev&&prev.focus) prev.focus(); if(o.onClose) o.onClose();},170); }
    function key(e){ if(e.key==='Escape') close(); }
    sc.addEventListener('mousedown',function(e){ if(e.target===sc) close(); });
    sc.addEventListener('click',function(e){ if(e.target.closest('[data-close]')) close(); });
    document.addEventListener('keydown',key); document.body.appendChild(sc);
    var f=$('[data-autofocus]',sc)||$('.dlg__x',sc); if(f) f.focus();
    return {close:close,el:sc};
  }

  /* ── mock backend ── */
  var APP_HOME='app/beranda.html';
  var INSTITUTIONS=[
    {n:'Institut Teknologi Bandung',d:'itb.ac.id'},{n:'Universitas Gadjah Mada',d:'ugm.ac.id'},{n:'Universitas Padjadjaran',d:'unpad.ac.id'},
    {n:'BRIN - Badan Riset dan Inovasi Nasional',d:'brin.go.id'},{n:'LIPI - Lembaga Ilmu Pengetahuan Indonesia',d:'lipi.go.id'},{n:'Eijkman Institute',d:'eijkman.or.id'}
  ];
  var KNOWN_EMAIL=['andi@itb.ac.id','evan@nusantics.co.id'];
  var DEMO_OTP='246810';   /* any other 6 digits is "not valid" */
  var okEmail=function(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)};
  var instEmail=function(v){return /@[^\s@]+\.(ac\.id|go\.id|or\.id)$/i.test(v)};
  var normPhone=function(v){return String(v).replace(/[\s\-]/g,'').replace(/^\+?62/,'').replace(/^0/,'')};
  var store={get:function(k){try{return JSON.parse(sessionStorage.getItem('nrd-'+k)||'null')}catch(e){return null}},set:function(k,v){try{sessionStorage.setItem('nrd-'+k,JSON.stringify(v))}catch(e){}}};

  window.Auth={I:I,$:$,esc:esc,toast:toast,dialog:dialog,APP_HOME:APP_HOME,INSTITUTIONS:INSTITUTIONS,KNOWN_EMAIL:KNOWN_EMAIL,DEMO_OTP:DEMO_OTP,okEmail:okEmail,instEmail:instEmail,normPhone:normPhone,store:store};
})();
