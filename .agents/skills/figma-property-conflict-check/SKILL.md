---
name: figma-property-conflict-check
description: "Runnable audit — scans component property names across the Nusantics Design System Figma file (Atomic/Molecule/Organism) for collisions with React/JS reserved identifiers and native HTML attributes, so a design-to-code translation doesn't discover the collision mid-translation. Load and run this whenever asked to 'check/audit components for naming conflicts', before a batch design-to-code translation, or periodically as hygiene. Canonical rename table lives in figma-component-build — this skill is the repeatable scanner, not a second source of truth for names."
---

# Figma Property Conflict Check — Runnable Audit Skill

Purpose: **detect**, across as much of the file as asked, which component
properties (`componentPropertyDefinitions` — variant axes, booleans, text
props, `INSTANCE_SWAP` props) collide with identifiers the target code
already gives special meaning to. This is the checker; the naming rules,
severity tiers, and the canonical rename table it checks against live in
`figma-component-build`'s "Component property naming" section — **update
that table, not this file**, when a new collision gets a canonical
replacement name. This file always defers to that table as the source of
truth and should be kept in sync with it.

**Always load `figma-use` before calling `use_figma`.**

## When to run this

- Before any batch Figma→code translation (the failure mode this exists
  for: a translator hits a collision mid-task, as happened with `Button`'s
  `Style` property in Sep 2026, and has to improvise a fix on the spot).
- Whenever asked to "check/review/audit" a component or a whole
  page/section for naming issues.
- Periodically as hygiene once new Atomic/Molecule/Organism components are
  added — a new component can introduce a fresh instance of an
  already-known collision (`Style` turned out to exist on 12 separate
  components, not 1, when first checked broadly).

## Severity tiers (mirror of `figma-component-build`, kept here for
self-contained running — if these lists change, change them in both
places)

**Tier 1 — hard reserved identifiers, always flag for rename:**
```
class, function, var, let, const, delete, in, new, this, typeof,
instanceof, void, with, yield, enum, extends, super, implements,
interface, package, private, protected, public, static, throw, catch,
try, finally, import, export, default, for, if, else,
key, ref, children, dangerouslysetinnerhtml,
id, style, title, lang, dir, hidden, tabindex, draggable, role,
contenteditable, spellcheck, translate, slot
```

**Tier 2 — matches a native element attribute, flag but don't
auto-recommend renaming (only real if meaning diverges from native, or if
the generated component spreads unknown props onto the underlying
element):**
```
type, value, checked, disabled, placeholder, maxlength, minlength, min,
max, pattern, required, readonly, size, step, list, autocomplete,
autofocus, form, formaction, name, multiple, src, alt, href, target, rel,
width, height, loading
```

## Default scan scope

Fan out across every page under `❖ ATOMIC`, `MOLECULE (in progress)`, and
`❖ ORGANISM (in progress)` (see `figma-component-build`'s "File structure"
section for the current page list — re-check it before running, since the
hierarchy is actively being built out and this list will go stale).
`DEPRECATED` and `⚠️ ARCHIVE` sections are out of scope — don't flag or fix
naming there. If the user names a specific page/component, scope to that
instead of the full sweep.

## The scan script (copy-paste template, one call per page)

Per `figma-use`'s page rule: **one `use_figma` call switches page at most
once** — fan multi-page scans out as N parallel tool calls in a single
message, never loop pages inside one script.

```js
const reserved = new Set(['class','function','var','let','const','delete','in','new','this','typeof','instanceof','void','with','yield','enum','extends','super','implements','interface','package','private','protected','public','static','throw','catch','try','finally','import','export','default','for','if','else','key','ref','children','dangerouslysetinnerhtml','id','style','title','lang','dir','hidden','tabindex','draggable','role','contenteditable','spellcheck','translate','slot']);
const nativeAttrs = new Set(['type','value','checked','disabled','placeholder','maxlength','minlength','min','max','pattern','required','readonly','size','step','list','autocomplete','autofocus','form','formaction','name','multiple','src','alt','href','target','rel','width','height','loading']);
function flagName(n) {
  const norm = n.trim().toLowerCase();
  const hits = [];
  if (reserved.has(norm)) hits.push('reserved-identifier');
  if (nativeAttrs.has(norm)) hits.push('native-html-attribute');
  return hits;
}
const PAGE_CORE = 'REPLACE_ME'; // e.g. 'Buttons', 'Select', 'Popover / Detail'
const page = figma.root.children.find(p => {
  const clean = p.name.replace(/^[\s\-—]*↳?\s*/,'').replace(/[✅⚠️⏳❗️]/g,'').trim();
  return clean.toLowerCase() === PAGE_CORE.toLowerCase();
});
if (!page) return { pageCore: PAGE_CORE, error: 'not found' };
await figma.setCurrentPageAsync(page);
const nodes = page.findAllWithCriteria({ types: ['COMPONENT', 'COMPONENT_SET'] });
const results = [];
let scanned = 0;
for (const n of nodes) {
  // skip variant COMPONENTs owned by a COMPONENT_SET — read from the set instead (owner-narrowing rule)
  if (n.type === 'COMPONENT' && n.parent && n.parent.type === 'COMPONENT_SET') continue;
  let defs;
  try { defs = n.componentPropertyDefinitions; } catch (e) { results.push({ node: n.name, error: e.message }); continue; }
  scanned++;
  const propNames = Object.keys(defs).map(k => k.split('#')[0]);
  const flagged = propNames.map(name => ({ name, hits: flagName(name) })).filter(f => f.hits.length);
  if (flagged.length) results.push({ node: n.name, type: n.type, flagged, allProps: propNames });
}
return { pageCore: PAGE_CORE, pageName: page.name, scannedComponentSets: scanned, flaggedComponents: results };
```

Substitute `PAGE_CORE` per page and emit one call per target page, all in
the same assistant message.

**A `componentPropertyDefinitions` read failing with "Component set has
existing errors"** (found on Modal's `_modal-content`, Sep 2026) is a
separate Figma-file bug, unrelated to naming — report it, don't treat it
as a naming finding, and don't let it silently drop that component from
the audit (`results.push({node: n.name, error: ...})` surfaces it instead
of swallowing it).

## Reporting the results

1. Group findings by page, then by component, matching the script's
   output shape — don't flatten into one undifferentiated list, the whole
   point is being able to say "these N components share this exact
   collision."
2. **Cross-check every Tier 1 hit against `figma-component-build`'s
   canonical rename table before proposing a name.** If the same
   collision already has an agreed replacement (`Style` → `Appearance`),
   reuse it — never propose a fresh synonym for a collision that's already
   been named once.
3. Tier 2 hits are informational by default — call out explicitly only
   the ones where the property's likely meaning diverges from the native
   attribute, or where the owning component is known to wrap the matching
   native element (e.g. `Type` on `Select`/`Input`, since those plausibly
   wrap a native `<select>`/`<input>`).
4. Don't rename anything found this way without asking first — a fresh
   collision needs a decision on the canonical name (recorded back into
   `figma-component-build`'s table once agreed) before it's safe to batch
   across every component sharing it, the same way the `Style` rename
   waited for a scope-confirmed go-ahead once the full extent (12
   components, not the 1 originally reported) was known.

## Known findings log (update this as new runs complete)

**Full-file sweep completed Sep 2026** — every page under Atomic,
Molecule, Organism, and Shared Figma Assets (44 pages total), plus
Designer Component & Assets. `DEPRECATED`/`⚠️ ARCHIVE` sections
intentionally excluded. Re-run against this same page list next time;
extend the list here if the file structure grows.

- **`Style` → `Appearance`** — resolved on **all 27 components** found
  across two passes:
  - First pass (12): `Button`, `_button group base`, `Button Group`,
    `Content Divider`, `Icon Tile`, `Badge`, `_input-field base`,
    `_Page Indicators`, `_tab-item-horizontal`, `_tab-item-vertical`,
    `Tabs Horizontal`, `Tabs Vertical`.
  - Second pass, found on full sweep (15): `Input / Upload-file`
    (Dropzone); `Month Header`, `Week Header`, `Week Days`, `Day`, `Range
    Week Days`, `Range Day`, `_calendar`, `_range-calendar` (Date
    Pickers — 8 components, `Style` was the *only* property on several of
    these); `Info Card`; `Example Slot - Sheet Content` (Sheets); `Table
    Cell`, `Table Row` (Tables); `_tab-menu`, `Tab Group` (Tabs, Shared
    Figma Assets page — distinct from the Molecule `Tab` page already
    covered in pass one).
  - Verified an existing instance's selected value (`Outline`) survived
    the rename on the first pass; same mechanism applies to all.
- **`Title` → `Heading`** — resolved on **2 components**: `Dialog`
  (Molecule/Dialogs) and `_comparison-table-row` (Shared Figma Assets/
  Comparison Tables).
- **`Slot` — found, deliberately NOT renamed.** `Charts`' `_bar` and `Bar`
  have a property literally typed `SLOT` (Figma's own Component Slots
  feature, not just a word choice) — confirmed via
  `componentPropertyDefinitions` returning `type: 'SLOT'`. `slot` is a
  global HTML attribute relevant to Web Components' shadow DOM, not a
  React/JS special identifier — negligible real collision risk in this
  React-based codebase. Recommendation: leave as-is; downgrade `slot` out
  of the Tier 1 "always rename" bucket for this file specifically (it's
  still worth flagging in a report, just not auto-recommending a rename).
- **`Type` on `Select` and `Input`** — flagged as Tier 2 elevated-risk,
  not a Figma-side fix; needs attention at code-translation time.
- **Component-set errors (unrelated to naming, block property reads
  entirely):** `_modal-content` (Modal) and `Logo Tile` (Logos) both
  return `"Component set has existing errors"` — flag to whoever owns
  these components, separate from the naming work.
- **Naming-quality smell, not a collision:** `Table` (Tables page) has
  properties literally named `Boolean` and `Instance` — describing the
  property's *type*, not its meaning. Worth a follow-up rename to
  something role-based, lower priority than the Tier 1 items above.
