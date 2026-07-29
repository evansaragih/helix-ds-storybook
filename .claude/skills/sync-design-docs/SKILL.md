---
name: sync-design-docs
description: Sync the Helix Design System docs site (packages/helix-design-system, deployed to Vercel) with the Storybook (root, src/stories) after component/token/story changes. Use when the user asks to sync, update, or check the design system web app against Storybook, or after adding/changing components, tokens, or foundation stories.
---

# Sync Design Docs

This repo has two consumers of the same component library
(`packages/helix-design-system/src/components/`):

1. **Storybook** (root `src/stories/`) — dev-facing, story-per-variant, driven
   directly by CSS custom properties via `helpers.tsx` (`TokenSwatch`, `Bar`, etc).
2. **Helix Design System web app** (`packages/helix-design-system/src/app/`,
   deployed to Vercel) — polished bespoke docs site, one hand-written
   `*Section.tsx` per component/foundation page.

Components are a single shared source (no duplication — both import the same
`.tsx` files), so component logic changes are automatically in sync. **The
`*Section.tsx` docs pages are NOT auto-generated from stories** — they were
hand-authored once and drift silently. This skill re-syncs them.

## When to run this

- After adding/changing a component in `packages/helix-design-system/src/components/`.
- After editing `packages/helix-design-system/src/styles/theme.css` (tokens).
- After adding a new `*.stories.tsx` file in `src/stories/components/` or `src/stories/foundations/`.
- Periodically, or whenever the user asks to "sync"/"update" the design system web app.

## Steps

1. **Find new/missing docs pages.**
   Diff the component list in `src/stories/components/*.stories.tsx` and
   foundation list in `src/stories/foundations/*.stories.tsx` against
   `packages/helix-design-system/src/app/data/navigation.ts` +
   `packages/helix-design-system/src/app/components/*Section.tsx`.
   Flag anything in Storybook with no corresponding `*Section.tsx` (check first
   whether it's actually a sub-section folded into an existing page, like
   AvatarLabelGroup living inside AvatarGroupSection — don't duplicate).

2. **Check token/data drift on existing pages.**
   For pages that hardcode values instead of reading `var(--token)` directly
   (e.g. `PrimitivesSection.tsx`, `ElevationSection.tsx`), grep
   `packages/helix-design-system/src/styles/theme.css` for the current token
   values and compare against the hardcoded data in the `*Section.tsx` file.
   A `var(--name)` reference to a token that no longer exists in `theme.css` is
   a hard bug (renders nothing) — always fix those first.

3. **Build new sections in the existing house style.**
   Every page uses `PageLayout` + `Section` from
   `packages/helix-design-system/src/app/components/PageLayout.tsx` (hero
   banner, sticky "On This Page" toc, `id`/`tocItems` pairing). Look at a
   sibling `*Section.tsx` for the closest existing pattern (e.g. another
   component-with-demo page) before inventing new structure. Import the real
   component from `../../components` (or `../../components/<Name>`), not from
   `helix-design-system/*` (that alias only resolves inside the root
   Storybook workspace).

4. **Wire it up.**
   - Add the nav entry to `foundationItems` or `componentItems` in
     `packages/helix-design-system/src/app/data/navigation.ts`.
   - Import the new `*Section.tsx` and add a `case` in the `switch` inside
     `packages/helix-design-system/src/app/components/MainContent.tsx`.

5. **Verify.**
   Run `npx vite build` from `packages/helix-design-system/` (not `tsc
   --noEmit` — this package has pre-existing unrelated type errors from a
   Radix/lucide version mismatch that don't affect the actual Vite build
   Vercel runs). A clean build is the bar, not a clean `tsc`.

6. **Don't commit `packages/helix-design-system/dist/`.**
   That folder is checked into git from an old merge but is build output —
   `git restore`/`git clean` it before committing if a local build dirtied it.
