# Accent Remap Proposal — warna "Keep custom" dicocokin ke grup Accent (data real, verified)

Scope file ini **cuma warna yang genuinely kandidat Accent** — kategori identitas visual (badge/tag/avatar/marker/identifier) yang gak punya makna status, dari semua warna "Keep custom"/no-proposal di 8 app yang udah di-audit.

## ✅ Status: Accent group BENERAN ADA di Figma sekarang

`Semantics-Core/Colors/Accent/{Name}-{Emphasis}` — 42 variable (14 hue × Bold/Subtle/Subtler), step mapping `Bold=70`, `Subtle=30`, `Subtler=20`. Detail lengkap ada di `.claude/skills/figma-variable-naming/SKILL.md`. Data hex di bawah ini **ditarik langsung dari Figma pakai `use_figma`** (bukan tebakan/color-math lagi kayak draft sebelumnya) — saya baca 289 Primitive variable satu-satu buat cari exact match, baru nearest-match kalau gak ada yang persis.

---

## 🎯 EXACT MATCH — 5 warna, gak perlu bikin apapun baru

Warna-warna ini **hex-nya persis sama** (bukan mirip — identik) dengan Primitive yang udah ada. 2 di antaranya malah persis sama Accent token yang udah live.

| Hex | Komponen / App | Primitive match (exact) | Accent token terkait |
|---|---|---|---|
| `#617089` | Workflow Steps, nusantics-research-dashboard | `Colors/Nusantics/Dusty Blue/70` | **= `Accent/Steel-Blue-Bold` persis** — tinggal pakai token ini langsung, gak perlu apa-apa lagi |
| `#8fa766` | Workflow Steps, nusantics-research-dashboard | `Colors/Nusantics/Pale Green/70` | **= `Accent/Sage-Green-Bold` persis** — tinggal pakai token ini langsung |
| `#394b69` | Workflow Steps, nusantics-research-dashboard | `Colors/Nusantics/Dusty Blue/80` | Ramp sama kayak Steel Blue, tapi step `80` — di luar 3 tier yang ada (70/30/20). Kalau mau resmi jadi token, perlu tier ke-4 atau `Text`-scope Accent baru; kalau enggak, tinggal alias langsung ke `Nusantics/Dusty Blue/80` primitive |
| `#e4e7ea` | Workflow Steps, nusantics-research-dashboard | `Colors/Nusantics/Dusty Blue/10` | Sama ramp Steel Blue lagi, step `10` — juga di luar 3 tier yang ada |
| `#2a4c51` | Group Teams, cekolam-dashboard | `Colors/CeKolam/Blue Green/80` | Sama ramp kayak `Accent/Teal` (Bold=70), tapi step `80` — di luar tier yang ada |

**Temuan penting:** 4 dari 5 exact match (`#617089`, `#394b69`, `#e4e7ea` dari Steel Blue/Dusty Blue ramp, ditambah `#2a4c51` dari Teal/Blue Green ramp) itu SEMUA dari ramp yang sudah dipakai Accent (Steel Blue, Teal) — cuma di step yang beda dari 3 tier standar (70/30/20). Ini kemungkinan sinyal: Workflow Steps butuh gradasi lebih dari 3 tier (dia pakai step 10, 70, 80 dari ramp yang sama) — worth diangkat ke designer sebagai kasus konkret buat evaluasi apa emang perlu tier ke-4, bukan cuma teori.

---

## 🔎 NEAREST MATCH — 14 warna, gak ada yang persis tapi ada yang deket

Kolom "distance" itu jarak Euclidean di ruang RGB (0-255 per channel) — **makin kecil makin deket**. Di bawah ~20 biasanya udah nyaris gak kebeda mata; di atas ~40 udah beda warna yang jelas kelihatan, jangan dipaksa disamain.

| Hex | Komponen / App | Nearest Primitive | Distance | Rekomendasi |
|---|---|---|---|---|
| `#59a8d4` | Disease Badge, cekolam-internal-dashboard | `Colors/Causa/Azure/70` (`#4cb0dc`) | 17 (deket) | Kandidat kuat buat jadi Accent baru — mirip cukup deket sama ramp Azure yang udah dipakai `Accent/Sky-Blue` |
| `#8a8cd9` | Disease Badge, cekolam-internal-dashboard | `Colors/Causa/YlnMn Blue/30` (`#7e96ce`) | 19 (deket) | Ramp ini udah dipakai `Accent/YInMn-Blue` — tapi step 30 bukan salah satu tier standar buat hue ini (Bold pakai 70) |
| `#367681` | Exposition, cekolam-dashboard | `Colors/CeKolam/Rhino/60` (`#446b88`) | 19 (deket) | Ramp "Rhino" belum dipakai Accent manapun — kandidat hue baru kalau mau diresmiin |
| `#e0e7ff` (indigo-100) | Identifier List, cekolam-internal-dashboard | `Colors/Blue/5` (`#ebf2fe`) | 16 (deket) | |
| `#dcfce7` | Helpers, causa-admin-portal | `Colors/Green/5` (`#e9f9ef`) | 16 (deket) | |
| `#95a4fc` | Sample Report, cekolam-internal-dashboard | `Colors/Blue/30` (`#86a9e4`) | 29 (sedang) | |
| `#4597a5` | Group Teams, cekolam-dashboard | `Colors/Nusantics/Navy Blue/40` (`#467aa2`) | 29 (sedang) | Tagged "TEAM/AVATAR ACCENT" oleh audit tool |
| `#6f8a91` | Map Pins, cekolam-dashboard | `Colors/Causa/Powder Blue/40` (`#7692a3`) | 21 (deket) | Ramp Powder Blue udah dipakai `Accent/Slate-Blue` |
| `#bfdbfe` (blue-200) | Identifier List, cekolam-internal-dashboard | `Colors/Causa/Azure/20` (`#bfe0eb`) | 20 (deket) | |
| `#1e3a8a` (blue-900) | Identifier List, cekolam-internal-dashboard | `Colors/Blue/80` (`#093680`) | 24 (sedang) | Ramp `Blue` (plain) udah dipakai `Accent/Royal-Blue` |
| `#1d4ed8` (blue-700) | Utils, cekolam-internal-dashboard | `Colors/Blue/70` (`#014cc5`) | 34 (agak jauh) | Ramp sama (`Blue`) tapi step 70 = itu justru step Bold yang udah dipakai `Accent/Royal-Blue-Bold` — worth cek apa `blue-700` di kode ini sebenernya dimaksudkan = Royal Blue |
| `#fed7aa` (orange-200) | Utils, cekolam-internal-dashboard | `Colors/CeKolam/Pumkin Orange/20` (`#ebc0a2`) | 31 (sedang) | Ramp udah dipakai `Accent/Pumpkin-Orange` |
| `#4aa785` | Disease Badge, cekolam-internal-dashboard | `Colors/Green/40` (`#51d481`) | 46 (jauh — jangan dipaksa) | Gak ada match yang bagus. Kemungkinan ini beneran warna baru di luar palette yang ada |
| `#4338ca` (indigo-700) | Identifier List, cekolam-internal-dashboard | `Colors/Causa/YlnMn Blue/40` (`#5577c3`) | 66 (jauh — jangan dipaksa) | Gak ada match yang bagus sama sekali |

---

## Ringkasan & rekomendasi urutan kerja

1. **5 exact match** — langsung bisa dipakein token yang udah ada (`#617089`→`Steel-Blue-Bold`, `#8fa766`→`Sage-Green-Bold`) atau tinggal alias ke Primitive yang udah ada (`#394b69`, `#e4e7ea`, `#2a4c51` — nunggu keputusan soal tier ke-4).
2. **6 nearest-match yang deket** (distance ≤20: `#59a8d4`, `#8a8cd9`, `#367681`, `indigo-100`, `#dcfce7`, `#6f8a91`) — kandidat kuat, aman dibulatkan ke Primitive terdekat.
3. **6 nearest-match sedang** (distance 21-40) — masih masuk akal tapi worth designer liat langsung dulu sebelum dibulatkan, terutama `#1d4ed8`/blue-700 yang kebetulan jaraknya ke step Bold yang udah dipakai hue lain.
4. **2 yang jauh** (`#4aa785`, `indigo-700`) — kemungkinan besar ini genuinely warna baru yang belum ada di palette manapun, bukan salah cocok. Kalau mau ditokenize, ini butuh Primitive baru dulu, bukan sekadar alias ke yang udah ada.

**Rekomendasi urutan bahas ke designer:** mulai dari 5 exact match (paling gampang, langsung actionable), terutama highlight temuan Workflow Steps yang butuh step di luar 3 tier standar — itu data konkret buat evaluasi ulang keputusan "Subtler di-drop lalu di-revive," siapa tau butuh direvisi lagi jadi 4-5 tier.

---

## Di luar scope Accent (referensi singkat)

- **Data-viz** (8 warna: `#ec4899`, `#06b6d4`, `#8b5cf6`, `#10b981`, `#70d4d4`, `#1b84ff`, `#f7c002`, `#db2877`, + 3 uncertain) — jalurnya `Colors/Data-viz/Chart-N`, bukan Accent.
- **Third-party brand** (`#ea4c89`, `#0a66c2` — LinkedIn blue) — wajib tetap hardcode.
- **Dekoratif/gradient/print-only** — bukan UI chrome fungsional, prioritas rendah.
- **Perlu review status dulu, bukan Accent** — `red-50` (recurring 4×), `#f09595`.
- **Dikeluarin dari Accent, kemungkinan udah punya jalur lain** — `#1c3391` (kemungkinan pasangan status Info), `#dc7a3a` (udah py proposal semantik sendiri).
