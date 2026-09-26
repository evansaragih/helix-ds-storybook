# Helix Design System — Proposal Arsitektur Token (Scalable)

Rancangan struktur token warna (Primitive + Semantic) ke depan,
berdasarkan semua temuan audit sepanjang sesi ini. **Ini proposal,
belum dieksekusi** — perlu persetujuan sebelum jalan, soalnya beberapa
poin butuh perubahan struktural di Figma, bukan cuma di kode.

Prinsip dasar yang dipakai buat nyusun ini — semuanya udah kebukti
sepanjang sesi audit kemarin, bukan teori doang:

1. **Token spesifik per konteks, bukan reuse lintas konteks.** Kasus
   `Icon/Error` vs `Text/Error` kemarin nunjukkin ini — begitu satu
   token dipakai buat 2 konteks beda (teks & icon), salah satunya pasti
   ujungnya jadi approximation yang gak tepat. Prinsip ini yang dipakai
   nentuin kategori di bawah.
2. **Dua sistem buat satu konsep = sumber bug.** `Container/*` vs
   `Surface/Components/*` kemarin nunjukkin ini — sekali ada 2 jalan ke
   tujuan yang sama, salah satu pasti ketinggalan/gak sinkron.
3. **Token turunan harus jadi alias, bukan hex independen.** Semua
   kasus drift primitive kemarin (dan `Button/*` yang ternyata cuma
   copy-paste dari `Brand/*`) itu terjadi karena nilainya di-hardcode
   ulang, bukan di-alias. Begitu source berubah, copy-an gak ikut.
4. **Gak ada tier ke-3 (component-specific token).** Sama kayak
   prinsip Origin DS — komponen cuma boleh konsumsi token semantic,
   gak boleh punya token sendiri-sendiri. Ini yang bikin `Button/Primary/*`
   duplikat `Brand/Primary/*` — harusnya `Button/Primary/*` di Figma itu
   ALIAS ke `Action`/`Brand`, bukan independen.

---

## Layer 1 — Primitives (SELESAI, dipertahankan apa adanya)

Udah di-resync ke Figma kemarin (13 ramp × 12 step). Gak ada perubahan
struktural yang perlu — cuma perlu 1 aturan tambahan yang ditegasin:

> **Setiap primitive HARUS jadi alias variable di Figma, bukan hex
> manual di kode.** Kalau ada primitive baru ditambah di Figma, proses
> sync ke `theme.css` HARUS baca value asli, bukan nebak dari primitive
> yang udah ada di kode (ini persis kesalahan saya di fix `stroke-subtle`
> tanggal 11 Aug — jangan keulang).

Primitive ramp yang gak kepake sama sekali (`Nusantics/Pale Green`,
`Navy Blue`, `Dusty Blue`, `CeKolam/Atomic Grey`, `Authentic Grey`,
`Causa/Azure`, `Dim Gray`) — **rekomendasi: hapus dari Figma**, kecuali
ada rencana konkret pemakaian. Primitive gak kayak semantic — dia gak
perlu "reserved for future" karena bikin primitive baru itu murah, gak
kayak semantic yang butuh keputusan desain.

---

## Layer 2 — Semantic, struktur target yang diusulkan

Bukan bikin dari nol — ini **konsolidasi** dari 215 variable yang ada
sekarang, dikelompokkan ulang jadi kategori yang jelas batasnya. Simbol:
✅ = udah ada & benar, 🔧 = udah ada tapi perlu diubah/di-alias, ➕ = perlu
ditambah, 🗑️ = dihapus (duplikat).

### `Text/*` — warna teks di atas permukaan netral
✅ Sudah lengkap & benar: `Primary`, `Secondary`, `Tertiary`, `Muted`,
`On-primary`, `Brand/Primary|Secondary|Tertiary`, `Error`, `Success`,
`Warning`, `Info`.
🗑️ `On-dark` — gabung ke `On-primary` kecuali ada bukti perlu beda.

### `Icon/*` — warna icon (BEDA dari Text, standar kontras beda) ➕
✅ `Error` (udah ditambah kemarin).
➕ **Tambah lengkap**: `Primary`, `Secondary`, `Tertiary`, `Disabled`,
`On-primary`, `Success`, `Warning`, `Info` — semua udah ada di Figma,
tinggal diadopsi ke kode dengan pola yang sama kayak `Icon/Error`.
🗑️ Hapus semua varian `Onsurface/*` dan `*Linear` — ini kelihatan
eksperimen/draft yang gak jelas use case-nya, bikin grup Icon jadi
2x lebih rumit dari yang perlu. Kalau nanti butuh icon-on-colored-surface,
lebih baik didesain ulang spesifik pas ada use case-nya.

### `Stroke/*` — border/garis
✅ `Default`, `Subtle`, `Hover`, `Strong`, `Disabled`, `Error`, `Success`,
`Warning`, `Info`, `Neutral-White` — udah benar setelah audit kemarin.
🔧 `Neutral-20`, `Neutral-50` — nama-nya membingungkan (kelihatan kayak
merujuk primitive tapi isinya rgba independen buat gradient tombol).
**Rename** jadi nama yang jelasin fungsinya, misal
`--color-stroke-button-inner` dan `--color-stroke-gradient-top`.
➕/🗑️ `Primary/Secondary/Tertiary` (Default/Focused/Pressed/Subtle × 3,
12 var) — **butuh dicek dulu** apa beda dari `--color-input-border-focus`
yang udah ada (sama-sama brand-aware). Kalau beneran beda use case
(border brand-colored di LUAR konteks input, misal card yang di-select) →
adopsi. Kalau cuma duplikat → hapus.

### `Surface/*` — permukaan/background komponen (KONSOLIDASI BESAR) 🔧🗑️
🔧 **Rename `Container/*` jadi `Surface/*`** (atau sebaliknya, yang
penting satu nama menang) — `Primary`, `Primary-hover`, `Secondary`,
`Tertiary`, `Disabled`.
🗑️ **Hapus total `Surface/Components/*`** — ini duplikat `Container/*`
dengan sebagian makna yang malah beda/nyasar (`Secondary` = warna
brand, bukan abu-abu). Paling berisiko dibiarin karena paling gampang
bikin orang salah pilih token pas buka Figma.
✅ `Background/Page`, `Background/Inverse` tetap sebagai kategori
terpisah — ini emang beda level (halaman, bukan komponen), sesuai
rule yang udah disepakati sebelumnya.
🗑️ `Background/Subtle`, `Background/Hover` — nilainya sama persis
kayak `Container/Tertiary` & `Container/Primary-hover`. Gabung, jangan
punya 2 nama buat 1 value+makna yang identik.

### `Status/*` — warna status (error/success/warning/info/brand)
✅ `Surface/*-bg` (5 var, buat background tint) — sudah benar.
🗑️ `Content/*` (5 var) — 4 dari 5 duplikat persis `Text/Error|Success|Warning|Brand`.
`Content/Info` yang beda value dari `Text/Info` itu kemungkinan **bug
Figma**, bukan konsep baru — perlu ditanya ke yang pegang Figma, bukan
diasumsikan sendiri.

### `Input/*` — sudah rapi, gak ada perubahan
✅ `Text/*`, `Border/*`, `Background/*` — semua udah benar & konsisten.
Ini contoh kategori yang paling rapi di seluruh file, jadi acuan pola
buat kategori lain.

### `Button/*` — HARUS jadi alias, bukan hex independen 🔧
Bukan dihapus, bukan diadopsi mentah — **direstrukturisasi jadi alias**:
`Button/Primary/Primary-bg` di Figma harus di-set sebagai alias ke
`Action/Primary/Default` (atau langsung ke `Brand/Primary` kalau
`Action/*` jadi dihapus — lihat di bawah), bukan hex manual terpisah.
Ini nutup celah supaya kalau brand primary berubah, tombol otomatis
ikut, gak perlu update manual di 2 tempat.
➕ `Success`, `Warning`, `Info` — **butuh konfirmasi produk**: kalau
emang direncanain ada tombol status-colored, adopsi ke `Button.tsx`
sebagai varian baru. Kalau enggak, hapus dari Figma.
➕/🗑️ `Stroke/Linear-1..4` + seluruh `Colors/Linear/*` — sama, butuh
konfirmasi: fitur "tombol gradient" ini masih direncanain atau enggak.
Kalau enggak ada rencana konkret dalam waktu dekat → hapus, karena
"reserved forever" cuma nambah beban kognitif orang buka Figma.

### `Action/*` 🗑️
Hapus total — 100% duplikat `Brand/*` dan `Btn-invert*`. Gak ada alasan
punya 2 nama buat token yang persis sama.

### `Link/*` — adopsi asli, jangan reuse Brand ➕
`TextLink.tsx` komponennya udah ada tapi salah pasang token (pakai
`--color-brand-*` & `--color-destructive` langsung, padahal ada
`Colors/Link/*` yang harusnya dipakai — dan nilainya beda,
`Link/Danger` = `#991B1B`, bukan `#DC2626`). **Rekomendasi: adopsi
penuh, rebind `TextLink.tsx` ke token `Link/*` yang benar** — ini
persis kasus yang paling jelas butuh token spesifik, bukan reuse.

### `Shadow/*`, `Overlay/*` — lengkapi yang kurang ➕
➕ `Shadow/Danger`, `Shadow/Invert`, `Shadow/Brand Primary Subtle` —
tambah kalau ada komponen yang butuh (belum urgent).
✅ `Overlay/Black`, `Overlay/White` — sudah ada, cukup.

### `Data-viz/*` — adopsi, docs udah butuh ➕
➕ Tambah `--color-dataviz-chart-1..8` ke `theme.css`, terus update
`SemanticsSection.tsx` (docs) biar baca dari token ini, bukan hardcode
sendiri kayak sekarang.

### `Surface/State/*` — benerin naming dulu, baru putusin 🔧
Ada bug naming (3 variable folder "Info" isinya nama "Danger") — ini
**harus dibenerin di Figma dulu** sebelum bisa diputusin mau diadopsi
atau enggak, soalnya gak bisa dinilai fair selama namanya masih salah.

---

## Aturan naming ke depan (biar gak keulang masalah yang sama)

1. **Satu konsep = satu tempat.** Sebelum bikin grup/token baru, cek
   dulu apa udah ada yang mirip (`Container` vs `Surface`, `Content`
   vs `Text`, `Action` vs `Brand`) — kalau ada, JANGAN bikin baru,
   pakai yang udah ada atau alias ke situ.
2. **Token turunan dari brand/primitive lain = alias, bukan hex.**
   Kalau nilainya "ya samain aja kayak si X", set sebagai alias di
   Figma. Jangan copy hex-nya.
3. **Reserved-for-future token butuh expiry date/ownership yang
   jelas**, bukan dibiarin nganggur bertahun-tahun. Kalau gak ada
   rencana konkret pemakaian dalam waktu dekat, mending dihapus dulu —
   gampang dibikin ulang pas beneran butuh.
4. **Nama variable harus jelasin FUNGSI, bukan cuma sumber warnanya.**
   `Colors/Stroke/Neutral-20` itu contoh nama yang salah — dia
   sebenernya rgba independen buat efek gradient tombol, bukan
   representasi primitive Neutral-20.

---

## Ringkasan keputusan yang dibutuhkan dari kamu

| # | Item | Rekomendasi saya | Butuh konfirmasi? |
|---|---|---|---|
| 1 | Hapus `Action/*` | Ya, hapus | Gak perlu, ini jelas duplikat |
| 2 | Hapus `Surface/Components/*` | Ya, hapus | Gak perlu, ini jelas duplikat & berbahaya |
| 3 | Hapus `Status/Content/*` (4 dari 5) | Ya, hapus | Perlu cek dulu soal `Content/Info` yang beda value |
| 4 | Tambah `Icon/*` lengkap ke kode | Ya, adopsi | Gak perlu, pola udah tervalidasi |
| 5 | Rebind `TextLink.tsx` ke `Link/*` | Ya, adopsi + rebind | Perlu — ini ubah visual `TextLink` destructive |
| 6 | `Button/Success/Warning/Info` + seluruh `Linear/*` | Reserved dulu | **Perlu — ini soal roadmap produk, bukan desain-system** |
| 7 | `Stroke/Primary|Secondary|Tertiary/*` | Cek dulu vs input-border-focus | Perlu investigasi lebih lanjut |
| 8 | `Surface/State/*` | Benerin naming di Figma dulu | Perlu — siapa yang pegang akses Figma buat rename |

Mau saya mulai dari yang gak butuh konfirmasi (#1, #2, #4) sekarang,
atau kamu mau review semua dulu sebelum saya sentuh apapun?

---

## Target struktur koleksi Semantics di Figma (peta akhir)

Ini gambaran konkret hasil akhirnya — 13 grup, masing-masing satu
tujuan yang jelas. `→ alias X` artinya value-nya HARUS di-set sebagai
alias ke variable lain (bukan hex independen), sesuai prinsip #3 di
atas.

### 1. `Text/*` — teks di atas permukaan netral
`Primary`, `Secondary`, `Tertiary`, `Muted`, `On-primary`, `Error`,
`Success`, `Warning`, `Info`, `Brand/Primary`, `Brand/Secondary`,
`Brand/Tertiary`. (12 variable, gak berubah dari sekarang)

### 2. `Icon/*` — icon, terpisah dari Text
`Primary`, `Secondary`, `Tertiary`, `Disabled`, `On-primary`, `Error`,
`Success`, `Warning`, `Info`. (9 variable — hapus semua `Onsurface/*`
dan `*Linear`)

### 3. `Stroke/*` — border/garis
`Default`, `Subtle`, `Hover`, `Strong`, `Disabled`, `Error`, `Success`,
`Warning`, `Info`, `Neutral-White`. (10 variable)
Ditambah **kalau** hasil investigasi #7 nunjukkin beda use case dari
input-border-focus: `Brand/Default`, `Brand/Focused`, `Brand/Pressed`,
`Brand/Subtle` — 1 set aja (bukan Primary+Secondary+Tertiary terpisah,
karena border brand-colored biasanya cuma butuh 1 warna brand yang
lagi aktif, bukan 3 pilihan brand sekaligus).

### 4. `Surface/*` — permukaan komponen (rename dari `Container/*`)
`Primary`, `Primary-hover`, `Secondary`, `Tertiary`, `Disabled`.
(5 variable — `Surface/Components/*` dihapus total, gak ada yang
nimpa nama ini lagi)

### 5. `Background/*` — level halaman (terpisah dari Surface, sengaja)
`Page`, `Secondary`, `Inverse`. (3 variable — `Subtle` & `Hover`
dihapus, gantinya pakai `Surface/Tertiary` & `Surface/Primary-hover`
yang nilainya identik)

### 6. `Status/*` — status surface (bg tint doang, teksnya reuse Text/*)
`Surface/Error-bg`, `Surface/Success-bg`, `Surface/Warning-bg`,
`Surface/Info-bg`, `Surface/Brand-bg`. (5 variable — `Content/*`
dihapus total, kalau butuh warna teks status ya pakai `Text/Error`
dst langsung, gak perlu nama kedua)

### 7. `Input/*` — gak berubah, udah jadi acuan pola yang benar
`Text/Default|Placeholder|Disabled|Error`,
`Border/Default|Hover|Focus|Disabled|Error|Success`,
`Background/Default|Hover|Focus|Disabled|Error|Success`.
(16 variable, tetap)

### 8. `Button/*` — semua alias, gak ada hex independen
`Primary/Bg → alias Brand/Primary`, `Primary/Hover → alias
Brand/Primary-hover`, `Primary/Pressed → alias Brand/Primary-pressed`
(pola sama buat Secondary, Tertiary), `Danger/* → alias Destructive/*`,
`Neutral/*` dan `Invert/*` boleh tetap independen (emang gak punya
"source" brand token). `Success/Warning/Info/Stroke-Linear` — reserved,
nunggu keputusan produk (#6).

### 9. `Brand/*` (nama baru buat grup yang isinya `--color-brand-*`
sekarang, biar konsisten sama pola "1 grup = 1 sumber kebenaran")
`Primary/Hover/Pressed`, `Secondary/Hover/Pressed`,
`Tertiary/Hover/Pressed`, plus ring & ghost-hover/focus variant yang
udah ada. Ini yang jadi SUMBER buat `Button/*` alias di atas & `Action/*`
yang dihapus.

### 10. `Link/*` — dedicated, gak reuse Brand
`Default`, `Hover`, `Pressed`, `Visited`, `Disabled`, `On-dark`,
`Danger`, `Info`. (8 variable, tetap — cuma direbind ke `TextLink.tsx`)

### 11. `Shadow/*`
`Brand/Primary|Secondary|Tertiary`, `Brand-primary-subtle`, `Neutral`,
`Danger`, `Invert`. (7 variable — tambah `Danger` & `Invert` yang
sekarang ada di Figma tapi belum dipakai kode)

### 12. `Overlay/*`
`Black`, `White`. (2 variable, tetap — `Black 70%` cek dulu apa beda
guna dari `Black` biasa atau cuma alpha-variant yang bisa di-compute
langsung di kode pakai `color-mix()`/rgba, gak perlu variable terpisah)

### 13. `Data-viz/*` — baru diadopsi
`Chart-1` s/d `Chart-8`. (8 variable)

**Total target: ~90 variable** (dari 215 sekarang) — turun lebih dari
separuh, tapi setiap yang tersisa punya alasan jelas kenapa dia ada
dan gak ada yang tumpang tindih sama yang lain. Reserved items
(`Linear/*`, `Button/Success|Warning|Info`, `Surface/State/*`) sengaja
gak dihitung di sini karena statusnya masih nunggu keputusan #6 & #8 —
begitu diputusin, baru masuk hitungan final.

---

## Catatan skalabilitas — seberapa siap struktur ini buat kebutuhan masa depan

Ditanyain langsung: apakah struktur di atas bakal cover semua
penggunaan warna pas bikin komponen baru nanti? Jawabannya: kategorinya
fleksibel sebagai wadah, tapi ada beberapa gap konkret yang perlu
disadari, bukan diasumsikan otomatis ke-cover.

**Dark mode — DIKONFIRMASI TIDAK DIBUTUHKAN.** User udah cross-check
langsung ke Jason: seluruh produk light mode aja buat saat ini. Jadi
struktur token gak perlu didesain buat nampung dimensi tema
light/dark (yang kalau iya, butuh restrukturisasi besar — tiap token
butuh 2 versi). Ini bukan lagi open question, resmi di luar scope.

**Yang masih jadi gap terbuka (belum diputuskan):**
1. **Alpha/transparansi ad-hoc** — komponen sekarang bikin
   `rgba(255,255,255,0.1)` sendiri-sendiri di kode, padahal Figma udah
   punya primitive scale resmi (`Colors/White/1%` s/d `100%`,
   `Colors/Black/*`) yang gak pernah dipakai konsisten. Rekomendasi:
   jadiin ini token alpha resmi, bukan rgba liar per komponen.
2. **Kosakata status fix di 4** (error/success/warning/info) + brand —
   kalau nanti produk butuh status ke-5 (misal warna khusus fitur
   premium, atau status workflow spesifik), itu butuh diulang manual
   di ~4 grup sekaligus (Text/Icon/Stroke/Status-surface). Bisa
   dilakuin, tapi perlu didokumentasikan sebagai pola/template biar
   konsisten pas ditambah, bukan diakalin instan tiap komponen.
3. **Surface cuma 3 level** (Primary/Secondary/Tertiary) — cukup buat
   kebutuhan sekarang, tapi belum ada pola terdokumentasi kalau nanti
   butuh level ke-4 (modal-di-dalam-modal, dst).

Poin 1 & 2 kemungkinan lebih tinggi urgensinya buat diberesin dari
awal (soalnya udah ada 1 contoh nyata butuh transparansi tiap saat).
Poin 3 sifatnya "tunggu sampai beneran kejadian" — extend nanti-nanti
aja pas ada kasusnya.
