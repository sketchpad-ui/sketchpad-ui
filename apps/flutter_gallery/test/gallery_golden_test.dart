import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:sketchpad_flutter_gallery/main.dart';

void main() {
  testWidgets('captures the mobile component gallery', (tester) async {
    final fontLoader = FontLoader('Roboto')
      ..addFont(rootBundle.load('assets/fonts/Roboto-Regular.ttf'))
      ..addFont(rootBundle.load('assets/fonts/Roboto-Black.ttf'));
    await fontLoader.load();
    tester.view.physicalSize = const Size(390, 844);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);

    await tester.pumpWidget(const GalleryApp());
    await tester.pumpAndSettle();

    await expectLater(
      find.byType(GalleryHome),
      matchesGoldenFile('goldens/flutter-gallery.png'),
    );
  });
}
