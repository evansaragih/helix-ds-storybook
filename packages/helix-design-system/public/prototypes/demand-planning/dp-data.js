/* Shared mock dataset + helpers for the Demand Planning pages (create form, dashboard, detail).

   Simplified model:
     · scope   — one plan covers exactly one tambak. No region/provinsi scoping.
     · period  — bulan | minggu only. Creating a plan is limited to the eligible range
                 (next month as a whole, or the weeks left in the current month); viewing on the
                 dashboard is not limited, since realisasi for past periods still has to be read.
     · content — jumlah sampel, jumlah testing (never below sampel), and an optional breakdown of
                 those testing per penyakit.

   Realisasi/ekstrapolasi are generated deterministically from a hash so every page agrees on the
   numbers and they survive a reload. "Today" is 19 October 2026. */
window.DP=(function(){
  var MONTHS=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  var PENYAKIT=['AHPND','WSSV','IMNV','EHP','TSV','YHV','IHHNV','DIV1','CMNV'];
  var SALES=['Fatchur','Bu Siti'];
  var STATUS_LABEL={budidaya:'Budidaya',hatchery:'Hatchery/Nursery',pakan:'Perusahaan Pakan',distributor:'Perusahaan Distributor/Probiotik',off:'Off'};
  /* v3: follows the real clock (the original froze it at 19 Oktober 2026) */
  var TODAY=(function(){var d=new Date(); return {year:d.getFullYear(),month:d.getMonth(),day:d.getDate()};})();

  var REGIONS={
    'Indonesia Barat · Lab Jakarta':['Jawa Timur','Jawa Tengah','Jawa Barat','Lampung','Sumatera Selatan'],
    'Indonesia Timur · Lab Banyuwangi':['Sulawesi Selatan','Sulawesi Tengah','Nusa Tenggara Barat','Bali']
  };
  var PROVS=Object.keys(REGIONS).reduce(function(a,r){return a.concat(REGIONS[r])},[]);

  var FARMS=[
    ['Tambak Bina Mina','CKL-JT-001','Banyuwangi','Jawa Timur',12,'budidaya','Fatchur'],
    ['Tambak Samudra Jaya','CKL-JT-002','Situbondo','Jawa Timur',8,'budidaya','Fatchur'],
    ['Tambak Karya Bahari','CKL-JT-003','Probolinggo','Jawa Timur',10,'hatchery','Bu Siti'],
    ['Tambak Mina Lestari','CKL-JG-001','Kebumen','Jawa Tengah',6,'budidaya','Bu Siti'],
    ['Tambak Pantura Makmur','CKL-JG-002','Pati','Jawa Tengah',9,'budidaya','Fatchur'],
    ['Tambak Sinar Laut','CKL-JB-001','Indramayu','Jawa Barat',14,'budidaya','Fatchur'],
    ['Tambak Wira Sentosa','CKL-LP-001','Pesawaran','Lampung',20,'budidaya','Bu Siti'],
    ['Tambak Way Kambas Mina','CKL-LP-002','Lampung Timur','Lampung',11,'pakan','Fatchur'],
    ['Tambak Musi Bahari','CKL-SS-001','Banyuasin','Sumatera Selatan',7,'budidaya','Bu Siti'],
    ['Tambak Bone Jaya','CKL-SN-001','Bone','Sulawesi Selatan',13,'budidaya','Fatchur'],
    ['Tambak Pinrang Mandiri','CKL-SN-002','Pinrang','Sulawesi Selatan',9,'hatchery','Bu Siti'],
    ['Tambak Teluk Palu','CKL-ST-001','Donggala','Sulawesi Tengah',5,'off','Fatchur'],
    ['Tambak Sumbawa Windu','CKL-NB-001','Sumbawa','Nusa Tenggara Barat',16,'budidaya','Bu Siti'],
    ['Tambak Lombok Vaname','CKL-NB-002','Lombok Timur','Nusa Tenggara Barat',8,'budidaya','Fatchur'],
    ['Tambak Buleleng Mina','CKL-BL-001','Buleleng','Bali',4,'distributor','Bu Siti']
  ].map(function(f,i){
    var prov=f[3], region=Object.keys(REGIONS).filter(function(r){return REGIONS[r].indexOf(prov)>-1})[0];
    return {id:'f'+i,name:f[0],code:f[1],kab:f[2],prov:prov,region:region,ponds:f[4],status:f[5],pic:f[6]};
  }).concat([
    /* explicit ids ('tambakA'/'tambakB') so the FISHPOND_DEMAND_PLAN worked examples (below) can
       reference them directly — these are the two farms feature-spec.md §9.3 walks through. */
    {id:'tambakA',name:'Tambak A',code:'CKL-DEMO-A',kab:'Banyuwangi',prov:'Jawa Timur',region:'Indonesia Barat · Lab Jakarta',ponds:10,status:'budidaya',pic:'Fatchur'},
    {id:'tambakB',name:'Tambak B',code:'CKL-DEMO-B',kab:'Situbondo',prov:'Jawa Timur',region:'Indonesia Barat · Lab Jakarta',ponds:8,status:'budidaya',pic:'Bu Siti'}
  ]);
  var farmById=function(id){return FARMS.filter(function(f){return f.id===id})[0]};

  /* ───────── period: {type:'bulan'|'minggu', year, month, week?} ───────── */
  function daysIn(y,m){return new Date(y,m+1,0).getDate()}
  function range(p){
    if(p.type==='minggu'){var s=(p.week-1)*7+1; return {from:s,to:Math.min(s+6,daysIn(p.year,p.month))};}
    return {from:1,to:daysIn(p.year,p.month)};
  }
  function label(p){
    if(p.type==='minggu'){var r=range(p); return 'Minggu '+p.week+' · '+r.from+'–'+r.to+' '+MONTHS[p.month]+' '+p.year;}
    return MONTHS[p.month]+' '+p.year;
  }
  function kindLabel(p){return p.type==='minggu'?'Mingguan':'Bulanan'}
  function isFuture(p){
    if(p.year!==TODAY.year) return p.year>TODAY.year;
    return p.month>TODAY.month;   // the current month counts as in progress, so realisasi exists
  }
  /* A plan and a view window relate in both directions, so overlap (not containment) decides
     whether a plan is relevant, and `share` how much of it to count: a weekly plan seen inside
     its month counts whole; a monthly plan seen at one week is apportioned by days. */
  function overlaps(a,b){
    if(a.year!==b.year||a.month!==b.month) return false;
    var ra=range(a), rb=range(b);
    return ra.from<=rb.to&&ra.to>=rb.from;
  }
  function share(a,b){
    if(!overlaps(a,b)) return 0;
    var ra=range(a), rb=range(b);
    return (Math.min(ra.to,rb.to)-Math.max(ra.from,rb.from)+1)/(ra.to-ra.from+1);
  }

  /* ───────── eligible range for CREATING a plan ─────────
     Either next month as a whole, or the weeks of the current month that have not fully passed. */
  function nextMonth(){
    var m=TODAY.month+1,y=TODAY.year;
    if(m>11){m=0;y++;}
    return {type:'bulan',year:y,month:m};
  }
  function remainingWeeks(){
    var y=TODAY.year,m=TODAY.month,dim=daysIn(y,m),out=[];
    for(var w=1;(w-1)*7+1<=dim;w++){
      var from=(w-1)*7+1,to=Math.min(from+6,dim);
      if(to>=TODAY.day) out.push({type:'minggu',year:y,month:m,week:w});
    }
    return out;
  }

  /* ───────── realisasi (deterministic mock) ───────── */
  function hash(s){var n=0;for(var i=0;i<s.length;i++)n=(n*31+s.charCodeAt(i))>>>0;return n}
  function realisasiMonth(farm,y,m){
    if(farm.status==='off') return 0;
    var k=hash(farm.id+'|'+y+'|'+m);
    if(k%10<2) return 0;                       // ~20% of months the tambak sits out a cycle
    return Math.round(farm.ponds*0.6)+(k%7);
  }
  function realisasi(farm,p){
    if(isFuture(p)) return null;
    var m=realisasiMonth(farm,p.year,p.month);
    if(p.type==='bulan'||!m) return m;
    var r=range(p), sh=(r.to-r.from+1)/daysIn(p.year,p.month);
    return Math.round(m*sh*(0.9+(hash(farm.id+p.year+p.month+r.from)%20)/100));
  }
  /* testing realised alongside those sampel — always ≥ the sampel figure, same rule as a plan's own
     samples/tests, derived from a second hash so it doesn't just track sampel 1:1 */
  function realisasiTestsMonth(farm,y,m){
    var s=realisasiMonth(farm,y,m);
    if(!s) return 0;
    var k=hash(farm.id+'|'+y+'|'+m+'|tests');
    return s+Math.ceil(s*0.3)+(k%6);
  }
  function realisasiTests(farm,p){
    if(isFuture(p)) return null;
    var t=realisasiTestsMonth(farm,p.year,p.month);
    if(p.type==='bulan'||!t) return t;
    var r=range(p), sh=(r.to-r.from+1)/daysIn(p.year,p.month);
    return Math.round(t*sh*(0.9+(hash(farm.id+p.year+p.month+r.from+'|t')%20)/100));
  }
  /* A tambak needs a proyeksi for a period unless it is switched off entirely. */
  function isActive(farm){return farm.status!=='off'}

  /* ───────── ekstrapolasi: an optional, explicitly-picked comparison year, not a scoping rule.
     Mock history only goes back to 2025, so that's the floor regardless of "today". ───────── */
  var MIN_YEAR=2025;
  function atYear(p,year){
    var q={};for(var k in p) q[k]=p[k];
    q.year=year;
    if(q.type==='minggu'&&(q.week-1)*7+1>daysIn(q.year,q.month)) q.week=4;
    return q;
  }
  function extrapYears(){
    var out=[];
    for(var y=TODAY.year-1;y>=MIN_YEAR;y--) out.push(y);
    return out;
  }

  /* ───────── plans entered by sales — one tambak, one period ─────────
     A plan records the customer's answer, which is not always a number:
       kirim — customer will send: samples + tests (+ optional per-penyakit breakdown)
       tidak — customer will not send this period: needs a reason, and whether work moved to a
               competitor lab (sementara / permanen)
       belum — customer has not replied yet: sales still logs what they know
     `catatan` is free text for the why / what might happen. */
  var RESPONSE_LABEL={kirim:'Akan kirim sampel',tidak:'Tidak kirim sampel',belum:'Belum ada jawaban'};
  var KOMPETITOR_LABEL={tidak:'Tidak pindah',sementara:'Pindah sementara',permanen:'Pindah permanen'};
  /* Same curated list the real app uses for churn tracking (apps/cekolam-internal-dashboard's
     COMPETITOR_LABS, churn-reason-catalog.ts) — free-text suggestions, not a closed enum, so the
     form still takes a "Lainnya" option for a name not on this list. */
  var COMPETITOR_LABS=['Genics (Shrimp MultiPath)','JALA','GSI (Genomic Shrimp Indonesia)','Baliseafoodlab',
    'Balai KIPM / BKIPM','BBPBAP Jepara','Lab internal CP Prima','Lab internal STP (Suri Tani Pemuka)'];
  var SEED=[
    {id:'DP-2610-001',pic:'Fatchur',submittedAt:'12 Oktober 2026',period:{type:'bulan',year:2026,month:9},
     farm:'f0',resp:'kirim',samples:12,tests:20,penyakit:{WSSV:8,IMNV:6,AHPND:6},catatan:'',kompetitor:'tidak'},
    {id:'DP-2610-002',pic:'Fatchur',submittedAt:'12 Oktober 2026',period:{type:'bulan',year:2026,month:9},
     farm:'f1',resp:'kirim',samples:8,tests:8,penyakit:{},catatan:'',kompetitor:'tidak'},
    {id:'DP-2610-003',pic:'Bu Siti',submittedAt:'30 September 2026',period:{type:'bulan',year:2026,month:9},
     farm:'f3',resp:'kirim',samples:6,tests:12,penyakit:{AHPND:6,WSSV:6},catatan:'',kompetitor:'tidak'},
    {id:'DP-2610-004',pic:'Fatchur',submittedAt:'1 Oktober 2026',period:{type:'bulan',year:2026,month:9},
     farm:'f4',resp:'kirim',samples:9,tests:14,penyakit:{WSSV:9,EHP:5},catatan:'',kompetitor:'tidak'},
    {id:'DP-2610-005',pic:'Fatchur',submittedAt:'6 Oktober 2026',period:{type:'minggu',year:2026,month:9,week:2},
     farm:'f5',resp:'kirim',samples:10,tests:18,penyakit:{IMNV:10,WSSV:8},catatan:'',kompetitor:'tidak'},
    {id:'DP-2610-006',pic:'Bu Siti',submittedAt:'2 Oktober 2026',period:{type:'bulan',year:2026,month:9},
     farm:'f6',resp:'kirim',samples:20,tests:32,penyakit:{WSSV:20,AHPND:12},catatan:'',kompetitor:'tidak'},
    {id:'DP-2610-007',pic:'Bu Siti',submittedAt:'19 Oktober 2026',period:{type:'minggu',year:2026,month:9,week:4},
     farm:'f8',resp:'kirim',samples:7,tests:7,penyakit:{},catatan:'',kompetitor:'tidak'},
    {id:'DP-2610-008',pic:'Fatchur',submittedAt:'3 Oktober 2026',period:{type:'bulan',year:2026,month:9},
     farm:'f9',resp:'kirim',samples:13,tests:22,penyakit:{WSSV:13,TSV:9},catatan:'',kompetitor:'tidak'},
    {id:'DP-2610-009',pic:'Bu Siti',submittedAt:'5 Oktober 2026',period:{type:'bulan',year:2026,month:9},
     farm:'f10',resp:'kirim',samples:9,tests:15,penyakit:{EHP:9,IHHNV:6},catatan:'',kompetitor:'tidak'},
    {id:'DP-2610-010',pic:'Bu Siti',submittedAt:'8 Oktober 2026',period:{type:'bulan',year:2026,month:9},
     farm:'f12',resp:'kirim',samples:16,tests:24,penyakit:{WSSV:16,IMNV:8},catatan:'',kompetitor:'tidak'},
    {id:'DP-2610-011',pic:'Bu Siti',submittedAt:'9 Oktober 2026',period:{type:'bulan',year:2026,month:9},
     farm:'f2',resp:'tidak',samples:0,tests:0,penyakit:{},kompetitor:'sementara',competitorLab:'BBPBAP Jepara',
     catatan:'Siklus mundur karena perbaikan tandon. Bulan ini testing rutin dialihkan ke lab lain yang lebih dekat; customer bilang akan kembali setelah tandon selesai.'},
    {id:'DP-2610-012',pic:'Fatchur',submittedAt:'17 Oktober 2026',period:{type:'bulan',year:2026,month:9},
     farm:'f7',resp:'belum',samples:0,tests:0,penyakit:{},kompetitor:'tidak',
     catatan:'Sudah dihubungi 2× via WA, belum ada konfirmasi jumlah. PIC tambak sedang di luar kota sampai akhir bulan.'},
    {id:'DP-2611-001',pic:'Fatchur',submittedAt:'14 Oktober 2026',period:{type:'bulan',year:2026,month:10},
     farm:'f0',resp:'kirim',samples:14,tests:24,penyakit:{WSSV:14,IMNV:10},catatan:'',kompetitor:'tidak'},
    {id:'DP-2611-002',pic:'Bu Siti',submittedAt:'15 Oktober 2026',period:{type:'bulan',year:2026,month:10},
     farm:'f6',resp:'kirim',samples:18,tests:28,penyakit:{WSSV:18,AHPND:10},catatan:'',kompetitor:'tidak'},
    {id:'DP-2611-003',pic:'Fatchur',submittedAt:'16 Oktober 2026',period:{type:'bulan',year:2026,month:10},
     farm:'f9',resp:'kirim',samples:12,tests:12,penyakit:{},catatan:'',kompetitor:'tidak'},
    {id:'DP-2611-004',pic:'Fatchur',submittedAt:'17 Oktober 2026',period:{type:'bulan',year:2026,month:10},
     farm:'f13',resp:'kirim',samples:8,tests:13,penyakit:{WSSV:8,EHP:5},catatan:'',kompetitor:'tidak'},
    {id:'DP-2611-005',pic:'Bu Siti',submittedAt:'18 Oktober 2026',period:{type:'bulan',year:2026,month:10},
     farm:'f14',resp:'tidak',samples:0,tests:0,penyakit:{},kompetitor:'permanen',competitorLab:'Genics (Shrimp MultiPath)',
     catatan:'Customer pindah ke lab kompetitor dengan kontrak tahunan. Perlu eskalasi ke komersial sebelum siklus berikutnya.'}
  ];
  /* ───────── persistence ─────────
     Seed plans above are fixed demo content; plans submitted through the create form are kept in
     localStorage so they show up on the dashboard and detail pages after a reload. Storage can be
     unavailable (private window, blocked site data), so every access is guarded and the UI is told
     whether a submission actually persisted. */
  var STORE_KEY='cekolam-demand-planning:plans:v1';
  /* Mock "logged in as" — there's no real auth here, so Tugas Saya (the per-sales task list) reads
     who's "logged in" from this instead. Same guarded localStorage pattern as plan storage. */
  var SESSION_KEY='cekolam-demand-planning:session-sales';
  function getSession(){
    try{var v=localStorage.getItem(SESSION_KEY); return (v&&SALES.indexOf(v)>-1)?v:SALES[0];}
    catch(e){return SALES[0];}
  }
  function setSession(name){
    try{localStorage.setItem(SESSION_KEY,name); return true;}catch(e){return false;}
  }
  function loadStored(){
    try{var raw=localStorage.getItem(STORE_KEY); var v=raw?JSON.parse(raw):[]; return Array.isArray(v)?v:[];}
    catch(e){return [];}
  }
  function saveStored(){
    try{localStorage.setItem(STORE_KEY,JSON.stringify(STORED)); return true;}
    catch(e){return false;}
  }
  var STORED=loadStored();
  var PLANS=SEED.concat(STORED);

  function nextId(period){
    var pre='DP-'+String(period.year).slice(2)+('0'+(period.month+1)).slice(-2)+'-', n=1;
    while(PLANS.some(function(p){return p.id===pre+('00'+n).slice(-3)})) n++;
    return pre+('00'+n).slice(-3);
  }
  /* returns {plan, persisted} — persisted is false when storage refused the write */
  function addPlan(plan){
    plan.id=nextId(plan.period);
    plan.submittedAt=TODAY.day+' '+MONTHS[TODAY.month]+' '+TODAY.year;
    STORED.push(plan); PLANS.push(plan);
    return {plan:plan,persisted:saveStored()};
  }
  function storedCount(){return STORED.length}
  function resetPlans(){
    STORED.length=0; saveStored();
    PLANS.length=0; SEED.forEach(function(p){PLANS.push(p)});
  }

  function planFarm(plan){return farmById(plan.farm)}
  function penyakitTotal(plan){return Object.keys(plan.penyakit).reduce(function(s,d){return s+plan.penyakit[d]},0)}
  function plansIn(p){return PLANS.filter(function(pl){return overlaps(pl.period,p)})}
  function plansForFarm(farm,p){return plansIn(p).filter(function(pl){return pl.farm===farm.id})}
  function planById(id){return PLANS.filter(function(pl){return pl.id===id})[0]}
  /* proyeksi for one tambak in a window: null when no plan covers it (= sales hasn't recorded an
     answer at all). A recorded "tidak kirim" or "belum ada jawaban" is 0, not null — sales did
     their job, the customer's answer just wasn't a number. */
  function proyeksi(farm,p){
    var ps=plansForFarm(farm,p);
    return ps.length?ps.reduce(function(s,pl){return s+Math.round(pl.samples*share(pl.period,p))},0):null;
  }
  function tests(farm,p){
    var ps=plansForFarm(farm,p);
    return ps.length?ps.reduce(function(s,pl){return s+Math.round(pl.tests*share(pl.period,p))},0):null;
  }
  /* the single response to show on a row: the latest plan's, when there is exactly one story */
  function response(farm,p){
    var ps=plansForFarm(farm,p);
    if(!ps.length) return null;
    if(ps.some(function(pl){return pl.resp==='kirim'})) return 'kirim';
    return ps[ps.length-1].resp;
  }
  /* the dashboard's "Perlu diisi" feed: active tambak sales still has to chase — either nothing
     recorded at all, or an open "belum ada jawaban" that hasn't resolved into kirim/tidak yet. */
  function needsInput(farm,p){
    if(!isActive(farm)) return false;
    var r=response(farm,p);
    return r===null||r==='belum';
  }

  /* ═════════════════════════════════════════════════════════════════════════════════════════
     FISHPOND_DEMAND_PLAN (Phase 1) — a separate, additive engine. The legacy Plan/PLANS engine
     above keeps powering the Phase 2 dashboard/Tugas Saya screens completely unchanged; nothing
     below touches it. This is deliberate: Phase 2 is explicitly not being reworked against this
     model yet (feature-spec.md §14 Q11) — see dashboard.js/tasks.js, still on the old shape.

     One FishpondDemandPlan = one VERSION of a tambak+month's forecast. Creating a new version for
     a tambak+month that already has an ACTIVE one supersedes it; nothing is ever deleted. A week
     is never its own record — it's optional detail nested inside a whole-month version. ═════ */
  var FDP=(function(){
    function pad(n){return (n<10?'0':'')+n}
    function mondayOf(d){var day=d.getDay(),diff=(day===0?-6:1-day); return new Date(d.getFullYear(),d.getMonth(),d.getDate()+diff);}
    function addDays(d,n){return new Date(d.getFullYear(),d.getMonth(),d.getDate()+n);}
    function iso(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());}
    function fromIso(s){var p=s.split('-'); return new Date(+p[0],+p[1]-1,+p[2]);}
    function fmtDay(d){return d.getDate()+' '+MONTHS[d.getMonth()].slice(0,3)}
    function weekRangeLabel(mon){var sun=addDays(mon,6); return fmtDay(mon)+'–'+fmtDay(sun);}
    function todayDate(){return new Date(TODAY.year,TODAY.month,TODAY.day);}

    /* next month as a whole — the only eligible Bulan for creating/revising a plan */
    function nextMonthPeriod(){var m=TODAY.month+1,y=TODAY.year; if(m>11){m=0;y++;} return {year:y,month:m};}

    /* v3: eligible Bulan = the current month and the one after it */
    function eligibleMonths(){
      var nm=nextMonthPeriod();
      return [{year:TODAY.year,month:TODAY.month,kind:'current'},{year:nm.year,month:nm.month,kind:'next'}];
    }

    /* Eligible Mingguan weeks (v3): real Monday–Sunday weeks that have not started yet and whose Monday
       falls in the current month OR next month. A week belongs to "the month containing its Monday"
       (P-6/P-7), so weeks stay separated per month; one plan still covers a single month (P-8). */
    function eligibleWeeks(){
      var ms=eligibleMonths(), nm=ms[1];
      var cur=addDays(mondayOf(todayDate()),7), out=[];
      while(cur.getFullYear()<nm.year||(cur.getFullYear()===nm.year&&cur.getMonth()<=nm.month)){
        var inScope=ms.some(function(m){return m.year===cur.getFullYear()&&m.month===cur.getMonth();});
        if(inScope) out.push({start:new Date(cur),end:addDays(cur,6),belongsTo:{year:cur.getFullYear(),month:cur.getMonth()}});
        cur=addDays(cur,7);
      }
      return out;
    }

    /* A week is locked once it's started (or passed) — its Monday is on or before today's Monday.
       Locked weeks can't be added fresh (eligibleWeeks already excludes them going forward), but a
       week that WAS broken out in an earlier version, and has since started, must stay visible and
       counted in the remainder math on any later revision — it just can't be edited anymore. Only
       the whole-month total and still-upcoming weeks remain open to change. */
    function isLockedWeek(iso){
      return fromIso(iso) <= mondayOf(todayDate());
    }

    /* P-8: every week broken out in one version must belong to the same calendar month as every
       other week in that version ("the month containing its Monday", same rule as P-7). Exposed
       so both the create form and the data layer itself can enforce it, not just the UI. */
    function monthOfWeek(iso){ var d=mondayOf(fromIso(iso)); return {year:d.getFullYear(),month:d.getMonth()}; }
    function weeksSameMonth(weekly){
      if(!weekly||weekly.length<2) return true;
      var m0=monthOfWeek(weekly[0].weekStart);
      return weekly.every(function(w){var m=monthOfWeek(w.weekStart); return m.year===m0.year&&m.month===m0.month;});
    }

    /* ───────── store (append-only; STORED entries override a SEED id, or are new rows) ───── */
    var STORE_KEY='cekolam-demand-planning:fdp:v1';
    function loadStored(){try{var v=JSON.parse(localStorage.getItem(STORE_KEY)||'[]'); return Array.isArray(v)?v:[];}catch(e){return [];}}
    function saveStored(){try{localStorage.setItem(STORE_KEY,JSON.stringify(STORED)); return true;}catch(e){return false;}}

    /* The two worked examples from the product discussion, expanded into real version rows —
       these are the acceptance tests for the whole model (feature-spec.md §9.3). */
    var SEED=[
      {id:'FDP-1',farm:'tambakA',year:2026,month:10,status:'SUPERSEDED',supersedes:null,
       recordedBy:'Fatchur',recordedAt:'2026-10-19',recordedAtLabel:'19 Oktober 2026',
       response:'ya',samples:4,tests:12,weekly:[],testsByDisease:{},kenapa:''},
      {id:'FDP-2',farm:'tambakA',year:2026,month:10,status:'ACTIVE',supersedes:'FDP-1',
       recordedBy:'Fatchur',recordedAt:'2026-10-30',recordedAtLabel:'30 Oktober 2026',
       response:'ya',samples:4,tests:12,
       weekly:[{weekStart:'2026-11-02',samples:3,tests:9,testsByDisease:{}}],
       testsByDisease:{},kenapa:''},
      {id:'FDP-3',farm:'tambakB',year:2026,month:10,status:'SUPERSEDED',supersedes:null,
       recordedBy:'Bu Siti',recordedAt:'2026-10-19',recordedAtLabel:'19 Oktober 2026',
       response:'tidak',samples:0,tests:0,weekly:[],testsByDisease:{},kenapa:'Ke lab pakan lain'},
      {id:'FDP-4',farm:'tambakB',year:2026,month:10,status:'ACTIVE',supersedes:'FDP-3',
       recordedBy:'Bu Siti',recordedAt:'2026-10-30',recordedAtLabel:'30 Oktober 2026',
       response:'ya',samples:3,tests:9,weekly:[],testsByDisease:{},kenapa:''}
    ];
    var STORED=loadStored();
    function buildPlans(){
      var byId={}, order=[];
      SEED.forEach(function(p){byId[p.id]=p; order.push(p.id);});
      STORED.forEach(function(p){if(!byId[p.id]) order.push(p.id); byId[p.id]=p;});
      return order.map(function(id){return byId[id];});
    }
    var PLANS=buildPlans();

    function nextId(){
      var max=0;
      PLANS.forEach(function(p){var n=+String(p.id).replace('FDP-',''); if(n>max) max=n;});
      return 'FDP-'+(max+1);
    }
    function activeFor(farm,year,month){
      return PLANS.filter(function(p){return p.farm===farm&&p.year===year&&p.month===month&&p.status==='ACTIVE';})[0]||null;
    }
    function historyFor(farm,year,month){
      return PLANS.filter(function(p){return p.farm===farm&&p.year===year&&p.month===month;})
        .sort(function(a,b){return a.recordedAt<b.recordedAt?-1:a.recordedAt>b.recordedAt?1:0;});
    }
    function weeklySum(weekly,field){return (weekly||[]).reduce(function(s,w){return s+(w[field]||0);},0);}
    /* the undivided "sisa bulan" remainder — never computed per missing week, only as one lump sum */
    function remainderOf(plan){
      if(!plan||plan.response!=='ya') return null;
      return {samples:plan.samples-weeklySum(plan.weekly,'samples'),tests:plan.tests-weeklySum(plan.weekly,'tests')};
    }
    /* the hard ceiling (FR-R R-4): weekly sum must never exceed the whole-month total, either
       direction, and this is never auto-adjusted — the caller blocks and asks the user to fix it */
    function weeklyExceeds(samples,tests,weekly){
      var s=weeklySum(weekly,'samples'), t=weeklySum(weekly,'tests');
      return s>samples||t>tests;
    }

    function save(payload,supersedesId){
      if(payload.response==='ya'&&payload.weekly&&!weeksSameMonth(payload.weekly)){
        return {error:'WEEKS_MIXED_MONTH'};
      }
      var p={
        id:nextId(), farm:payload.farm, year:payload.year, month:payload.month,
        status:'ACTIVE', supersedes:supersedesId||null,
        recordedBy:payload.recordedBy, recordedAt:iso(todayDate()),
        recordedAtLabel:fmtDay(todayDate())+' '+payload.year,
        response:payload.response,
        samples:payload.response==='ya'?payload.samples:0,
        tests:payload.response==='ya'?payload.tests:0,
        weekly:payload.response==='ya'?(payload.weekly||[]):[],
        testsByDisease:payload.response==='ya'?(payload.testsByDisease||{}):{},
        kenapa:payload.response==='tidak'?(payload.kenapa||''):''
      };
      if(supersedesId){
        var prior=PLANS.filter(function(x){return x.id===supersedesId;})[0];
        if(prior){prior.status='SUPERSEDED'; upsertStored(prior);}
      }
      PLANS.push(p); upsertStored(p);
      var persisted=saveStored();
      return {plan:p,persisted:persisted};
    }
    function upsertStored(p){
      var i=STORED.findIndex?STORED.findIndex(function(x){return x.id===p.id;}):-1;
      if(i<0){for(var k=0;k<STORED.length;k++) if(STORED[k].id===p.id){i=k;break;}}
      if(i>=0) STORED[i]=p; else STORED.push(p);
    }

    /* ───────── the 4 operations ───────── */
    function createPlan(payload){
      if(activeFor(payload.farm,payload.year,payload.month)) return {ok:false,error:'ACTIVE_EXISTS'};
      var r=save(payload,null);
      if(r.error) return {ok:false,error:r.error};
      return {ok:true,plan:r.plan,persisted:r.persisted};
    }
    function revisePlan(payload){
      var cur=activeFor(payload.farm,payload.year,payload.month);
      if(!cur) return {ok:false,error:'NO_ACTIVE'};
      var r=save(payload,cur.id);
      if(r.error) return {ok:false,error:r.error};
      return {ok:true,plan:r.plan,persisted:r.persisted};
    }
    function getPlan(id){return PLANS.filter(function(p){return p.id===id;})[0]||null;}
    function listPlans(opts){
      opts=opts||{};
      return PLANS.filter(function(p){
        if(opts.farm&&p.farm!==opts.farm) return false;
        if(opts.year!=null&&p.year!==opts.year) return false;
        if(opts.month!=null&&p.month!==opts.month) return false;
        if(opts.status&&p.status!==opts.status) return false;
        return true;
      });
    }
    function storedCount(){return STORED.length;}
    function resetSeedOnly(){
      STORED.length=0; saveStored();
      PLANS=buildPlans();
    }

    return {nextMonthPeriod:nextMonthPeriod,eligibleMonths:eligibleMonths,eligibleWeeks:eligibleWeeks,weekRangeLabel:weekRangeLabel,
      isLockedWeek:isLockedWeek,monthOfWeek:monthOfWeek,weeksSameMonth:weeksSameMonth,
      iso:iso,fromIso:fromIso,fmtDay:fmtDay,
      activeFor:activeFor,historyFor:historyFor,weeklySum:weeklySum,remainderOf:remainderOf,
      weeklyExceeds:weeklyExceeds,createPlan:createPlan,revisePlan:revisePlan,getPlan:getPlan,
      listPlans:listPlans,storedCount:storedCount,resetSeedOnly:resetSeedOnly};
  })();

  return {MONTHS:MONTHS,PENYAKIT:PENYAKIT,SALES:SALES,STATUS_LABEL:STATUS_LABEL,TODAY:TODAY,
    RESPONSE_LABEL:RESPONSE_LABEL,KOMPETITOR_LABEL:KOMPETITOR_LABEL,COMPETITOR_LABS:COMPETITOR_LABS,
    REGIONS:REGIONS,PROVS:PROVS,FARMS:FARMS,PLANS:PLANS,farmById:farmById,
    daysIn:daysIn,range:range,label:label,kindLabel:kindLabel,isFuture:isFuture,
    overlaps:overlaps,share:share,nextMonth:nextMonth,remainingWeeks:remainingWeeks,
    realisasi:realisasi,realisasiTests:realisasiTests,isActive:isActive,
    MIN_YEAR:MIN_YEAR,atYear:atYear,extrapYears:extrapYears,
    planFarm:planFarm,penyakitTotal:penyakitTotal,plansIn:plansIn,plansForFarm:plansForFarm,
    planById:planById,proyeksi:proyeksi,tests:tests,response:response,needsInput:needsInput,
    addPlan:addPlan,storedCount:storedCount,resetPlans:resetPlans,
    getSession:getSession,setSession:setSession,
    FDP:FDP};
})();
