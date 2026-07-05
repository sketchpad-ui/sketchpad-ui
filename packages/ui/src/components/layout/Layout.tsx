'use client';

import type { CSSProperties, ReactNode } from 'react';
import { tokens, colorVars } from '@sketchpad/tokens';
import { SketchBorder } from '../../primitives/SketchBorder.js';
import { FoldedCorner, PaperTape } from '../../primitives/decorative.js';
import { RoughLine } from '../../primitives/decorative.js';
import { cn } from '../../utils.js';
import styles from './Layout.module.css';

export function Container({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={cn(styles.container, className)} style={style}>
      {children}
    </div>
  );
}

export function Stack({
  children,
  gap = 16,
  className,
  style,
}: {
  children: ReactNode;
  gap?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={cn(styles.stack, className)} style={{ gap, ...style }}>
      {children}
    </div>
  );
}

export function Grid({
  children,
  columns = 3,
  gap = 16,
  className,
}: {
  children: ReactNode;
  columns?: number;
  gap?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(styles.grid, className)}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap }}
    >
      {children}
    </div>
  );
}

export function Paper({
  children,
  foldedCorner,
  tapePinned,
  seed = 'paper',
  className,
  style,
}: {
  children: ReactNode;
  foldedCorner?: boolean;
  tapePinned?: boolean;
  seed?: string | number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <SketchBorder variant="rounded" seed={seed} fill="paper" className={cn(styles.paper, className)} style={style}>
      {foldedCorner && <FoldedCorner />}
      {tapePinned && (
        <div className="sk-hide-mobile" style={{ position: 'absolute', top: -8, left: '50%' }}>
          <PaperTape />
        </div>
      )}
      {children}
    </SketchBorder>
  );
}

export function Divider({
  variant = 'solid',
  width = '100%',
  seed = 'divider',
}: {
  variant?: 'solid' | 'dashed' | 'double';
  width?: number | string;
  seed?: string | number;
}) {
  const w = typeof width === 'number' ? width : 400;
  return (
    <div className={styles.divider} style={{ width }} aria-hidden="true">
      {variant === 'double' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <RoughLine width={w} seed={`${seed}-1`} />
          <RoughLine width={w} seed={`${seed}-2`} />
        </div>
      ) : (
        <RoughLine
          width={w}
          seed={seed}
          strokeWidth={variant === 'dashed' ? tokens.stroke.thin : tokens.stroke.medium}
        />
      )}
    </div>
  );
}

function DeviceFrame({
  children,
  seed,
  variant,
  width,
  height,
}: {
  children: ReactNode;
  seed: string;
  variant: 'browser' | 'phone' | 'window';
  width: number;
  height: number;
}) {
  return (
    <SketchBorder variant="rounded" seed={seed} fill="paper" className={styles.frame} style={{ width, maxWidth: '100%' }}>
      <div className={styles.frameBar} aria-hidden="true">
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
        {variant === 'browser' && (
          <span style={{ marginLeft: 8, fontSize: '0.75rem', color: colorVars.pencil }}>
            sketchpad.dev
          </span>
        )}
      </div>
      <SketchBorder variant="rounded" seed={`${seed}-inner`} fill="paperBright" className={styles.frameContent} style={{ minHeight: height }}>
        {children}
      </SketchBorder>
    </SketchBorder>
  );
}

export function BrowserMockup(props: { children: ReactNode; width?: number; height?: number }) {
  return (
    <DeviceFrame {...props} seed="browser" variant="browser" width={props.width ?? 640} height={props.height ?? 360} />
  );
}

export function PhoneMockup(props: { children: ReactNode; width?: number; height?: number }) {
  return (
    <DeviceFrame {...props} seed="phone" variant="phone" width={props.width ?? 280} height={props.height ?? 480} />
  );
}

export function WindowMockup(props: { children: ReactNode; width?: number; height?: number }) {
  return (
    <DeviceFrame {...props} seed="window" variant="window" width={props.width ?? 480} height={props.height ?? 320} />
  );
}

export const Frame = BrowserMockup;
