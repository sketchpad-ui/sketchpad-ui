'use client';

import {
  SketchBorder,
  Button,
  Card,
  ProgressBar,
} from 'sketchpad-ui';
import { DemoBlock, DocHeader } from '../../../components/DocPage';
import type { DocItem } from '../../../lib/docs-config';

const doc: DocItem = {
  slug: 'primitives',
  name: 'Primitives',
  description: 'Uniform borders, hard shadows, surfaces, focus rings, and interaction motion.',
  status: 'shipped',
};

export default function PrimitivesPage() {
  return (
    <article className="docArticle">
      <DocHeader doc={doc} />

      <DemoBlock title="Surface variants">
        <div className="demoRow">
          {(['rect', 'rounded', 'oval'] as const).map((v) => (
            <SketchBorder key={v} variant={v} fill="paper">
              <span style={{ padding: '8px 16px', display: 'block' }}>{v}</span>
            </SketchBorder>
          ))}
        </div>
      </DemoBlock>

      <DemoBlock title="Interaction language">
        <Card title="Player status" description="Uniform borders and zero-blur shadows">
          <ProgressBar value={72} />
          <div style={{ marginTop: 18 }}><Button>PRESS ME</Button></div>
        </Card>
      </DemoBlock>
    </article>
  );
}
