---
name: figma-component-input
description: "Characteristics of the Input component set (node 6366:11131, Input page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Input via use_figma."
---

# Input — Component Characteristics

Node `6366:11131` on the **Input** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Single-line text input field with a static (non-floating) label. Use for standard form fields needing a fixed label, leading/trailing icon or text, and an optional hint/error message. Do not use for multi-line text — use Input Text Area. Do not use for a floating-label style — use Input Floating. Do not use for fixed-length code entry — use Verification Code Input Field.

## Variant axes & properties

- `State`
- `Filled`
- `Floating`
- `Layout`

## Structure, tokens & known gotchas

Sep 2026: added Layout axis, deriving from _input-field base's Layout=Horizontal variant. Only built for Floating=False (5 State variants, Filled=False only). Error variant overrides the nested Field Message's State to Error.

## `_input-field base` State x Filled (since 2026-10-20, Basic only so far)

`Input Field` (node 3096:136240, renamed from `_input-field base` on 2026-10-20; description rewritten the same day) gained `State` (Default / Hovered / Focused / Error / Disabled) and `Filled` (False / True) axes. Only `Appearance=Basic` has all 10 combos; Floating and Textarea exist only as `State=Default, Filled=False` (a partial matrix on purpose, staged rollout).
- Basic's `Content` is now a plain frame, not a SLOT (Floating and Textarea still have the `Content#6349:0` slot). The text is edited by drilling in; Filled=True shows "This is filled text" (Text/Default, Disabled uses Text/Subtler).
- State tokens: stroke Subtle / Hover / Secondary/Focused (+ effect style `Outline Shadow/Secondary`) / Error / Subtle, fill Surface/Default except Disabled = Surface/Disabled.
- Done 2026-10-20: Input `Floating=False` (Vertical 10 + Horizontal 10 variants) now set `State` / `Filled` on the nested base instead of overriding stroke/fill/effect. Recipe that worked: `inst.resetOverrides()` (instance level only, no per-node reset exists), then `setProperties({...previous non-slot props, State, Filled})`, then re-apply the box's prior `layoutSizingHorizontal` (reset drops the FILL override and the box shrinks to 108). Exclude the `Content#...` SLOT key from `setProperties`.
- Visible change: Horizontal `Filled=True` now shows "This is filled text" (it used to show "Placeholder"), and its box is 185 wide instead of 180.
- Done 2026-10-20: base `Appearance=Floating` now has the full State x Filled matrix (10 variants), and Input `Floating=True` (10 variants) uses it via the same reset recipe (also re-apply FILL on `_text-field-floating`, `Container`, `Input` after reset). Floating's Content is now a plain frame (slot removed), same as Basic.
- Floating Filled rule (chosen over copying the old inconsistent variants): Filled=False = a single large Placeholder in every State; Filled=True = floated caption "Placeholder" (Caption/Caption-badge, Text/Subtlest) + value "This is filled text" (Text/Default; Text/Error in Error; Text/Subtler in Disabled). Container effect: Focused = `Outline Shadow/Secondary`, Error = `Outline Shadow/Danger`. This changed 4 Input Floating variants (Hovered/Focused/Disabled/Error x Filled=False) from "floated label + placeholder" to a single placeholder.
- Instance trees omit nodes hidden by a `Show ...` boolean (e.g. `_leading content medium` is absent, not hidden); `findOne` by name returns null for them.
- The base set is now ~1780px wide: it must stay clear of the Input set on the canvas (moved left to x=-1755). Widening a set or its neighbours can make one overlap the other.
- Done 2026-10-20: base `Appearance=Textarea` has the full State x Filled matrix (10 variants, same token rules as Basic: no shadow on Error, `Outline Shadow/Secondary` on Focused, Disabled fill Surface/Disabled; Filled text "This is filled text content that the user has typed."). Text Area's 10 variants now set State/Filled on the nested base. Before this, every Text Area State rendered the same box (all Surface/Default + Stroke/Subtle); only Disabled text differed.
- The orphan `Content#6349:0` SLOT property was deleted from the base once no variant had a slot left. The base is now 30 variants (3 Appearance x 5 State x 2 Filled), 0 slots; no consumer has stroke/fill/effect overrides left.
- Input `Layout=Horizontal` Filled=True variants were widened 249 -> 254 to stop clipping the 185px box.
- Remaining known issues (not touched): Field Message stays State=Default in Input Error variants (hint not red); the BACKUP Input set nests the LIVE base, so it only keeps the old look through its own overrides and is a reference, not a rollback.
- Backups of the pre-change base and Input are on the Input page (BACKUP 2026-10-20 ...).
- Filled=True variants hug their text (185 wide) while Filled=False keeps the 92px fixed placeholder (180 wide).

## `Field` (node 6366:11131, formerly `Input`) is now a wrapper (2026-10-20)

- The set was renamed Field and reduced from 30 variants to **2**: `Layout=Vertical` (6366:11132) and `Layout=Horizontal` (6806:177977). `State`, `Filled` and `Floating` axes were removed; they live on the nested `Input Field`.
- Structure: Header (Label Row, optional Description, `Trailing Content` slot), a `Content` SLOT whose default content is an `Input Field`, and a `Field Message`. New boolean `Show Label` (default on) hides the Header; it replaces `Floating=True` (floating label = Input Field `Appearance=Floating` + Show Label off).
- All 52 Field instances in the file were moved to the 2 variants. 15 host components were compared byte-for-byte against a baseline before and after: identical. Procedure and pitfalls are in `figma-component-build` ("Migrating instances off a variant axis").
- A second component set is also called "Field" (heading + Items stack, Field page 6065:218059). Name collision left on purpose for now; rename one of them when decided.
- The BACKUP Field set (7758:2549) and the Input/base backups are on the Input page; delete once happy.
- Code follow-up: `Input.tsx` / `TextArea.tsx` and any field wrapper in code need the same split (Field wrapper vs InputField with state), plus the Action Bar items.

### Field consumers tidied by context (2026-10-20)

- New boolean `Show Hint` (default on) binds the Field Message visibility, next to `Show Label`. Every Field instance in the file used to render the full Label row + hint (88px tall) regardless of context, because the old Input always carried them; that is why consumers looked broken.
- Applied (Show Label / Show Hint off, i.e. input box only, 36px): Pagination inline inputs, `_popover-trigger` Type=Input and Input-Floating, Popover List Header search field, all Date Picker / DateTime / Time / Range / _calendar / _date-picker-base inputs, the 6 Sort-row fields of Section Header and Toolbar Filter.
- Kept with a label (Show Label on, hint off, Show Trailing Content off): Popover variants Trigger=Input+Label and Trigger=Input Horizontal (Select inherits). File Upload Basic keeps label and hint.
- A Field instance can still point to a "ghost" copy of a deleted variant (name `Field/Hovered/False/True/Vertical`, parent none). `swapComponent` fails with "would create a cycle"; `instance.resetOverrides()` on it returns it to the host's own survivor variant, then set State on the nested Input Field.
- Still broken (needs manual repair in the Figma UI): 5 ghost instances, 1 on the Navbars page (MacBook Air - 1 sample list), 1 on Filters ❌ and 3 on Lists ❌. Their inner nodes were corrupted by the earlier host swaps and scripts cannot traverse them.

### Context text for Field consumers (2026-10-20)

Text was changed per context (instance-level text overrides on the nested Input Field / Label property), not in the components:
- Pagination: page jump inputs = `1`, Rows per page = `10` (Filled=True); typo "Row s per page" fixed.
- Popover / Select triggers: label `Assignee`, placeholder `Select assignee`, floating caption `Assignee`, search `Search people` for people lists; `Team` / `Select teams` / `Search teams` for Selection=Multi (department lists).
- Section Header and Toolbar Filter Sort rows: (Project, Ascending), (Status, Ascending), (Created date, Descending); project search `Search project`.
- Date pickers: time inputs `09` : `30` : `AM`.
- File Upload (rebuilt to the designer's reference, 2026-10-20): Basic and Floating, all States. Nested Input Field has leading icon `react-icons/io5/IoCloudUpload` (imported by key `299b00da...`) and trailing content: Filled=False = Type=Button with Button Secondary/Outline xs and text `Browse` (Button Swap), Filled=True = Type=Trailing Icon with `react-icons/io5/IoCloseCircle`. Texts `No file chosen` (Text/Subtlest) / `document.pdf`, label `Attachment`, Floating shows caption `Attachment` + value in both Filled states (base Filled=True, value recoloured). Field is FIXED 280 (Basic) / 320 (Floating) wide, Content frame `layoutGrow=1` so the trailing item sits at the right, hint hidden except Error (`Max file size is 10 MB.`).
- Gotchas: the `_popover-trigger` Type=Input main drives every instance of the trigger, so its default text leaks into Pagination (page jump) — override per context. Long placeholders wrap at the base's fixed 92px width; set `textAutoResize = 'WIDTH_AND_HEIGHT'` on the overridden text. Nested traversal (`findAll` through instance chains) sometimes returns nothing for a whole call; retry in a fresh call or search from `page.findAllWithCriteria`.
- Open: the Date Picker set (7188:4717) renders the year button as "Button" (no chevron) in the screenshot service although the plugin reads `2026` + chevron; the set was not baselined, cause unknown.

- Pitfalls hit while rebuilding File Upload: the value text is the last TEXT inside the **Content frame**, not the last TEXT of the base (that is the trailing Button's text); resizing a Field inside a variant makes variants overlap, so re-grid the set from measured extents; after setting `Type=Button` the nested Button defaults to Size md in the medium trailing content, set `Size: 'xs'` explicitly.
- Date pickers: time inputs were narrowed to 64px each so the row fits the 276px picker.

## Appearance=OTP on the Input set (2026-10-20)

The Input set (3096:136240, the box set also called Input Field) has one more variant: `Appearance=OTP, Layout=Vertical, State=Default, Filled=False` (31 variants). It is a vertical frame holding a SLOT `Content` (horizontal, `Spacing/8` gap) whose default content is four `_otp-input-field-base` instances (216 wide, same as the 4-digit Verification Code Input Field). Longer codes: add digit boxes inside the slot. Per-digit states: swap a box for `_otp-input-field` (State Default/Filled/Focus/Disabled/Error).
- Only one OTP variant by design (no 4-digit / 6-digit-split pair, no State x Filled matrix). Label and hint come from the Field wrapper (set the nested Input to Appearance=OTP).
- Built with `createComponent()` + `createSlot()` and `inputSet.appendChild()`, which created the single `Content` SLOT property on the set; existing variants are untouched.
- Open: `Verification Code Input Field` (3496:179439, 2 variants) and `_otp-input-field` (3494:179408) now overlap with this; decide whether to retire the Verification Code Input Field. Deprecated `Input OTP` (78:6288) lives on the OTP Inputs page.
