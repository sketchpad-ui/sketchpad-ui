import { getThemeInitScript } from '@sketchpad/tokens';
import '@sketchpad/tokens/tokens.css';
import 'sketchpad-ui/styles.css';
import { ExampleProviders } from './providers';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: getThemeInitScript() }} />
      </head>
      <body
        style={{
          margin: 0,
          maxWidth: 480,
          marginInline: 'auto',
          background: 'var(--sk-colors-paper)',
          color: 'var(--sk-colors-ink)',
        }}
      >
        <ExampleProviders>{children}</ExampleProviders>
      </body>
    </html>
  );
}
