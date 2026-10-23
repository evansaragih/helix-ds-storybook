---
name: figma-component-alert
description: "Characteristics of the Alert component set (node 4512:210671, Alert page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Alert via use_figma."
---

# Alert — Component Characteristics

Node `4512:210671` on the **Alert** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Proposed Alert redesign — Layout (Card / Compact / Card w/ Buttons) x Status (Default/Info/Success/Warning/Error), tinted icon-badge accent on a neutral card. Added alongside the existing _alert component set for review; not yet wired to code.

## Variant axes & properties

- `Layout`
- `Status`

## Action row uses Action Bar (since 2026-10-19)

The `Actions` frame was replaced by an `Action Bar` instance (node 4872:215516) in 16 of 17 variants that have an action row:
- Compact (6): `Placement=Inline, Actions=2` — Dismiss (Secondary/Outline) + View changes (Primary/Solid; Destructive on Status=Error).
- Card, Card w/ Link, Card w/ Buttons Status=Error (10): `Placement=Footer, Right aligned, Actions=2` with both buttons overridden to Appearance=Link (Underline as before).
- Not converted: `Layout=Card w/ Buttons, Status=Default` (4512:1202) — stacked full-width buttons, pending a design decision.
- Button text is overridden to **Dismiss / View changes** on every instance; the Action Bar default (Cancel / Confirm) must never show through. Keep any new Alert action row on the same text.
- Gap on link rows is now Spacing/12 (was 16 on Card, 12 elsewhere). Card w/ Link Status=Default still uses Underline=Always, the rest OnHover.
- Only 4 Alert instances exist in the file (Compact Default on the Alert page), none with overrides; scanned 2026-10-19.
