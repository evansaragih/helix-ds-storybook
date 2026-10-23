---
name: figma-component-tooltip
description: "Characteristics of the Tooltip component set (node 3505:179533, Tooltip page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Tooltip via use_figma."
---

# Tooltip — Component Characteristics

Node `3505:179533` on the **Tooltip** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Contextual popup that labels or explains an element on hover/focus. Use for short helper text (Simple), a longer explanation (Two-Block/Detailed) attached to any trigger element. Do not use for content requiring interaction (links, buttons, scrollable lists) - use Popover instead.

## Variant axes & properties

- `Anchor#6442:0`
- `Arrow`
- `Content`

## Structure, tokens & known gotchas

The Anchor property is a real Slot — fill it with the actual trigger element (Button, Icon Button, Input, etc.) instead of leaving the default placeholder dot. Bubble/Arrow visuals come from the nested _Tooltip base instance (id 3347:281).
