import type { Metadata } from 'next';
import Link from 'next/link';
import '@sketchpad/tokens/tokens.css';
import 'sketchpad-ui/styles.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sketchpad UI',
  description: 'Hand-sketched wireframe React component library',
};

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/components/button', label: 'Button' },
  { href: '/components/forms', label: 'Forms' },
  { href: '/components/navigation', label: 'Navigation' },
  { href: '/components/data', label: 'Data' },
  { href: '/primitives', label: 'Primitives' },
  { href: '/playground', label: 'Playground' },
  { href: '/tokens', label: 'Tokens' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="docsNav">
          <strong>Sketchpad UI</strong>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <main className="docsMain">{children}</main>
      </body>
    </html>
  );
}
