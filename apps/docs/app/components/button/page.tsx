'use client';

import { useState } from 'react';
import {
  Button,
  IconButton,
  Badge,
  Tooltip,
  Avatar,
  Paper,
} from 'sketchpad-ui';

export default function ButtonPage() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Button</h1>
      <p>Interactive buttons with sketch borders. Real semantic buttons underneath decorative SVG.</p>

      <Paper className="demoBox" seed="btn-demo">
        <h3>Variants</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="filled">Filled</Button>
          <Button variant="accent" accent="blue">
            Accent
          </Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <IconButton aria-label="Add" seed="icon-add">
            +
          </IconButton>
        </div>

        <h3 style={{ marginTop: 24 }}>States</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Button onClick={() => setCount((c) => c + 1)} seed="counter">
            Count: {count}
          </Button>
          <Button disabled>Disabled</Button>
          <Tooltip content="Sketch tooltip">
            <Button variant="ghost">Hover me</Button>
          </Tooltip>
        </div>

        <h3 style={{ marginTop: 24 }}>Badge & Avatar</h3>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Badge>New</Badge>
          <Badge variant="stamp">Draft</Badge>
          <Avatar placeholder pixelSize={48} seed="avatar-demo" />
        </div>
      </Paper>

      <pre className="code">{`import { Button } from 'sketchpad-ui';

<Button variant="primary" seed="hero-cta">Get started</Button>`}</pre>
    </div>
  );
}
