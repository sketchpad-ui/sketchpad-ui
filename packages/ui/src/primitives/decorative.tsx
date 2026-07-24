import { tokens, colorVars, accentColorVarMap, type AccentColor } from '@sketchpad/tokens';
import type { SketchComponentProps } from '../types.js';
import { SketchBorder } from './SketchBorder.js';

interface LineProps extends SketchComponentProps {
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  width?: number;
  height?: number;
}

export function RoughLine({
  x1 = 0,
  y1 = 2,
  x2,
  y2 = 2,
  width = 100,
  height = 6,
  strokeWidth = 3,
}: LineProps) {
  return (
    <svg width={width} height={height} aria-hidden="true">
      <line
        x1={x1}
        y1={y1}
        x2={x2 ?? width}
        y2={y2}
        stroke={colorVars.border}
        strokeWidth={strokeWidth}
        shapeRendering="crispEdges"
      />
    </svg>
  );
}

export function RoughUnderline(props: LineProps) {
  return <RoughLine {...props} />;
}

export function ConnectorLine(props: LineProps) {
  return <RoughLine {...props} y2={props.y2 ?? props.height ?? 40} />;
}

export function SketchArrow({
  width = 24,
  height = 24,
  direction = 'right',
}: LineProps & { direction?: 'right' | 'down' | 'left' }) {
  const rotation = direction === 'down' ? 90 : direction === 'left' ? 180 : 0;
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3 12h16M13 5l7 7-7 7"
        fill="none"
        stroke={colorVars.border}
        strokeWidth="3"
        transform={`rotate(${rotation} 12 12)`}
      />
    </svg>
  );
}

export function MarkerHighlight({
  width = 120,
  height = 24,
  accent = 'yellow',
  className,
  style,
}: SketchComponentProps & { width?: number; height?: number; accent?: AccentColor }) {
  return (
    <span
      className={className}
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width,
        height,
        background: accentColorVarMap[accent],
        border: `2px solid ${colorVars.border}`,
        ...style,
      }}
    />
  );
}

export function CrossHatch({ width = 80, height = 80 }: LineProps) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width,
        height,
        background:
          'repeating-linear-gradient(45deg, transparent 0 8px, var(--sk-colors-border) 8px 10px)',
        opacity: 0.22,
      }}
    />
  );
}

export function ScribbleLine({
  lines = 3,
  width = 100,
}: LineProps & { lines?: number }) {
  return (
    <div style={{ display: 'grid', gap: 6, width }}>
      {Array.from({ length: lines }, (_, index) => (
        <span
          key={index}
          style={{
            display: 'block',
            width: index === lines - 1 ? '72%' : '100%',
            height: 10,
            background: colorVars.pencil,
            border: `2px solid ${colorVars.border}`,
          }}
        />
      ))}
    </div>
  );
}

export function DoodleStar({ pixelSize = 24 }: { pixelSize?: number }) {
  return <span style={{ fontSize: pixelSize }} aria-hidden="true">★</span>;
}

export function PaperTape({ className, style }: SketchComponentProps) {
  return (
    <span
      className={className}
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: 48,
        height: 20,
        background: colorVars.accentYellow,
        border: `2px solid ${colorVars.border}`,
        ...style,
      }}
    />
  );
}

export function FoldedCorner({ size = 24 }: { size?: number }) {
  return (
    <span
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: size,
        height: size,
        background: colorVars.accent,
        borderLeft: `3px solid ${colorVars.border}`,
        borderBottom: `3px solid ${colorVars.border}`,
      }}
    />
  );
}

export function CircleHighlight({ pixelSize = 48 }: { pixelSize?: number; seed?: string | number }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: pixelSize,
        height: pixelSize,
        background: colorVars.accent,
        border: `3px solid ${colorVars.border}`,
        borderRadius: '50%',
      }}
    />
  );
}

export function RoughBox({
  width = 100,
  height = 60,
  children,
  fill = 'paper',
}: SketchComponentProps & { width?: number; height?: number; fill?: 'none' | 'paper' }) {
  return (
    <SketchBorder
      variant="rounded"
      width={width}
      height={height}
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
        margin: 0,
        color: colorVars.textMuted,
        fontFamily: tokens.font.body,
        fontWeight: 700,
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
  className,
}: SketchComponentProps & {
  width?: number;
  height?: number;
  caption?: string;
  showIcon?: boolean;
  skeletonLines?: number;
}) {
  return (
    <figure className={className} style={{ margin: 0 }}>
      <div
        aria-hidden="true"
        style={{
          display: 'grid',
          width,
          height,
          placeItems: 'center',
          color: colorVars.text,
          background:
            'linear-gradient(45deg, transparent 49%, var(--sk-colors-border) 49% 51%, transparent 51%), linear-gradient(-45deg, transparent 49%, var(--sk-colors-border) 49% 51%, transparent 51%), var(--sk-colors-surface)',
          border: `3px solid ${colorVars.border}`,
        }}
      >
        {showIcon ? 'IMG' : null}
      </div>
      {caption && <HandwrittenNote style={{ marginTop: 6 }}>{caption}</HandwrittenNote>}
      {skeletonLines > 0 && <ScribbleLine width={width * 0.8} lines={skeletonLines} />}
    </figure>
  );
}
