import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:sketchpad_ui/sketchpad_ui.dart';

void main() {
  test('ships six synchronized arcade accents', () {
    expect(SketchpadThemeData.accents.length, 6);
    expect(
      SketchpadThemeData.accents[SketchpadColor.blue],
      const Color(0xFF3D7EFF),
    );
  });

  testWidgets('button is semantic and meets mobile target size', (tester) async {
    await tester.pumpWidget(
      MaterialApp(
        theme: sketchpadMaterialTheme(SketchpadThemeData.light()),
        home: Scaffold(
          body: SketchButton(onPressed: () {}, child: const Text('Play')),
        ),
      ),
    );

    expect(find.text('Play'), findsOneWidget);
    expect(tester.getSize(find.byType(SketchButton)).height, greaterThanOrEqualTo(48));
  });

  testWidgets('dark theme renders a Neubrutalist surface', (tester) async {
    final theme = SketchpadThemeData.dark(color: SketchpadColor.purple);
    await tester.pumpWidget(
      MaterialApp(
        theme: sketchpadMaterialTheme(theme),
        home: const Scaffold(body: SketchCard(child: Text('Inventory'))),
      ),
    );

    expect(find.text('Inventory'), findsOneWidget);
    expect(theme.canvas, const Color(0xFF101014));
    expect(theme.border, const Color(0xFFF6F1E7));
  });
}
