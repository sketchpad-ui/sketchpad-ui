import type { Metadata } from 'next';
import { Inter, Kalam } from 'next/font/google';
import { getThemeInitScript } from '@sketchpad/tokens';
import '@sketchpad/tokens/tokens.css';
import 'sketchpad-ui/styles.css';
import './globals.css';
import { DocsProviders } from '../components/DocsProviders';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const kalam = Kalam({ weight: '400', subsets: ['latin'], variable: '--font-annotation' });

export const metadata: Metadata = {
  title: {
    default: 'Sketchpad UI',
    template: '%s · Sketchpad UI',
  },
  description: 'Hand-sketched wireframe React components. Copy-friendly, accessible, fully documented.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Sketchpad UI',
    description: 'Hand-sketched wireframe React component library',
    images: [{ url: '/logo.png', width: 1254, height: 1254, alt: 'Sketchpad UI logo' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${kalam.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: getThemeInitScript() }} />
      </head>
      <body>
        <DocsProviders>{children}</DocsProviders>
      </body>
    </html>
  );
}
