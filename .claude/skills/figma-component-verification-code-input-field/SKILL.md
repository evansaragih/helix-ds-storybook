---
name: figma-component-verification-code-input-field
description: "Characteristics of the Verification Code Input Field component set (node 3496:179439, Input page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Verification Code Input Field via use_figma."
---

# Verification Code Input Field — Component Characteristics

Node `3496:179439` on the **Input** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Verification code molecule, matching Origin's reference (71:8315). Layout(4-digit / 6-digit-split). Composed from live Mega input field digit instances (State=Default). Label 'Secure code' + hint text below.

## Variant axes & properties

- `Layout`

## Structure, tokens & known gotchas

Sep 2026: hint text now nests a Field Message instance (State=Default, Show Icon=false) instead of a raw text node.
