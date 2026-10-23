/* CeKolam Demand Planning — Step 1 (periode · filter · jumlah sampel per tambak).
   State: PERIOD (mode + values) and PLAN = {by:{jenis→count}, penyakit[]} — one plan, applied to every tambak in the chosen cakupan. */
(function(){
  var MAX=50;   // per jenis sampel
  var MONTHS=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  var YEARS=[2026,2027];
  var JENIS=['Udang','Benur','Kepiting Liar','Udang Liar','Pakan','Naupli','Lumpur'];
  var PENYAKIT=['AHPND','WSSV','IMNV','EHP','TSV','YHV','IHHNV','DIV1','CMNV'];

  var REGIONS={
    'Jawa':['Jawa Timur','Jawa Tengah','Jawa Barat'],
    'Sumatera':['Lampung','Sumatera Selatan'],
    'Sulawesi':['Sulawesi Selatan','Sulawesi Tengah'],
    'Bali & Nusa Tenggara':['Nusa Tenggara Barat','Bali']
  };
  var FARMS=[
    ['Tambak Bina Mina','CKL-JT-001','Banyuwangi','Jawa Timur',12,8],
    ['Tambak Samudra Jaya','CKL-JT-002','Situbondo','Jawa Timur',8,5],
    ['Tambak Karya Bahari','CKL-JT-003','Probolinggo','Jawa Timur',10,6],
    ['Tambak Mina Lestari','CKL-JG-001','Kebumen','Jawa Tengah',6,4],
    ['Tambak Pantura Makmur','CKL-JG-002','Pati','Jawa Tengah',9,6],
    ['Tambak Sinar Laut','CKL-JB-001','Indramayu','Jawa Barat',14,10],
    ['Tambak Wira Sentosa','CKL-LP-001','Pesawaran','Lampung',20,12],
    ['Tambak Way Kambas Mina','CKL-LP-002','Lampung Timur','Lampung',11,7],
    ['Tambak Musi Bahari','CKL-SS-001','Banyuasin','Sumatera Selatan',7,3],
    ['Tambak Bone Jaya','CKL-SN-001','Bone','Sulawesi Selatan',13,9],
    ['Tambak Pinrang Mandiri','CKL-SN-002','Pinrang','Sulawesi Selatan',9,5],
    ['Tambak Teluk Palu','CKL-ST-001','Donggala','Sulawesi Tengah',5,2],
    ['Tambak Sumbawa Windu','CKL-NB-001','Sumbawa','Nusa Tenggara Barat',16,11],
    ['Tambak Lombok Vaname','CKL-NB-002','Lombok Timur','Nusa Tenggara Barat',8,4],
    ['Tambak Buleleng Mina','CKL-BL-001','Buleleng','Bali',4,2]
  ].map(function(f,i){
    var prov=f[3], region=Object.keys(REGIONS).filter(function(r){return REGIONS[r].indexOf(prov)>-1})[0];
    return {id:'f'+i,name:f[0],code:f[1],kab:f[2],prov:prov,region:region,ponds:f[4],prev:f[5]};
  });

  var PLAN={by:{Udang:2,Benur:4},penyakit:['WSSV','IMNV']};   // one plan for the whole cakupan (demo values)
  var OPEN=true;   // penyakit accordion expanded (open by default; stays closed while there are no samples)

  var PERIOD={mode:'bulan',month:10,year:2026,week:1,date:'2026-11-02'};   // month is 0-based → November 2026

  var $=function(s,r){return (r||document).querySelector(s)};
  var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  var esc=function(x){return String(x).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
  var daysIn=function(y,m){return new Date(y,m+1,0).getDate()};
  var ico=function(id,cls){return '<svg class="dp-i'+(cls?' '+cls:'')+'" aria-hidden="true"><use href="#'+id+'"/></svg>'};
  var monthOpts=MONTHS.map(function(m,i){return {value:i,label:m}});
  var yearOpts=YEARS.map(function(y){return {value:y,label:String(y)}});
  var DOW=['Sen','Sel','Rab','Kam','Jum','Sab','Min'];
  var DAYS=['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  var pad2=function(n){return (n<10?'0':'')+n};
  var iso=function(y,m,d){return y+'-'+pad2(m+1)+'-'+pad2(d)};

  /* ───────── Popover (one open at a time, fixed to the viewport so scroll containers never clip it) ───────── */
  var POP=null;
  /* A closed panel stays mounted until its exit animation (.helix-pop, theme.css) ends; with reduced motion there is no animation, so it goes at once. */
  function removePanel(p){
    p.dataset.state='closed'; p.style.pointerEvents='none';
    if(getComputedStyle(p).animationName==='none'){p.remove(); return;}
    var gone=false, fin=function(){ if(gone) return; gone=true; p.remove(); };
    p.addEventListener('animationend',fin,{once:true}); setTimeout(fin,300);
  }
  function closePop(refocus){
    if(!POP) return; var p=POP; POP=null;
    removePanel(p.panel); p.anchor.setAttribute('aria-expanded','false'); if(refocus) p.anchor.focus();
  }
  function place(){
    if(!POP) return; var r=POP.anchor.getBoundingClientRect(), pn=POP.panel;
    pn.style.minWidth=r.width+'px';
    var w=pn.offsetWidth, h=pn.offsetHeight, top=r.bottom+8;
    var flip=top+h>innerHeight-8&&r.top-8-h>8;
    if(flip) top=r.top-8-h;   // flip above when there is no room below
    pn.dataset.side=flip?'top':'bottom';   // drives the 4px drift direction in .helix-pop
    top=Math.max(8,Math.min(top,innerHeight-8-h));
    pn.style.top=top+'px'; pn.style.left=Math.max(8,Math.min(r.left,innerWidth-w-8))+'px';
  }
  function openPop(anchor,panel){
    closePop(); panel.classList.add('helix-pop'); panel.dataset.state='open'; document.body.appendChild(panel); POP={anchor:anchor,panel:panel}; anchor.setAttribute('aria-expanded','true'); place();
  }
  document.addEventListener('pointerdown',function(e){ if(POP&&!POP.panel.contains(e.target)&&!POP.anchor.contains(e.target)) closePop(); },true);
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') closePop(true); });
  window.addEventListener('resize',function(){closePop();});
  document.addEventListener('scroll',function(e){ if(POP&&!POP.panel.contains(e.target)) closePop(); },true);

  /* Select — Input-style trigger + listbox panel (helix Select). c: {id,label?,pre?,options:[{value,label,short?,disabled?}],value,onChange,disabled?} */
  function Select(host,c){
    var cur=c.options.filter(function(o){return String(o.value)===String(c.value)})[0];
    host.className='sel';
    host.innerHTML=(c.label?'<label class="sel__label" for="'+c.id+'">'+esc(c.label)+'</label>':'')+
      '<button type="button" class="sel__btn" id="'+c.id+'" aria-haspopup="listbox" aria-expanded="false"'+(c.disabled?' disabled':'')+'>'+
      (c.pre?'<span class="sel__pre">'+esc(c.pre)+'</span>':'')+'<span class="sel__val'+(cur?'':' sel__ph')+'">'+esc(cur?(cur.short||cur.label):(c.placeholder||''))+'</span>'+ico('i-chev','sel__chev')+'</button>';
    var btn=host.querySelector('button');
    function open(){
      if(POP&&POP.anchor===btn) return closePop();
      var panel=document.createElement('div'); panel.className='pop';
      panel.innerHTML='<div class="pop__list" role="listbox" aria-label="'+esc(c.label||c.pre||'')+'">'+c.options.map(function(o,i){
        var sel=String(o.value)===String(c.value);
        return '<button type="button" class="pop__opt" role="option" data-i="'+i+'" aria-selected="'+sel+'"'+(o.disabled?' disabled':'')+'><span>'+esc(o.label)+'</span>'+(sel?ico('i-check'):'')+'</button>';
      }).join('')+'</div>';
      openPop(btn,panel);
      var opts=Array.prototype.slice.call(panel.querySelectorAll('.pop__opt:not(:disabled)'));
      (panel.querySelector('[aria-selected="true"]')||opts[0]).focus();
      panel.addEventListener('click',function(e){
        var o=e.target.closest('.pop__opt'); if(!o) return;
        closePop(false); c.onChange(c.options[+o.dataset.i].value);
        var b=document.getElementById(c.id); if(b) b.focus();   // the host was re-rendered by onChange
      });
      panel.addEventListener('keydown',function(e){
        var i=opts.indexOf(document.activeElement), n=null;
        if(e.key==='ArrowDown') n=opts[Math.min(i+1,opts.length-1)];
        else if(e.key==='ArrowUp') n=opts[Math.max(i-1,0)];
        else if(e.key==='Home') n=opts[0]; else if(e.key==='End') n=opts[opts.length-1];
        else if(e.key==='Tab') return closePop();
        if(n){e.preventDefault(); n.focus();}
      });
    }
    btn.addEventListener('click',open);
    btn.addEventListener('keydown',function(e){ if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault(); if(!(POP&&POP.anchor===btn)) open();} });
  }

  /* MultiSelect — Select with search, checkbox rows and Clear / Apply (helix Select selection=multi), plus a max. c: {id,label,options:[{value,label,sub?,search}],values,max,placeholder,onChange(values)} */
  function MultiSelect(host,c){
    var names=c.options.filter(function(o){return c.values.indexOf(o.value)>-1}).map(function(o){return o.label});
    var text=!names.length?(c.placeholder||''):names.length<=2?names.join(', '):names.length+' tambak dipilih';
    host.className='sel';
    host.innerHTML='<label class="sel__label" for="'+c.id+'">'+esc(c.label)+'</label><button type="button" class="sel__btn" id="'+c.id+'" aria-haspopup="listbox" aria-expanded="false"><span class="sel__val'+(names.length?'':' sel__ph')+'">'+esc(text)+'</span>'+(names.length?'<span class="sel__count">'+names.length+'/'+c.max+'</span>':'')+ico('i-chev','sel__chev')+'</button>';
    var btn=host.querySelector('button');
    btn.addEventListener('click',function(){
      if(POP&&POP.anchor===btn) return closePop();
      var draft=c.values.slice(), q='';
      var panel=document.createElement('div'); panel.className='pop pop--multi';
      panel.innerHTML='<div class="pop__search">'+ico('i-search')+'<input type="text" placeholder="Cari nama, kode, atau kabupaten" aria-label="Cari tambak" autocomplete="off"></div>'+
        '<div class="pop__list" role="listbox" aria-multiselectable="true" aria-label="'+esc(c.label)+'"></div>'+
        '<div class="pop__foot"><span class="pop__count" aria-live="polite"></span><button type="button" class="dp-btn dp-btn--xs dp-btn--ghost" data-m="clear">Clear</button><button type="button" class="dp-btn dp-btn--xs dp-btn--tertiary" data-m="apply">Apply</button></div>';
      var list=panel.querySelector('.pop__list'), input=panel.querySelector('input');
      function draw(){
        var full=draft.length>=c.max, ql=q.trim().toLowerCase();
        var rows=c.options.filter(function(o){return !ql||o.search.indexOf(ql)>-1});
        list.innerHTML=rows.length?rows.map(function(o){
          var on=draft.indexOf(o.value)>-1, off=!on&&full;
          return '<button type="button" class="gi-opt" role="option" data-v="'+o.value+'" aria-selected="'+on+'"'+(off?' disabled':'')+'><span class="gi__pad"><span class="gi__card">'+c.renderOption(o)+'<span class="cbx cbx--md">'+ico('i-check')+'</span></span></span></button>';
        }).join(''):'<div class="pop__none">Tambak tidak ditemukan</div>';
        panel.querySelector('.pop__count').textContent=draft.length+' dari '+c.max+' dipilih'+(full?' · batas tercapai':'');
        panel.querySelector('.pop__count').classList.toggle('is-full',full);
      }
      draw(); openPop(btn,panel); input.focus();
      input.addEventListener('input',function(){q=input.value; draw();});
      list.addEventListener('click',function(e){
        var o=e.target.closest('.gi-opt'); if(!o||o.disabled) return;
        var v=o.dataset.v, i=draft.indexOf(v); if(i>-1) draft.splice(i,1); else if(draft.length<c.max) draft.push(v);
        var top=list.scrollTop; draw(); list.scrollTop=top;
        var again=list.querySelector('[data-v="'+v+'"]'); if(again) again.focus();
      });
      panel.addEventListener('click',function(e){
        var m=e.target.closest('[data-m]'); if(!m) return;
        if(m.dataset.m==='clear'){draft=[]; draw();}
        else{closePop(false); c.onChange(draft.slice()); var b=document.getElementById(c.id); if(b) b.focus();}
      });
      panel.addEventListener('keydown',function(e){
        var opts=Array.prototype.slice.call(list.querySelectorAll('.gi-opt:not(:disabled)')), all=[input].concat(opts), i=all.indexOf(document.activeElement), n=null;
        if(e.key==='ArrowDown') n=all[Math.min(i+1,all.length-1)]; else if(e.key==='ArrowUp') n=all[Math.max(i-1,0)];
        if(n){e.preventDefault(); n.focus();}
      });
    });
    btn.addEventListener('keydown',function(e){ if(e.key==='ArrowDown'){e.preventDefault(); btn.click();} });
  }

  /* DatePick — same trigger, calendar panel (Monday first). c: {id,label,value:'YYYY-MM-DD',min,max,onChange} */
  function DatePick(host,c){
    var v=c.value.split('-'), view={y:+v[0],m:+v[1]-1}, today=new Date(), ti=iso(today.getFullYear(),today.getMonth(),today.getDate());
    host.className='sel';
    host.innerHTML='<label class="sel__label" for="'+c.id+'">'+esc(c.label)+'</label><button type="button" class="sel__btn" id="'+c.id+'" aria-haspopup="dialog" aria-expanded="false">'+ico('i-calendar','sel__lead')+'<span class="sel__val">'+esc(longDate(c.value))+'</span>'+ico('i-chev','sel__chev')+'</button>';
    var btn=host.querySelector('button');
    btn.addEventListener('click',function(){
      if(POP&&POP.anchor===btn) return closePop();
      var panel=document.createElement('div'); panel.className='pop pop--cal'; panel.setAttribute('role','dialog'); panel.setAttribute('aria-label','Pilih tanggal');
      function draw(){
        var first=(new Date(view.y,view.m,1).getDay()+6)%7, dm=daysIn(view.y,view.m), cells='';
        for(var i=0;i<first;i++) cells+='<span class="cal__day is-pad"></span>';
        for(var d=1;d<=dm;d++){
          var k=iso(view.y,view.m,d), dis=k<c.min||k>c.max;
          cells+='<button type="button" class="cal__day'+(k===c.value?' is-sel':'')+(k===ti?' is-today':'')+'" data-d="'+k+'"'+(k===c.value?' aria-pressed="true"':'')+(dis?' disabled':'')+'>'+d+'</button>';
        }
        var prevOk=iso(view.m?view.y:view.y-1,(view.m+11)%12,1)>=c.min.slice(0,8)+'01', nextOk=iso(view.m<11?view.y:view.y+1,(view.m+1)%12,1)<=c.max;
        panel.innerHTML='<div class="cal"><div class="cal__head"><button type="button" class="cal__nav" data-nav="-1" aria-label="Bulan sebelumnya"'+(prevOk?'':' disabled')+'>'+ico('i-prev')+'</button><span class="cal__title" aria-live="polite">'+MONTHS[view.m]+' '+view.y+'</span><button type="button" class="cal__nav" data-nav="1" aria-label="Bulan berikutnya"'+(nextOk?'':' disabled')+'>'+ico('i-next')+'</button></div>'+
          '<div class="cal__grid">'+DOW.map(function(x){return '<span class="cal__dow">'+x+'</span>'}).join('')+cells+'</div></div>';
      }
      draw(); openPop(btn,panel);
      (panel.querySelector('.is-sel')||panel.querySelector('.cal__day:not(.is-pad)')).focus();
      panel.addEventListener('click',function(e){
        var nav=e.target.closest('[data-nav]'), day=e.target.closest('[data-d]');
        if(nav){ view.m+=+nav.dataset.nav; if(view.m<0){view.m=11;view.y--;} else if(view.m>11){view.m=0;view.y++;} draw(); var n=panel.querySelector('[data-nav="'+nav.dataset.nav+'"]:not(:disabled)')||panel.querySelector('.cal__day:not(.is-pad)'); if(n) n.focus(); }
        else if(day){ closePop(false); c.onChange(day.dataset.d); var b=document.getElementById(c.id); if(b) b.focus(); }
      });
      panel.addEventListener('keydown',function(e){
        var days=Array.prototype.slice.call(panel.querySelectorAll('.cal__day:not(.is-pad):not(:disabled)')), i=days.indexOf(document.activeElement);
        if(i<0) return; var step={ArrowRight:1,ArrowLeft:-1,ArrowDown:7,ArrowUp:-7}[e.key];
        if(step&&days[i+step]){e.preventDefault(); days[i+step].focus();}
      });
    });
  }
  function longDate(k){var p=k.split('-'); return DAYS[new Date(+p[0],+p[1]-1,+p[2]).getDay()]+', '+(+p[2])+' '+MONTHS[+p[1]-1]+' '+p[0];}

  /* ───────── Periode ───────── */
  function weekRange(){
    var dm=daysIn(PERIOD.year,PERIOD.month), s=(PERIOD.week-1)*7+1;
    return {s:s,e:Math.min(s+6,dm)};
  }
  function periodLabel(){
    if(PERIOD.mode==='bulan') return MONTHS[PERIOD.month]+' '+PERIOD.year;
    if(PERIOD.mode==='minggu'){var r=weekRange(); return 'Minggu '+PERIOD.week+' · '+r.s+'–'+r.e+' '+MONTHS[PERIOD.month]+' '+PERIOD.year;}
    var p=PERIOD.date.split('-'); return +p[2]+' '+MONTHS[+p[1]-1]+' '+p[0];
  }
  function fixWeek(){var dm=daysIn(PERIOD.year,PERIOD.month); if((PERIOD.week-1)*7+1>dm) PERIOD.week=4;}   // Feb has no week 5
  function renderPeriod(){
    var f=$('#periodFields'), m=PERIOD.mode, h='';
    if(m==='tanggal') h='<div id="hDate"></div>';
    else h=(m==='minggu'?'<div id="hWeek"></div>':'')+'<div class="dp-row"><div id="hMonth"></div><div id="hYear"></div></div>';
    f.innerHTML=h;
    var again=function(){renderPeriod();};
    if(m==='tanggal') DatePick($('#hDate'),{id:'pDate',label:'Tanggal',value:PERIOD.date,min:'2026-01-01',max:'2027-12-31',onChange:function(v){PERIOD.date=v; again();}});
    else{
      if(m==='minggu'){
        var dm=daysIn(PERIOD.year,PERIOD.month);
        Select($('#hWeek'),{id:'pWeek',label:'Minggu',value:PERIOD.week,options:[1,2,3,4,5].map(function(w){var s=(w-1)*7+1; return {value:w,label:'Minggu '+w+' ('+s+'–'+Math.min(s+6,dm)+')',disabled:s>dm}}),onChange:function(v){PERIOD.week=+v; again();}});
      }
      Select($('#hMonth'),{id:'pMonth',label:'Bulan',value:PERIOD.month,options:monthOpts,onChange:function(v){PERIOD.month=+v; fixWeek(); again();}});
      Select($('#hYear'),{id:'pYear',label:'Tahun',value:PERIOD.year,options:yearOpts,onChange:function(v){PERIOD.year=+v; fixWeek(); again();}});
    }
    var l=periodLabel(); $('#periodBadge').textContent=l; $('#sumPeriod').textContent=l; $('#filterPeriod').textContent=l;
    $('#rangeHint').textContent=m==='bulan'?'Mencakup 1–'+daysIn(PERIOD.year,PERIOD.month)+' '+l:m==='minggu'?'Mencakup tanggal '+weekRange().s+'–'+weekRange().e+' '+MONTHS[PERIOD.month]+' '+PERIOD.year:'Rencana untuk satu hari: '+longDate(PERIOD.date);
  }
  $('#modeSeg').addEventListener('change',function(e){closePop(); PERIOD.mode=e.target.value; renderPeriod();});

  /* ───────── Cakupan tambak: Per Region · Per Provinsi · Per Tambak (max 5, searchable) ───────── */
  var MAX_FARMS=5;
  var SCOPE={mode:'tambak',region:'',prov:'',farms:['f0','f6']};
  var PROVS=Object.keys(REGIONS).reduce(function(a,r){return a.concat(REGIONS[r])},[]);
  function scopeFarms(){
    return FARMS.filter(function(f){
      return SCOPE.mode==='region'?(SCOPE.region&&f.region===SCOPE.region):SCOPE.mode==='prov'?(SCOPE.prov&&f.prov===SCOPE.prov):SCOPE.farms.indexOf(f.id)>-1;
    });
  }
  function scopeValue(){var n=scopeFarms().length; return SCOPE.mode==='region'?'Per Region · '+SCOPE.region:SCOPE.mode==='prov'?'Per Provinsi · '+SCOPE.prov:'Per Tambak · '+n+' tambak';}
  function scopeLabel(){
    var l=scopeFarms();
    return SCOPE.mode==='region'?SCOPE.region:SCOPE.mode==='prov'?SCOPE.prov:l.map(function(f){return f.name}).join(', ');
  }
  function renderScope(){
    var m=SCOPE.mode, f=$('#scopeFields'), n=scopeFarms().length;
    f.innerHTML='<div id="hScope"></div>';
    var host=$('#hScope');
    if(m==='region') Select(host,{id:'sRegion',label:'Region',placeholder:'Pilih region',value:SCOPE.region,options:Object.keys(REGIONS).map(function(r){return {value:r,label:r}}),onChange:function(v){SCOPE.region=v; scopeChanged();}});
    else if(m==='prov') Select(host,{id:'sProv',label:'Provinsi',placeholder:'Pilih provinsi',value:SCOPE.prov,options:PROVS.map(function(p){return {value:p,label:p}}),onChange:function(v){SCOPE.prov=v; scopeChanged();}});
    else MultiSelect(host,{id:'sFarms',label:'Tambak (maks. '+MAX_FARMS+')',placeholder:'Pilih tambak',max:MAX_FARMS,values:SCOPE.farms,
      options:FARMS.map(function(x){return {value:x.id,label:x.name,farm:x,search:(x.name+' '+x.code+' '+x.kab+' '+x.prov).toLowerCase()}}),
      renderOption:function(o){var x=o.farm; return '<span class="farm__icon">'+ico('i-waves')+'</span><span class="gi-opt__text"><span class="gi-opt__name">'+esc(x.name)+'</span>'+
        '<span class="farm__meta">'+ico('i-pin')+esc(x.kab)+', '+esc(x.prov)+'</span>'+
        '<span class="farm__tags"><span class="dp-chip dp-chip--brand">'+esc(x.region)+'</span><span class="dp-chip">'+esc(x.code)+'</span><span class="dp-chip">'+x.ponds+' kolam</span></span>'+
        '<span class="gi-opt__real">Realisasi periode lalu: <b>'+x.prev+'</b> sampel</span></span>';},
      onChange:function(v){SCOPE.farms=v; scopeChanged();}});
    $('#scopeBadge').textContent=n?n+' tambak':'Belum dipilih';
    $('#filterScope').textContent=n?scopeValue():'Belum dipilih';
    $('#scopeHint').textContent=m==='tambak'?'Pilih sampai '+MAX_FARMS+' tambak. Cari nama, kode, atau kabupaten di dalam dropdown.':(n?'Semua '+n+' tambak di '+scopeLabel()+' ikut direncanakan.':'Pilih '+(m==='region'?'region':'provinsi')+' untuk menampilkan semua tambaknya.');
  }
  function scopeChanged(){renderScope(); renderPlan();}
  $('#scopeSeg').addEventListener('change',function(e){closePop(); SCOPE.mode=e.target.value; scopeChanged();});

  /* ───────── Daftar tambak ───────── */
  var perFarm=function(){return JENIS.reduce(function(s,k){return s+(PLAN.by[k]||0)},0)};
  var ready=function(){return scopeFarms().length>0&&perFarm()>0};
  function detailSummary(){return PLAN.penyakit.length?PLAN.penyakit.length+' penyakit':'';}
  function planCard(){
    var on=perFarm()>0, open=on&&OPEN, n=scopeFarms().length;
    var rows=JENIS.map(function(jn,i){
      var v=PLAN.by[jn]||0, nid='n-'+i;
      return '<div class="jrow'+(v>0?' is-on':'')+'" data-j="'+esc(jn)+'"><label class="jrow__name" for="'+nid+'">'+esc(jn)+'</label>'+
        '<div class="jctrl"><button class="farm__stepbtn" type="button" data-act="dec" data-j="'+esc(jn)+'" aria-label="Kurangi sampel '+esc(jn)+'"'+(v<=0?' disabled':'')+'>−</button>'+
        '<div class="slider" style="--v:'+(v/MAX)+'"><input class="dp-range" type="range" min="0" max="'+MAX+'" step="1" value="'+v+'" style="--v:'+(v/MAX)+'" data-act="range" data-j="'+esc(jn)+'" aria-label="Jumlah sampel '+esc(jn)+'"><span class="slider__bubble" aria-hidden="true"><span>'+v+'</span><span></span></span></div>'+
        '<button class="farm__stepbtn" type="button" data-act="inc" data-j="'+esc(jn)+'" aria-label="Tambah sampel '+esc(jn)+'"'+(v>=MAX?' disabled':'')+'>+</button></div>'+
        '<input class="farm__num" id="'+nid+'" type="number" inputmode="numeric" min="0" max="'+MAX+'" value="'+v+'" data-act="num" data-j="'+esc(jn)+'"></div>';
    }).join('');
    var peny=PENYAKIT.map(function(d){return '<label class="cb"><input class="cb__in" type="checkbox" name="peny" value="'+d+'"'+(PLAN.penyakit.indexOf(d)>-1?' checked':'')+'><span class="cbx">'+ico('i-check')+'</span><span class="cb__t">'+d+'</span></label>'}).join('');
    return '<article class="cc cc--gray cc--floating plan">'+
      '<header class="cc__head cc__head--row"><div class="plan__t"><h3 class="plan__title" id="l-plan">Sampel per jenis</h3><p class="plan__hint">Maks. '+MAX+' per jenis · berlaku untuk setiap tambak</p></div>'+
        '<div class="plan__sum"><span>Per tambak <b data-total>'+perFarm()+'</b></span><span>Seluruh cakupan <b data-grand>'+perFarm()*n+'</b></span></div></header>'+
      '<div class="cc__body"><div class="jrows" role="group" aria-labelledby="l-plan">'+rows+'</div>'+
      '<div class="acc" data-state="'+(open?'open':'closed')+'"'+(on?'':' data-disabled')+'>'+
        '<h4 class="acc__h"><button class="acc__trig" type="button" data-act="more" id="t-peny" aria-expanded="'+open+'" aria-controls="d-peny"'+(on?'':' disabled')+'>'+
          '<span class="acc__title">Penyakit yang diuji<span class="acc__opt">Opsional</span></span><span class="acc__sum">'+esc(detailSummary())+'</span>'+ico('i-chev','acc__chev')+'</button></h4>'+
        '<div class="acc__panel" id="d-peny" role="region" aria-labelledby="t-peny"><div class="acc__clip"><div class="acc__in">'+
          '<fieldset class="dp-fs"><legend>Pilih penyakit<button type="button" data-act="clear-peny">Hapus pilihan</button></legend><div class="dp-opts dp-opts--cb">'+peny+'</div></fieldset>'+
        '</div></div></div></div></div></article>';
  }
  function renderPlan(){
    var farms=scopeFarms(), g=$('#groups');
    $('#resultCount').textContent=farms.length+' tambak'; $('#farmsBtn').disabled=!farms.length;
    if(!farms.length){
      g.innerHTML='<div class="dp-empty"><b>Pilih cakupan tambak</b><span>Pilih region, provinsi, atau tambak (maks. '+MAX_FARMS+') di panel kiri. Rincian sampel yang diisi akan berlaku untuk semua tambak tersebut.</span></div>';
    }else{
      g.innerHTML=planCard();
    }
    updateSummary();
  }

  function accSet(open){var a=$('#groups .acc'); if(!a) return; a.dataset.state=open?'open':'closed'; $('.acc__trig',a).setAttribute('aria-expanded',String(open));}
  /* one jenis sampel changed: sync the row, the totals and the accordion in place (re-rendering mid-drag would drop the slider) */
  function setJenis(jn,val,fromNum){
    var v=Math.max(0,Math.min(MAX,isNaN(val)?0:Math.round(val)));
    PLAN.by[jn]=v;
    var box=$('#groups'), row=box.querySelector('.jrow[data-j="'+jn+'"]'), r=$('.dp-range',row);
    r.value=v; r.style.setProperty('--v',v/MAX); $('.slider',row).style.setProperty('--v',v/MAX); $('.slider__bubble span',row).textContent=v;
    if(!fromNum) $('.farm__num',row).value=v;
    row.classList.toggle('is-on',v>0);
    $('[data-act="dec"]',row).disabled=v<=0; $('[data-act="inc"]',row).disabled=v>=MAX;
    var acc=$('.acc',box), on=perFarm()>0; $('.acc__trig',acc).disabled=!on;
    if(!on){acc.setAttribute('data-disabled',''); accSet(false);} else {acc.removeAttribute('data-disabled'); if(OPEN) accSet(true);}
    updateSummary();
  }
  function updateSummary(){
    var n=scopeFarms().length, per=perFarm();
    $('#sumFarms').textContent=n; $('#sumSamples').textContent=per*n;
    $('#next').disabled=!ready(); $('#clearAll').disabled=per===0;
    $('#sumHint').textContent=n===0?'Pilih cakupan tambak dulu':'Isi minimal satu jenis sampel untuk lanjut'; $('#sumHint').hidden=STEP===2||ready();
    var t=$('#groups [data-total]'), g=$('#groups [data-grand]'); if(t) t.textContent=per; if(g) g.textContent=per*n;
  }

  var groups=$('#groups');
  groups.addEventListener('input',function(e){
    if(e.target.dataset.act==='range') setJenis(e.target.dataset.j,+e.target.value);
    else if(e.target.dataset.act==='num'&&e.target.value!=='') setJenis(e.target.dataset.j,+e.target.value,true);
  });
  groups.addEventListener('change',function(e){
    if(e.target.dataset.act==='num') setJenis(e.target.dataset.j,+e.target.value);   // normalise blank / out-of-range input
    else if(e.target.type==='checkbox'){PLAN.penyakit=$$('input[type=checkbox]:checked',groups).map(function(c){return c.value}); $('.acc__sum',groups).textContent=detailSummary();}
  });
  groups.addEventListener('click',function(e){
    var b=e.target.closest('[data-act]'); if(!b) return;
    if(b.dataset.act==='inc') setJenis(b.dataset.j,(PLAN.by[b.dataset.j]||0)+1);
    else if(b.dataset.act==='dec') setJenis(b.dataset.j,(PLAN.by[b.dataset.j]||0)-1);
    else if(b.dataset.act==='more'){OPEN=!OPEN; accSet(OPEN);}
    else if(b.dataset.act==='clear-peny'){PLAN.penyakit=[]; $$('input[type=checkbox]',groups).forEach(function(c){c.checked=false}); $('.acc__sum',groups).textContent=detailSummary();}
  });

  /* ───────── Step switch: 1 Rencana (editable) ⇄ 2 Tinjau (read-only) ───────── */
  var STEP=1;
  var CHECK=ico('i-check');
  var kindLabel=function(){return {bulan:'Bulanan',minggu:'Mingguan',tanggal:'Per tanggal'}[PERIOD.mode];};
  /* Tinjau motion: numbers count up from 0 (value keeps its sign), and the layout replays its enter animation on every step change */
  var REDUCED=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  function countUp(el,delay){
    var m=el.textContent.match(/^([+−]?)(\d+)$/); if(!m||REDUCED) return;
    var to=+m[2], t0=0, DUR=700;
    el.textContent=m[1]+'0';
    function tick(now){
      if(!t0) t0=now; var k=Math.min(1,(now-t0)/DUR);
      el.textContent=m[1]+Math.round(to*(1-Math.pow(1-k,3)));
      if(k<1) requestAnimationFrame(tick);
    }
    setTimeout(function(){requestAnimationFrame(tick)},delay);
  }
  function replayEnter(){var L=$('#dpLayout'); L.classList.remove('is-enter'); void L.offsetWidth; L.classList.add('is-enter');}
  /* Badge Group (size lg, leading): a pill holding a solid Badge (the label) + the value */
  var bgp=function(color,label,value){return '<span class="bgp bgp--'+color+'" role="listitem"><span class="bgp__badge">'+esc(label)+'</span><span class="bgp__val">'+esc(value)+'</span></span>'};
  function deltaBadge(d){return d===0?'<span class="dp-delta">Tetap</span>':'<span class="dp-delta '+(d>0?'dp-delta--up':'dp-delta--down')+'">'+(d>0?'+':'−')+Math.abs(d)+'</span>';}
  function renderReview(){
    var list=scopeFarms(), per=perFarm();
    $('#periodView').innerHTML=bgp('info','Jenis periode',kindLabel())+bgp('warning','Periode',periodLabel())+bgp('neutral','Cakupan tambak',scopeValue())+bgp('brand','Total tambak',list.length)+bgp('success','Total sampel',per*list.length);
    var n=list.length, prev=list.reduce(function(a,f){return a+f.prev},0), now=per*n, d=now-prev;
    var pct=prev?Math.round(Math.abs(d)/prev*100):0, tone=d>0?'up':d<0?'down':'flat';
    var m=function(cls,label,val,sub){return '<div class="ov__m'+cls+'"><span class="ov__label">'+label+'</span><span class="ov__val">'+val+'</span><span class="ov__sub">'+sub+'</span></div>'};
    var strip=m('','Periode lalu',prev,'Total '+n+' tambak')+m(' ov__m--now','Rencana sekarang',now,'Total '+n+' tambak')+
      m(' ov__m--'+tone,'Perubahan',(d>0?'+':d<0?'−':'')+Math.abs(d),prev?(d===0?'Sama dengan periode lalu':(d>0?'Naik ':'Turun ')+pct+'%'):'Belum ada data lalu');
    var trows=JENIS.filter(function(k){return (PLAN.by[k]||0)>0}).map(function(k){return '<tr><th scope="row">'+esc(k)+'</th><td>'+PLAN.by[k]*n+'</td></tr>'}).join('');
    var peny=PLAN.penyakit.length?'<div class="ov__peny"><span class="ov__label">Penyakit diuji</span><span class="ov__chips">'+PLAN.penyakit.map(function(x){return '<span class="dp-chip dp-chip--brand">'+esc(x)+'</span>'}).join('')+'</span></div>':'';
    $('#reviewBody').innerHTML='<div class="ov"><div class="ov__strip">'+strip+'</div>'+
      '<table class="ov__tbl"><caption class="sr-only">Rincian sampel akumulasi '+n+' tambak</caption><thead><tr><th scope="col">Jenis sampel</th><th scope="col">Total</th></tr></thead><tbody>'+trows+'</tbody>'+
      '<tfoot><tr><th scope="row">Total sampel</th><td>'+now+'</td></tr></tfoot></table>'+peny+'</div>';
    $('#reviewCount').textContent=list.length+' tambak';
    $$('#reviewBody .ov__val, #reviewBody .ov__tbl td').forEach(function(el){countUp(el,300)});
  }
  function setStep(n,silent){
    STEP=n; closePop(); sheetOpen(false,true); $('#dpLayout').dataset.step=n; replayEnter();
    var review=n===2;
    $('#pageSub').textContent=review?'Periksa kembali rencana sampel sebelum dikirim. Pada langkah ini data tidak bisa diubah.':'Tentukan jumlah sampel yang direncanakan untuk setiap tambak pada periode yang dipilih.';
    [['st1',1],['st2',2],['st3',3]].forEach(function(s){
      var el=$('#'+s[0]), cur=s[1]===n, done=s[1]<n;
      el.className='dp-step'+(cur?' is-current':'')+(done?' is-done':''); if(cur) el.setAttribute('aria-current','step'); else el.removeAttribute('aria-current');
      $('.dp-step__n',el).innerHTML=done?CHECK:String(s[1]);
    });
    $('#scopeCard').hidden=review; $('.cc__head',$('#periodCard')).hidden=review; $('#periodEdit').hidden=review; $('#periodView').hidden=!review; $('#periodBadge').hidden=review;
    $('#listCard').hidden=review; $('#reviewCard').hidden=!review;
    $('#clearAll').hidden=review; $('#next').hidden=review; $('#sumHint').hidden=review||ready();
    $('#back').hidden=!review; $('#submit').hidden=!review;
    if(review) renderReview();
    $('#dpScroll').scrollTop=0; if(!silent) $('#pageTitle').focus({preventScroll:true});
  }
  $('#back').addEventListener('click',function(){setStep(1);});
  $('#submit').addEventListener('click',function(){say('Langkah 3 (Submit) belum dibuat',$('#sumFarms').textContent+' tambak · '+$('#sumSamples').textContent+' sampel · '+periodLabel());});

  /* ───────── Toastr (transient, top-right) with a compact Alert ───────── */
  var alertHtml=function(o){
    return '<div class="alert'+(o.compact?' alert--compact':'')+'" role="'+(o.compact?'status':'alert')+'">'+
      (o.compact?'':'<div class="alert__row">')+'<span class="alert__tile">'+ico('i-info')+'</span><div class="alert__body"><p class="alert__title">'+esc(o.title)+'</p><p class="alert__desc">'+esc(o.desc)+'</p></div>'+
      (o.close?'<button class="alert__close" type="button" aria-label="Tutup" data-close>'+ico('i-x')+'</button>':'')+(o.compact?'':'</div>')+'</div>';
  };
  var tw=document.createElement('div'); tw.className='toastr'; tw.innerHTML='<div class="toastr__box"></div>'; document.body.appendChild(tw);
  var toastT=0;
  function say(title,desc){
    $('.toastr__box',tw).innerHTML=alertHtml({compact:true,title:title,desc:desc});
    void tw.offsetWidth; tw.classList.add('on');   // let the hidden state paint so it slides in
    clearTimeout(toastT); toastT=setTimeout(function(){tw.classList.remove('on')},4000);
  }
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') tw.classList.remove('on'); });
  /* Native <dialog> has no exit animation: play .is-closing first, then close(). Esc, backdrop click and the form buttons all go through here. */
  function animateClose(d,value){
    if(!d.open||d.classList.contains('is-closing')) return;
    var done=function(){ d.classList.remove('is-closing'); d.close(value===undefined?'':value); };
    if(getComputedStyle(d).animationName==='none') return done();
    d.classList.add('is-closing');
    var fired=false, fin=function(e){ if(e&&e.target!==d) return; if(fired) return; fired=true; done(); };
    d.addEventListener('animationend',fin); setTimeout(function(){fin();},300);
  }
  function wireDialog(d){
    d.addEventListener('cancel',function(e){e.preventDefault(); animateClose(d);});
    $$('form[method="dialog"]',d).forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault(); animateClose(d,e.submitter?e.submitter.value:'');});});
  }
  /* "N tambak" button → Dialog with the tambak in the cakupan as a table (read-only detail) */
  var fdlg=$('#farmsDlg');
  function renderFarmsDlg(){
    var list=scopeFarms(), kolam=0, real=0;
    $('#farmsDesc').textContent=list.length+' tambak · '+(SCOPE.mode==='tambak'?'Per Tambak':scopeValue());
    var rows=list.map(function(f){kolam+=f.ponds; real+=f.prev;
      return '<tr><td class="rowh"><div class="tbl__main"><b>'+esc(f.name)+'</b><span class="tbl__sub">'+esc(f.code)+'</span></div></td>'+
        '<td data-label="Lokasi">'+esc(f.kab)+', '+esc(f.prov)+'</td>'+
        '<td data-label="Region"><span class="dp-chip dp-chip--brand">'+esc(f.region)+'</span></td>'+
        '<td class="num" data-label="Jumlah kolam">'+f.ponds+'</td>'+
        '<td class="num" data-label="Realisasi periode lalu">'+f.prev+' sampel</td></tr>';
    }).join('');
    $('#farmsBody').innerHTML='<div class="tbl"><table><caption class="sr-only">Tambak dalam cakupan '+esc(scopeValue())+'</caption><thead><tr><th scope="col">Tambak</th><th scope="col">Lokasi</th><th scope="col">Region</th><th scope="col" class="num">Jumlah kolam</th><th scope="col" class="num">Realisasi periode lalu</th></tr></thead><tbody>'+rows+'</tbody>'+
      '<tfoot><tr><td>Total</td><td class="m-hide"></td><td class="m-hide"></td><td class="num" data-label="Jumlah kolam">'+kolam+'</td><td class="num" data-label="Realisasi periode lalu">'+real+' sampel</td></tr></tfoot></table></div>';
  }
  $('#farmsBtn').addEventListener('click',function(){renderFarmsDlg(); closePop(); fdlg.showModal();});
  wireDialog(fdlg);
  fdlg.addEventListener('click',function(e){ if(e.target===fdlg) animateClose(fdlg); });   // backdrop click closes, like the helix Dialog overlay
  fdlg.addEventListener('close',function(){$('#farmsBtn').focus();});

  /* Kosongkan → Alert Dialog (destructive) to confirm before wiping the entered data */
  var dlg=$('#clearDlg'); wireDialog(dlg);
  $('#clearAll').addEventListener('click',function(){
    var n=scopeFarms().length, per=perFarm();
    $('#clearDesc').textContent=per+' sampel per tambak (total '+per*n+' sampel untuk '+n+' tambak) akan dikosongkan, termasuk penyakit yang sudah dipilih. Cakupan tambak dan periode tidak berubah. Tindakan ini tidak dapat dibatalkan.';
    closePop(); dlg.showModal();
  });
  dlg.addEventListener('close',function(){
    if(dlg.returnValue==='confirm'){PLAN={by:{},penyakit:[]}; OPEN=true; renderPlan(); say('Data rencana sudah dikosongkan','Isi kembali jumlah sampel per jenis');}
    dlg.returnValue=''; $('#clearAll').focus();
  });
  $('#next').addEventListener('click',function(){setStep(2);});

  /* sidebar collapse (same toggle behaviour as the Nusantics shell) */
  var sb=$('#sidebar'), tg=$('#sbToggle');
  tg.addEventListener('click',function(){
    var c=sb.classList.toggle('collapsed'); tg.setAttribute('aria-expanded',String(!c)); tg.setAttribute('aria-label',c?'Perluas sidebar':'Ciutkan sidebar');
  });

  /* Mobile (≤640px): Periode + Cakupan live in a bottom sheet; the page shows one summary card that opens it */
  var sheet=$('#dpAside'), scrim=$('#sheetScrim'), filterBtn=$('#filterBtn');
  function sheetOpen(open,silent){
    if(sheet.classList.contains('is-open')===open) return;
    closePop(); sheet.classList.toggle('is-open',open); scrim.classList.toggle('is-open',open); filterBtn.setAttribute('aria-expanded',String(open));
    if(open){sheet.setAttribute('role','dialog'); sheet.setAttribute('aria-modal','true'); sheet.setAttribute('aria-labelledby','sheetTitle'); $('#sheetClose').focus();}
    else{sheet.removeAttribute('role'); sheet.removeAttribute('aria-modal'); sheet.removeAttribute('aria-labelledby'); if(!silent) filterBtn.focus();}
  }
  filterBtn.addEventListener('click',function(){sheetOpen(true);});
  [scrim,$('#sheetClose'),$('#sheetDone')].forEach(function(el){el.addEventListener('click',function(){sheetOpen(false);});});
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&!POP) sheetOpen(false); },true);   // capture: runs before the popover handler clears POP, so Esc closes the open dropdown first

  var LAY=new URLSearchParams(location.search).get('layout');   // ?layout=stacked puts Periode above the list instead of in the left rail
  if(LAY==='stacked') $('#dpLayout').dataset.layout='stacked';
  renderPeriod(); renderScope(); renderPlan(); setStep(new URLSearchParams(location.search).get('step')==='2'?2:1,true);   // ?step=2 opens Tinjau directly
})();
