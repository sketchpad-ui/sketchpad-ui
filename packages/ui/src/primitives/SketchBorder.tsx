import type { CSSProperties, ElementType, ReactNode } from 'react';
import { accentColorVarMap, colorVars, type AccentColor } from '@sketchpad/tokens';
import type { SketchBorderProps, SketchFill } from '../types.js';
import { cn } from '../utils.js';
import styles from './SketchBorder.module.css';

function fillColor(fill: SketchFill, accent?: AccentColor): string {
  if (fill === 'accent') return accent ? accentColorVarMap[accent] : colorVars.accent;
  if (fill === 'paperBright' || fill === 'solid') return colorVars.surfaceRaised;
  if (fill === 'paperAlt') return colorVars.surface;
  if (fill === 'paper') return colorVars.canvas;
  return 'transparent';
}

/**
 * Compatibility name for the former sketch-path primitive.
 *
 * It now renders a deterministic Neubrutalist surface: uniform border, small
 * radius, and hard offset shadow. Seed/roughness options are intentionally
 * ignored and remain only to ease migration from the pre-1.0 package.
 */
export function SketchBorder({
  as,
  variant = 'rounded',
  fill = 'none',
  accent,
  className,
  children,
  style,
  width,
  height,
  radius,
  strokeWidth,
}: SketchBorderProps) {
  const Component = (as ?? 'div') as ElementType;
  const customStyle = {
    ...style,
    width: width ?? style?.width,
    height: height ?? style?.height,
    '--sk-surface-fill': fillColor(fill, accent),
    '--sk-surface-radius':
      variant === 'oval' ? '999px' : variant === 'rect' ? '0px' : `${radius ?? 4}px`,
    '--sk-surface-border': `${strokeWidth ?? 3}px`,
  } as CSSProperties;

  return (
    <Component
      className={cn(
        styles.surface,
        fill !== 'none' && styles.filled,
        variant === 'underline' && styles.underline,
        className,
      )}
      style={customStyle}
    >
      {children}
    </Component>
  );
}

export interface SketchSvgProps {
  width: number;
  height: number;
  path: { centerPath: string };
  fill?: string;
  className?: string;
  children?: ReactNode;
}

/** @deprecated Prefer an icon slot or a CSS shape in new components. */
export function SketchSvg({
  width,
  height,
  path,
  fill = 'none',
  className,
  children,
}: SketchSvgProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden="true"
    >
      <path
        d={path.centerPath}
        fill={fill}
        stroke={colorVars.border}
        strokeWidth={2}
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {children}
    </svg>
  );
}
