---
name: figma-component-file-upload-field
description: "Characteristics of the File Upload Field component set (node 7089:3182, Dropzone page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing File Upload Field via use_figma."
---

# File Upload Field — Component Characteristics

Node `7089:3182` on the **Dropzone** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Compact field and drop area for selecting files (merged with the former Dropzone on 2026-10-20). `Appearance=Basic`/`Floating` are built as instances of Input (State/Filled/Floating/Layout inherited directly), so they stay in sync with Input automatically. `Appearance=Card` is its own independent structure (see below) — not an Input instance. Use for a form-field-style upload trigger. Do not use for a progress list of files in flight — use Upload Progress Drawer.

## Variant axes & properties

- `Appearance` (Basic=default, Floating, Card, Dropzone)
- `Size` (MD, LG — LG exists only for Dropzone; every other variant is `Size=MD`)
- `State` (Default, Hovered, Focused, Error, Disabled, plus `Drag-Active` for Dropzone only — `Card` only has 8 of the 10 possible combinations built: no `Disabled,Filled=True` or `Error,Filled=True`)
- `Filled`

## Structure, tokens & known gotchas

Code: not yet implemented in code (Figma-only as of this writing).

Lives on the current (non-deprecated) **Dropzone** organism page, node `7059:867` — there is also an unrelated older page literally named "↳ Dropzone ❌" (`1910:162`, DEPRECATED section) that is easy to confuse this with by name alone; always confirm via `getNodeByIdAsync('7089:3182')` walking up to its actual current parent page rather than assuming from a page name search.

**`Appearance=Card` structure (rebuilt Oct 2026, see incident below) — DOES nest a `Group Item` instance (`Type=Icon simple`), by explicit user request, matching the original pre-incident design:** each variant is `[Group Item instance, Type=Icon simple] + [Field Message instance below for the caption]`, stacked with `Spacing/8` gap. Inside the Group Item instance (all are manual per-instance overrides, not new exposed properties):
- `Icon Tile` → `Icon Swap` set to `react-icons/fi/FiUploadCloud` (componentKey `f12bac25da11fc22713cce2b2dbe368b53f2d630`), `Color=Neutral`, `Appearance=Subtle`, and `cornerRadius` force-set to `9999` directly on the node (bypasses a real gap: Icon Tile's `Shape=Circle` option doesn't exist for `Color=Neutral` + `Appearance=Subtle` — there's no clean variant combo for a plain subtle-gray circle, so the corner radius is overridden manually instead of via the `Shape` variant).
- Title/subtitle TEXT nodes → characters overridden per state (`Upload .zip file` / `Upload file from local storage` for `Filled=False`; `document.pdf` / `2.4 MB • Uploaded` for `Filled=True`).
- `Checkbox` instance → swapped to `Button` (`Hierarchy=Secondary, Appearance=Outline, Size=xs, State=Default`, node `4015:196259`) via `instance.swapComponent(newMain)` — **not** `setProperties({mainComponent: ...})`, which throws (`mainComponent` isn't a component property, swapping the instance's own main component is a different API). Button's own text lives at `_button base > Placeholder`, two levels in.
- The visible border: Group Item's own `Content Container` instance has an invisible-by-default `strokes[0]` (color token `Colors/Stroke/Subtle`, `visible: false`) — the Default-look edge comes from a `DROP_SHADOW` effect, not a stroke. For `Hovered`/`Focused`/`Error`, flip that same stroke to `visible: true` and rebind its color (`Colors/Stroke/Default` / `Colors/Brand/Primary/Default` / `Colors/Stroke/Error`) rather than adding a new stroke — the border is genuinely there once scale:4+, it just reads as very subtle at thumbnail scale, don't mistake that for "not working."

`Field Message` caption: `Show Icon=true` (unlike Input's own hint usage, which keeps it off), `State=Default` with the long helper text for every state except `Error`, which swaps to `State=Error` with a short message instead. Its text node needs `textAutoResize='HEIGHT'` + `layoutSizingHorizontal='FILL'` set explicitly after creating the instance — the default (`WIDTH_AND_HEIGHT` + `HUG`) grows the text as one long unwrapped line past the card's bounds instead of wrapping.

Disabled is the Default look at `opacity: 0.5` on the whole variant, not a separate token treatment. `State` only has 8 of 10 possible combinations built: no `Disabled,Filled=True` or `Error,Filled=True`.

**Incident (Oct 2026): `Appearance=Card` content was destroyed as a side effect of unrelated work on a completely different component (Group Item), then rebuilt twice.** Card's 8 variants originally nested a `Group Item` instance exactly as described above. When Group Item was restructured twice in an unrelated session (detach Content Container → add Control/Selected, then revert it back), each restructure regenerated new internal node IDs inside Group Item's nested content. Every *other* instance in the file holding per-instance overrides keyed to those old node IDs — including all 8 of Card's variants — silently lost those overrides, reverting to Group Item's own raw default placeholder content ("Basic plan", "$10/month", a bare checkbox). Not recoverable via the Figma Plugin API (no version-history access from a plugin); Figma's own UI-level Version History could have restored it exactly, but would have reverted every other unrelated change made in the file that session too, so it wasn't viable.

**First rebuild attempt (reverted): a flat, independent structure with no Group Item reuse at all** — reasoned that nesting a shared molecule just to borrow its shape, when the trailing control and icon didn't match that molecule's own semantics, was what made the original fragile. User explicitly rejected this ("harus tetap pakai group item") and wanted Group Item kept — the fragility isn't Group Item reuse itself, it's that *other people's edits to Group Item* can silently break overrides elsewhere with zero warning, which is a real risk to flag before touching Group Item again, not a reason to avoid reuse altogether. Second (current) rebuild reuses Group Item properly, per the structure documented above.

**Lesson for any future shared-component edit (Group Item, Content Container, Checkbox, or anything else widely nested elsewhere): before restructuring a component's internals, check whether other instances in the file hold meaningful per-instance overrides on it, since those can be silently destroyed by ID changes with no warning and no API-level undo.** This does not mean avoid reusing shared components — it means audit the blast radius before changing one.


## Appearance=Dropzone (merged 2026-10-20)

The former standalone **Dropzone** (`7136:2584`, a Content Container wrapper) and **_dropzone-base** (`7159:2581`, Size MD/LG x State Default/Drag-Active/Hover/Disabled/Error) no longer exist; both were deleted after the merge (no instances existed outside themselves). Their 10 variants are now `Appearance=Dropzone, State=<Default|Hovered|Drag-Active|Disabled|Error>, Filled=False, Size=<MD|LG>` in this set. Old state `Hover` was renamed `Hovered` to match the File Upload `State` options.
- Props (single definitions on the set): `Leading Visual` SLOT (default `react-icons/io/IoMdCloudUpload`), `Label` TEXT, `Supporting Text` TEXT, `Show Title`, `Show Description`, `Show Footer` (hidden Browse Button footer). The Footer hint/error from the old wrapper's Content Container was not carried over.
- How it was merged (works, reuse it): clone each source variant, replace the demoted slot frame with a real `createSlot()` slot (re-apply width/height, layout sizing and the children's x/y), add the TEXT/BOOLEAN properties by name and re-bind them by node path, rename with the new axes, then `fileUploadSet.appendChild(component)`. Properties with the same name unify to one key on append (tested in a scratch set: slot, text and boolean all merged), and appending a name with a new axis (`Size=LG`) adds that axis. Verified node by node against the originals (0 diffs) before deleting them.
- Backups: `BACKUP 2026-10-20 File Upload (pre Dropzone merge)`, `... _dropzone-base`, `... Dropzone wrapper` sit on the Dropzone page; delete when happy.
- Code side not updated: `Dropzone.tsx` still exists as a separate component and should become a File Upload appearance (`dropzone`) when code is synced.
