'use client';

import { createContext, useContext } from 'react';
import type { ResolvedTheme, ThemeColor, ThemeSetting } from './types.js';

export interface ThemeContextValue {
  theme: ThemeSetting;
  setTheme: (theme: ThemeSetting) => void;
  resolvedTheme: ResolvedTheme;
  color: ThemeColor;
  setColor: (color: ThemeColor) => void;
  customAccent?: string;
  setCustomAccent: (color?: string) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}
