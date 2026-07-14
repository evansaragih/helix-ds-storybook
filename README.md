# Helix Storybook

Living documentation and interactive playground for the **Helix Design System**
(`../helix-design-system`), used by Nusantics, CeKolam, and Causa.

This is a separate project from `helix-design-system` on purpose: that repo is
the component library + Figma-make source, this one is the docs/playground
surface for designers and FE engineers. Components are never copied here —
they're consumed live via a pnpm workspace link, so this Storybook can never
drift from the real, shipped components.

## How it's wired

- `pnpm-workspace.yaml` links this project with `../helix-design-system` as a
  workspace package (`helix-design-system: workspace:*`).
- `helix-design-system`'s `package.json` exposes its source directly via
  `exports` (`./components`, `./styles/theme.css`, etc) — there's no build
  step, Vite transforms the linked `.tsx`/`.css` source on the fly.
- `.storybook/preview.tsx` loads `theme.css` globally and adds a **Brand**
  toolbar (nusantics / cekolam / causa) that toggles `data-brand` on a
  decorator wrapper, so every story can be previewed in all three brand modes.

## Getting started

```bash
corepack pnpm install   # from this folder — installs & links the workspace
corepack pnpm storybook # starts dev server on http://localhost:6006
```

To build a static, shareable version:

```bash
corepack pnpm build-storybook
```

## Adding/updating stories

Stories live in `src/stories/components/<Name>.stories.tsx`. Follow the
existing files as a template (CSF3, `tags: ['autodocs']`, argTypes for enum
props, a `Playground` story + named stories per variant/state). Import
components from `'helix-design-system/components'` — never re-implement or
copy component code into this project.

Editing a component in `../helix-design-system/src/components` updates this
Storybook immediately (hot reload) — no publish or version bump needed.
