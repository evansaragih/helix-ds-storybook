# CeKolam · Demand Planning — Feature Spec

| | |
|---|---|
| **Product** | Nusantics CeKolam (Brand mode: `cekolam`) |
| **Feature** | Demand Planning — plan how many samples to expect, per sample type, for a set of farms (tambak) in a period |
| **Scope of this document** | Step 1 *Rencana sampel* and Step 2 *Tinjau*, as built in the HTML mockup. Step 3 *Submit* is **not designed yet**. |
| **Status** | High-fidelity interactive mockup (no backend). Needs product decisions on the open questions in §13 before build. |
| **Mockup** | `src/Demand Planning/cekolam-demand-planning-mock.html` (open directly in a browser) |
| **Author** | Evan (Design) |
| **Audience** | Jason (product) · Engineering · QA |

---

## 1. Summary

A sales user plans **demand for lab samples** for a chosen period. They pick *when* (period), *which farms* (scope), and *how many samples of each type* (Udang, Benur, …). The same breakdown is applied to **every farm in the chosen scope**, so planning for a whole region takes one form, not one form per farm. After a read-only review, the plan is submitted.

Key idea behind the design: a sales person **does not have to fill in all farms**. They can plan for a single farm, a handful of farms (max 5), a whole province, or a whole region.

## 2. Goals and non-goals

### Goals
1. Let a user create one demand plan for **one period** and **one scope** in a few steps.
2. Make the planning input compact: **one set of per-sample-type counts** that applies to all farms in the scope.
3. Show **last period's realisation** next to the new plan so the user can judge the change before submitting.
4. Work on desktop and mobile; fully keyboard accessible.
5. Built entirely from the Helix design system (CeKolam brand mode), flagging any gap (see §11).

### Non-goals (for this iteration)
- Step 3 *Submit* (confirmation, success state, error handling) — not designed.
- Per-farm different counts (every farm in scope gets the same numbers).
- Editing or cancelling a plan after submit; plan history/list screen.
- Draft auto-save, permissions, approval workflow.
- Real data, API integration, authentication.

## 3. Users and scenarios

| User | Scenario |
|---|---|
| **Sales** | Plans next month's expected samples for the 2 farms they handle (Per Tambak). |
| **Regional sales lead** | Plans one standard breakdown for every farm in a province or region (Per Provinsi / Per Region). |
| **Any user** | Reviews the plan, sees how it compares with last period, goes back to change it, then submits. |

## 4. User flow

```
 ┌────────────────────────┐   Lanjut ke Tinjau   ┌─────────────────────┐   Submit rencana   ┌──────────────┐
 │ 1 · Rencana sampel     │ ───────────────────▶ │ 2 · Tinjau          │ ─────────────────▶ │ 3 · Submit   │
 │ (editable)             │ ◀─────────────────── │ (read-only)         │                    │ (not built)  │
 └────────────────────────┘     Kembali ubah     └─────────────────────┘                    └──────────────┘
   Periode · Cakupan · Sampel per jenis · Penyakit
```

A stepper in the page header shows the three steps; completed steps show a check mark.

## 5. Screen anatomy

### 5.1 Page shell
Dashboard shell shared with the Nusantics dashboard (sidebar + navbar), with the **CeKolam logo** and **CeKolam brand mode**. The page body is one **Content Container**:

| Slot | Content |
|---|---|
| Header | Title "Demand Planning" (text style **Label/Default-label**), step-dependent subtitle, stepper |
| Body (scrolls) | Step content (below) |
| Footer (white) | Summary (`N tambak · N sampel · period`), hint text, and step actions |

### 5.2 Step 1 · Rencana sampel (desktop ≥ 1001 px)

Two columns: a left rail (300 px, sticky) and a right panel that **fills the full height** of the page body.

**Left rail**

1. **Periode** container — header shows the chosen period as a badge.
   - Segmented control: *Bulanan · Mingguan · Per tanggal*
   - Fields per mode (see FR-P)
   - Helper text, e.g. "Mencakup 1–30 November 2026"
2. **Cakupan tambak** container — header shows "N tambak" or "Belum dipilih".
   - Segmented control: *Per Region · Per Provinsi · Per Tambak*
   - Field per mode (see FR-S)
   - Helper text

**Right panel — "Rincian sampel"** (Content Container; header has the **"N tambak" button**)

- A **Content Container (Surface = Gray, Style = Floating)** titled **"Sampel per jenis"**:
  - Header right side: `Per tambak <n>` and `Seluruh cakupan <n × farms>`
  - One row per sample type (7 rows): label · **−** · slider · **+** · number input
  - Accordion **"Penyakit yang diuji"** (optional) with a checkbox grid and a "Hapus pilihan" link
- Empty state when no scope is chosen: "Pilih cakupan tambak".

**Footer actions:** `Kosongkan` (secondary) · `Lanjut ke Tinjau` (primary).

### 5.3 Step 2 · Tinjau (read-only)

Single column. The left rail disappears; its information moves into the page.

1. **Badge Group row** (size lg): *Jenis periode*, *Periode*, *Cakupan tambak*, *Total tambak*, *Total sampel*. Each is a pill with a solid label badge and the value.
2. **Ringkasan rencana** container:
   - **Metric strip:** *Periode lalu* (realisation) · *Rencana sekarang* · *Perubahan* (delta, with % and up/down/flat tone).
   - **Table "Jenis sampel / Total":** one row per sample type with a non-zero count, accumulated across all farms (`count × farms`), plus a *Total sampel* footer row.
   - **Penyakit diuji:** chips of selected diseases (only if any).

**Footer actions:** `Kembali ubah` (secondary) · `Submit rencana` (primary; Step 3 is a placeholder toast for now).

### 5.4 Dialogs and overlays

| Overlay | Trigger | Purpose |
|---|---|---|
| **Dialog "Tambak dalam cakupan"** | Header button "N tambak" (Step 1) | Read-only table of farms in scope: Tambak (name + code), Lokasi, Region, Jumlah kolam, Realisasi periode lalu, with a *Total* row. |
| **Alert Dialog (destructive)** | `Kosongkan` | Confirm wiping entered data. |
| **Toastr** (top-right, compact Alert) | Clear confirmed; Submit placeholder | Transient feedback. |
| **Popovers** | Select / Multi-select / Date picker triggers | Option lists; one open at a time. |
| **Bottom sheet** (mobile only) | "Periode & cakupan" card | Holds the Periode and Cakupan containers. |

### 5.5 Responsive behaviour

| Viewport | Behaviour |
|---|---|
| **≥ 1001 px** | Two columns; rail is sticky; right panel fills page height. |
| **≤ 1000 px** | Single column: Periode, Cakupan, then Rincian sampel. Rail is not sticky. |
| **≤ 640 px (mobile)** | Periode and Cakupan collapse into **one summary card** ("Periode & cakupan", with period and scope values and an **Ubah** affordance). Tapping it opens a **bottom sheet** (scrim, grab handle, close button, **Selesai** button). Stepper shows only the current step. Footer buttons stretch. Tables in dialogs become **cards** (one card per row; columns become label/value lines; Total becomes its own card). |

`?layout=stacked` (prototype only) puts Periode and Cakupan above the list on desktop. `?step=2` opens Tinjau directly (prototype only).

## 6. Functional requirements

### FR-P · Period

| ID | Requirement |
|---|---|
| P-1 | The user chooses a **period type**: *Bulanan*, *Mingguan*, or *Per tanggal*. Only one is active. |
| P-2 | **Bulanan:** choose **Bulan** (Jan–Des) and **Tahun** (2026, 2027). |
| P-3 | **Mingguan:** choose **Minggu** (1–5), **Bulan**, **Tahun**. Week *n* = days `7(n−1)+1` to `min(7n, days in month)`. Options show their range, e.g. "Minggu 2 (8–14)". Week 5 is **disabled** when it would start after the last day (e.g. February). If a month/year change makes the selected week invalid, it **resets to week 4**. |
| P-4 | **Per tanggal:** choose a **single date** in a custom calendar (week starts Monday; today is marked; selected date highlighted; range limited to 2026-01-01 … 2027-12-31; month navigation disabled beyond the range). |
| P-5 | The period label is shown in: the Periode header badge, the helper text, the footer summary, the mobile summary card, and (Step 2) a Badge Group. Formats: `November 2026` · `Minggu 2 · 8–14 November 2026` · `2 November 2026`. |
| P-6 | Changing the period type or any period value **keeps** all entered sample counts. |

### FR-S · Scope (Cakupan tambak)

| ID | Requirement |
|---|---|
| S-1 | The user chooses a **scope type**: *Per Region*, *Per Provinsi*, or *Per Tambak*. |
| S-2 | **Per Region:** single-select from 4 regions (Jawa; Sumatera; Sulawesi; Bali & Nusa Tenggara). Every farm in the region is in scope. |
| S-3 | **Per Provinsi:** single-select from 9 provinces. Every farm in the province is in scope. |
| S-4 | **Per Tambak:** **multi-select, maximum 5 farms**, with **search inside the dropdown** (matches name, code, kabupaten, province). |
| S-5 | Multi-select behaviour: changes are held as a **draft** and committed on **Apply**; **Clear** empties the draft; closing without Apply (Esc, click outside) **discards** the draft. A counter shows "N dari 5 dipilih"; at 5 selected, unselected options are **disabled** and the counter reads "· batas tercapai". |
| S-6 | Multi-select options are **Group Items** (checkbox at the end) showing: farm icon, name, "Kabupaten, Provinsi", badges (region, code, "N kolam"), and **"Realisasi periode lalu: N sampel"**. |
| S-7 | The trigger shows the selected names (1–2 names) or "N tambak dipilih", plus an `n/5` count chip. |
| S-8 | Each scope type **remembers its own selection** when the user switches type. Only the **active** type defines the scope. |
| S-9 | Helper text explains the effect, e.g. "Semua 6 tambak di Jawa ikut direncanakan." / "Pilih sampai 5 tambak…". |
| S-10 | Per Region / Per Provinsi with nothing selected → scope is empty → right panel shows the empty state; "N tambak" button is disabled. |

### FR-R · Sample breakdown ("Sampel per jenis")

| ID | Requirement |
|---|---|
| R-1 | There is **one** set of counts for the whole scope; it applies to **every farm** in scope. |
| R-2 | Sample types (fixed list, in this order): **Udang, Benur, Kepiting Liar, Udang Liar, Pakan, Naupli, Lumpur**. |
| R-3 | Each type has a count from **0 to 50**, edited via **slider**, **−/+ buttons**, or **number input**. All three stay in sync. |
| R-4 | **−** is disabled at 0; **+** is disabled at 50. Typed values are clamped to 0–50 and rounded to integers; a blank field is treated as 0 on blur. |
| R-5 | The slider shows a **value bubble** on hover/focus/drag. |
| R-6 | Rows with a count > 0 are visually emphasised (bold label, bold number). |
| R-7 | **Per tambak** = sum of the 7 counts. **Seluruh cakupan** = per tambak × number of farms in scope. Both update live. |
| R-8 | Updates happen **in place** (no re-render while dragging). |

### FR-D · Diseases ("Penyakit yang diuji") — the only optional part

| ID | Requirement |
|---|---|
| D-1 | Optional multi-select of: **AHPND, WSSV, IMNV, EHP, TSV, YHV, IHHNV, DIV1, CMNV** (checkbox grid, 3 columns). |
| D-2 | Lives in an **Accordion**, **open by default**. It is **disabled and closed** while the per-tambak total is 0, and opens automatically once any count > 0 (unless the user closed it). |
| D-3 | The accordion header shows the **count of selected diseases** ("2 penyakit"). "Hapus pilihan" clears the selection. |
| D-4 | The disease selection applies to every farm in scope (same as the counts). |

### FR-F · Farm list dialog

| ID | Requirement |
|---|---|
| F-1 | The header button shows "N tambak" (scope size) with a list icon; opens the dialog. Disabled when scope is empty. |
| F-2 | Dialog title "Tambak dalam cakupan"; description "N tambak · \<scope\>". |
| F-3 | Table columns: Tambak (name, code), Lokasi, Region, Jumlah kolam, Realisasi periode lalu; **Total** row sums kolam and realisation. |
| F-4 | Closes with the ✕, the *Tutup* button, **Esc**, or a click on the backdrop. Focus returns to the header button. Body scrolls when the list is long (max dialog height = viewport − 96 px). |

### FR-C · Clear all (Kosongkan)

| ID | Requirement |
|---|---|
| C-1 | Enabled only when the per-tambak total > 0. |
| C-2 | Opens a **destructive Alert Dialog**: "Hapus semua data yang sudah diisi?" with a dynamic description: "*X sampel per tambak (total Y sampel untuk N tambak) akan dikosongkan, termasuk penyakit yang sudah dipilih. Cakupan tambak dan periode tidak berubah. Tindakan ini tidak dapat dibatalkan.*" |
| C-3 | Initial focus is on **Batal** (safe default). Esc cancels. Clicking the backdrop does **not** close it. |
| C-4 | **Confirm** resets all counts and diseases; period and scope are untouched; a toast confirms ("Data rencana sudah dikosongkan"). **Cancel** changes nothing. |

### FR-N · Navigation and gating

| ID | Requirement |
|---|---|
| N-1 | **Lanjut ke Tinjau** is enabled only if **≥ 1 farm is in scope AND per-tambak total > 0**. |
| N-2 | When disabled, a footer hint explains why: "Pilih cakupan tambak dulu" (no scope) or "Isi minimal satu jenis sampel untuk lanjut" (no samples). |
| N-3 | Moving to Tinjau scrolls to top and moves focus to the page title; the subtitle changes to "Periksa kembali rencana sampel sebelum dikirim. Pada langkah ini data tidak bisa diubah." |
| N-4 | **Kembali ubah** returns to Step 1 with everything preserved. |
| N-5 | **Submit rencana** is a placeholder (toast "Langkah 3 (Submit) belum dibuat") until Step 3 is specified. |

### FR-V · Review (Tinjau) content

| ID | Requirement |
|---|---|
| V-1 | Nothing is editable. |
| V-2 | Badge Group row, metric strip, accumulated table, and disease chips as in §5.3. |
| V-3 | Only sample types with count > 0 appear in the table. |
| V-4 | Calculations follow §7. |

## 7. Business rules and calculations

```
perFarm   = Σ count(jenis)                       // 7 jenis, each 0..50
nFarms    = |farms in active scope|              // Per Tambak ≤ 5
total     = perFarm × nFarms                     // "Seluruh cakupan" / "Total sampel"

prevTotal = Σ farm.realisasiPeriodeLalu          // over farms in scope
now       = total
delta     = now − prevTotal
deltaPct  = prevTotal > 0 ? round(|delta| / prevTotal × 100) : n/a
tone      = delta > 0 ? up : delta < 0 ? down : flat
perJenisTotal(jenis) = count(jenis) × nFarms     // Tinjau table rows
```

- Only **farms in the active scope** count towards summary, review and submit. Counts entered earlier for other scopes are not used.
- The same breakdown applies to **each** farm: "Udang 2" means **2 Udang samples per farm**, not 2 shared across farms. *(Needs confirmation — Q1.)*
- Perubahan labels: `Sama dengan periode lalu`, `Naik N%`, `Turun N%`, `Belum ada data lalu` (when previous = 0).
- Limits: 50 per sample type; max 5 farms in Per Tambak; years 2026–2027.

## 8. States

| Element | State | Behaviour |
|---|---|---|
| Right panel | No scope | Empty state "Pilih cakupan tambak"; no form. |
| "N tambak" button | No scope | Disabled. |
| Per-row **−** | count = 0 | Disabled. |
| Per-row **+** | count = 50 | Disabled. |
| Penyakit accordion | per-tambak total = 0 | Disabled, closed. |
| Multi-select option | 5 already chosen | Unselected options disabled. |
| Multi-select search | No match | "Tambak tidak ditemukan". |
| Week option | Week would not exist in month | Disabled. |
| Kosongkan | per-tambak total = 0 | Disabled. |
| Lanjut ke Tinjau | scope empty or total = 0 | Disabled + hint. |
| Calendar day | Outside 2026–2027 | Disabled. |

## 9. Data (proposed)

> The mockup uses hard-coded sample data. The shapes below are **proposals** for the build, not an existing contract.

### 9.1 Reference data

```ts
Region   { name: string; provinces: string[] }
Farm {
  id: string; name: string; code: string;       // e.g. "CKL-JT-001"
  kabupaten: string; province: string; region: string;
  ponds: number;                                 // "Jumlah kolam"
  lastPeriodRealisation: number                  // total samples realised last period
}
SampleType = 'Udang'|'Benur'|'Kepiting Liar'|'Udang Liar'|'Pakan'|'Naupli'|'Lumpur'
Disease    = 'AHPND'|'WSSV'|'IMNV'|'EHP'|'TSV'|'YHV'|'IHHNV'|'DIV1'|'CMNV'
```

Mock data: 4 regions, 9 provinces, 15 farms.

### 9.2 Plan payload (submit — proposal)

```json
{
  "period": { "type": "month", "month": 11, "year": 2026 },
  "scope":  { "type": "farms", "farmIds": ["f0", "f6"] },
  "samplesPerFarm": { "Udang": 2, "Benur": 4 },
  "diseases": ["WSSV", "IMNV"]
}
```

`period.type` ∈ `month | week | date` (`week` adds `week: 1–5`; `date` carries `"2026-11-02"`). `scope.type` ∈ `region | province | farms` (`region`/`province` carry a name; the **server should resolve the farm list** at submit time and store the resolved IDs for traceability).

### 9.3 Endpoints the screen will need (proposal)

| Purpose | Suggested call |
|---|---|
| Regions / provinces / farms (searchable, limited to what the user may plan for) | `GET /farms?region=&province=&q=` |
| Last-period realisation per farm for a given period | `GET /demand-plans/realisation?period=…&farmIds=…` |
| Submit | `POST /demand-plans` |

## 10. Copy (Bahasa Indonesia, as in the mockup)

| Location | Text |
|---|---|
| Subtitle · Step 1 | Tentukan jumlah sampel yang direncanakan untuk setiap tambak pada periode yang dipilih. |
| Subtitle · Step 2 | Periksa kembali rencana sampel sebelum dikirim. Pada langkah ini data tidak bisa diubah. |
| Stepper | Rencana sampel · Tinjau · Submit |
| Scope helper (Per Tambak) | Pilih sampai 5 tambak. Cari nama, kode, atau kabupaten di dalam dropdown. |
| Empty state | **Pilih cakupan tambak** — Pilih region, provinsi, atau tambak (maks. 5) di panel kiri. Rincian sampel yang diisi akan berlaku untuk semua tambak tersebut. |
| Sample card hint | Maks. 50 per jenis · berlaku untuk setiap tambak |
| Footer hints | Pilih cakupan tambak dulu · Isi minimal satu jenis sampel untuk lanjut |
| Clear dialog | Hapus semua data yang sudah diisi? · Batal · Ya, hapus semua |
| Toasts | Data rencana sudah dikosongkan · Langkah 3 (Submit) belum dibuat |
| Mobile sheet | Periode & cakupan · Ubah · Atur periode & cakupan · Selesai |

## 11. Design system usage and gaps

**Brand mode:** `data-brand="cekolam"` (primary `#EB7323`, hover `#B2571A`, pressed `#7C431D`, secondary teal `#089AAA`). Colours come from `theme.css` tokens; nothing brand-coloured is hard-coded.

### Used as specified

| Pattern | Helix component (Figma node) |
|---|---|
| Page, panels, floating sample card | **Content Container** `6109:1185` (Surface Gray, Style Floating for the sample card) |
| Dropdowns | **Select** `3587:9659` (single); multi variant with search + Clear/Apply |
| Date | **Date Picker** `7188:4717` (custom calendar styled to match) |
| Scope options | **Group Item** `7109:1053898` (checkbox, icon-first) |
| "Penyakit yang diuji" | **Accordion Item** `4809:145204` |
| Disease choices | **Checkbox** `3627:191448` (size sm) |
| Sample sliders | **Slider** (8 px track, 20 px ring thumb, value bubble) |
| Tinjau summary | **Badge Group** `2877:101030` (size lg, leading) |
| Clear confirmation | **Alert Dialog** `6147:38740` (destructive, stacked-left) |
| Farm list | **Dialog** `6158:74965` + **Table** (header 48 / row 52 / 13 px) |
| Toast | **Toastr** with compact **Alert** `4512:210671` |
| Buttons | **Button** `2826:41666` (sm; xs inside popovers) |
| Tiles | **Icon Tile** `3764:193398` |
| Title text | Text style **Label/Default-label** (Rubik Medium 16/24, −1 %) |

### Gaps / deviations to resolve with the design system

1. **Segmented control** (period type, scope type) — no DS component. Currently a custom pill group; candidate for a new DS component.
2. **Stepper** — the mockup draws its own; the DS has **Stepper Horizontal**, which should replace it.
3. **−/+ buttons** — should use the DS **Icon Button**; **number input** should use the DS **Input**.
4. **Group Item with icon + trailing checkbox inside a popover** — composed manually; confirm this variant exists or is acceptable.
5. **Accent / category colours** were tried and removed; Badge Group uses status tokens (info, warning, neutral, brand, success).
6. **Bottom sheet** (mobile) — no DS component; custom.
7. The mockup is plain HTML + CSS replicating the components' specs, **not** the React components themselves. A Storybook prototype using the real components is the right next step before build.

## 12. Accessibility

- All custom dropdowns are `button` triggers with `aria-haspopup`/`aria-expanded`; panels use `listbox` / `option` (`aria-multiselectable` for multi) with arrow-key, Home/End, Esc and Tab handling; focus returns to the trigger.
- Calendar: arrow keys move by day/week, month buttons are labelled, selected day is `aria-pressed`.
- Sliders have an `aria-label` per sample type and a paired number input (precise entry).
- Accordion uses a real button with `aria-expanded`/`aria-controls`; panel is a labelled region.
- Dialogs use the native `<dialog>` element (focus trap, Esc, inert background). The destructive dialog focuses **Batal** first.
- Step changes move focus to the page heading and announce via the changed subtitle. Footer summary and counters use `aria-live="polite"`.
- Tables have captions and scoped headers; mobile card layout keeps the label/value pairing.
- Focus rings use the brand ring colour; `prefers-reduced-motion` disables transitions.
- Open item: verify contrast of the brand-coloured text on `status-brand-bg` (orange on light peach) and of the small (10 px) badges.

## 13. Open questions (need a product decision)

1. **Per-farm vs shared counts.** Does "Udang 2" mean 2 per farm (current) or 2 in total split across farms?
2. **Limit of 50.** Is it **per sample type** (current: up to 350 per farm) or **per farm in total**?
3. **Disease scope.** Is "Penyakit yang diuji" per plan (current), per farm, or per sample type?
4. **"Realisasi periode lalu".** What exactly is it — samples actually received/tested last period? For **Mingguan** and **Per tanggal**, what is "last period" (previous week / previous day / same period last month)? The mockup uses one fixed number per farm.
5. **Week definition.** Weeks are 7-day blocks from the 1st (1–7, 8–14, …). Should they be ISO/calendar weeks (Mon–Sun) instead?
6. **Per tanggal.** One date only, or a date range?
7. **Selectable years / past periods.** Is planning for a past or current period allowed? What is the default period (mock: November 2026)?
8. **Region / Province multi-select.** Currently single choice. Should multiple be allowed?
9. **Large scopes.** A region can contain many farms. Is there an upper bound on farms in a plan, and should the Tinjau screen list farms (currently only totals; the farm list is reachable only in Step 1)?
10. **Duplicates and conflicts.** What happens if a plan already exists for the same farm + period? Overwrite, block, or merge?
11. **Permissions.** Which farms may a user plan for? Does the farm picker need to be restricted by role/organisation?
12. **Submit and afterwards.** Confirmation content, success screen, can a plan be edited/cancelled, notifications, status lifecycle (draft / submitted / approved)?
13. **Drafts.** Should an unfinished plan be saved automatically (the app header in other CeKolam flows shows "Draft tersedia · perubahan Anda disimpan secara otomatis")?
14. **Zero-sample submit.** Currently impossible (blocked until ≥ 1 sample). Confirm this is desired.

## 14. Acceptance criteria

| # | Given / When / Then |
|---|---|
| AC-1 | **Given** Step 1, **when** I choose *Mingguan* and a month with 28 days, **then** week 5 is disabled and, if week 5 was selected, the selection moves to week 4. |
| AC-2 | **Given** Per Tambak, **when** I select 5 farms, **then** the remaining options are disabled and the counter shows "5 dari 5 dipilih · batas tercapai". |
| AC-3 | **Given** the multi-select is open with changes, **when** I press Esc or click outside, **then** the scope is unchanged; **when** I press Apply, **then** the scope updates. |
| AC-4 | **Given** Per Region = Jawa (6 farms) and per-tambak total 26, **then** "Seluruh cakupan" = 156 and the footer shows "6 tambak · 156 sampel". |
| AC-5 | **Given** a count field, **when** I type 80, **then** it becomes 50; **when** I clear it, **then** it becomes 0. |
| AC-6 | **Given** no scope, **then** the right panel shows the empty state, the "N tambak" button is disabled, and Lanjut is disabled with the hint "Pilih cakupan tambak dulu". |
| AC-7 | **Given** scope set and all counts 0, **then** Lanjut is disabled with "Isi minimal satu jenis sampel untuk lanjut", and the disease accordion is disabled. |
| AC-8 | **Given** counts entered, **when** I click Kosongkan, **then** the destructive dialog appears with Batal focused; Esc/Batal changes nothing; confirming clears counts and diseases but keeps period and scope. |
| AC-9 | **Given** a valid plan, **when** I click Lanjut ke Tinjau, **then** Step 2 shows read-only Badge Groups, the metric strip, the per-type table (count × farms) and disease chips; stepper step 1 shows a check. |
| AC-10 | **Given** Tinjau, **when** I click Kembali ubah, **then** Step 1 shows all previous values. |
| AC-11 | **Given** previous total 20 and new total 12, **then** Perubahan shows "−8" and "Turun 40%". |
| AC-12 | **Given** a viewport ≤ 640 px, **then** Periode and Cakupan appear as one summary card that opens a bottom sheet, and tables render as cards. |
| AC-13 | **Given** only a keyboard, **then** every control (dropdowns, calendar, sliders, accordion, dialogs) is reachable and operable, and focus is never lost after closing an overlay. |

## 15. Decision log (how the design got here)

| Decision | Reason |
|---|---|
| Replaced search + Region/Provinsi/Tambak filters with a **scope selector** styled like Periode | Jason wants users to *choose* a planning scope (region, province, or up to 5 farms), not filter a list. |
| Farm picker is a **multi-select with search, max 5** | Keeps single-farm planning fast and bounds the plan size. |
| Replaced per-farm cards with **one plan applied to all farms** | Planning per farm does not scale; scope already defines the farms. |
| **Per-sample-type sliders (0–50)** replace a single count + sample-type choice | Breakdown by type is what the lab needs; only disease is optional. |
| Slider keeps **−/+ and a number box** | Precise entry and fine adjustment alongside the slider. |
| Tinjau shows **read-only totals** (Badge Groups, metric strip, per-type table) | Easy to scan, including on mobile; shows last period vs now. |
| **Alert Dialog** for Kosongkan | Destructive and irreversible; follows the DS confirm pattern. |
| Farm list moved into a **Dialog** behind the "N tambak" button | Keeps the main panel focused on the form while still allowing detail on demand. |
| Mobile uses a **bottom sheet** for Periode and Cakupan | The form (sliders) stays first on a small screen. |
| CeKolam **brand mode** via `theme.css`, CeKolam logo | CeKolam's primary colour differs from Nusantics. |

## 16. Prototype notes and known limitations

- Files: `cekolam-demand-planning-mock.html`, `demand-planning.css`, `demand-planning.js`, `shell.css` (copy of the Nusantics shell styles), `assets/`. The page links `packages/helix-design-system/src/styles/theme.css`, so it must stay inside the repo's `src/` folder (or copy `theme.css` next to it).
- State is in memory only; reload resets to defaults (period November 2026; Per Tambak with *Tambak Bina Mina* and *Tambak Wira Sentosa*; Udang 2, Benur 4; WSSV, IMNV).
- Sidebar, user and organisation are static mock content.
- Verified in Chrome (desktop and a 500 px width) by screenshot and scripted interaction; not tested in Safari/Firefox or on real devices.
- Step 3 (Submit) is intentionally absent.
