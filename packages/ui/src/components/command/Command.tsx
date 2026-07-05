'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { tokens } from '@sketchpad/tokens';
import { SketchBorder } from '../../primitives/SketchBorder.js';
import { Kbd } from '../typography/Typography.js';
import { cn } from '../../utils.js';
import styles from './Command.module.css';

export interface CommandItem {
  id: string;
  label: string;
  hint?: string;
  keywords?: string[];
  onSelect?: () => void;
}

export function Command({
  open,
  onClose,
  items,
  placeholder = 'Search commands…',
  seed = 'command',
}: {
  open: boolean;
  onClose?: () => void;
  items: CommandItem[];
  placeholder?: string;
  seed?: string | number;
}) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.keywords?.some((k) => k.toLowerCase().includes(q)),
    );
  }, [items, query]);

  useEffect(() => {
    if (!open) {
      setQuery('');
      setFocused(0);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocused((i) => Math.min(i + 1, filtered.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocused((i) => Math.max(i - 1, 0));
      }
      if (e.key === 'Enter' && filtered[focused]) {
        e.preventDefault();
        filtered[focused]?.onSelect?.();
        onClose?.();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, filtered, focused, onClose]);

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Command palette">
        <SketchBorder variant="rounded" seed={seed} fill="paper" roughness={tokens.roughness.subtle}>
          <div style={{ padding: 12 }}>
            <SketchBorder variant="rounded" seed={`${seed}-input`} fill="paperAlt">
              <input
                className={styles.input}
                placeholder={placeholder}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setFocused(0);
                }}
                autoFocus
                aria-label="Search commands"
              />
            </SketchBorder>
            <ul className={styles.list} role="listbox">
              {filtered.length === 0 ? (
                <li className={styles.empty}>No results</li>
              ) : (
                filtered.map((item, i) => (
                  <li
                    key={item.id}
                    role="option"
                    aria-selected={i === focused}
                    className={cn(styles.item, i === focused && styles.itemFocused)}
                    onMouseEnter={() => setFocused(i)}
                    onClick={() => {
                      item.onSelect?.();
                      onClose?.();
                    }}
                  >
                    <span>{item.label}</span>
                    {item.hint && <span className={styles.itemHint}>{item.hint}</span>}
                  </li>
                ))
              )}
            </ul>
            <div style={{ marginTop: 8, display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
              <Kbd>↑↓</Kbd>
              <Kbd>↵</Kbd>
              <Kbd>esc</Kbd>
            </div>
          </div>
        </SketchBorder>
      </div>
    </div>
  );
}

export function CommandShortcut({
  items,
  children,
}: {
  items: CommandItem[];
  children?: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      {children}
      <Command open={open} onClose={() => setOpen(false)} items={items} />
    </>
  );
}
