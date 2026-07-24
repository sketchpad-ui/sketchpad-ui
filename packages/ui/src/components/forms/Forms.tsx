'use client';

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from 'react';
import { colorVars } from '@sketchpad/tokens';
import { SketchBorder } from '../../primitives/SketchBorder.js';
import type { SketchComponentProps } from '../../types.js';
import { cn } from '../../utils.js';
import styles from './Forms.module.css';

interface FieldProps {
  label?: string;
  error?: string;
  id?: string;
  seed?: string | number;
  roughness?: number;
  strokeWidth?: number;
  accent?: SketchComponentProps['accent'];
  size?: SketchComponentProps['size'];
  disabled?: boolean;
  className?: string;
  style?: SketchComponentProps['style'];
}

export interface TextInputProps
  extends FieldProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'disabled'> {}

function FieldWrapper({
  label,
  error,
  id,
  children,
}: FieldProps & { children: ReactNode }) {
  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      {children}
      {error && (
        <span className={styles.error} role="alert">
          <span aria-hidden="true">!</span> {error}
        </span>
      )}
    </div>
  );
}

export function TextInput({
  label,
  error,
  id: idProp,
  seed = 'input',
  roughness,
  strokeWidth,
  disabled,
  className,
  size: _size,
  accent: _accent,
  ...rest
}: TextInputProps) {
  const autoId = useId();
  const id = idProp ?? autoId;

  return (
    <FieldWrapper label={label} error={error} id={id}>
      <SketchBorder
        variant="rounded"
        seed={seed}
        roughness={roughness}
        strokeWidth={strokeWidth}
        fill="paper"
        className={cn(styles.inputWrap, className)}
      >
        <input
          id={id}
          className={styles.input}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...rest}
        />
      </SketchBorder>
    </FieldWrapper>
  );
}

export function Textarea(props: TextInputProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const autoId = useId();
  const id = props.id ?? autoId;
  const {
    label,
    error,
    seed = 'textarea',
    roughness,
    strokeWidth,
    disabled,
    className,
    size: _size,
    accent: _accent,
    children: _children,
    ...rest
  } = props;

  return (
    <FieldWrapper label={label} error={error} id={id}>
      <SketchBorder variant="rounded" seed={seed} roughness={roughness} strokeWidth={strokeWidth} fill="paper">
        <textarea
          id={id}
          className={styles.input}
          disabled={disabled}
          aria-invalid={!!error}
          rows={4}
          {...rest}
        />
      </SketchBorder>
    </FieldWrapper>
  );
}

export function SearchInput(props: TextInputProps) {
  const {
    label,
    error,
    id: idProp,
    seed = 'search',
    roughness,
    strokeWidth,
    className,
    placeholder,
    size: _size,
    accent: _accent,
    children: _children,
    ...inputProps
  } = props;
  const autoId = useId();
  const id = idProp ?? autoId;

  return (
    <FieldWrapper label={label} error={error} id={id}>
      <SketchBorder variant="rounded" seed={seed} roughness={roughness} strokeWidth={strokeWidth} fill="paper">
        <span className={styles.searchIcon} aria-hidden="true">
          ⌕
        </span>
        <input
          type="search"
          id={id}
          className={cn(styles.input, styles.searchInput, className)}
          placeholder={placeholder ?? 'Search…'}
          {...inputProps}
        />
      </SketchBorder>
    </FieldWrapper>
  );
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends FieldProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export function Select({
  label,
  error,
  options,
  value,
  onChange,
  placeholder = 'Select…',
  seed = 'select',
  id: idProp,
}: SelectProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const selected = options.find((o) => o.value === value);

  const selectOption = useCallback(
    (index: number) => {
      const opt = options[index];
      if (opt) {
        onChange?.(opt.value);
        setOpen(false);
      }
    },
    [options, onChange],
  );

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIndex((i) => Math.min(i + 1, options.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectOption(focusedIndex);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, focusedIndex, options.length, selectOption]);

  return (
    <FieldWrapper label={label} error={error} id={id}>
      <div style={{ position: 'relative' }}>
        <SketchBorder variant="rounded" seed={seed} fill="paper">
          <button
            type="button"
            id={id}
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-invalid={!!error}
            className={styles.input}
            onClick={() => setOpen(!open)}
            style={{ textAlign: 'left', cursor: 'pointer' }}
          >
            {selected?.label ?? placeholder}
          </button>
        </SketchBorder>
        {open && (
          <SketchBorder variant="rounded" seed={`${seed}-list`} fill="paper" className={styles.selectList}>
            <ul ref={listRef} role="listbox" aria-labelledby={id}>
              {options.map((opt, i) => (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={opt.value === value}
                  className={cn(styles.option, i === focusedIndex && styles.optionFocused)}
                  onClick={() => selectOption(i)}
                  onMouseEnter={() => setFocusedIndex(i)}
                >
                  {opt.label}
                </li>
              ))}
            </ul>
          </SketchBorder>
        )}
      </div>
    </FieldWrapper>
  );
}

export function Checkbox({
  label,
  checked,
  onChange,
  seed = 'checkbox',
  disabled,
}: SketchComponentProps & {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  const id = useId();
  return (
    <label htmlFor={id} className={styles.checkbox}>
      <SketchBorder as="span" variant="rect" seed={seed} width={20} height={20} fill="paper">
        <span className={styles.checkboxBox}>
          <svg width={14} height={14} aria-hidden="true">
            <path
              d="M 2 7 L 6 11 L 12 3"
              className={cn(styles.tick, checked && styles.tickChecked)}
            />
          </svg>
        </span>
      </SketchBorder>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="sk-sr-only"
      />
      {label}
    </label>
  );
}

export function RadioGroup({
  name,
  options,
  value,
  onChange,
  seed = 'radio',
}: {
  name: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  seed?: string | number;
}) {
  return (
    <div role="radiogroup" className={styles.radioGroup}>
      {options.map((opt, i) => {
        const id = `${name}-${opt.value}`;
        const selected = value === opt.value;
        return (
          <label key={opt.value} htmlFor={id} className={styles.checkbox}>
            <SketchBorder as="span" variant="oval" seed={`${seed}-${i}`} width={20} height={20} fill="paper">
              <span className={styles.checkboxBox}>
                {selected && (
                  <span
                    aria-hidden="true"
                    style={{ width: 10, height: 10, borderRadius: '50%', background: colorVars.ink }}
                  />
                )}
              </span>
            </SketchBorder>
            <input
              type="radio"
              id={id}
              name={name}
              value={opt.value}
              checked={selected}
              onChange={() => onChange?.(opt.value)}
              className="sk-sr-only"
            />
            {opt.label}
          </label>
        );
      })}
    </div>
  );
}

export function Toggle({
  label,
  checked,
  onChange,
  seed = 'toggle',
  disabled,
}: SketchComponentProps & {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  const id = useId();
  return (
    <label htmlFor={id} className={styles.toggle}>
      <SketchBorder as="span" variant="oval" seed={seed} width={44} height={24} fill={checked ? 'accent' : 'paper'} accent="green">
        <span className={styles.toggleTrack}>
          <SketchBorder
            as="span"
            variant="oval"
            seed={`${seed}-knob`}
            width={18}
            height={18}
            fill="paper"
            className={styles.toggleKnob}
            style={{ left: checked ? 22 : 3 }}
          />
        </span>
      </SketchBorder>
      <input
        type="checkbox"
        role="switch"
        id={id}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="sk-sr-only"
      />
      {label}
    </label>
  );
}

export function Slider({
  label,
  value = 50,
  onChange,
  min = 0,
  max = 100,
  seed = 'slider',
}: SketchComponentProps & {
  label?: string;
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
}) {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}: {value}
        </label>
      )}
      <SketchBorder variant="rounded" seed={seed} fill="paper" className={styles.slider}>
        <div style={{ position: 'relative', padding: '8px 12px' }}>
          <div
            aria-hidden="true"
            style={{
              height: 6,
              width: `${pct}%`,
              background: colorVars.accentYellow,
              opacity: 0.6,
              borderRadius: 2,
            }}
          />
          <input
            type="range"
            id={id}
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange?.(Number(e.target.value))}
            className={styles.sliderInput}
            style={{ marginTop: -6 }}
          />
        </div>
      </SketchBorder>
    </div>
  );
}
