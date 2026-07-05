'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { tokens, colorVars } from '@sketchpad/tokens';
import { SketchBorder } from '../../primitives/SketchBorder.js';
import type { SketchComponentProps } from '../../types.js';
import { cn } from '../../utils.js';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'filled' | 'accent' | 'ghost' | 'link' | 'icon';

export interface ButtonProps
  extends SketchComponentProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  children?: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  disabled,
  seed,
  roughness,
  strokeWidth,
  accent = 'yellow',
  className,
  children,
  fullWidth,
  ...rest
}: ButtonProps) {
  const isGhost = variant === 'ghost' || variant === 'link';
  const fill = variant === 'filled' || variant === 'accent' ? 'accent' : variant === 'primary' ? 'paper' : 'none';

  return (
    <SketchBorder
      as="div"
      variant={variant === 'icon' ? 'oval' : 'rounded'}
      seed={seed ?? `button-${variant}`}
      roughness={roughness}
      strokeWidth={strokeWidth ?? (disabled ? tokens.stroke.thin : tokens.stroke.medium)}
      fill={isGhost ? 'none' : fill}
      accent={variant === 'accent' ? accent : undefined}
      className={cn(fullWidth && styles.fullWidth, className)}
    >
      {!isGhost && !disabled && <span className={styles.shadow} aria-hidden="true" />}
      <button
        type="button"
        className={cn(
          styles.button,
          size === 'sm' && styles.sm,
          size === 'lg' && styles.lg,
          variant === 'ghost' && styles.ghost,
          variant === 'link' && styles.link,
        )}
        disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    </SketchBorder>
  );
}

export function IconButton({
  children,
  'aria-label': ariaLabel,
  ...props
}: ButtonProps) {
  return (
    <Button variant="icon" size="sm" aria-label={ariaLabel} {...props}>
      {children}
    </Button>
  );
}

export interface BadgeProps extends SketchComponentProps {
  variant?: 'default' | 'stamp' | 'marker';
  children?: ReactNode;
}

export function Badge({
  variant = 'default',
  children,
  seed,
  roughness,
  strokeWidth,
  accent = 'blue',
  className,
  style,
}: BadgeProps) {
  const stampStyle =
    variant === 'stamp'
      ? { transform: 'rotate(-2deg)' as const }
      : variant === 'marker'
        ? { padding: '4px 10px' }
        : {};

  return (
    <SketchBorder
      variant="oval"
      seed={seed ?? `badge-${variant}`}
      roughness={roughness}
      strokeWidth={strokeWidth ?? tokens.stroke.medium}
      doubleStroke={variant === 'stamp'}
      fill={variant === 'marker' ? 'accent' : 'paper'}
      accent={accent}
      className={className}
      style={{ ...stampStyle, ...style, display: 'inline-block' }}
    >
      <span
        className={cn(variant === 'marker' && styles.badgeMarker)}
        style={{ padding: '4px 12px', fontSize: '0.8rem', display: 'inline-block' }}
      >
        {children}
      </span>
    </SketchBorder>
  );
}

export function Avatar({
  src,
  alt = '',
  pixelSize = 48,
  seed = 'avatar',
  placeholder,
}: SketchComponentProps & {
  src?: string;
  alt?: string;
  pixelSize?: number;
  placeholder?: boolean;
}) {
  return (
    <SketchBorder
      variant="oval"
      seed={seed}
      width={pixelSize}
      height={pixelSize}
      fill="paper"
      style={{ width: pixelSize, height: pixelSize, overflow: 'hidden' }}
    >
      <div
        style={{
          width: pixelSize,
          height: pixelSize,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {src && !placeholder ? (
          <img src={src} alt={alt} width={pixelSize} height={pixelSize} style={{ objectFit: 'cover' }} />
        ) : (
          <svg width={pixelSize} height={pixelSize} aria-hidden="true">
            <line x1={4} y1={4} x2={pixelSize - 4} y2={pixelSize - 4} stroke={colorVars.pencil} />
            <line x1={pixelSize - 4} y1={4} x2={4} y2={pixelSize - 4} stroke={colorVars.pencil} />
          </svg>
        )}
      </div>
    </SketchBorder>
  );
}
