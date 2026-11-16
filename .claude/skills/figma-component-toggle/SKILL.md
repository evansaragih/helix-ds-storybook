---
name: figma-component-toggle
description: "Characteristics of the Toggle component set (node 8602:903, Toggle page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Toggle via use_figma."
---

# Toggle — Component Characteristics

Node `8602:903` on the **Toggle** page (`8598:901`, dedicated page under MOLECULE,
own section, not shared with Tab), Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Segmented toggle/switch between exactly 2 options (e.g. Bulanan/Mingguan) — structurally fixed at 2, not an open list, by design: `Selected` variant only has `Left`/`Right`, there is no slot to add a 3rd option. Use for a fixed 2-way mode switch. Do not use for 3-plus options or real page/section navigation — use Tabs Horizontal instead; do not use for a single on/off choice — use Switch instead.

## Variant axes & properties

- `Selected` (Left=default, Right) `Size` (md=default, sm; added 2026-11-10) and `Surface` (Light=default, Dark; added 2026-11-10). `Size=md` is the original 46px toggle (4px padding, 36px segments). `Size=sm` is 36px tall: 2px padding and gap (Spacing/2), 30px segments, so it can sit in a 36px row such as Marketing Navbar. No TEXT properties exposed at this level (see gotcha below).

Its base `_toggle-item` (same page, node `8613:1019`) has its own full property set: `State` (Default/Hover/Selected/Disabled/Focused), `Size` (md = 36px, sm = 30px fixed height, vertical padding Spacing/4), `Label` (TEXT), `Icon` (BOOLEAN) + `Icon Type` (INSTANCE_SWAP, default House), `Badge` (BOOLEAN).

## Structure, tokens & known gotchas

**Revision history, read before touching this — two corrections so far, both from the same user:**

1. First built reusing Tabs Horizontal's own `_tab-item-horizontal` directly, merged onto the Tab page, open `Body` frame (any number of segments). Rejected: wanted a fully separate component, not coupled to Tab, with the 2-option limit enforced structurally.
2. Rebuilt on a new dedicated page with its own base `_toggle-item` — but that first version of the base only had 2 states (Default/Selected) and no Icon/Badge support, a stripped-down subset of the real `_tab-item-horizontal`. Rejected again ("masa cuma simple gitu aja") — wanted full state/feature parity with the real base, just as an independent component. **Rebuilt `_toggle-item` a second time** with all 5 states and Icon/Badge/Icon Type support, matching `_tab-item-horizontal`'s `Appearance=Contained, Size=Small` variants exactly (same fill/stroke/opacity per state, same Icon wrapper component `House` at `Format=Outline, Weight=Fill`, same real `Badge` instance `Color=Brand, Size=sm, Appearance=Subtle`), then swapped `Toggle`'s `Option Left`/`Option Right` instances onto this new base via `swapComponent()` (Icon/Badge set `false` for Toggle's own plain-text use case, both still available per-instance if a richer segment is ever needed).

**Lesson: "samain" (make it the same) means full parity, not just the visually-obvious part.** The first base rebuild matched the *look* of Default/Selected correctly but silently dropped Hover, Disabled, Focused, and the whole Icon/Badge feature surface — technically a working 2-state toggle, but not actually the same base. When told to match a reference component, enumerate its **full** `componentPropertyDefinitions` and all variant combinations up front, not just the 1–2 states visible in whatever screenshot prompted the task.

State styling (on `_toggle-item`): Default = no fill/stroke, grey text (`Colors/Text/...` `5198:355`). Hover = `5198:386` fill (light grey), same grey text. Selected = `Colors/Surface/Default` white fill, bold brand-orange text (`VariableID:1:2010`). Disabled = no fill, `opacity: 0.5` on the whole item. Focused = no fill, visible stroke at `VariableID:5198:213334` with **paint-level** `opacity: 0.7` (not node opacity) — a focus ring, not a fill change.

**Gotcha, confirmed not worth fighting (unchanged from before):** cannot expose `Label Left`/`Label Right` as TEXT properties on the `Toggle` set itself — `Cannot set component property references on instance sublayer` (same restriction as Group Item/Dashboard Navbar: no binding new properties onto content inside a nested INSTANCE). Tabs Horizontal doesn't expose per-item label properties at its own top level either, so leaving Toggle's option text as a per-instance override (drill into `Option Left`/`Option Right`) matches the file's own convention, not a workaround.

No code exists yet for this component — Figma-only as of this build.


## Size axis (2026-11-10)

Added by renaming the 2 Toggle variants and 5 `_toggle-item` variants to `... , Size=md` and cloning them to `Size=sm` (no slots in either set, so scripted `clone()` is safe here, unlike sets with slots). Things that bit:
- `clone()` drops every component-property reference on the copy (Icon `visible` + `mainComponent`, Label `characters`, Badge `visible`). Re-bind them by assigning `componentPropertyReferences` on each child, then diff against the md variant.
- Toggle `Size=sm` options are swapped (`swapComponent`) to `_toggle-item State=…, Size=sm`; after the swap the nested options came out `FIXED` wide and had to be set back to HUG (height stays FIXED 30, since 30 comes from the item's fixed height, not its 4px padding).
- `sm` total = 30 + 2×2 padding + 2×1 stroke = 36. md total = 36 + 2×4 + 2 = 46.
- After changing `Size` on an instance through the API, nested option widths read stale (75/85 instead of hugging "EN"/"ID"). Toggling `layoutSizingHorizontal` FIXED→HUG on the options and the toggle forces the relayout.
- Blast radius checked first with `getInstancesAsync()`: the only Toggle instances in the file are the two Language Toggle trial instances in the Marketing Navbar trial frame; no other consumers.
- `_toggle-item` horizontal padding (12) is not bound to a variable on md or sm; pre-existing, not changed here.


## Surface axis (2026-11-10)

`Surface=Dark` is for the Marketing Navbar `onTop` state (transparent bar over a hero photo), where the grey Light container looked too heavy next to the transparent nav links. Same method as Size: rename to `..., Surface=Light`, clone to Dark, rebind refs, swap nested options to the Dark items.
- Toggle container: fill `Colors/Surface/Transparent/10`, stroke `Colors/Stroke/White/20`.
- `_toggle-item` Dark: Default/Disabled = no fill, label `Colors/Text/On-Dark`, glyph `Colors/Icon/On-Primary`; Hover = fill `Colors/Surface/Transparent/20`; Focused = ring `Colors/Stroke/White/100`; Selected = unchanged white pill with `Colors/Text/Primary` label.
- Variant name order is `Selected, Size, Surface` on Toggle and `State, Size, Surface` on `_toggle-item` (defaults Light, md first in each set).
- Counts now: Toggle 8 variants, `_toggle-item` 20.
- Consumers that import the library only see Dark after the library is republished; the Landing Page trial copy needs `Surface=Dark` set after that.
