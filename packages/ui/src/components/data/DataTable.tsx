'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { SketchBorder } from '../../primitives/SketchBorder.js';
import { Checkbox } from '../forms/Forms.js';
import type { Column } from './Data.js';
import styles from './Data.module.css';

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  seed = 'data-table',
  selectable,
  selectedKeys,
  onSelectionChange,
}: {
  columns: Column<T>[];
  data: T[];
  seed?: string | number;
  selectable?: boolean;
  selectedKeys?: string[];
  onSelectionChange?: (keys: string[]) => void;
}) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const av = String(a[sortKey] ?? '');
      const bv = String(b[sortKey] ?? '');
      const cmp = av.localeCompare(bv);
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  const toggleSort = (key: string) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const rowKey = (row: T, i: number) => String(row.id ?? row.key ?? i);

  return (
    <SketchBorder variant="rounded" seed={seed} fill="paper" className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            {selectable && <th className={styles.th} scope="col" />}
            {columns.map((col) => (
              <th key={col.key} className={styles.th} scope="col">
                <button type="button" onClick={() => toggleSort(col.key)} style={{ border: 'none', background: 'transparent', font: 'inherit', cursor: 'pointer' }}>
                  {col.header}
                  {sortKey === col.key ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => {
            const key = rowKey(row, i);
            const checked = selectedKeys?.includes(key) ?? false;
            return (
              <tr key={key}>
                {selectable && (
                  <td className={styles.td}>
                    <Checkbox
                      label=""
                      checked={checked}
                      onChange={(c) => {
                        const base = selectedKeys ?? [];
                        onSelectionChange?.(c ? [...base, key] : base.filter((k) => k !== key));
                      }}
                      seed={`${seed}-sel-${key}`}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className={styles.td}>
                    {col.render ? col.render(row) : String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </SketchBorder>
  );
}
