export const tokens = {
  colors: {
    paper: '#FAF7EF',
    paperAlt: '#F7F1E3',
    paperBright: '#FBF8F0',
    ink: '#1D1D1B',
    inkSoft: '#3A3834',
    pencil: '#8A867C',
    disabled: '#B8B2A6',
    accentYellow: '#F6D96B',
    accentBlue: '#A7C7E7',
    accentRed: '#E99A8D',
    accentGreen: '#A8D5BA',
    accentLavender: '#C9B6E4',
  },
  radii: {
    sketchSm: 4,
    sketchMd: 10,
    sketchLg: 20,
  },
  stroke: {
    thin: 1,
    medium: 1.5,
    thick: 2.5,
  },
  roughness: {
    low: 0.6,
    medium: 1.2,
    high: 2.2,
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

export type Tokens = typeof tokens;
export type AccentColor = 'yellow' | 'blue' | 'red' | 'green' | 'lavender';

export const accentColorMap: Record<AccentColor, string> = {
  yellow: tokens.colors.accentYellow,
  blue: tokens.colors.accentBlue,
  red: tokens.colors.accentRed,
  green: tokens.colors.accentGreen,
  lavender: tokens.colors.accentLavender,
};

/** WCAG contrast ratio between ink and paper — ~15.8:1 (passes AA/AAA for body text) */
export function getInkOnPaperContrastRatio(): number {
  return contrastRatio(tokens.colors.ink, tokens.colors.paper);
}

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
