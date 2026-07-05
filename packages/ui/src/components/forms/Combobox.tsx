'use client';

import { useId, useMemo, useState } from 'react';
import { SketchBorder } from '../../primitives/SketchBorder.js';
import { cn } from '../../utils.js';
import formStyles from './Forms.module.css';

export function Combobox({
  label,
  options,
  value,
  onChange,
  placeholder = 'Search…',
  seed = 'combobox',
}: {
  label?: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  seed?: string | number;
}) {
  const id = useId();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  const selected = options.find((o) => o.value === value);

  return (
    <div className={formStyles.field}>
      {label && (
        <label htmlFor={id} className={formStyles.label}>
          {label}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        <SketchBorder variant="rounded" seed={seed} fill="paper">
          <input
            id={id}
            role="combobox"
            aria-expanded={open}
            aria-autocomplete="list"
            className={formStyles.input}
            placeholder={selected?.label ?? placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
          />
        </SketchBorder>
        {open && filtered.length > 0 && (
          <SketchBorder variant="rounded" seed={`${seed}-list`} fill="paper" className={formStyles.selectList}>
            <ul role="listbox">
              {filtered.map((opt) => (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={opt.value === value}
                  className={cn(formStyles.option, opt.value === value && formStyles.optionFocused)}
                  onMouseDown={() => {
                    onChange?.(opt.value);
                    setQuery('');
                    setOpen(false);
                  }}
                >
                  {opt.label}
                </li>
              ))}
            </ul>
          </SketchBorder>
        )}
      </div>
    </div>
  );
}
