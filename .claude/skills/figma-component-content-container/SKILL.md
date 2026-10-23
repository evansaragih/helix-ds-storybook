---
name: figma-component-content-container
description: "Characteristics of the Content Container component set (node 6109:1185, Content Container page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Content Container via use_figma."
---

# Content Container — Component Characteristics

Node `6109:1185` on the **Content Container** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Content Container is a general shared shell for Modal, Dialog, and dashboard section cards, built from Header/Body/Footer slots so any real content can be dropped in. Use for wrapping arbitrary header+body(+footer) content behind a consistent surface/border/padding treatment. Do not use for a floating trigger-anchored panel - use Popover instead.

## Variant axes & properties

- `Container Content#6109:0`
- `Header Content Slot#6109:1`
- `Footer Content#6112:0`
- `Surface`
- `Section Split`
- `Border`
- `Content Style`
- `Header Divider`
- `Header`
- `Footer`
- `Content Surface`
- `Intent`

## Structure, tokens & known gotchas

Header Content Slot (SLOT) = free-form header content, Container Content (SLOT) = free-form body (nested one level deeper inside a 'Body' FRAME that can be hidden via visible=false for a header-only usage — no new property needed), Footer Content (SLOT) = free-form footer, shown via the Footer boolean. No Density property — header height hugs its content (full header ~80px, minimal header ~44px, as examples not states). 8 shell-chrome variant axes: Surface, Section Split, Border, Content Style, Header Divider, Footer, Content Surface, Intent. Widely reused as a base shell: Dialog, Alert Dialog, Sheets, Dropzone, Upload Progress Drawer, Date Picker, Group Item all build on it. KNOWN GAP (confirmed building an Upload-file example, Oct 2026): no variant combo exists for Border=True + Footer=False + Section Split=None + Content Style=Flush — closest is Border=True/Footer=False/Flush/Section Split=Divided/Content Surface=Subtle (node 6932:179652); ask before picking a substitute vs. adding the missing variant. CAUTION: moving pre-existing live nodes into this component's slots (rather than creating fresh content inside them) has been observed to drop absolute-positioned children and strip componentPropertyReferences — see Group Item's and Accordion Item's notes.
