# Helix Design System — Log

Durable narrative record of architecture, audits, and decisions for the Helix
Design System (Storybook + `packages/helix-design-system`, multi-brand:
Nusantics / CeKolam / Causa). Companion to
`.claude/skills/helix-design-system/SKILL.md`, which holds the distilled
ruleset. This file holds the *history* — what we found, what we decided, and
why — so nothing has to be re-derived from scratch next time.

Modeled after `origin-design-system-log.md` (Origin DS), started once Helix
had enough components in production that inconsistency started having a real
cost.

---

## §1 — 2026-08-06: Initial audit (pre-migration baseline)

First pass auditing Helix's actual architecture against the standard Origin
already follows (two-tier tokens, single-source-of-truth icons, enforced
type scale). No components were changed — audit only, findings below are the
baseline to migrate from.

### Token architecture — mostly there, adoption is the gap

`packages/helix-design-system/src/styles/theme.css` already documents a
three-layer model (Primitive → Semantic → Brand mode) and it's a genuinely
good structure: ~15 primitive color ramps, semantic tokens for text/bg/
container/stroke/input/status/shadow, and three `[data-brand]` overrides
(nusantics/cekolam/causa) that only touch the semantic layer. This is
further along than the "we have no tokens" assumption — **the model is
sound, but components don't consistently use it.**

Found via `grep -lE "#[0-9A-Fa-f]{6}" *.tsx` in
`packages/helix-design-system/src/components/`: **45 of 46 component files**
contain raw hex literals. Not all of these are violations — many are
legitimate `var(--color-x, #fallback)` CSS custom-property fallbacks (see
`Pagination.tsx:53`), which is a reasonable defensive pattern. But a real
subset bypasses the token layer outright, e.g. `IconButton.tsx`'s
`destructive` variant hardcodes `bg: '#DC2626'` and `color: '#FFFFFF'`
instead of `var(--color-destructive)` / `var(--color-text-on-primary)`,
sitting right next to sibling variants (`secondary`, `neutral`, `invert`)
that correctly reference semantic vars. Same file, same variant object,
inconsistent discipline.

**Action item:** grep-driven pass per component distinguishing legitimate
`var(x, #fallback)` fallbacks from outright hardcoded values, then rebind
the latter to existing semantic tokens. Should be a zero-visual-diff change
(swapping a literal for the token that already equals that literal) — safe
to do without designer-facing impact, screenshot-diff each component after.

### Icon system — no single source of truth (Origin's biggest structural edge)

No dedicated `Icon` component exists in
`packages/helix-design-system/src/components/`. Icons are imported directly
per-component:

- 28 files import from `lucide-react` (the de facto default)
- 3 files (`Alert.tsx`, `CardMetric.tsx`, `Dropzone.tsx`) import from
  `react-icons` subpackages instead (`react-icons/io5`, `react-icons/bs`,
  `react-icons/ri`, `react-icons/io`, `react-icons/hi`) — likely pulled in
  for exact Figma parity on specific glyphs lucide didn't have (see commit
  `d18d138`, `8c2aa27`).

This is the direct equivalent of Origin's pre-`_Icon Base` state: no
component owns "a glyph at a size in a semantic color," so size and color
are whatever each call site hardcodes inline, and there's no swap-safe
single point of glyph truth. Origin solved this with `_Icon Base` (INSTANCE_SWAP
+ Size + Type props) and `Featured icon` as the only exported wrapper.

**Action item (design + follow-up build task, not urgent):** decide whether
Helix standardizes on `lucide-react` only (likely — react-icons usage is
small and isolated to 3 files) and wrap it in an `Icon` primitive component
with `size`/`color` props bound to semantic tokens, so future components
stop importing icon libraries directly.

### Typography — in good shape

`grep` for hardcoded `fontSize`/`text-[Npx]` in components found only 2
files (`Input.tsx`, `MenuItem.tsx`) with inline pixel font sizes, both small
(10–13px, likely helper/caption text not covered by the current scale).
Everything else routes through the `--text-*` / `--line-height-*` scale
defined in `theme.css`. This is close to Origin's "always use the defined
scale" rule already — no major rework needed here, just close the two gaps
or extend the scale if 10–13px is a real recurring need.

### Component variant architecture — no `cva`, no enforced pattern

`grep -l "cva(" *.tsx` returned **zero** files — no component in Helix uses
`class-variance-authority` despite the Radix + Tailwind stack this is built
on being the standard pairing for it. Variants are hand-rolled per
component (e.g. `IconButton.tsx`'s inline variant-object pattern seen
above). This isn't wrong, but it means there's no shared convention for how
a new component should declare its variants/sizes/states — each one
reinvents the pattern, which is exactly how gaps like the `destructive`
hardcode above happen unnoticed.

**Open question for later, not blocking:** worth standardizing on `cva` (or
formalizing the current hand-rolled variant-object pattern explicitly in
the skill) so new components have one obvious way to declare variants
instead of picking whatever the last component did.

### Versioning / changelog — not yet real

`packages/helix-design-system/package.json` is still `"version": "0.0.1"`.
`src/stories/Changelog.mdx` exists in Storybook but isn't being filled per
change. No semver discipline yet distinguishing invisible token rebinds
(patch) from new components (minor) from visual/API breaks (major).

**Action item:** start versioning releases for real once the token-rebind
migration begins, so devs/designers have a visible record instead of silent
diffs.

### Summary — what's genuinely solid vs. what's the gap

Solid: the token *model* (3-layer, brand-aware, well-documented in
`theme.css` comments), the typography scale, multi-brand theming via
`[data-brand]`.

Gaps vs. Origin: (1) inconsistent token *adoption* in component code, (2)
no icon single-source-of-truth component, (3) no shared variant-declaration
convention, (4) no real versioning/changelog discipline yet.

None of these require touching what designers currently use in Figma —
they're implementation-layer (component code) and process (versioning)
issues, not token/variant/visual-API changes.

---

## §2 — 2026-10-01: `Dropdown Menu` — Trigger Size nambah XS/Medium/Large

**Catatan:** file log ini ditemukan cuma sampai §1 pas sesi ini mulai —
sections yang pernah ditulis sebelumnya (termasuk kerjaan Sidebar Item/
Badge reuse) udah gak ada di file ini saat ini, kemungkinan ke-revert di
luar sesi. Entry ini lanjut dari state file yang sebenarnya ada sekarang,
bukan dari riwayat yang hilang.

User minta `Dropdown Menu` (`3566:185019`) punya `Trigger Size` buat
xs/small/medium/large — sebelumnya cuma ada `Small`.

**Eksekusi:** 12 variant baru dibikin (clone 4 variant `Header`×`State`
yang ada × 3 size baru = total 16 variant). Tiap clone: nested `Button`
instance (`Hierarchy=Secondary, Appearance=Outline`) di-set `Size`
ke `xs`/`md`/`lg` sesuai (`XS`→`xs`, `Medium`→`md`, `Large`→`lg`).

**Masalah yang ketemu & dibenerin:** lebar trigger row gak otomatis
ngikutin ukuran Button baru — rantai auto-layout (`Popover` →
`_popover-trigger` → `Button`) dari awal di-set `FILL`/`FIXED`, bukan
`HUG`, jadi ganti `Size` doang cuma ngubah tinggi, lebar tetep nempel ke
angka lama (97, warisan dari `Small`). Diukur lebar asli tiap size pakai
instance sementara (`Button` standalone, replika exact boolean override
trigger asli: `Trailing Icon=true`, `Placeholder=true`, `Text=Account`) —
hasil: XS=72, Small=97 (cocok, validasi method bener), Medium=123,
Large=158. Lebar ini di-set manual ke `Popover` tiap variant baru
(`resize()` + `counterAxisSizingMode=FIXED`), bukan dibiarin hug — biar
match persis pola `Small` yang udah ada.

Panel dropdown (`_popover-base`, lebar 240) dikonfirmasi independen dari
lebar trigger — gak perlu ikut di-resize, sama kayak variant `Small` yang
dari awal juga udah gitu (lebar trigger 97 vs panel 240).

**Verifikasi:** screenshot perbandingan 4 size (XS/Small/Medium/Large)
side-by-side — teks "Account" + chevron icon keliatan bener di semua
size, cuma icon-nya kecil banget di skala thumbnail jadi sempet keliatan
kayak ilang; di-zoom per-variant baru keliatan ada. Deskripsi komponen
diupdate (bukan ditimpa — ditambah paragraf baru) nyatetin penambahan ini
sesuai `figma-component-build` + preferensi user buat skip baris "Code:".

**Belum dieksekusi / belum ditanya:** apakah `Trigger Size` perlu
disamain juga ke komponen lain yang punya pola Button-trigger serupa
(`Select`, kalau ada) — belum dicek, belum diminta.

---

## §3 — 2026-10-01: Gap trigger↔panel di `Popover` dibenerin ke source,
bukan di-patch per Dropdown Menu variant

User minta gap antara `_popover-base` (panel) dan `_popover-trigger`
(trigger) = 8px konsisten di semua 4 `Trigger Size` yang baru ditambah
(§2). Dicek: `Medium` gap-nya 0px, `Large` malah -8px (nutupin trigger),
cuma `Small`/`XS` yang keliatan normal secara kebetulan.

**Root cause:** `_popover-base` di-posisi `ABSOLUTE` dengan Y hardcode
(44px) di level MAIN COMPONENT `Popover` (`Trigger=Button,
Direction=Bottom`, node `6265:25902`) — bukan cuma di Dropdown Menu.
Angka 44 itu pas buat trigger tinggi 36 (`Small`) + gap 8, tapi gak ikut
nyesuain kalau trigger lain tingginya beda. Ini udah ke-dokumentasiin
sendiri di description lama (`"panel position is a static offset...
reposition manually"`), jadi bukan temuan baru, cuma belum pernah
beneran dibenerin.

**Sempet nyoba fix di level instance dulu** (override `y`,
`setRelativeTransform`, `layoutPositioning` pada `_popover-base` instance
di tiap variant Dropdown Menu) — semua GAGAL, Figma nolak dengan
"cannot be overridden in an instance" (`relative-transform` /
`stack-positioning`). Ternyata override posisi/positioning-mode buat
layer ini emang dikunci di level main component, gak bisa diubah dari
instance manapun.

**Percobaan pertama — SALAH, langsung di-revert user:** awalnya
`_popover-base` diubah dari `layoutPositioning=ABSOLUTE` ke `AUTO` di
main component `Popover` (`6265:25902`), biar ikut auto-layout
`VERTICAL`-nya yang `itemSpacing`-nya udah 8. Gap-nya emang jadi bener
(8px di semua size), TAPI ini ngelanggar desain asli yang didokumentasiin
sendiri di description lama: panel floating sengaja `ABSOLUTE` biar "gak
nge-push layout sekitarnya" pas dipakai di layar beneran (kayak dropdown
non-portal di kode). User langsung protes ("kenapa posisinya ga absolute
lagi") — benar, ini kesalahan, direvert balik ke `ABSOLUTE`.

**Fix yang bener — bikin variant per-size di `Popover`, posisi tetep
`ABSOLUTE`:** masalah sebenernya cuma 1 angka Y statis (`44`) yang
dipakai bareng buat semua ukuran trigger, padahal beda trigger butuh Y
beda. Override Y per-instance di level Dropdown Menu udah dicoba duluan
dan GAGAL — Figma nolak ("cannot be overridden in an instance:
relative-transform" / "stack-positioning"), dikonfirmasi ini emang lock
di level main component (dites juga di instance standalone yang baru
dibikin dari nol, tetep ke-block — bukan soal nested-instance-depth).

Solusi: tambah axis variant baru `Trigger Size` (Small/XS/Medium/Large)
ke `Popover` sendiri (`6265:25903`) — 10 variant lama di-rename nambahin
`, Trigger Size=Small` (default, zero perubahan visual buat consumer
existing), terus clone cuma `Trigger=Button, Direction=Bottom` jadi 3
variant baru (XS/Medium/Large), tiap satu `_popover-base`-nya di-set Y
beda (32/52/60 = tinggi trigger + 8) **sambil tetep `ABSOLUTE`** — bukan
override instance, tapi baked langsung di component yang dipilih.
Dropdown Menu's nested `Popover` instance di tiap ukuran trigger tinggal
`setProperties({'Trigger Size': ...})` milih variant yang cocok (ini
property-variant biasa, BUKAN position override, jadi gak kena lock).

Diverifikasi: gap 8px konsisten di semua 12 variant `State=Open`
Dropdown Menu, DAN `_popover-base.layoutPositioning` tetep `ABSOLUTE` di
semuanya (bukan `AUTO`) — dicek ulang eksplisit field-by-field.

**Kenapa di `Popover`, bukan di-patch per Dropdown Menu:** `Popover`
shared base component (dipakai Dropdown Menu, kemungkinan `Select`
dll) — fix satu sumber nutup bug yang sama buat semua consumer. Deskripsi
`Popover` & `Dropdown Menu` diupdate jelasin fix final (nyebut eksplisit
posisi tetep `ABSOLUTE`, bukan auto-layout).

**Pelajaran:** sebelum nganggep "pindah ke auto-layout" sebagai fix yang
valid buat masalah static-offset, cek dulu apakah `ABSOLUTE` itu
keputusan desain yang disengaja (ada di description) — kalau iya, cari
cara nutup gap TANPA ngubah positioning mode-nya, bukan ambil jalan
pintas yang keliatan "lebih simpel."

**Belum dicek:** apakah consumer lain dari `Popover` (misal `Select`)
perlu Trigger Size yang sama juga, atau udah punya workaround beda buat
masalah serupa — belum di-scan.

---

## §4 — 2026-10-01: `Dropdown Menu` — nambah `Trigger=Tag` + nemuin &
benerin bug sinkronisasi Popover di semua variant Closed

User minta nambah `Trigger=Tag` ke `Dropdown Menu` (selain `Button` yang
udah ada), sambil minta "check the popover please".

**Eksekusi Tag:** `Popover` ternyata udah punya `Trigger=Tag` sendiri
(dibangun user langsung di Figma, confirmed lewat re-inspect — axis
`Direction` juga udah direstrukturisasi jadi `State` Open/Closed,
nyamain penamaan sama `Dropdown Menu`). Tag cuma punya 3 ukuran
(Small/Medium/Large, gak ada XS — Tag emang gak punya size xs). 12
variant baru dibikin di `Dropdown Menu` (4 kombinasi Header/State × 3
size), clone dari template Button yang sepadan, nested `Popover`
instance-nya di-`setProperties({Trigger:'Tag', 'Trigger Size': size})`.

**Bug ketemu pas "check the popover":** instance `Popover` di SEMUA
variant `State=Closed` (termasuk yang Button, bukan cuma Tag baru)
ternyata mainComponent-nya nyangkut di `State=Open, Trigger Size=Small`
— gak match nama variant-nya sendiri sama sekali. Root cause: waktu
`Popover`-nya direstrukturisasi dari axis `Direction` (Bottom/None) ke
`State` (Open/Closed) di luar sesi ini, Figma re-map instance lama ke
variant "terdekat" yang gak akurat. Ditambah lagi — bug dari sesi
sebelumnya sendiri (pas nambahin Trigger Size XS/Medium/Large ke
Dropdown Menu): nested Popover-nya CUMA dibenerin buat baris `State=Open`
(buat gap-fix kemarin), 3 baris `State=Closed` (XS/Medium/Large) kelewat
— tetep nyangkut di `Trigger Size=Small`. Gak ketauan secara visual
karena ukuran Button yang keliatan datang dari override instance Button
sendiri yang lebih dalam, independen dari property `Popover`-nya — tapi
metadata-nya salah, bakal nyasarin kalau nanti ada yang baca lewat Dev
Mode atau pas Closed di-toggle ke Open.

**Fix:** satu pass nyeluruh ke SEMUA 28 variant (16 Button + 12 Tag baru)
— tiap variant, baca `Trigger`/`State`/`Trigger Size` dari namanya
sendiri, `setProperties` ketiganya sekaligus ke nested `Popover`
instance. Diverifikasi 0 mismatch (`popover.mainComponent.name` persis
sama kayak nama yang di-derive dari variant name Dropdown Menu itu
sendiri, di semua 28).

**Verifikasi visual:** screenshot Tag trigger Open (Large) — gap 8px
bener, panel floating normal; screenshot 3 ukuran Tag Closed
(Small/Medium/Large) — ukuran beda jelas, teks "Label" kebaca di semua
size. Deskripsi `Dropdown Menu` diupdate jelasin penambahan Tag + bug
sinkronisasi yang dibenerin.

**Pelajaran:** kalau user minta "check X" pas ngerjain hal lain yang
nyentuh X, jangan anggap itu basa-basi — treat sebagai sinyal buat
beneran audit, bukan cuma ngerjain fitur baru terus bilang "udah dicek."
Nemuin bug beneran kali ini karena diambil serius.

---

## §5 — 2026-10-05: `Progress Circle` — `Label` dikonversi jadi `SLOT`,
biar bisa diisi icon/Icon Tile/konten apapun

User minta konten tengah `Progress Circle` (`3397:585`, saat ini
Caption+Value text doang pas `Label=True`) dibikin jadi `SLOT`, bukan
dikunci ke text — biar bisa diisi icon, Icon Tile, atau konten apa aja
per instance.

**Pendekatan yang disepakati:** hybrid default — `Label` jadi `SLOT`
asli, tapi default content-nya tetep Caption+Value text yang sekarang
(biar instance yang udah ada gak berubah visual), swappable per instance
ke konten lain.

**Audit sebelum eksekusi:** usage scan semua halaman — cuma 6 instance
live, semua di halaman Dropzone (2 di `Dropzone`, 4 di `Dropzone ❌`).
Low blast radius, aman dieksekusi.

**Eksekusi (ngikutin prosedur hard-won dari skill `figma-component-
build`, karena bikin 1 shared slot property lintas banyak variant punya
beberapa failure mode yang udah terdokumentasi):**
1. 10 variant `Label=True` (8 Size×Thickness normal + 2 XXS) masing-
   masing dikasih `createSlot()` sendiri-sendiri dulu (otomatis dapet key
   terpisah per variant, sesuai dokumentasi — belum ke-merge).
2. Konten lama (frame `Label` berisi Caption+Value buat 8 variant normal;
   lone text `Value` buat 2 XXS) dipindah jadi default content di dalam
   slot masing-masing, bukan dihapus.
3. Full recombine — 20 variant (termasuk 10 `Label=False` yang gak
   disentuh) di-`combineAsVariants` ulang jadi SATU set baru
   (`7183:893`). Ini langkah yang nyatuin 10 key slot terpisah jadi SATU
   property `Label#7183:212` yang sama-sama dipakai semua variant
   `Label=True`.

**2 bug yang persis sesuai prediksi skill, kejadian beneran:**
- Nama variant ke-corrupt abis recombine (`Property=Value` jadi cuma
  `=Value`, prefix nama property-nya ilang). Dibenerin manual pakai
  snapshot nama+posisi yang udah di-capture SEBELUM recombine dijalanin
  (precaution yang emang disiapin duluan justru kepake).
- `componentPropertyDefinitions` sempet throw "Component set has
  existing errors" abis recombine — ilang sendiri setelah nama variant
  dibenerin (root cause-nya emang nama yang corrupt, bukan struktur
  lain yang rusak).

**Bug baru yang belum terdokumentasi di skill, ditemuin sesi ini:** 2
variant XXS kehilangan binding property `Value` (text "40%"-nya) abis
masuk ke dalam slot — beda dari 8 variant lain yang binding-nya tetep
hidup. Coba 3 pendekatan buat benerin:
1. Set `componentPropertyReferences` langsung di node yang udah di
   dalam slot → error "Cannot set component property references on
   slot sublayer".
2. Keluarin dulu dari slot, bind di luar, masukin lagi →
   binding sukses pas di luar, tapi ke-reset jadi `{}` begitu
   `slot.appendChild()` dipanggil lagi.
3. Bungkus text dalam frame wrapper (niru pola 8 variant yang
   berhasil), bind SEBELUM wrapper dimasukin ke slot sama sekali →
   tetep ke-reset abis `slot.appendChild(wrapper)`.

Berhenti di percobaan ke-3 sesuai batas yang digariskan skill ("kalau
udah 2-3 percobaan gagal berturut-turut, stop, jangan terus coba sambil
nulis script baru"). **Hasil akhir:** slot-nya sendiri berfungsi penuh
di kedua variant XXS (bisa diisi konten lain kayak variant lainnya),
cuma default content-nya ("40%") sekarang static text biasa, gak lagi
nyambung ke property `Value` yang bisa diedit lewat panel instance —
beda dari 8 variant lain yang defaultnya tetep live-bound.

**Verifikasi:**
- `componentPropertyDefinitions` final: `Value#7183:210`,
  `Supporting Text#7183:211` (TEXT), `Label#7183:212` (SLOT) — cuma 1
  SLOT, bukan 10, dikonfirmasi lewat scan tiap variant
  (`findAllWithCriteria({types:['SLOT']})` → 1 di tiap 10 variant
  `Label=True`, 0 di tiap 10 `Label=False`, semua nunjuk ke key yang
  sama).
- 8 dari 10 variant `Value`/`Supporting Text` masih live-bound
  (dikonfirmasi per-node), 2 XXS gak (lihat di atas).
- Screenshot full set (20 variant) — visual sama persis kayak sebelum
  diubah, gak ada regresi.
- 4 live instance Dropzone (semuanya pakai variant XXS yang kena gap
  binding) dicek — `mainComponent` masih nyambung bener ke set baru,
  screenshot salah satu instance live nunjukkin ring + layout masih
  normal.
- Deskripsi component set diupdate (ditambah paragraf baru, bukan
  ditimpa) jelasin `Label=True` sekarang SLOT + default content-nya.

**Belum dieksekusi:** fix binding `Value` buat 2 variant XXS (butuh
pendekatan lain yang belum ketemu, atau terima sebagai keterbatasan
ukuran XXS yang emang beda struktur dari size lain sejak awal). Belum
dicoba juga apakah bug ini ada preseden di komponen slot lain di file
ini — belum di-scan.
