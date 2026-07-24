# sketchpad-ui

The React and Next.js package for Sketchpad UI.

```bash
npm install sketchpad-ui @sketchpad/tokens
```

```tsx
import { Button, ThemeProvider } from 'sketchpad-ui';
import '@sketchpad/tokens/tokens.css';
import 'sketchpad-ui/styles.css';

<ThemeProvider defaultTheme="system" defaultColor="purple">
  <Button>Start match</Button>
</ThemeProvider>
```

The package includes 64 components, system/light/dark modes, six preset
accents, validated custom accents, RTL support, and reduced-motion styles.
