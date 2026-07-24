# Sketchpad UI — Rebuild Specification

Sketchpad UI is a cross-framework Neubrutalist component library intended for
game interfaces and playful products.

## Product contract

- React/Next.js and Flutter share component names, visual tokens, states,
  accessibility expectations, and adaptive behavior.
- APIs remain idiomatic to each framework. Flutter exports collision-safe
  `Sketch*` widget names.
- The canonical aesthetic uses uniform 2–3px borders, 3–4px hard shadows,
  square or 4/8px radii, strong typography, and 80–160ms motion.
- Gradients, blur, glass, soft elevation, hand-drawn paths, and decorative
  randomness are outside the design language.
- All controls meet 44px web and 48dp Flutter target sizes and provide
  reduced-motion, keyboard/focus, semantics, RTL, and text-scaling support.

## Color contract

Light uses cream `#FFF6E5`, white surfaces, and ink `#171717`. Dark uses
canvas `#101014`, surfaces `#1B1B22`/`#24242E`, and ink `#FFF8E7`.

Presets are blue `#3D7EFF`, yellow `#FFD23F`, pink `#FF4D9D`, green
`#5CD65C`, orange `#FF8A3D`, and purple `#9B6DFF`. Custom accents use
`#RRGGBB`; the providers derive an accessible foreground.

## Release contract

A component is complete only when it is exported on both platforms,
documented with framework-specific code, represented in the Flutter gallery,
and covered by behavior plus visual tests.
