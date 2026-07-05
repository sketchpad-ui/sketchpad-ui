import type { Metadata } from 'next';
import { getThemeInitScript } from '@sketchpad/tokens';
import '@sketchpad/tokens/tokens.css';
import 'sketchpad-ui/styles.css';
import { ExampleProviders } from './providers';

export const metadata: Metadata = {
  title: 'Sketchpad — Landing',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: getThemeInitScript() }} />
      </head>
      <body style={{ margin: 0, background: 'var(--sk-colors-paper)', color: 'var(--sk-colors-ink)' }}>
        <ExampleProviders>{children}</ExampleProviders>
      </body>
    </html>
  );
}
