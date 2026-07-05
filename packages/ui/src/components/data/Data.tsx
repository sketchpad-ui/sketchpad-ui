'use client';

import type { ReactNode } from 'react';
import { tokens } from '@sketchpad/tokens';
import { SketchBorder } from '../../primitives/SketchBorder.js';
import { HandwrittenNote, ImagePlaceholder, ScribbleLine, SketchArrow } from '../../primitives/decorative.js';
import { RoughLine } from '../../primitives/decorative.js';
import { cn } from '../../utils.js';
import styles from './Data.module.css';

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
}

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  seed = 'table',
}: {
  columns: Column<T>[];
  data: T[];
  seed?: string | number;
}) {
  return (
    <SketchBorder variant="rounded" seed={seed} fill="paper" className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={styles.th} scope="col">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td key={col.key} className={styles.td}>
                  {col.render ? col.render(row) : String(row[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </SketchBorder>
  );
}

export function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className={styles.list}>
      {items.map((item, i) => (
        <li key={i} className={styles.listItem}>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Timeline({
  events,
}: {
  events: { title: string; description?: string; date?: string }[];
}) {
  return (
    <div className={styles.timeline}>
      {events.map((event, i) => (
        <div key={i} className={styles.timelineItem}>
          <SketchBorder variant="oval" seed={`tl-${i}`} width={12} height={12} fill="paper" className={styles.timelineDot} />
          {i < events.length - 1 && (
            <div style={{ position: 'absolute', left: -18, top: 16, height: 'calc(100% - 8px)' }}>
              <RoughLine x1={0} y1={0} x2={0} y2={60} width={2} seed={`tl-line-${i}`} />
            </div>
          )}
          <strong>{event.title}</strong>
          {event.date && (
            <div style={{ fontSize: '0.8rem', color: tokens.colors.pencil }}>{event.date}</div>
          )}
          {event.description && <p style={{ margin: '4px 0 0', color: tokens.colors.inkSoft }}>{event.description}</p>}
        </div>
      ))}
    </div>
  );
}

export function StatCard({
  value,
  label,
  trend,
  seed = 'stat',
}: {
  value: string | number;
  label: string;
  trend?: 'up' | 'down';
  seed?: string | number;
}) {
  return (
    <SketchBorder variant="rounded" seed={seed} fill="paper" className={styles.statCard}>
      <p className={styles.statValue}>
        {value}
        {trend && (
          <span
            style={{
              display: 'inline-block',
              transform: trend === 'up' ? 'rotate(-90deg)' : 'none',
              verticalAlign: 'middle',
              marginLeft: 4,
            }}
          >
            <SketchArrow width={20} height={20} direction="right" seed={`${seed}-trend`} />
          </span>
        )}
      </p>
      <p className={styles.statLabel}>{label}</p>
    </SketchBorder>
  );
}

export function ProgressBar({
  value,
  max = 100,
  seed = 'progress',
}: {
  value: number;
  max?: number;
  seed?: string | number;
}) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <SketchBorder variant="rounded" seed={seed} fill="paper" className={styles.progressTrack}>
      <div className={styles.progressFill} style={{ width: `${pct}%` }} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} />
    </SketchBorder>
  );
}

export function SkeletonLoader({
  lines = 3,
  seed = 'skeleton',
}: {
  lines?: number;
  seed?: string | number;
}) {
  return (
    <div className={styles.skeleton} aria-busy="true" aria-label="Loading">
      <ScribbleLine lines={lines} seed={seed} width={280} roughness={tokens.roughness.high} />
    </div>
  );
}

export function EmptyState({
  title,
  description,
  illustration,
}: {
  title: string;
  description?: string;
  illustration?: ReactNode;
}) {
  return (
    <div className={styles.emptyState}>
      {illustration ?? <ImagePlaceholder width={200} height={140} seed="empty" showIcon />}
      <h3 className={styles.emptyTitle}>{title}</h3>
      {description && <HandwrittenNote className={styles.emptyText}>{description}</HandwrittenNote>}
    </div>
  );
}
