import 'package:flutter/material.dart';

enum SketchpadColor { blue, yellow, pink, green, orange, purple }

enum SketchpadBrightness { light, dark }

@immutable
class SketchpadThemeData extends ThemeExtension<SketchpadThemeData> {
  const SketchpadThemeData({
    required this.brightness,
    required this.canvas,
    required this.surface,
    required this.surfaceRaised,
    required this.text,
    required this.textMuted,
    required this.border,
    required this.hardShadow,
    required this.accent,
    required this.onAccent,
    required this.danger,
    this.borderWidth = 3,
    this.compactBorderWidth = 2,
    this.radius = 4,
    this.shadowOffset = 4,
  });

  final SketchpadBrightness brightness;
  final Color canvas;
  final Color surface;
  final Color surfaceRaised;
  final Color text;
  final Color textMuted;
  final Color border;
  final Color hardShadow;
  final Color accent;
  final Color onAccent;
  final Color danger;
  final double borderWidth;
  final double compactBorderWidth;
  final double radius;
  final double shadowOffset;

  static const Map<SketchpadColor, Color> accents = {
    SketchpadColor.blue: Color(0xFF3D7EFF),
    SketchpadColor.yellow: Color(0xFFFFD23F),
    SketchpadColor.pink: Color(0xFFFF4D9D),
    SketchpadColor.green: Color(0xFF5CD65C),
    SketchpadColor.orange: Color(0xFFFF8A3D),
    SketchpadColor.purple: Color(0xFF9B6DFF),
  };

  factory SketchpadThemeData.light({
    SketchpadColor color = SketchpadColor.blue,
    Color? customAccent,
  }) {
    final accent = customAccent ?? accents[color]!;
    return SketchpadThemeData(
      brightness: SketchpadBrightness.light,
      canvas: const Color(0xFFFFF6E5),
      surface: Colors.white,
      surfaceRaised: const Color(0xFFFFFDF7),
      text: const Color(0xFF171717),
      textMuted: const Color(0xFF5B5B66),
      border: const Color(0xFF171717),
      hardShadow: const Color(0xFF171717),
      accent: accent,
      onAccent: _readableForeground(accent),
      danger: const Color(0xFFFF5A5F),
    );
  }

  factory SketchpadThemeData.dark({
    SketchpadColor color = SketchpadColor.blue,
    Color? customAccent,
  }) {
    final accent = customAccent ?? accents[color]!;
    return SketchpadThemeData(
      brightness: SketchpadBrightness.dark,
      canvas: const Color(0xFF101014),
      surface: const Color(0xFF1B1B22),
      surfaceRaised: const Color(0xFF24242E),
      text: const Color(0xFFFFF8E7),
      textMuted: const Color(0xFFB8B8C4),
      border: const Color(0xFFF6F1E7),
      hardShadow: Colors.black,
      accent: accent,
      onAccent: _readableForeground(accent),
      danger: const Color(0xFFFF7478),
    );
  }

  static SketchpadThemeData of(BuildContext context) {
    return Theme.of(context).extension<SketchpadThemeData>() ??
        (Theme.of(context).brightness == Brightness.dark
            ? SketchpadThemeData.dark()
            : SketchpadThemeData.light());
  }

  static Color _readableForeground(Color background) {
    return background.computeLuminance() > 0.36
        ? const Color(0xFF171717)
        : Colors.white;
  }

  @override
  SketchpadThemeData copyWith({
    SketchpadBrightness? brightness,
    Color? canvas,
    Color? surface,
    Color? surfaceRaised,
    Color? text,
    Color? textMuted,
    Color? border,
    Color? hardShadow,
    Color? accent,
    Color? onAccent,
    Color? danger,
    double? borderWidth,
    double? compactBorderWidth,
    double? radius,
    double? shadowOffset,
  }) {
    return SketchpadThemeData(
      brightness: brightness ?? this.brightness,
      canvas: canvas ?? this.canvas,
      surface: surface ?? this.surface,
      surfaceRaised: surfaceRaised ?? this.surfaceRaised,
      text: text ?? this.text,
      textMuted: textMuted ?? this.textMuted,
      border: border ?? this.border,
      hardShadow: hardShadow ?? this.hardShadow,
      accent: accent ?? this.accent,
      onAccent: onAccent ?? this.onAccent,
      danger: danger ?? this.danger,
      borderWidth: borderWidth ?? this.borderWidth,
      compactBorderWidth: compactBorderWidth ?? this.compactBorderWidth,
      radius: radius ?? this.radius,
      shadowOffset: shadowOffset ?? this.shadowOffset,
    );
  }

  @override
  SketchpadThemeData lerp(
    covariant ThemeExtension<SketchpadThemeData>? other,
    double t,
  ) {
    if (other is! SketchpadThemeData) return this;
    return copyWith(
      canvas: Color.lerp(canvas, other.canvas, t),
      surface: Color.lerp(surface, other.surface, t),
      surfaceRaised: Color.lerp(surfaceRaised, other.surfaceRaised, t),
      text: Color.lerp(text, other.text, t),
      textMuted: Color.lerp(textMuted, other.textMuted, t),
      border: Color.lerp(border, other.border, t),
      hardShadow: Color.lerp(hardShadow, other.hardShadow, t),
      accent: Color.lerp(accent, other.accent, t),
      onAccent: Color.lerp(onAccent, other.onAccent, t),
      danger: Color.lerp(danger, other.danger, t),
      borderWidth: _lerpDouble(borderWidth, other.borderWidth, t),
      compactBorderWidth:
          _lerpDouble(compactBorderWidth, other.compactBorderWidth, t),
      radius: _lerpDouble(radius, other.radius, t),
      shadowOffset: _lerpDouble(shadowOffset, other.shadowOffset, t),
    );
  }

  static double _lerpDouble(double a, double b, double t) => a + (b - a) * t;
}

ThemeData sketchpadMaterialTheme(
  SketchpadThemeData sketchpad, {
  String? fontFamily,
}) {
  final brightness = sketchpad.brightness == SketchpadBrightness.dark
      ? Brightness.dark
      : Brightness.light;
  return ThemeData(
    brightness: brightness,
    scaffoldBackgroundColor: sketchpad.canvas,
    colorScheme: ColorScheme.fromSeed(
      seedColor: sketchpad.accent,
      brightness: brightness,
      surface: sketchpad.surface,
      error: sketchpad.danger,
    ),
    fontFamily: fontFamily,
    extensions: [sketchpad],
    focusColor: sketchpad.accent,
    splashFactory: NoSplash.splashFactory,
  );
}
