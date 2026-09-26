/* ═══════════════════════════════════════════════════════════════════════════
   Mock data for cekolam-lab-processing.html

   One mockup, two navigable views:
     1. Lab Processing list        (#/processing/list)   — PCR sample table +
                                                            bulk XLSX upload +
                                                            inline mass-edit
     2. PathoCheck order detail    (#/order/pathocheck/{orderId}/sample)
                                    — the Sample section, Processing stage,
                                      with the per-sample Sample Report entry
                                      modal (FormSampleReport)

   The order-detail view is DERIVED from ROWS (grouped by order_id) + ORDER_EXTRAS,
   so the two views always agree — a report entered on the detail page shows up
   as CT values back on the list, and a retest done via bulk upload on the list
   shows up as a filled Sample Report on the detail page.

   Shapes mirror nsfe_monorepo / cekolam-internal-dashboard:
     OrderSummary · MetadataSamples · OrderPoolMetadata ·
     PoolSampleCollectionTesting · BenurDTO · SampleCollectionTestingDisease ·
     SampleReport
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Lab-ops statuses (LaboratorySampleStatus) ── */
window.STATUSES = [
  { k: 'incoming',   l: 'Incoming' },
  { k: 'assigned',   l: 'Assigned' },
  { k: 'processing', l: 'Processing' },
  { k: 'done',       l: 'Done' },
  { k: 'discarded',  l: 'Discarded' },
];

/* ── DefaultDiseases — constants/diseases.ts (id order → disease_id) ── */
window.DEFAULT_DISEASES = [
  { id: 1, name: 'AHPND' }, { id: 2, name: 'WSSV' }, { id: 3, name: 'IMNV' },
  { id: 4, name: 'EHP' },   { id: 5, name: 'TSV' },  { id: 6, name: 'YHV' },
  { id: 7, name: 'IHHNV' }, { id: 8, name: 'DIV1' }, { id: 9, name: 'CMNV' },
];

/* ── Disease result columns — DISEASE_NAMES_LIST + AHPND special-case
   (this is also DefaultDiseaseMetrics: the 19 flat sample_report keys) ── */
window.DISEASE_COLS = [
  { key: 'pir_a',    label: 'Pir A',    ic: false },
  { key: 'pir_b',    label: 'Pir B',    ic: false },
  { key: 'ahpnd_ic', label: 'AHPND IC', ic: true  },
  { key: 'wssv',     label: 'WSSV',     ic: false },
  { key: 'wssv_ic',  label: 'WSSV IC',  ic: true  },
  { key: 'ehp',      label: 'EHP',      ic: false },
  { key: 'ehp_ic',   label: 'EHP IC',   ic: true  },
  { key: 'imnv',     label: 'IMNV',     ic: false },
  { key: 'imnv_ic',  label: 'IMNV IC',  ic: true  },
  { key: 'tsv',      label: 'TSV',      ic: false },
  { key: 'tsv_ic',   label: 'TSV IC',   ic: true  },
  { key: 'yhv',      label: 'YHV',      ic: false },
  { key: 'yhv_ic',   label: 'YHV IC',   ic: true  },
  { key: 'ihhnv',    label: 'IHHNV',    ic: false },
  { key: 'ihhnv_ic', label: 'IHHNV IC', ic: true  },
  { key: 'div1',     label: 'DIV1',     ic: false },
  { key: 'div1_ic',  label: 'DIV1 IC',  ic: true  },
  { key: 'cmnv',     label: 'CMNV',     ic: false },
  { key: 'cmnv_ic',  label: 'CMNV IC',  ic: true  },
];

/* TableListUdang priorityOrder — order/.../sample/table-list-udang.tsx */
window.DISEASE_PRIORITY_ORDER = [
  'AHPND', 'WSSV', 'IMNV', 'EHP', 'TSV', 'YHV', 'IHHNV', 'DIV1', 'CMNV',
];

/* ── List table base columns ── */
window.BASE_COLS = [
  { k: 'lokasi_lab',       l: 'Lokasi Lab',                filter: 'select', fopts: ['Banyuwangi', 'Jakarta'] },
  { k: 'tgl_processing',   l: 'Tanggal Processing' },
  { k: 'order_id',         l: 'Order ID',        mono: true, filter: 'text' },
  { k: 'sample_id',        l: 'Sample ID',       mono: true, filter: 'text' },
  { k: 'jenis_sample',     l: 'Jenis Sample',    filter: 'select', fopts: ['Udang', 'Benur', 'Air', 'Kepiting Liar'] },
  { k: 'prioritas',        l: 'Prioritas',       filter: 'select', fopts: ['High', 'Normal'] },
  { k: 'testing',          l: 'Testing' },
  { k: 'nama_tambak',      l: 'Nama Tambak',     filter: 'text' },
  { k: 'nama_kolom',       l: 'Nama / Nomor Kolam' },
  { k: 'kondisi_sample',   l: 'Kondisi Sample' },
  { k: 'doc',              l: 'DoC',             align: 'right' },
  { k: 'kondisi_diterima', l: 'Kondisi Sample Diterima', filter: 'select', fopts: ['Layak', 'Cukup', 'Kurang'] },
  { k: 'detil_kondisi',    l: 'Detil Kondisi Sample' },
  { k: 'berat_dissected',  l: 'Berat Sample Dissected' },
];

/* ── Sample rows (mirrors production Lab Processing list) ──
   `attempts` = retest history. Each attempt covers a SELECTED SUBSET of diseases
   (`attempt.diseases`), and `attempt.values` holds only those diseases' metric
   keys. The current result for a disease = value from the latest attempt that
   covered it (per-disease overlay). First attempt (#1) = the initial full panel.
   Order CKL-260720-9ZB is authored with Udang samples (nama_kolom groups into
   a "Sample Collection Udang" pool on the detail page) + Non-Udang samples,
   so the detail page exercises both CollapsibleUdang and TableNonUdang. */
window.ROWS = [
  { sample_id: 'SP015712L', order_id: 'CKL-260720-U7M', lokasi_lab: 'Banyuwangi', tgl_processing: '20 Jul 2026', jenis_sample: 'Benur', prioritas: 'High', testing: 'AHPND', nama_tambak: 'PT. Benur Bahari Bersama', nama_kolom: 'A13 - Asal Benur BBB', kondisi_sample: 'N/A', doc: 8, kondisi_diterima: 'Layak', detil_kondisi: '-', berat_dissected: '-' },
  { sample_id: 'SP015713L', order_id: 'CKL-260720-U7M', lokasi_lab: 'Banyuwangi', tgl_processing: '20 Jul 2026', jenis_sample: 'Benur', prioritas: 'High', testing: 'AHPND', nama_tambak: 'PT. Benur Bahari Bersama', nama_kolom: 'A6 - Asal Benur BBB', kondisi_sample: 'N/A', doc: 12, kondisi_diterima: 'Layak', detil_kondisi: '-', berat_dissected: '-' },
  { sample_id: 'NUS-SK001-260603-Q0A', order_id: 'CKL-260720-A3M', lokasi_lab: 'Banyuwangi', tgl_processing: '20 Jul 2026', jenis_sample: 'Benur', prioritas: 'High', testing: 'AHPND, EHP, WSSV', nama_tambak: 'CV. Banyu Biru Darmawangsa', nama_kolom: 'Kode B - Asal Benur BBD', kondisi_sample: 'N/A', doc: 0, kondisi_diterima: 'Cukup', detil_kondisi: '-', berat_dissected: '-' },
  { sample_id: 'NUS-SK001-260603-T71', order_id: 'CKL-260720-AYD', lokasi_lab: 'Banyuwangi', tgl_processing: '20 Jul 2026', jenis_sample: 'Benur', prioritas: 'High', testing: 'AHPND, EHP, IMNV, WSSV', nama_tambak: 'Tambak Untung Terus Menerus', nama_kolom: 'B5 - Asal Benur BBD', kondisi_sample: 'N/A', doc: 0, kondisi_diterima: 'Cukup', detil_kondisi: '-', berat_dissected: '-' },
  { sample_id: 'NUS-SK001-260515-BDQ', order_id: 'CKL-260720-U8S', lokasi_lab: 'Banyuwangi', tgl_processing: '20 Jul 2026', jenis_sample: 'Benur', prioritas: 'High', testing: 'AHPND, EHP, IHHNV, WSSV', nama_tambak: 'PT. Delta Windu Purnama', nama_kolom: 'Bak 05 - Asal Benur Delta', kondisi_sample: 'N/A', doc: 0, kondisi_diterima: 'Cukup', detil_kondisi: '-', berat_dissected: '-',
    attempts: [
      // #1: initial full panel — WSSV IC came back "Undetermined"
      { attempt_number: 1, created_at: '2026-07-18T13:40:00+07:00', reason: null, diseases: ['AHPND', 'EHP', 'IHHNV', 'WSSV'], staff_email: 's.wibowo@nusantics.com', upload_batch_id: '2026-07-18_CEKOLAM BWI_01', pending_verification: false,
        values: { wssv: 'Neg.', wssv_ic: 'Undetermined', ehp: '29.4', ehp_ic: '18.7', pir_a: 'Neg.', pir_b: 'Neg.', ahpnd_ic: '20.1', ihhnv: 'N/A', ihhnv_ic: 'N/A' } },
      // #2: partial retest of WSSV only (IC was inconclusive) — other diseases keep #1's values
      { attempt_number: 2, created_at: '2026-07-20T14:10:00+07:00', reason: 'INCONCLUSIVE', diseases: ['WSSV'], staff_email: 'r.anggraini@nusantics.com', upload_batch_id: '2026-07-20_CEKOLAM BWI_02', pending_verification: false,
        values: { wssv: 'Neg.', wssv_ic: '19.2' } },
    ] },
  { sample_id: 'NUS-SK001-260515-J09', order_id: 'CKL-260720-U8S', lokasi_lab: 'Banyuwangi', tgl_processing: '20 Jul 2026', jenis_sample: 'Benur', prioritas: 'High', testing: 'AHPND, EHP, IHHNV, WSSV', nama_tambak: 'PT. Delta Windu Purnama', nama_kolom: 'Bak 03 - Asal Benur Delta', kondisi_sample: 'N/A', doc: 0, kondisi_diterima: 'Cukup', detil_kondisi: '-', berat_dissected: '-' },
  { sample_id: 'NUS-SK001-260515-KDE', order_id: 'CKL-260720-U8S', lokasi_lab: 'Banyuwangi', tgl_processing: '20 Jul 2026', jenis_sample: 'Benur', prioritas: 'High', testing: 'AHPND, EHP, IHHNV, WSSV', nama_tambak: 'PT. Delta Windu Purnama', nama_kolom: 'Bak 04 - Asal Benur Delta', kondisi_sample: 'N/A', doc: 0, kondisi_diterima: 'Cukup', detil_kondisi: '-', berat_dissected: '-' },
  { sample_id: 'NUS-SK001-260515-001', order_id: 'CKL-260720-U8S', lokasi_lab: 'Banyuwangi', tgl_processing: '20 Jul 2026', jenis_sample: 'Benur', prioritas: 'High', testing: 'AHPND, EHP, IHHNV, WSSV', nama_tambak: 'PT. Delta Windu Purnama', nama_kolom: 'Bak 02 - Asal Benur Delta', kondisi_sample: 'N/A', doc: 0, kondisi_diterima: 'Cukup', detil_kondisi: '-', berat_dissected: '-' },
  { sample_id: 'SP015719L', order_id: 'CKL-260720-9KX', lokasi_lab: 'Banyuwangi', tgl_processing: '20 Jul 2026', jenis_sample: 'Air', prioritas: 'Normal', testing: 'AHPND, CMNV, EHP, IMNV, WSSV', nama_tambak: 'PT. Pyramide Paramount Indonesia (Bali)', nama_kolom: 'I2.1', kondisi_sample: 'N/A', doc: 0, kondisi_diterima: 'Cukup', detil_kondisi: '-', berat_dissected: '-',
    attempts: [
      { attempt_number: 1, created_at: '2026-07-20T14:10:00+07:00', reason: null, diseases: ['AHPND', 'CMNV', 'EHP', 'IMNV', 'WSSV'], staff_email: 's.wibowo@nusantics.com', upload_batch_id: '2026-07-20_CEKOLAM BWI_01', pending_verification: false,
        values: { wssv: 'Neg.', wssv_ic: '21.5', ehp: 'Neg.', ehp_ic: '19.9', imnv: 'N/A', imnv_ic: 'N/A', cmnv: 'Neg.', cmnv_ic: '20.3', pir_a: 'Neg.', pir_b: 'Neg.', ahpnd_ic: '19.4' } },
    ] },
  { sample_id: 'SP015720L', order_id: 'CKL-260720-9KX', lokasi_lab: 'Banyuwangi', tgl_processing: '20 Jul 2026', jenis_sample: 'Air', prioritas: 'Normal', testing: 'AHPND, CMNV, EHP, IMNV, WSSV', nama_tambak: 'PT. Pyramide Paramount Indonesia (Bali)', nama_kolom: 'I2.2', kondisi_sample: 'N/A', doc: 0, kondisi_diterima: 'Cukup', detil_kondisi: '-', berat_dissected: '-',
    attempts: [
      { attempt_number: 1, created_at: '2026-07-20T15:30:00+07:00', reason: null, diseases: ['AHPND', 'CMNV', 'EHP', 'IMNV', 'WSSV'], staff_email: 'y.pratama@nusantics.com', pending_verification: true,
        values: { pir_a: 'Neg.', pir_b: 'Neg.', ahpnd_ic: '19.8', wssv: 'Neg.', wssv_ic: '20.9', ehp: 'N/A', ehp_ic: 'N/A', imnv: 'N/A', imnv_ic: 'N/A', cmnv: 'Neg.', cmnv_ic: '20.1' } },
    ] },
  { sample_id: 'SP015721L', order_id: 'CKL-260720-9KX', lokasi_lab: 'Banyuwangi', tgl_processing: '20 Jul 2026', jenis_sample: 'Air', prioritas: 'Normal', testing: 'AHPND, CMNV, EHP, IMNV, WSSV', nama_tambak: 'PT. Pyramide Paramount Indonesia (Bali)', nama_kolom: 'I2.3', kondisi_sample: 'N/A', doc: 0, kondisi_diterima: 'Cukup', detil_kondisi: '-', berat_dissected: '-',
    attempts: [
      { attempt_number: 1, created_at: '2026-07-20T15:30:00+07:00', reason: null, diseases: ['AHPND', 'CMNV', 'EHP', 'IMNV', 'WSSV'], staff_email: 'y.pratama@nusantics.com', pending_verification: true,
        values: { pir_a: 'Neg.', pir_b: 'Neg.', ahpnd_ic: '19.5', wssv: 'Neg.', wssv_ic: '21.2', ehp: 'Neg.', ehp_ic: '19.6', imnv: 'N/A', imnv_ic: 'N/A', cmnv: 'Neg.', cmnv_ic: '20.4' } },
    ] },
  { sample_id: 'SP015722L', order_id: 'CKL-260720-9KX', lokasi_lab: 'Banyuwangi', tgl_processing: '20 Jul 2026', jenis_sample: 'Air', prioritas: 'Normal', testing: 'AHPND, CMNV, EHP, IMNV, WSSV', nama_tambak: 'PT. Pyramide Paramount Indonesia (Bali)', nama_kolom: 'LL.1', kondisi_sample: 'N/A', doc: 0, kondisi_diterima: 'Cukup', detil_kondisi: '-', berat_dissected: '-',
    attempts: [
      { attempt_number: 1, created_at: '2026-07-20T15:30:00+07:00', reason: null, diseases: ['AHPND', 'CMNV', 'EHP', 'IMNV', 'WSSV'], staff_email: 'y.pratama@nusantics.com', pending_verification: true,
        values: { pir_a: 'Neg.', pir_b: 'Neg.', ahpnd_ic: '18.9', wssv: '33.1', wssv_ic: '19.4', ehp: 'N/A', ehp_ic: 'N/A', imnv: 'N/A', imnv_ic: 'N/A', cmnv: 'Neg.', cmnv_ic: '19.9' } },
    ] },
  { sample_id: 'SP015723L', order_id: 'CKL-260720-9KX', lokasi_lab: 'Banyuwangi', tgl_processing: '20 Jul 2026', jenis_sample: 'Air', prioritas: 'Normal', testing: 'AHPND, CMNV, EHP, IMNV, WSSV', nama_tambak: 'PT. Pyramide Paramount Indonesia (Bali)', nama_kolom: 'LL.2', kondisi_sample: 'N/A', doc: 0, kondisi_diterima: 'Cukup', detil_kondisi: '-', berat_dissected: '-',
    attempts: [
      { attempt_number: 1, created_at: '2026-07-20T15:30:00+07:00', reason: null, diseases: ['AHPND', 'CMNV', 'EHP', 'IMNV', 'WSSV'], staff_email: 'y.pratama@nusantics.com', pending_verification: true,
        values: { pir_a: 'Neg.', pir_b: 'Neg.', ahpnd_ic: '19.1', wssv: 'Neg.', wssv_ic: '20.7', ehp: 'N/A', ehp_ic: 'N/A', imnv: 'N/A', imnv_ic: 'N/A', cmnv: 'Neg.', cmnv_ic: '20.6' } },
    ] },
  { sample_id: 'SP015717L', order_id: 'CKL-260720-S5S', lokasi_lab: 'Jakarta', tgl_processing: '20 Jul 2026', jenis_sample: 'Air', prioritas: 'Normal', testing: 'AHPND, EHP, IMNV, WSSV', nama_tambak: 'Tambak Sumber Agromina Jaya', nama_kolom: 'Air Laut', kondisi_sample: 'N/A', doc: 0, kondisi_diterima: 'Cukup', detil_kondisi: '-', berat_dissected: '-' },
  { sample_id: 'SP015718L', order_id: 'CKL-260720-S5S', lokasi_lab: 'Jakarta', tgl_processing: '20 Jul 2026', jenis_sample: 'Kepiting Liar', prioritas: 'Normal', testing: 'AHPND, EHP, IMNV, WSSV', nama_tambak: 'Tambak Sumber Agromina Jaya', nama_kolom: 'Biota Laut', kondisi_sample: 'N/A', doc: 0, kondisi_diterima: 'Cukup', detil_kondisi: '-', berat_dissected: '-' },

  /* ── Order CKL-260721-P9X — full 9-disease panel (layout stress test for the
     Testing Round modal: 9 diseases × Ct + IC = 19 value fields). SP015740L
     already has Round 1 (retest demo); SP015741L has none yet (Round 1 entry). ── */
  { sample_id: 'SP015740L', order_id: 'CKL-260721-P9X', lokasi_lab: 'Jakarta', tgl_processing: '21 Jul 2026', jenis_sample: 'Benur', prioritas: 'High', testing: 'AHPND, EHP, WSSV, IMNV, IHHNV, DIV1, TSV, YHV, CMNV', nama_tambak: 'PT. Samudra Benur Nusantara', nama_kolom: 'Bak 11 - Asal Benur SBN', kondisi_sample: 'N/A', doc: 9, kondisi_diterima: 'Layak', detil_kondisi: '-', berat_dissected: '-',
    attempts: [
      { attempt_number: 1, created_at: '2026-07-21T10:15:00+07:00', reason: null, diseases: ['AHPND', 'EHP', 'WSSV', 'IMNV', 'IHHNV', 'DIV1', 'TSV', 'YHV', 'CMNV'], staff_email: 'd.anjani@nusantics.com', testing_lab: 'Jakarta', upload_batch_id: null, pending_verification: true,
        values: { pir_a: 'Neg.', pir_b: 'Neg.', ahpnd_ic: '19.4', ehp: '36.8', ehp_ic: '20.1', wssv: 'Neg.', wssv_ic: '19.8', imnv: 'Neg.', imnv_ic: '20.6', ihhnv: '38.2', ihhnv_ic: 'Undetermined', div1: 'Neg.', div1_ic: '19.9', tsv: 'N/A', tsv_ic: 'N/A', yhv: 'N/A', yhv_ic: 'N/A', cmnv: 'Neg.', cmnv_ic: '20.3' } },
    ] },
  { sample_id: 'SP015741L', order_id: 'CKL-260721-P9X', lokasi_lab: 'Jakarta', tgl_processing: '21 Jul 2026', jenis_sample: 'Benur', prioritas: 'High', testing: 'AHPND, EHP, WSSV, IMNV, IHHNV, DIV1, TSV, YHV, CMNV', nama_tambak: 'PT. Samudra Benur Nusantara', nama_kolom: 'Bak 12 - Asal Benur SBN', kondisi_sample: 'N/A', doc: 9, kondisi_diterima: 'Layak', detil_kondisi: '-', berat_dissected: '-' },

  /* ── Order CKL-260720-9ZB — the "rich" order with Udang + Non-Udang ── */
  { sample_id: 'SP015714L', order_id: 'CKL-260720-9ZB', lokasi_lab: 'Jakarta', tgl_processing: '20 Jul 2026', jenis_sample: 'Udang', prioritas: 'High', testing: 'AHPND, EHP, IMNV, WSSV', nama_tambak: 'Tambak Sumber Rejeki Vannamei', nama_kolom: 'A07 - Blok 18', kondisi_sample: 'N/A', doc: 75, kondisi_diterima: 'Layak', detil_kondisi: '-', berat_dissected: '-',
    attempts: [
      { attempt_number: 1, created_at: '2026-07-20T14:10:00+07:00', reason: null, diseases: ['AHPND', 'EHP', 'IMNV', 'WSSV'], staff_email: 'd.anjani@nusantics.com', upload_batch_id: '2026-07-20_CEKOLAM JKT_01', pending_verification: false,
        values: { pir_a: '26.5', pir_b: '26.1', ahpnd_ic: '18.4', wssv: 'Neg.', wssv_ic: '20.9', ehp: 'N/A', ehp_ic: 'N/A', imnv: 'N/A', imnv_ic: 'N/A' } },
      // #2: partial retest of just AHPND (Pir A borderline) — new attempt, only AHPND keys
      { attempt_number: 2, created_at: '2026-07-21T09:25:00+07:00', reason: 'QA_DISPUTE', diseases: ['AHPND'], staff_email: 'a.budiman@nusantics.com', upload_batch_id: null, pending_verification: true,
        values: { pir_a: 'Neg.', pir_b: 'Neg.', ahpnd_ic: '18.9' } },
    ] },
  { sample_id: 'SP015715L', order_id: 'CKL-260720-9ZB', lokasi_lab: 'Jakarta', tgl_processing: '20 Jul 2026', jenis_sample: 'Udang', prioritas: 'High', testing: 'AHPND, EHP, IMNV, WSSV', nama_tambak: 'Tambak Sumber Rejeki Vannamei', nama_kolom: 'A07 - Blok 18', kondisi_sample: 'N/A', doc: 75, kondisi_diterima: 'Layak', detil_kondisi: '-', berat_dissected: '-' },
  { sample_id: 'SP015716L', order_id: 'CKL-260720-9ZB', lokasi_lab: 'Jakarta', tgl_processing: '20 Jul 2026', jenis_sample: 'Udang', prioritas: 'High', testing: 'AHPND, EHP, IMNV, WSSV', nama_tambak: 'Tambak Sumber Rejeki Vannamei', nama_kolom: 'A07 - Blok 18', kondisi_sample: 'N/A', doc: 75, kondisi_diterima: 'Layak', detil_kondisi: '-', berat_dissected: '-' },
  { sample_id: 'SP015730L', order_id: 'CKL-260720-9ZB', lokasi_lab: 'Jakarta', tgl_processing: '20 Jul 2026', jenis_sample: 'Benur', prioritas: 'High', testing: 'AHPND, EHP, WSSV', nama_tambak: 'Tambak Sumber Rejeki Vannamei', nama_kolom: 'Bak Kultur L-2', kondisi_sample: 'N/A', doc: 12, kondisi_diterima: 'Cukup', detil_kondisi: '-', berat_dissected: '-',
    attempts: [
      { attempt_number: 1, created_at: '2026-07-20T14:10:00+07:00', reason: null, diseases: ['AHPND', 'EHP', 'WSSV'], staff_email: 'd.anjani@nusantics.com', upload_batch_id: '2026-07-20_CEKOLAM JKT_01', pending_verification: false,
        values: { pir_a: 'Neg.', pir_b: 'Neg.', ahpnd_ic: '19.7', wssv: '31.4', wssv_ic: '19.1', ehp: 'N/A', ehp_ic: 'N/A' } },
    ] },
  { sample_id: 'SP015731L', order_id: 'CKL-260720-9ZB', lokasi_lab: 'Jakarta', tgl_processing: '20 Jul 2026', jenis_sample: 'Air', prioritas: 'High', testing: 'AHPND, EHP, WSSV', nama_tambak: 'Tambak Sumber Rejeki Vannamei', nama_kolom: 'Tandon Air Laut', kondisi_sample: 'N/A', doc: 0, kondisi_diterima: 'Cukup', detil_kondisi: '-', berat_dissected: '-' },
];

/* ── Repeat-testing reason codes — mirror real lab retest triggers ── */
window.REASON_CODES = [
  { k: 'CONTROL_FAILURE',  l: 'Kontrol plate gagal (PC / NTC)' },
  { k: 'IC_FAILURE',       l: 'IC sample gagal / inhibisi' },
  { k: 'EQUIVOCAL_CT',     l: 'Ct equivocal / grey zone (35–40)' },
  { k: 'INCONCLUSIVE',     l: 'Hasil sebelumnya inconclusive / Undetermined' },
  { k: 'SINGLE_GENE',      l: 'AHPND satu gen (pirA+ / pirB−)' },
  { k: 'UNEXPECTED_AMPLICON', l: 'Ukuran amplikon tak terduga' },
  { k: 'CONFIRMATORY',     l: 'Konfirmasi metode / plate kedua' },
  { k: 'INSTRUMENT_FLAG',  l: 'Flag instrument (NOAMP / EXPFAIL / HIGHSD)' },
  { k: 'QA_DISPUTE',       l: 'Review QA / hasil dipertanyakan' },
  { k: 'CUSTOMER_REQUEST', l: 'Permintaan retest dari klien' },
  { k: 'OTHER',            l: 'Lainnya' },
];

/* Limited list of Nusantics lab-ops people — used for every "___ by" dropdown in
   the bulk template (Received / Sample Checked / Extracted / Analyzed by) and
   the testing-round modal analyst picker. */
window.LAB_OPS_PEOPLE = [
  's.wibowo@nusantics.com',
  'r.anggraini@nusantics.com',
  'd.anjani@nusantics.com',
  'a.budiman@nusantics.com',
  'y.pratama@nusantics.com',
  'm.halim@nusantics.com',
  'f.nurhayati@nusantics.com',
  'b.farhana@nusantics.com',
];
window.LAB_LOCATIONS = ['Jakarta', 'Banyuwangi'];

/* ── Bulk upload wizard — parsed-file fixtures ──
   Matches the lab-ops worksheet template (20260901ckpcrtemplate.xlsx): one row
   per sample capturing the bench chain — receipt → sample check → extraction →
   analysis → PCR result (NTC, PC + 19 disease columns). Nothing after the
   disease/IC columns — Administered by / Administration Time were removed
   2026-09-16; `created_at` now derives from Analysis Time.
   (Packaging + sample-condition columns were removed — that is On Delivery
   data; see questions.md B3/B4. Verified by / Verification Time were removed
   2026-09-16 — verification is a separate, per-order process on the dashboard,
   not recorded in the worksheet.)
   Bulk upload creates ROUND 1 ONLY; a row for a sample that already has a testing
   round is REJECTED (retest goes through the order detail). `_brow()` fills sane
   defaults; each row overrides `values` + whatever differs. */
function _brow(o) {
  const p = o.people || {}, t = o.times || {};
  const d = '2026-08-31';
  return {
    sample_id: o.sample_id,
    testing_lab: o.testing_lab,
    received_by: p.received ?? 'f.nurhayati@nusantics.com',
    received_time: t.received ?? `${d} 08:10`,
    checked_by: p.checked ?? 'f.nurhayati@nusantics.com',
    checked_time: t.checked ?? `${d} 08:25`,
    extracted_by: p.extracted ?? 'r.anggraini@nusantics.com',
    extraction_time: t.extracted ?? `${d} 10:05`,
    analyzed_by: p.analyzed ?? o.analyst ?? 'd.anjani@nusantics.com',
    analysis_time: t.analyzed ?? `${d} 13:30`,
    ntc: o.ntc ?? 'Undetermined',   // string Ct: "Undetermined" | float | "a-b" range
    pc: o.pc ?? '22.4',             // string Ct: float | "a-b" range
    ...o.values,
    ...(o._flags ? { _flags: o._flags } : {}),
  };
}

window.BULK_PARSED = [
  // valid Round-1 fills — all land pending_verification, verified separately per order
  _brow({ sample_id: 'SP015712L', testing_lab: 'Banyuwangi', analyst: 's.wibowo@nusantics.com',
    values: { pir_a: '24.1', pir_b: '23.8', ahpnd_ic: '18.9' } }),
  // PC given as a Ct range (still in window)
  _brow({ sample_id: 'SP015713L', testing_lab: 'Banyuwangi', analyst: 's.wibowo@nusantics.com', pc: '21.8-22.6', values: { pir_a: 'Neg.', pir_b: 'Neg.', ahpnd_ic: '19.1' } }),
  _brow({ sample_id: 'NUS-SK001-260515-J09', testing_lab: 'Banyuwangi', analyst: 's.wibowo@nusantics.com',
    values: { pir_a: 'Neg.', pir_b: 'Neg.', ahpnd_ic: '20.3', ehp: '31.2', ehp_ic: '19.0', ihhnv: 'N/A', ihhnv_ic: 'N/A', wssv: 'Neg.', wssv_ic: '20.1' } }),
  _brow({ sample_id: 'NUS-SK001-260515-KDE', testing_lab: 'Banyuwangi', analyst: 's.wibowo@nusantics.com',
    values: { pir_a: 'Neg.', pir_b: 'Neg.', ahpnd_ic: '19.6', ehp: 'N/A', ehp_ic: 'N/A', ihhnv: 'N/A', ihhnv_ic: 'N/A', wssv: 'Neg.', wssv_ic: '20.9' } }),
  // PC Ct outside the plausible window -> FLAG (needs review, not auto-checked)
  _brow({ sample_id: 'SP015717L', testing_lab: 'Jakarta', analyst: 'd.anjani@nusantics.com', pc: '37.4',
    values: { pir_a: 'Neg.', pir_b: 'Neg.', ahpnd_ic: '19.5', ehp: 'N/A', ehp_ic: 'N/A', imnv: 'N/A', imnv_ic: 'N/A', wssv: 'Neg.', wssv_ic: '20.7' } }),
  // already has Round 1 -> REJECTED (bulk = first round only)
  _brow({ sample_id: 'SP015714L', testing_lab: 'Jakarta', analyst: 'a.budiman@nusantics.com',
    values: { pir_a: 'Neg.', pir_b: 'Neg.', ahpnd_ic: '18.7' } }),
  _brow({ sample_id: 'NUS-SK001-260515-BDQ', testing_lab: 'Banyuwangi', analyst: 'r.anggraini@nusantics.com',
    values: { wssv: 'Neg.', wssv_ic: '19.6' } }),
  // CT format error
  _brow({ sample_id: 'NUS-SK001-260603-Q0A', testing_lab: 'Banyuwangi', analyst: 's.wibowo@nusantics.com',
    values: { pir_a: '22.7', pir_b: '22.9', ahpnd_ic: 'Undeterminedd', ehp: 'N/A', ehp_ic: 'N/A', wssv: 'Neg.', wssv_ic: '20.4' } }),
  // bad testing_lab · bad analyst email · NTC amplified (contamination -> invalid)
  _brow({ sample_id: 'NUS-SK001-260603-T99', testing_lab: 'Surabaya', analyst: 'lab@gmail.com',
    ntc: '29.8', values: { pir_a: 'Neg.', pir_b: 'Neg.', ahpnd_ic: '19.0' } }),
  // sample_id not on Processing list
  _brow({ sample_id: 'SP015799L', testing_lab: 'Jakarta', analyst: 'd.anjani@nusantics.com',
    values: { wssv: 'Neg.', wssv_ic: '21.0' } }),
];

/* Historical bulk-upload batches referenced by ROWS attempts' upload_batch_id. */
window.BULK_BATCHES = [
  { id: '2026-07-18_CEKOLAM BWI_01', file: '2026-07-18_CEKOLAM BWI_01_AHPND-EHP-IHHNV-WSSV.xlsx', disease_label: 'AHPND-EHP-IHHNV-WSSV', source: 'template',   uploaded_at: '2026-07-18T14:05:00+07:00', uploaded_by: 's.wibowo@nusantics.com',    sample_count: 6,  ntc: 'Bersih', pc: 'Dalam rentang' },
  { id: '2026-07-20_CEKOLAM BWI_01', file: '2026-07-20_CEKOLAM BWI_01_AHPND-CMNV-EHP-IMNV-WSSV.csv', disease_label: 'AHPND-CMNV-EHP-IMNV-WSSV', source: 'instrument', uploaded_at: '2026-07-20T14:40:00+07:00', uploaded_by: 's.wibowo@nusantics.com',  sample_count: 11, ntc: 'Bersih', pc: 'Dalam rentang' },
  { id: '2026-07-20_CEKOLAM BWI_02', file: '2026-07-20_CEKOLAM BWI_02_WSSV.xlsx', disease_label: 'WSSV', source: 'template',  uploaded_at: '2026-07-20T16:20:00+07:00', uploaded_by: 'r.anggraini@nusantics.com', sample_count: 3, ntc: 'Bersih', pc: 'Dalam rentang' },
  { id: '2026-07-20_CEKOLAM JKT_01', file: '2026-07-20_CEKOLAM JKT_01_AHPND-EHP-IMNV-WSSV.xlsx', disease_label: 'AHPND-EHP-IMNV-WSSV', source: 'template',   uploaded_at: '2026-07-20T15:35:00+07:00', uploaded_by: 'd.anjani@nusantics.com',    sample_count: 8,  ntc: 'Bersih', pc: 'Dalam rentang' },
];

window.EXAMPLE_VALUES = {
  pir_a: '24.1', pir_b: '23.8', ahpnd_ic: '18.9',
  wssv: 'Neg.', wssv_ic: '19.2',
  ehp: 'N/A', ehp_ic: 'N/A',
  imnv: '29.6', imnv_ic: '18.4',
  tsv: 'Neg.', tsv_ic: '20.1',
  yhv: 'N/A', yhv_ic: 'N/A',
  ihhnv: 'N/A', ihhnv_ic: 'Undetermined',
  div1: 'N/A', div1_ic: 'N/A',
  cmnv: 'Neg.', cmnv_ic: '19.8',
};

/* ═══════════════ Order-detail view data ═══════════════ */

/* Lab Ops KPI SLA — constants/thresholds.ts (LAB_KPI_SLA_HOURS) */
window.LAB_KPI_SLA_HOURS = {
  Jakarta:    { OTP: 6, OTR: 7 },
  Banyuwangi: { OTP: 7, OTR: 8 },
};

/* FTR — First Time Right target (% of assessed samples resolved in 1 testing round) */
window.LAB_KPI_FTR_TARGET_PCT = 95;

/* feature-cekolam getActiveStepOrder() → step labels (order-details-stepper) */
window.ORDER_STEPS = [
  { step: 1, label: 'Created' },
  { step: 2, label: 'On Delivery' },
  { step: 3, label: 'Samples Assigned' },
  { step: 4, label: 'Processing' },
  { step: 5, label: 'Report Generated' },
  { step: 6, label: 'Report Verified' },
];

/* SmartSelectSingle options — form-report.tsx (LabOpsPersonnelOptions[testingLab]) */
window.LAB_OPS_PERSONNEL = {
  Jakarta: [
    { value: 'dewi.lab@nusantics.com', label: 'Dewi Anjani' },
    { value: 'arif.lab@nusantics.com', label: 'Arif Budiman' },
  ],
  Banyuwangi: [
    { value: 'siti.lab@nusantics.com', label: 'Siti Rahayu' },
    { value: 'yoga.lab@nusantics.com', label: 'Yoga Pratama' },
  ],
};

/* Lab staff who can be "in charge" of a testing round (generated @nusantics.com) */
window.LAB_STAFF = [
  's.wibowo@nusantics.com',
  'r.anggraini@nusantics.com',
  'd.anjani@nusantics.com',
  'a.budiman@nusantics.com',
  'y.pratama@nusantics.com',
  'm.halim@nusantics.com',
  'f.nurhayati@nusantics.com',
];

/* SampleTypeOptionsMaps — constants/options.ts */
window.SAMPLE_TYPE_MAP = { 1: 'Udang', 2: 'Benur', 3: 'Air', 4: 'Kepiting Liar' };

/* CekolamCycleStageOptions — feature-cekolam/constant/options */
window.CYCLE_STAGE_OPTIONS = [
  { value: 'NURSERY', label: 'Nursery' },
  { value: 'PRODUCTION', label: 'Produksi' },
  { value: 'BROODSTOCK', label: 'Broodstock' },
];

/* Signed-in user — drives hasLabPrivilege / hasSalesPrivilege gates.
   'lab' + 'labopslead' → Default/List toggle + Edit CT Value visible. */
window.CURRENT_USER = {
  name: 'Jason Limanjaya',
  initials: 'JL',
  email: 'jason.limanjaya@nusantics.com',
  role: 'VP Digital Product',
  privileges: ['lab', 'labopslead', 'superadmin'],
};

/* ── Per-order extras the flat list rows don't carry ──
   Keyed by order_id. Everything optional; buildOrderDetail() falls back to
   sensible defaults. pool_meta is keyed by nama_kolom, benur_meta by sample_id. */
window.ORDER_EXTRAS = {
  'CKL-260720-9ZB': {
    transaction: 'RETAIL',
    pricing_scheme: 'Retail Umum',
    admin_data: { created_by: 'sales.rina@nusantics.com', updated_by: 'arif.lab@nusantics.com' },
    created_at: '2026-07-17T10:00:00+07:00',
    on_delivery_at: '2026-07-18T11:05:00+07:00',
    samples_assigned_at: '2026-07-19T16:40:00+07:00',
    processing_at: '2026-07-20T09:12:00+07:00',
    pool_meta: {
      'A07 - Blok 18': {
        pool_size: 2400, padat_tebar: 120,
        stocking_date: '2026-05-02T00:00:00+07:00',
        sampling_date: '2026-07-16T00:00:00+07:00',
        kondisi_udang_str: 'Sehat',
        recommendation: 'Lakukan pengelolaan kualitas air rutin. Tidak terdeteksi patogen mayor pada sampel A07.',
      },
    },
    benur_meta: {
      SP015730L: { cycle_stage: 'NURSERY', umur: 12, age_unit: 'PL', kondisi: 'Aktif, warna normal', sampling_date: '2026-07-16T00:00:00+07:00' },
      SP015731L: { cycle_stage: 'PRODUCTION', kondisi: 'Jernih', stocking_date: '2026-04-28T00:00:00+07:00', sampling_date: '2026-07-16T00:00:00+07:00' },
    },
  },
  'CKL-260720-U8S': {
    transaction: 'CORPORATE',
    pricing_scheme: 'Corporate Tier 2',
    admin_data: { created_by: 'sales.bagus@nusantics.com', updated_by: 'siti.lab@nusantics.com' },
    benur_meta: {
      'NUS-SK001-260515-BDQ': { cycle_stage: 'PRODUCTION', umur: 34, age_unit: 'DoC', kondisi: 'Nafsu makan turun', sampling_date: '2026-07-15T00:00:00+07:00' },
    },
  },
  'CKL-260720-9KX': {
    transaction: 'RETAIL',
    pricing_scheme: 'Retail Umum',
    admin_data: { created_by: 'sales.rina@nusantics.com', updated_by: 'siti.lab@nusantics.com' },
  },
};
