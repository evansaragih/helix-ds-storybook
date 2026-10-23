---
name: figma-component-carousel
description: "Characteristics of the Carousel component set (node 6925:702, Carousel page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Carousel via use_figma."
---

# Carousel — Component Characteristics

Node `6925:702` on the **Carousel** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Carousel is a slideable set of slides/cards with optional indicator dots and prev/next nav. Layout picks the arrangement (Single, Split Feature, Center Peek, Row Cards, Stack Peek). Use for cycling through featured content, images, or cards in a fixed-size container. Do not use for a full-size image preview with zoom — use Lightbox instead (Carousel can open a Lightbox via a click-to-open prototype reaction, but doesn't own it).

## Variant axes & properties

- `Cards#6925:0`
- `Images#6925:1`
- `Content#6925:2`
- `Show Indicator#6925:3`
- `Show Navigation#6925:4`
- `Layout`

## Structure, tokens & known gotchas

Layout has 5 values, each a differently-shaped slide arrangement (Single/Split Feature/Center Peek/Row Cards/Stack Peek) rather than a cosmetic variant — swapping Layout changes which slots are relevant. Uses the shared `_page-indicator` component (node 6898:702) for the dot indicator row. Reused by Lightbox for a click-to-open-at-full-size pattern (prototype reaction, not a nested instance) — see Lightbox's own description.
