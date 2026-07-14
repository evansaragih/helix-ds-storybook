# How this Storybook tracks component changes

This is the guide for asking an AI (or a human) to record a change to a
component in this repo — new component, new/dropped variant, deprecation,
removal, or any other change worth surfacing to whoever consumes this design
system.

Read this before you ask an AI to "add a changelog entry" so you know what
good input and good output look like.

## How the system works

- Every component's changelog lives in one place: `src/data/changelog.ts`, as
  a `changelog` array inside that component's `ComponentChangelog` entry.
  There is no separate `CHANGELOG.md` file — `changelog.ts` *is* the source
  of truth.
- Each component entry also carries a `status`: `"stable"` | `"beta"` |
  `"deprecated"`.
- Storybook renders both automatically:
  - The component's own **Docs** tab shows its `status` badge near the top
    and its `changelog` table at the bottom (via
    `src/stories/blocks/ComponentDocsPage.tsx`, wired up as the default docs
    page for every component in `.storybook/preview.tsx`).
  - The global **Changelog** page (`?path=/docs/changelog--documentation`)
    reads every component's `changelog[]` via `getChangelogEntries()`,
    flattens them, sorts newest-first, and links each row back to that
    component's Docs page. It updates automatically the next time Storybook
    is built — you never edit that page directly.

**Data grows, the page doesn't get unwieldy.** Entries are append-only by
design (see below) — nothing is ever pruned, so this is a permanent audit
trail. `src/stories/blocks/ChangelogTable.tsx` handles the scale: it paginates
15 rows at a time (using the design system's own `Pagination` component) and
lets you narrow the list to a custom date range (using `DatePicker` in `range`
mode). Neither of those needs touching when you add an entry — they just
operate on whatever `getChangelogEntries()` returns.

Because of that, "add a changelog entry" always means: **edit the right
component's entry in `src/data/changelog.ts`.** Nothing else needs to be
touched for the entry to show up everywhere (aside from the story file, if
the change itself needs a new/updated story).

## The schema

```ts
interface ChangelogEntry {
  date: string;    // "YYYY-MM-DD", the day the change was made
  version: string; // matches package.json's version at the time, e.g. "0.0.1"
  summary: string; // one sentence, see style rules below
}

type ComponentStatus = 'stable' | 'beta' | 'deprecated';

interface ComponentChangelog {
  id: string;             // lowercased component name, e.g. "cardmetric" for CardMetric
  name: string;            // display name, e.g. "CardMetric"
  category: string;        // sidebar subgroup, e.g. "Data Display" — must match the story's title
  description: string;     // 1-3 sentences: what it is, when to use it, notable behavior
  status: ComponentStatus;
  changelog: ChangelogEntry[];
}
```

- **`description` is required for every component, including brand-new ones —
  never leave it blank or defer it.** It renders at the top of the component's
  Docs page (via `ComponentDocsPage.tsx`) below the status badge. Write 1-3
  sentences: what the component is, its primary use case, and — if relevant —
  a one-line pointer to a component it's easily confused with (e.g. "use
  Switch instead when..."). Base it on the component's actual prop API and
  behavior (check `helix-design-system.md` / the `helix-design-system` skill
  for the full spec), not just its name.
- **`category` must match the story file's title exactly.** Components are grouped
  functionally in the sidebar (`title: 'Components/<category>/<name>'` in each
  `.stories.tsx`) — currently one of `Inputs & Forms`, `Data Display`, `Navigation`,
  `Feedback & Status`, `Overlays`, `Layout`. `getComponentDocsId()` in
  `src/data/changelog.ts` builds the Docs page link from `category` + `name`, so a
  mismatch here silently breaks that component's link on the global Changelog page.
- **Append-only.** Never edit or delete a past entry to "clean it up" — like
  a real changelog, old entries are a historical record. If something needs
  correcting, add a new entry that says so.
- **Sort order doesn't matter when writing** — `getChangelogEntries()` and
  the docs-page table both sort by date at render time. Just append to the
  array.
- **`id` must match the story title's last segment**, lowercased with
  non-alphanumeric characters stripped (e.g. `Components/AlertDialog` →
  `alertdialog`). That's how `ComponentDocsPage.tsx` and the global
  Changelog page resolve which data belongs to which Docs page. If you add a
  brand-new component, its story file's `title` (in the `meta` of its
  `.stories.tsx`) and its `changelog.ts` `id` must agree.

## Which component's entry gets the changelog?

Log the change against **the component whose documented behavior actually
changed** — not necessarily whichever primitive happens to implement it
under the hood. If a change is really composed from another component (e.g.
a "Button Group" pattern built from `Button` + a wrapper), log it against
wherever a developer would naturally look for it, and say in the `summary`
what it's actually composed from so nobody thinks the underlying component
grew a new prop.

## When to add an entry (and when not to)

**Do log:**
- A new component gets documented for the first time
- A new variant, size, or state gets added to a component's stories/props
- A component or variant is marked `deprecated`
- A component or variant is removed entirely
- A breaking change to how a component should be used

**Don't log:**
- Story/Storybook wording tweaks that don't change behavior or guidance
- Fixing a typo, broken link, or formatting
- Design-token value changes that come from a Figma re-sync (those belong to
  the token pipeline's own history, not a component's changelog)

If you're not sure, ask: *"would a developer who built against this
component last month need to know about this?"* If yes, log it.

## Writing the `summary`

Keep it one sentence, and make it useful to someone who wasn't in the room:

- Name what changed (new variant / deprecated / removed / breaking guidance
  change)
- If it maps to a Figma component/node, include the node ID (e.g.
  `node 3126:27821`) so a designer can cross-check
- If the change isn't a literal new prop on the component (like a composed
  pattern), say what it's actually built from
- Skip the "why" unless it's non-obvious — the "what" is what future readers
  scan for

## Status field

- `"stable"` — documented, in normal use. Default once something has a
  changelog.
- `"beta"` — documented but still settling; expect follow-up changes.
- `"deprecated"` — still present, but shouldn't be used in new work. Add a
  changelog entry explaining the replacement/migration path in the same
  summary.

Removing a component's entry entirely is a separate, larger step (see
below) — `deprecated` status is for "still exists, don't start anything new
on it."

## Full workflow for an AI to follow

When asked to record a component change:

1. Find the component's entry in `src/data/changelog.ts` by `id` (or add a
   new one if this is a brand-new component).
2. **Brand-new component: write its `description` now, not later.** This is
   not optional — every entry in `componentChangelogs` must have one. Base it
   on the component's real prop API and behavior (check the
   `helix-design-system` skill / `helix-design-system.md` for the spec), not
   a guess from the name alone.
3. If it's a new variant/pattern, add or update the matching Storybook story
   in `src/stories/components/<Component>.stories.tsx` so the live example
   and the changelog stay in sync. Story `title` must be
   `'Components/<category>/<Name>'` — pick the closest existing category
   (`Inputs & Forms`, `Data Display`, `Navigation`, `Feedback & Status`,
   `Overlays`, `Layout`) and use that same string for `category` in step 1.
4. Set/update `status` if relevant.
5. Append one new object to that component's `changelog[]` with today's
   date, the current `package.json` version, and a one-sentence `summary`
   per the style rules above.
6. Verify: `npx tsc -p tsconfig.json --noEmit` (or the project's typecheck
   command), then start Storybook (`pnpm storybook`) and check both the
   component's own Docs page and the global Changelog page
   (`?path=/docs/changelog--documentation`) render the new entry, and that
   the changelog link navigates correctly.
7. Report back which component's entry changed and the Storybook Docs URL
   to check.

## Removing a component entirely

Don't hard-delete a changelog entry the moment something is dropped:

1. Set `status: "deprecated"` and add a changelog entry explaining the
   replacement (or that there isn't one).
2. Leave it in place for at least one release cycle so anyone still
   consuming it sees the deprecation notice in Storybook.
3. Only delete the entry from `src/data/changelog.ts` (and its story file)
   once you're actually pulling it out of use — and when you do, that
   deletion itself is worth one last changelog entry on whatever's replacing
   it, not on the entry you just removed (it's gone).

## Prompt templates

Copy/adapt these when asking an AI to do this work:

**Adding a variant to an existing component:**
> Add a `<variant name>` variant to `<component>` — it's `<how it's
> implemented, e.g. a prop combination / composed from another component>`.
> Figma node: `<node id if applicable>`. Update its Storybook story and log
> the change in `src/data/changelog.ts` per `CHANGELOG_GUIDE.md`.

**Documenting a brand-new component:**
> `<Component>` doesn't have a story yet — add
> `src/stories/components/<Component>.stories.tsx` following the existing
> pattern, add a new entry to `src/data/changelog.ts` with a written
> `description` (required, not a placeholder) and `status: "beta"`, and log
> it as a new-component changelog entry per `CHANGELOG_GUIDE.md`.

**Deprecating something:**
> Mark `<component/variant>` as deprecated — `<reason, and what replaces it
> if anything>`. Update its `status` in `src/data/changelog.ts` and add a
> changelog entry explaining the migration path, per `CHANGELOG_GUIDE.md`.
> Don't delete the entry yet.

**Removing something for real:**
> We're done deprecating `<component/variant>` — remove its entry from
> `src/data/changelog.ts` and its Storybook story. Log the removal as a
> changelog entry on `<whatever replaced it, if applicable>` per
> `CHANGELOG_GUIDE.md`.

**Checking what's changed recently:**
> What's changed in the design system in the last `<timeframe>`? Check
> `src/data/changelog.ts` (or just open the Changelog page in Storybook) and
> summarize.
