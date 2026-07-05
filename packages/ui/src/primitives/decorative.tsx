'use client';

import { useMemo } from 'react';
import { tokens } from '@sketchpad/tokens';
import {
  generateLinePath,
  generateOvalPath,
  generateRectPath,
  resolveSeed,
} from '@sketchpad/sketch-core';
import type { SketchComponentProps } from '../types.js';
import { SketchBorder, SketchSvg } from './SketchBorder.js';
import { deriveSeed } from '../utils.js';

interface LineProps extends SketchComponentProps {
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  width?: number;
  height?: number;
}

function useLinePath(props: LineProps) {
  const { x1 = 0, y1 = 0, x2, y2 = 0, width = 100, roughness, strokeWidth, seed } = props;
  const endX = x2 ?? width;
  const seedStr = deriveSeed(seed, 'line', endX, y2);
  return useMemo(
    () =>
      generateLinePath(x1, y1, endX, y2, {
        roughness: roughness ?? tokens.roughness.medium,
        strokeWidth: strokeWidth ?? tokens.stroke.medium,
        seed: resolveSeed(seedStr, seedStr),
      }),
    [x1, y1, endX, y2, roughness, strokeWidth, seedStr],
  );
}

export function RoughLine(props: LineProps) {
  const width = props.width ?? 100;
  const height = (props.strokeWidth ?? tokens.stroke.medium) * 4;
  const path = useLinePath(props);
  return <SketchSvg width={width} height={height} path={path} />;
}

export function RoughUnderline(props: LineProps) {
  return <RoughLine {...props} y2={(props.y2 ?? 0) + 2} />;
}

export function SketchArrow(
  props: LineProps & { direction?: 'right' | 'down' | 'left' },
) {
  const width = props.width ?? 24;
  const height = props.height ?? 24;
  const direction = props.direction ?? 'right';
  const coords = {
    right: { x1: 2, y1: height / 2, x2: width - 6, y2: height / 2 },
    down: { x1: width / 2, y1: 2, x2: width / 2, y2: height - 6 },
    left: { x1: width - 2, y1: height / 2, x2: 6, y2: height / 2 },
  }[direction];
  const path = useLinePath({ ...props, ...coords, width, height });
  const headSize = 5;
  const head =
    direction === 'right'
      ? `M ${width - 6} ${height / 2 - headSize} L ${width - 2} ${height / 2} L ${width - 6} ${height / 2 + headSize}`
      : direction === 'down'
        ? `M ${width / 2 - headSize} ${height - 6} L ${width / 2} ${height - 2} L ${width / 2 + headSize} ${height - 6}`
        : `M 6 ${height / 2 - headSize} L 2 ${height / 2} L 6 ${height / 2 + headSize}`;

  return (
    <svg width={width} height={height} aria-hidden="true">
      <path d={path.fillPath} fill={tokens.colors.ink} />
      <path d={head} fill="none" stroke={tokens.colors.ink} strokeWidth={1.2} />
    </svg>
  );
}

export function ConnectorLine(props: LineProps) {
  return <RoughLine {...props} y2={props.y2 ?? (props.height ?? 40)} />;
}

export function MarkerHighlight({
  width = 120,
  height = 24,
  accent = 'yellow',
  className,
  style,
}: SketchComponentProps & { width?: number; height?: number }) {
  const colorKey = `accent${accent.charAt(0).toUpperCase()}${accent.slice(1)}` as keyof typeof tokens.colors;
  const color = tokens.colors[colorKey];
  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        width,
        height,
        background: color,
        opacity: 0.55,
        borderRadius: 2,
        transform: 'rotate(-0.5deg)',
        ...style,
      }}
      aria-hidden="true"
    />
  );
}

export function CrossHatch({
  width = 80,
  height = 80,
  seed = 'crosshatch',
  roughness,
  strokeWidth,
}: SketchComponentProps & { width?: number; height?: number }) {
  const lines = [];
  const step = 12;
  for (let i = -height; i < width + height; i += step) {
    lines.push(
      <RoughLine
        key={`a-${i}`}
        x1={i}
        y1={0}
        x2={i + height}
        y2={height}
        width={width}
        seed={`${seed}-a-${i}`}
        roughness={roughness}
        strokeWidth={strokeWidth ?? tokens.stroke.thin}
      />,
    );
  }
  return (
    <svg width={width} height={height} aria-hidden="true" style={{ opacity: 0.25 }}>
      {lines.slice(0, 6)}
    </svg>
  );
}

export function ScribbleLine(props: LineProps & { lines?: number }) {
  const count = props.lines ?? 3;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {Array.from({ length: count }, (_, i) => (
        <RoughLine
          key={i}
          {...props}
          seed={`${props.seed ?? 'scribble'}-${i}`}
          y2={(props.y2 ?? 0) + i * 2}
        />
      ))}
    </div>
  );
}

export function DoodleStar({ pixelSize = 24 }: { pixelSize?: number }) {
  return (
    <svg width={pixelSize} height={pixelSize} aria-hidden="true">
      <text x={pixelSize / 2} y={pixelSize / 2 + 4} textAnchor="middle" fontSize={12} fill={tokens.colors.ink}>
        ★
      </text>
    </svg>
  );
}

export function PaperTape({ className, style }: SketchComponentProps) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        width: 48,
        height: 20,
        background: 'rgba(246, 217, 107, 0.5)',
        transform: 'rotate(-2deg)',
        border: `1px solid ${tokens.colors.pencil}`,
        opacity: 0.8,
        ...style,
      }}
    />
  );
}

export function FoldedCorner({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} aria-hidden="true" style={{ position: 'absolute', top: 0, right: 0 }}>
      <path
        d={`M ${size} 0 L ${size} ${size} L 0 0 Z`}
        fill={tokens.colors.paperAlt}
        stroke={tokens.colors.pencil}
        strokeWidth={0.8}
      />
    </svg>
  );
}

export function CircleHighlight({
  pixelSize = 48,
  seed = 'circle-hl',
}: {
  pixelSize?: number;
  seed?: string | number;
}) {
  const path = generateOvalPath(pixelSize, pixelSize, {
    roughness: tokens.roughness.medium,
    strokeWidth: tokens.stroke.medium,
    seed: resolveSeed(seed, 'circle-hl'),
  });
  return <SketchSvg width={pixelSize} height={pixelSize} path={path} fill={tokens.colors.accentYellow} />;
}

export function RoughBox({
  width = 100,
  height = 60,
  children,
  seed,
  roughness,
  strokeWidth,
  fill = 'paper',
}: SketchComponentProps & { width?: number; height?: number; fill?: 'none' | 'paper' }) {
  return (
    <SketchBorder
      variant="rounded"
      width={width}
      height={height}
      seed={seed}
      roughness={roughness}
      strokeWidth={strokeWidth}
      fill={fill}
    >
      <div style={{ padding: 8, width, height }}>{children}</div>
    </SketchBorder>
  );
}

export function HandwrittenNote({ children, className, style }: SketchComponentProps) {
  return (
    <p
      className={className}
      style={{
        fontFamily: tokens.font.annotation,
        fontSize: '0.95rem',
        color: tokens.colors.inkSoft,
        margin: 0,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

export function ImagePlaceholder({
  width = 320,
  height = 200,
  caption,
  showIcon,
  skeletonLines = 0,
  seed = 'image-ph',
  className,
}: SketchComponentProps & {
  width?: number;
  height?: number;
  caption?: string;
  showIcon?: boolean;
  skeletonLines?: number;
}) {
  const frame = generateRectPath(width, height, tokens.radii.sketchSm, {
    roughness: tokens.roughness.medium,
    strokeWidth: tokens.stroke.medium,
    seed: resolveSeed(seed, 'frame'),
  });
  const diag1 = generateLinePath(8, 8, width - 8, height - 8, {
    roughness: tokens.roughness.low,
    strokeWidth: tokens.stroke.thin,
    seed: resolveSeed(`${seed}-d1`, 'd1'),
  });
  const diag2 = generateLinePath(width - 8, 8, 8, height - 8, {
    roughness: tokens.roughness.low,
    strokeWidth: tokens.stroke.thin,
    seed: resolveSeed(`${seed}-d2`, 'd2'),
  });

  return (
    <figure className={className} style={{ margin: 0 }}>
      <svg width={width} height={height} aria-hidden="true">
        <path d={frame.fillPath} fill={tokens.colors.paperAlt} />
        <path d={frame.fillPath} fill={tokens.colors.ink} opacity={0.9} />
        <path d={diag1.fillPath} fill={tokens.colors.pencil} opacity={0.5} />
        <path d={diag2.fillPath} fill={tokens.colors.pencil} opacity={0.5} />
        {showIcon && (
          <text x={width - 20} y={20} fontSize={12} fill={tokens.colors.pencil}>
            img
          </text>
        )}
      </svg>
      {caption && <HandwrittenNote style={{ marginTop: 4 }}>{caption}</HandwrittenNote>}
      {skeletonLines > 0 && (
        <ScribbleLine width={width * 0.8} lines={skeletonLines} seed={`${seed}-skel`} />
      )}
    </figure>
  );
}
