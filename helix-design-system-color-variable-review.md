# Helix Design System — Review Variable Warna (Figma "Semantics" collection)

Review penuh 215 variable di collection "Semantics" Figma
(`GWzBKGr6512AeMOapwgQhj`), dibandingkan sama yang beneran diadopsi ke
`theme.css` (89 `--color-*` token). Fokus: warna yang gak diperlukan
(gak kepake) + naming convention. **Belum ada perubahan apapun** — ini
laporan buat direview dulu.

---

## Temuan #1 — lebih dari separuh variable Figma gak pernah masuk ke kode

Dari 215 variable Semantics, cuma sekitar **89 yang punya padanan di
`theme.css`** (dan gak semua nama match persis). Sisanya — grup-grup
utuh — kelihatannya didesain di Figma tapi **gak pernah diadopsi
developer** sama sekali:

| Grup Figma | Jumlah variable | Status di kode |
|---|---|---|
| `Colors/Action/*` (Primary/Secondary × Active/Default/Hover) | 6 | Gak ada sama sekali |
| `Colors/Button/*` (Danger, Info, Primary, Secondary, Stroke/Linear-1-4, Subtle/*, Success, Tertiary, Warning) | ~30 | Cuma sebagian kecil kepake (`Neutral`, `Invert`, `Disabled` doang) |
| `Colors/Data-viz/Chart-1..8` | 8 | Gak ada — docs web app malah hardcode warna chart-nya sendiri terpisah, gak baca dari sini |
| `Colors/Icon/*` (Onsurface/*, Linear variants, dll) | ~20 | Cuma `Icon/Error` yang baru kita tambah kemarin |
| `Colors/Linear/*` (Primary/Secondary/Tertiary × Brand/Dark/Light/Subtle) | 10 | Gak ada sama sekali |
| `Colors/Link/*` | 8 | Gak ada — padahal `TextLink.tsx` komponennya ada, tapi gak baca token `Colors/Link/*`, malah pakai `--color-brand-*` |
| `Colors/Status/Content/*` (teks berwarna per status) | 5 | Gak ada |
| `Colors/Stroke/Primary/*`, `Secondary/*`, `Tertiary/*` (Default/Focused/Pressed/Subtle × 3) | 12 | Gak ada |
| `Colors/Surface/Components/*` | ~20 | Gak ada — **ini sistem surface/container KEDUA yang paralel** (lihat Temuan #2) |
| `Colors/Surface/State/*` (Danger/Info/Success/Warning × active/default/hover) | 12 | Gak ada |

**Total kira-kira 120+ variable (lebih dari setengah) didesain di Figma
tapi gak pernah dipakai developer.** Ini jauh lebih besar dari yang
kita duga di awal (yang tadinya cuma nemu `bg-page` doang gak kepake).

---

## Temuan #2 — dua sistem surface/container yang tumpang tindih di Figma sendiri

Figma punya **dua grup berbeda buat konsep yang sama** (warna
permukaan/background komponen):
- `Colors/Container/*` (Primary, Secondary, Tertiary, Disabled, dll) —
  **ini yang diadopsi kode**
- `Colors/Surface/Components/*` (Default, Secondary, Tertiary, Subtle,
  Hover, Disabled, Brand, dll) — **ini yang gak pernah dipakai**

Contoh konkret nilainya beda konsep meski nama mirip:
`Colors/Surface/Components/Secondary` = `#58595B` (itu warna
**brand-secondary**, bukan abu-abu netral!), sedangkan
`Colors/Container/Secondary` = `#F7F7F7` (abu-abu netral). Jadi bukan
cuma duplikat nama — dua sistem ini punya makna yang beda-beda per
istilah yang sama, berpotensi bikin bingung siapapun yang buka Figma
dari sisi manapun duluan.

**Rekomendasi:** salah satu sistem ini kemungkinan peninggalan iterasi
desain lama yang belum dibersihin. Perlu diputuskan di Figma: pertahanin
`Container/*` (yang udah established di kode), dan `Surface/Components/*`
dihapus atau didokumentasikan jelas bedanya.

---

## Temuan #3 — kejanggalan naming di Figma sendiri (bukan soal kode)

- **Typo**: `Colors/Icon/Onsurface/Error Lienar` — harusnya "Linear"
- **Salah label kemungkinan copy-paste**: `Colors/Surface/State/Info/Danger-default`,
  `Danger-active`, `Danger-hover` — tiga-tiganya ada di dalam grup
  **"Info"** tapi namanya **"Danger"**. Kemungkinan besar pas bikin grup
  Info, developer/desainer Figma-nya copy dari grup Danger dan lupa
  rename.
- **Istilah gak konsisten buat konsep yang sama**: "Danger" (di
  `Button/Danger`, `Surface/State/Danger`) vs "Error" (di `Icon/Error`,
  `Text/Error`, `Stroke/Error`) vs "Destructive" (istilah yang dipakai
  di kode, `--color-destructive`). Tiga istilah buat 1 konsep yang
  sama, tersebar gak konsisten.
- **`On-dark` vs `On-primary`**: `Colors/Text/On-dark` ada di Figma tapi
  kode cuma punya `--color-text-on-primary`. Belum jelas apa dua-duanya
  beda kegunaan atau `On-dark` ini juga sisa yang gak kepake.

---

## Temuan #4 — primitive ramp yang gak kepake (dari review kemarin)

Sudah dicatat di log §5, diulang di sini biar satu tempat:
- Nusantics: `Pale Green`, `Navy Blue`, `Dusty Blue`
- CeKolam: `Atomic Grey`, `Authentic Grey`
- Causa: `Azure`, `Dim Gray`

---

## Temuan #5 — value MISMATCH beneran di token yang justru dipakai (bukan cuma unused)

Ini beda kategori dari temuan di atas: token-token ini **ADA di kode dan
DIPAKAI**, tapi nilainya gak sama persis dengan Figma. Ini hasil
cross-check value satu-satu (bukan cuma cek nama) buat semua 215
variable Semantics.

| Token kode | Value di kode sekarang | Value Figma asli | Dipakai di |
|---|---|---|---|
| `--color-stroke-strong` | `#49494A` | `#9F9F9F` | Gak dipakai komponen manapun saat ini |
| `--color-stroke-hover` | `#9F9F9F` | `#828282` | `Checkbox.tsx`, `RadioButton.tsx` |
| `--color-stroke-success` | `#22C55E` | `#12843C` | `Alert.tsx` |
| `--color-stroke-warning` | **gak ada di kode** | `#F59E0B` | — |
| `--color-stroke-disabled` | **gak ada di kode** | `#D7D7D7` | — |
| `--color-container-primary-hover` | **gak ada di kode** | `#EEEEEE` | — |

**Dampak kalau dibetulin:** border hover di `Checkbox`/`RadioButton`
jadi sedikit lebih gelap, border success di `Alert` jadi lebih gelap
(dari hijau terang ke hijau tua). Ini perubahan visual kecil tapi
nyata, sama kayak kasus `stroke-subtle` kemarin — bukan sekadar
rapi-rapi kode.

Dua yang laen (`Status/Content/*` sebagai grup, dan beberapa token
alpha/rgba kayak `Overlay`/`Shadow/Neutral`) beda konsep atau gak bisa
dibandingkan langsung (Figma-nya solid color, kode-nya rgba dengan
alpha) — kemungkinan besar itu memang disengaja beda pendekatan
render-nya, bukan bug. Gak saya masukin sebagai temuan "salah", cuma
dicatat sebagai perlu diverifikasi kalau mau strict banget.

---

## Ringkasan & rekomendasi langkah berikutnya

Ini **bukan salah kode** — ini gap dari sisi proses desain-ke-development:
Figma-nya jauh lebih "kaya" dari yang pernah diimplementasi. Ada 2 jalan:

1. **Bersihin di Figma** — hapus/gabung variable yang gak pernah dan
   kemungkinan gak akan dipakai (terutama grup `Surface/Components/*`
   yang duplikat sama `Container/*`, dan ramp primitive yang gak
   dipakai).
2. **Adopsi ke kode** — kalau grup-grup itu (Action, Link, Status/Content,
   dll) sebenarnya dibutuhkan buat komponen yang belum dibikin,
   baru diimplementasi belakangan pas komponennya dibikin.

Kombinasi keduanya paling masuk akal: yang jelas-jelas duplikat/gak
kepake (Surface/Components, ramp warna gak kepake) → dihapus. Yang
punya use-case jelas ke depan (Link, Action mungkin buat komponen baru)
→ didiamkan dulu, catat sebagai "reserved for future component".

**Update 12 Aug 2026:** Temuan #5 (value mismatch di token yang
dipakai) sudah dieksekusi — `--color-stroke-hover`, `--color-stroke-strong`,
`--color-stroke-success` dibetulin, `--color-stroke-warning`,
`--color-stroke-disabled`, `--color-container-primary-hover` ditambah.
Detail di `helix-design-system-log.md` §6.

Temuan #1-#4 (120+ variable struktural yang gak ada padanan di kode,
2 sistem surface yang tumpang tindih, naming issue di Figma) **masih
laporan, belum dieksekusi** — butuh keputusan per kategori (adopsi ke
kode vs hapus dari Figma) sebelum jalan, beda karakter sama Temuan #5
yang murni "value salah, tinggal disamain".
