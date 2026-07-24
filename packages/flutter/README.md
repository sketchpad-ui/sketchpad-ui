# Sketchpad UI for Flutter

Game-ready Neubrutalist widgets with light/dark themes, six arcade accents,
keyboard and touch support, and adaptive mobile behavior.

```dart
import 'package:sketchpad_ui/sketchpad_ui.dart';

MaterialApp(
  theme: sketchpadMaterialTheme(
    SketchpadThemeData.light(color: SketchpadColor.blue),
  ),
  darkTheme: sketchpadMaterialTheme(
    SketchpadThemeData.dark(color: SketchpadColor.blue),
  ),
  home: Scaffold(
    body: Center(
      child: SketchButton(
        onPressed: () {},
        child: const Text('Play'),
      ),
    ),
  ),
);
```
