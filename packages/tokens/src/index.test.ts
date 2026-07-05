import { describe, expect, it } from 'vitest';
import { getInkOnPaperContrastRatio, themes, type ThemeName } from './index.js';

function contrastRatio(foreground: string, background: string): number {
  const fg = hexToLuminance(foreground);
  const bg = hexToLuminance(background);
  const lighter = Math.max(fg, bg);
  const darker = Math.min(fg, bg);
  return (lighter + 0.05) / (darker + 0.05);
}

function hexToLuminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const [rs, gs, bs] = [r, g, b].map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4),
  );
  return 0.2126 * rs! + 0.7152 * gs! + 0.0722 * bs!;
}

describe('tokens', () => {
  it('passes WCAG AA contrast for ink on paper (light)', () => {
    expect(getInkOnPaperContrastRatio('light')).toBeGreaterThanOrEqual(4.5);
  });

  it('passes WCAG AA contrast for ink on paper (dark)', () => {
    expect(getInkOnPaperContrastRatio('dark')).toBeGreaterThanOrEqual(4.5);
  });

  it.each(['light', 'dark'] satisfies ThemeName[])(
    'passes WCAG AA for ink on accent fills (%s)',
    (theme) => {
      const { ink, accentYellow, accentGreen } = themes[theme].colors;
      expect(contrastRatio(ink, accentYellow)).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(ink, accentGreen)).toBeGreaterThanOrEqual(4.5);
    },
  );
});
