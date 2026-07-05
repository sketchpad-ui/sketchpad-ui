# sketchpad-ui

Hand-sketched wireframe React component library.

## Install

```bash
npm install sketchpad-ui @sketchpad/tokens
```

## Usage

```tsx
import { Button, Paper } from 'sketchpad-ui';
import '@sketchpad/tokens/tokens.css';
import 'sketchpad-ui/styles.css';

export function App() {
  return (
    <Paper seed="main">
      <Button variant="primary" seed="cta">
        Get started
      </Button>
    </Paper>
  );
}
```

## Seed prop

Every sketch element accepts a `seed` for deterministic variation — same seed + size renders identically across SSR and re-renders.

## Bundle size (approximate, gzip)

| Package | Size |
|---------|------|
| sketchpad-ui | ~18 KB |
| @sketchpad/sketch-core | ~4 KB |
| @sketchpad/tokens | ~1 KB |

## Zero runtime dependencies

The published package has no runtime dependencies.

## License

MIT
