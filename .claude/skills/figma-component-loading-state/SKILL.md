---
name: figma-component-loading-state
description: "Characteristics of the Loading State component set (node 7278:68630, Loading States page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Loading State via use_figma."
---

# Loading State — Component Characteristics

Node `7278:68630` on the **Loading States** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Loading placeholder for a list, table, card or whole section while data loads. Type=Spinner is a centered spinner with a short message, for waits where the final layout is unknown. List, Card and Table are skeleton layouts that mirror the final content to avoid layout shift. Size=Default is section scale; Size=Compact is tighter. Do not use for a full-page initial load — use Page Loader instead; do not use when there is no data after loading — use Empty State instead.

## Variant axes & properties

- `Label#7278:0`
- `Supporting Text#7278:5`
- `Type`
- `Size`
