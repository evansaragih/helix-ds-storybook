---
name: helix-design-system
description: "Code-side conventions and architecture for the Helix Design System (Storybook + packages/helix-design-system, multi-brand: Nusantics/CeKolam/Causa) — theme.css token layers, typography, component variants, versioning. Load this before adding or editing components, tokens, or icons in the codebase. For Figma-side variable naming, see figma-variable-naming; for building components in Figma, see figma-component-build; for docs-site sync, see sync-design-docs."
---

# Helix Design System — Project Skill

Conventions to *follow* and gaps to *close*, distilled from an architecture
audit against Origin Design System's maturity model. Full audit narrative
lives in `helix-design-system-log.md` (repo root) — read that for detail and
rationale; this file is the actionable ruleset going forward.

**Before any non-trivial token/icon/variant work, skim
`helix-design-system-log.md` §1** for the current known gaps so you don't
reintroduce them.

## Token architecture (three-tier: Primitive → Semantic → Brand mode)

Defined in `packages/helix-design-system/src/styles/theme.css`. **Figma is
the source of truth, always** — `theme.css` must mirror Figma's variable
values exactly, never the other way around. A 12 Aug 2026 audit found the
primitive ramp and several semantic tokens had drifted from Figma
undetected for a long time (see `helix-design-system-log.md` §5–§6 and
`helix-design-system-color-variable-review.md`) — when in doubt, re-read
the actual Figma variable via `use_figma`, don't assume `theme.css` is
already correct.

- **Primitives** (`--primitive-*`): raw color ramps per palette. Never
  reference directly in component code.
- **Semantics** (`--color-*`, `--text-*`, `--spacing-*`, `--radius-*`,
  `--shadow-*`, etc.): purpose-named tokens. **Always** bind component
  styles to these, never to a raw hex literal or primitive.
- **Brand modes** (`[data-brand="nusantics|cekolam|causa"]`): override only
  brand-aware semantic tokens (`--color-brand-*`, `--color-text-brand-*`,
  `--color-shadow-brand-*`, `--color-status-brand-bg`,
  `--color-input-border-focus`). Adding a new brand-aware need means adding
  it to this override block for all three brands, not hardcoding one brand's
  value.
- **No component-level (3rd) tier.** Components consume semantic tokens
  only — never invent a component-scoped color token. This is the exact
  mistake found in Figma's `Button/*` and `Action/*` groups (see
  `figma-variable-naming`) — they duplicated `Brand/*` as independent hex
  instead of aliasing it, and drifted the moment `Brand/*` changed. If a token is
  "derived from" another token, it must be a Figma variable **alias**, not
  a copied hex value — same rule applies in `theme.css`: don't hardcode a
  value that's meant to track another token.

## Figma variable naming — see `figma-variable-naming`

Naming formula, casing rules, the before-creating checklist, and the safe
rename/merge/delete procedure for Semantics/Semantics-Core variables all
live in the dedicated `figma-variable-naming` skill — that is the
Figma-side naming authority, load it before proposing or renaming any
variable. This file covers the code-side mirror only (below). For the
build-time rule on matching a bound variable's category to the node it's
applied to (text/icon/surface/stroke), see `figma-component-build`.

Known, confirmed-out-of-scope for now: dark mode (confirmed with
stakeholder Aug 2026 — light mode only, don't design a mode dimension into
new tokens).

### Alpha/transparency primitives — reuse levels, don't invent new ones

A semantic token needing translucency (e.g. a focus ring that must blend
over any background) requires a **Primitive** with alpha baked into its
RGBA — Figma variables can't alias a solid color while separately
overriding its alpha, so the primitive itself has to carry the alpha.

Naming pattern (revised Aug 2026 after review with frontend eng): `{Ramp}/
{Step}-a{N}` for any opacity **including 0** (e.g. `Red/50-a70` = Red step
50 at 70% alpha, `Red/40-a0` = Red step 40 fully transparent) — the `a`
prefix exists specifically so the number can never be misread as another
ramp step once `%` is stripped for kebab-case export (`red-50-a70` is
unambiguous; `red-50-70` would not be). Originally 0% kept a separate
`{Ramp}/{Step}/Transparent` spelling on the reasoning that "Transparent"
isn't a number so it isn't ambiguous — that held, but it meant two
spellings existed for the same concept (alpha) for no real gain, so it was
folded into `-a0` for one mechanical rule instead of a rule-plus-exception.
`White` and `Black` have no real numeric ramp (they're single absolute
colors, not 0–100 ramps like `Red`/`Blue`/`Neutral`) but still follow the
same `{Ramp}/{Step}-a{N}` shape for zero special-casing: they use a single
placeholder step `0` (e.g. `White/0` = opaque white, `White/0-a50` = white
at 50% alpha, `Black/0-a0` = fully transparent black). There is no
exception left in this convention — every color primitive in the file,
ramped or not, follows one mechanical naming rule.

**Before creating a new percentage, check whether an existing one already
covers the need** — the system has converged on a small set (`0`
(`Transparent`), `5`, `10`, `70`) precisely because reusing those instead
of inventing e.g. `a45` keeps the primitive layer from sprawling. Only add
a new percentage when the design genuinely calls for a different opacity,
not by default.

**Drift check — do this every time a base primitive's hex changes.** An
alpha primitive (`Red/50-a70`) stores its RGB as a static copy of its base
step (`Red/50`) — editing the base does **not** propagate to the alpha
variant automatically, since Figma can't alias a color while overriding
just its alpha channel. Before/after editing any primitive that has an
`-a{N}` derivative, search for `{that Ramp}/{that Step}-a*` and update
each one's RGB to match the new base hex, leaving its alpha untouched.
Treat a mismatch found here the same as any other drifted-value bug in
this log — it's silent and won't show up in a visual diff of the base
color alone.

**Hardcoded hex is not always wrong** — `var(--color-x, #fallback)` as a CSS
custom-property fallback is a legitimate defensive pattern (see
`Pagination.tsx`). What's wrong is a literal with *no* `var()` wrapper at
all when a semantic token for that exact value already exists (see
`IconButton.tsx`'s `destructive` variant in the log — sibling variants in
the same object correctly use `var(--color-btn-neutral)` etc., this one
didn't). Before adding any color value, check whether an existing semantic
token already equals it.

## Icon system — known gap, standardize before scaling further

No `Icon` primitive component exists yet. Current state: 28 components
import `lucide-react` directly (the de facto default); 3 components
(`Alert.tsx`, `CardMetric.tsx`, `Dropzone.tsx`) import from scattered
`react-icons/*` subpackages for glyphs lucide didn't have.

**Until an `Icon` wrapper exists:** default to `lucide-react` for any new
component. Only reach for `react-icons` if a specific glyph genuinely isn't
in lucide and pixel-parity with Figma requires it — and note it in the log
when you do, so the eventual `Icon` primitive migration has a complete list.
Don't introduce a fourth icon source without checking the log first.

## Typography — already close to the Origin standard, keep it that way

Always bind to the `--text-*` / `--line-height-*` scale in `theme.css`
(Display/Heading/Body/Caption/Micro). Don't hardcode `fontSize` or use
Tailwind arbitrary values like `text-[13px]` unless the size genuinely isn't
in the scale — and if you hit that case more than once, that's a signal to
extend the scale with a named token, not to keep inlining the pixel value.

## Component variants — no enforced pattern yet, be consistent with neighbors

No component uses `class-variance-authority` (`cva`) despite the
Radix + Tailwind stack. The de facto pattern is a hand-rolled variant object
keyed by variant name (see `IconButton.tsx`). Until this is formalized:
follow whatever the most recently-touched sibling component does rather
than inventing a new pattern, and make sure every entry in a variant object
uses tokens consistently — a hardcoded value in one variant next to
token-bound values in its siblings is exactly the kind of drift the audit
flagged.

## New component workflow

- Auto-generate a description for every new component — required field,
  standard part of the workflow, not a separate ask.
- Bind all colors/spacing/radius/type to semantic tokens per above.
- Default to `lucide-react` for icons.
- After Storybook/component changes, run the `sync-design-docs` skill to
  keep the docs site in sync.

## Migration discipline — additive, not disruptive

When closing a gap from the log (e.g. rebinding a hardcoded value to its
matching token), the change must be **visually invisible** — the token
should already resolve to the same value being replaced. Screenshot/visual-
diff the component after. Designers keep using the same Figma
components/variants throughout; nothing about migration work should require
them to change anything in Figma. Visible/breaking changes (new variants,
new states, restructured components) go through a separate staging track,
not a silent rebind pass — see `helix-design-system-log.md` for the
in-progress list of which is which.

## Versioning

`packages/helix-design-system` is pre-1.0 (`0.0.1`) with no changelog
discipline yet. Once token-rebind migration starts: patch = invisible
internal rebind, minor = new component/variant (additive), major =
breaking visual/API change. Fill `src/stories/Changelog.mdx` per release —
don't let changes land silently.

## When to ask the user vs. proceed

Ask when a component needs a color/size/state that has no clean match in
the existing semantic token set — present the gap and options, don't
silently approximate. Proceed without asking on mechanical rebind work
(swapping a literal for the semantic token that already equals it) once the
overall migration approach has been agreed.
