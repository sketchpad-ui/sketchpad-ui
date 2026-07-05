'use client';

import { type ReactNode } from 'react';
import { Button } from './Button.js';
import { cn } from '../../utils.js';
import styles from './ButtonGroup.module.css';

export function ToggleButton({
  pressed,
  onPressedChange,
  children,
  className,
  disabled,
}: {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <Button
      variant={pressed ? 'filled' : 'ghost'}
      className={cn(styles.btn, pressed && styles.btnActive, className)}
      aria-pressed={pressed}
      disabled={disabled}
      onClick={() => onPressedChange?.(!pressed)}
    >
      {children}
    </Button>
  );
}
