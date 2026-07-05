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

export default function PrimitivesPage() {
  return (
    <div>
      <h1>Primitives</h1>
      <Paper className="demoBox" seed="prim-demo">
        <h3>SketchBorder variants</h3>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          {(['rect', 'rounded', 'oval', 'torn'] as const).map((v) => (
            <SketchBorder key={v} variant={v} seed={`border-${v}`} fill="paper">
              <span style={{ padding: '8px 16px', display: 'block' }}>{v}</span>
            </SketchBorder>
          ))}
        </div>

        <h3 style={{ marginTop: 24 }}>Annotation layer</h3>
        <div style={{ position: 'relative', padding: 16 }}>
          <MarkerHighlight width={100} height={24} />
          <HandwrittenNote style={{ marginTop: 8 }}>Marker highlight behind text</HandwrittenNote>
          <div style={{ marginTop: 16 }}>
            <RoughLine width={200} seed="prim-line" />
          </div>
          <ImagePlaceholder width={240} height={140} caption="hero image" showIcon seed="prim-img" />
          <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <SketchArrow seed="prim-arrow" />
            <HandwrittenNote>Points at the button</HandwrittenNote>
          </div>
        </div>
      </Paper>
    </div>
  );
}
