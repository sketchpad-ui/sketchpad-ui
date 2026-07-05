'use client';

import Link from 'next/link';
import { tokens } from '@sketchpad/tokens';
import { Badge, SketchBorder } from 'sketchpad-ui';
import type { DocItem } from '../lib/docs-config';

export function ComponentCard({ item }: { item: DocItem }) {
  const badge =
    item.status === 'partial' ? 'Partial' : item.status === 'new' ? 'New' : item.status === 'planned' ? 'Soon' : null;

  return (
    <Link href={`/docs/components/${item.slug}`} className="componentCardLink">
      <SketchBorder
        variant="rounded"
        seed={`card-${item.slug}`}
        fill="paper"
        roughness={tokens.roughness.low}
        strokeWidth={tokens.stroke.thin}
        className="componentCardSketch"
      >
        <div className="componentCardTop">
          <span className="componentCardName">{item.name}</span>
          {badge && (
            <Badge
              variant={item.status === 'new' ? 'marker' : item.status === 'partial' ? 'stamp' : 'default'}
              seed={`card-badge-${item.slug}`}
              accent={item.status === 'new' ? 'green' : item.status === 'partial' ? 'blue' : 'yellow'}
              style={{ fontSize: '0.65rem' }}
            >
              {badge}
            </Badge>
          )}
        </div>
        <p className="componentCardDesc">{item.description}</p>
      </SketchBorder>
    </Link>
  );
}
