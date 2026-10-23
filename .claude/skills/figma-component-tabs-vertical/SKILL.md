---
name: figma-component-tabs-vertical
description: "Characteristics of the Tabs Vertical component set (node 7874:2908, Tab page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Tabs Vertical via use_figma."
---

# Tabs Vertical — Component Characteristics

Node `7874:2908` on the **Tab** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

**Node id changed again on 2026-10-22** (was `7823:2908`, before that `5124:491`):
adding the Content slot needed a recombine (twice — see the Oct 22 note below).

**Node id changed on 2026-10-20** (was `5124:491`): restructuring to a Body slot
required a recombine, which mints a new component set. Anything keyed on the old
id (registry `figmaKey`, links) is stale.

## What it is / when to use it

Vertical tabs composite for switching between sections of the same page, stacked in a column. Use for settings-style or category navigation beside a content panel. Do not use for app-level navigation — use Sidebar; do not use to pick a value from a list of options — use Select or Radio Button.

Body slot accepts _tab-item-vertical instances stacked in a column; the first item is shown as Selected. Content slot (to the right of the tab column) is where the panel for the selected tab goes; toggle Show Content to hide that area when the panel is placed elsewhere.

## Variant axes & properties

- `Body` (SLOT — tab items; carries the Contained strip styling)
- `Content` (SLOT — tab panel, right of `Body`)
- `Show Content` (BOOLEAN, default true — drives `Content`'s visibility)
- `Appearance` (Bordered, Filled, Contained)
- `Size` (Small, Medium, Large)

9 variants. Appearance values: Bordered (selected item gets a left border + subtle background), Filled (selected item gets a brand-subtle tint, no border), Contained (the whole column sits inside a bordered gray strip, items use the Filled style).

## Structure, tokens & known gotchas

- Each variant (since 2026-10-22): root HORIZONTAL auto-layout (gap bound to `Spacing/16`, no fill/stroke/padding/radius) → `Body` SLOT (VERTICAL, hug/hug, gap bound to `Spacing/4`, clips content) → 4 `_tab-item-vertical` instances (first = Selected, rest = Default); then `Content` SLOT (VERTICAL, fill/fill, no fill). Tab column width stays 240 (items are FIXED 240); Contained is 256 incl. padding.
- Contained variants: the **`Body` slot** (not the root) has fill `Colors/Surface/Default`, stroke `Colors/Stroke/Subtle`, padding `Spacing/8`, radius `Border Radius/XL`, with `strokesIncludedInLayout` matching the original so the width stays 256 rather than 258. They reuse the **Filled** item style — `_tab-item-vertical` has no Contained appearance of its own, by design.
- Added a Body slot on 2026-10-20 (matches Tabs Horizontal). Build path that worked: detach the 9 variants from the set, `createSlot()` on each standalone variant with the same name `Body`, move the items inside, then ONE `combineAsVariants`. Confirmed on a throwaway 2-component test first. The recombine **corrupted every variant name** to `=Bordered, =Small` (property-name prefixes stripped, Appearance/Size definitions dropped) — renaming each variant back to `Appearance=X, Size=Y` restored both properties. Re-verify names and `componentPropertyDefinitions` after any recombine.
- Slot default fill is opaque white — `slot.fills = []` is required.
- No instance of Tabs Vertical existed elsewhere in the file when it was restructured (checked with `getInstancesAsync` on all 9 variants), so no overrides were lost.
- `_tab-item-vertical` (node `5113:451`, 30 variants = Appearance Bordered/Filled × State Default/Hover/Selected/Disabled/**Focused** × Size) is also used directly by the Sidebars page (`_sidebar-item`, 8 instances) — a private component used across families (charter §4.2); adding variants to it does not affect those instances.
- Focused state (added 2026-10-20 to both tab-item sets): a clone of the Default variant plus a 2px INSIDE stroke on all sides bound to `Colors/Stroke/Focus-Ring-Neutral`. The `Outline Shadow/*` effect styles were tried first and do NOT render here — Figma draws no drop shadow for a node with no fill, and Default items have none.
- **Oct 22 2026 — Content slot + Show Content, and what went wrong (do not repeat):** first attempt wrapped the tabs in a new `Tab List` frame (to carry the Contained strip) and moved the `Body` slot into it. A DRY-RUN that threw at the end (to roll back) reported everything fine — slot refs intact — but after the real commit `Body` had silently become a plain FRAME in all 9 variants and the `Body` property was dropped. **Moving a slot into a different parent demotes it, and that only shows after commit.** Fix: second pass with no slot moves — detach the variants again, `createSlot()` a fresh `Body` as a direct root child, `appendChild` the 4 tab instances into it (instances into a slot are fine), copy the strip styling onto that slot, delete the `Tab List`/old frame, then recombine. Two recombines → node id went `7823:2908` → `7873:2946` → `7874:2908`. Lessons: (1) a dry-run-then-throw cannot catch commit-time demotion — verify in a separate call after the real run; (2) the recombine does not carry the set's `description` over, so reapply it every time (the `Tab List` pass lost the original 691-char text; it was reconstructed from this skill file and may differ slightly in wording).
- Description was missing the when-not-to-use clause and described a Body slot that did not exist (charter D9); both fixed on 2026-10-20.
