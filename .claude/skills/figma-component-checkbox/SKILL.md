---
name: figma-component-checkbox
description: "Characteristics of the Checkbox component set (node 3627:191448, Checkbox page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Checkbox via use_figma."
---

# Checkbox — Component Characteristics

Node `3627:191448` on the **Checkbox** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

A labeled checkbox row (control + label + optional supporting text). Use for a single binary on/off selection in a form or list. Do not use for a toggle that takes effect immediately — use Switch instead.

**Code:** `Checkbox from helix-design-system`

## Variant axes & properties

- `Supporting Text#3627:2`
- `Label#3627:7`
- `Checked`
- `Size`
- `Show Label`
- `Show Supporting Text`
- `State`

## Structure, tokens & known gotchas

Updated 2026-09-12: renamed properties for consistency with the file-wide vocabulary. TEXT props _Label Text -> Label, _Secondary Text -> Supporting Text (underscore prefix is reserved for internal/base component names, not properties). Their paired visibility booleans renamed too: Text -> Show Label, Supporting text -> Show Supporting Text. Same key/ID preserved, so existing instances keep their values.
