'use client';

import {
  SketchBorder,
  RoughLine,
  MarkerHighlight,
  ImagePlaceholder,
  HandwrittenNote,
  SketchArrow,
  Paper,
} from 'sketchpad-ui';
import { DemoBlock, DocHeader } from '../../../components/DocPage';
import type { DocItem } from '../../../lib/docs-config';

const doc: DocItem = {
  slug: 'primitives',
  name: 'Primitives',
  description: 'SketchBorder and the annotation layer. Building blocks for every component.',
  status: 'shipped',
};

export default function PrimitivesPage() {
  return (
    <article className="docArticle">
      <DocHeader doc={doc} />

      <DemoBlock title="SketchBorder variants">
        <div className="demoRow">
          {(['rect', 'rounded', 'oval', 'torn'] as const).map((v) => (
            <SketchBorder key={v} variant={v} seed={`border-${v}`} fill="paper">
              <span style={{ padding: '8px 16px', display: 'block' }}>{v}</span>
            </SketchBorder>
          ))}
        </div>
      </DemoBlock>

      <DemoBlock title="Annotation layer">
        <Paper seed="prim-demo" style={{ padding: 16 }}>
          <MarkerHighlight width={100} height={24} />
          <HandwrittenNote style={{ marginTop: 8 }}>Marker highlight behind text</HandwrittenNote>
          <div style={{ marginTop: 16 }}>
            <RoughLine width={200} seed="prim-line" />
          </div>
          <ImagePlaceholder width={240} height={140} caption="hero image" showIcon seed="prim-img" />
          <div className="introNote" style={{ marginTop: 16 }}>
            <SketchArrow seed="prim-arrow" />
            <HandwrittenNote>Points at the button</HandwrittenNote>
          </div>
        </Paper>
      </DemoBlock>
    </article>
  );
}
