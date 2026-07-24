'use client';

import {
  Avatar,
  Badge,
  Button,
  Card,
  Container,
  Grid,
  Kbd,
  ProgressBar,
} from 'sketchpad-ui';

export default function GameUiExample() {
  return (
    <main style={{ minHeight: '100vh', padding: '32px 0' }}>
      <Container>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <strong style={{ fontSize: 24, fontWeight: 950 }}>NEON RUNNER</strong>
          <Badge variant="marker" accent="yellow">ONLINE</Badge>
        </header>

        <section style={{ marginTop: 40 }}>
          <Card
            title="PLAYER ONE"
            description="Choose a loadout and enter the next run."
            footer={
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                <Button size="lg">START MATCH</Button>
                <Button size="lg" variant="filled">LOADOUT</Button>
              </div>
            }
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 18, alignItems: 'center' }}>
              <Avatar placeholder pixelSize={64} />
              <div>
                <strong>ENERGY 78%</strong>
                <ProgressBar value={78} />
              </div>
            </div>
          </Card>
        </section>

        <section style={{ marginTop: 32 }}>
          <Grid columns={3} gap={20}>
            {[
              ['DAILY RUN', '2× XP'],
              ['RANK', '#042'],
              ['SHORTCUT', '⌘ K'],
            ].map(([title, value]) => (
              <Card key={title} title={title}>
                <div style={{ fontSize: 28, fontWeight: 950 }}>
                  {title === 'SHORTCUT' ? <Kbd>{value}</Kbd> : value}
                </div>
              </Card>
            ))}
          </Grid>
        </section>
      </Container>
    </main>
  );
}
