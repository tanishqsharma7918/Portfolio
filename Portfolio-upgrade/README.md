# Tanishq Sharma — Portfolio

A dark-first, motion-led portfolio built around a live galaxy that the whole
page flies through as you scroll. Next.js 14 (App Router), static-exported and
deployed on Vercel.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build   # static export → ./out
```

`next.config.mjs` sets `output: "export"`, so the build is a folder of static
files. There is no server at runtime — the contact form composes a `mailto:`
draft rather than posting anywhere.

## How it is put together

```
app/
  layout.tsx        fonts, theme provider, and the global layers
                    (preloader → smooth scroll → galaxy → grain → cursor)
  page.tsx          section order
  globals.css       design tokens, glass/panel components, utilities
components/
  galaxy.tsx        the canvas background (see below)
  smooth-scroll.tsx Lenis, plus gliding anchor links
  cursor.tsx        two-part cursor with spring lag and hover labels
  preloader.tsx     one-per-session intro counter and curtain
  navbar.tsx        floating pill nav + full-screen overlay menu
  …                 one file per section
  ui/               reveal primitives, magnetic wrapper, buttons, headings
lib/
  content.ts        every piece of copy, in one place
  use-media-query.ts
```

**Editing content.** Everything visible — projects, roles, metrics, skills,
links — lives in `lib/content.ts`. You should not need to touch a component to
change what the site says.

**The galaxy.** `components/galaxy.tsx` draws a 3D spiral disk on a 2D canvas:
stars are laid out along spiral arms, orbit with differential rotation (inner
stars are faster, as in a real disk), and are projected with perspective so
depth reads as size, brightness and parallax. Pointer movement tilts the
camera and repels nearby stars; scrolling flies the camera through the field
across exactly one page-length. It reads its palette from the CSS custom
properties, so it re-themes with the rest of the site.

It is built to stay cheap: device pixel ratio is capped at 2, star count
scales with viewport area, alpha is quantised into a precomputed colour table
to avoid per-frame string allocation, the loop pauses on `visibilitychange`,
and `prefers-reduced-motion` freezes the animation.

**Motion.** Framer Motion for reveals and layout transitions, Lenis for
scroll. Every reveal is `once: true` and margin-gated, so nothing re-animates
when you scroll back up.

## Accessibility

Reduced-motion is respected throughout (the preloader, smooth scroll and the
galaxy animation all stand down). The custom cursor only activates for fine
pointers. There is a skip link, visible focus rings, `aria-label`s on icon-only
controls, and the overlay menu and case-study sheet both close on `Escape` and
lock the page behind them.
