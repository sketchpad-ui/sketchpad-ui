'use client';

import type { ReactNode } from 'react';
import { tokens } from '@sketchpad/tokens';
import { SketchBorder } from '../../primitives/SketchBorder.js';
import type { SketchComponentProps } from '../../types.js';
import { cn } from '../../utils.js';
import styles from './Feedback.module.css';

type AlertVariant = 'default' | 'info' | 'success' | 'warning' | 'destructive';

const alertIcons: Record<AlertVariant, string> = {
  default: 'i',
  info: 'i',
  success: '✓',
  warning: '!',
  destructive: '!',
};

export interface AlertProps extends SketchComponentProps {
  variant?: AlertVariant;
  title?: string;
  children?: ReactNode;
}

export function Alert({
  variant = 'default',
  title,
  children,
  seed = 'alert',
  roughness,
  strokeWidth,
  className,
  style,
}: AlertProps) {
  return (
    <SketchBorder
      variant="rounded"
      seed={seed}
      fill="paperAlt"
      roughness={roughness ?? tokens.roughness.subtle}
      strokeWidth={strokeWidth ?? tokens.stroke.thin}
      className={cn(styles.alert, className)}
      style={style}
    >
      <div role="alert" className={styles.alertInner}>
        <span className={styles.alertIcon} aria-hidden="true">
          {alertIcons[variant]}
        </span>
        <div className={styles.alertBody}>
          {title && <p className={styles.alertTitle}>{title}</p>}
          {children && <p className={styles.alertText}>{children}</p>}
        </div>
      </div>
    </SketchBorder>
  );
}

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export function Spinner({ size = 'md', label = 'Loading', className }: SpinnerProps) {
  const dim = size === 'sm' ? 18 : size === 'lg' ? 40 : 28;
  const r = dim / 2 - 2;

  return (
    <span
      className={cn(styles.spinner, size === 'sm' && styles.spinnerSm, size === 'md' && styles.spinnerMd, size === 'lg' && styles.spinnerLg, className)}
      role="status"
      aria-label={label}
    >
      <svg width={dim} height={dim} viewBox={`0 0 ${dim} ${dim}`} aria-hidden="true">
        <circle
          className={styles.spinnerArc}
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          strokeDasharray={`${r * 2.4} ${r * 4}`}
        />
      </svg>
    </span>
  );
}
