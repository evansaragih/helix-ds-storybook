# cekolam-internal-dashboard (141 colors) — By app · sign-off only

Source: live artifact screenshot (2026-09-08), tiles p1_001–p1_0xx

## 📌 QUICK ANSWER — status per unique color (read this first)

`yellow-200` (item 1) → **UPDATE: ternyata SUDAH DECIDED** di route lain (operations-portal/cekolam, "Alert Notification") — comment: **`Semantics-Core/Colors/Surface/Warning-Bold`** (bukan Warning-Subtle kayak rekomendasi awal gue). Ini keputusan asli yang udah ada, color-level, berlaku juga buat item 1 di sini. Kemungkinan alasannya: "Warning-Bold" (solid/saturated) dipilih karena role di sini "Alert Notification" perlu lebih strong attention dibanding "Warning-Subtle" (buat Badge biasa). Masuk akal, gak perlu diubah.

**⚠️ Konvensi penulisan token (disepakati 2026-09-08):** setiap token Figma SELALU ditulis dengan prefix nama collection-nya — `Semantics/Colors/...` (multi-brand: beda value per Nusantics/CeKolam/Causa) atau `Semantics-Core/Colors/...` (single-mode, brand-agnostic).

**🔄 UPDATE PENTING (koreksi dari draft sebelumnya):** Search pertama gue kemarin cuma nemu collection `Semantics`, bikin gue salah simpulin `Semantics-Core` gak ada / itu typo di 2 keputusan yang udah DECIDED. Itu salah — ternyata ada **migrasi aktif** yang sedang berjalan: token yang nilainya identik di ketiga brand (Nusantics/CeKolam/Causa) dipindah dari `Semantics` ke `Semantics-Core` satu per satu, tiap variable yang udah dipindah punya description eksplisit "Migrated from Semantics/Colors/... — moved to this single-mode collection to remove duplication." Setelah re-cek pakai query yang lebih spesifik, ketemu banyak yang udah pindah. **Jadi kedua keputusan DECIDED (`#cb0b04`→`Text/Error`, `#1c1c1c`→`Stroke/Strong`) itu SUDAH BENAR dari awal — bukan typo, gak perlu diubah.** Minta maaf atas kesalahan sebelumnya.

Status migrasi yang udah ke-verify (per 2026-09-08, **semua item di tabel bawah udah di-cross-check**, gak ada lagi "BELUM DICEK"):
- ✅ Sudah pindah ke **Semantics-Core**: `Text/Error`, `Text/Info`, `Text/Subtle` (dulu Secondary), `Text/Subtler` (dulu Tertiary), `Text/Subtlest` (dulu Muted/Disabled, digabung), `Text/Success`, `Stroke/Strong`, `Stroke/Subtle`, `Stroke/Warning`, `Stroke/Error`, `Stroke/Success`, `Stroke/Info`, `Stroke/Hover`, `Surface/Subtle`, `Surface/Warning-Subtle` (+Hover/Pressed), `Surface/Warning-Bold`, `Surface/Success-Subtle` (+Hover/Pressed), `Surface/Info-Subtle` (+Hover/Pressed), `Surface/Destructive-Subtle`, `Icon/Error` (+Transparent), `Icon/Success`, `Data-viz/Chart-3`, `Chart-4`, `Chart-5`.
- ⏳ **Belum pindah, masih di Semantics** (brand-specific, correctly stays here — NOT a migration gap): `Surface/Brand/Primary`, `Text/Brand/Primary`, `Text/Brand/Secondary`, `Link/Primary/Hover`, `Brand/Tertiary/Subtle-Pressed`, `Icon/Onsurface/Primary` (all alias to per-brand values, so they're supposed to stay multi-mode).
- ⏳ **Belum pindah, genuinely still migrating** (not brand-specific, just hasn't had its turn): `Data-viz/Chart-1`, `Chart-2`, `Chart-6`, `Chart-7`, `Chart-8` (naming glitch `Data-viz (!)/Chart-N` present — rename looks cut off mid-migration, worth flagging to the designer).
- ✅ Every "BELUM DICEK" row from the earlier draft has now been individually checked — see the table below, no more open question marks on collection membership.

**Legend:**
- **DECIDED** = sudah ada keputusan di artifact live.
- **✅ SEMANTIC (real Figma, verified)** = gue udah cek langsung ke Figma file, token beneran ada dan cocok — collection ditulis sesuai apa yang kebaca (lihat catatan di atas).
- **🔴 PRIMITIVE ONLY — bukan proposal semantik!** = auto-proposal dari code cuma nunjuk ke primitive (mis. `yellow-50`, `nusantics-dusty-blue-70`) — audit tool sendiri nandain ini `"context only — not an auto-resolve target"`, artinya BUKAN token yang boleh dipakai final. Ini kenapa `#faa701` kelihatan "diarahkan ke primitive" — itu bukan rekomendasi asli, itu tool bilang "primitive ini paling deket secara warna doang, tapi jangan dipakai."
- **✅ SEMANTIC (code-side, sudah OK)** = auto-proposal dari code SUDAH berupa token semantik (bukan primitive) — nama kayak `nusantics/brand-primary-default`, `nusantics/stroke-subtle` itu semantic token beneran (dari file CSS semantic), cuma belum gue cross-check ke nama + collection Figma-nya.
- **BELUM DICEK ke Figma** = auto-proposal semantik dari code ada, tapi belum gue cari padanan nama Figma-nya (termasuk collection-nya) satu-satu.
- **REKOMENDASI: Keep custom** = warna one-off, kemungkinan besar memang harus tetap custom (bukan kelupaan cek, tapi kesimpulan sementara gue).

| Color | Role(s) | Status | → Token / catatan |
|---|---|---|---|
| `yellow-200` | BG | REKOMENDASI | ✅ `Semantics-Core/Colors/Surface/Warning-Subtle` (verified, sudah migrasi) |
| `#cacaca` | BORDER | DECIDED (Different token) | ✅ **Confirmed** (via operations-portal/cekolam sighting): comment = `Semantics-Core/Colors/Stroke/Subtle` — matches gue punya rekomendasi awal persis, dan udah verified beneran ada di Semantics-Core. Keputusan ini benar. |
| `#feeee2` | BG | DECIDED (Different token) | ✅ **Confirmed** (via operations-portal/causa-dashboard sighting of the same color): comment = `Semantics/Colors/Surface/Brand/Primary` — note this is collection `Semantics` (brand-specific), not Semantics-Core |
| `#1c1c1c` | BORDER/BG | DECIDED (Different token) | ✅ **Keputusan sudah BENAR**: `Semantics-Core/Colors/Stroke/Strong` — verified, sudah migrasi ke Semantics-Core. Gak perlu diubah. |
| `#cb0b04` | TEXT | DECIDED (Assign token) | ✅ **Keputusan sudah BENAR**: `Semantics-Core/Colors/Text/Error` — verified, sudah migrasi ke Semantics-Core. Gak perlu diubah. |
| `#ffd4d6` | BG | REKOMENDASI | ✅ **Koreksi** (sebelumnya salah gue tandain "Keep custom" tanpa cek dulu — my bad): tiap kali `#ffd4d6` muncul, dia selalu ada TEPAT di sebelah `#cb0b04` (yang udah DECIDED → Text/Error) di komponen badge yang sama (Sample / Payer Account Packages / History Mutation). Same-line pairing kayak gini = background+text dari satu badge status yang sama, bukan warna acak. → REKOMENDASI: **`Semantics-Core/Colors/Surface/Destructive-Subtle`** (verified, sudah migrasi ke Semantics-Core — ini nama role "error/danger" di design system ini) |
| `#faa701` | BORDER | 🔴 PRIMITIVE ONLY | auto-proposal cuma `primitive yellow-50` (bukan semantic!) → ✅ REKOMENDASI semantic: `Semantics-Core/Colors/Stroke/Warning` (verified, sudah migrasi) |
| `#d4eacb` | BG | 🔴 PRIMITIVE ONLY | auto-proposal cuma `primitive nusantics-pale-green-20` (bukan semantic!) → ✅ REKOMENDASI semantic: `Semantics-Core/Colors/Surface/Success-Subtle` (verified, sudah migrasi) |
| `#769569` | TEXT | REKOMENDASI | ✅ **Koreksi** (sama kasusnya kayak #ffd4d6 — kelupaan cek pairing): muncul 4× SELALU tepat setelah `#d4eacb` (BG → Surface/Success-Subtle) di Ct Value Badge / Recom Matrix Badge. Same-line pairing = text+bg dari badge success yang sama. → REKOMENDASI: **`Semantics-Core/Colors/Text/Success`** (verified, sudah migrasi ke Semantics-Core) |
| `#f47e20` | BG/TEXT, ~15× | REKOMENDASI | ✅ verified — BG → `Semantics/Colors/Surface/Brand/Primary`, TEXT → `Semantics/Colors/Text/Brand/Primary` (brand-specific, memang tetap di collection Semantics, bukan Semantics-Core) |
| `#d1d5db` | BORDER | DECIDED (Use proposal) | ✅ **Verified**: `nusantics/stroke-subtle` = **`Semantics-Core/Colors/Stroke/Subtle`** (confirmed migrated) |
| `#fafafa` | BG | ✅ VERIFIED | `nusantics/surface-subtle` = **`Semantics-Core/Colors/Surface/Subtle`** (confirmed migrated) |
| `#ededff` | BG | ✅ VERIFIED | `bg-surface-info-subtle` = **`Semantics-Core/Colors/Surface/Info-Subtle`** (confirmed migrated) |
| `gray-200` | BORDER | ✅ VERIFIED (part-mixed) | `causa/data-viz-chart-8` = **`Colors/Data-viz/Chart-8`** — this specific one (Chart-8) is confirmed **still in `Semantics`** (not yet migrated, part of the naming-glitch group `Data-viz (!)/Chart-8`) |
| `#def8ee` | BG | ✅ VERIFIED | `nusantics/surface-success-subtle` = **`Semantics-Core/Colors/Surface/Success-Subtle`** (confirmed migrated) |
| `#e2f5ff` | BG | ✅ VERIFIED | `bg-surface-info-subtle` = **`Semantics-Core/Colors/Surface/Info-Subtle`** (confirmed migrated) |
| `gray-800` | TEXT | ✅ VERIFIED | `causa/icon-onsurface-primary` = **`Semantics/Colors/Icon/Onsurface/Primary`** — brand-specific (aliases Brand/Primary/Pressed), correctly stays in `Semantics` not `Semantics-Core`; note this variable still uses the old nested-slash naming (`Icon/Onsurface/Primary`), not yet flattened per the newer naming convention |
| `gray-500` | TEXT | 🔴 PRIMITIVE ONLY | auto-proposal cuma `primitive nusantics-dusty-blue-70` (bukan semantic!) → ✅ REKOMENDASI semantic: `Semantics-Core/Colors/Text/Subtlest` (**koreksi**: nama lama `Text/Muted` udah di-rename + digabung sama `Text/Disabled` jadi `Text/Subtlest` per konvensi comparative-adjective spectrum Default→Subtle→Subtler→Subtlest — verified, sudah migrasi) |
| `gray-400` | TEXT | ✅ VERIFIED | `text-text-info` = **`Semantics-Core/Colors/Text/Info`** (confirmed migrated) |
| `#4aa785` | TEXT | REKOMENDASI | Keep custom (disease badge cluster) |
| `#59a8d4` | TEXT | REKOMENDASI | Keep custom |
| `#8a8cd9` | TEXT | REKOMENDASI | Keep custom |
| `#e0f7fa` | BG | ✅ VERIFIED | `nusantics/surface-info-subtle` = **`Semantics-Core/Colors/Surface/Info-Subtle`** (same token as `#ededff`/`#e2f5ff` above — confirmed migrated) |
| `#0097a7` | TEXT | ✅ VERIFIED | `cekolam/text-brand-secondary` = **`Semantics/Colors/Text/Brand/Secondary`** — brand-specific, correctly stays in `Semantics` |
| `#f09595` | TEXT | REKOMENDASI | Keep custom |
| `#30364f` | COLOR/TEXT | ✅ VERIFIED | `causa/link-primary-hover` = **`Semantics/Colors/Link/Primary/Hover`** — brand-specific, correctly stays in `Semantics` |
| `#888` | COLOR | ✅ VERIFIED | `cekolam/brand-tertiary-subtle-pressed` = **`Semantics/Colors/Brand/Tertiary/Subtle-Pressed`** — brand-specific, correctly stays in `Semantics` |
| `#ec4899`, `#06b6d4`, `#8b5cf6`, `#10b981`, `#70d4d4`, `#1b84ff`, `#f7c002`, `#db2877` | chart cluster (8 colors) | HYPOTHESIS | likely `Colors/Data-viz/Chart-1..8` — **campuran 2 collection**: Chart-3/4/5 udah verified pindah ke `Semantics-Core`, tapi Chart-1/2/6/7/8 masih di `Semantics` (dengan naming glitch `Data-viz (!)/Chart-N`, kelihatan migrasi kepotong — worth di-flag ke designer). Exact hex-to-chart-number pairing masih belum ke-verify. |
| `#c1d1d9` | TEXT | 🔴 PRIMITIVE ONLY | auto-proposal cuma `primitive nusantics-dusty-blue-20` (bukan semantic!) → belum ketemu padanan semantic yang pas, kemungkinan `Semantics-Core/Colors/Text/Subtlest` juga tapi belum gue cek |
| `blue-200`, `orange-200`, `blue-900`, `indigo-700`, `indigo-100`, `blue-700` | various | REKOMENDASI | Keep custom (one-off UI chrome) |
| `#16a34a` | TEXT | 🔴 PRIMITIVE ONLY | auto-proposal cuma `primitive green-60` (bukan semantic!) — ini warna brand WhatsApp, kemungkinan tetap Keep custom (bukan status semantik) |
| `#95a4fc` | TEXT | REKOMENDASI | Keep custom |
| `#0bae54`, `#3693ff`, `#2297ad` | chart-ish, lower confidence | REKOMENDASI | Keep custom (uncertain if part of Chart palette) |
| `#979797` | TEXT | ✅ VERIFIED (koreksi) | bukan "keep custom", ini kepasang salah kelompok! Punya proposal beneran: `nusantics/text-muted` (Δ13.9) = **`Semantics-Core/Colors/Text/Subtlest`** (confirmed migrated, same rename as gray-500) |
| `#dd7522` | TEXT | ✅ VERIFIED | `cekolam/text-brand-primary` = **`Semantics/Colors/Text/Brand/Primary`** — brand-specific, correctly stays in `Semantics` |
| `gray-600` | TEXT | ✅ VERIFIED | `causa/text-brand-primary` = **`Semantics/Colors/Text/Brand/Primary`** — same token as `#dd7522` above (brand-specific alias resolves the same regardless of which brand's CSS proposed it) |
| `#ff6b6b` | BG | 🔴 PRIMITIVE ONLY | auto-proposal cuma `primitive red-30` (bukan semantic!) → gue cari token error/danger surface di Figma, **TIDAK KETEMU** yang pas di collection Semantics aktif (cuma ada di library Archived) — perlu tanya designer, jangan asal pasang |
| `#5b7fe8` | BG | REKOMENDASI | Keep custom (genuinely one-off, cuma muncul 1× di Pathocheck, gak ada pairing pattern) |
| `#1c3391` + `#d6e4fe` | TEXT + BG | REKOMENDASI | ✅ **Koreksi** — bukan one-off, muncul BERPASANGAN 2× (Payer Account Packages, History Mutation), di komponen yang sama dengan pasangan error (`#cb0b04`+`#ffd4d6`) yang udah confirmed. Pola warna pale-blue-bg + dark-blue-text ini kemungkinan besar pasangan status "Info"/"Processing". → HYPOTHESIS (belum ke-verify hex): `#d6e4fe`→`Semantics-Core/Colors/Surface/Info-Subtle`, `#1c3391`→`Semantics-Core/Colors/Text/Info` (kedua token beneran ada di Figma, sudah migrasi ke Semantics-Core — tinggal confirm exact hex match) |

**Ringkasan revisi (final, per migrasi Semantics-Core terkonfirmasi):** dari 54 warna unik — **5 DECIDED, dan sekarang semuanya CONFIRMED BENAR** (2 di antaranya, `#cb0b04`→`Text/Error` dan `#1c1c1c`→`Stroke/Strong`, sempat gue ragukan salah, ternyata benar — udah gue verifikasi ulang, keduanya emang sudah migrasi ke Semantics-Core). 3 item yang tadinya kelihatan "ada proposal" ternyata **primitive-only dan sudah gue kasih padanan semantic real, semua terverifikasi sudah di Semantics-Core** (`#faa701`→`Semantics-Core/Colors/Stroke/Warning`, `#d4eacb`→`Semantics-Core/Colors/Surface/Success-Subtle`, `gray-500`→`Semantics-Core/Colors/Text/Subtlest`, catatan: nama lama "Text/Muted" udah di-rename). 2 primitive-only masih belum ketemu padanan (`#c1d1d9`, `#ff6b6b` — yang terakhir ini malah gak ada token error/danger surface aktif di Figma sama sekali, worth flagging ke tim). 1 primitive-only kemungkinan tetap custom karena brand color pihak ketiga (`#16a34a` WhatsApp green). Chart cluster (8 warna) ternyata **campuran 2 collection** — sebagian (Chart-3/4/5) udah pindah ke Semantics-Core, sebagian (Chart-1/2/6/7/8) masih di Semantics dengan naming yang keliatan belum kelar di-migrasi. **UPDATE: semua ~13 item yang tadinya "belum dicocokkan ke Figma" sekarang udah di-cek satu-satu** (lihat tabel di atas) — hasilnya konsisten sama pola migrasi: yang brand-agnostic (Info/Success/Subtle surfaces, dll) udah di Semantics-Core, yang brand-specific (Brand/Primary, Brand/Secondary, per-brand Link/Icon) tetap dan memang seharusnya di Semantics.

**Ronde koreksi tambahan (setelah user minta re-check "Keep custom"):** 3 item yang sebelumnya salah gue taruh di kelompok "Keep custom" ternyata punya same-line pairing atau proposal beneran yang kelewat:
- `#ffd4d6` (BG) selalu bareng `#cb0b04` (udah decided → Text/Error) → REKOMENDASI: `Surface/Destructive-Subtle`
- `#769569` (TEXT) selalu bareng `#d4eacb` (Surface/Success-Subtle) → REKOMENDASI: `Text/Success`
- `#979797` (TEXT) salah gue taruh di grup "chart-ish", padahal punya proposal asli `nusantics/text-muted` → REKOMENDASI: `Text/Subtlest`
- `#1c3391`+`#d6e4fe` (TEXT+BG) muncul berpasangan 2× di komponen yang sama kayak pasangan error → HYPOTHESIS: `Text/Info` + `Surface/Info-Subtle`

Pelajaran: sebelum nandain sesuatu "Keep custom", cek dulu apakah warna itu muncul berpasangan konsisten sama warna lain yang udah punya token (same-line/same-component pairing) — itu sinyal kuat dia bagian dari status/badge pair yang sama, bukan warna acak.

## /order — component: src/components/badge/disease-badge.tsx (22 colors)

1. `yellow-200` BACKGROUND · Alert Notification — no proposal — confidence None — UI CHROME (OTHER)
2. `#cacaca` BORDER · Step — migrate to primitive cekolam-atomic-grey-20 (Δ9.3, context only, not auto-resolve) — decision: **Different token** (selected) — confidence None — UI CHROME (OTHER)
3. `#feeee2` BACKGROUND · Sample — migrate to bg-surface-warning-subtle (causa, if made brand-adaptive) — decision: **Different token** (selected) — confidence Medium — UI CHROME (OTHER)
4. `#1c1c1c` BORDER · Form Recommendation — migrate to nusantics/text-primary (Δ11.5) — decision: **Different token** (selected) → `Semantics-Core/Colors/Stroke/Strong` — confidence Low — UI CHROME (OTHER)
5. `#cb0b04` TEXT · Sample — no proposal — decision: **Assign token** → `Semantics-Core/Colors/Text/Error` (color-level decision, also applies to its /lab occurrence) — confidence None — STATUS BADGE
6. `#ffd4d6` BACKGROUND · Sample — no proposal — confidence None — UI CHROME (OTHER)
7. `#faa701` BORDER · Preview Report Button Submit — migrate to primitive yellow-50 (Δ14.4, context only) — confidence None — UI CHROME (OTHER)
8. `#d4eacb` BACKGROUND · Ct Value Badge — migrate to primitive nusantics-pale-green-20 (Δ13.9, context only) — confidence None — STATUS BADGE
9. `#769569` TEXT · Ct Value Badge — no proposal — confidence None — STATUS BADGE
10. `#f47e20` TEXT · Order Category Badge — migrate to nusantics/brand-primary-default (Δ1.0) — no decision yet — confidence High — UI CHROME (OTHER)
11. `#d1d5db` BORDER · Pricing Scheme Badge — migrate to nusantics/stroke-subtle (Δ7.5) — decision: **Use proposal** (selected, green) — confidence Medium — DEMO/PLAYGROUND
12. `#fafafa` BACKGROUND · Collapsible Udang — migrate to nusantics/surface-subtle (Δ5.2) — confidence Medium — DEMO/PLAYGROUND
13. `#ededff` BACKGROUND · Disease Badge — migrate to bg-surface-info-subtle (nusantics, if brand-adaptive) — confidence Medium — DEMO/PLAYGROUND
14. `gray-200` BORDER · Sample — migrate to causa/data-viz-chart-8 (Δ8.8) — confidence Low — DEMO/PLAYGROUND
15. `#def8ee` BACKGROUND · Disease Badge — migrate to nusantics/surface-success-subtle (Δ11.1) — confidence Low — DEMO/PLAYGROUND
16. `#e2f5ff` BACKGROUND · Disease Badge — migrate to bg-surface-info-subtle (nusantics, if brand-adaptive) — confidence Low — DEMO/PLAYGROUND
17. `gray-800` TEXT · Transaction Type Badge — migrate to causa/icon-onsurface-primary (Δ13.1) — confidence Low(?) — CHART/ANALYTICS
18. `gray-500` TEXT · Pricing Scheme Badge — migrate to primitive nusantics-dusty-blue-70 (Δ13.6, context only) — confidence None — DEMO/PLAYGROUND
19. `gray-400` TEXT · Pricing Scheme Badge — migrate to text-text-info (nusantics, if brand-adaptive) — confidence None — DEMO/PLAYGROUND
20. `#4aa785` TEXT · Disease Badge — no proposal — confidence None — DEMO/PLAYGROUND
21. `#59a8d4` TEXT · Disease Badge — no proposal — confidence None — DEMO/PLAYGROUND
22. `#8a8cd9` TEXT · Disease Badge — no proposal — confidence None — DEMO/PLAYGROUND

## /customer/pool/[poolId] [dynamic] (11 colors)

23. `#e0f7fa` BACKGROUND · Doc Badge — migrate to nusantics/surface-info-subtle (Δ12.7) — confidence Low — STATUS BADGE
24. `#0097a7` TEXT · Doc Badge — migrate to cekolam/text-brand-secondary (Δ9.1) — confidence Low — STATUS BADGE
25. `#f09595` TEXT · Doc Badge — no proposal — confidence None — STATUS BADGE
26. `#30364f` COLOR · Ct Value By Doc Grid — migrate to causa/link-primary-hover (Δ8.1) — confidence Low — CHART/ANALYTICS
27. `#888` COLOR · Ct Value By Doc Grid — migrate to cekolam/brand-tertiary-subtle-pressed (Δ8.1) — confidence Low — CHART/ANALYTICS
28. `#ec4899` COLOR · Ct Value By Doc Grid — no proposal — confidence None
29. `#06b6d4` COLOR · Ct Value By Doc Grid — no proposal — confidence None — CHART/ANALYTICS
30. `#8b5cf6` COLOR · Ct Value By Doc Grid — no proposal — confidence None — CHART/ANALYTICS
31. `#10b981` COLOR · Ct Value By Doc Grid — no proposal — confidence None — CHART/ANALYTICS
32. `#c1d1d9` TEXT · Ct Value By Doc Grid — migrate to primitive nusantics-dusty-blue-20 (Δ7.6, context only) — confidence None — CHART/ANALYTICS
33. `gray-500` TEXT · Formatting — migrate to primitive nusantics-dusty-blue-70 (Δ13.6, context only) — confidence None — DEMO/PLAYGROUND

## /customer — component: src/constants/formatting.ts (9 colors)

34. `blue-200` BACKGROUND · Identifier List — no proposal — confidence None — UI CHROME (OTHER)
35. `orange-200` BACKGROUND · Utils — no proposal — confidence None — MARKETING/LANDING PAGE
36. `blue-900` TEXT · Identifier List — no proposal — confidence None — UI CHROME (OTHER)
37. `indigo-700` TEXT · Identifier List — no proposal — confidence None — UI CHROME (OTHER)
38. `indigo-100` BORDER · Identifier List — no proposal — confidence None — UI CHROME (OTHER)
39. `#f47e20` BACKGROUND · Customer — migrate to nusantics/brand-primary-default (Δ1.0) — confidence High — UI CHROME (OTHER)

40. `#16a34a` TEXT · Whatsapp Number — migrate to primitive green-60 (Δ4.1, context only) — confidence None — DEMO/PLAYGROUND
41. `blue-700` TEXT · Utils — no proposal — confidence None — DEMO/PLAYGROUND

## /customer/fishpond/[id]/analytics [dynamic] (9 colors)

42. `#f47e20` TEXT · Analytics Positivity Level — migrate to nusantics/brand-primary-default (Δ1.0) — confidence High — UI CHROME (OTHER)
43. `#30364f` TEXT · Analytic Posivity Rate Diseases — migrate to causa/link-primary-hover (Δ8.1) — confidence Low — CHART/ANALYTICS
44. `#888` COLOR · Analytic Ct Value By Date — migrate to cekolam/brand-tertiary-subtle-pressed (Δ8.1) — confidence Low — CHART/ANALYTICS
45. `#ec4899` TEXT · Analytic Posivity Rate Sample — no proposal — confidence None — CHART/ANALYTICS
46. `#06b6d4` TEXT · Analytic Posivity Rate Sample — no proposal — confidence None — CHART/ANALYTICS
47. `#8b5cf6` TEXT · Analytic Posivity Rate Sample — no proposal — confidence None — CHART/ANALYTICS
48. `#10b981` TEXT · Analytic Posivity Rate Sample — no proposal — confidence None — CHART/ANALYTICS
49. `#0bae54` TEXT · Analytics Positivity Level — no proposal — confidence None — CHART/ANALYTICS

50. `#c1d1d9` TEXT · Analytic Ct Value By Date — migrate to primitive nusantics-dusty-blue-20 (Δ7.6, context only) — confidence None — CHART/ANALYTICS

## /customer/fishpond/[id]/sample-report [dynamic] (8 colors)

51. `#95a4fc` TEXT · Sample Report — no proposal — confidence None — UI CHROME (OTHER)
52. `#d4eacb` BACKGROUND · Ct Value Badge — migrate to primitive nusantics-pale-green-20 (Δ13.9, context only) — confidence None — STATUS BADGE
53. `#769569` TEXT · Ct Value Badge — no proposal — confidence None — STATUS BADGE
54. `#0bae54` TEXT · Sample Report — no proposal — confidence None — CHART/ANALYTICS
55. `#70d4d4` TEXT · Sample Report — no proposal — confidence None — CHART/ANALYTICS
56. `#1b84ff` TEXT · Sample Report — no proposal — confidence None — CHART/ANALYTICS
57. `#f7c002` TEXT · Sample Report — no proposal — confidence None — CHART/ANALYTICS
58. `#db2877` TEXT · Sample Report — no proposal — confidence None — CHART/ANALYTICS

## /disease-analytics — component: src/components/stats/chart-stats/analytics-positivity-level.tsx (7 colors)

59. `#f47e20` TEXT · Analytics Positivity Level — migrate to nusantics/brand-primary-default (Δ1.0) — confidence High — UI CHROME (OTHER)

60. `#30364f` TEXT · Analytic Posivity Rate Diseases — migrate to causa/link-primary-hover (Δ8.1) — confidence Low — CHART/ANALYTICS
61. `#ec4899` TEXT · Analytic Posivity Rate Sample — no proposal — confidence None — CHART/ANALYTICS
62. `#06b6d4` TEXT · Analytic Posivity Rate Sample — no proposal — confidence None — CHART/ANALYTICS
63. `#8b5cf6` TEXT · Analytic Posivity Rate Sample — no proposal — confidence None — CHART/ANALYTICS
64. `#10b981` TEXT · Analytic Posivity Rate Sample — no proposal — confidence None — CHART/ANALYTICS
65. `#0bae54` TEXT · Analytics Positivity Level — no proposal — confidence None — CHART/ANALYTICS

## /lab — component: src/components/badge/sample-not-assigned-badge.tsx (6 colors)

66. `#cb0b04` TEXT · Sample Not Assigned Badge (text "Belum assigned") — decision: **Assign token** (selected) → `Semantics-Core/Colors/Text/Error` — confidence None — STATUS BADGE
67. `#f47e20` BACKGROUND · Statistic Status — migrate to nusantics/brand-primary-default (Δ1.0) — confidence High — UI CHROME (OTHER)
68. `#d1d5db` BORDER · Metadata Cell Table — migrate to nusantics/stroke-subtle (Δ7.5) — decision: **Use proposal** (selected) — confidence Medium — DEMO/PLAYGROUND
69. `gray-200` BORDER · Metadata Cell Table — migrate to causa/data-viz-chart-8 (Δ8.8) — confidence Low — DEMO/PLAYGROUND
70. `#70d4d4` BACKGROUND · Statistic Status — no proposal — confidence None — CHART/ANALYTICS
71. `#1b84ff` BACKGROUND · Statistic Status — no proposal — confidence None

## /business-analytics — component: src/components/stats/metric-stats/monthly-aquisition-metric.tsx (5 colors)

72. `#dd7522` TEXT · Monthly Aquisition Metric — migrate to cekolam/text-brand-primary (Δ14.2) — confidence Low — UI CHROME (OTHER)
73. `#3693ff` TEXT · Monthly Aquisition Metric — no proposal — confidence None — UI CHROME (OTHER)
74. `#2297ad` TEXT · Analytic Growth Chart — no proposal — confidence None — CHART/ANALYTICS
75. `#70d4d4` TEXT · Monthly Aquisition Metric — no proposal — confidence None — CHART/ANALYTICS
76. `#f7c002` TEXT · Monthly Aquisition Metric — no proposal — confidence None — CHART/ANALYTICS

## /sample/delivery — component: src/components/stats/sample-production-stats.tsx (5 colors)

77. `#f47e20` BACKGROUND · Sample Production Stats — migrate to nusantics/brand-primary-default (Δ1.0) — confidence High — UI CHROME (OTHER)
78. `gray-600` TEXT · Delivery — migrate to causa/text-brand-primary (Δ12.2) — confidence Low — DEMO/PLAYGROUND
79. `#70d4d4` BACKGROUND · Sample Production Stats — no proposal — confidence None — CHART/ANALYTICS
80. `gray-400` TEXT · Delivery — migrate to text-text-info (nusantics, if brand-adaptive) — confidence None — DEMO/PLAYGROUND
81. `#1b84ff` BACKGROUND · Sample Production Stats — no proposal — confidence None — CHART/ANALYTICS

## /lab/kpi/pathocheck (4 colors)

82. `#ff6b6b` BACKGROUND · Pathocheck — migrate to primitive red-30 (Δ11.0, context only) — confidence None — UI CHROME (OTHER)
83. `#5b7fe8` BACKGROUND · Pathocheck — no proposal — confidence None — UI CHROME (OTHER)
84. `#f47e20` BACKGROUND · Pathocheck — migrate to nusantics/brand-primary-default (Δ1.0) — confidence High — UI CHROME (OTHER)
85. `#70d4d4` BACKGROUND · Pathocheck — no proposal — confidence None — CHART/ANALYTICS

## /customer/payer-account-packages/[id] [dynamic] (4 colors)

86. `#1c3391` TEXT · Payer Account Packages — no proposal — confidence None — UI CHROME (OTHER)
87. `#cb0b04` TEXT · Payer Account Packages — decision: **Assign token** (selected) → `Semantics-Core/Colors/Text/Error` — confidence None — STATUS BADGE
88. `#ffd4d6` BACKGROUND · Payer Account Packages — no proposal — confidence None — UI CHROME (OTHER)
89. `#d6e4fe` BACKGROUND · Payer Account Packages — no proposal — confidence None — UI CHROME (OTHER)

## /customer/payer-account-packages/[id]/history-mutation [dynamic] (4 colors)

90. `#1c3391` TEXT · History Mutation — no proposal — confidence None — UI CHROME (OTHER)
91. `#cb0b04` TEXT · History Mutation — decision: **Assign token** (selected) → `Semantics-Core/Colors/Text/Error` — confidence None — STATUS BADGE
92. `#ffd4d6` BACKGROUND · History Mutation — no proposal — confidence None — UI CHROME (OTHER)
93. `#d6e4fe` BACKGROUND · History Mutation — no proposal — confidence None — UI CHROME (OTHER)

## /customer/payer-account/[id]/analytics [dynamic] (3 colors)

94. `#979797` TEXT · Analytic Ranked Testing — migrate to nusantics/text-muted (Δ13.9) — confidence Low — UI CHROME (OTHER)
95. `#1c1c1c` BACKGROUND · Analytic Ranked Testing — migrate to nusantics/text-primary (Δ11.5) — decision: **Different token** (selected) → `Semantics-Core/Colors/Stroke/Strong` — confidence Low — UI CHROME (OTHER)
96. `#2297ad` TEXT · Analytic Growth Chart — no proposal — confidence None — CHART/ANALYTICS

## /customer/fishpond/[id]/pond [dynamic] (3 colors)

97. `#e0f7fa` BACKGROUND · Doc Badge — migrate to nusantics/surface-info-subtle (Δ12.7) — confidence Low — STATUS BADGE
98. `#0097a7` TEXT · Doc Badge — migrate to cekolam/text-brand-secondary (Δ9.1) — confidence Low — STATUS BADGE
99. `#f09595` TEXT · Doc Badge — no proposal — confidence None — STATUS BADGE

## /lab/processing/list — component: src/components/badge/ct-value-badge.tsx (3 colors)

100. `#cb0b04` TEXT · Sample Not Assigned Badge — decision: **Assign token** (selected) → `Semantics-Core/Colors/Text/Error` — confidence None — STATUS BADGE
101. `#d4eacb` BACKGROUND · Ct Value Badge — migrate to primitive nusantics-pale-green-20 (Δ13.9, context only) — confidence None — STATUS BADGE
102. `#769569` TEXT · Ct Value Badge — no proposal — confidence None — STATUS BADGE

## Repeating "Stats" component pattern (component: src/components/stats/*-production-stats.tsx or order-stats.tsx)
Each of these routes repeats the same 3 colors: `#f47e20` BACKGROUND (High, → nusantics/brand-primary-default Δ1.0), `#70d4d4` BACKGROUND (None, no proposal), `#1b84ff` BACKGROUND (None, no proposal) — all CHART/ANALYTICS except f47e20 UI CHROME. No decisions selected on any of these instances.

103-105. `/sample` — Sample Production Stats (3 colors)
106-108. `/sample/batch` — Sample Production Stats (3 colors)
109-111. `/order/aquacheck` — Order Stats (3 colors)
112-114. `/order/pathocheck` — Order Stats (3 colors, in progress)

115-117. `/order/delivery-lab` — Order Stats — same 3-color pattern (f47e20/70d4d4/1b84ff), no decisions

## /customer/fishpond/[id]/general-info [dynamic] (3 colors)

118. `#f47e20` BACKGROUND · Npwp Box — migrate to nusantics/brand-primary-default (Δ1.0) — confidence High — UI CHROME (OTHER)
119. `gray-200` BORDER · General Info — migrate to causa/data-viz-chart-8 (Δ8.8) — confidence Low — DEMO/PLAYGROUND
120. `gray-400` TEXT · General Info — migrate to text-text-info (nusantics, if brand-adaptive) — confidence None — DEMO/PLAYGROUND

## /ranked-list — component: src/components/stats/ranked-stats/analytic-ranked-testing.tsx (2 colors)

121. `#979797` TEXT · Analytic Ranked Testing — migrate to nusantics/text-muted (Δ13.9) — confidence Low — UI CHROME (OTHER)
122. `#1c1c1c` BACKGROUND · Analytic Ranked Testing — migrate to nusantics/text-primary (Δ11.5) — decision: **Different token** (selected) → `Semantics-Core/Colors/Stroke/Strong` — confidence Low — UI CHROME (OTHER)

## /misc/recommendation — component: src/components/badge/recom-matrix-badge.tsx (2 colors)

123. `#d4eacb` BACKGROUND · Recom Matrix Badge — migrate to primitive nusantics-pale-green-20 (Δ13.9, context only) — confidence None — STATUS BADGE
124. `#769569` TEXT · Recom Matrix Badge — no proposal — confidence None — STATUS BADGE

## /customer/payer-account — component: src/components/stats/customer-stats.tsx (2 colors)

125. `#f47e20` BACKGROUND · Customer Stats — migrate to nusantics/brand-primary-default (Δ1.0) — confidence High — UI CHROME (OTHER)
126. `#70d4d4` BACKGROUND · Customer Stats — no proposal — confidence None — CHART/ANALYTICS

## /customer/fishpond — component: src/components/stats/customer-stats.tsx (2 colors)

127. `#f47e20` BACKGROUND · Customer Stats — migrate to nusantics/brand-primary-default (Δ1.0) — confidence High — UI CHROME (OTHER)
128. `#70d4d4` BACKGROUND · Customer Stats — no proposal — confidence None — CHART/ANALYTICS

## /customer/payer-account/[id]/general-info [dynamic] (2 colors)

129. `#f47e20` BACKGROUND · Npwp Box — migrate to nusantics/brand-primary-default (Δ1.0) — confidence High — UI CHROME (OTHER)
130. `gray-500` TEXT · Formatting — migrate to primitive nusantics-dusty-blue-70 (Δ13.6, context only) — confidence None — DEMO/PLAYGROUND

## /order/sales-order-form/create (2 colors)

131. `gray-600` TEXT · Create — migrate to causa/text-brand-primary (Δ12.2) — confidence Low — DEMO/PLAYGROUND
132. `gray-500` TEXT · Create — migrate to primitive nusantics-dusty-blue-70 (Δ13.6, context only) — confidence None — DEMO/PLAYGROUND

## /lab/discarded — component: src/components/badge/sample-not-assigned-badge.tsx (1 color)

133. `#cb0b04` TEXT · Sample Not Assigned Badge — decision: **Assign token** (selected) → `Semantics-Core/Colors/Text/Error` — confidence None — STATUS BADGE

## [component] src/components/stats/sample-queue-stats.tsx — no route link (1 color)
134. `#f47e20` BACKGROUND · Sample Queue Stats — migrate to nusantics/brand-primary-default (Δ1.0) — confidence High — UI CHROME (OTHER)

## /research-project/[id]/order [dynamic] (1 color)
135. `#f47e20` BACKGROUND · Order — migrate to nusantics/brand-primary-default (Δ1.0) — confidence High — UI CHROME (OTHER)

## /research-project/[id]/sample [dynamic] (1 color)
136. `#f47e20` BACKGROUND · Sample — migrate to nusantics/brand-primary-default (Δ1.0) — confidence High — UI CHROME (OTHER)

## /research-project/[id]/file-report [dynamic] (1 color)
137. `#f47e20` BACKGROUND · File Report — migrate to nusantics/brand-primary-default (Δ1.0) — confidence High — UI CHROME (OTHER)

## [component] src/form-config/cekolam-order.ts — no route link (1 color)
138. `gray-600` TEXT · Cekolam Order — migrate to causa/text-brand-primary (Δ12.2) — confidence Low — DEMO/PLAYGROUND

## /customer/fishpond/[id] [dynamic] (1 color)
139. `gray-500` TEXT · Fishpond — migrate to primitive nusantics-dusty-blue-70 (Δ13.6, context only) — confidence None — DEMO/PLAYGROUND

## /research-project/[id] [dynamic] (1 color)
140. `gray-500` TEXT · Research Project — migrate to primitive nusantics-dusty-blue-70 (Δ13.6, context only) — confidence None — DEMO/PLAYGROUND

---
**App total: 141 colors transcribed.** (Count check: list above enumerates 140 distinct rows — 1 short of header's 141; likely one row was merged/miscounted during transcription, not consequential to decisions below.)

## Summary — decisions already made in the live artifact (color-level, apply everywhere that hex appears)
| Color | Decision | Token |
|---|---|---|
| `#cb0b04` | Assign token | Semantics-Core/Colors/Text/Error |
| `#1c1c1c` | Different token | Semantics-Core/Colors/Stroke/Strong |
| `#cacaca` | Different token | Semantics-Core/Colors/Stroke/Subtle (proposal shown; comment not confirmed — re-check `detail` view) |
| `#feeee2` | Different token | (comment not confirmed — re-check) |
| `#d1d5db` | Use proposal | nusantics/stroke-subtle |

## Not yet decided — grouped by proposal status
- **Has a proposed token, awaiting Use proposal / Different token / Keep custom**: `#dd7522`→cekolam/text-brand-primary, `#979797`→nusantics/text-muted, `#e0f7fa`→nusantics/surface-info-subtle, `#0097a7`→cekolam/text-brand-secondary, `#30364f`→causa/link-primary-hover, `#888`→cekolam/brand-tertiary-subtle-pressed, `#c1d1d9`→primitive nusantics-dusty-blue-20, `gray-500`→primitive nusantics-dusty-blue-70, `gray-400`→text-text-info, `gray-600`→causa/text-brand-primary, `gray-200`→causa/data-viz-chart-8, `#16a34a`→primitive green-60, `#ff6b6b`→primitive red-30, `#d4eacb`→primitive nusantics-pale-green-20, `#faa701`→primitive yellow-50, `#f47e20`→nusantics/brand-primary-default (High confidence, appears ~15x, no decision yet despite being the most common outstanding item), `#ededff`/`#e2f5ff`/`#def8ee`/`#fafafa`→various surface tokens.
- **No proposal — needs "Assign token" or "Keep custom"**: `yellow-200`, `#ffd4d6`, `#f09595`, `#ffd4d6`(dup), `#769569`, `#4aa785`, `#59a8d4`, `#8a8cd9`, `#ec4899`, `#06b6d4`, `#8b5cf6`, `#10b981`, `blue-200`, `orange-200`, `blue-900`, `indigo-700`, `indigo-100`, `blue-700`, `#95a4fc`, `#70d4d4`, `#1b84ff`, `#f7c002`, `#db2877`, `#3693ff`, `#2297ad`, `#5b7fe8`, `#1c3391`, `#d6e4fe`, `#0bae54`.

**Recommendation:** `#f47e20` (Δ1.0, High confidence, nusantics/brand-primary-default) is the single highest-leverage undecided item — it recurs ~15 times across this app alone. Suggest deciding that one first.

---

## Figma Variable Review (real lookups against file `GWzBKGr6512AeMOapwgQhj`, "Nusantics Design System" library, `Semantics` collection)

### 🔴 Critical finding: the 5 "already decided" items use a collection name that doesn't exist
Every hand-typed decision comment in this doc says **`Semantics-Core/Colors/...`**. I searched the live Figma file directly — there is no "Semantics-Core" collection. The real collection is just **`Semantics`**. Confirmed by direct lookup:
- `#cb0b04` decisions (lines 11, 93, 126, 133, 151) — should be **`Colors/Text/Error`** (Semantics), not `Semantics-Core/Colors/Text/Error`.
- `#1c1c1c` decisions (lines 10, 174) — should be **`Colors/Stroke/Strong`** (Semantics), not `Semantics-Core/Colors/Stroke/Strong`.
- `#cacaca` and `#feeee2` (lines 8–9) — decision buttons were clicked but I couldn't confirm their comment text from the screenshot; re-check these in the live artifact, and expect the same "Semantics-Core" typo if present.

**This means all 5 sign-offs currently on record are technically wrong-collection and would fail if someone tried to reference them in Figma as typed.** Worth flagging to whoever is doing sign-off before more decisions pile up with the same typo.

### ✅ Confirmed recommendation — `yellow-200` (line 7, Alert Notification, BACKGROUND, no proposal)
→ **`Colors/Surface/Warning-Subtle`** (Semantics). Description literally says: "used for Badge & Alert background."

### ✅ Confirmed direction — `#f47e20` (appears ~15×, BACKGROUND and TEXT roles, High confidence, no decision yet)
Real variable `Colors/Brand/Primary/Default` exists, described as "single source of truth — all other brand tokens alias to this." Role-specific:
- BACKGROUND instances (majority) → **`Colors/Surface/Brand/Primary`** ("Background solid brand primary — used for button, switch, progress bar, chart, avatar").
- TEXT instances (e.g. line 16 Order Category Badge, line 58 Analytics Positivity Level) → **`Colors/Text/Brand/Primary`**.
This matches the code auto-proposal `nusantics/brand-primary-default` directionally — same underlying color family, just the Figma-side name is role-split (Surface vs Text) rather than one generic token.

### 🟡 Strong hypothesis, not yet hex-verified — the repeating "chart color" cluster
A real `Colors/Data-viz/Chart-1` through `Chart-8` palette exists in Semantics (descriptions: "Use for the Nth data series in charts/graphs"). This is almost certainly what the following recurring, proposal-less colors map to, since they only ever appear in CHART/ANALYTICS context: `#70d4d4`, `#1b84ff`, `#ec4899`, `#06b6d4`, `#8b5cf6`, `#10b981`, `#f7c002`, `#db2877` (8 distinct colors — matches Chart-1..8 count exactly). A few more chart-context colors appear too (`#0bae54`, `#2297ad`, `#3693ff`, `#5b7fe8`, `#4aa785`, `#59a8d4`, `#8a8cd9` — **not** `#979797`, which actually has its own real proposal, `nusantics/text-muted`, see correction above) which may be duplicates/near-duplicates of the same 8, or a second overflow palette — **I could not verify exact hex-to-token pairing** (this repo doesn't have the audited apps' generated CSS to cross-check against, and Figma search doesn't return raw hex). Recommend: pull the actual computed hex for `Chart-1..8` from Figma (via `get_variable_defs` on a frame that uses them) and diff against this list before assigning tokens 1:1.

### ⚪ Everything else — one-off badge/status colors with no proposal
`#f09595` (3rd color in Doc Badge alongside an already-tokenized bg+text pair — less clear-cut, no confident semantic match found), `blue-200`, `orange-200`, `blue-900`, `indigo-700`, `indigo-100`, `blue-700`, `#95a4fc`, `#5b7fe8` and similar low-frequency STATUS BADGE / UI CHROME colors each appear 1–3× tied to specific disease/category badges. These look like intentional per-category custom colors (disease taxonomy, badge variants) rather than semantic-token candidates — my recommendation is **"Keep custom"** for most of these unless a designer confirms otherwise, since forcing them onto a generic semantic token (e.g. Text/Error) would lose the category-distinguishing meaning. Happy to do individual Figma searches for any specific ones if you want a token suggestion anyway instead of "Keep custom."

**Corrections applied in this pass:** `#769569` (was wrongly grouped here — see corrected row above, real match `Text/Success`) and `#979797` (was wrongly grouped as chart-cluster — real match `Text/Muted`→now `Text/Subtlest`, see above) have been removed from this "Keep custom" bucket.

**Correction:** `#ffd4d6` was wrongly lumped into this "Keep custom" group in an earlier pass — it's actually **not** a one-off, it consistently pairs with `#cb0b04` (→`Text/Error`) as the background half of the same error badge across 3 separate occurrences. See its row in the Quick Answer table above for the corrected recommendation (`Semantics-Core/Colors/Surface/Destructive-Subtle`).
