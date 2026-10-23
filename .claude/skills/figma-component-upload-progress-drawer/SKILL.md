---
name: figma-component-upload-progress-drawer
description: "Characteristics of the Upload Progress Drawer component set (node 7174:156776, Dropzone page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Upload Progress Drawer via use_figma."
---

# Upload Progress Drawer — Component Characteristics

Node `7174:156776` on the **Dropzone** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

A collapsible upload progress drawer: header (title + file-count Badge + expand/collapse Icon Button), a Progress Bar with Cancel action, and — when State=Open — a scrollable list grouping files by status (Menunggu/Gagal/Berhasil) using List Item rows, built on Content Container's Header/Body/Footer slots. Use for tracking multi-file upload progress (e.g. FASTQ sample upload). Do not use for a single inline upload control — use Dropzone instead.

## Variant axes & properties

- `State`
