import Link from 'next/link';
import { Button, Paper, HandwrittenNote, SketchArrow } from 'sketchpad-ui';

export default function HomePage() {
  return (
    <div>
      <Paper seed="hero" tapePinned foldedCorner>
        <h1 style={{ margin: '0 0 8px', fontSize: '2rem' }}>Sketchpad UI</h1>
        <p style={{ margin: '0 0 24px', color: 'var(--sk-colors-inkSoft)' }}>
          Production-quality React components with a pen-on-paper, hand-sketched wireframe aesthetic.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <Button variant="primary" seed="hero-cta">
            Get started
          </Button>
          <Button variant="ghost" seed="hero-docs">
            <Link href="/components/button" style={{ textDecoration: 'none', color: 'inherit' }}>
              Browse components
            </Link>
          </Button>
        </div>
        <div style={{ marginTop: 24, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <SketchArrow width={32} height={32} seed="hero-arrow" />
          <HandwrittenNote>Zero runtime dependencies — built from scratch</HandwrittenNote>
        </div>
      </Paper>

      <section style={{ marginTop: 48 }}>
        <h2>Install</h2>
        <pre className="code">npm install sketchpad-ui @sketchpad/tokens</pre>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2>Bundle size</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: 8 }}>Package</th>
              <th style={{ textAlign: 'left', padding: 8 }}>Approx. size (gzip)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: 8 }}>sketchpad-ui</td>
              <td style={{ padding: 8 }}>~18 KB</td>
            </tr>
            <tr>
              <td style={{ padding: 8 }}>@sketchpad/sketch-core</td>
              <td style={{ padding: 8 }}>~4 KB</td>
            </tr>
            <tr>
              <td style={{ padding: 8 }}>@sketchpad/tokens</td>
              <td style={{ padding: 8 }}>~1 KB</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
