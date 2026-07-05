'use client';

import { useId, type LabelHTMLAttributes, type ReactNode } from 'react';
import { tokens } from '@sketchpad/tokens';
import { SketchBorder } from '../../primitives/SketchBorder.js';
import { cn } from '../../utils.js';
import styles from './Typography.module.css';

export function Kbd({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <SketchBorder
      as="kbd"
      variant="rounded"
      seed="kbd"
      fill="paperAlt"
      roughness={tokens.roughness.subtle}
      strokeWidth={tokens.stroke.thin}
      className={cn(styles.kbd, className)}
    >
      {children}
    </SketchBorder>
  );
}

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function Label({ children, required, className, ...rest }: LabelProps) {
  return (
    <label className={cn(styles.label, required && styles.labelRequired, className)} {...rest}>
      {children}
    </label>
  );
}

export function Field({
  label,
  hint,
  error,
  id: idProp,
  children,
  required,
  className,
}: {
  label?: string;
  hint?: string;
  error?: string;
  id?: string;
  children: ReactNode;
  required?: boolean;
  className?: string;
}) {
  const autoId = useId();
  const id = idProp ?? autoId;

  return (
    <div className={cn(styles.field, className)}>
      {label && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      {children}
      {hint && !error && <p className={styles.fieldHint}>{hint}</p>}
      {error && (
        <span className={styles.fieldError} role="alert">
          <span aria-hidden="true">!</span> {error}
        </span>
      )}
    </div>
  );
}

export function FieldError({ children }: { children: ReactNode }) {
  return (
    <span className={styles.fieldError} role="alert">
      <span aria-hidden="true">!</span> {children}
    </span>
  );
}
