'use client';

import { useCallback, useEffect, useId, useState, type CSSProperties, type ReactNode } from 'react';
import { tokens } from '@sketchpad/tokens';
import { SketchBorder } from '../../primitives/SketchBorder.js';
import { cn } from '../../utils.js';
import styles from './Menus.module.css';

export interface MenuItem {
  id: string;
  label: string;
  destructive?: boolean;
  separator?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
}

function MenuList({
  items,
  onSelect,
  className,
  style,
  seed,
}: {
  items: MenuItem[];
  onSelect: (item: MenuItem) => void;
  className?: string;
  style?: CSSProperties;
  seed: string | number;
}) {
  const [focused, setFocused] = useState(0);
  const actionable = items.filter((i) => !i.separator && !i.disabled);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocused((i) => Math.min(i + 1, actionable.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocused((i) => Math.max(i - 1, 0));
      }
      if (e.key === 'Enter' && actionable[focused]) {
        e.preventDefault();
        onSelect(actionable[focused]!);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [focused, actionable, onSelect]);

  let actionIndex = -1;

  return (
    <SketchBorder variant="rounded" seed={seed} fill="paper" className={className} style={style}>
      <ul role="menu">
        {items.map((item) => {
          if (item.separator) {
            return <li key={item.id} role="separator" className={styles.menuSeparator} />;
          }
          actionIndex += 1;
          const idx = actionIndex;
          return (
            <li key={item.id} role="none">
              <button
                type="button"
                role="menuitem"
                disabled={item.disabled}
                className={cn(
                  styles.menuItem,
                  idx === focused && styles.menuItemFocused,
                  item.destructive && styles.menuItemDestructive,
                )}
                onClick={() => onSelect(item)}
                onMouseEnter={() => setFocused(idx)}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </SketchBorder>
  );
}

export function DropdownMenu({
  trigger,
  items,
  align = 'left',
  seed = 'dropdown',
}: {
  trigger: ReactNode;
  items: MenuItem[];
  align?: 'left' | 'right';
  seed?: string | number;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();

  const select = useCallback(
    (item: MenuItem) => {
      item.onSelect?.();
      setOpen(false);
    },
    [],
  );

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handler);
    document.addEventListener('click', close);
    return () => {
      document.removeEventListener('keydown', handler);
      document.removeEventListener('click', close);
    };
  }, [open]);

  return (
    <div className={styles.menuWrap} onClick={(e) => e.stopPropagation()}>
      <span aria-haspopup="menu" aria-expanded={open} id={id} onClick={() => setOpen((v) => !v)}>
        {trigger}
      </span>
      {open && (
        <MenuList
          items={items}
          onSelect={select}
          seed={`${seed}-menu`}
          className={cn(styles.menuPanel, align === 'right' && styles.menuPanelRight)}
        />
      )}
    </div>
  );
}

export function ContextMenu({
  children,
  items,
  seed = 'context-menu',
}: {
  children: ReactNode;
  items: MenuItem[];
  seed?: string | number;
}) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const select = useCallback((item: MenuItem) => {
    item.onSelect?.();
    setPos(null);
  }, []);

  useEffect(() => {
    if (!pos) return;
    const close = () => setPos(null);
    document.addEventListener('click', close);
    document.addEventListener('scroll', close, true);
    return () => {
      document.removeEventListener('click', close);
      document.removeEventListener('scroll', close, true);
    };
  }, [pos]);

  return (
    <>
      <div
        onContextMenu={(e) => {
          e.preventDefault();
          setPos({ x: e.clientX, y: e.clientY });
        }}
      >
        {children}
      </div>
      {pos && (
        <MenuList
          items={items}
          onSelect={select}
          seed={seed}
          className={styles.contextLayer}
          style={{ top: pos.y, left: pos.x }}
        />
      )}
    </>
  );
}
