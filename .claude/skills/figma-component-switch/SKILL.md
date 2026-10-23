---
name: figma-component-switch
description: "Characteristics of the Switch component set (node 68:210082, Switch page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Switch via use_figma."
---

# Switch — Component Characteristics

Node `68:210082` on the **Switch** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Binary on/off toggle that applies immediately (no separate save/confirm step). Use for a single independent setting — notification preferences, feature flags, visibility toggles. Do not use for selecting one option from a mutually exclusive set — use Radio Button instead; do not use for a form field that needs explicit confirmation before it takes effect — use Checkbox instead.

## Variant axes & properties

- `Size` (Small=default, Medium)
- `Content` (Label / None=default / Label+Description)
- `State` (Unchecked / Checked / Disabled / Invalid / Unchecked-Hover / Checked-Hover / Unchecked-Focus / Checked-Focus)
- `Show Feedback#1231:1` (BOOLEAN)

## Structure, tokens & known gotchas

Oct 2026: flagged in a component audit — D9 (usage guidance) was Blocking, description was completely empty despite the variant set itself being clean (D3 Aligned) and code (`Switch` in `helix-design-system`) being the best-matched parity case checked that day (Size/Content/Show Feedback/State all map cleanly to props). Fixed by writing the what-is/when-to/when-not-to description — no structural changes needed, this component was otherwise in good shape.

Code has one extra not represented in Figma's variant set: `labelPlacement` (leading/trailing) — a reasonable code-side enhancement, not a gap to close here.
