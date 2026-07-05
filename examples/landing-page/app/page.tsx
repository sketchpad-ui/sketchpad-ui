'use client';

import {
  Button,
  Container,
  Grid,
  Paper,
  HandwrittenNote,
  SketchArrow,
  ImagePlaceholder,
  Navbar,
  Divider,
} from 'sketchpad-ui';

const nav = [
  { id: 'features', label: 'Features' },
  { id: 'docs', label: 'Docs' },
  { id: 'github', label: 'GitHub' },
];

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', padding: '24px 0' }}>
      <Container>
        <Navbar items={nav} activeId="features" />
        <Paper seed="hero" tapePinned style={{ marginTop: 32, textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', margin: '0 0 16px' }}>Build with sketch</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--sk-colors-inkSoft)', maxWidth: 520, margin: '0 auto 24px' }}>
            React components that look hand-drawn on notebook paper — fully accessible, production-ready.
          </p>
          <Button variant="primary" seed="landing-cta" size="lg">
            npm install sketchpad-ui
          </Button>
          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
            <SketchArrow seed="landing-arrow" />
            <HandwrittenNote>Not neobrutalism — pen-on-paper linework</HandwrittenNote>
          </div>
        </Paper>

        <div style={{ margin: '48px 0' }}>
          <Divider width="100%" seed="landing-div" />
        </div>

        <h2 style={{ textAlign: 'center' }}>Features</h2>
        <div style={{ marginTop: 24 }}>
        <Grid columns={3} gap={24}>
          {['Zero deps', 'Seeded RNG', 'Full a11y'].map((title, i) => (
            <Paper key={title} seed={`feature-${i}`} foldedCorner={i === 0}>
              <ImagePlaceholder width={280} height={120} seed={`feat-img-${i}`} skeletonLines={2} />
              <h3>{title}</h3>
              <HandwrittenNote>Built from scratch for wireframe aesthetics</HandwrittenNote>
            </Paper>
          ))}
        </Grid>
        </div>
      </Container>
    </div>
  );
}
