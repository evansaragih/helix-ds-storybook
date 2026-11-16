---
name: figma-component-mobile-menu
description: "Characteristics of the Mobile Menu component (node 8698:8130, Navbars page) in the Nusantics Design System Figma file — structure, slot/token structure, and known gotchas. Load before editing, extending, or auditing Mobile Menu via use_figma."
---

# Mobile Menu — Component Characteristics

Node `8698:8130` on the **Navbars** page (ORGANISM section, not the deprecated
`Navbars ❌`), Nusantics Design System Figma file (`GWzBKGr6512AeMOapwgQhj`).
Companion to `figma-component-marketing-navbar`.

## What it is / when to use it

Full-screen (375x832) panel shown when the hamburger on Marketing Navbar
`Device=Mobile` is tapped. Public marketing pages only. Not for the dashboard
(use Sidebar) and not a desktop side drawer (use Sheets, which is a 1280-wide
overlay with a 384 panel).

## Structure

Single COMPONENT (no variants), vertical auto layout, fill bound to the same
Surface variable as Marketing Navbar onScroll.

- `Header`: instance of Marketing Navbar `State=onScroll, Device=Mobile`, with
  the Menu Button's `Leading Icon Swap#47:4` set to `FaTimes`. Icon fill is
  re-bound to the same text variable as the hamburger (swapping the icon
  resets the override, so re-bind after any swap).
- `Menu Items`: real SLOT (property `Menu Items#8698:0`), FILL height. Default
  content is `_nav-link` rows (Leading=None, Surface=Light, State=Default;
  nested List Item padding override 14px, or 12px on group rows, for a 48px
  tap height). Plain rows use Trailing=None; group rows use Trailing=Icon with
  the Icon Button's `Leading Icon Swap` set to `FaChevronDown`. The expanded
  group's Icon Button is rotated 180 and its sub-items sit in an auto-layout
  frame with 16px left padding. After the last row (Knowledge Hub) sits the language row
  (`Language`, since 2026-11-13): a clone of the Knowledge Hub row (`_nav-link`
  Trailing=Icon, chevron down) with the text "English (EN)", so it looks like
  every other menu row. A Dropdown Menu (Small trigger) was tried first and felt
  different from the rest of the menu, so it was dropped. It is collapsed by
  default; an expanded language group would follow the group pattern above
  (sub-rows English and Bahasa Indonesia, 16px indent).
- `Footer`: real SLOT (property `Footer#8706:0`, since 2026-11-09). Default
  content (as of 2026-11-13): Divider (Line, Horizontal), then Login (Secondary
  Outline) and Contact Us (Primary Solid) in an `Actions` row, each FILL, then a
  `Legal` frame (gap 12, padding top 4): `Copyright` text (Body/Small-helper
  style, fill bound to Colors/Text/Subtler, wraps, FILL), `Legal Links` row (gap
  18: Button Primary Link sm, Underline=OnHover, "Privacy Policy" and "Terms of
  Use"; there is no Underline=None for Link) and `Social Media` row (gap 4: three
  Icon Button Secondary Ghost xs Rounded, icons AiFillInstagram, FaLinkedin,
  BsYoutube from the React-icons library, Notification Badge off). Slot padding
  16/16/16/32, gap 12. The language `Toggle` that sat here (2026-11-11) moved
  out: language is now a dropdown in the body. Do NOT use `Select / Dropdown`
  (node 3457:178450): legacy, wraps an old Dropdown Menu (3477:2250).
  Icon Button instances default to Notification Badge on (orange dot), turn it off.
  The `Social Media` row is ABSOLUTE at x=-6 (its 24px buttons carry 6px of inner
  space, so the 12px glyphs now line up with the text edge) and a 24px
  `Social Media Spacer` in the `Legal` frame holds its height. Move both together.
  The page Footer text "Terms of Service" became "Terms of Use" everywhere in the
  Landing Page file on 2026-11-13 (34 footer instances).

## Code

`MobileMenu` + `MobileMenuItem` in `packages/helix-design-system/src/components/Navbar.tsx`
(header, body and footer slots; Show* booleans map to `showHeader/showBody/showFooter`).
Marketing Navbar `device="mobile"` is the closed bar. Stories: Organism/Navbars/Marketing Navbar.

## Properties

- `Show Header`, `Show Body`, `Show Footer` (BOOLEAN, default true) bind
  `visible` on Header, Menu Items and Footer. Menu Items and Footer keep their
  `slotContentId` reference alongside `visible`.
- The component uses `SPACE_BETWEEN` on the primary axis so the footer stays at
  the bottom when the body is hidden. If header and body are both hidden the
  footer sits at the top.

## Gotchas

- Set the label on the nested TEXT node (`characters`), load Rubik Regular first.
- `_nav-link` `Trailing=Icon` was empty on every variant except Default/Light
  (which was 40px tall) until 2026-11-09. All 18 now carry a 24px Icon Button
  (placeholder icon, swap per instance), rows are 36px, Active/Dark icon fill
  follows the row text token (Dark Default On-Dark, Dark Hover Primary). An
  expanded group can now use State=Active. Library publish needed to reach
  other files.
- Pre-existing, not fixed: `Trailing=Icon` Dark variants have Subtle text
  (description says On-dark), and Light Active text is orange Text/Primary on
  a Surface/Subtle pill (plain Active uses On-Primary white).
- Expand/collapse is not a variant. Accordion Item was not used because its
  header slot is unclear; groups are List Item + indented sub-list.
- Padding overrides (14px rows, 12px slot) are manual numbers, not variables.
- Do not `clone()` this component or its slot; it demotes the SLOT to a frame.
- Library copies in the Landing Page file stay old until publish and update (the two Mobile Menu instances 470:60602 and 478:21568 there still show the Toggle footer until then).
