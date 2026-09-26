# Helix Design System — Audit 17 Komponen "Atom" yang Diusulin

Review 17 komponen yang diusulin sebagai tier "atom" (list dari user),
dicek satu-satu langsung ke Figma file "Nusantics Design System"
(`GWzBKGr6512AeMOapwgQhj`) pakai search live, terus dicocokin sama
hasil audit `component-catalogue.md` (2026-08-17) yang udah nge-tier-in
Figma ↔ kode dari sisi lain. **Belum ada perubahan apapun di Figma** —
ini laporan buat direview dulu sebelum ada aksi.

Catatan penting di awal: 17 item ini bukan daftar tier yang final dari
proses reconciliation — ini proposal user yang lagi dicek kesesuaiannya.
Angka "5 dari 17" di bawah ini bukan berarti 12 sisanya salah/gak
penting, cuma emang levelnya beda dari yang diasumsikan.

---

## Temuan #1 — cuma ~5 dari 17 yang beneran Atomic, sisanya Molecule/Excluded/gak jelas

Berdasarkan `component-catalogue.md`, cuma segelintir dari 17 item ini
yang levelnya Atomic. Mayoritas ternyata Molecule (karena mengompos
komponen lain atau punya kompleksitas state/varian yang lebih tinggi),
ada 1 yang eksplisit di-exclude (bukan komponen sama sekali), dan 2
yang gak ada di catalogue sama sekali.

| # | Komponen (usulan) | Status di Figma sekarang | Tier per catalogue.md | Verdict / Aksi |
|---|---|---|---|---|
| 1 | Avatar | `component_set` "Avatar" — ada, tapi campur sama 15+ loose component numbered (lihat Temuan #2) | **Molecule** (family folder — `Avatar Group`/`Avatar Label Group` compose `Avatar`, jadi seluruh folder naik ke Molecule) | Bukan Atomic murni. `Avatar` sendiri emang sesederhana atom, tapi tier folder-nya ketarik naik karena family rule |
| 2 | Badge | **Gak ketemu** `component_set` "Badge" polos di Figma — cuma ada `Badge Custom Colors`, `Badge Link`, `Badge with spinner` | **Molecule** ("Badges" page: Badge, Badge Custom Colors, Badge Link, Badge with spinner — catalogue nyatet "Y" ada) | Ada gap: catalogue bilang base "Badge" ada di Figma, tapi search gak nemu set itu. Perlu dicek manual — mungkin namanya beda / kehapus / ke-merge. Terlepas dari itu, tetep Molecule bukan Atomic |
| 3 | Badge Group | **Gak ketemu sama sekali** | **Gak ada di catalogue** | Lihat Temuan #3 |
| 4 | Button Group | `component_set` "Button Group" — bersih, satu set jelas | **Atomic** (bagian dari family "Buttons") | Cocok — gak ada aksi |
| 5 | Buttons | `component_set`: "Buttons / Button", "Buttons / Icon", "Buttons / Icon Pill", "Buttons / Button utility" — bersih, terstruktur rapi | **Atomic** | Cocok — gak ada aksi |
| 6 | Checkbox | `component_set` "Checkbox" + "Checkbox / Choice Card"; loose parts "Checkbox / Fieldset", "Checkbox / Description" | **Atomic** ("Checkboxes" page) | Cocok — gak ada aksi |
| 7 | Radio Group | `component_set` "Radio Button" (bukan "Radio Group") + "Radio Button / Choice Card" | **Molecule** ("Radio Groups" — catalogue minta rename set "Radio Button" → "Radio Group Item", "Radio Button / Choice Card" → "Radio Group Choice Card") | Bukan Atomic. Rename di Figma masih belum dieksekusi — nama di Figma masih "Radio Button" |
| 8 | Dropdown | `component`/`component_set`: "Dropdown / Basic", "Dropdown / Selection", "Dropdown / Select Multi", "Dropdown / Complex" | **Molecule** ("Dropdowns" page) | Bukan Atomic. Catalogue nyebut set-nya "Dropdown / Avatar Navbar" + "Dropdown / Selection" doang — beda sama yang kelihatan sekarang (`Basic`, `Select Multi`, `Complex` gak disebut). Perlu di-cross-check ulang, kemungkinan catalogue Aug 17 belum lengkap nyatet semua set di page ini |
| 9 | Input Field | `component_set` "Input / Basic" (ketemu), "Input / Floating"; + banyak `component` loose: "Input / Text-field / Phone, Password, E-mail, Search, Copy to Clipboard, Input-Group, Website-url" | **Molecule** (= "Textfield" di catalogue, dari page "Inputs") | Bukan Atomic. Ini kemungkinan besar sama dengan "Textfield" molecule di catalogue |
| 10 | Select | 4 `component` loose gak dalam 1 set: "Select / Basic", "Select / Invalid", "Select / Multi-select", "Select / Group" | **Molecule** ("Selects" page — catalogue: "4 unnamed => Select", aksi "Publish a named Select set") | Bukan Atomic, dan emang masih perlu dipublish jadi 1 component_set resmi — masih 4 komponen lepas, persis kayak yang dicatet catalogue |
| 11 | Progress Indicator | **Sudah kepisah** jadi 2 `component_set`: "Progress Bar" dan "Progress Circle" | **Atomic**, tapi catalogue eksplisit minta **split jadi 2 page terpisah**, bukan 1 "Progress Indicator" | Kabar baik: splitnya udah kejadian di level component set. Tinggal pastiin juga struktur *page*-nya di Figma udah 2 page terpisah, bukan 1 page "Progress Indicators" yang isinya digabung |
| 12 | Dot | **Gak ketemu** di Nusantics Design System — cuma ketemu di library icon (Phosphor "Dot", react-icons dot-dot) | **Gak ada di catalogue** | Lihat Temuan #3 |
| 13 | Icon | Gak ada `component_set` "Icon" generik berdiri sendiri di Nusantics DS. Yang ada: "Buttons / Icon", "Buttons / Icon Pill" (bagian dari family Buttons) | **Excluded** dari cycle ini (deferred ke R4, asset library) — kecuali icon yang nempel di family Buttons, itu Atomic | "Icon" sebagai komponen standalone bukan target realistis buat cycle ini. Kalau maksudnya icon di dalam tombol, itu udah ke-cover sama Buttons |
| 14 | Toggles | `component_set` "Switch Button" (belum di-rename), "Switch Button / Choice Card"; + loose `component` "Switch" (nama beda sendiri) | **Molecule** ("Switches" page — catalogue minta rename "Switch Button" → "Switch", "Switch Button / Choice Card" → "Switch Card") | Bukan Atomic. Rename belum jalan — nama Figma masih "Switch Button". Ada juga 1 loose component bernama "Switch" polos yang bikin agak rancu sama target nama barunya — perlu dicek apa ini draft/placeholder |
| 15 | Divider | **2 `component_set` berbeda, sama-sama namanya "Divider"** (component key beda, tanggal update beda) | **Atomic** — catalogue eksplisit: "Purge the stray duplicate sitting in 03. Trash" | Bukan cuma soal tier — ada duplikat nyata yang emang udah diketahui catalogue, tinggal dieksekusi hapus salah satunya |
| 16 | Scrollbar | **Ternyata ADA** sebagai `component_set` published — malah 2 duplikat (component key beda, 2026-07-05 vs 2026-07-10) | **Excluded** — catalogue eksplisit: Scrollbar bukan komponen, harusnya CSS override (`::-webkit-scrollbar`), gak boleh ada `Scrollbar.tsx`/set khusus | Konflik nyata antara keputusan catalogue vs kondisi Figma aktual. Figma-nya justru punya 2 set "Scrollbar" published, padahal harusnya di-deprecate total |
| 17 | Tooltips | `component_set` "Tooltip" — bersih, 1 set doang | **Molecule** ("Tooltips" page) | Bukan Atomic, tapi setnya sendiri udah rapi, gak ada masalah struktural |

**Ringkasan cepat:** dari 17, yang beneran cocok jadi Atomic per catalogue cuma **Buttons, Button Group, Checkbox, Divider**, dan **Progress Indicator** (dengan catatan harus di-split jadi 2 page/komponen terpisah, bukan 1 nama gabungan). Sisanya: 8 Molecule (Avatar, Badge, Radio Group, Dropdown, Input Field, Select, Toggles, Tooltips), 2 Excluded (Icon sebagai standalone, Scrollbar), dan 2 gak ada di catalogue sama sekali (Badge Group, Dot).

---

## Temuan #2 — pola "clutter" numbered/duplicate berulang, gak cuma di Avatar

Waktu ngecek Avatar, jelas banget ada 15+ loose component numbered
(`avatar01` sampai `avatar18`, plus `avatar-empty`) nempel di
sebelahnya set yang bersih (`Avatar`, `Avatar group`, `Avatar label
group`). Ini keliatan kayak sisa asset/placeholder yang mestinya gak
dipublish sebagai komponen.

Pola serupa (walau bentuknya beda — bukan numbered, tapi tetep
"komponen lepas yang harusnya gak berdiri sendiri di sebelah set
resminya") kejadian lagi di beberapa tempat lain yang saya cek:

| Komponen | Yang bersih | Yang keliatan clutter/duplikat |
|---|---|---|
| **Avatar** | `Avatar`, `Avatar group`, `Avatar label group` | `avatar01`–`avatar18` (18 loose numbered) + `avatar-empty` — 19 komponen "sampah" nempel di sebelah 3 set resmi |
| **Divider** | — | 2 `component_set` beda key, nama sama-sama "Divider" — literally duplikat, bukan cuma clutter |
| **Scrollbar** | — | 2 `component_set` beda key, nama sama-sama "Scrollbar" — duplikat juga, dan harusnya malah gak ada sama sekali (lihat Temuan #1 baris 16) |
| **Input Field / Textfield** | `Input / Basic`, `Input / Floating` (2 `component_set` resmi) | 5 loose `component` terpisah: `text-field-extra-small`, `text-field-small`, `text-field-medium`, `text-field-large`, `text-field-floating` — kemungkinan besar ini pecahan size-variant lama sebelum dikonsolidasi jadi 1 set `Input / Basic` yang punya varian size. Belum dihapus |

**Pola yang berulang:** tiap kali ada 1 set resmi yang "menang", biasanya
masih ada sisa versi lama/pecahan yang lupa dibersihin di sebelahnya.
Ini bukan cuma soal Avatar — worth dijadiin 1 sapuan bersih-bersih
menyeluruh, bukan fix satu-satu per komponen.

---

## Temuan #3 — Badge Group & Dot: gak ketemu, dan gak ada di catalogue.md juga

Dua item ini eksplisit gak dicek di audit `component-catalogue.md`
sebelumnya (2026-08-17), jadi murni hasil pengecekan baru di Figma:

**Badge Group**
- Search "Badge Group" di Nusantics Design System: **nihil**. Yang
  muncul cuma noise gak relevan (`Badge and Tag` di library
  `[Archived] Design System`, icon-icon badge dari React-icons).
- Dugaan: kemungkinan ini bukan set terpisah, tapi cuma kombinasi
  varian dari `Badge` (misal: beberapa badge disusun bersebelahan
  dalam 1 frame contoh pemakaian) — bukan komponen berdiri sendiri.
  **Tapi ini dugaan, belum kekonfirmasi** — perlu ditanyain langsung
  ke yang ngusulin, apa maksudnya emang komponen baru (grup badge yang
  bisa overflow/dismiss, dsb) atau cuma cara nyebut susunan Badge biasa.

**Dot**
- Search "Dot" di Nusantics Design System: **nihil** juga di level
  komponen DS. Yang ketemu cuma set icon generik "Dot" dari 2 library
  icon terpisah (Phosphor Icons dan Phosphor Icons Community) — itu
  cuma glyph titik, bukan komponen status-indicator.
- Dugaan: "Dot" mungkin dimaksud sebagai status dot/indicator kecil
  (biasanya nempel di Avatar buat online-status, atau di Badge versi
  minimal tanpa teks). Tapi gak ada bukti itu ada sebagai varian
  tersembunyi di dalam `Avatar` atau `Badge` set yang udah dicek —
  kalau ada, gak kelihatan lewat search nama "Dot".
- **Kesimpulan: keduanya beneran gak ada, bukan salah cari.** Kalau
  masih mau dipertahanin di daftar atom, ini kategorinya "belum
  didesain sama sekali", bukan "ada tapi salah tier/nama".

---

## Temuan tambahan — mismatch spesifik yang muncul pas ngecek satu-satu

- **Badge dasar hilang dari pencarian.** Catalogue nyatet page
  "Badges" isinya `Badge, Badge Custom Colors, Badge Link, Badge with
  spinner` dengan status "Y" (ada di Figma). Tapi search langsung ke
  Figma cuma nemu 3 dari 4 itu — `Badge Custom Colors`, `Badge Link`,
  `Badge with spinner` — **gak ketemu `component_set` "Badge" polos**.
  Bisa jadi kehapus/ke-rename setelah tanggal audit catalogue
  (17 Aug), atau nama-nya beda dari yang dicatet. Perlu dicek manual
  langsung di Figma, jangan cuma andelin search.
- **Scrollbar hidup padahal harusnya mati.** Ini temuan paling
  kontras: catalogue udah eksplisit mutusin Scrollbar itu bukan
  komponen (CSS override doang, no `Scrollbar.tsx`), tapi di Figma
  malah ada 2 `component_set` "Scrollbar" published dan aktif. Kalau
  keputusan "exclude" itu final, ini prioritas bersih-bersih paling
  jelas — dihapus, bukan didiamkan di trash.
- **Rename yang direkomendasiin catalogue belum jalan di Figma:**
  - "Radio Button" masih belum jadi "Radio Group Item"
  - "Switch Button" masih belum jadi "Switch" (dan ada loose
    component "Switch" nyempil sendirian, bisa bikin bingung pas
    rename beneran dieksekusi — nama tujuan udah "kepakai" duluan
    sama komponen lain)
- **Progress Indicator kabar baik:** ini satu-satunya dari 17 yang
  actionable state-nya udah lebih maju dari yang diduga — `Progress
  Bar` dan `Progress Circle` udah kepisah jadi 2 `component_set`
  sendiri-sendiri persis rekomendasi catalogue, tinggal pastiin
  struktur *page*-nya di Figma juga udah kepisah (gak dicek detail
  page grouping-nya di pass ini, cuma component set level).
- **Dropdown perlu di-walkthrough ulang.** Catalogue cuma nyebut set
  "Dropdown / Avatar Navbar" dan "Dropdown / Selection" di page ini.
  Yang kelihatan di Figma sekarang malah "Dropdown / Basic",
  "Dropdown / Selection", "Dropdown / Select Multi", "Dropdown /
  Complex" — beda daftar. Kemungkinan catalogue Aug 17 belum nyatet
  lengkap semua set di page Dropdowns, atau ada perubahan struktur
  setelah tanggal itu. Perlu dicocokin manual, bukan cuma dari hasil
  search.

---

## Ringkasan & rekomendasi langkah berikutnya

Dari 17 komponen yang diusulin sebagai "atom":
- **5 valid Atomic** per catalogue: Buttons, Button Group, Checkbox,
  Divider, Progress Indicator (dengan syarat displit jadi 2).
- **8 sebenarnya Molecule**, bukan Atomic: Avatar, Badge, Radio Group,
  Dropdown, Input Field, Select, Toggles, Tooltips.
- **2 Excluded dari scope**: Scrollbar (harus dihapus dari Figma,
  bukan cuma "gak dianggap atom"), Icon standalone (dialihkan ke
  workstream asset/icon terpisah, R4).
- **2 gak terjawab sepenuhnya**: Badge Group, Dot — beneran gak ada di
  Figma maupun catalogue, butuh keputusan/desain dari nol kalau mau
  dipertahanin.

Next steps yang disaranin (belum dieksekusi, tunggu review):
1. **Selaraskan definisi "atom" dulu** sebelum sentuh Figma sama
   sekali — daftar 17 ini kelihatannya nyampur konsep "atom" di sense
   UI-primitif sama "komponen kecil" secara umum. Kalau mau
   konsisten sama tiering `component-catalogue.md`, cuma 5 yang
   qualify.
2. **Bersih-bersih clutter** (Temuan #2): hapus `avatar01`–`avatar18` +
   `avatar-empty`, 1 dari 2 duplikat `Divider`, 5 loose `text-field-*`
   kalau emang udah kegantiin `Input / Basic`/`Input / Floating`.
3. **Putuskan nasib Scrollbar** — kalau keputusan "exclude, CSS-only"
   masih final, 2 `component_set` Scrollbar yang published sekarang
   harus dihapus, bukan dibiarin nganggur.
4. **Jalanin rename yang udah direkomendasiin** tapi belum kejadian:
   Radio Button → Radio Group Item, Switch Button → Switch (plus
   cari tau dulu apa maksud loose component "Switch" yang nyempil).
5. **Konfirmasi manual ke designer** buat 3 hal yang gak kejawab lewat
   search: (a) base "Badge" set yang ilang, (b) struktur Dropdown yang
   beda dari catatan catalogue, (c) definisi Badge Group & Dot kalau
   emang mau dibikin.
