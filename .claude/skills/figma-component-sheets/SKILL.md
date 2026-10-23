---
name: figma-component-sheets
description: "Characteristics of the Sheets component set (node 7204:3937, Sheets page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Sheets via use_figma."
---

# Sheets — Component Characteristics

Node `7204:3937` on the **Sheets** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Sheet is an edge-anchored overlay panel (Left/Right side panel or Top/Bottom bar) built on Content Container, shown on a 1280x768 dimmed overlay frame like Dialog. Use for secondary tasks, detail views, or forms that slide in from a screen edge while keeping the page behind visible. Do not use for a centered modal task — use Dialog, or Alert Dialog for a simple confirm.

## Variant axes & properties

- `Side`

## Structure, tokens & known gotchas

Side picks the edge. Header, Body (Container Content) and Footer are Content Container slots — drill into the nested Content Container instance to swap them.
