/* ===========================================================================
   Causa service catalog + anonymised counterparties.

   SHAPE AND CATALOG ARE REAL, IDENTITIES ARE NOT.

   The column structure, the service names, their price points, the category
   labels and the observed mix were all derived from a real sample export
   ("202601 - 202610 - Causa Test List.xlsx", 558 tests over Jan–Oct 2026).
   Service names and prices are catalog data, so they are kept verbatim.

   Everything that identifies a person or an organisation is invented:
   providers, labs and patients here have no relationship to the real ones,
   and no real name, order id or test id was copied into this file.
   =========================================================================== */

window.FC = (function () {
  'use strict';

  /* ---- service catalog ---------------------------------------------------
     `rpp`  customer price INCLUDING 11% PPN, as the export states it.
     `cat`  ESOTERIC | ROUTINE | MICROBIOMIC — rendered as
            "Layanan Satuan - {cat}" in the Kategori column.
     `w`    draw weight, set to the observed test counts so the generated mix
            reproduces the real one (HPV DNA + Pap Smear alone is ~61%).
     ---------------------------------------------------------------------- */
  const SERVICES = [
    { code: 'AAC', name: 'HPV DNA + Pap Smear (ThinPrep)',                 cat: 'ESOTERIC',    rpp: 1200000, w: 339 },
    { code: 'AAV', name: 'Hematologi Lengkap',                             cat: 'ROUTINE',     rpp:  150000, w:  36 },
    { code: 'AAD', name: 'Pap Smear (ThinPrep)',                           cat: 'ESOTERIC',    rpp:  630000, w:  31 },
    { code: 'AAW', name: 'Hematologi Rutin',                               cat: 'ROUTINE',     rpp:  130000, w:  16 },
    { code: 'AAE', name: 'HPV DNA High-Risk + Pap Smear (ThinPrep)',       cat: 'ESOTERIC',    rpp: 1200000, w:  11 },
    { code: 'ACK', name: 'Kreatinin',                                      cat: 'ROUTINE',     rpp:   90000, w:   9 },
    { code: 'ACU', name: 'Urin Rutin',                                     cat: 'ROUTINE',     rpp:  100000, w:   9 },
    { code: 'AAK', name: 'HbA1C',                                          cat: 'ROUTINE',     rpp:  210000, w:   9 },
    { code: 'AAM', name: 'Glukosa (Puasa)',                                cat: 'ROUTINE',     rpp:   60000, w:   8 },
    { code: 'ACW', name: 'Salmonella Typhi - Widal',                       cat: 'ROUTINE',     rpp:  290000, w:   8 },
    { code: 'ACH', name: 'Anti HIV',                                       cat: 'ROUTINE',     rpp:  600000, w:   7 },
    { code: 'AAA', name: 'HPV DNA (Urine)',                                cat: 'ESOTERIC',    rpp:  550000, w:   7 },
    { code: 'ACR', name: 'Urea',                                           cat: 'ROUTINE',     rpp:   90000, w:   6 },
    { code: 'AAL', name: 'Glukosa (2 jam PP)',                             cat: 'ROUTINE',     rpp:   60000, w:   6 },
    { code: 'AAN', name: 'Glukosa (Sewaktu)',                              cat: 'ROUTINE',     rpp:   60000, w:   5 },
    { code: 'ACA', name: 'Asam Urat',                                      cat: 'ROUTINE',     rpp:   90000, w:   4 },
    { code: 'ACD', name: 'Dengue - NS-1 Ag',                               cat: 'ROUTINE',     rpp:  580000, w:   3 },
    { code: 'ACT', name: 'TPHA',                                           cat: 'ROUTINE',     rpp:  260000, w:   3 },
    { code: 'ACB', name: 'Albumin',                                        cat: 'ROUTINE',     rpp:  111600, w:   2 },
    { code: 'ACX', name: 'Toxoplasma (IgM)',                               cat: 'ROUTINE',     rpp:  509000, w:   2 },
    { code: 'ACP', name: 'Potassium (Kalium)',                             cat: 'ROUTINE',     rpp:  120000, w:   2 },
    { code: 'ABN', name: 'Trigliserida',                                   cat: 'ROUTINE',     rpp:   89400, w:   2 },
    { code: 'AAF', name: 'Ferritin',                                       cat: 'ROUTINE',     rpp:  467025, w:   2 },
    { code: 'ACE', name: 'Elektrolit (Na, K, Cl)',                         cat: 'ROUTINE',     rpp:  230000, w:   2 },
    { code: 'ACC', name: 'CRP Kuantitatif',                                cat: 'ROUTINE',     rpp:  350000, w:   2 },
    { code: 'ACV', name: 'VDRL',                                           cat: 'ROUTINE',     rpp:  167140, w:   2 },
    { code: 'ACZ', name: 'Vitamin D (25 OH)',                              cat: 'ROUTINE',     rpp:  469000, w:   2 },
    { code: 'ADP', name: 'SGPT / ALT',                                     cat: 'ROUTINE',     rpp:   90000, w:   1 },
    { code: 'ADO', name: 'SGOT / AST',                                     cat: 'ROUTINE',     rpp:   90000, w:   1 },
    { code: 'ADS', name: 'SARS-CoV-2, Influenza A, Influenza B RNA - PCR', cat: 'ESOTERIC',    rpp:  630000, w:   1 },
    { code: 'ADR', name: 'Rubella (IgM)',                                  cat: 'ROUTINE',     rpp:  690000, w:   1 },
    { code: 'ADF', name: 'Rheumatoid Factor',                              cat: 'ROUTINE',     rpp:  190000, w:   1 },
    { code: 'ABB', name: 'APTT',                                           cat: 'ROUTINE',     rpp:  270000, w:   1 },
    { code: 'AAR', name: 'Insulin (Puasa)',                                cat: 'ROUTINE',     rpp:  650000, w:   1 },
    { code: 'ADN', name: 'Natrium',                                        cat: 'ROUTINE',     rpp:  120000, w:   1 },
    { code: 'ADM', name: 'Mycobacterium tuberculosis PCR (MTB+RIF)',       cat: 'ESOTERIC',    rpp: 1137750, w:   1 },
    { code: 'AEM', name: 'Microbiome Screening (Urine)',                   cat: 'MICROBIOMIC', rpp: 4000000, w:   1 },
    { code: 'ADL', name: 'Malaria - P. falciparum Ag & P. vivax Ag',       cat: 'ROUTINE',     rpp:  460000, w:   1 },
    { code: 'ADH', name: 'LH',                                             cat: 'ROUTINE',     rpp:  460000, w:   1 },
    { code: 'ABL', name: 'Kolesterol (Total)',                             cat: 'ROUTINE',     rpp:   90000, w:   1 },
    { code: 'ABK', name: 'Kolesterol (LDL, Direk)',                        cat: 'ROUTINE',     rpp:  120000, w:   1 },
    { code: 'ADV', name: 'HSV 1 & 2 (IgM)',                                cat: 'ESOTERIC',    rpp:  580000, w:   1 },
    { code: 'ADQ', name: 'HBsAg Kualitatif',                               cat: 'ROUTINE',     rpp:  265290, w:   1 },
    { code: 'ADB', name: 'HBsAg',                                          cat: 'ROUTINE',     rpp:  260000, w:   1 },
    { code: 'AAU', name: 'Golongan Darah ABO & Rhesus',                    cat: 'ROUTINE',     rpp:  110000, w:   1 },
    { code: 'ADG', name: 'FSH',                                            cat: 'ROUTINE',     rpp:  460000, w:   1 },
    { code: 'ADC', name: 'CMV (IgM)',                                      cat: 'ROUTINE',     rpp:  690000, w:   1 },
    { code: 'AEB', name: 'BiomeScan (Bacterial & Fungal)',                 cat: 'MICROBIOMIC', rpp: 5000000, w:   1 },
    { code: 'ADA', name: 'Anti Mullerian Hormon (AMH)',                    cat: 'ROUTINE',     rpp: 1673538, w:   1 },
    { code: 'ABE', name: 'Waktu Protrombin',                               cat: 'ROUTINE',     rpp:  290000, w:   1 },
  ];

  const CATEGORY_PREFIX = 'Layanan Satuan - ';

  /* ---- synthetic patient name pool --------------------------------------
     Invented. Combined first + last at generation time, so a realistic
     number of distinct patients appears without any real identity. */
  const FIRST = [
    'Adinda', 'Bagas', 'Cahaya', 'Dewi', 'Eka', 'Farah', 'Gilang', 'Hana',
    'Indra', 'Jingga', 'Kirana', 'Lintang', 'Maya', 'Nadia', 'Oka', 'Putri',
    'Rani', 'Satria', 'Tari', 'Umi', 'Vina', 'Wulan', 'Yoga', 'Zahra',
    'Arif', 'Bunga', 'Citra', 'Dimas', 'Elang', 'Fitri', 'Galih', 'Hesti',
    'Ika', 'Joko', 'Kartika', 'Laras', 'Mega', 'Nanda', 'Oktavia', 'Panji',
  ];
  const LAST = [
    'Pratama', 'Wijaya', 'Santoso', 'Hartono', 'Nugroho', 'Setiawan',
    'Permata', 'Kusuma', 'Maharani', 'Siregar', 'Hutapea', 'Simanjuntak',
    'Rahayu', 'Lestari', 'Anggraini', 'Firdaus', 'Ramadhan', 'Syahputra',
    'Wibowo', 'Gunawan', 'Halim', 'Iskandar', 'Jayadi', 'Kurniawan',
  ];

  return {
    SERVICES: SERVICES,
    CATEGORY_PREFIX: CATEGORY_PREFIX,
    PATIENT_FIRST: FIRST,
    PATIENT_LAST: LAST,
  };
})();
