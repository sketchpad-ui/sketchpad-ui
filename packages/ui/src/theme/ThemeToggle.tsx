'use client';

import { cn } from '../utils.js';
import { useTheme } from './useTheme.js';
import styles from './ThemeToggle.module.css';

export interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      className={cn(styles.toggle, className)}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? '☀' : '☾'}
    </button>
  );
}
