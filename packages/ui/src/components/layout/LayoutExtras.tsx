'use client';

import { useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { tokens } from '@sketchpad/tokens';
import { SketchBorder } from '../../primitives/SketchBorder.js';
import { cn } from '../../utils.js';
import styles from './LayoutExtras.module.css';

export function Resizable({
  left,
  right,
  defaultLeftWidth = 40,
  seed = 'resizable',
}: {
  left: ReactNode;
  right: ReactNode;
  defaultLeftWidth?: number;
  seed?: string | number;
}) {
  const [leftPct, setLeftPct] = useState(defaultLeftWidth);
  const dragging = useRef(false);

  const onMove = (e: MouseEvent) => {
    if (!dragging.current) return;
    const pct = (e.clientX / window.innerWidth) * 100;
    setLeftPct(Math.min(75, Math.max(25, pct)));
  };

  const onUp = () => {
    dragging.current = false;
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseup', onUp);
  };

  return (
    <SketchBorder variant="rounded" seed={seed} fill="paper" className={styles.resizable}>
      <div className={styles.resizablePanel} style={{ width: `${leftPct}%` }}>
        {left}
      </div>
      <div
        className={styles.resizableHandle}
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize panels"
        onMouseDown={() => {
          dragging.current = true;
          window.addEventListener('mousemove', onMove);
          window.addEventListener('mouseup', onUp);
        }}
      >
        ⋮
      </div>
      <div className={styles.resizablePanel} style={{ flex: 1 }}>
        {right}
      </div>
    </SketchBorder>
  );
}

export function ScrollArea({
  children,
  maxHeight = 240,
  seed = 'scroll-area',
  className,
  style,
}: {
  children: ReactNode;
  maxHeight?: number;
  seed?: string | number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <SketchBorder
      variant="rounded"
      seed={seed}
      fill="paper"
      roughness={tokens.roughness.subtle}
      className={cn('sk-scrollbar', styles.scrollArea, className)}
      style={{ '--sk-scroll-max-height': `${maxHeight}px`, ...style } as CSSProperties}
    >
      {children}
    </SketchBorder>
  );
}
