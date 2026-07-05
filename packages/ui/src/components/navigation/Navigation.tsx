'use client';

import type { ReactNode } from 'react';
import { tokens, colorVars } from '@sketchpad/tokens';
import { SketchBorder } from '../../primitives/SketchBorder.js';
import { SketchArrow } from '../../primitives/decorative.js';
import { cn } from '../../utils.js';
import styles from './Navigation.module.css';

export interface NavItem {
  id: string;
  label: string;
}

export function Navbar({
  items,
  activeId,
  onSelect,
}: {
  items: NavItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
}) {
  return (
    <SketchBorder variant="rounded" seed="navbar" fill="paper" className={styles.nav}>
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            className={cn(styles.navItem, active && styles.navItemActive)}
            onClick={() => onSelect?.(item.id)}
          >
            {active && <span className={styles.highlight} aria-hidden="true" />}
            {item.label}
          </button>
        );
      })}
    </SketchBorder>
  );
}

export function Sidebar({
  items,
  activeId,
  onSelect,
}: {
  items: NavItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
}) {
  return (
    <SketchBorder variant="rounded" seed="sidebar" fill="paper" className={styles.sidebar}>
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            className={cn(styles.navItem, active && styles.navItemActive)}
            onClick={() => onSelect?.(item.id)}
            style={{ textAlign: 'left', width: '100%' }}
          >
            {active && <span className={styles.highlight} aria-hidden="true" />}
            {item.label}
          </button>
        );
      })}
    </SketchBorder>
  );
}

export function Tabs({
  tabs,
  activeId,
  onSelect,
}: {
  tabs: NavItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
}) {
  return (
    <div className={styles.tabs} role="tablist">
      {tabs.map((tab) => {
        const active = tab.id === activeId;
        return (
          <SketchBorder
            key={tab.id}
            variant="rounded"
            seed={`tab-${tab.id}`}
            fill={active ? 'paper' : 'none'}
            roughness={tokens.roughness.low}
          >
            <button
              type="button"
              role="tab"
              aria-selected={active}
              className={cn(styles.tab, active && styles.tabActive)}
              onClick={() => onSelect?.(tab.id)}
            >
              {tab.label}
            </button>
          </SketchBorder>
        );
      })}
    </div>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
      {items.map((item, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {i > 0 && <SketchArrow width={16} height={16} direction="right" seed={`bc-${i}`} />}
          {item.href ? (
            <a href={item.href} className={styles.breadcrumbLink}>
              {item.label}
            </a>
          ) : (
            <span>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange?: (page: number) => void;
}) {
  return (
    <div className={styles.pagination} role="navigation" aria-label="Pagination">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <SketchBorder key={p} variant="rounded" seed={`page-${p}`} fill={p === page ? 'accent' : 'paper'} accent="yellow">
          <button
            type="button"
            className={styles.pageBtn}
            aria-current={p === page ? 'page' : undefined}
            onClick={() => onChange?.(p)}
          >
            {p}
          </button>
        </SketchBorder>
      ))}
    </div>
  );
}

export type StepStatus = 'done' | 'current' | 'upcoming';

export function Stepper({
  steps,
}: {
  steps: { label: string; status: StepStatus }[];
}) {
  return (
    <div className={styles.stepper}>
      {steps.map((step, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
          <div className={styles.step}>
            <SketchBorder
              variant="oval"
              seed={`step-${i}`}
              width={28}
              height={28}
              fill={step.status === 'upcoming' ? 'none' : step.status === 'current' ? 'accent' : 'paper'}
              accent="green"
            >
              <span className={styles.stepCircle}>{step.status === 'done' ? '✓' : i + 1}</span>
            </SketchBorder>
            <span>{step.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={styles.connector}>
              <svg width={40} height={2} aria-hidden="true">
                <line x1={0} y1={1} x2={40} y2={1} stroke={colorVars.pencil} strokeDasharray="4 2" />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
