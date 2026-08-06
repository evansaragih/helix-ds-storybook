# Helix Design System — Rencana Perubahan Variable di Figma

Checklist perubahan variable/token yang perlu dilakukan di file Figma Helix
Design System (`figma.com/design/GWzBKGr6512AeMOapwgQhj`), hasil audit
bareng user di `helix-design-system-log.md` §1–2. **Belum ada yang diubah
di Figma maupun di kode** — ini spesifikasi buat direview dulu sebelum
eksekusi ke Figma.

Setelah variable di Figma diubah, baru kode (`theme.css` + komponen)
di-sync belakangan — supaya Figma selalu jadi source of truth duluan,
bukan kode.

---

## Perubahan yang mengubah tampilan (visual, perlu di-review hati-hati)

### 1. Warna teks error — tukar ke shade yang lebih gelap

| Variable | Sekarang | Jadi | Alasan |
|---|---|---|---|
| `Colors/Text/Error` (→ `--color-text-error`) | `#EF4444` (Red-40) | `#DC2626` (Red-50) | Kontras `#EF4444` di atas putih ±3.76:1, gagal standar WCAG AA buat teks normal (butuh 4.5:1). `#DC2626` ±4.83:1, lolos. |

**Konsekuensi:** teks error (validasi form, pesan error) jadi sedikit lebih
gelap di semua komponen yang pakai token ini — `Switch`, `Stepper`,
`Select`, `RadioButton`, `MenuItem`, `UploadProgressDrawer`.

### 2. Warna Red-40 (`#EF4444`) — dipindah perannya, bukan dihapus

Karena poin 1 di atas membebaskan `#EF4444` dari peran "teks error", warna
ini dialihkan untuk elemen non-teks yang butuh kontras lebih longgar
(border/icon/fill error) — kontras 3:1 cukup buat elemen non-teks per WCAG.

| Variable baru/dipindah | Value | Dipakai untuk |
|---|---|---|
| `Colors/Icon/Error` atau `Colors/Border/Error-subtle` *(nama final tentukan pas di Figma)* | `#EF4444` (Red-40) | Icon error, atau border error varian "lebih lembut" — perlu diputuskan konkret dipakai di komponen mana pas sudah di Figma. |

*Catatan: butuh keputusan tambahan — apakah `#EF4444` ini benar-benar mau
dipakai di komponen tertentu sekarang, atau cuma disiapkan sebagai token
"tersedia" untuk pemakaian nanti. Kalau gak ada use case konkret saat ini,
lebih baik jangan bikin token baru dulu (hindari token nganggur kayak
`bg-page` di poin 5) — cukup dokumentasikan bahwa Red-40 "dicadangkan"
untuk elemen non-teks kalau dibutuhkan.*

### 3. `Colors/Stroke/Subtle` — perbaiki, salah pasang primitive

| Variable | Sekarang | Jadi | Alasan |
|---|---|---|---|
| `Colors/Stroke/Subtle` (→ `--color-stroke-subtle`) | `#D7D7D7` (salah — kepasang Neutral-20, sama kayak Default) | `#EEEEEE` (Neutral-10, sesuai maksud aslinya) | Konfirmasi user: Default seharusnya Neutral-20, Subtle seharusnya Neutral-10 — di kode sekarang dua-duanya kepasang Neutral-20. |

**Konsekuensi:** border/divider "subtle" jadi lebih terang di ±55 tempat
pemakaian (`Table`, `Card`, `Dropzone`, `Popover`, `ComparisonTable`, dst).
Ini perubahan paling luas dampaknya — screenshot-diff tiap komponen wajib
setelah disinkron ke kode.

---

## Perubahan rapi-rapi nama (tidak mengubah tampilan)

### 4. Gabung 2 dari 3 token abu-abu duplikat

| Dihapus | Digabung ke | Alasan |
|---|---|---|
| `Colors/Bg/Subtle` (→ `--color-bg-subtle`) | `Colors/Container/Tertiary` (→ `--color-container-tertiary`) | Sama-sama "permukaan statis redup", murni duplikat nama. |
| `Colors/Bg/Hover` (→ `--color-bg-hover`) | **Tetap dipisah**, jangan digabung | Ini token *state* (hover), bukan token permukaan statis. Kebetulan aja nilainya sama sekarang (`#EEEEEE`) — dipisah supaya nanti bisa diatur independen dari warna container kalau perlu. |

---

## Perubahan dokumentasi / cara pakai (tidak mengubah token sama sekali)

### 5. `Colors/Bg/Page` — bukan dihapus, tapi didokumentasikan cara pakainya

Token ini gak dipakai di komponen manapun sekarang, tapi bukan berarti gak
berguna — ini kemungkinan didesain buat warna latar **halaman** (dipasang
sekali di root/layout aplikasi), beda dari `Container/Primary` yang buat
warna permukaan **komponen** (card/panel) di atas halaman itu. Didukung
oleh adanya `Colors/Bg/Secondary` (`#F5F5F5`) yang jelas-jelas "Secondary
page background".

**Aksi:** bukan perubahan value, tapi (a) beri deskripsi jelas di variable
Figma-nya kalau ini "page-level background, pasang di root layout — bukan
per-komponen", dan (b) info ke tim dev supaya `bg-page`/`bg-secondary`
benar-benar dipasang di level layout aplikasi yang konsumsi Helix.

### 6. Dokumentasikan aturan `Bg` vs `Container`

Tambahkan deskripsi di grup variable Figma (atau catatan governance):
- `Bg/*` = warna latar **halaman**, dipasang sekali di root/layout.
- `Container/*` = warna permukaan **komponen** yang duduk di atas halaman
  (card, panel, dropdown, modal — apapun yang punya elevasi/boundary
  sendiri).

---

## Yang TIDAK termasuk perubahan (sudah dicek, ternyata bukan masalah)

- Duplikasi value base `:root` vs `[data-brand="nusantics"]` di kode —
  ternyata sudah digabung jadi satu selector (`:root, [data-brand="nusantics"] { ... }`),
  jadi bukan sumber kebenaran ganda seperti dugaan awal. Tidak perlu
  perubahan di Figma untuk ini.

---

## Urutan eksekusi yang disarankan

1. Review checklist ini — terutama poin 2 (perlu keputusan use case buat
   Red-40) dan konfirmasi nama variable final di poin 2 & 4.
2. Ubah variable di Figma sesuai poin 1–6 yang disetujui.
3. Screenshot komponen yang kepengaruh (terutama poin 3 — dampaknya paling
   luas) buat baseline before/after.
4. Baru setelah itu sync ke `theme.css` dan jalankan `sync-design-docs`
   biar dokumentasi web app ikut update.
5. Rebind pass di komponen `.tsx` (yang hardcode hex) baru jalan setelah
   token-nya fix, sesuai rencana awal.
