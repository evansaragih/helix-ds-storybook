---
name: figma-component-meta-badge
description: "Characteristics of the Meta Badge component set (node 7174:191020, Meta Badge page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Meta Badge via use_figma."
---

# Meta Badge — Component Characteristics

Node `7174:191020` on the **Meta Badge** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Labeled reference/ID display: an icon plus a label (e.g. Submission ID) and a value (e.g. RCP-2026-a7f3c8d1). Use for showing a reference code or identifier somewhere in the UI — a form confirmation, a detail panel, a status row. Do not use for a generic status indicator with no identifier value — use Badge instead.

## Variant axes & properties

- `Appearance` (SnippetCard=default, ReferenceCard, Simple, Info Pill)

All four values render the same content (icon + label + value) in different containers — confirmed by screenshotting every variant, not guessed from names:
- `SnippetCard` — white card, icon in a soft tile, label and value stacked on two lines.
- `Simple` — single-row peach pill, plain icon, label and value inline. The plainest treatment.
- `Info Pill` — two-tone compound pill: peach icon+label zone attached to a white value chip.
- `ReferenceCard` — vertical card: white header with icon+label, solid orange footer bar holding the value.

## Structure, tokens & known gotchas

Oct 2026: flagged in a component audit — D3 was Blocking because one Appearance value was literally named `Meta Badge`, duplicating the component set's own name, with zero description to explain whether that was intentional or four unrelated patterns bundled together. Screenshotting all four confirmed they're genuinely one semantic pattern in four skins (not unrelated components), so the `Appearance` axis itself is sound — only the self-named value was the problem. Renamed `Meta Badge` → `Simple` (confirmed with the user; picked to avoid colliding with `Info Pill`'s own "Pill" wording). D9 was also Blocking (empty description) — fixed with the per-appearance breakdown above.

No code exists anywhere in the monorepo for this component (confirmed via grep) — net-new target once Figma-side clarity landed.
