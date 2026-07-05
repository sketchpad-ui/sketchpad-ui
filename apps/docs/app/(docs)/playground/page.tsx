'use client';

import { tokensLight, tokensDark } from '@sketchpad/tokens';
import {
  generateRectPath,
  generateOvalPath,
  generateLinePath,
  resolveSeed,
} from '@sketchpad/sketch-core';
import { ThemeToggle } from 'sketchpad-ui';
import { DocHeader } from '../../../components/DocPage';
import type { DocItem } from '../../../lib/docs-config';

const doc: DocItem = {
  slug: 'playground',
  name: 'Playground',
  description: 'Visual QA matrix for the path engine: shape × roughness × aspect ratio.',
  status: 'shipped',
};

const roughnessLevels = [0.35, 0.65, 1.1] as const;
const sizes = [
  { label: 'tiny', w: 40, h: 24 },
  { label: 'normal', w: 120, h: 60 },
  { label: 'wide', w: 200, h: 40 },
  { label: 'tall', w: 60, h: 120 },
];

function PathPreview({ d, w, h, label }: { d: string; w: number; h: number; label: string }) {
  return (
    <div className="matrixCell">
      <svg width={w} height={h} style={{ maxWidth: '100%' }}>
        <path d={d} fill="var(--sk-colors-ink)" />
      </svg>
      <div>{label}</div>
    </div>
  );
}

export default function PlaygroundPage() {
  return (
    <article className="docArticle">
      <DocHeader doc={doc} />

      <section className="docSection">
        <div className="playgroundToolbar">
          <p className="docMuted" style={{ margin: 0 }}>
            Toggle theme to compare borders on light and dark paper.
          </p>
          <ThemeToggle />
        </div>
      </section>

      <section className="docSection">
        <h2 className="docSectionTitle">Rectangles</h2>
        <div className="matrix">
          {sizes.flatMap((size) =>
            roughnessLevels.map((r) => {
              const path = generateRectPath(size.w, size.h, 8, {
                roughness: r,
                strokeWidth: 1.5,
                seed: resolveSeed(`${size.label}-${r}`, 'qa'),
              });
              return (
                <PathPreview
                  key={`rect-${size.label}-${r}`}
                  d={path.fillPath}
                  w={size.w}
                  h={size.h}
                  label={`rect ${size.label} r=${r}`}
                />
              );
            }),
          )}
        </div>
      </section>

      <section className="docSection">
        <h2 className="docSectionTitle">Ovals</h2>
        <div className="matrix">
          {sizes.map((size) => {
            const path = generateOvalPath(size.w, size.h, {
              roughness: 1.2,
              strokeWidth: 1.5,
              seed: resolveSeed(`oval-${size.label}`, 'qa'),
            });
            return (
              <PathPreview
                key={`oval-${size.label}`}
                d={path.fillPath}
                w={size.w}
                h={size.h}
                label={`oval ${size.label}`}
              />
            );
          })}
        </div>
      </section>

      <section className="docSection">
        <h2 className="docSectionTitle">Lines</h2>
        <div className="matrix">
          {roughnessLevels.map((r) => {
            const path = generateLinePath(0, 10, 120, 10, {
              roughness: r,
              strokeWidth: 1.5,
              seed: resolveSeed(`line-${r}`, 'qa'),
            });
            return (
              <PathPreview key={`line-${r}`} d={path.fillPath} w={120} h={20} label={`line r=${r}`} />
            );
          })}
        </div>
      </section>

      <section className="docSection">
        <h2 className="docSectionTitle">Token palette (light / dark)</h2>
        <div className="tokenThemeSwatches">
          <div>
            <p className="docMuted">Light</p>
            <div className="tokenSwatches">
              {Object.entries(tokensLight.colors).map(([name, color]) => (
                <div key={name} className="tokenSwatch">
                  <div className="tokenSwatchColor" style={{ background: color }} />
                  {name}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="docMuted">Dark</p>
            <div className="tokenSwatches">
              {Object.entries(tokensDark.colors).map(([name, color]) => (
                <div key={name} className="tokenSwatch">
                  <div className="tokenSwatchColor" style={{ background: color }} />
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
