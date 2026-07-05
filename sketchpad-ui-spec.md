# Sketchpad — Project Spec

**Package:** `sketchpad-ui` · **Repo:** `sketchpad/sketchpad-ui` (own GitHub org)
**Stack:** React + Next.js, TypeScript, pnpm monorepo, zero-dependency rendering engine
**Status:** v0.1.0-draft
**Owner:** Aftaab / Sketchpad org

---

## 1. What this is

A production-quality React component library that renders every standard UI
primitive — buttons, inputs, cards, modals, tables, nav — in a hand-drawn,
"UX wireframe sketched in a notebook" visual style, while remaining fully
functional, accessible, and usable as the actual UI of a real product (not a
decorative skin, not a mockup generator).

The distinguishing constraint, repeated from the brief and worth stating
plainly because it drives every downstream decision: **this must not look
like Neobrutalism, Comic-book UI, or "cute doodle" component kits that
already exist.** Those use thick uniform black borders and bright flat
colors as a style statement. This library uses *irregular, low-contrast,
pen-on-paper* linework as its statement. The two are easy to blur into one
another during implementation, so component-level acceptance criteria below
explicitly call out where that line is.

Everything is built from scratch — the shape/path rendering engine in §4
included. Worth being clear about what that means concretely: a library
like rough.js only draws rough shapes; it has no notion of a button, an
input, a table, or accessibility at all — so the full component set in §6
was never something an existing library could provide regardless. What
changes here is the layer underneath: instead of leaning on rough.js's path
math, `sketch-core` is an original algorithm (§4.2), designed specifically
for this paper-and-ink aesthetic rather than adapted from a general-purpose
sketch-rendering tool.

### Non-goals (from brief, kept as a checklist to design against)
- Not Neobrutalism (no thick uniform 3-4px black borders + solid shadow blocks)
- Not Glassmorphism / Neumorphism / Claymorphism
- Not Material Design (no ripple, no elevation shadows, no filled circular FABs)
- Not "Corporate SaaS" (no glossy gradients, no rounded-4px enterprise cards)
- Not Apple-minimalism (no hairline 1px borders, no SF-style clean geometry)
- Not Cartoon/Comic UI (no thick colorful outlines, no bright flat fills)
- Not messy doodle art (must stay legible and usable at real sizes)

---

## 2. Positioning within your portfolio

This fits the same slot as HashPrep or the CacheVector site tooling: a
developer-facing, open-source-flavored artifact that (a) is genuinely useful
to other people building things, (b) demonstrates engineering taste, and (c)
is differentiable — there is no dominant "sketch UI kit" for React the way
there is for Neobrutalism (e.g. existing brutalism kits already crowd that
space). That's the actual opportunity here: nobody has done this one well
yet at production quality. Structurally it's living in its own GitHub org
rather than under CacheVector, given the scope (own docs site, own
component ecosystem, potentially its own icon package and Pro tier down the
line) — CacheVector can still link to it as a portfolio piece without
owning the repo.

Realistic framing: a component library is a much longer tail investment
than your app projects. It doesn't monetize the way a $4.99 iOS app does.
The plausible paths are (a) open-source under its own org as a portfolio/
credibility piece that drives freelance leads, (b) a paid "Pro" tier (extra
components, Figma kit, premium templates) sold on top of a free core, or
(c) using it as the actual UI for the Kip/Glowe/Siraj marketing sites rather
than the apps themselves (the apps should not use this — see §11). Pick one
of these as the primary motivation before Phase 1, because it changes how
much time is worth spending on docs/marketing polish vs. component coverage.

---

## 3. Architecture

### 3.1 Monorepo layout

```
sketchpad/
├── apps/
│   └── docs/                 # Next.js app — component docs + demo pages
├── packages/
│   ├── tokens/                # design tokens: colors, radii, stroke, roughness
│   ├── sketch-core/            # seeded RNG, original path generator, SVG border/line generators
│   ├── ui/                     # the actual component library (what gets published)
│   └── icons/                  # hand-drawn-style icon set (separate package, own versioning)
├── examples/
│   ├── landing-page/
│   ├── dashboard/
│   └── mobile-layout/
├── package.json
├── pnpm-workspace.yaml
└── turbo.json                  # or Nx — build orchestration across packages
```

**Why split `sketch-core` from `ui`:** the rough-border/seeded-randomness
engine is reusable independent of "here is a Button component." Keeping it
separate means you could theoretically reuse the sketch-rendering engine for
something unrelated (a diagram tool, a whiteboard app) later, and it forces
a clean API boundary now rather than tangled coupling later.

**Why a Next.js docs app instead of Storybook:** Storybook is faster to set
up for isolated component states, but a real Next.js app doubles as (a) your
actual documentation site you can deploy to something like
`sketchpad-ui.dev` (or similar, tied to whatever domain the new org uses), and (b) a live testbed for the three required
example layouts (landing page, dashboard, mobile). Storybook adds a second
build system to maintain for marginal benefit here. If component-state
matrix testing (all variants × all states) becomes painful in raw Next.js
pages, add Storybook later — don't start with both.

### 3.2 Tech choices, with rationale

| Decision | Choice | Why |
|---|---|---|
| Language | TypeScript, strict mode | Non-negotiable for a published library — consumers need types |
| Styling | CSS variables (tokens) + CSS Modules | Framework-agnostic tokens, no Tailwind lock-in for consumers who don't use Tailwind. Tailwind stays optional at the *docs app* level only |
| Border rendering | Original in-house path generator, zero dependencies | Full ownership of the algorithm, no bundle-size tax, no upstream breaking changes — traded against having to find our own edge cases (see §4) |
| Bundling | tsup | Simple ESM+CJS dual output, fast, minimal config vs. Rollup by hand |
| Package manager | pnpm workspaces | You're already on this pattern elsewhere (BLIP, ApiMask) |
| Font (body) | Inter or system-ui stack | Readable, neutral, doesn't compete with the ink linework |
| Font (annotation) | A single licensed handwritten webfont (e.g. "Caveat" or "Kalam") — self-hosted, not Google Fonts CDN | Avoid third-party font CDN dependency for a component library; self-host the woff2 |
| React version | React 18+, works with React 19 | Match Next.js current baseline |
| Distribution | npm package `sketchpad-ui`, published from its own GitHub org | Standalone project rather than nested under an existing org, given its scope |

---

## 4. The rendering engine (`sketch-core`)

This is the part that makes or breaks the whole library, and it is built
entirely in-house — **zero runtime dependencies.** No rough.js, no
canvas-drawing library, nothing pulled in to generate a path. Every line
here is code we own, can debug, and can keep improving without waiting on
an upstream maintainer.

It's worth being precise about what this buys and costs, honestly: owning
the shape math means no external bundle weight and no upstream breaking
changes ever surprise us, but it also means every edge case (self-intersecting
paths at extreme roughness, degenerate tiny shapes, corner math at very
small radii) is ours to find and fix. rough.js has years of issue-tracker
battle-testing behind its curve fitting; ours starts from zero. That's a
real tradeoff, not a free win — budget real QA time against it in Phase 1.

### 4.1 Deterministic seeded randomness

Never call `Math.random()` directly anywhere in a component. Every
component that needs "hand-drawn" variation derives its randomness from a
**seed** — by default, a hash of the component's `id`/`seed` prop, falling
back to a hash of its rendered size + a stable instance counter if no seed
is given. This guarantees:
- No flicker/reflow on re-render
- No SSR/client hydration mismatch (see §4.5 — this is the sharpest edge case)
- Two components with the same seed + size render identically (useful for
  testing and for intentionally-matching sibling components)

Implementation: a small mulberry32 PRNG (~10 lines, no dependency), seeded
via an FNV-1a hash of the seed string:

```ts
// sketch-core/src/random.ts
function fnv1aHash(str: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createSeededRandom(seed: string | number): () => number {
  return mulberry32(typeof seed === 'string' ? fnv1aHash(seed) : seed);
}
```

### 4.2 Original path-generation algorithm

The generator only needs to produce four shape families for UI purposes —
rect, rounded-rect, oval/pill, and straight line/underline — rather than
rough.js's arbitrary-polygon generality. Narrowing scope this way keeps
every function small, independently tree-shakeable (bundlers can drop the
oval generator entirely if a consumer never uses one), and easier to reason
about than a general-purpose shape library has to be.

**Core technique — segmented perturbation with corner overshoot:**
1. Divide each edge of the shape into 2–4 sub-segments (count driven by
   `roughness`: higher roughness → more segments → more visible waver).
2. Perturb each segment's endpoint perpendicular to the original edge by a
   random offset in `[-maxOffset, maxOffset]`, where `maxOffset` scales
   with the `roughness` token.
3. Connect perturbed points with quadratic Bézier curves rather than
   straight lines, with the control point itself jittered slightly — this
   is what produces a waver rather than a jagged zigzag.
4. **Corner overshoot (the differentiator):** at each corner, the incoming
   edge's path is extended 2–6% past the actual corner point before the
   outgoing edge begins, at a small random offset — the way a real pen
   often overshoots a corner slightly before correcting, rather than
   meeting it exactly. rough.js's curve-fitting rounds through the corner
   instead; this is a distinct, deliberately more "hand" look.
5. **Pressure-variable stroke width (the second differentiator):** rather
   than a uniform `strokeWidth`, the path is rendered as a filled shape
   (not a `stroke`) whose outline width varies along its length — thicker
   near corners and stroke-start points, thinner mid-edge — approximating
   real pen pressure. Implemented by generating two parallel offset paths
   (inner and outer edge of the "ink") at varying distance and filling
   between them, rather than relying on SVG's uniform `stroke-width`.

```ts
// sketch-core/src/paths.ts
interface SketchPathOptions {
  roughness: number;       // tokens.roughness.*
  strokeWidth: number;     // tokens.stroke.*  (base width, pressure varies around it)
  seed: number;
  overshoot?: number;      // default 0.04 (4%)
  pressureVariance?: number; // default 0.3
}

function generateRectPath(width: number, height: number, radius: number, opts: SketchPathOptions): string
function generateOvalPath(width: number, height: number, opts: SketchPathOptions): string
function generateLinePath(x1: number, y1: number, x2: number, y2: number, opts: SketchPathOptions): string
```

**Double-stroke:** rendered by calling the same generator twice with the
seed offset by a fixed delta (`seed + 1`), overlaying both paths at partial
opacity — no special-case code needed, it falls out of the seeded design
for free.

**Caching:** results are memoized by a key of
`(shapeType, width, height, radius, seed, roughness, strokeWidth)` in a
small `Map`, so repeated renders of an unchanged component (e.g. on
unrelated parent re-renders) skip path regeneration entirely — this matters
more here than it would with rough.js, since we don't get its years of
internal micro-optimization for free and need to be deliberate about it.

### 4.3 `<SketchBorder>` primitive

The base primitive nearly every component composes:

```tsx
<SketchBorder
  as="div"                    // polymorphic — renders whatever element wraps it
  variant="rect" | "rounded" | "oval" | "torn" | "underline"
  roughness={1.2}
  strokeWidth={1.5}
  seed="button-primary-1"
  doubleStroke={false}
  fill="none" | "paper" | "solid"
>
  {children}
</SketchBorder>
```

Internally: measures its content box via `ResizeObserver`, generates an SVG
path sized to match, and layers that SVG as an absolutely-positioned
background/foreground behind the actual DOM content. The DOM content
(text, inputs, etc.) stays as real, selectable, accessible HTML — **the
sketch border is always decorative and `aria-hidden`, never a replacement
for real interactive markup.** This is the accessibility linchpin of the
whole system: the wobbly SVG never becomes the click target or the focus
target; the real `<button>`/`<input>` underneath is.

### 4.5 Known hard edge case: SSR + ResizeObserver

`ResizeObserver` doesn't exist during server render. On first paint before
hydration, `<SketchBorder>` needs a deterministic fallback size (from a
`width`/`height` prop, or from CSS-based sizing with an SVG `viewBox` of
`0 0 100 100` and `preserveAspectRatio="none"` stretched via CSS) so there's
no flash-of-unstyled-border on load, then re-measures and regenerates the
exact path once mounted. This is worth calling out now, honestly, because
it's the kind of bug that looks fine in dev and then flickers visibly in
production on slower devices — budget real testing time for it, don't treat
it as a footnote.

### 4.6 Decorative primitives built on the same engine
`RoughLine`, `MarkerHighlight`, `CrossHatch`, `ScribbleLine`, `SketchArrow`,
`RoughUnderline`, `ConnectorLine`, `DoodleStar`, `PaperTape`, `FoldedCorner`
— all consume the same `generateLinePath`/`generateRectPath` functions with
different parameters. Build these *after* `SketchBorder` is solid; they're
straightforward once the engine works.

---

## 5. Design tokens (`packages/tokens`)

Ship as a plain TS object *and* generate a CSS variables file from it at
build time, so consumers can use either the JS tokens (for logic/props) or
the CSS vars (for styling overrides) without maintaining two sources of
truth.

```ts
export const tokens = {
  colors: {
    paper: '#FAF7EF',
    paperAlt: '#F7F1E3',
    paperBright: '#FBF8F0',
    ink: '#1D1D1B',
    inkSoft: '#3A3834',
    pencil: '#8A867C',
    disabled: '#B8B2A6',
    accentYellow: '#F6D96B',
    accentBlue: '#A7C7E7',
    accentRed: '#E99A8D',
    accentGreen: '#A8D5BA',
    accentLavender: '#C9B6E4',
  },
  radii: { sketchSm: 4, sketchMd: 10, sketchLg: 20 },
  stroke: { thin: 1, medium: 1.5, thick: 2.5 },
  roughness: { low: 0.6, medium: 1.2, high: 2.2 },
  shadow: { offsetSm: 2, offsetMd: 4 },
  font: {
    body: "'Inter', system-ui, sans-serif",
    annotation: "'Kalam', 'Caveat', cursive",
  },
} as const;
```

Contrast check (do this before locking the palette): `ink` (#1D1D1B) on
`paper` (#FAF7EF) — verify against WCAG AA for body text at whatever final
weight/size you ship (small hand-drawn strokes reduce *perceived* contrast
even when the numeric ratio passes, so eyeball it on an actual low-res
laptop screen, not just a contrast checker).

---

## 6. Component inventory

Organized by package sub-folder. Each entry: variants, key states, and the
one thing to get right per the brief.

### 6.1 Core
- **Button** — variants: primary, filled, accent, ghost, link, icon.
  States: hover (translate 1-2px + stronger stroke), active (shadow
  collapses to 0 offset), focus (visible sketch ring, not just outline:none),
  disabled (pencil-gray stroke, muted text, no shadow).
  *Get right:* it must still visually read as "clickable" at a glance —
  test by showing someone a screenshot for half a second.
- **Icon Button** — circular/square sketch border, same state set as Button.
- **Badge** — pill with imperfect oval border; stamp variant (rotated
  slightly, thicker double-stroke); marker-highlight variant.
- **Tooltip / Popover** — small paper-note shape, rough border, arrow as a
  small triangle path (not a CSS border-triangle hack — use the same path
  generator for consistency).
- **Avatar** — circular or square sketch frame; placeholder state uses the
  same crossed-diagonal pattern as ImagePlaceholder at small scale.

### 6.2 Forms
- **TextInput / Textarea / SearchInput** — sketch border, focus = stronger
  ink outline or marker-highlight underline (pick one behavior and stay
  consistent across all input types, don't mix).
- **Select** — custom dropdown (don't rely on native `<select>` styling,
  it can't render a sketch border) but must remain a real listbox with full
  keyboard support (arrow keys, typeahead, Escape) — this is a common trap
  where custom selects quietly break accessibility.
- **Checkbox** — hand-drawn tick that "draws itself" on check (stroke-dasharray
  animation, see §9).
- **Radio** — imperfect circle, filled dot on select.
- **Toggle** — sketched pill + hand-drawn circular knob; knob position
  animates on toggle.
- **Slider** — sketch-bordered track, marker-fill for the filled portion,
  hand-drawn circular thumb.
- Error state: dusty-red rough underline or circle — **never color alone**;
  pair with a small hand-drawn exclamation icon and real `aria-invalid` +
  visible error text (brief explicitly calls for this; it's also a straight
  WCAG requirement, not just a nice-to-have).

### 6.3 Navigation
- **Navbar**, **Sidebar** — rough hover highlights on items (a loose
  marker-style box behind the active/hovered item, not a solid fill).
- **Tabs** — folder-tab shape (small trapezoid-ish sketch path per tab),
  active tab = marker highlight or thicker underline.
- **Breadcrumbs** — separators are tiny sketched arrows (reuse `SketchArrow`).
- **Pagination** — small sketch-boxed number buttons.
- **Stepper** — connected circles via `ConnectorLine`, filled/rough states
  per step (done / current / upcoming).

### 6.4 Layout
- **Container, Stack, Grid** — plain layout primitives, no sketch styling
  themselves (they're structural, not visual).
- **Paper** — the base "sheet" surface other components sit on; supports
  optional folded-corner and tape-pinned decorations as boolean props.
- **Divider** — rough horizontal line, dashed-sketch variant, double-stroke
  variant.
- **Frame / Browser mockup / Phone mockup / Window mockup** — decorative
  device frames for showcasing screenshots inside the sketch aesthetic
  (useful for your own marketing pages, e.g. showing Glowe/Siraj screenshots
  inside a hand-drawn phone frame).

### 6.5 Overlays
- **Modal** — paper-sheet-on-paper-sheet look: subtle offset second sketch
  outline behind the modal to imply stacking, sketched-X-in-circle close
  button, subtle non-glossy backdrop (flat dark overlay at low opacity, no
  blur).
- **Drawer** — same visual language, slides from an edge.
- **Alert Dialog** — modal variant with a required action, no dismiss-by-backdrop.
- **Toast** — small paper-note shape, appears/disappears without slick
  slide-and-bounce — a simple fade + tiny pop is enough (per brief's
  animation restraint).

### 6.6 Data display
- **Table** — sketch border around the whole table, rough horizontal row
  dividers (not vertical column lines — keep it airy per wireframe convention),
  slightly bolder header row.
- **List** — simple, mostly typographic; minimal decoration.
- **Timeline** — vertical `ConnectorLine` with small circle markers per event.
- **Stat Card** — big number, small hand-drawn arrow indicating trend
  up/down, paper card background.
- **Progress Bar** — sketch-bordered track, marker-color fill.
- **Skeleton Loader** — rough scribble lines (deterministic per-seed widths,
  not smooth gray bars) — this is one of the more visually distinctive and
  easy-to-get-wrong pieces; a bad implementation just looks like a broken
  loading state rather than an intentional one.
- **Empty State** — illustration slot (use `ImagePlaceholder` or a custom
  doodle) + handwritten-style helper text.

### 6.7 Decorative / annotation layer
`ScribbleLine`, `SketchArrow`, `CircleHighlight`, `MarkerHighlight`,
`CrossHatch`, `ImagePlaceholder`, `PaperTape`, `FoldedCorner`,
`HandwrittenNote`, `DoodleStar`, `RoughUnderline`, `RoughBox`, `ConnectorLine`.

This layer is what separates this from "just another bordered-component
kit" — per the brief, the annotation language *is* the aesthetic. Don't
treat these as optional polish; they need real design attention and their
own doc page showing how to compose them around real components (e.g. a
`SketchArrow` pointing at a button with a `HandwrittenNote` reading "this
triggers X").

**ImagePlaceholder** in particular, spelled out since it's called out
explicitly in the brief:
```tsx
<ImagePlaceholder
  width={320} height={200}
  caption="hero image"        // optional handwritten caption below
  showIcon                     // optional tiny image icon in the corner
  skeletonLines={2}            // optional skeleton text lines beneath
  seed="hero-1"
/>
```
Renders: sketch rect frame → two crossing diagonal lines inside → optional
small icon → optional caption in the handwritten font → optional skeleton
lines below the frame.

---

## 7. Component API conventions

Every component in `packages/ui` accepts, where relevant:

```ts
interface SketchComponentProps {
  className?: string;
  children?: React.ReactNode;
  variant?: string;           // component-specific variant union
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  seed?: string | number;     // deterministic sketch variation
  roughness?: number;         // overrides token default
  strokeWidth?: number;       // overrides token default
  accent?: 'yellow' | 'blue' | 'red' | 'green' | 'lavender';
}
```

Rule: **no component invents its own randomness.** If it draws anything
hand-drawn, it takes a `seed` (with a sane auto-derived default) and passes
it straight to `sketch-core`. This is the rule most likely to get bent under
deadline pressure — flagging it now so it's a conscious exception if it
ever happens, not a silent one.

---

## 8. Accessibility — non-negotiable checklist

- Every interactive component is built on the correct native/ARIA element
  (`<button>`, real `<input>`, listbox pattern for Select) — sketch styling
  is layered on top, never a replacement for semantics.
- Visible focus state on every interactive component, distinct from hover
  (a stronger/thicker sketch outline, not just `outline: none` with nothing
  replacing it — this is the single most common accessibility regression in
  "styled from scratch" component libraries).
- Color is never the sole error/success signal — icon or text always
  accompanies the red/green accent.
- Contrast between ink and paper verified at AA for body text; re-check
  specifically for `pencil` (placeholder/disabled) text, which is
  intentionally low-contrast and must not be used for anything required to
  be read.
- Full keyboard operability: Tab order, Escape closes overlays, Arrow keys
  in Select/Radio groups/Tabs, Enter/Space activates buttons.
- Reduced-motion: every animation in §9 respects
  `prefers-reduced-motion` and degrades to an instant state change.
- Minimum touch target size maintained even though borders are irregular —
  hit area is the bounding box, not the visual ink path (the wobble should
  never shrink the actual clickable/tappable region).

---

## 9. Animation — restraint list

Allowed (from brief, kept intentionally short):
- Hover: 1-2° rotation or 1-2px translate
- Button press: shadow offset collapses to 0
- Marker highlight: draws left-to-right (`clip-path` or width transition)
- Checkbox tick: `stroke-dasharray`/`stroke-dashoffset` draw-on animation
- Modal: small scale+opacity pop-in (no spring physics, no bounce overshoot)

Explicitly disallowed: spring/bounce easing, blur transitions, 3D
transforms, parallax, anything longer than ~200ms for a state change.
All animations gated behind `prefers-reduced-motion: no-preference`.

---

## 10. Responsiveness rules

- Below a defined breakpoint (e.g. 480px), reduce `roughness` and disable
  purely decorative elements (`PaperTape`, `FoldedCorner`, stray
  `HandwrittenNote`s) by default — keep functional sketch borders, drop
  ornamental ones.
- Stroke width scales down slightly on small screens so borders don't read
  as disproportionately thick relative to text size.
- Handwritten-font annotations shrink or hide first when space is tight;
  they're the lowest-priority visual element on mobile.

---

## 11. Where this library should and shouldn't be used

Being direct about this since it's easy to get carried away: **do not use
this for Glowe or Siraj.** Those are faith-based journaling apps where the
tone needs to be calm, trustworthy, and unobtrusive — a hand-drawn wireframe
aesthetic actively works against that. This library is a much better fit
for: this component library's own docs/marketing site, a personal portfolio
site, the Kip screen-time app's *marketing* page (not necessarily its core
in-app UI, which likely needs to feel calm/supportive rather than "sketchy"
too — worth a separate design decision when you get there), or freelance
pitch decks/prototypes for clients who want a distinctive early-stage
wireframe look.

---

## 12. Phased roadmap

| Phase | Deliverable | Rough scope |
|---|---|---|
| 0 | Repo scaffold, pnpm workspace, tsup config, tokens package | 1-2 days |
| 1 | `sketch-core`: seeded RNG, original path generator (rect/oval/line, corner overshoot, pressure-variable width), `SketchBorder` primitive, SSR-safety fix | 5-8 days — this is the load-bearing phase, and now includes original algorithm work with no reference implementation to lean on, so it's longer than a wrapper-based version would be. Don't compress it |
| 2 | Decorative primitives (RoughLine, MarkerHighlight, CrossHatch, ImagePlaceholder, etc.) | 2-3 days |
| 3 | Core components (Button, IconButton, Badge, Tooltip, Avatar) | 3-4 days |
| 4 | Form components (Input, Select, Checkbox, Radio, Toggle, Slider) | 4-6 days — Select is the long pole here |
| 5 | Navigation (Navbar, Sidebar, Tabs, Breadcrumbs, Pagination, Stepper) | 3-4 days |
| 6 | Overlays (Modal, Drawer, Alert Dialog, Toast, Popover) | 3-4 days |
| 7 | Data display (Table, List, Timeline, Stat Card, Progress, Skeleton, Empty State) | 3-4 days |
| 8 | Example pages: landing page, dashboard, mobile layout | 3-5 days |
| 9 | Docs site content, a11y audit pass, performance pass (SVG regeneration cost on resize/rerender), publish to npm | 4-6 days |

Total: roughly 6-8 weeks of solo, part-time effort if quality bar stays
high throughout — a bit longer than an earlier wrapper-based estimate would
run, specifically because Phase 1 now includes original algorithm work with
no existing implementation to fall back on. Worth weighing against the
monetization question in §2 before committing fully.

---

## 13. Risks, stated plainly

- **Owning the path math means owning its bugs.** rough.js has years of
  real-world edge cases already shaken out (degenerate tiny shapes,
  self-intersecting curves at high roughness, extreme aspect ratios). Ours
  doesn't have that history yet — treat Phase 1 as needing genuine
  fuzz-testing (generate shapes across a wide range of width/height/
  roughness/radius combinations and visually spot-check the outliers), not
  just a few manual eyeball checks.
- **Corner overshoot and pressure-variable width are novel enough that
  there's no reference implementation to check against** — budget extra
  time in Phase 1 specifically for these two features, since "does this
  look intentional or like a rendering bug" will take iteration to get
  right, more than a standard uniform-stroke rect would.
- **SVG regeneration on every resize** could get expensive if many
  sketch-bordered components sit on one page (e.g. a dashboard with 20
  cards). Debounce `ResizeObserver` callbacks and consider caching
  generated paths per (seed, width, height) tuple.
- **Visual QA is inherently manual.** There's no automated test that tells
  you whether a border "looks hand-drawn" vs. "looks broken" — budget real
  human eyeball time per component, ideally at multiple zoom levels and on
  an actual low-DPI screen, not just a retina dev monitor.
- **Font licensing** for the handwritten annotation face — confirm license
  terms allow self-hosting/webfont embedding before shipping, don't assume.
- **Scope creep is the biggest practical risk.** The decorative/annotation
  layer (§6.7) is fun to keep expanding indefinitely. Treat the list in
  this spec as the v1 boundary; resist adding "just one more doodle
  component" mid-build.

---

## 14. Naming — final

**Project name: Sketchpad.**
**npm package: `sketchpad-ui`** (checked against the npm registry —
available unscoped, no squatting/collision).
**Repo: its own GitHub org** (e.g. `github.com/sketchpad-ui`), not nested
under CacheVector — a deliberate choice given its scope.

Real dictionary word, not a portmanteau or invented blend, matches the
preference for grounded engineering vocabulary. Decided now rather than
left open, since the package/repo name touches every import path and
renaming after Phase 0 is real, avoidable churn.

---

## 15. Definition of done for v1.0

- All components in §6 implemented, documented, and used in at least one
  of the three example layouts.
- Full accessibility checklist in §8 passes a manual audit (keyboard-only
  pass, screen reader spot-check, contrast check).
- Published to npm from its own GitHub org, with a live docs site.
- No `Math.random()` calls anywhere in the codebase outside test fixtures.
- Zero runtime dependencies confirmed in the published package.json —
  this is a stated selling point, so it needs to actually be true, not
  just asserted.
- Bundle size documented in the README so consumers know exactly what
  they're pulling in.
