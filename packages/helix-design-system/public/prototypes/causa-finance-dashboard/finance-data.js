/* ===========================================================================
   Causa Admin — Rekap Keuangan: dataset + derivations.

   SHAPE IS REAL, IDENTITIES ARE NOT. The column structure, service catalog,
   price points, category mix and money arithmetic were derived from a real
   sample export (558 tests, Jan–Oct 2026). Providers, labs and patients are
   invented — see finance-catalog.js.

   Money model, as the real book states it:

       before_tax  = RPP / 1.11                  (RPP is quoted WITH PPN)
       komisi      = pct x RPP                   (pct of RPP INCLUDING PPN: 15% or 20%)
       lab COGS    = a price list, ~65-70% of before_tax, 47%-110% observed
       take        = before_tax - komisi - lab   (the REMAINDER)
       payable     = before_tax - komisi         (what a provider owes)

   Because the take is the remainder, the tri-partite identity holds exactly at
   every level of aggregation with no rounding residual. It also means the take
   on an individual test CAN BE NEGATIVE when the lab's price is high relative
   to the customer price — ~2.5% of tests in the real sample, reproduced here
   rather than smoothed away.

   Consumed by the dashboard, transaction list, test list and document pages.
   Requires finance-catalog.js to be loaded first.
   =========================================================================== */

window.FD = (function () {
  'use strict';

  const PPN_PERCENT = 11;

  /* ---- periods ----------------------------------------------------------
     `factor`  scales the whole book so the month stepper moves real numbers.
     `labAdj` / `provAdj` drift the commission mix in percentage points so each
     period is not a scaled copy of the last — lab terms renegotiating down
     over time. Both are clamped back into the agreed bands (lab 60-70,
     provider 15-20) when applied.
     `status`  drives the close-state chip.
     --------------------------------------------------------------------- */
  /* Three years. 2026 is the live one: eleven periods, `factor` following the
     real export's monthly ramp — a quiet Q1, an April spike, then a gentle
     decline, with November still open.
     2024 and 2025 are closed history at roughly a third and two thirds of
     2026's volume: Causa was ramping, and a year picker that only ever shows
     the same shape teaches finance nothing about the trend.
     Lab terms renegotiated downward over time, so `labAdj` starts high in 2024
     and decays — the earlier years give Nusantics a thinner take, which is
     what actually happened.
     `labAdj` / `provAdj` nudge the mix so no two periods are identical. */
  const PERIODS = [
    { id: '2024-01', label: 'Januari 2024',   month:  1, year: 2024, factor: 0.09, labAdj:  5.0, provAdj:  1.4, status: 'closed' },
    { id: '2024-02', label: 'Februari 2024',  month:  2, year: 2024, factor: 0.11, labAdj:  4.9, provAdj:  1.4, status: 'closed' },
    { id: '2024-03', label: 'Maret 2024',     month:  3, year: 2024, factor: 0.10, labAdj:  4.8, provAdj:  1.3, status: 'closed' },
    { id: '2024-04', label: 'April 2024',     month:  4, year: 2024, factor: 0.14, labAdj:  4.7, provAdj:  1.3, status: 'closed' },
    { id: '2024-05', label: 'Mei 2024',       month:  5, year: 2024, factor: 0.13, labAdj:  4.6, provAdj:  1.3, status: 'closed' },
    { id: '2024-06', label: 'Juni 2024',      month:  6, year: 2024, factor: 0.16, labAdj:  4.5, provAdj:  1.2, status: 'closed' },
    { id: '2024-07', label: 'Juli 2024',      month:  7, year: 2024, factor: 0.18, labAdj:  4.4, provAdj:  1.2, status: 'closed' },
    { id: '2024-08', label: 'Agustus 2024',   month:  8, year: 2024, factor: 0.17, labAdj:  4.3, provAdj:  1.2, status: 'closed' },
    { id: '2024-09', label: 'September 2024', month:  9, year: 2024, factor: 0.21, labAdj:  4.2, provAdj:  1.1, status: 'closed' },
    { id: '2024-10', label: 'Oktober 2024',   month: 10, year: 2024, factor: 0.24, labAdj:  4.1, provAdj:  1.1, status: 'closed' },
    { id: '2024-11', label: 'November 2024',  month: 11, year: 2024, factor: 0.22, labAdj:  4.0, provAdj:  1.0, status: 'closed' },
    { id: '2024-12', label: 'Desember 2024',  month: 12, year: 2024, factor: 0.19, labAdj:  3.9, provAdj:  1.0, status: 'closed' },

    { id: '2025-01', label: 'Januari 2025',   month:  1, year: 2025, factor: 0.22, labAdj:  3.6, provAdj:  0.9, status: 'closed' },
    { id: '2025-02', label: 'Februari 2025',  month:  2, year: 2025, factor: 0.26, labAdj:  3.5, provAdj:  0.9, status: 'closed' },
    { id: '2025-03', label: 'Maret 2025',     month:  3, year: 2025, factor: 0.28, labAdj:  3.4, provAdj:  0.9, status: 'closed' },
    { id: '2025-04', label: 'April 2025',     month:  4, year: 2025, factor: 0.41, labAdj:  3.3, provAdj:  0.8, status: 'closed' },
    { id: '2025-05', label: 'Mei 2025',       month:  5, year: 2025, factor: 0.35, labAdj:  3.2, provAdj:  0.8, status: 'closed' },
    { id: '2025-06', label: 'Juni 2025',      month:  6, year: 2025, factor: 0.44, labAdj:  3.1, provAdj:  0.8, status: 'closed' },
    { id: '2025-07', label: 'Juli 2025',      month:  7, year: 2025, factor: 0.47, labAdj:  3.0, provAdj:  0.7, status: 'closed' },
    { id: '2025-08', label: 'Agustus 2025',   month:  8, year: 2025, factor: 0.52, labAdj:  2.9, provAdj:  0.7, status: 'closed' },
    { id: '2025-09', label: 'September 2025', month:  9, year: 2025, factor: 0.49, labAdj:  2.8, provAdj:  0.7, status: 'closed' },
    { id: '2025-10', label: 'Oktober 2025',   month: 10, year: 2025, factor: 0.58, labAdj:  2.6, provAdj:  0.6, status: 'closed' },
    { id: '2025-11', label: 'November 2025',  month: 11, year: 2025, factor: 0.61, labAdj:  2.4, provAdj:  0.6, status: 'closed' },
    { id: '2025-12', label: 'Desember 2025',  month: 12, year: 2025, factor: 0.54, labAdj:  2.2, provAdj:  0.6, status: 'closed' },

    { id: '2026-01', label: 'Januari 2026',   month:  1, year: 2026, factor: 0.37, labAdj:  2.0, provAdj:  0.6, status: 'closed' },
    { id: '2026-02', label: 'Februari 2026',  month:  2, year: 2026, factor: 0.39, labAdj:  1.8, provAdj:  0.5, status: 'closed' },
    { id: '2026-03', label: 'Maret 2026',     month:  3, year: 2026, factor: 0.33, labAdj:  1.6, provAdj:  0.5, status: 'closed' },
    { id: '2026-04', label: 'April 2026',     month:  4, year: 2026, factor: 1.09, labAdj:  1.4, provAdj:  0.4, status: 'closed' },
    { id: '2026-05', label: 'Mei 2026',       month:  5, year: 2026, factor: 0.82, labAdj:  1.2, provAdj:  0.4, status: 'closed' },
    { id: '2026-06', label: 'Juni 2026',      month:  6, year: 2026, factor: 1.01, labAdj:  1.0, provAdj:  0.3, status: 'closed' },
    { id: '2026-07', label: 'Juli 2026',      month:  7, year: 2026, factor: 0.69, labAdj:  0.8, provAdj:  0.3, status: 'closed' },
    { id: '2026-08', label: 'Agustus 2026',   month:  8, year: 2026, factor: 0.53, labAdj:  0.6, provAdj:  0.2, status: 'closed' },
    { id: '2026-09', label: 'September 2026', month:  9, year: 2026, factor: 0.50, labAdj:  0.4, provAdj:  0.1, status: 'closed' },
    { id: '2026-10', label: 'Oktober 2026',   month: 10, year: 2026, factor: 0.47, labAdj:  0.0, provAdj:  0.0, status: 'reconciling' },
    { id: '2026-11', label: 'November 2026',  month: 11, year: 2026, factor: 0.40, labAdj: -0.3, provAdj: -0.1, status: 'open' },
  ];
  const YEARS = [
    { id: '2024', label: 'Tahun 2024' },
    { id: '2025', label: 'Tahun 2025' },
    { id: '2026', label: 'Tahun 2026' },
  ];

  const LAB_PCT_RANGE = [60, 70];
  const PROVIDER_PCT_RANGE = [15, 20];
  function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }
  const DEFAULT_PERIOD = '2026-10';

  const PERIOD_STATUS = {
    open:        { label: 'Terbuka',      cls: 'chip-open',   note: 'Periode berjalan, angka masih bisa berubah.' },
    reconciling: { label: 'Rekonsiliasi', cls: 'chip-recon',  note: 'Periode ditutup, sedang direkonsiliasi.' },
    closed:      { label: 'Ditutup',      cls: 'chip-closed', note: 'Periode terkunci.' },
  };

  /* Share of a period's orders that have actually moved cash. Settlement
     trails the close: an open period has barely been disbursed, a closed one
     is nearly done. Per-pair `settleBias` then models prompt vs slow payers. */
  const PERIOD_SETTLEMENT = { open: 0.12, reconciling: 0.64, closed: 0.97 };

  /* ---- self-lab ---------------------------------------------------------
     A provider that sends orders to its OWN lab. Mechanically this is an
     ordinary BY_PROVIDER arrangement and nothing about the shape changes:
     the organization still earns a provider commission, Nusantics still pays
     a lab commission, and the payable is still before-tax minus the provider
     commission. Two things are different:

       1. The provider and the lab are the SAME legal entity. Nusantics
          invoices it as the provider and pays it as the lab. Both happen,
          both are documents, and we do not net them.
       2. The Nusantics margin is much smaller — 3%-5% of RPP against 8%-12%
          on a third-party order — because we are the rails, not the
          intermediary. That is the platform fee, and here it is set per
          organization rather than falling out of a lab price list.

     So the lab commission is the REMAINDER on these orders: whatever is left
     of the before-tax value after the organization's provider commission and
     our fee. It runs higher than a third-party lab's cut, which is expected
     for an internal transfer price.
     --------------------------------------------------------------------- */
  const PLATFORM_FEE_RANGE = [3, 5];    // % of RPP, incl PPN; per organization

  /* ---- organizations ---- */
  /* Skema insentif providers are individual doctors: a doctor refers the
     patient and Nusantics pays them a referral incentive. Skema payable
     providers are institutions that bill the patient themselves and therefore
     owe Nusantics — so they are clinics and hospitals, never individuals. */
  const PROVIDERS = {
    'PRV-01': { name: 'dr. Anindya Prameswari, Sp.PD', type: 'doctor', city: 'Jakarta Selatan', commissionPctOfRpp: 20 },
    'PRV-02': { name: 'dr. Bagus Nugroho, Sp.OG', type: 'doctor', city: 'Bandung', commissionPctOfRpp: 15 },
    'PRV-03': { name: 'dr. Citra Halimah, Sp.A', type: 'doctor', city: 'Surabaya', commissionPctOfRpp: 15 },
    'PRV-04': { name: 'dr. Damar Wicaksono, Sp.KK', type: 'doctor', city: 'Semarang', commissionPctOfRpp: 15 },
    'PRV-05': { name: 'dr. Elok Rahmawati, Sp.PK', type: 'doctor', city: 'Yogyakarta', commissionPctOfRpp: 15 },
    'PRV-06': { name: 'dr. Fajar Mahendra, Sp.PD', type: 'doctor', city: 'Tangerang', commissionPctOfRpp: 15 },
    'PRV-07': { name: 'Klinik Cahaya Sehat', type: 'clinic', city: 'Medan', commissionPctOfRpp: 15 },
    'PRV-08': { name: 'Klinik Mitra Keluarga Sejahtera', type: 'clinic', city: 'Bekasi', commissionPctOfRpp: 20 },
    'PRV-09': { name: 'RS Graha Medika', type: 'clinic', city: 'Makassar', commissionPctOfRpp: 15, platformFeePct: 4.5 },
    'PRV-10': { name: 'Klinik Bunda Asih', type: 'clinic', city: 'Denpasar', commissionPctOfRpp: 15 },
    'PRV-11': { name: 'RS Puspa Harapan', type: 'clinic', city: 'Palembang', commissionPctOfRpp: 15, platformFeePct: 3.2 },
    /* Newly onboarded — nothing settled yet, so bulk settlement can be
       exercised against a whole group. See `settleBias: 0` below. */
    'PRV-12': { name: 'Klinik Sehat Lestari', type: 'clinic', city: 'Malang', commissionPctOfRpp: 15 },
    'PRV-13': { name: 'dr. Gayatri Hapsari, Sp.OG', type: 'doctor', city: 'Solo', commissionPctOfRpp: 20 },
    'PRV-14': { name: 'RS Tirta Kencana', type: 'clinic', city: 'Balikpapan', commissionPctOfRpp: 15, platformFeePct: 3.8 },
  };
  const PROVIDER_TYPE = { doctor: 'Dokter', clinic: 'Klinik / RS' };
  const SERVICE_CATEGORY = { ESOTERIC: 'Esoteric', ROUTINE: 'Routine', MICROBIOMIC: 'Microbiomic' };

  const LABS = {
    /* `cogsPct` is what the lab charges Nusantics, as a share of the
       before-tax customer value. In the real book this is a PRICE LIST, not a
       rate: it clusters at 65.0% and 69.4% but runs 47%–110% per test, and
       past ~83% the Nusantics take on that test goes NEGATIVE. */
    'LAB-01': { name: 'Lab Diagnostik Nusantara', city: 'Jakarta Pusat', cogsPct: 69.4 },
    'LAB-02': { name: 'Lab Genomika Prima',       city: 'Bandung',       cogsPct: 65.0 },
    'LAB-03': { name: 'Lab Patologi Mandiri',     city: 'Surabaya',      cogsPct: 69.4 },
    /* On a self-lab pair `cogsPct` is unused: the lab leg is the remainder
       after our fee, not a price list. */
    'LAB-04': { name: 'Lab Graha Medika',         city: 'Makassar',      cogsPct: 65.0, selfLabOf: 'PRV-09' },
    'LAB-05': { name: 'Lab Puspa Harapan',        city: 'Palembang',     cogsPct: 65.0, selfLabOf: 'PRV-11' },
    /* Also newly onboarded: every pair it serves is unsettled, so the Lab
       section has a whole-group bulk-settlement case too. */
    'LAB-06': { name: 'Lab Sentra Biomedika',     city: 'Malang',        cogsPct: 67.0 },
    'LAB-07': { name: 'Lab Tirta Kencana',        city: 'Balikpapan',    cogsPct: 65.0, selfLabOf: 'PRV-14' },
  };

  const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const MONTHS_LONG = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
    'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  /* Real catalog + anonymised identity pools — see finance-catalog.js. */
  const SERVICES = FC.SERVICES;
  const SERVICE_TOTAL_WEIGHT = SERVICES.reduce(function (a, x) { return a + x.w; }, 0);

  function pickService(r) {
    let n = r * SERVICE_TOTAL_WEIGHT;
    for (let i = 0; i < SERVICES.length; i++) {
      n -= SERVICES[i].w;
      if (n <= 0) return SERVICES[i];
    }
    return SERVICES[0];
  }

  /* ---- provider x lab aggregates ----------------------------------------
     scheme: 'incentive'  = DIRECT      -> Nusantics pays the provider
             'payable'    = BY_PROVIDER -> provider owes Nusantics
     Self-lab orders are always 'payable' and priced at the INTERNAL tier.
     `settleBias` multiplies the period's settlement rate for this pair:
     > 1 pays/disburses promptly, < 1 lags. Settlement is tracked per ORDER,
     never per pair — an aggregate row is a mix of settled and outstanding
     orders, so it gets a progress figure, not a single status.

     `settleBias: 0` means NOTHING on that pair has ever settled. Those rows
     exist on purpose: bulk settlement is the primary operation on this
     surface, and it needs a counterparty where every order in the group is
     still outstanding, otherwise the dialog can only ever be exercised
     against a partial selection. There is one in each section.
     --------------------------------------------------------------------- */
  const PAIRS = [
    // --- skema insentif (DIRECT) ---
    { id: 'P-01', providerId: 'PRV-01', labId: 'LAB-01', scheme: 'incentive', tier: 'DEFAULT', orders:  40, settleBias: 1.35 },
    { id: 'P-02', providerId: 'PRV-02', labId: 'LAB-02', scheme: 'incentive', tier: 'DEFAULT', orders:  30, settleBias: 1.20 },
    { id: 'P-03', providerId: 'PRV-03', labId: 'LAB-01', scheme: 'incentive', tier: 'GROUP',   orders:  23, settleBias: 0.45 },
    { id: 'P-04', providerId: 'PRV-04', labId: 'LAB-03', scheme: 'incentive', tier: 'DEFAULT', orders:  15, settleBias: 1.75 },
    { id: 'P-05', providerId: 'PRV-05', labId: 'LAB-02', scheme: 'incentive', tier: 'DEFAULT', orders:   9, settleBias: 0.25 },
    { id: 'P-06', providerId: 'PRV-06', labId: 'LAB-03', scheme: 'incentive', tier: 'ORGANIZATION', orders:  12, settleBias: 1.80 },
    { id: 'P-07', providerId: 'PRV-01', labId: 'LAB-02', scheme: 'incentive', tier: 'DEFAULT', orders:  10, settleBias: 0.95 },

    // --- skema payable (BY_PROVIDER + lab sendiri) ---
    { id: 'P-08', providerId: 'PRV-07', labId: 'LAB-01', scheme: 'payable', tier: 'DEFAULT', orders:  19, settleBias: 1.85 },
    { id: 'P-09', providerId: 'PRV-08', labId: 'LAB-03', scheme: 'payable', tier: 'DEFAULT', orders:  12, settleBias: 1.70 },
    { id: 'P-10', providerId: 'PRV-09', labId: 'LAB-04', scheme: 'payable', tier: 'INTERNAL', orders:   7, settleBias: 0.30, selfLab: true },
    { id: 'P-11', providerId: 'PRV-10', labId: 'LAB-02', scheme: 'payable', tier: 'DEFAULT', orders:   6, settleBias: 0.55 },
    { id: 'P-12', providerId: 'PRV-08', labId: 'LAB-01', scheme: 'payable', tier: 'GROUP',   orders:   4, settleBias: 1.15 },
    { id: 'P-13', providerId: 'PRV-11', labId: 'LAB-05', scheme: 'payable', tier: 'INTERNAL', orders:   5, settleBias: 1.40, selfLab: true },

    /* --- nothing settled: one per section, for bulk settlement ---
       P-14 and P-15 both route to LAB-06, so that lab is 0% as well and the
       Lab section gets a whole-group case without zeroing an existing lab. */
    { id: 'P-14', providerId: 'PRV-12', labId: 'LAB-06', scheme: 'payable',   tier: 'DEFAULT',  orders:   8, settleBias: 0 },
    { id: 'P-15', providerId: 'PRV-13', labId: 'LAB-06', scheme: 'incentive', tier: 'DEFAULT',  orders:   6, settleBias: 0 },
    { id: 'P-16', providerId: 'PRV-14', labId: 'LAB-07', scheme: 'payable',   tier: 'INTERNAL', orders:   4, settleBias: 0, selfLab: true },
  ];

  /* `paymentType` is the backend enum and is NOT copy: nothing renders it.
     The house terms are "Skema Insentif" and "Skema Provider", which is what
     the price-list PDFs in causa-admin-portal are called, so DIRECT and
     BY_PROVIDER stay in the code and out of the interface. */
  const SCHEMES = {
    incentive: { label: 'Skema Insentif', short: 'Insentif', paymentType: 'DIRECT',
                 direction: 'Nusantics membayar provider', flow: 'out' },
    payable:   { label: 'Skema Provider', short: 'Provider', paymentType: 'BY_PROVIDER',
                 direction: 'Provider berutang ke Nusantics', flow: 'in' },
  };

  /* ===================== helpers ===================== */

  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* Three-character suffix, matching the exported id shape `AAA-######-XXX`. */
  const TAG = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  function tag3(rnd) {
    return TAG[Math.floor(rnd() * TAG.length)] + TAG[Math.floor(rnd() * TAG.length)] +
      TAG[Math.floor(rnd() * TAG.length)];
  }

  /* Synthetic patient name. Drawn from the invented pools in finance-catalog.js
     — never a real identity. */
  function patientName(rnd) {
    return FC.PATIENT_FIRST[Math.floor(rnd() * FC.PATIENT_FIRST.length)] + ' ' +
      FC.PATIENT_LAST[Math.floor(rnd() * FC.PATIENT_LAST.length)];
  }

  /**
   * What a lab charges for one test type. A lab's COGS is a PRICE LIST, so it
   * is fixed per (lab, service, period) — not jittered per test. That keeps
   * `qty x unit = total` exact on a lab statement, and it concentrates the
   * loss-making cases where they really sit: a specific test that is simply
   * unprofitable at a specific lab, not a random scatter across every order.
   */
  const _cogsCache = {};
  const LOSS_MAKER_MAX_WEIGHT = 11;   // only the long tail can be loss-making
  const LOSS_MAKER_RATE = 0.125;

  function labCogs(labId, svc, periodId, basePct, beforeTax) {
    const key = labId + '|' + svc.code + '|' + periodId;
    let ratio = _cogsCache[key];
    if (ratio === undefined) {
      const r = mulberry32(seedFrom(key))();
      /* Losses hide in the long tail. The handful of high-volume tests are the
         ones whose lab terms Nusantics has actually negotiated, so they stay
         profitable; a rarely-ordered test at a particular lab is where the
         price can exceed what is left after commission. That reproduces the
         real book's ~2.5% of loss-making tests without making it random. */
      const canLose = svc.w <= LOSS_MAKER_MAX_WEIGHT;
      ratio = (canLose && r < LOSS_MAKER_RATE)
        ? 0.86 + ((r / LOSS_MAKER_RATE) * 0.24)
        : (basePct / 100) + ((r - 0.5) * 0.12);
      _cogsCache[key] = ratio;
    }
    return Math.round(beforeTax * ratio);
  }

  function seedFrom(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }

  function periodOf(periodId) {
    return PERIODS.find(function (p) { return p.id === periodId; }) || PERIODS[2];
  }

  /** Order count for a pair in a given period. Value follows from the mix. */
  function scaledOrders(pair, periodId) {
    return Math.max(1, Math.round(pair.orders * periodOf(periodId).factor));
  }

  /* ===================== transactions ===================== */

  const _txCache = {};

  /**
   * Every per-order row for one pair in one period. The pair totals shown
   * anywhere in the UI are sums over exactly this array.
   */
  function transactions(pairId, periodId) {
    const key = pairId + '@' + periodId;
    if (_txCache[key]) return _txCache[key];

    const pair = PAIRS.find(function (x) { return x.id === pairId; });
    const per = periodOf(periodId);
    const n = scaledOrders(pair, periodId);
    const rnd = mulberry32(seedFrom(key));
    const yy = String(per.year).slice(2);
    const mm = String(per.month).padStart(2, '0');
    // Offset the running number by the pair's ordinal so order ids stay unique
    // across the whole period, not just within one pair.
    const idBase = (PAIRS.indexOf(pair) + 1) * 1000;

    /* Rates belong to the ORGANIZATION's agreement, not to the pair.
       Provider commission is a % of RPP *including* PPN — that is how the real
       book states it (15% or 20%). Lab COGS is a share of the before-tax
       value, clustered but not fixed. */
    const providerPctOfRpp = clamp(
      PROVIDERS[pair.providerId].commissionPctOfRpp + (per.provAdj || 0), 10, 25);
    const labCogsPct = clamp(LABS[pair.labId].cogsPct + (per.labAdj || 0), 45, 85);
    // `== null` not `||`: a settleBias of 0 is a deliberate "nothing settled",
    // and `|| 1` would quietly turn it back into the default.
    const bias = pair.settleBias == null ? 1 : pair.settleBias;
    const settleRate = clamp(PERIOD_SETTLEMENT[per.status] * bias, 0, 1);
    // Cash moves in the month after the period it was accrued in.
    const setMonth = per.month === 12 ? 1 : per.month + 1;
    const setYear = per.month === 12 ? per.year + 1 : per.year;

    /* Tests are grouped into orders the way the real export shows them:
       usually one test per order, occasionally a panel of several. */
    const rows = [];
    let orderSeq = 0, inOrder = 0, orderTests = 0, orderDay = 1, orderHour = 8, orderMin = 0;
    let orderId = '';
    /* Settlement is decided ONCE PER ORDER, not per test. An order is what
       gets paid and what a settlement marks, so a panel of three tests
       cannot come out two-thirds settled. */
    let orderSettled = false, orderSettledAt = null;

    for (let i = 0; i < n; i++) {
      if (inOrder === 0) {
        orderSeq += 1;
        const r = rnd();
        orderTests = r < 0.80 ? 1 : r < 0.92 ? 2 : r < 0.96 ? 3 : r < 0.99 ? 4 : 2 + Math.floor(rnd() * 9);
        inOrder = orderTests;
        orderDay = 1 + Math.floor(rnd() * 28);
        orderHour = 7 + Math.floor(rnd() * 12);
        orderMin = Math.floor(rnd() * 60);
        orderId = 'ORD-' + String(idBase + orderSeq).padStart(6, '0') + '-' +
          tag3(rnd);                                  // AAA-######-XXX, as exported
        orderSettled = rnd() < settleRate;
        const sD = 1 + Math.floor(rnd() * 20);
        const sH = 8 + Math.floor(rnd() * 10);
        const sM = Math.floor(rnd() * 60);
        orderSettledAt = orderSettled
          ? String(sD).padStart(2, '0') + ' ' + MONTHS_SHORT[setMonth - 1] + ' ' + setYear +
            ', ' + String(sH).padStart(2, '0') + '.' + String(sM).padStart(2, '0')
          : null;
      }
      inOrder -= 1;

      const svc = pickService(rnd());
      const rpp = svc.rpp;                              // customer price, incl PPN
      const bt = Math.round(rpp / (1 + PPN_PERCENT / 100));
      // % of RPP INCLUDING PPN — the real book's convention
      // Provider commission is earned on every scheme, self-lab included:
      // the organization referred the patient, whoever performed the test.
      const providerComm = Math.round(rpp * providerPctOfRpp / 100);
      // On self-lab the Nusantics margin is a fee set per organization, so the
      // lab commission is the remainder rather than a price-list number.
      const feePct = pair.selfLab ? PROVIDERS[pair.providerId].platformFeePct : 0;
      const platformFee = pair.selfLab ? Math.round(rpp * feePct / 100) : 0;
      const labComm = pair.selfLab
        ? bt - providerComm - platformFee
        : labCogs(pair.labId, svc, periodId, labCogsPct, bt);
      // remainder; may be negative on a third-party order, never on self-lab
      const nusanticsMargin = bt - labComm - providerComm;
      const day = orderDay;
      const settled = orderSettled;
      // Self-lab is BY_PROVIDER like any other payable order, so the formula
      // is the same: they bill the patient and owe us everything they did not
      // keep as provider commission (which on self-lab is nothing).
      const payable = pair.scheme === 'payable' ? bt - providerComm : 0;
      const incentive = pair.scheme === 'incentive' ? providerComm : 0;
      rows.push({
        orderId: orderId,
        testId: 'TST-CAUS-' + pair.labId.replace('-', '') + '-' +
          String(idBase + i + 1).padStart(6, '0') + '-' + tag3(rnd),
        patient: patientName(rnd),
        day: day,
        hour: orderHour, minute: orderMin,
        date: String(day).padStart(2, '0') + ' ' + MONTHS_SHORT[per.month - 1] + ' ' + per.year,
        orderedAt: new Date(per.year, per.month - 1, day, orderHour, orderMin, 0),
        service: svc.name,
        serviceCode: svc.code,
        sampleType: sampleTypeOf(svc.code),
        serviceCategory: svc.cat,
        category: FC.CATEGORY_PREFIX + svc.cat,
        rpp: rpp,
        pairId: pair.id,
        providerId: pair.providerId,
        labId: pair.labId,
        scheme: pair.scheme,
        tier: pair.tier,
        beforeTax: bt,
        gross: rpp,
        labComm: labComm,
        providerComm: providerComm,
        nusanticsMargin: nusanticsMargin,
        payable: payable,
        incentive: incentive,
        // Customer cash only reaches Nusantics on DIRECT orders; on BY_PROVIDER
        // the provider collects from the patient and owes us the payable instead.
        customerReceipt: pair.scheme === 'incentive' ? bt : 0,
        selfLab: !!pair.selfLab,
        platformFeePct: feePct,
        // what Nusantics bills on a self-lab order, in place of the spread
        platformFee: platformFee,
        settled: settled,
        settledAt: orderSettledAt,
        realizedPayable: settled ? payable : 0,
        realizedIncentive: settled ? incentive : 0,
        realizedCustomer: settled && pair.scheme === 'incentive' ? bt : 0,
      });
    }
    rows.sort(function (a, b) { return a.day - b.day; });

    _txCache[key] = rows;
    return rows;
  }

  /* ===================== aggregation ===================== */

  function emptyAgg() {
    return {
      orders: 0, beforeTax: 0, labComm: 0, providerComm: 0, nusanticsMargin: 0,
      payable: 0, incentive: 0, customerReceipt: 0, platformFee: 0,
      settledOrders: 0, realizedPayable: 0, realizedIncentive: 0,
      realizedCustomer: 0,
    };
  }

  function addInto(agg, t) {
    agg.orders += 1;
    agg.beforeTax += t.beforeTax;
    agg.labComm += t.labComm;
    agg.providerComm += t.providerComm;
    agg.nusanticsMargin += t.nusanticsMargin;
    agg.payable += t.payable;
    agg.incentive += t.incentive;
    agg.customerReceipt += t.customerReceipt;
    agg.platformFee += t.platformFee;
    agg.settledOrders += t.settled ? 1 : 0;
    agg.realizedPayable += t.realizedPayable;
    agg.realizedIncentive += t.realizedIncentive;
    agg.realizedCustomer += t.realizedCustomer;
    return agg;
  }

  /**
   * Accrued vs realized for one cash leg of an aggregate.
   * `kind`: 'payable'  (provider owes us)
   *       | 'incentive' (we owe the provider)
   *
   * There is deliberately NO 'lab' kind. Nusantics does not currently track
   * when a lab commission was actually paid, so any lab progress figure would
   * be invented. The lab side is reconciled from its statement of account
   * instead, which states what is owed, not what has moved.
   * Self-lab has no third kind: we pay its lab ('lab') and invoice its clinic
   * ('payable'), and the fee is the difference, never a leg that settles.
   */
  function settlement(agg, kind) {
    const accrued = kind === 'payable' ? agg.payable : agg.incentive;
    const realized = kind === 'payable' ? agg.realizedPayable : agg.realizedIncentive;
    return {
      accrued: accrued,
      realized: realized,
      outstanding: accrued - realized,
      ratio: accrued ? realized / accrued : 0,
    };
  }

  function aggregate(txs) { return txs.reduce(addInto, emptyAgg()); }

  /** Every transaction in a period, optionally filtered by scheme. */
  function allTransactions(periodId, scheme) {
    const out = [];
    PAIRS.forEach(function (p) {
      if (scheme && p.scheme !== scheme) return;
      Array.prototype.push.apply(out, transactions(p.id, periodId));
    });
    return out;
  }

  /** Pair-level rows (provider x lab), the default grouping. */
  /* The three stakeholder sections cover third-party relationships only.
     Self-lab has its own section, so including it here would both double-count
     it and mix two business models in one table. */
  /** Attach order / test / sample counts to a counterparty row. */
  function withVolume(row, txs) {
    const v = volume(txs);
    row.orderCount = v.orderCount;
    row.testCount = v.testCount;
    row.sampleCount = v.sampleCount;
    return row;
  }

  function pairRows(periodId, scheme) {
    return PAIRS.filter(function (p) { return !p.selfLab && (!scheme || p.scheme === scheme); }).map(function (p) {
      const txs = transactions(p.id, periodId);
      return withVolume(Object.assign({}, p, aggregate(txs), {
        key: p.id,
        providerName: PROVIDERS[p.providerId].name,
        labName: LABS[p.labId].name,
      }), txs);
    }).sort(function (a, b) { return b.beforeTax - a.beforeTax; });
  }

  /** Org-level rows: one per provider, within a scheme. */
  function providerRows(periodId, scheme) {
    const by = {};
    PAIRS.forEach(function (p) {
      if (p.selfLab) return;
      if (scheme && p.scheme !== scheme) return;
      const a = by[p.providerId] || (by[p.providerId] = {
        key: p.providerId, orgId: p.providerId, name: PROVIDERS[p.providerId].name,
        city: PROVIDERS[p.providerId].city, scheme: p.scheme, labIds: [], selfLab: false,
        agg: emptyAgg(), txs: [],
      });
      if (a.labIds.indexOf(p.labId) < 0) a.labIds.push(p.labId);
      if (p.selfLab) a.selfLab = true;
      transactions(p.id, periodId).forEach(function (t) { addInto(a.agg, t); a.txs.push(t); });
    });
    return Object.keys(by).map(function (k) {
      const r = Object.assign({}, by[k], by[k].agg, { labCount: by[k].labIds.length });
      delete r.txs;
      return withVolume(r, by[k].txs);
    }).sort(function (a, b) { return b.beforeTax - a.beforeTax; });
  }

  /**
   * Org-level rows: one per lab. Deliberately NOT scheme-filtered — a lab
   * earns its commission the same way whichever scheme the provider is on,
   * so the scheme split is shown as columns instead of as two lists.
   */
  function labRows(periodId) {
    const by = {};
    PAIRS.forEach(function (p) {
      if (p.selfLab) return;
      const a = by[p.labId] || (by[p.labId] = {
        key: p.labId, orgId: p.labId, name: LABS[p.labId].name, city: LABS[p.labId].city,
        selfLabOf: LABS[p.labId].selfLabOf || null, providerIds: [],
        agg: emptyAgg(), labCommIncentive: 0, labCommPayable: 0, txs: [],
      });
      if (a.providerIds.indexOf(p.providerId) < 0) a.providerIds.push(p.providerId);
      transactions(p.id, periodId).forEach(function (t) {
        addInto(a.agg, t);
        a.txs.push(t);
        if (t.scheme === 'incentive') a.labCommIncentive += t.labComm;
        else a.labCommPayable += t.labComm;
      });
    });
    return Object.keys(by).map(function (k) {
      const r = Object.assign({}, by[k], by[k].agg, { providerCount: by[k].providerIds.length });
      delete r.txs;
      return withVolume(r, by[k].txs);
    }).sort(function (a, b) { return b.labComm - a.labComm; });
  }

  /**
   * Roll a set of transactions up by service item. Used by the incentive
   * statement, where the counterparty is a referring doctor: which lab ran the
   * test is Nusantics' supply-side business and has no place on their payout
   * advice — what they are owed is per service referred.
   */
  function groupByService(txs) {
    const by = {};
    txs.forEach(function (t) {
      const a = by[t.serviceCode] || (by[t.serviceCode] = {
        code: t.serviceCode, name: t.service, category: t.serviceCategory, agg: emptyAgg(),
      });
      addInto(a.agg, t);
    });
    return Object.keys(by).map(function (k) {
      return Object.assign({ code: by[k].code, name: by[k].name, category: by[k].category }, by[k].agg);
    }).sort(function (a, b) { return b.beforeTax - a.beforeTax; });
  }

  /** Self-lab rows: one per provider that routed to its own lab. */
  function selfLabRows(periodId) {
    const by = {};
    PAIRS.filter(function (p) { return p.selfLab; }).forEach(function (p) {
      const a = by[p.providerId] || (by[p.providerId] = {
        key: p.providerId, orgId: p.providerId, pairId: p.id,
        name: PROVIDERS[p.providerId].name, city: PROVIDERS[p.providerId].city,
        labId: p.labId, labName: LABS[p.labId].name, tier: p.tier,
        scheme: p.scheme, selfLab: true, agg: emptyAgg(), txs: [],
      });
      transactions(p.id, periodId).forEach(function (t) { addInto(a.agg, t); a.txs.push(t); });
    });
    return Object.keys(by).map(function (k) {
      const r = Object.assign({}, by[k], by[k].agg);
      delete r.txs;
      withVolume(r, by[k].txs);
      r.feePct = PROVIDERS[r.orgId].platformFeePct;
      return r;
    }).sort(function (a, b) { return b.beforeTax - a.beforeTax; });
  }

  /* ===================== test list =====================
     The finance team's flat export: one row per TEST, in exactly the column
     order of the real workbook. `period` is either a PERIODS id (a month) or
     a YEARS id (the whole year).
     ===================================================== */

  const TEST_LIST_COLUMNS = [
    { key: 'orderedAt', header: 'Tanggal Order',         type: 'datetime', width: 13.0 },
    { key: 'orderId',   header: 'Order ID',              type: 'text',     width: 20.25 },
    { key: 'provider',  header: 'Nama Provider',         type: 'text',     width: 36.0 },
    { key: 'lab',       header: 'Nama Lab',              type: 'text',     width: 33.5 },
    { key: 'patient',   header: 'Nama Pasien',           type: 'text',     width: 26.5 },
    { key: 'category',  header: 'Kategori',              type: 'text',     width: 27.5 },
    { key: 'service',   header: 'Nama Layanan',          type: 'text',     width: 27.0 },
    { key: 'testId',    header: 'Test ID',               type: 'text',     width: 30.88 },
    { key: 'rpp',       header: 'RPP (dengan PPN)',      type: 'money',    width: 25.38 },
    { key: 'komisi',    header: 'Komisi Provider',       type: 'money',    width: 17.75 },
    { key: 'payable',   header: 'Payable (sebelum PPN)', type: 'money',    width: 23.38 },
    { key: 'take',      header: 'Nusantics Take',        type: 'money',    width: 22.0 },
  ];

  /* ---- samples -----------------------------------------------------------
     A sample is the specimen, not the test: one blood draw can carry a whole
     panel. So the sample type is a property of the SERVICE, and an order's
     sample count is the number of DISTINCT types it needs — two blood tests
     on one order are one sample, a blood test plus a swab are two.

     The real catalog does not carry a specimen type, so it is derived
     deterministically from the service code. That keeps `tests >= samples`
     and makes the ratio behave, which is the point of showing it. */
  const SAMPLE_TYPES = ['Darah', 'Swab', 'Urin', 'Jaringan', 'Feses'];
  function sampleTypeOf(code) {
    let h = 0;
    for (let i = 0; i < code.length; i++) h = (h * 31 + code.charCodeAt(i)) >>> 0;
    // Weighted to blood, which is most of a routine lab's volume.
    const r = h % 100;
    return r < 56 ? 'Darah' : r < 78 ? 'Swab' : r < 90 ? 'Urin' : r < 97 ? 'Jaringan' : 'Feses';
  }

  /** Order / test / sample counts for a list of transactions. */
  function volume(txs) {
    const o = {}, sm = {};
    txs.forEach(function (t) {
      o[t.orderId] = 1;
      sm[t.orderId + '|' + t.sampleType] = 1;   // one specimen serves a panel
    });
    return {
      orderCount: Object.keys(o).length,
      testCount: txs.length,
      sampleCount: Object.keys(sm).length,
    };
  }

  function isYear(id) { return /^\d{4}$/.test(String(id)); }

  function periodsIn(scopeId) {
    return isYear(scopeId)
      ? PERIODS.filter(function (p) { return String(p.year) === String(scopeId); })
      : [periodOf(scopeId)];
  }

  function scopeLabel(scopeId) {
    if (!isYear(scopeId)) return periodOf(scopeId).label;
    const y = YEARS.find(function (x) { return x.id === String(scopeId); });
    return y ? y.label : 'Tahun ' + scopeId;
  }

  /** Every test in a month or a year, in export column order. */
  function testListRows(scopeId) {
    const out = [];
    periodsIn(scopeId).forEach(function (p) {
      PAIRS.forEach(function (pair) {
        transactions(pair.id, p.id).forEach(function (t) {
          out.push({
            orderedAt: t.orderedAt,
            orderId: t.orderId,
            provider: PROVIDERS[t.providerId].name,
            lab: LABS[t.labId].name,
            patient: t.patient,
            category: t.category,
            service: t.service,
            testId: t.testId,
            rpp: t.rpp,
            komisi: t.providerComm,
            // The export states payable on every row, regardless of scheme.
            payable: t.beforeTax - t.providerComm,
            take: t.nusanticsMargin,
            _periodId: p.id,
            _scheme: t.scheme,
            _category: t.serviceCategory,
            _sampleType: t.sampleType,
          });
        });
      });
    });
    return out.sort(function (a, b) { return a.orderedAt - b.orderedAt; });
  }

  /** Column totals + shape for the test list header strip. */
  function testListSummary(rows) {
    const orders = {}, samples = {};
    let rpp = 0, komisi = 0, payable = 0, take = 0, negative = 0;
    rows.forEach(function (r) {
      orders[r.orderId] = 1;
      samples[r.orderId + '|' + r._sampleType] = 1;
      rpp += r.rpp; komisi += r.komisi; payable += r.payable; take += r.take;
      if (r.take < 0) negative += 1;
    });
    return {
      tests: rows.length, orders: Object.keys(orders).length,
      samples: Object.keys(samples).length,
      rpp: rpp, komisi: komisi, payable: payable, take: take,
      negative: negative,
      patients: Object.keys(rows.reduce(function (a, r) { a[r.patient] = 1; return a; }, {})).length,
    };
  }

  /** Headline numbers for a whole period, across both schemes. */
  function periodSummary(periodId) {
    const all = aggregate(allTransactions(periodId));
    const inc = aggregate(allTransactions(periodId, 'incentive'));
    const pay = aggregate(allTransactions(periodId, 'payable'));
    const bt = all.beforeTax;
    return {
      period: periodOf(periodId),
      orders: all.orders,
      volume: volume(allTransactions(periodId)),
      beforeTax: bt,
      gross: Math.round(bt * (100 + PPN_PERCENT) / 100),
      labComm: all.labComm,
      providerComm: all.providerComm,
      nusanticsMargin: all.nusanticsMargin,
      residual: bt - (all.labComm + all.providerComm + all.nusanticsMargin),
      pctLab: all.labComm / bt * 100,
      pctProvider: all.providerComm / bt * 100,
      pctNusantics: all.nusanticsMargin / bt * 100,
      incentive: inc,
      payable: pay,
      /* ---- cash position, four legs ------------------------------------
         IN   customer receipts  — DIRECT orders only (on BY_PROVIDER the
                                   provider collects from the patient)
              payable            — BY_PROVIDER + self-lab orders
         OUT  lab commission     — EVERY order, whichever scheme: Nusantics
                                   always owes the performing lab, including
                                   a self-lab one (paid, then invoiced back).
                                   ACCRUED ONLY: payment of a lab commission
                                   is not tracked anywhere yet, so there is no
                                   realized figure to show and none is faked.
              provider incentive — DIRECT orders only
         The four net to exactly the Nusantics margin, which is the control
         check shown under the block.
         ----------------------------------------------------------------- */
      cash: {
        customerIn: {
          accrued: inc.customerReceipt, realized: inc.realizedCustomer,
          scope: 'skema insentif',
        },
        payableIn: {
          accrued: pay.payable, realized: pay.realizedPayable,
          scope: 'skema payable',
        },
        labOut: {
          accrued: all.labComm, realized: null,   // not tracked, see above
          scope: 'semua skema',
        },
        providerOut: {
          accrued: inc.incentive, realized: inc.realizedIncentive,
          scope: 'skema insentif',
        },
      },
      netAccrued: inc.customerReceipt + pay.payable - all.labComm - inc.incentive,
      /* No netRealized: three of the four legs are tracked and the lab leg is
         not, so a "realized net" would silently treat every unpaid lab
         commission as paid and overstate cash by the whole lab leg. */
      providerCount: Object.keys(PROVIDERS).length,
      labCount: Object.keys(LABS).length,
    };
  }

  /* ===================== documents =====================
     Settlement is driven by a monthly document, and a document is always
     addressed to ONE organization — never to a provider x lab pair, which is
     an analytical cut, not a legal counterparty.

       INVOICE   -> provider on skema payable. Nusantics bills them for what
                    they collected on our behalf. Grossed up by PPN, matching
                    the existing payable dialog ("Payable (inc. PPN)").
       STATEMENT -> money Nusantics transfers out: lab commission (every
                    scheme) and provider incentive (skema insentif).

     Both are only issuable once the period has ended; an open period is still
     accruing, so there is nothing final to bill or transfer.
     ===================================================== */

  const DOC_TYPES = {
    invoice:   { label: 'Invoice',   title: 'INVOICE',             verb: 'Tagihan ke provider' },
    statement: { label: 'Statement', title: 'STATEMENT OF ACCOUNT', verb: 'Rincian transfer keluar' },
  };

  /** An open period is still accruing — nothing final to bill or transfer. */
  function periodIsPast(periodId) { return periodOf(periodId).status !== 'open'; }

  /**
   * Which document an organization gets for a period, or null when the target
   * is not a billable counterparty (i.e. a provider x lab pair).
   * `target`: { kind: 'provider' | 'lab' | 'pair', orgId, scheme }
   */
  function documentFor(target, periodId) {
    if (target.kind === 'pair') return null;
    const type = target.kind === 'lab' ? 'statement'
      : target.scheme === 'payable' ? 'invoice' : 'statement';
    const org = target.kind === 'lab' ? LABS[target.orgId] : PROVIDERS[target.orgId];
    const per = periodOf(periodId);
    return {
      type: type,
      label: DOC_TYPES[type].label,
      title: DOC_TYPES[type].title,
      number: (type === 'invoice' ? 'INV' : 'STM') + '/' +
        String(per.year) + String(per.month).padStart(2, '0') + '/' + target.orgId,
      recipient: org ? org.name : target.orgId,
      available: periodIsPast(periodId),
      period: per,
    };
  }

  /* ===================== the documented leg =====================
     Every section shows the same three-way split, but each one exists to
     produce ONE document, and only part of the split ends up on it. That
     part is the highlight; the rest is context.

       Skema Insentif   komisi provider   -> statement to the doctor
       Skema Provider   payable           -> invoice to the clinic
       Lab              komisi lab        -> statement to the lab
       Lab Sendiri      payable AND komisi lab

     Lab Sendiri has two because it has two documents. We pay the lab its
     commission, then invoice the clinic the payable; they are one legal
     entity and the difference is our fee, but each leg is its own agreement
     and its own document, so each is highlighted.

     `segs` names which bars of the split the leg covers, because a leg is not
     always one segment: payable is everything the provider did not keep, so
     it spans the lab and Nusantics bars at once.
     ============================================================= */
  const LEG_META = {
    providerComm: { label: 'Komisi Provider', short: 'Komisi provider', doc: 'statement',
                    segs: ['prov'], dir: 'out' },
    payable:      { label: 'Payable',         short: 'Payable',         doc: 'invoice',
                    segs: ['lab', 'nus'],     dir: 'in' },
    labComm:      { label: 'Komisi Lab',      short: 'Komisi lab',      doc: 'statement',
                    segs: ['lab'],            dir: 'out' },
  };

  /** The leg keys a section documents, most important first. */
  function documentedLegs(kind, scheme, selfLab) {
    if (selfLab) return ['payable', 'labComm'];
    if (kind === 'lab') return ['labComm'];
    if (kind === 'provider' || kind === 'pair') {
      return [scheme === 'payable' ? 'payable' : 'providerComm'];
    }
    return [];
  }

  /* Segment order for the split bar. Canonically lab · provider · Nusantics,
     but `payable` is lab + Nusantics with the provider sitting between them,
     so a bracket over it would also cover the commission the provider keeps.
     On a payable section the Nusantics bar moves next to the lab bar, which
     also reads the way the invoice does: this is the total, that is what you
     keep, the rest is what you owe. */
  function segOrder(legs) {
    return (legs || []).indexOf('payable') >= 0
      ? ['lab', 'nus', 'prov'] : ['lab', 'prov', 'nus'];
  }

  /** The rupiah on a leg, for an aggregate. */
  function legAmount(agg, leg) {
    return leg === 'payable' ? agg.payable
      : leg === 'labComm' ? agg.labComm
      : leg === 'providerComm' ? agg.providerComm : 0;
  }

  /** Link to the printable document page. */
  function documentUrl(target, periodId) {
    const q = ['period=' + encodeURIComponent(periodId), 'org=' + encodeURIComponent(target.orgId),
      'kind=' + encodeURIComponent(target.kind)];
    if (target.kind === 'provider') q.push('scheme=' + encodeURIComponent(target.scheme));
    return 'causa-admin-finance-document.html?' + q.join('&');
  }

  /* ===================== formatting ===================== */

  /** Mirrors libs-common formatIDRCurrency under id-ID: `Rp 1.234.567`. */
  function rp(n) {
    if (!n) return 'Rp 0';
    const neg = n < 0;
    return (neg ? '− ' : '') + 'Rp ' + Math.round(Math.abs(n)).toLocaleString('id-ID');
  }

  function pct(n, digits) {
    return n.toFixed(digits === undefined ? 1 : digits).replace('.', ',') + '%';
  }

  function num(n) { return Math.round(n).toLocaleString('id-ID'); }

  return {
    PPN_PERCENT: PPN_PERCENT,
    PERIODS: PERIODS, DEFAULT_PERIOD: DEFAULT_PERIOD, PERIOD_STATUS: PERIOD_STATUS,
    PROVIDERS: PROVIDERS, PROVIDER_TYPE: PROVIDER_TYPE, LABS: LABS,
    SERVICE_CATEGORY: SERVICE_CATEGORY, PAIRS: PAIRS, SCHEMES: SCHEMES, SERVICES: SERVICES,
    periodOf: periodOf, YEARS: YEARS, isYear: isYear, periodsIn: periodsIn, scopeLabel: scopeLabel,
    MONTHS_SHORT: MONTHS_SHORT, MONTHS_LONG: MONTHS_LONG,
    TEST_LIST_COLUMNS: TEST_LIST_COLUMNS, testListRows: testListRows, testListSummary: testListSummary,
    SAMPLE_TYPES: SAMPLE_TYPES, volume: volume,
    transactions: transactions, allTransactions: allTransactions, aggregate: aggregate,
    settlement: settlement,
    DOC_TYPES: DOC_TYPES, periodIsPast: periodIsPast,
    LEG_META: LEG_META, documentedLegs: documentedLegs, legAmount: legAmount,
    segOrder: segOrder,
    documentFor: documentFor, documentUrl: documentUrl,
    pairRows: pairRows, providerRows: providerRows, labRows: labRows, selfLabRows: selfLabRows,
    PLATFORM_FEE_RANGE: PLATFORM_FEE_RANGE,
    groupByService: groupByService,
    periodSummary: periodSummary,
    rp: rp, pct: pct, num: num,
  };
})();
