import 'package:flutter/material.dart';
import 'package:sketchpad_ui/sketchpad_ui.dart';

void main() => runApp(const GalleryApp());

class GalleryApp extends StatefulWidget {
  const GalleryApp({super.key});

  @override
  State<GalleryApp> createState() => _GalleryAppState();
}

class _GalleryAppState extends State<GalleryApp> {
  ThemeMode mode = ThemeMode.system;
  SketchpadColor color = SketchpadColor.blue;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Sketchpad UI Gallery',
      themeMode: mode,
      theme: sketchpadMaterialTheme(
        SketchpadThemeData.light(color: color),
        fontFamily: 'Roboto',
      ),
      darkTheme: sketchpadMaterialTheme(
        SketchpadThemeData.dark(color: color),
        fontFamily: 'Roboto',
      ),
      home: GalleryHome(
        color: color,
        onColorChanged: (next) => setState(() => color = next),
        onThemeChanged: () => setState(() {
          mode = mode == ThemeMode.dark ? ThemeMode.light : ThemeMode.dark;
        }),
      ),
    );
  }
}

class GalleryHome extends StatefulWidget {
  const GalleryHome({
    required this.color,
    required this.onColorChanged,
    required this.onThemeChanged,
    super.key,
  });

  final SketchpadColor color;
  final ValueChanged<SketchpadColor> onColorChanged;
  final VoidCallback onThemeChanged;

  @override
  State<GalleryHome> createState() => _GalleryHomeState();
}

class _GalleryHomeState extends State<GalleryHome> {
  bool sound = true;
  double volume = .7;
  int page = 1;

  @override
  Widget build(BuildContext context) {
    final theme = SketchpadThemeData.of(context);
    return Scaffold(
      appBar: AppBar(
        title: const Text('SKETCHPAD UI', style: TextStyle(fontWeight: FontWeight.w900)),
        actions: [
          IconButton(onPressed: widget.onThemeChanged, icon: const Icon(Icons.contrast)),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          Text('GAME UI, LOUD & CLEAR', style: SketchTypography.heading(context)),
          const SizedBox(height: 8),
          Text(
            '${sketchpadComponentCatalog.length} adaptive components for Flutter.',
            style: SketchTypography.muted(context),
          ),
          const SizedBox(height: 20),
          Wrap(
            spacing: 10,
            runSpacing: 10,
            children: SketchpadColor.values
                .map(
                  (color) => GestureDetector(
                    onTap: () => widget.onColorChanged(color),
                    child: Container(
                      width: 42,
                      height: 42,
                      decoration: BoxDecoration(
                        color: SketchpadThemeData.accents[color],
                        border: Border.all(color: theme.border, width: 3),
                      ),
                    ),
                  ),
                )
                .toList(),
          ),
          const SizedBox(height: 24),
          SketchCard(
            title: const Text('PLAYER ONE'),
            description: const Text('Ready for the next run?'),
            footer: SketchButtonGroup(
              children: [
                SketchButton(onPressed: () {}, child: const Text('PLAY')),
                SketchButton(
                  variant: SketchButtonVariant.filled,
                  onPressed: () {},
                  child: const Text('LOADOUT'),
                ),
              ],
            ),
            child: const Row(
              children: [
                SketchAvatar(fallback: 'P1'),
                SizedBox(width: 14),
                Expanded(child: SketchProgress(value: .78)),
              ],
            ),
          ),
          const SizedBox(height: 22),
          SketchAlert(
            title: const Text('BONUS ROUND'),
            message: const Text('Double XP is active for the next match.'),
            icon: const Icon(Icons.bolt),
          ),
          const SizedBox(height: 22),
          SketchField(
            label: const SketchLabel('Settings'),
            child: Column(
              children: [
                SketchSwitch(value: sound, onChanged: (value) => setState(() => sound = value)),
                SketchSlider(value: volume, onChanged: (value) => setState(() => volume = value)),
              ],
            ),
          ),
          const SizedBox(height: 22),
          SketchPagination(
            page: page,
            pageCount: 4,
            onChanged: (value) => setState(() => page = value),
          ),
        ],
      ),
    );
  }
}
