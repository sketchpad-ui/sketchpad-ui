import type { Metadata } from 'next';
import '@sketchpad/tokens/tokens.css';
import 'sketchpad-ui/styles.css';

export const metadata: Metadata = {
  title: 'Sketchpad — Landing',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
