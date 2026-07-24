/**
 * Sketchpad's canonical Neubrutalist theme contract.
 *
 * The legacy token keys remain as aliases for the first rebuild release so
 * existing component implementations can migrate without shipping two visual
 * systems. New code should use the semantic keys.
 */

export const accentPresets = {
  blue: '#3D7EFF',
  yellow: '#FFD23F',
  pink: '#FF4D9D',
  green: '#5CD65C',
  orange: '#FF8A3D',
  purple: '#9B6DFF',
} as const;

export type AccentColor = keyof typeof accentPresets;
export type ThemeName = 'light' | 'dark';

const shared = {
  radii: {
    none: 0,
    sm: 4,
    md: 8,
    sketchSm: 0,
    sketchMd: 4,
    sketchLg: 8,
  },
  border: {
    compact: 2,
    default: 3,
  },
  stroke: {
    thin: 2,
    medium: 3,
    thick: 4,
  },
  shadow: {
    offsetSm: 3,
    offsetMd: 4,
  },
  motion: {
    fast: 80,
    default: 140,
    slow: 160,
  },
  roughness: {
    subtle: 0,
    low: 0,
    medium: 0,
    high: 0,
  },
  font: {
    heading: "'Archivo Black', 'Arial Black', sans-serif",
    body: "'Space Grotesk', 'Arial', sans-serif",
    code: "'JetBrains Mono', 'SFMono-Regular', Consolas, monospace",
    annotation: "'Space Grotesk', 'Arial', sans-serif",
  },
  breakpoint: {
    mobile: 640,
  },
} as const;

export const tokensLight = {
  ...shared,
  colors: {
    canvas: '#FFF6E5',
    surface: '#FFFFFF',
    surfaceRaised: '#FFFDF7',
    text: '#171717',
    textMuted: '#5B5B66',
    border: '#171717',
    hardShadow: '#171717',
    disabled: '#CAC7BE',
    backdrop: 'rgba(23, 23, 23, 0.68)',
    focus: accentPresets.blue,
    success: accentPresets.green,
    warning: accentPresets.yellow,
    danger: '#FF5A5F',
    info: accentPresets.blue,

    // Compatibility aliases used by the existing catalog while it migrates.
    paper: '#FFF6E5',
    paperAlt: '#FFFFFF',
    paperBright: '#FFFDF7',
    ink: '#171717',
    inkSoft: '#5B5B66',
    pencil: '#77737E',
    accentYellow: accentPresets.yellow,
    accentBlue: accentPresets.blue,
    accentRed: '#FF5A5F',
    accentGreen: accentPresets.green,
    accentLavender: accentPresets.purple,
  },
} as const;

export const tokensDark = {
  ...shared,
  colors: {
    canvas: '#101014',
    surface: '#1B1B22',
    surfaceRaised: '#24242E',
    text: '#FFF8E7',
    textMuted: '#B8B8C4',
    border: '#F6F1E7',
    hardShadow: '#000000',
    disabled: '#54545F',
    backdrop: 'rgba(0, 0, 0, 0.78)',
    focus: accentPresets.yellow,
    success: accentPresets.green,
    warning: accentPresets.yellow,
    danger: '#FF7478',
    info: '#6B9BFF',

    // Compatibility aliases.
    paper: '#101014',
    paperAlt: '#1B1B22',
    paperBright: '#24242E',
    ink: '#FFF8E7',
    inkSoft: '#B8B8C4',
    pencil: '#8F8F9D',
    accentYellow: accentPresets.yellow,
    accentBlue: '#6B9BFF',
    accentRed: '#FF7478',
    accentGreen: '#72E072',
    accentLavender: '#B291FF',
  },
} as const;

export const tokens = tokensLight;
export const themes = { light: tokensLight, dark: tokensDark } as const;
export type Tokens = typeof tokensLight;

export const accentColorMap: Record<AccentColor, string> = { ...accentPresets };

export const colorVars = {
  canvas: 'var(--sk-colors-canvas)',
  surface: 'var(--sk-colors-surface)',
  surfaceRaised: 'var(--sk-colors-surfaceRaised)',
  text: 'var(--sk-colors-text)',
  textMuted: 'var(--sk-colors-textMuted)',
  border: 'var(--sk-colors-border)',
  hardShadow: 'var(--sk-colors-hardShadow)',
  focus: 'var(--sk-colors-focus)',
  accent: 'var(--sk-accent)',
  onAccent: 'var(--sk-on-accent)',
  paper: 'var(--sk-colors-paper)',
  paperAlt: 'var(--sk-colors-paperAlt)',
  paperBright: 'var(--sk-colors-paperBright)',
  ink: 'var(--sk-colors-ink)',
  inkSoft: 'var(--sk-colors-inkSoft)',
  pencil: 'var(--sk-colors-pencil)',
  disabled: 'var(--sk-colors-disabled)',
  backdrop: 'var(--sk-colors-backdrop)',
  accentYellow: 'var(--sk-colors-accentYellow)',
  accentBlue: 'var(--sk-colors-accentBlue)',
  accentRed: 'var(--sk-colors-accentRed)',
  accentGreen: 'var(--sk-colors-accentGreen)',
  accentLavender: 'var(--sk-colors-accentLavender)',
} as const;

export const accentColorVarMap: Record<AccentColor, string> = {
  blue: 'var(--sk-accent-blue)',
  yellow: 'var(--sk-accent-yellow)',
  pink: 'var(--sk-accent-pink)',
  green: 'var(--sk-accent-green)',
  orange: 'var(--sk-accent-orange)',
  purple: 'var(--sk-accent-purple)',
};

export function isValidHexAccent(value: string): boolean {
  return /^#[0-9a-f]{6}$/i.test(value);
}

export function getReadableForeground(background: string): '#171717' | '#FFFFFF' {
  if (!isValidHexAccent(background)) return '#171717';
  return contrastRatio('#171717', background) >= contrastRatio('#FFFFFF', background)
    ? '#171717'
    : '#FFFFFF';
}

export function getInkOnPaperContrastRatio(theme: ThemeName = 'light'): number {
  const current = themes[theme];
  return contrastRatio(current.colors.text, current.colors.canvas);
}

function contrastRatio(foreground: string, background: string): number {
  const fg = hexToLuminance(foreground);
  const bg = hexToLuminance(background);
  const lighter = Math.max(fg, bg);
  const darker = Math.min(fg, bg);
  return (lighter + 0.05) / (darker + 0.05);
}

function hexToLuminance(hex: string): number {
  const value = hex.replace('#', '');
  const red = parseInt(value.slice(0, 2), 16) / 255;
  const green = parseInt(value.slice(2, 4), 16) / 255;
  const blue = parseInt(value.slice(4, 6), 16) / 255;
  const convert = (channel: number) =>
    channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
  return 0.2126 * convert(red) + 0.7152 * convert(green) + 0.0722 * convert(blue);
}

export { getThemeInitScript } from './themeScript.js';
