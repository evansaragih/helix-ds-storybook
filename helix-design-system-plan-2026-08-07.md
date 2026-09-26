# Rencana Kerja — Revisit Variable & Component (2026-08-07)

Lanjutan dari audit di `helix-design-system-log.md` dan checklist
`helix-design-system-figma-changes.md`. Belum ada perubahan yang jalan
sampai sesi ini dimulai — ini urutan kerja yang disarankan buat besok.

---

## Fase 0 — Keputusan yang masih ngegantung (selesaikan duluan, sebelum apa-apa)

- [ ] **Red-40 (`#EF4444`)** — mau dipakai konkret di komponen mana (icon
  error? border error varian lembut?), atau cukup didokumentasikan sebagai
  "dicadangkan" tanpa dipasang ke komponen manapun dulu. Ini nentuin apakah
  perlu bikin variable Figma baru atau nggak. (Lihat poin 2 di
  `helix-design-system-figma-changes.md`.)
- [ ] Konfirmasi nama final variable buat poin 4 (`bg-subtle` digabung ke
  `container-tertiary`) — udah jelas arahnya, tinggal eksekusi.

---

## Fase 1 — Eksekusi perubahan variable di Figma

Urutan sesuai `helix-design-system-figma-changes.md`, dari yang paling
kecil dampaknya ke paling luas:

1. [ ] `Colors/Bg/Subtle` → hapus, alihkan pemakaian ke `Colors/Container/Tertiary`
2. [ ] `Colors/Text/Error` → `#DC2626`
3. [ ] (kalau Fase 0 udah diputuskan) pasang `#EF4444` ke variable non-teks yang disepakati
4. [ ] `Colors/Stroke/Subtle` → `#EEEEEE` (Neutral-10) — **ini yang paling luas dampaknya, kerjain terakhir & paling hati-hati**
5. [ ] Tambahin deskripsi di Figma buat `Colors/Bg/Page` (page-level, dipasang di root layout) dan tulis aturan `Bg/*` vs `Container/*` di governance note file/komponen Figma

Setiap langkah: screenshot before/after di Figma buat referensi tahap sync
ke kode nanti.

---

## Fase 2 — Sync Figma → `theme.css`

- [ ] Update value di `theme.css` sesuai hasil final Fase 1
- [ ] Hapus/alias `--color-bg-subtle` → `--color-container-tertiary`
- [ ] Update komentar header token buat dokumentasiin aturan `bg` vs `container`
- [ ] Mulai isi `src/stories/Changelog.mdx` — ini rilis pertama yang tercatat resmi (semver: token rebind besar begini masuk kategori **minor**, karena `stroke-subtle` berubah visual, bukan cuma internal)

---

## Fase 3 — Pass komponen, urut dari dampak terbesar

Prioritas berdasarkan seberapa banyak komponen kepengaruh sama perubahan
`stroke-subtle` (dari data audit sebelumnya):

**Grup A — dampak tinggi (banyak pemakaian `stroke-subtle`/`stroke-default` campur)**
`Table`, `Card`, `ComparisonTable`, `Dropzone`, `Popover`, `Toast`,
`Command`, `Accordion`, `Input`

**Grup B — dampak sedang**
`Sheet`, `Dialog`, `Navbar`, `Stepper`, `InputOTP`, `DatePicker`, `Select`,
`CardMetric`, `ProgressBar`

**Grup C — sisanya + cek hardcoded hex lain**
Semua komponen sisa dari daftar 45/46 file yang punya hex literal — bedain
mana yang legit `var(x, #fallback)` vs yang beneran bypass token (kayak
`IconButton.tsx` variant `destructive`).

**Per komponen, checklist-nya:**
- [ ] Ganti hex hardcode yang bypass token → token semantic yang bener
- [ ] Screenshot before/after
- [ ] Kalau ada icon: cek masih pakai `lucide-react` atau nyasar ke
  `react-icons/*` tanpa alasan jelas (kalau ada, catat di log, bukan buru-buru
  diganti — itu kerjaan `Icon` primitive nanti)

---

## Fase 4 — Wrap-up sesi

- [ ] Update `helix-design-system-log.md` dengan §3: apa yang beneran
  dieksekusi hari itu, komponen mana yang udah kelar, mana yang masih
  nunggu
- [ ] Bikin daftar backlog buat sesi berikutnya (belum dikerjain sesi ini):
  - `Icon` primitive component (konsolidasi `lucide-react` vs `react-icons`)
  - Standarisasi pattern variant (`cva` atau formalisasi pattern manual)
  - Rollout versioning (`package.json` masih `0.0.1`)

---

## Catatan proses

- Semua perubahan visual (Fase 1 poin 2 & 4, Fase 3) butuh screenshot
  before/after — jangan skip biar gampang di-review/rollback kalau ada yang
  gak pas.
- Figma tetap jadi source of truth duluan (Fase 1), baru kode nyusul
  (Fase 2–3) — bukan sebaliknya.
- Kalau di tengah jalan nemu token/variable baru yang ambigu (kayak
  `stroke-default`/`subtle` kemarin), stop dulu, catat, tanya — jangan
  asumsi sendiri.
