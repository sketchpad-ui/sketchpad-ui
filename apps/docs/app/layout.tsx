import type { Metadata } from 'next';
import { getThemeInitScript } from '@sketchpad/tokens';
import '@sketchpad/tokens/tokens.css';
import 'sketchpad-ui/styles.css';
import './globals.css';
import { DocsProviders } from '../components/DocsProviders';

export const metadata: Metadata = {
  metadataBase: new URL('https://sketchpad-ui.dev'),
  title: {
    default: 'Sketchpad UI — Neubrutalist React & Flutter components',
    template: '%s · Sketchpad UI',
  },
  description:
    '64 loud, accessible Neubrutalist components for React, Next.js, and Flutter games.',
  icons: { icon: '/logo.png', apple: '/logo.png' },
  openGraph: {
    title: 'Sketchpad UI',
    description: 'Game-ready Neubrutalist components for React and Flutter.',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1731,
        height: 909,
        alt: 'Sketchpad UI — Game UI. Loud & Clear.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sketchpad UI',
    description: 'Game-ready Neubrutalist components for React and Flutter.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: getThemeInitScript() }} />
      </head>
      <body>
        <DocsProviders>{children}</DocsProviders>
      </body>
    </html>
  );
}
