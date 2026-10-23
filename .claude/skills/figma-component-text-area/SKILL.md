---
name: figma-component-text-area
description: "Characteristics of the Text Area component set (node 6437:1032, Input page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Text Area via use_figma."
---

# Text Area — Component Characteristics

Node `6437:1032` on the **Input** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Multi-line text field for longer free-form input (descriptions, comments, notes). Use for content that may span multiple lines and benefits from a resizable box. Do not use for single-line values — use Input instead.

## Variant axes & properties

- `State`
- `Filled`

## Structure, tokens & known gotchas

Built on the same _input-field base sub-component as Input (Appearance=Textarea), so Label/Hint/Required toggle via that nested instance's boolean properties rather than being baked into variants. The resize handle (bottom-right) is controlled by the base's Show Resize property.
