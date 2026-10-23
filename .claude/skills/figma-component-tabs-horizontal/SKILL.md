---
name: figma-component-tabs-horizontal
description: "Characteristics of the Tabs Horizontal component set (node 7873:2908, Tab page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Tabs Horizontal via use_figma."
---

# Tabs Horizontal — Component Characteristics

Node `7873:2908` on the **Tab** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

**Node id changed on 2026-10-22** (was `5123:443`): adding the Content slot
required a recombine, which mints a new component set. Anything keyed on the old
id (registry `figmaKey`, links) is stale.

## What it is / when to use it

Horizontal tabs composite for switching between views or sections in place. Use for grouping related content panels under a single header row. Do not use for page-to-page navigation — use a sidebar or navbar instead; do not use for a filter/view-toggle row with no content panels underneath — use Button Group instead.

Body slot accepts _tab-item-horizontal instances. Toggle Nav Prev/Next to show scroll arrows for overflow. Content slot (below the tab row) is where the panel for the selected tab goes; toggle Show Content to hide that area when the panel is placed elsewhere.

## Variant axes & properties

- `Nav Prev/Next` (BOOLEAN)
- `Body` (SLOT — tab items, inside `Row`)
- `Content` (SLOT — tab panel, below `Row`)
- `Show Content` (BOOLEAN, default true — drives `Content`'s visibility)
- `Appearance` (Line=default, Filled, Contained)
- `Size` (Small, Medium, Large)

Appearance values: Line (underline under the active tab, full-width divider below the row, no background), Filled (active tab gets a brand-subtle tint pill, rest of the row has no shared background), Contained (whole row sits inside a bordered gray strip, active tab renders as a raised solid-white card within it — segmented-control look).

## Structure, tokens & known gotchas

Oct 2026: flagged in a component audit — D3 was Blocking because the Contained appearance value existed in componentPropertyDefinitions but had zero explanation in the description (Line/Filled were documented, Contained was added later and never written up); D9 was Blocking because the description had no when-not-to-use clause at all. Fixed by rewriting the description to cover all 3 Appearance values and add the do-not-use clause (Button Group for a content-less toggle row, sidebar/navbar for real page navigation).

Oct 20 2026: `_tab-item-horizontal` (node `5113:378`) gained a `State=Focused` variant — now 45 variants (Appearance Line/Filled/Contained × State Default/Hover/Selected/Disabled/Focused × Size). Built as a clone of the Default variant plus a 2px INSIDE stroke on all sides bound to `Colors/Stroke/Focus-Ring-Neutral`. The `Outline Shadow/Neutral` effect style was tried first and does not render because Default items have no fill (Figma draws no drop shadow for fill-less nodes). Note: `clone()` of a variant creates a loose COMPONENT on the page, not a new variant — move it into the set with `set.appendChild(clone)` and reposition, or the set's variant count and State options do not change. The item set's own description still says "Style" (now `Appearance`) and does not list Contained or Focused.

Oct 22 2026: added the `Content` SLOT + `Show Content` BOOLEAN (tab panel area). Each of the 9 variants is now root VERTICAL (gap bound to `Spacing/16`) → `Row` (unchanged) → `Content` SLOT (VERTICAL, fill width / hug height, no fill). Build path: detach the 9 variants, `createSlot()` on each, `addComponentProperty('Show Content','BOOLEAN',true)` and set `slot.componentPropertyReferences = {...refs, visible: key}`, then ONE `combineAsVariants`. The recombine corrupted variant names to `=Line, =Small` again — rename back to `Appearance=X, Size=Y` and re-verify. `Nav Prev/Next` and `Body` survived because they had live references. No instances of the set existed (page-level check only — other pages are not loaded by `getInstancesAsync`). The empty `Content` slot renders invisible; it shows its dashed outline only when selected.

Known unresolved drift (not fixed here, flagged separately): the audit's registry entry still points at a superseded node named "Tab Group" on a page marked "↳ Tabs ❌" (not this node) — a stale rename reference, same shape as Text Area/Pagination's registry drift. Code (`TabGroup` export in `tabs.tsx`) also still uses the old "Tab Group" vocabulary in its own comments and only implements 2 of the 3 Appearance values (no Contained yet) — a separate engineering pass, not addressed by this Figma-side fix.
