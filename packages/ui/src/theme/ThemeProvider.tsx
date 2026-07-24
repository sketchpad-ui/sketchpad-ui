'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { getReadableForeground, isValidHexAccent } from '@sketchpad/tokens';
import { ThemeContext } from './useTheme.js';
import type { ResolvedTheme, ThemeColor, ThemeSetting } from './types.js';

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function readValue<T extends string>(key: string, allowed: readonly T[]): T | null {
  try {
    const stored = localStorage.getItem(key);
    return stored && allowed.includes(stored as T) ? (stored as T) : null;
  } catch {
    return null;
  }
}

export interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeSetting;
  defaultColor?: ThemeColor;
  customAccent?: string;
  storageKey?: string;
  colorStorageKey?: string;
}

const themeSettings = ['light', 'dark', 'system'] as const;
const themeColors = ['blue', 'yellow', 'pink', 'green', 'orange', 'purple'] as const;

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  defaultColor = 'blue',
  customAccent: controlledCustomAccent,
  storageKey = 'sketchpad-theme',
  colorStorageKey = 'sketchpad-color',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeSetting>(() =>
    typeof window === 'undefined'
      ? defaultTheme
      : readValue(storageKey, themeSettings) ?? defaultTheme,
  );
  const [color, setColorState] = useState<ThemeColor>(() =>
    typeof window === 'undefined'
      ? defaultColor
      : readValue(colorStorageKey, themeColors) ?? defaultColor,
  );
  const [localCustomAccent, setLocalCustomAccent] = useState<string | undefined>(
    controlledCustomAccent,
  );
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    theme === 'system' ? getSystemTheme() : theme,
  );

  const setTheme = useCallback(
    (next: ThemeSetting) => {
      setThemeState(next);
      try {
        localStorage.setItem(storageKey, next);
      } catch {
        // Persistence is optional.
      }
    },
    [storageKey],
  );

  const setColor = useCallback(
    (next: ThemeColor) => {
      setColorState(next);
      setLocalCustomAccent(undefined);
      try {
        localStorage.setItem(colorStorageKey, next);
      } catch {
        // Persistence is optional.
      }
    },
    [colorStorageKey],
  );

  const setCustomAccent = useCallback((next?: string) => {
    if (next && !isValidHexAccent(next)) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Sketchpad custom accents must use #RRGGBB format. Falling back to blue.');
      }
      setLocalCustomAccent(undefined);
      setColorState('blue');
      return;
    }
    setLocalCustomAccent(next);
  }, []);

  const customAccentCandidate = controlledCustomAccent ?? localCustomAccent;
  const customAccent =
    customAccentCandidate && isValidHexAccent(customAccentCandidate)
      ? customAccentCandidate
      : undefined;

  useEffect(() => {
    const apply = () => {
      const resolved = theme === 'system' ? getSystemTheme() : theme;
      setResolvedTheme(resolved);
      const root = document.documentElement;
      root.dataset.skTheme = resolved;
      root.dataset.skColor = color;
      root.style.colorScheme = resolved;
    };
    apply();
    if (theme !== 'system') return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, [theme, color]);

  const wrapperStyle = useMemo(() => {
    if (!customAccent || !isValidHexAccent(customAccent)) return undefined;
    return {
      '--sk-custom-accent': customAccent,
      '--sk-custom-on-accent': getReadableForeground(customAccent),
    } as CSSProperties;
  }, [customAccent]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      resolvedTheme,
      color,
      setColor,
      customAccent,
      setCustomAccent,
    }),
    [theme, setTheme, resolvedTheme, color, setColor, customAccent, setCustomAccent],
  );

  return (
    <ThemeContext.Provider value={value}>
      <div
        data-sk-color={color}
        data-sk-custom-accent={customAccent ? '' : undefined}
        style={wrapperStyle}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export interface SketchpadProviderProps
  extends Omit<ThemeProviderProps, 'defaultTheme' | 'defaultColor' | 'customAccent'> {
  mode?: ThemeSetting;
  color?: ThemeColor;
  accent?: string;
}

/** Concise provider API for new applications. */
export function SketchpadProvider({
  mode = 'system',
  color = 'blue',
  accent,
  ...props
}: SketchpadProviderProps) {
  return (
    <ThemeProvider
      defaultTheme={mode}
      defaultColor={color}
      customAccent={accent}
      {...props}
    />
  );
}
