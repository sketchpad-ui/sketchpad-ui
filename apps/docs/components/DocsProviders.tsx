'use client';

import { ThemeProvider } from 'sketchpad-ui';

export function DocsProviders({ children }: { children: React.ReactNode }) {
  return <ThemeProvider defaultTheme="system">{children}</ThemeProvider>;
}
