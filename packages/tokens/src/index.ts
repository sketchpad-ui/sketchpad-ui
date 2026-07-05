const shared = {
  radii: {
    sketchSm: 4,
    sketchMd: 10,
    sketchLg: 20,
  },
  stroke: {
    thin: 1,
    medium: 1.25,
    thick: 2,
  },
  roughness: {
    /** Large chrome — sidebars, panels, code blocks */
    subtle: 0.35,
    low: 0.5,
    /** Default interactive UI */
    medium: 0.85,
    /** Skeleton loaders, scribbles, playground extremes */
    high: 1.4,
  },
  shadow: {
    offsetSm: 2,
    offsetMd: 4,
  },
  font: {
    body: "'Inter', system-ui, sans-serif",
    annotation: "'Kalam', 'Caveat', cursive",
  },
  breakpoint: {
    mobile: 480,
  },
} as const;

export const tokensLight = {
  ...shared,
  colors: {
    paper: '#FAFAFA',
    paperAlt: '#F5F5F5',
    paperBright: '#FFFFFF',
    ink: '#171717',
    inkSoft: '#525252',
    pencil: '#A3A3A3',
    disabled: '#D4D4D4',
    backdrop: 'rgba(0, 0, 0, 0.45)',
    accentYellow: '#E5E5E5',
    accentBlue: '#D4D4D4',
    accentRed: '#737373',
    accentGreen: '#DBDBDB',
    accentLavender: '#E0E0E0',
  },
} as const;

export const tokensDark = {
  ...shared,
  colors: {
    paper: '#0A0A0A',
    paperAlt: '#141414',
    paperBright: '#1A1A1A',
    ink: '#FAFAFA',
    inkSoft: '#A3A3A3',
    pencil: '#737373',
    disabled: '#525252',
    backdrop: 'rgba(0, 0, 0, 0.72)',
    accentYellow: '#3A3A3A',
    accentBlue: '#454545',
    accentRed: '#D4D4D4',
    accentGreen: '#404040',
    accentLavender: '#474747',
  },
} as const;

/** @deprecated alias — use tokensLight or themes.light */
export const tokens = tokensLight;

export const themes = {
  light: tokensLight,
  dark: tokensDark,
} as const;

export type ThemeName = keyof typeof themes;
export type Tokens = typeof tokensLight;
export type AccentColor = 'yellow' | 'blue' | 'red' | 'green' | 'lavender';

export const accentColorMap: Record<AccentColor, string> = {
  yellow: tokensLight.colors.accentYellow,
  blue: tokensLight.colors.accentBlue,
  red: tokensLight.colors.accentRed,
  green: tokensLight.colors.accentGreen,
  lavender: tokensLight.colors.accentLavender,
};

/** CSS custom property references for theme-aware SVG / inline styles */
export const colorVars = {
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
  yellow: colorVars.accentYellow,
  blue: colorVars.accentBlue,
  red: colorVars.accentRed,
  green: colorVars.accentGreen,
  lavender: colorVars.accentLavender,
};

/** WCAG contrast ratio between ink and paper for the given theme */
export function getInkOnPaperContrastRatio(theme: ThemeName = 'light'): number {
  const t = themes[theme];
  return contrastRatio(t.colors.ink, t.colors.paper);
}

function contrastRatio(foreground: string, background: string): number {
  const fg = parseColorLuminance(foreground);
  const bg = parseColorLuminance(background);
  const lighter = Math.max(fg, bg);
  const darker = Math.min(fg, bg);
  return (lighter + 0.05) / (darker + 0.05);
}

function parseColorLuminance(color: string): number {
  if (color.startsWith('#')) return hexToLuminance(color);
  const rgba = color.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/);
  if (rgba) {
    return relativeLuminance(Number(rgba[1]) / 255, Number(rgba[2]) / 255, Number(rgba[3]) / 255);
  }
  return 0;
}

function hexToLuminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return relativeLuminance(r, g, b);
}

function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4),
  );
  return 0.2126 * rs! + 0.7152 * gs! + 0.0722 * bs!;
}

export { getThemeInitScript } from './themeScript.js';
