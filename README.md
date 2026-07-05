# Sketchpad UI

Production-quality React component library with a pen-on-paper, hand-sketched wireframe aesthetic — accessible, fully functional, zero runtime dependencies.

## Monorepo structure

```
sketchpad/
├── apps/docs/              # Next.js documentation site
├── packages/
│   ├── tokens/             # Design tokens (colors, stroke, roughness)
│   ├── sketch-core/        # Seeded RNG + SVG path generator
│   ├── ui/                 # sketchpad-ui — published component library
│   └── icons/              # Hand-drawn icon set
└── examples/
    ├── landing-page/
    ├── dashboard/
    └── mobile-layout/
```

## Development

```bash
pnpm install
pnpm build
pnpm dev          # Start docs site
pnpm test
pnpm typecheck
pnpm lint
```

## Packages

| Package | npm name | Description |
|---------|----------|-------------|
| `packages/ui` | `sketchpad-ui` | React components |
| `packages/tokens` | `@sketchpad/tokens` | Design tokens + CSS variables |
| `packages/sketch-core` | `@sketchpad/sketch-core` | Path rendering engine |
| `packages/icons` | `@sketchpad/icons` | Icon components |

## Quick start

```bash
npm install sketchpad-ui @sketchpad/tokens
```

```tsx
import { Button, Paper } from 'sketchpad-ui';
import '@sketchpad/tokens/tokens.css';

export function App() {
  return (
    <Paper>
      <Button variant="primary" seed="hero-cta">
        Get started
      </Button>
    </Paper>
  );
}
```

## License

MIT
