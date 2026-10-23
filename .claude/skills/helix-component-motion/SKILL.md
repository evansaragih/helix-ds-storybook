---
name: helix-component-motion
description: "How to implement animation / motion when building or editing a Helix component in Storybook (packages/helix-design-system/src/components): the --motion-* tokens, the shared .helix-pop panel animation, Radix exit-animation rules, expand/collapse and mount/unmount patterns, reduced motion, and how to verify. Load for ANY component with hover, focus, open/close, expand/collapse or enter/exit behaviour, and before calling a new component done."
---

# Helix component motion

Interactions in Storybook should feel smooth and **identical across components**.
That only works if every component takes its timing from the same place. This
skill is the checklist for doing that when you build or edit a component.

Companion to `helix-design-system` (architecture, tokens, new-component
workflow). Load both when adding a component.

## Rule zero — no literal durations or easings

Never write `0.15s`, `200ms` or `cubic-bezier(...)` in a component. Use the
tokens (defined in `packages/helix-design-system/src/styles/theme.css`):

| Token | Value | Use for |
|---|---|---|
| `--motion-duration-fast` | 160ms | hover, focus ring, press, chevron rotate, **all exits of small panels** |
| `--motion-duration-base` | 200ms | small overlays entering: popover, dropdown, select, tooltip, toast, dialog |
| `--motion-duration-slow` | 280ms | large panels (sheet, drawer), progress fills, carousel |
| `--motion-easing-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | state changes, expand/collapse, exits |
| `--motion-easing-decelerate` | `cubic-bezier(0.32, 0.72, 0, 1)` | **entrances** — fast in, gentle settle |

`motion.ts` (`MOTION_DURATION_FAST/BASE/SLOW`, easings) mirrors them **only** for
`setTimeout` unmount delays, which cannot read `var()`. If you ever change a
token, change `theme.css`, `motion.ts` and this table together.

## Pick the pattern

| The component… | Do this |
|---|---|
| changes colour / border / shadow / background on hover, focus, press, checked | Inline `transition` listing the properties: `transition: 'background-color var(--motion-duration-fast) var(--motion-easing-standard), border-color var(--motion-duration-fast) var(--motion-easing-standard)'`. List properties; avoid `all`. |
| rotates or slides a small part (chevron, switch thumb, indicator) | Same, on `transform` / `left`, fast + standard |
| is a **Radix popper panel** (Popover, Select, DropdownMenu, Tooltip, HoverCard …) | Put `className="helix-pop"` on `*.Content`. Nothing else — enter, exit and direction (from `data-side`) come from `theme.css`. If the Content already has a class, concatenate: `` className={`helix-pop ${scope}`} `` |
| is a **Radix modal** (Dialog, AlertDialog) | `className="helix-dialog-overlay"` on `Overlay`, `className="helix-dialog-content"` on `Content`. The content keyframes already include `translate(-50%, -50%)`, so keep centring via `top/left 50%` + transform. |
| slides in from an edge (Sheet, Drawer) | Keyframes `helix-sheet-<side>`, `--motion-duration-slow` + decelerate; overlay fades at base. Reuse `Sheet`. |
| expands / collapses (Accordion, Collapsible) | Radix `data-state` keyframes on `--radix-*-content-height`, base + standard. **Never animate `height: auto`.** |
| mounts / unmounts without Radix (toast, lightbox) | `mounted` + `shown` state, set `shown` after a double `requestAnimationFrame`, transition `opacity` + `transform` (base + decelerate), unmount after `MOTION_DURATION_BASE`. Copy `Toastr.tsx`. |
| fills / progresses (ProgressBar, ProgressCircle) | `width` / `stroke-dashoffset`, slow + standard |
| spins / loops (Spinner, loading) | `linear infinite`; exempt from reduced-motion, keep it short and subtle |

## Why exits need a real CSS animation (Radix Presence)

Radix keeps a panel mounted until its **exit animation ends** — but only if there
is an actual CSS `animation` on `[data-state="closed"]`. An inline `style`
transition or a JS timeout will not do it; the panel then vanishes instantly,
which is exactly the "not smooth" feeling. That is why panels use a **class** with
`data-state` selectors (in `theme.css` or a scoped `<style>` in the component),
not inline styles. Symptom of getting it wrong: opens fine, disappears abruptly.

## Do / don't

- Animate **opacity and transform** for panels; colour/border/shadow for controls. Not width/height/top/left of layout.
- Entrances use **decelerate**, exits use **standard** and the **fast** duration (leaving should feel quicker than arriving).
- Panels drift **4px** from the trigger and scale from 0.97; dialogs scale from 0.96. No bounce, no overshoot, no stagger unless a spec says so.
- Keep `transform-origin` tied to the trigger (`.helix-pop` already reads Radix's origin var).
- One animation per element. Do not stack a Radix animation and your own transition on the same property.
- Need a new duration/easing? Don't invent a literal — add a token (see Rule zero), then use it.

## Reduced motion

Handled once in `theme.css`: entrance/exit animations of `.helix-pop` and the
dialog classes become `none`, and every `transition` collapses to ~0ms. So
for components that follow the patterns above there is **nothing to add**.
If you write your own `@keyframes` inside a component `<style>` (as `Accordion`
and `Sheet` do), also add
`@media (prefers-reduced-motion: reduce) { .your-class { animation: none !important } }`.

## Checklist before a component is done

- [ ] No literal `s` / `ms` / `cubic-bezier` in the component (`grep -nE "[0-9]s\b|cubic-bezier" Component.tsx` — only spinner/loop animations may remain).
- [ ] Every interactive state change (hover, focus, checked, open) has a token transition.
- [ ] Anything that opens/closes uses a pattern from the table; its **exit** animates too.
- [ ] Own `@keyframes` have a reduced-motion override.
- [ ] If it is a new kind of overlay, add a demo to **Foundations/Motion → Overlays** (`src/stories/foundations/Motion.stories.tsx`).
- [ ] Verified in Storybook (below).

## Verify

1. `npm run storybook` → **Foundations/Motion**: *Tokens* (replay tracks) and *Overlays* (open and close each overlay — the close must animate).
2. In DevTools, open the component and inspect the panel: `getComputedStyle($0).animationName` should be `helix-pop-in` (open) and `helix-pop-out` (closed), with `0.2s` / `0.16s`. Dialogs: `helix-dialog-content-show` / `-hide`.
3. In macOS *Reduce motion* (or DevTools → Rendering → emulate `prefers-reduced-motion`) the panel should appear instantly.

## Where things live

| What | File |
|---|---|
| Tokens, `.helix-pop`, dialog classes, reduced motion | `packages/helix-design-system/src/styles/theme.css` (MOTION blocks) |
| JS mirror for unmount timers | `packages/helix-design-system/src/components/motion.ts` |
| Reference implementations | `Popover.tsx`, `Select.tsx`, `DropdownMenu.tsx`, `Tooltip.tsx` (`.helix-pop`) · `Dialog.tsx`, `AlertDialog.tsx` · `Sheet.tsx` · `Accordion.tsx` · `Toastr.tsx` (non-Radix mount) |
| Storybook demo | `src/stories/foundations/Motion.stories.tsx` |

## Known exceptions (leave as is)

`Spinner` / button loading spinner (`badge-spin`, `spinner-spin`), the `Input`
required-dot pulse, and the `HelixAnimation` / `Illustration` / `EmptyState`
artwork have their own keyframes. A couple of fields (`Input`, `Select`) still
use `transition: all` — list the properties when you next touch them.
