'use client';

import { tokens } from '@sketchpad/tokens';
import { SketchBorder } from '../../primitives/SketchBorder.js';
import { cn } from '../../utils.js';
import styles from './ButtonGroup.module.css';

export interface ButtonGroupItem {
  id: string;
  label: string;
  disabled?: boolean;
}

export function ButtonGroup({
  items,
  value,
  onChange,
  seed = 'button-group',
  className,
}: {
  items: ButtonGroupItem[];
  value?: string;
  onChange?: (id: string) => void;
  seed?: string | number;
  className?: string;
}) {
  return (
    <SketchBorder
      variant="rounded"
      seed={seed}
      fill="paper"
      roughness={tokens.roughness.subtle}
      strokeWidth={tokens.stroke.thin}
      className={cn(styles.group, className)}
    >
      <div role="group" style={{ display: 'contents' }}>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={cn(styles.btn, value === item.id && styles.btnActive)}
          aria-pressed={value === item.id}
          disabled={item.disabled}
          onClick={() => onChange?.(item.id)}
        >
          {item.label}
        </button>
      ))}
      </div>
    </SketchBorder>
  );
}
