import { tokens } from '@sketchpad/tokens';

let instanceCounter = 0;

export function deriveSeed(
  seed: string | number | undefined,
  prefix: string,
  width?: number,
  height?: number,
): string {
  if (seed !== undefined) return String(seed);
  instanceCounter += 1;
  return `${prefix}-${width ?? 0}x${height ?? 0}-${instanceCounter}`;
}

export function useReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useIsMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(`(max-width: ${tokens.breakpoint.mobile}px)`).matches;
}

export function getEffectiveRoughness(roughness: number, isMobile: boolean): number {
  const base = isMobile ? roughness * 0.75 : roughness;
  return base;
}

/** Large surfaces need less wobble to stay legible at production sizes. */
export function scaleRoughnessForSize(roughness: number, width: number, height: number): number {
  const perimeter = 2 * (width + height);
  const area = width * height;
  if (perimeter > 700 || area > 50000) return roughness * 0.5;
  if (perimeter > 400 || area > 20000) return roughness * 0.68;
  if (perimeter > 250 || area > 8000) return roughness * 0.82;
  return roughness;
}

export function getEffectiveStroke(strokeWidth: number, isMobile: boolean): number {
  return isMobile ? strokeWidth * 0.85 : strokeWidth;
}

export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function debounce<T extends (...args: never[]) => void>(
  fn: T,
  ms: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}
