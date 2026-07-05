'use client';

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ThemeContext } from './useTheme.js';
import type { ResolvedTheme, ThemeSetting } from './types.js';

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function readStoredTheme(storageKey: string): ThemeSetting | null {
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  } catch {
    /* private browsing */
  }
  return null;
}

function applyThemeToDom(theme: ThemeSetting, resolved: ResolvedTheme) {
  const root = document.documentElement;
  if (theme === 'system') {
    root.removeAttribute('data-sk-theme');
  } else {
    root.setAttribute('data-sk-theme', theme);
  }
  root.style.colorScheme = resolved;
}

export interface ThemeProviderProps {
  children: ReactNode;
  /** Initial theme when no stored preference exists */
  defaultTheme?: ThemeSetting;
  /** localStorage key for persistence */
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'sketchpad-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeSetting>(() => {
    if (typeof window === 'undefined') return defaultTheme;
    return readStoredTheme(storageKey) ?? defaultTheme;
  });

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = readStoredTheme(storageKey) ?? defaultTheme;
    if (stored === 'light' || stored === 'dark') return stored;
    return getSystemTheme();
  });

  const setTheme = useCallback(
    (next: ThemeSetting) => {
      setThemeState(next);
      try {
        localStorage.setItem(storageKey, next);
      } catch {
        /* ignore */
      }
    },
    [storageKey],
  );

  useEffect(() => {
    const resolved = theme === 'system' ? getSystemTheme() : theme;
    setResolvedTheme(resolved);
    applyThemeToDom(theme, resolved);
  }, [theme]);

  useEffect(() => {
    if (theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      const resolved = getSystemTheme();
      setResolvedTheme(resolved);
      applyThemeToDom('system', resolved);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  const value = useMemo(
    () => ({ theme, setTheme, resolvedTheme }),
    [theme, setTheme, resolvedTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
