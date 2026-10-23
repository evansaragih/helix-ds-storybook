---
name: figma-component-avatar
description: "Characteristics of the Avatar component set (node 12:2016, Avatar page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Avatar via use_figma."
---

# Avatar — Component Characteristics

Node `12:2016` on the **Avatar** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Avatar with optional corner overlay. 'Status' shows a presence dot (online indicator); 'Company logo' shows a small logo/icon tile. These two booleans are intended to be mutually exclusive — enable only one at a time per instance.

## Variant axes & properties

- `Status#4101:0`
- `Company logo#4101:61`
- `Content`
- `Size`
- `Shape`
- `Border`
