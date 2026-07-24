'use client';

import Link from 'next/link';
import { Badge, SketchBorder } from 'sketchpad-ui';
import { getComponentPhase, type DocItem } from '../lib/docs-config';

export function ComponentCard({ item }: { item: DocItem }) {
  const badge =
    item.status === 'partial' ? 'Partial' : item.status === 'new' ? 'New' : item.status === 'planned' ? 'Soon' : null;

  return (
    <Link href={`/docs/components/${item.slug}`} className="componentCardLink">
      <SketchBorder
        variant="rounded"
        fill="paper"
        className="componentCardSketch"
      >
        <div className="componentCardTop">
          <span className="componentCardName">{item.name}</span>
          <span className="componentPhase">P{getComponentPhase(item.slug)}</span>
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
