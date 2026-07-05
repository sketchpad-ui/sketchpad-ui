'use client';

import { useId, useRef, type ClipboardEvent, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes } from 'react';
import { tokens } from '@sketchpad/tokens';
import { SketchBorder } from '../../primitives/SketchBorder.js';
import { cn } from '../../utils.js';
import styles from './InputExtras.module.css';
import formStyles from './Forms.module.css';

export function InputGroup({
  prefix,
  suffix,
  children,
  seed = 'input-group',
}: {
  prefix?: ReactNode;
  suffix?: ReactNode;
  children: ReactNode;
  seed?: string | number;
}) {
  return (
    <SketchBorder variant="rounded" seed={seed} fill="paper" className={styles.inputGroup}>
      {prefix && <span className={styles.inputGroupAddon}>{prefix}</span>}
      <div className={styles.inputGroupField}>{children}</div>
      {suffix && <span className={styles.inputGroupAddon}>{suffix}</span>}
    </SketchBorder>
  );
}

export function InputOTP({
  length = 6,
  value = '',
  onChange,
  seed = 'otp',
}: {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  seed?: string | number;
}) {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const chars = value.padEnd(length, ' ').slice(0, length).split('');

  const updateAt = (index: number, char: string) => {
    const next = chars.map((c, i) => (i === index ? char : c)).join('').trimEnd();
    onChange?.(next.replace(/\s/g, ''));
  };

  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    onChange?.(pasted);
    inputs.current[Math.min(pasted.length, length - 1)]?.focus();
  };

  return (
    <div className={styles.otpRow} onPaste={handlePaste}>
      {Array.from({ length }, (_, i) => (
        <SketchBorder
          key={i}
          variant="rounded"
          seed={`${seed}-${i}`}
          fill="paper"
          className={styles.otpCellWrap}
        >
          <input
            ref={(el) => {
              inputs.current[i] = el;
            }}
            className={styles.otpCell}
            inputMode="numeric"
            maxLength={1}
            aria-label={`Digit ${i + 1}`}
            value={chars[i]?.trim() ? chars[i] : ''}
            onChange={(e) => {
              const v = e.target.value.slice(-1);
              updateAt(i, v);
              if (v && i < length - 1) inputs.current[i + 1]?.focus();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Backspace' && !chars[i]?.trim() && i > 0) {
                inputs.current[i - 1]?.focus();
              }
            }}
          />
        </SketchBorder>
      ))}
    </div>
  );
}

export function NativeSelect({
  label,
  options,
  id: idProp,
  seed = 'native-select',
  className,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: { value: string; label: string }[];
  seed?: string | number;
}) {
  const autoId = useId();
  const id = idProp ?? autoId;

  return (
    <div className={formStyles.field}>
      {label && (
        <label htmlFor={id} className={formStyles.label}>
          {label}
        </label>
      )}
      <SketchBorder variant="rounded" seed={seed} fill="paper" className={className}>
        <select id={id} className={styles.nativeSelect} {...rest}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </SketchBorder>
    </div>
  );
}

export function ToggleGroup({
  items,
  value,
  onChange,
  type = 'single',
  seed = 'toggle-group',
}: {
  items: { id: string; label: string }[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  type?: 'single' | 'multiple';
  seed?: string | number;
}) {
  const isActive = (id: string) =>
    type === 'single' ? value === id : Array.isArray(value) && value.includes(id);

  const toggle = (id: string) => {
    if (type === 'single') {
      onChange?.(id);
      return;
    }
    const current = Array.isArray(value) ? value : [];
    onChange?.(current.includes(id) ? current.filter((x) => x !== id) : [...current, id]);
  };

  return (
    <SketchBorder variant="rounded" seed={seed} fill="paper" className={styles.toggleGroup}>
      <div role="group" style={{ display: 'contents' }}>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={cn(styles.toggleGroupBtn, isActive(item.id) && styles.toggleGroupBtnActive)}
          aria-pressed={isActive(item.id)}
          onClick={() => toggle(item.id)}
        >
          {item.label}
        </button>
      ))}
      </div>
    </SketchBorder>
  );
}
