'use client';

import { tokens } from '@sketchpad/tokens';
import {
  generateRectPath,
  generateOvalPath,
  generateLinePath,
  resolveSeed,
} from '@sketchpad/sketch-core';

const roughnessLevels = [0.6, 1.2, 2.2] as const;
const sizes = [
  { label: 'tiny', w: 40, h: 24 },
  { label: 'normal', w: 120, h: 60 },
  { label: 'wide', w: 200, h: 40 },
  { label: 'tall', w: 60, h: 120 },
];

function PathPreview({
  d,
  w,
  h,
  label,
}: {
  d: string;
  w: number;
  h: number;
  label: string;
}) {
  return (
    <div className="matrixCell">
      <svg width={w} height={h} style={{ maxWidth: '100%' }}>
        <path d={d} fill="#1D1D1B" />
      </svg>
      <div>{label}</div>
    </div>
  );
}

export default function PlaygroundPage() {
  return (
    <div>
      <h1>Visual QA Matrix</h1>
      <p>Shape × roughness × aspect ratio — pen-on-paper, not neobrutalism.</p>

      <h2>Rectangles</h2>
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

      <h2>Ovals</h2>
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

      <h2>Lines</h2>
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

      <h2>Token palette</h2>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {Object.entries(tokens.colors).map(([name, color]) => (
          <div key={name} style={{ textAlign: 'center', fontSize: '0.75rem' }}>
            <div style={{ width: 48, height: 48, background: color, border: '1px solid #ccc' }} />
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}
