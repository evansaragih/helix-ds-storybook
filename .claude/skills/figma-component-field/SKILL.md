---
name: figma-component-field
description: "Characteristics of the Field component set (node 6065:218059, Field page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Field via use_figma."
---

# Field — Component Characteristics

Node `6065:218059` on the **Field** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Field molecule — heading + stack of form fields (Checkbox/Radio/Input/Switch), grouped under a scannable header. Size(sm/md) scales gap + nested field size. Scope: form-input contexts only, not List Item/nav grouping.

## Variant axes & properties

- `Heading#6065:3`
- `Items#6065:4`
- `Show Required#6065:5`
- `Show Error#6065:6`
- `Error Text#6065:7`
- `Show Supporting Text#6069:0`
- `Supporting Text#6069:3`
- `Show Info Icon#6452:0`
- `Show Trailing Action#6452:3`
- `Show Counter#6452:6`
- `Counter Text#6452:9`
- `Size`

## Structure, tokens & known gotchas

Header row is Hug-width, not Fill — Info Icon/Counter/Trailing Action sit inline after the heading, not edge-aligned; a Fill-width row would be needed for a true right-aligned trailing action, not built yet. Show Trailing Action's Button(Link) label is fixed per instance — override the nested _button base's Text# property directly, Button doesn't expose Text through its own variant properties. Items is a real SLOT (cloned+rebound, figma.createSlot() not in plugin API).
