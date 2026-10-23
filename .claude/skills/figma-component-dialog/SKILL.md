---
name: figma-component-dialog
description: "Characteristics of the Dialog component set (node 6158:74965, Dialog page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Dialog via use_figma."
---

# Dialog — Component Characteristics

Node `6158:74965` on the **Dialog** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Dialog is the general-purpose modal shell: a dedicated Header (icon + title + description via _modal-header, with a divider below) plus a free-form Body slot for arbitrary content and an optional Footer for actions. Built on Content Container (Content Style=Flush, Header Divider=True). Use for modals that need more than a one-line message - forms, detail views, multi-step content. Do not use for a simple yes/no or destructive confirmation - use Alert Dialog instead.

## Variant axes & properties

- `Layout`

## Structure, tokens & known gotchas

Layout currently has only one value (Default). Header content, Body content, and Footer Actions are free-form slots or nested instances, not exposed as top-level properties — drill into _modal-header, the Container Content slot, or the Action Bar instance (formerly Footer Actions) directly.
