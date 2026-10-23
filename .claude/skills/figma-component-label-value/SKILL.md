---
name: figma-component-label-value
description: "Characteristics of the Label Value component set (node 6765:1263, Label Value page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Label Value via use_figma."
---

# Label Value — Component Characteristics

Node `6765:1263` on the **Label Value** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Read-only label/value display row. Use for showing static data (replaces disabled input fields). Do not use for editable data — use Input instead.

## Variant axes & properties

- `Label#6765:0`
- `Value#6765:3`
- `Show Label Suffix#6765:6`
- `Show Value Suffix#6765:9`
- `Label Suffix#6765:12`
- `Value Suffix#6765:15`
- `Layout`
- `Size`

## Structure, tokens & known gotchas

To show several side by side (e.g. Sample ID / Analisis), place multiple Layout=Vertical instances inside a parent auto-layout row — no separate grid component needed.
