import type { Metadata } from 'next';
import { getThemeInitScript } from '@sketchpad/tokens';
import '@sketchpad/tokens/tokens.css';
import 'sketchpad-ui/styles.css';
import { ExampleProviders } from './providers';

export const metadata: Metadata = {
  title: 'Sketchpad — Game UI example',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: getThemeInitScript() }} />
      </head>
      <body style={{ margin: 0, background: 'var(--sk-colors-canvas)', color: 'var(--sk-colors-text)' }}>
        <ExampleProviders>{children}</ExampleProviders>
      </body>
    </html>
  );
}
