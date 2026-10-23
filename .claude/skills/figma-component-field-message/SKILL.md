---
name: figma-component-field-message
description: "Characteristics of the Field Message component set (node 6795:1417, Input page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Field Message via use_figma."
---

# Field Message — Component Characteristics

Node `6795:1417` on the **Input** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Standalone hint/error text row for form fields, separated from Input's own baked-in hint. Use for supporting text or validation feedback below or beside any field. Do not use for group-level messaging - use Field's own Show Error/Show Supporting Text instead.

## Variant axes & properties

- `Show Icon#6795:0`
- `State`
- `Size`

## Structure, tokens & known gotchas

Show Icon toggles a leading plain glyph (react-icons FiInfo, 14px, Colors/Icon/Onsurface/Secondary default or Colors/Icon/Error) — a static icon, not a Tooltip trigger. Text always stays visible regardless of the toggle.
