/* Shared pieces of the Run workflow pages (steps 1 to 3): icons, toast, modal, confirm dialog, progress panel, credit band. */
(function(){
  var $=function(s,r){return (r||document).querySelector(s)};
  var esc=function(x){return String(x).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
  var P={
    min:'M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7',max:'M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7',
    clip:'M9 2h6a1 1 0 0 1 1 1v2H8V3a1 1 0 0 1 1-1zM8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2M9 12h6M9 16h6',
    sheet:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h8M12 11v8',
    edit:'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z',check:'M20 6 9 17l-5-5',
    ccheck:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM8.500 12.500l2.500 2.500 4.500-5',trash:'M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6',
    plus:'M12 5v14M5 12h14',copy:'M9 9h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V11a2 2 0 0 1 2-2zM5 15H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1',
    dl:'M12 3v12M7 10l5 5 5-5M5 21h14',up:'M12 16V4M7 9l5-5 5 5M5 20h14',left:'M19 12H5M11 18l-6-6 6-6',right:'M5 12h14M13 6l6 6-6 6',
    info:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 11v5M12 8h.01',x:'M18 6 6 18M6 6l12 12',down:'m6 9 6 6 6-6',reset:'M3 12a9 9 0 1 0 3-6.700L3 8M3 3v5h5',
    coin:'M12 8c4.400 0 8-1.300 8-3s-3.600-3-8-3-8 1.300-8 3 3.600 3 8 3zM4 5v4c0 1.700 3.600 3 8 3s8-1.300 8-3V5M4 9v4c0 1.700 3.600 3 8 3s8-1.300 8-3V9M4 13v4c0 1.700 3.600 3 8 3s8-1.300 8-3v-4',
    users:'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',book:'M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.500v14zM20 17v4H6.500A2.500 2.500 0 0 1 4 19.500',
    warn:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 7v6M12 16.500h.01',tri:'M12 3 2 21h20L12 3zM12 10v5M12 18h.01',filter:'M3 5h18l-7 8v6l-4 2v-8L3 5z',search:'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.300-4.300',dots:'M5 12h.01M12 12h.01M19 12h.01'
  };
  var ico=function(n){return '<svg class="rn-i s" viewBox="0 0 24 24" aria-hidden="true"><path d="'+P[n]+'"/></svg>'};

  /* ── toast + dialog (same look as the Run page) ── */
  var th; function toast(kind,title,text){
    if(!th){th=document.createElement('div'); th.className='rn-toasts'; th.setAttribute('aria-live','polite'); document.body.appendChild(th);}
    var el=document.createElement('div'); el.className='rn-toast rn-toast--'+kind; el.setAttribute('role',kind==='error'?'alert':'status');
    el.innerHTML='<span class="rn-toast__ic">'+ico(kind==='error'?'x':'check')+'</span><div class="rn-toast__tx"><b>'+esc(title)+'</b><p>'+esc(text)+'</p></div><button class="rn-toast__x" type="button" aria-label="Tutup">'+ico('x')+'</button>';
    var gone=false, close=function(){if(gone) return; gone=true; el.classList.add('is-out'); setTimeout(function(){el.remove()},200)};
    el.querySelector('.rn-toast__x').onclick=close; th.appendChild(el); setTimeout(close,6000);
  }
  /* modal helper: html goes inside .rn-modal__box; returns {el,close} */
  function modal(box,cls){
    var prev=document.activeElement, sc=document.createElement('div'); sc.className='rn-modal'+(cls?' '+cls:'');
    sc.innerHTML=box; var done=false;
    function close(cb){ if(done) return; done=true; sc.classList.add('is-leaving'); document.removeEventListener('keydown',key); setTimeout(function(){sc.remove(); if(prev&&prev.focus) prev.focus(); if(typeof cb==='function') cb();},170); }
    function key(e){ if(e.key==='Escape') close(); }
    sc.addEventListener('mousedown',function(e){ if(e.target===sc&&!sc.classList.contains('fl-sheetwrap')) close(); else if(e.target===sc) close(); });
    document.addEventListener('keydown',key); document.body.appendChild(sc);
    return {el:sc,close:close};
  }
  /* confirm dialog: icon tile + centred text + two full-width buttons */
  function cdlg(o){   /* {tone:'red'|'amber', title, text, cancel, ok, danger, onOk} */
    var ic=o.tone==='red'?ico('trash'):ico('tri');
    var m=modal('<div class="rn-modal__box fl-cd" role="alertdialog" aria-modal="true" aria-labelledby="cdT"><div class="fl-cd__b"><span class="fl-cd__ic fl-cd__ic--'+o.tone+'">'+ic+'</span><h2 id="cdT">'+esc(o.title)+'</h2><p>'+esc(o.text)+'</p></div><div class="fl-cd__f"><button class="rn-btn" type="button" data-x>'+esc(o.cancel||'Batalkan')+'</button><button class="rn-btn '+(o.danger?'rn-btn--dangersolid':'rn-btn--primary')+'" type="button" data-ok>'+esc(o.ok)+'</button></div></div>');
    m.el.addEventListener('click',function(e){ if(e.target.closest('[data-x]')) m.close(); else if(e.target.closest('[data-ok]')) m.close(o.onOk); });
    $('[data-ok]',m.el).focus(); return m;
  }
  var run=(function(){try{return JSON.parse(sessionStorage.getItem('nrd-run')||'null')}catch(e){return null}})()||{name:'Praktikum Mikrobiologi - Semester Ganjil 2026',kit:192};
  var balance=(function(){try{var v=localStorage.getItem('nusantics-credit-v2'); return v===null?852:Math.max(+v,run.kit)}catch(e){return 852}})();
  function progress(rail,step){
    var st=[['1','Identifikasi Sampel'],['2','Unggah FASTQ & Validasi Data'],['3','Analisis']];
    return '<aside class="fl-prog'+(rail?' is-rail':'')+'" aria-label="Progress Run"><div class="fl-prog__h"><div><h2>Progress Run</h2><p>Step '+step+' dari 3</p></div><button class="fl-ib" type="button" data-a="rail" aria-label="'+(rail?'Perluas':'Ciutkan')+' progress run" aria-expanded="'+!rail+'">'+ico(rail?'max':'min')+'</button></div>'+
      '<ol class="fl-steps">'+st.map(function(s,i){var n=i+1, cls=n<step?' is-done':n===step?' is-now':'', tag=n<step?'Selesai':n===step?'Dalam Proses':'Menunggu';
        return '<li class="fl-step'+cls+'"'+(n===step?' aria-current="step"':'')+'><span class="fl-n">'+(n<step?ico('check'):s[0])+'</span><span class="fl-st__t"><span class="fl-tag">'+tag+'</span><b>'+s[1]+'</b></span></li>'}).join('')+'</ol>'+
      '<div style="flex:1"></div><div class="fl-note"><span class="fl-note__ic">'+ico('sheet')+'</span><b>Panduan Nama File FASTQ</b><a href="#" data-a="guide">Lihat Detail</a></div></aside>';
  }
  function band(){
    return '<div class="fl-band"><div class="rn-bg rn-bg--brand"><span>Kelompok Studi</span><span class="rn-pill rn-pill--brand">'+ico('book')+'Genetika dan Bioteknologi Molekuler</span></div>'+
      '<div class="fl-bd fl-band__mid"><span class="rn-pill">'+ico('coin')+'Sisa '+balance+' kredit</span><span style="padding-right:8px">'+run.kit+' kredit digunakan</span></div>'+
      '<button class="fl-ib" type="button" data-a="runinfo" aria-label="Detail run">'+ico('clip')+'</button></div>';
  }
  function sel(id,val,opts,ph,bad){
    return '<div class="rn-sel2" data-sel="'+id+'"><button class="rn-sel2__t'+(bad?' is-bad':'')+'" type="button" aria-haspopup="listbox" aria-expanded="false"'+(bad?' aria-invalid="true"':'')+'><span class="rn-sel2__v'+(val?'':' ph')+'">'+esc(val||ph)+'</span>'+ico('down')+'</button><div class="rn-sel2__pop" hidden><div class="rn-sel2__list" role="listbox">'+opts.map(function(o){var on=o===val; return '<button class="rn-sel2__o'+(on?' is-on':'')+'" type="button" role="option" aria-selected="'+on+'" data-v="'+esc(o)+'"><span>'+esc(o)+'</span>'+(on?ico('check'):'')+'</button>'}).join('')+'</div></div></div>';
  }

  window.Flow={$:$,esc:esc,ico:ico,toast:toast,modal:modal,cdlg:cdlg,run:run,balance:balance,progress:progress,band:band,sel:sel};
})();
