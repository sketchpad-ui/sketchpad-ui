'use client';

import { ThemeProvider } from 'sketchpad-ui';

export function ExampleProviders({ children }: { children: React.ReactNode }) {
  return <ThemeProvider defaultTheme="system">{children}</ThemeProvider>;
}
