import type { ReactNode, CSSProperties, ElementType } from 'react';
import type { AccentColor } from '@sketchpad/tokens';

export interface SketchComponentProps {
  className?: string;
  children?: ReactNode;
  seed?: string | number;
  roughness?: number;
  strokeWidth?: number;
  accent?: AccentColor;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  style?: CSSProperties;
}

export type SketchBorderVariant = 'rect' | 'rounded' | 'oval' | 'torn' | 'underline';
export type SketchFill = 'none' | 'paper' | 'paperAlt' | 'paperBright' | 'solid' | 'accent';

export interface SketchBorderProps extends SketchComponentProps {
  as?: ElementType;
  variant?: SketchBorderVariant;
  doubleStroke?: boolean;
  fill?: SketchFill;
  width?: number;
  height?: number;
  radius?: number;
  /** Ink opacity for the border stroke (0–1). Default 1. */
  strokeOpacity?: number;
}

export interface PolymorphicProps<T extends ElementType = 'div'> {
  as?: T;
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
}
