'use client';

import { useState, type ReactNode } from 'react';
import { tokens } from '@sketchpad/tokens';
import { SketchBorder } from '../../primitives/SketchBorder.js';
import type { SketchComponentProps } from '../../types.js';
import { cn } from '../../utils.js';
import styles from './Structure.module.css';

export interface CardProps extends SketchComponentProps {
  title?: string;
  description?: string;
  footer?: ReactNode;
  header?: ReactNode;
}

export function Card({
  title,
  description,
  footer,
  header,
  children,
  seed = 'card',
  roughness,
  strokeWidth,
  className,
  style,
}: CardProps) {
  const hasHeader = header || title || description;

  return (
    <SketchBorder
      variant="rounded"
      seed={seed}
      fill="paper"
      roughness={roughness ?? tokens.roughness.subtle}
      strokeWidth={strokeWidth ?? tokens.stroke.thin}
      className={cn(styles.card, className)}
      style={style}
    >
      {hasHeader && (
        <div className={styles.cardHeader}>
          {header}
          {title && <h3 className={styles.cardTitle}>{title}</h3>}
          {description && <p className={styles.cardDescription}>{description}</p>}
        </div>
      )}
      {children && <div className={styles.cardContent}>{children}</div>}
      {footer && <div className={styles.cardFooter}>{footer}</div>}
    </SketchBorder>
  );
}

export interface AccordionItemData {
  id: string;
  title: string;
  content: ReactNode;
}

export function Accordion({
  items,
  allowMultiple = false,
  seed = 'accordion',
  className,
}: {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  seed?: string | number;
  className?: string;
}) {
  const [open, setOpen] = useState<string[]>([]);

  const toggle = (id: string) => {
    setOpen((prev) => {
      const isOpen = prev.includes(id);
      if (allowMultiple) {
        return isOpen ? prev.filter((x) => x !== id) : [...prev, id];
      }
      return isOpen ? [] : [id];
    });
  };

  return (
    <div className={cn(styles.accordion, className)}>
      {items.map((item, i) => {
        const isOpen = open.includes(item.id);
        return (
          <SketchBorder
            key={item.id}
            variant="rounded"
            seed={`${seed}-${i}`}
            fill="paper"
            roughness={tokens.roughness.subtle}
            strokeWidth={tokens.stroke.thin}
            className={styles.accordionItem}
          >
            <button
              type="button"
              className={styles.accordionTrigger}
              aria-expanded={isOpen}
              onClick={() => toggle(item.id)}
            >
              <span>{item.title}</span>
              <span className={cn(styles.accordionChevron, isOpen && styles.accordionChevronOpen)} aria-hidden="true">
                ›
              </span>
            </button>
            {isOpen && <div className={styles.accordionPanel}>{item.content}</div>}
          </SketchBorder>
        );
      })}
    </div>
  );
}

export function Collapsible({
  trigger,
  children,
  defaultOpen = false,
  seed = 'collapsible',
  className,
}: {
  trigger: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  seed?: string | number;
  className?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <SketchBorder
      variant="rounded"
      seed={seed}
      fill="paper"
      roughness={tokens.roughness.subtle}
      strokeWidth={tokens.stroke.thin}
      className={className}
      style={{ padding: 12 }}
    >
      <button
        type="button"
        className={styles.collapsibleTrigger}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={cn(styles.accordionChevron, open && styles.accordionChevronOpen)} aria-hidden="true">
          ›
        </span>
        {trigger}
      </button>
      {open && <div className={styles.collapsibleContent}>{children}</div>}
    </SketchBorder>
  );
}
