'use client';

import { useMemo, useState } from 'react';
import { SketchBorder } from '../../primitives/SketchBorder.js';
import { cn } from '../../utils.js';
import styles from './DateTime.module.css';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function formatDate(d: Date) {
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function Calendar({
  value,
  onChange,
  seed = 'calendar',
}: {
  value?: Date;
  onChange?: (date: Date) => void;
  seed?: string | number;
}) {
  const [view, setView] = useState(value ?? new Date());

  const cells = useMemo(() => {
    const year = view.getFullYear();
    const month = view.getMonth();
    const first = new Date(year, month, 1);
    const start = new Date(year, month, 1 - first.getDay());
    return Array.from({ length: 42 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }, [view]);

  return (
    <SketchBorder variant="rounded" seed={seed} fill="paper" className={styles.calendar}>
      <div className={styles.calendarHeader}>
        <button type="button" className={styles.calendarNav} aria-label="Previous month" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}>
          ‹
        </button>
        <span className={styles.calendarTitle}>{view.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
        <button type="button" className={styles.calendarNav} aria-label="Next month" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}>
          ›
        </button>
      </div>
      <div className={styles.calendarGrid} role="grid">
        {WEEKDAYS.map((d) => (
          <span key={d} className={styles.calendarWeekday} role="columnheader">
            {d}
          </span>
        ))}
        {cells.map((day) => {
          const outside = day.getMonth() !== view.getMonth();
          const selected = value && sameDay(day, value);
          return (
            <button
              key={day.toISOString()}
              type="button"
              role="gridcell"
              className={cn(styles.dayCell, outside && styles.dayOutside, selected && styles.daySelected)}
              onClick={() => onChange?.(day)}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </SketchBorder>
  );
}

export function DatePicker({
  label,
  value,
  onChange,
  seed = 'date-picker',
}: {
  label?: string;
  value?: Date;
  onChange?: (date: Date) => void;
  seed?: string | number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.datePickerWrap}>
      {label && <label className={styles.calendarTitle} style={{ display: 'block', marginBottom: 6 }}>{label}</label>}
      <SketchBorder variant="rounded" seed={seed} fill="paper">
        <button type="button" className={cn(styles.dayCell, styles.datePickerTrigger)} style={{ padding: '10px 12px', width: '100%' }} onClick={() => setOpen((v) => !v)}>
          {value ? formatDate(value) : 'Pick a date'}
        </button>
      </SketchBorder>
      {open && (
        <div className={styles.datePickerPanel}>
          <Calendar
            value={value}
            seed={`${seed}-cal`}
            onChange={(d) => {
              onChange?.(d);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
