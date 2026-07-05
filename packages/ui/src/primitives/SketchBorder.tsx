'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from 'react';
import { tokens, accentColorVarMap, colorVars, type AccentColor } from '@sketchpad/tokens';
import {
  generateRectPath,
  generateOvalPath,
  generateTornRectPath,
  generateUnderlinePath,
  generateInteriorPath,
  resolveSeed,
  type SketchPathResult,
} from '@sketchpad/sketch-core';
import type { SketchBorderProps, SketchFill } from '../types.js';
import {
  cn,
  debounce,
  deriveSeed,
  getEffectiveRoughness,
  getEffectiveStroke,
  scaleRoughnessForSize,
} from '../utils.js';
import styles from './SketchBorder.module.css';

const DEFAULT_ROUGHNESS = tokens.roughness.low;
const DEFAULT_STROKE = tokens.stroke.thin;

function getFillColor(fill: SketchFill, accent?: AccentColor): string | 'none' {
  switch (fill) {
    case 'paper':
      return colorVars.paper;
    case 'paperAlt':
      return colorVars.paperAlt;
    case 'solid':
      return colorVars.paperBright;
    case 'paperBright':
      return colorVars.paperBright;
    case 'accent':
      return accent ? accentColorVarMap[accent] : colorVars.accentYellow;
    default:
      return 'none';
  }
}

function generatePathForVariant(
  variant: NonNullable<SketchBorderProps['variant']>,
  width: number,
  height: number,
  radius: number,
  seed: number,
  roughness: number,
  strokeWidth: number,
): SketchPathResult {
  const opts = { roughness, strokeWidth, seed };
  switch (variant) {
    case 'oval':
      return generateOvalPath(width, height, opts);
    case 'torn':
      return generateTornRectPath(width, height, opts);
    case 'underline':
      return generateUnderlinePath(width, height - 4, { ...opts, seed });
    case 'rounded':
      return generateRectPath(width, height, radius, opts);
    case 'rect':
    default:
      return generateRectPath(width, height, 0, opts);
  }
}

function interiorVariant(variant: NonNullable<SketchBorderProps['variant']>): 'rect' | 'rounded' | 'oval' {
  if (variant === 'oval') return 'oval';
  if (variant === 'rect') return 'rect';
  return 'rounded';
}

/** Host elements that only allow phrasing content (no nested divs). */
const PHRASING_HOSTS = new Set([
  'kbd',
  'code',
  'span',
  'a',
  'label',
  'button',
  'abbr',
  'b',
  'cite',
  'em',
  'i',
  'mark',
  'q',
  's',
  'small',
  'strong',
  'sub',
  'sup',
  'time',
  'u',
  'var',
]);

function usesPhrasingContentModel(as: ElementType | undefined): boolean {
  if (typeof as !== 'string') return false;
  return PHRASING_HOSTS.has(as);
}

export function SketchBorder({
  as,
  variant = 'rounded',
  roughness = DEFAULT_ROUGHNESS,
  strokeWidth = DEFAULT_STROKE,
  seed,
  doubleStroke = false,
  fill = 'none',
  width: widthProp,
  height: heightProp,
  radius = tokens.radii.sketchMd,
  accent,
  className,
  children,
  style,
  strokeOpacity = 1,
}: SketchBorderProps) {
  const Component = (as ?? 'div') as ElementType;
  const ContentTag = usesPhrasingContentModel(as ?? 'div') ? 'span' : 'div';
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: widthProp ?? 100, height: heightProp ?? 40 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${tokens.breakpoint.mobile}px)`);
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const measure = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      setSize({ width: rect.width, height: rect.height });
    }
  }, []);

  const debouncedMeasure = useMemo(() => debounce(measure, 16), [measure]);

  useEffect(() => {
    if (widthProp !== undefined && heightProp !== undefined) {
      setSize({ width: widthProp, height: heightProp });
      return;
    }
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;

    measure();
    const ro = new ResizeObserver(() => debouncedMeasure());
    ro.observe(el);
    return () => ro.disconnect();
  }, [widthProp, heightProp, measure, debouncedMeasure]);

  const effectiveRoughness = scaleRoughnessForSize(
    getEffectiveRoughness(roughness, isMobile),
    size.width,
    size.height,
  );
  const effectiveStroke = getEffectiveStroke(strokeWidth, isMobile);
  const seedStr = deriveSeed(seed, 'sketch-border', size.width, size.height);
  const seedNum = resolveSeed(seedStr, seedStr);

  const paths = useMemo(() => {
    const primary = generatePathForVariant(
      variant,
      size.width,
      size.height,
      radius,
      seedNum,
      effectiveRoughness,
      effectiveStroke,
    );
    if (!doubleStroke) return { primary, secondary: null };
    const secondary = generatePathForVariant(
      variant,
      size.width,
      size.height,
      radius,
      seedNum + 1,
      effectiveRoughness,
      effectiveStroke,
    );
    return { primary, secondary };
  }, [
    variant,
    size.width,
    size.height,
    radius,
    seedNum,
    effectiveRoughness,
    effectiveStroke,
    doubleStroke,
  ]);

  const fillColor = getFillColor(fill, accent);
  const interiorInset = Math.max(effectiveStroke * 0.6, 0.5);

  const interiorPath = useMemo(() => {
    if (fillColor === 'none' || variant === 'underline') return null;
    return generateInteriorPath(
      size.width,
      size.height,
      radius,
      interiorInset,
      interiorVariant(variant),
    );
  }, [fillColor, variant, size.width, size.height, radius, interiorInset]);

  const inkStroke = {
    fill: 'none' as const,
    stroke: colorVars.ink,
    strokeWidth: effectiveStroke,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    vectorEffect: 'nonScalingStroke' as const,
  };

  return (
    <Component
      ref={containerRef}
      className={cn(
        styles.sketchBorder,
        variant === 'underline' && styles.underline,
        className,
      )}
      style={style}
    >
      <svg
        className={styles.svgLayer}
        viewBox={`0 0 ${size.width} ${size.height}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {interiorPath && <path d={interiorPath} fill={fillColor} stroke="none" />}
        <path
          d={paths.primary.centerPath}
          {...inkStroke}
          strokeOpacity={strokeOpacity}
        />
        {paths.secondary && (
          <path
            d={paths.secondary.centerPath}
            {...inkStroke}
            strokeOpacity={strokeOpacity * 0.35}
          />
        )}
      </svg>
      <ContentTag className={styles.content}>{children}</ContentTag>
    </Component>
  );
}

export interface SketchSvgProps {
  width: number;
  height: number;
  path: SketchPathResult;
  fill?: string;
  className?: string;
  children?: ReactNode;
}

export function SketchSvg({ width, height, path, fill = 'none', className, children }: SketchSvgProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden="true"
    >
      {fill !== 'none' && <path d={path.centerPath} fill={fill} stroke="none" />}
      <path
        d={path.centerPath}
        fill="none"
        stroke={colorVars.ink}
        strokeWidth={tokens.stroke.thin}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {children}
    </svg>
  );
}
