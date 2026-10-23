---
name: figma-component-accordion-item
description: "Characteristics of the Accordion Item component set (node 4809:145204, Accordion page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Accordion Item via use_figma."
---

# Accordion Item — Component Characteristics

Node `4809:145204` on the **Accordion** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Accordion Item is a single collapsible trigger+content row (question/answer, FAQ, expandable section) built on _accordion. Use for stacked expand/collapse rows where only relevant sections need showing. Do not use for a single always-visible header+body block — use Content Container instead.

## Variant axes & properties

- `State`

## Structure, tokens & known gotchas

Built on _accordion (node 21:1311), State variants Closed/Hover/Focus/Disabled. CAUTION: reparenting existing nodes across an instance's slot boundary (e.g. moving the trigger/content frames into a Content Container instance's slots) has been observed to silently strip componentPropertyReferences (boolean show/hide, TEXT bindings) on the moved nodes, and can destroy content entirely if a script errors mid-move. If rebuilding this component's shell, create fresh content inside the new instance's slots rather than moving the original live nodes — verify with instance.setProperties() + a screenshot afterward, not just visually.
