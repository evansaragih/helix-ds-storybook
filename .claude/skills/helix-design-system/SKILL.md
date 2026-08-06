---
name: helix-design-system
description: "Conventions and architecture for the Helix Design System (Storybook + packages/helix-design-system, multi-brand: Nusantics/CeKolam/Causa). Load this before adding or editing components, tokens, or icons in this repo. Complements sync-design-docs (docs-site sync) and, for new-component workflow, the standing rule to auto-generate a description for new components."
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

Defined in `packages/helix-design-system/src/styles/theme.css`. The model is
already sound — the gap is adoption, not design:

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
