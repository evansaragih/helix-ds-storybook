---
name: figma-component-build
description: "Procedure and file-structure knowledge for building AND auditing components in the Nusantics Design System Figma file via use_figma — reuse-first search, mandatory token/style binding (checked both when building new components and when reviewing existing ones), and the Atomic/Molecule/Organism/Template page structure. Load this before writing any use_figma script that creates/clones a component, and before any 'check/review/audit this component' request. Complements figma-variable-naming (which variable to bind to) and helix-design-system (code-side architecture)."
---

# Figma Component Build — Project Skill

Procedural rules for constructing, deriving, or cloning components in the
Nusantics Design System Figma file (`GWzBKGr6512AeMOapwgQhj`) via
`use_figma`. This is the "how to build it in Figma" skill — for what to
*name* a variable, see `figma-variable-naming`; for the code-side
(`packages/helix-design-system`) architecture, see `helix-design-system`.

**Always load `figma-use` before calling `use_figma`.**

## Reply style — mandatory

User said: answer caveman style, minimal token, always. No fluff, short
phrase, drop grammar words. Applies to all replies in this project.

## File structure — Atomic Design hierarchy

The file's page/section structure is organized by Atomic Design tier.
**Atomic** (confirmed from the file's actual layer panel, Sep 2026)
contains: `Buttons`, `Checkbox`, `Radio Button`, `Sliders`, `Progress
Indicators`, `Loading indicators`, `Dividers`, `Icon Tile`, `Dot`.
**Molecule (in progress)** already has real content, not just a
placeholder: `Avatar`, `Badge`, `Tag`, `Dropdowns`, `Select`, `Input`,
`Switch`, `Tooltips`, `Alerts`, `Breadcrumbs`, `Pagination`, `Carousels`,
`Accordions`, `Modal`, `Popover / Detail`, `Dialogs`, `Tab` — several
marked done (✅), some still in progress (⏳/⚠️). **Organism (in
progress)**: `Dropzone`, `Empty States`, `Header Navigation`, `Sidebars`,
`Filters`, `Toolbar Filters`. A separate `DEPRECATED` section exists
(`Navbars`, `Command`) — don't build on or reference anything there. A
`SHARED FIGMA ASSETS` section holds cross-cutting pieces not yet sorted
into a tier (`Menu Items`, `Tables`, `Forms`, `Card Metrics`, etc.) —
check there too before assuming something doesn't exist yet. Re-check the
current file structure before relying on this list, since it's actively
being reorganized.

**Before adding a new component, decide its tier first:** does it stand
alone as an indivisible UI primitive (atom — a Button, a Dot, an Icon
Tile), or is it a composition of existing atoms (molecule — e.g. a Form
Field combining a Label + Input + helper text)? Place it under the
matching top-level section rather than defaulting to wherever is
convenient. If the tier is ambiguous, ask rather than guessing — getting
this wrong means a later re-parenting pass across the whole file.

## Reuse existing components — search before hand-building

**Before writing any `use_figma` script that builds a new visual element
from primitives** (frame + fills + icon, or any raw `figma.createFrame()`/
`figma.createText()` composition), search first:

1. `search_design_system` with a plain-language query for the element
   (e.g. "icon tile", "status badge", "text link").
2. If a match exists, inspect its `componentPropertyDefinitions` (narrow to
   the `COMPONENT_SET`) for its variant axes and any `INSTANCE_SWAP`/
   `TEXT`/`BOOLEAN` properties, and drive the design through an **instance**
   of it — set variant properties, don't recreate the look with raw frames.
3. **If the existing component doesn't fully cover the need** (e.g. missing
   a variant value for a needed color/size), say so explicitly and ask how
   to proceed. Don't silently fall back to a custom-built equivalent as if
   it were the same thing — options are: use what exists, extend the
   shared component, or build custom and flag it as a follow-up gap.
4. This applies beyond obviously-visual elements — any standalone text that
   functions as a link/action (not body copy) is also a component-reuse
   candidate (e.g. use `Text Link`, not a raw `TEXT` node styled to look
   clickable).
5. **When multiple components match the same search, verify which is
   current before using either.** A suspiciously small variant count,
   unbound colors, or property names not actually wired to visible output
   are signs of a legacy/duplicate set — confirm against a node the user
   points to, or ask, rather than building on a broken component.

### Known reusable components in this file (check before re-searching)

- **`Icon Tile`** — node `3764:193398`. Variants: `Size`(XSmall/Small/
  Medium/Large) × `Color`(Success/Warning/Destructive/Tertiary/Info/
  Neutral/Primary) × `Style`(Solid, plus Subtle for Primary/Neutral only)
  × `Shape`(Square/Circle — Circle covers all 4 Sizes × the 5 status
  colors × Style=Solid; Tertiary/Neutral and Style=Subtle still have no
  Circle option — a real gap, not a search miss). `Icon Swap`
  INSTANCE_SWAP property for the glyph.
- **`Text Link`** — componentKey `0c16fafbba17173439eabe4e8b40c2bb0f611501`.
  Variant `Weight`(Semibold/Regular), `Label` TEXT prop, `Show Trailing
  Icon` BOOLEAN. Text fill is **not** token-bound by default — override the
  inner TEXT node's fill per use case after creating the instance.
- **`Button` — use node `2826:41666`, NOT `e3f8e2074238be62dc40f73207e2ca2c94259f95`**
  (a component set also named "Buttons / Button" that is legacy/broken —
  its Outline variant has an invisible white stroke and some variants have
  text hardcoded instead of wired to the `Text` property). Correct one:
  `Hierarchy`(Primary/Secondary/Tertiary/Destructive) × `Style`(Solid/
  Outline/Subtle/Ghost/Link) × `State`(Default/Hover/Focused/Loading/
  Disabled) × `Size`(xs/sm/md/lg) × `Icon`(False/Only) × `Shape`(Rounded/
  Pill) × `Underline`(Always/OnHover/None). Text lives on a nested
  `_button base` instance's `Text#...` property; background fill lives on
  the **outer** instance, not the nested one.
- **`Progress Circle`** — current set at node `3397:585`:
  `Size`(XXS/XS/SM/MD/LG) × `Thickness`(Thick/Thin) × `Label`(True/False,
  Label=True unavailable at XXS — text doesn't fit legibly at 40px). An
  older pre-rebuild version is deliberately still alive in the file because
  2 live `Dropzone` instances reference its 40px footprint — if asked to
  clean up/consolidate Progress Circle, check whether those Dropzone
  instances have been migrated to `Size=XXS` before deleting the old one.

## Component property naming — avoid collisions with code identifiers

**The problem:** whatever names a component property in Figma
(`componentPropertyDefinitions` — variant axes, booleans, text props,
`INSTANCE_SWAP` props) tends to become the prop name in generated code
1:1. If that name collides with an identifier the target language/
framework already gives special meaning to, the generated code either
breaks silently or someone has to rename it by hand during translation —
and if that rename isn't standardized, different people/tools resolve the
same collision differently, so the same Figma concept ends up with a
different prop name in different components.

**Confirmed Sep 2026 (reported by dev, Robby):** translating the `Button`
component from Figma to code, the `Style` variant (Solid/Outline/Subtle/
Ghost/Link) had to be renamed to `appearance` in the generated code,
because `style` is React's reserved prop for inline CSS — a literal
`style` prop would collide with it. This wasn't caught by the translation
tooling's own component-check step. **Retroactive audit found the same
`Style` property also exists, unrenamed, on `_button group base` and
`Button Group`** — not just the one component that happened to get
translated first. A collision found in one component is a signal to check
sibling components for the same property name, same as any other
retroactive audit in this file.

### Two severity tiers — don't treat them the same

1. **Tier 1 — hard reserved identifiers. Always rename, no exceptions.**
   - JS/React special props: `key`, `ref`, `children`,
     `dangerouslySetInnerHTML`.
   - JS reserved words if used as a bare identifier: `class`, `for`,
     `default`, `delete`, `new`, `this`, `typeof`, `void`, `with`,
     `import`, `export`, and the rest of the ECMAScript reserved-word list.
   - Global HTML attributes with browser-native meaning that a design
     property is unlikely to actually intend: `id`, `style`, `title`,
     `role`, `hidden`, `tabIndex`, `contentEditable`.
2. **Tier 2 — shape matches a native element attribute
   (`type`, `value`, `checked`, `disabled`, `name`, `size`, `placeholder`,
   `loading`, `required`, `min`/`max`, etc.). Not automatically wrong.**
   Rename only if the Figma property's *meaning* diverges from what that
   attribute natively means, or if the generated component spreads
   unrecognized props straight onto the underlying native element (common
   in many component libraries) such that a mismatched meaning would leak
   through incorrectly. If the meanings already line up (a `Disabled`
   boolean that genuinely means disabled), reusing the name is correct —
   this is not a blanket "avoid native attribute names" rule; most design
   systems deliberately reuse `size`/`type`/`disabled`/`value` because
   they mirror native semantics on purpose.

### Canonical replacement table — reuse these, don't improvise per-component

| Figma property name | Collides with | Use instead |
|---|---|---|
| `Style` | React's `style` prop (inline CSS object) | `Appearance` |
| `Class` | React's `className` / JSX `class` | `Variant` or `Category` (pick by actual meaning) |
| `For` | JSX's `htmlFor` | `Target` / `AssociatedField` |
| `Key` | React's special `key` prop | `Identifier` / `ItemKey` |

Add a new row here the moment a new collision is found — this table is the
single source of truth for the rename, not something to decide fresh each
time the same collision recurs.

**Known unresolved instances in this file (Sep 2026, confirmed via a full
Atomic + Molecule sweep — check `allProps`/`flagged` output the same way
before assuming this list is complete):**

- **`Style`** (Tier 1, always rename) exists on **12 components**:
  `Button`, `_button group base`, `Button Group` (Buttons); `Content
  Divider` (Dividers); `Icon Tile`; `Badge`; `_input-field base` (Input);
  `_Page Indicators` (Carousels); `_tab-item-horizontal`,
  `_tab-item-vertical`, `Tabs Horizontal`, `Tabs Vertical` (Tab). This is a
  de facto convention across the file ("visual treatment" variant), not an
  isolated mistake — rename all 12 to `Appearance` in one coordinated pass
  when approved, not incrementally, so no sibling component is left with
  the old name after the others move.
- **`Title`** (Tier 1, softer — React doesn't special-case `title` the way
  it does `style`, but the browser's native tooltip meaning likely isn't
  the intent) on `Dialog` — probably means the dialog's heading text.
  Recommend `Heading` instead; lower urgency than the `Style` batch.
- **`Type` on `Select` and `Input`** (Tier 2, elevated risk) — flag for a
  closer look specifically at translation time: if the generated component
  spreads props onto the underlying native `<input>`/`<select>`, a design-
  intent `Type` (e.g. a visual variant) could collide with the native
  `type` attribute's real behavior. Not a Figma-side fix — a note for
  whoever writes the code translation.
- **`_modal-content`** (Modal page) currently errors on
  `componentPropertyDefinitions` ("Component set has existing errors") —
  unrelated to naming, but its properties can't even be read until that's
  fixed; flag to whoever owns that component.

Renaming a component property in Figma is comparable to a variable
rename — Figma binds by property key/ID, so existing instances keep their
selected value — but confirm with a metadata check before batch-renaming,
and don't execute without asking first, since a batch like the 12-
component `Style` rename touches every instance across the whole file at
once.

### Procedure — check before naming, not after translation breaks

Before creating any new component property in Figma:
1. Normalize the candidate name (lowercase, strip spaces) and check it
   against the Tier 1 list above. If it hits, use the canonical
   replacement table — don't invent a new synonym.
2. Check whether the name matches a Tier 2 native attribute. If it does,
   confirm the Figma property's intended meaning actually matches that
   attribute's native meaning before keeping the name as-is.
3. If this exact collision has been resolved before (check the table),
   reuse that same replacement — consistency across components matters
   more than any individual word choice.
4. This is a **property-name** collision check, distinct from
   `figma-variable-naming` (which governs *variable* names). Don't conflate
   the two naming systems — a component can need both audits independently.
5. Per `figma-variable-naming`'s communication-sequencing pattern, apply
   the same discipline here: rename in Figma first, then tell whoever owns
   the design-to-code translation tooling — code that already references
   the old property name by string needs to be told, since it doesn't
   follow along automatically the way ID-based bindings do.

## Text properties — naming, when to expose, and how to tell the dev side

**Confirmed Sep 2026:** `Checkbox`'s label/description TEXT nodes were
already wired to TEXT-type component properties (`_Label Text`,
`_Secondary Text`) — good instinct, but the naming didn't match the rest
of the file. Most other components expose the same *kind* of content
under plain names with no prefix: `Label`, `Supporting Text` (Dropdown,
Select), `Hint` (Input Text Area), `Text` (Badge, Avatar, Tag). Three
different names for the same role (`Hint`/`Supporting Text`/`Secondary
Text`) is the same disease as `Container`/`Surface/Components` was for
variables — just one layer up, at the component-property level.

### Naming convention — no underscore prefix, fixed vocabulary

**Don't prefix a TEXT property name with `_`.** Underscore already means
something else in this file — it marks an internal/base *component* not
meant to be used directly (`_button base`, `_checkbox`, `_tag base`).
Reusing it on a *property* name overloads the signal. Drop it and match
the plain-name pattern already dominant elsewhere.

Pick from this fixed vocabulary — don't invent a synonym for a role that
already has a name:

| Property name | Role | Consolidates |
|---|---|---|
| `Label` | Primary/identifying text | (already consistent) |
| `Supporting Text` | Secondary/explanatory text below or beside Label | `Hint`, `Secondary Text`, `Description text` |
| `Value` | Live/data-driven content (a count, an input's value) | (already consistent) |
| `Content` | Generic slot when Label/Supporting Text don't fit (dialog body, etc.) | |
| `Heading` | Title of an overlay/dialog/modal | `Title` (Tier 1 collision, see naming section above) |

### Deciding property vs. static — a procedure, not a fresh judgment call every time

Run these signals in order; only escalate to the user when they conflict
or are all inconclusive — most cases resolve without asking:

1. **Signal A (strongest, empirical):** does this content already differ
   across sibling variants in the set, or across real `INSTANCE`s of this
   component elsewhere in the file? If yes, it's already proven to vary —
   make it a property, no need to ask.
2. **Signal B (node/property naming):** does the node's name describe a
   *content role* (`Label`, `Description`, `Value`, `Count`,
   `Placeholder`, `Supporting text`) rather than being identical to its
   own fixed text? A role-shaped name defaults to property.
3. **Signal C (content shape):** is the current text generic/placeholder-
   looking ("Description text", "Label", a dummy number) rather than a
   specific fixed phrase that's part of the component's own identity (a
   wordmark, a locked micro-copy)? Placeholder-shaped content defaults to
   property; identity-shaped content defaults to static.
4. **Signal D (precedent):** has this same content role already been
   resolved on another component? Reuse that decision — check
   `figma-property-conflict-check`'s findings log before deciding fresh.

**The rule of thumb when signals still don't settle it:** would a
designer handed this component with zero context expect this text to be
editable, or would editing it break the design intent? Editable-by-design
→ property. Would-break-intent → static.

**Bias toward exposing when genuinely unsure** (safer for resilience
against future restructuring), but still ask rather than deciding
unilaterally when the signals actually conflict.

### Detection can evolve; execution never happens without asking — every time

Re-running this procedure later (e.g. after new instances get added) can
legitimately produce a different recommendation than last time — that's
the audit doing its job, not a mistake. **What must never happen
automatically is the actual conversion of a plain text node into a
component property.** Unlike a cosmetic rename (which, once approved for
a batch, is safe to execute mechanically across every match), exposing a
new property is a structural change to `componentPropertyDefinitions` —
it changes what a design-to-code translation will pick up next time it
touches that component. Always present the finding and proposed fix
first, every time, regardless of how strong the signal is — don't treat
a confident Signal-A match as pre-approved just because a past batch
(e.g. the `Style` → `Appearance` rename) was.

### Communication to the dev/translation side — batched, not per-node

Converting a text node to a property changes the component's exposed
property surface, so it needs to reach whoever owns Figma→code
translation (currently Robby) — but not as a ping per text node, that's
too granular to be useful. Follow this sequence, mirroring
`figma-variable-naming`'s "Figma first, inform after" pattern:

1. Execute the conversion in Figma (after approval, per above).
2. **Log it in `helix-design-system-log.md`** every time — which
   component, which text, why — same discipline already used for token
   changes.
3. **Update the component's own Figma description** with a short note —
   so anyone opening or translating the component directly sees it at the
   source, not only in an external log.
4. **Batch a summary to the dev/translation owner** at a natural
   checkpoint (before their next translation pass on that component, or a
   periodic roundup) rather than notifying immediately per change.

## Interaction states — required set, checked against Material Design

**Every interactive component's `State` property must cover the full
baseline set, not just whichever ones happened to get built first:**

```
Default → Hover → Focused → Pressed → Disabled
```

Add `Invalid` too if the component is a form field that can fail
validation (Checkbox, Radio Button, Input, Select, …). Skip `State`
entirely for non-interactive components (Progress Bar/Circle, Divider,
Icon Tile, Dot, …) — Material Design doesn't define interaction states for
those either, so an absent `State` property there is correct, not a gap.

**Why this specific set:** it mirrors Material Design's state-layer model
(Enabled/Hovered/Focused/Pressed/Dragged/Disabled — this file uses
`Default` where Material says `Enabled`, and doesn't need `Dragged` outside
`Slider`). Material treats `Pressed` as a distinct state from `Hover` —
immediate tactile feedback on click/tap (typically a darker/deeper fill),
not just cursor-over — and it's real, not cosmetic: skipping it is a
noticeably worse feel on touch devices, which don't have hover at all and
rely on Pressed as their *only* non-Disabled feedback state.

**Confirmed gap (Sep 2026 audit):** every interactive Atomic-tier
component in this file was missing `Pressed` — `Button`, `_button group
base`, `Checkbox`, `_checkbox`, `Checkbox Group Item`, `Radio Button`,
`_radio-button`, `Radio Group Item` all had `Default/Hover/Focused/
Disabled(/Invalid)` but no `Pressed`. `Button`'s own (pre-Sep-2026)
description claimed a `Pressed` state that didn't actually exist in
`componentPropertyDefinitions` — a reminder that a component's prose
description can drift from what the component actually has; verify the
real property values via `use_figma`, don't trust the description alone.
`Slider` was worse — only a `Static` variant, with `Hover`/`Disabled`
present as unwired layers, not real `State` values.

**Don't name this state `Active`.** `Active` already means something else
in this file (and in UI conventions generally) — a *persistent* selected/
current state (`_button group base`'s own `Selected`, an active nav item,
an active tab, an active step). `Pressed` is momentary (released the
instant the pointer/touch lifts); reusing `Active` for it would collide
with that existing, different meaning. Use Material's own term, `Pressed`
— it's unambiguous and it's what we're already aligning to.

### Before adding a `Pressed` variant: check for an existing token first

Adding `Pressed` is two separate steps, in this order — **don't skip
straight to creating variables:**

1. **Token audit.** Search `Semantics-Core`/`Semantics` for a
   `*-Pressed`/`*/Pressed` variable that already matches what this
   component's Pressed state needs, category-correct (a background needs a
   `Surface` token, a border needs a `Stroke` token — same rule as
   "Binding tokens" below). Confirmed Sep 2026: most of the raw Pressed
   *values* already existed (`Brand/Primary/Default-Pressed`, `Brand/
   Secondary/Default-Pressed`, `Brand/Tertiary/Default-Pressed`, `Brand/*/
   Subtle-Pressed`, `Stroke/Primary|Secondary|Tertiary/Pressed`, and in
   Semantics-Core `Surface/{Success,Warning,Info,Destructive}-{Bold,
   Subtle}-Pressed`) — they just weren't bound to anything yet. A border
   or a status-colored (destructive/success/warning/info) fill will
   usually find a ready-made match here; **don't recreate one that already
   exists.**
2. **Create only the genuine gaps**, following `figma-variable-naming`'s
   full "before creating any new semantic variable" checklist (exact-value
   reuse check, category-correctness, naming formula). Confirmed gap
   (Sep 2026): a plain brand-colored solid background (e.g. `Button`
   `Hierarchy=Primary/Secondary/Tertiary`, `Appearance=Solid`) had no
   `Surface`-category Pressed token — only the raw `Brand/*/Default-
   Pressed` value existed, not a `Surface/Brand/{Hierarchy}-Pressed` alias
   to it (the same gap `Surface/Brand/Primary-Hover` had already been
   filled for). The fix is a thin alias variable to the existing raw
   value, matching the pattern the Default/Hover tiers already use — not a
   new color.

Only after both steps (confirmed audit + any real gaps filled) does
building the actual `Pressed` variant frames happen — duplicate the
`Hover` variant, rename to `Pressed`, rebind to the audited token(s). Per
"Auditing existing components," verify field-by-field afterward, not just
by screenshot.

## Binding tokens — mandatory pre-write step, not a fix-after pass

**Before writing the first line of any `use_figma` script that creates a
component**, look up the exact variables/styles needed and write the
creation helpers (`makeText`, `bindRadius`, `bindGap`, etc.) to bind from
the start. Do not write `node.fontSize = 13` or `node.cornerRadius = 8`
even as a placeholder "fix it after" — that pattern has recurred multiple
times and always requires an after-the-fact rebind pass. This applies even
when `helix-design-system` was already loaded earlier in the session —
re-read this section specifically before writing the build script, since
the code-side skill alone hasn't been enough to keep this front-of-mind.

- **Color** (fills/strokes) — bind via
  `figma.variables.setBoundVariableForPaint` to a Semantics variable, never
  a literal `{r,g,b}` with no binding. **The variable's category must
  match the node's role, not just its resolved color value:** a `TEXT`
  node's fill → `Colors/Text/*`, a `VECTOR`/icon fill → `Colors/Icon/*`, a
  background fill → `Colors/Surface/*`, a border stroke → `Colors/Stroke/*`
  — even when a same-hex variable from a different category would render
  identically. This matters most when deriving a new variant
  programmatically from an existing one (e.g. building an Outline button
  from a Solid button) — look up the matching variable in the *correct*
  category by name (`Colors/Surface/Brand-Primary` →
  `Colors/Text/Brand-Primary` for text, → `Colors/Icon/Primary` for icon)
  instead of reusing the source node's own variable id across categories.
  Before finishing, audit every text/icon node's bound variable name and
  confirm its category prefix matches the node's role.
  - If the "obvious" token for a role seems missing (e.g. no subtle/tint
    Surface token for a status), don't fall back to a different-category
    variable at reduced paint opacity as a workaround — search harder
    first. Filter `getLocalVariablesAsync()` with a broad regex against the
    right category (e.g. `/brand|primary|subtle/i` against
    `Colors/Surface/`) before concluding a token doesn't exist; nested/
    compound names are easy to miss with a narrow search.
- **Text** — apply a real Figma Text Style via
  `node.setTextStyleIdAsync(styleId)`, never raw `fontName`/`fontSize` on a
  text node. If a style's built-in size doesn't match what's needed, check
  `figma.getLocalTextStylesAsync()` for the closest existing match before
  resorting to a manual override.
- **Corner radius** — bind via `node.setBoundVariable('topLeftRadius'/
  'topRightRadius'/'bottomLeftRadius'/'bottomRightRadius', variable)` to a
  `Border Radius/*` Utilities variable: None=0, XS=2, SM=4, MD=6, LG=8,
  XL=12, 2XL=16, 3XL=24, Full=9999. (8px = `Border Radius/LG`, not MD.)
- **Gap / spacing / padding** — bind via `node.setBoundVariable(
  'itemSpacing'/'paddingLeft'/etc, variable)` to a `Spacing/*` Utilities
  variable: 0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96. If a
  needed offset isn't a real token (e.g. an indent equal to icon-width +
  gap), compose it structurally from two real bound tokens (a sized spacer
  frame + a bound gap) — don't invent an off-scale magic literal.

**Self-check before calling the build done:** does every fill/stroke have
`boundVariables`? Does every text node have a `textStyleId` (not raw
`fontName`/`fontSize`)? Does every corner radius and every gap/padding
have a bound variable (plain `node.cornerRadius = 8` does **not** count,
even if numerically correct)? Does every new frame have a name that
describes its role (see "Layer naming" below)?

**When the build is "make X match Y" (mirroring/cloning another
component's style), a screenshot comparison is not sufficient
verification — diff properties node-by-node.** Two variants can render
pixel-similar in a screenshot while diverging underneath (different bound
variable, a stroke weight off by 0.5, a text style one size-step too
small) — differences invisible at screenshot resolution but real the
moment someone inspects the file. Confirmed Sep 2026: a first pass on
`Checkbox Group Item`'s `Icon card` variant fixed the one difference
visible in a screenshot (a missing white body wrapper) and was reported
done; a follow-up node-by-node diff against the reference (`Radio Group
Item`) turned up six more mismatches on the exact same variant — stroke
weight (`1` vs `0.5`), two spacing tokens bound to the wrong scale,
text-style size not actually scaling with the `Size` variant, a nested
component instance's own variant property (`Badge`'s `Size`) left on the
wrong value, and an unselected-state background bound to the wrong
`Surface` token. **Procedure:** pull every relevant property (`fills`,
`strokes`, `strokeWeight`, `cornerRadius`, `padding`, `itemSpacing`,
`textStyleId` per text node, and `componentProperties` on every nested
instance) from both the built node and the reference node via `use_figma`,
and compare them field-by-field before reporting the match as done — not
after the user has to ask "does this actually match?" a second time.

## Component description — mandatory template, written as part of the build

**Every `COMPONENT`/`COMPONENT_SET` gets its `.description` field written
before the build is reported done — not left blank, not deferred to a
follow-up pass.** The Figma description is what Dev Mode and any AI agent
translating the design reads first; an empty one forces a guess from the
name alone, which is exactly the failure mode `figma-variable-naming`
already fixed for variables (Sep 2026 description pass) — apply the same
discipline here, one layer up.

### Template

```
<one line: what it is>. Use for <situation>. Do not use for <situation> — use <other component>.
Code: <ExportName> from helix-design-system
```

- **Line 1 is mandatory, always.** One sentence covering what the
  component is, then the disambiguation pair: `Use for` (its actual
  situation) and `Do not use for … — use <X> instead` (the component it's
  most likely to get confused with). This last clause only works if you
  actually know the confusable sibling — check via `search_design_system`
  or the "Known reusable components" list above before writing it; don't
  invent a plausible-sounding alternative that isn't real.
- **Line 2 (`Code:`) — format still being finalized with the dev side
  (Robby), don't treat it as settled.** Until it's confirmed, default to
  `Code: <ExportName> from helix-design-system` — **not**
  `@nusantics/ui-kit/design-system`, which was in an early draft template
  but doesn't match this repo's actual package name (`helix-design-system`
  per `package.json`; see `helix-design-system` skill for the code-side
  architecture). If a component has no code counterpart yet (Figma-only,
  not built in Storybook), omit line 2 entirely rather than guessing an
  export name that doesn't exist.
- Keep line 1 to one sentence. This mirrors the code-side
  `CHANGELOG_GUIDE.md` template (1-3 sentences: what/when/behavior) but is
  intentionally more compact — the Dev Mode panel is narrow, and a
  multi-paragraph description won't get read there the way it might on a
  Storybook docs page.

### When to write it

- **New component**: write the description as part of the same build —
  same discipline as "Binding tokens" above (not a fix-after pass).
- **Existing component with no description, or a stale one** (found while
  auditing per "Auditing existing components" above): flag it and propose
  a description using this template — same reuse-first checking for the
  "Do not use for" clause — but confirm before overwriting an existing
  non-empty description someone already wrote, since it may encode intent
  you don't have visibility into.
- Write it on the `COMPONENT_SET` (not each individual variant
  `COMPONENT`) when the component has variants — that's what Dev Mode
  surfaces for any instance of it. A standalone `COMPONENT` with no
  variants gets its description directly.

## Layer naming — frames must describe their role, not be copy-paste artifacts

Name every frame/group after what it **is** in this component, the way
`Header` and `Price Row` already are — not a string leftover from wherever
the structure was duplicated from. A trailing digit (`List2`, `Frame 3`),
a generic Figma default (`Frame 431`, `Group 12`), or a name whose words
don't correspond to anything in the frame's own content (`Body Item List2`
on a frame with no list) is a signal the node was cloned and never
renamed — treat it as a naming bug, not a cosmetic nit, both when creating
a frame and when moving/wrapping existing content into a new one.

**Before naming a new frame, ask: read in isolation, without the
surrounding tree, does this name tell a teammate its role?** If not,
rename it. Match the short, role-based convention already used by
siblings in the same component instead of inventing a new style.

**Confirmed Sep 2026:** the white "detail" frame nested inside the `Icon
card` variants of both `Radio Group Item` and `Checkbox Group Item` was
named `Body Item List2` — describing neither a body, an item, nor a list,
with a leftover `2` from being duplicated at some point. Renamed to `Body`
(pairs naturally with the existing sibling `Header`) in both components.

**Procedure for a frame-naming audit (same retroactive scope as the
text-style audit below — applies to existing components, not just new
ones):**
1. `node.findAllWithCriteria({ types: ['FRAME', 'GROUP'] })` on the
   component/component-set/page in question.
2. Flag names matching a copy-paste-artifact pattern: trailing digits on a
   name that isn't a genuine numbered sequence, unedited Figma defaults
   (`Frame \d+`, `Group \d+`), or wording that doesn't match the frame's
   actual visible content.
3. Propose a role-based replacement consistent with sibling naming in the
   same component. If the same bad name appears in multiple components
   (as `Body Item List2` did in both Radio and Checkbox Group Item), rename
   it identically everywhere it appears rather than fixing only the
   component the request happened to mention — a name only one of two
   otherwise-identical components uses is itself a new inconsistency.

## Auditing existing components — this rule applies retroactively too

Text-style binding isn't just a build-time rule for new components — treat
any "check/review/audit this component" request as requiring the same
verification against **existing, already-shipped** components, not just
work you're about to write. Confirmed necessary Sep 2026: the `Checkbox`
component set (`GWzBKGr6512AeMOapwgQhj`, node `1910:163`) had 60 of 252
text nodes — the label and supporting-text nodes across **all 40
variants** (`Checked × Size × Text × Supporting text × State`) — using raw
`fontName`/`fontSize` with zero `textStyleId`, despite text elsewhere on
the same page being correctly styled. This had shipped and gone unnoticed
because the binding rule was only being enforced at build time, never
checked against components already in the file.

**Procedure for a text-style audit on any component:**
1. `node.findAllWithCriteria({ types: ['TEXT'] })` on the component/
   component-set/page in question.
2. Partition by `!!t.textStyleId` — anything falsy is unbound.
3. For each unbound node, find its nearest `COMPONENT`/`COMPONENT_SET`
   ancestor (not just the loose frame it sits in) so the report says which
   variants are affected, not just "some text somewhere."
4. Before proposing a fix, match the unbound node's current
   `fontName`/`fontSize` against `figma.getLocalTextStylesAsync()` to find
   the style that reproduces it exactly — bind to that one first (zero
   visual diff, safe to execute directly). If no existing style matches
   the current rendered appearance, that's a design decision (new style
   needed, or the current appearance itself needs to change) — surface it
   and ask, don't guess.
5. Run this same check on every component in a page/section when asked to
   "check" or "review" it, not just the one node explicitly linked — an
   unstyled-text bug found in one variant is a strong signal the same
   defect exists across sibling variants (it did, across all 40, in the
   Checkbox case).

**The same retroactive gap exists for corner radius, independently of
text.** A component can have every fill/stroke correctly bound to a
variable while `cornerRadius` sits as a raw literal with no
`topLeftRadius`/`topRightRadius`/`bottomLeftRadius`/`bottomRightRadius`
entry in `boundVariables` at all — `fills`/`strokes` being bound is not
evidence that radius is too; check it separately. **Confirmed Sep 2026:**
both shared base components `_checkbox` (node `2889:101802`, 52 variants
across `Type=Checkbox` and `Type=Check circle`) and `_radio-button` (node
`68:209300`, 20 variants) had **zero** variants with a bound corner
radius — every single one was a raw `4` (Checkbox) or `9999` (Check
circle / radio) literal, despite color bindings on the same nodes being
correct. Reported by the user as "corner radius variables got detached" —
worth noting the evidence didn't actually distinguish a real detach event
from the binding having never been set in the first place (every variant
was unbound with no exceptions, which is the same signature either way);
what matters practically is the fix, not the forensics.

**Procedure for a corner-radius audit (same retroactive scope, runs
alongside the text-style audit, not instead of it):**
1. `node.findAllWithCriteria({ types: ['COMPONENT', 'COMPONENT_SET', 'FRAME', 'RECTANGLE', 'INSTANCE'] })`
   on the component/component-set/page in question, filtered to nodes
   where `cornerRadius` is a number (not `figma.mixed`) and `> 0`.
2. Partition by `!!(n.boundVariables && n.boundVariables.topLeftRadius)` —
   anything falsy is unbound (checking `topLeftRadius` alone is enough
   when all four corners share one value; check all four independently if
   `cornerRadius` reads as `figma.mixed`).
3. Match the unbound node's current numeric value against
   `Border Radius/*` (`None`=0, `XS`=2, `SM`=4, `MD`=6, `LG`=8, `XL`=12,
   `2XL`=16, `3XL`=24, `Full`=9999) via `getLocalVariablesAsync('FLOAT')` —
   bind to the exact match first (zero visual diff, safe to execute
   directly), same rule as the text-style audit's step 4.
4. Because base components like `_checkbox`/`_radio-button` are nested
   into many composed molecules (`Checkbox`, `Radio Button`, `Checkbox
   Group Item`, `Radio Group Item`, …), fixing the base component's own
   variants is sufficient — instances inherit the bind automatically, no
   need to touch every downstream molecule separately. Confirm this with a
   screenshot of one downstream instance after the fix rather than
   assuming it propagated.
5. Run this same check whenever auditing any component for token
   compliance — corner radius is not covered by the text-style audit above
   and needs its own pass every time, not just when someone happens to
   notice a component "looks unbound."

## Scope discipline — "update on Figma" means Figma only

When a request says "update/implement on Figma" or names `use_figma`
specifically, scope all edits to the Figma file only — **do not** also
patch the corresponding code in `packages/helix-design-system` to match,
even when the same fix is obviously correct on both sides and Figma is the
source of truth. Figma and code changes ship and get reviewed on separate
tracks. Surface the mismatch you found and let the user decide whether/
when code should follow; only touch code when the request is explicitly
about code, or explicitly asks to sync both.

If you do find a code/Figma value mismatch while doing Figma-only work,
check `theme.css` for the resolved **hex value**, not just a name match —
this codebase's token names don't always mirror Figma's variable names
1:1 (e.g. Figma's `Colors/Surface/Hover` is `--color-container-primary-
hover` in code, not `--color-surface-hover`). A name-only search can miss
an existing equivalent and cause an accidental duplicate token proposal.

## After building

Run `figma-variable-naming`'s before-creating checklist for any *new*
variable this build required. If the component is destined for the
Storybook/code side too, hand off to `helix-design-system`'s new-component
workflow — but only if code work was actually requested (see scope
discipline above).
