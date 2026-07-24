'use client';

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { tokens } from '@sketchpad/tokens';
import { SketchBorder } from '../../primitives/SketchBorder.js';
import type { SketchComponentProps } from '../../types.js';
import { cn } from '../../utils.js';

interface FloatingProps extends SketchComponentProps {
  content: ReactNode;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function useFloating({ open: controlledOpen, onOpenChange }: Pick<FloatingProps, 'open' | 'onOpenChange'>) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = useCallback(
    (value: boolean) => {
      setInternalOpen(value);
      onOpenChange?.(value);
    },
    [onOpenChange],
  );
  return { open, setOpen };
}

export function Tooltip({ content, children, seed = 'tooltip' }: FloatingProps) {
  const [visible, setVisible] = useState(false);
  const id = useId();

  return (
    <span
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      <span aria-describedby={visible ? id : undefined}>{children}</span>
      {visible && (
        <div
          id={id}
          role="tooltip"
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 50,
            whiteSpace: 'nowrap',
          }}
        >
          <SketchBorder variant="rounded" seed={seed} fill="paper" roughness={tokens.roughness.low}>
            <span style={{ padding: '6px 10px', fontSize: '0.85rem', display: 'block' }}>
              {content}
            </span>
          </SketchBorder>
        </div>
      )}
    </span>
  );
}

export function Popover({
  content,
  children,
  open: controlledOpen,
  onOpenChange,
  seed = 'popover',
}: FloatingProps) {
  const { open, setOpen } = useFloating({ open: controlledOpen, onOpenChange });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, setOpen]);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <span onClick={() => setOpen(!open)}>{children}</span>
      {open && (
        <div
          role="dialog"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            zIndex: 50,
            minWidth: 200,
          }}
        >
          <SketchBorder variant="rounded" seed={seed} fill="paper">
            <div style={{ padding: 12 }}>{content}</div>
          </SketchBorder>
          <PopoverArrow seed={seed} />
        </div>
      )}
    </div>
  );
}

function PopoverArrow({ seed: _seed }: { seed: string | number }) {
  return (
    <span
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: -8,
        left: 16,
        width: 14,
        height: 14,
        background: 'var(--sk-colors-canvas)',
        borderTop: '3px solid var(--sk-colors-border)',
        borderLeft: '3px solid var(--sk-colors-border)',
        transform: 'rotate(45deg)',
      }}
    />
  );
}

export function HoverCard({
  content,
  children,
  seed = 'hover-card',
  width = 280,
}: {
  content: ReactNode;
  children: ReactNode;
  seed?: string | number;
  width?: number;
}) {
  const [visible, setVisible] = useState(false);
  const id = useId();

  return (
    <span
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      <span aria-describedby={visible ? id : undefined}>{children}</span>
      {visible && (
        <div
          id={id}
          role="tooltip"
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 10px)',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 50,
            width,
          }}
        >
          <SketchBorder variant="rounded" seed={seed} fill="paper" roughness={tokens.roughness.subtle}>
            <div style={{ padding: 12, fontSize: '0.875rem' }}>{content}</div>
          </SketchBorder>
        </div>
      )}
    </span>
  );
}
