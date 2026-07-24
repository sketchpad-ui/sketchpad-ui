'use client';

import { accentPresets, tokensLight, tokensDark } from '@sketchpad/tokens';
import { Button, Card, Checkbox, Switch, ThemeToggle } from 'sketchpad-ui';
import { DocHeader } from '../../../components/DocPage';
import type { DocItem } from '../../../lib/docs-config';

const doc: DocItem = {
  slug: 'playground',
  name: 'Playground',
  description: 'Visual QA matrix for themes, accent colors, hard shadows, and interactive states.',
  status: 'shipped',
};

export default function PlaygroundPage() {
  return (
    <article className="docArticle">
      <DocHeader doc={doc} />

      <section className="docSection">
        <div className="playgroundToolbar">
          <p className="docMuted">Toggle the canvas while checking contrast and shadow separation.</p>
          <ThemeToggle />
        </div>
      </section>

      <section className="docSection">
        <h2 className="docSectionTitle">ARCADE ACCENTS</h2>
        <div className="matrix">
          {Object.entries(accentPresets).map(([name, color]) => (
            <div key={name} className="matrixCell">
              <div className="tokenSwatchColor" style={{ background: color }} />
              <strong>{name.toUpperCase()}</strong>
              <Button variant="accent" accent={name as keyof typeof accentPresets}>PLAY</Button>
            </div>
          ))}
        </div>
      </section>

      <section className="docSection">
        <h2 className="docSectionTitle">CONTROL STATES</h2>
        <div className="matrix">
          <Card title="Ready"><Button>PRIMARY</Button></Card>
          <Card title="Secondary"><Button variant="filled">LOADOUT</Button></Card>
          <Card title="Disabled"><Button disabled>LOCKED</Button></Card>
          <Card title="Inputs"><Checkbox label="Music" checked /><Switch label="Haptics" checked /></Card>
        </div>
      </section>

      <section className="docSection">
        <h2 className="docSectionTitle">SEMANTIC TOKENS</h2>
        <div className="tokenThemeSwatches">
          {[
            ['Light', tokensLight.colors],
            ['Dark', tokensDark.colors],
          ].map(([label, colors]) => (
            <div key={label as string}>
              <p className="docMuted">{label as string}</p>
              <div className="tokenSwatches">
                {Object.entries(colors as typeof tokensLight.colors).map(([name, color]) => (
                  <div key={name} className="tokenSwatch">
                    <div className="tokenSwatchColor" style={{ background: color }} />
                    {name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
