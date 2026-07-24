# Sketchpad UI

Game-ready Neubrutalist components for React, Next.js, and Flutter mobile.

## Packages

| Package | Platform | Purpose |
| --- | --- | --- |
| `sketchpad-ui` | npm | 64 typed React components and theme providers |
| `sketchpad_ui` | pub.dev | Adaptive Flutter widgets and theme extensions |
| `@sketchpad/tokens` | npm | Shared light/dark tokens and six arcade accents |

## Themes

Sketchpad ships light and dark semantic themes plus blue, yellow, pink, green,
orange, and purple accents. React consumers use `ThemeProvider`; Flutter
consumers add `SketchpadThemeData` to `ThemeData.extensions`.

```tsx
import { Button, ThemeProvider } from 'sketchpad-ui';
import '@sketchpad/tokens/tokens.css';
import 'sketchpad-ui/styles.css';

<ThemeProvider defaultTheme="system" defaultColor="blue">
  <Button>Play</Button>
</ThemeProvider>
```

```dart
MaterialApp(
  theme: sketchpadMaterialTheme(SketchpadThemeData.light()),
  darkTheme: sketchpadMaterialTheme(SketchpadThemeData.dark()),
);
```

The documentation app lives in `apps/docs`; the verified mobile gallery lives
in `apps/flutter_gallery`.
