---
name: figma-component-lightbox
description: "Characteristics of the Lightbox component set (node 6928:702, Lightbox page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Lightbox via use_figma."
---

# Lightbox — Component Characteristics

Node `6928:702` on the **Lightbox** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Full-size lightbox preview for a photo — a dark scrim overlay with a close button and optional prev/next navigation (Show Navigation toggle). Layout=Image / Image with Caption / Gallery Strip. Standalone overlay primitive, same tier as Dialog/Alert Dialog — reused by Carousel via a click-to-open prototype reaction, but not owned by it. Use for previewing any image at full size. Do not use for confirmation/form content — use Dialog or Alert Dialog instead.

## Variant axes & properties

- `Show Navigation#6928:0`
- `Layout`
