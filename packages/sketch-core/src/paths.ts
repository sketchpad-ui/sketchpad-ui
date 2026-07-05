import { createSeededRandom } from './random.js';

export interface SketchPathOptions {
  roughness: number;
  strokeWidth: number;
  seed: number;
  overshoot?: number;
  pressureVariance?: number;
}

export interface SketchPathResult {
  /** Filled ink path (pressure-variable width) */
  fillPath: string;
  /** Centerline path for animations / dash effects */
  centerPath: string;
}

export type ShapeType = 'rect' | 'oval' | 'line';

const pathCache = new Map<string, SketchPathResult>();

export function clearPathCache(): void {
  pathCache.clear();
}

function cacheKey(
  shape: ShapeType,
  args: number[],
  opts: SketchPathOptions,
): string {
  return [shape, ...args, opts.seed, opts.roughness, opts.strokeWidth, opts.overshoot ?? 0.04].join(
    ':',
  );
}

function getCached(
  key: string,
  factory: () => SketchPathResult,
): SketchPathResult {
  const existing = pathCache.get(key);
  if (existing) return existing;
  const result = factory();
  pathCache.set(key, result);
  return result;
}

export function generateRectPath(
  width: number,
  height: number,
  radius: number,
  opts: SketchPathOptions,
): SketchPathResult {
  const w = Math.max(width, 1);
  const h = Math.max(height, 1);
  const r = Math.min(radius, w / 2, h / 2);
  const key = cacheKey('rect', [w, h, r], opts);
  return getCached(key, () => buildRectPath(w, h, r, opts));
}

export function generateOvalPath(
  width: number,
  height: number,
  opts: SketchPathOptions,
): SketchPathResult {
  const w = Math.max(width, 1);
  const h = Math.max(height, 1);
  const key = cacheKey('oval', [w, h], opts);
  return getCached(key, () => buildOvalPath(w, h, opts));
}

export function generateLinePath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  opts: SketchPathOptions,
): SketchPathResult {
  const key = cacheKey('line', [x1, y1, x2, y2], opts);
  return getCached(key, () => buildLinePath(x1, y1, x2, y2, opts));
}

export function generateDoubleStroke(
  generator: () => SketchPathResult,
  seed: number,
): SketchPathResult {
  const primary = generator();
  return primary;
}

interface Point {
  x: number;
  y: number;
}

function buildRectPath(
  width: number,
  height: number,
  radius: number,
  opts: SketchPathOptions,
): SketchPathResult {
  const rand = createSeededRandom(opts.seed);
  const overshoot = opts.overshoot ?? 0.04;
  const maxOffset = opts.roughness * 1.2;

  const corners = roundedRectCorners(width, height, radius);
  const centerPoints = buildWobblyLoop(corners, rand, maxOffset, overshoot);
  return pathsFromCenterline(centerPoints, opts, rand, true);
}

function roundedRectCorners(w: number, h: number, r: number): Point[] {
  if (r <= 0) {
    return [
      { x: 0, y: 0 },
      { x: w, y: 0 },
      { x: w, y: h },
      { x: 0, y: h },
    ];
  }

  const points: Point[] = [];
  const segments = 4;
  const cornerArcs = [
    { cx: w - r, cy: r, start: -Math.PI / 2, end: 0 },
    { cx: w - r, cy: h - r, start: 0, end: Math.PI / 2 },
    { cx: r, cy: h - r, start: Math.PI / 2, end: Math.PI },
    { cx: r, cy: r, start: Math.PI, end: (3 * Math.PI) / 2 },
  ];

  for (const arc of cornerArcs) {
    for (let i = 0; i <= segments; i++) {
      if (i === segments && points.length > 0) continue;
      const t = arc.start + ((arc.end - arc.start) * i) / segments;
      points.push({
        x: arc.cx + r * Math.cos(t),
        y: arc.cy + r * Math.sin(t),
      });
    }
  }
  return points;
}

function buildOvalPath(width: number, height: number, opts: SketchPathOptions): SketchPathResult {
  const rand = createSeededRandom(opts.seed);
  const overshoot = opts.overshoot ?? 0.04;
  const maxOffset = opts.roughness * 1.2;
  const cx = width / 2;
  const cy = height / 2;
  const rx = width / 2;
  const ry = height / 2;
  const segments = Math.max(8, Math.round(opts.roughness * 6));

  const corners: Point[] = [];
  for (let i = 0; i < segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    corners.push({
      x: cx + rx * Math.cos(t),
      y: cy + ry * Math.sin(t),
    });
  }

  const centerPoints = buildWobblyLoop(corners, rand, maxOffset, overshoot * 0.5);
  return pathsFromCenterline(centerPoints, opts, rand, true);
}

function buildLinePath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  opts: SketchPathOptions,
): SketchPathResult {
  const rand = createSeededRandom(opts.seed);
  const maxOffset = opts.roughness * 1.5;
  const segmentCount = Math.max(2, Math.min(4, Math.round(opts.roughness * 2)));

  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;

  const points: Point[] = [{ x: x1, y: y1 }];
  for (let i = 1; i < segmentCount; i++) {
    const t = i / segmentCount;
    const offset = (rand() * 2 - 1) * maxOffset;
    points.push({
      x: x1 + dx * t + nx * offset,
      y: y1 + dy * t + ny * offset,
    });
  }
  points.push({ x: x2, y: y2 });

  const centerPath = quadraticPathThroughPoints(points, rand);
  const fillPath = ribbonFromCenterline(points, opts, rand, false);
  return { fillPath, centerPath };
}

function buildWobblyLoop(
  corners: Point[],
  rand: () => number,
  maxOffset: number,
  overshoot: number,
): Point[] {
  const n = corners.length;
  const result: Point[] = [];

  for (let i = 0; i < n; i++) {
    const curr = corners[i]!;
    const next = corners[(i + 1) % n]!;
    const prev = corners[(i - 1 + n) % n]!;

    const edgeDx = next.x - curr.x;
    const edgeDy = next.y - curr.y;
    const edgeLen = Math.hypot(edgeDx, edgeDy) || 1;
    const nx = -edgeDy / edgeLen;
    const ny = edgeDx / edgeLen;

    const segmentCount = Math.max(2, Math.min(4, Math.round(2 + rand() * 2)));
    const edgePoints: Point[] = [];

    for (let s = 0; s <= segmentCount; s++) {
      if (s === 0 && i > 0) continue;
      const t = s / segmentCount;
      let px = curr.x + edgeDx * t;
      let py = curr.y + edgeDy * t;

      if (s > 0 && s < segmentCount) {
        const offset = (rand() * 2 - 1) * maxOffset;
        px += nx * offset;
        py += ny * offset;
      }

      if (s === segmentCount) {
        const overshootAmt = overshoot * (0.5 + rand() * 0.5) * edgeLen;
        px += (edgeDx / edgeLen) * overshootAmt;
        py += (edgeDy / edgeLen) * overshootAmt;
        const cornerJitter = maxOffset * 0.3 * (rand() * 2 - 1);
        px += -edgeDy / edgeLen * cornerJitter + (next.y - curr.y) * 0.02 * (rand() - 0.5);
        py += edgeDx / edgeLen * cornerJitter + -(next.x - curr.x) * 0.02 * (rand() - 0.5);
        void prev;
      }

      edgePoints.push({ x: px, y: py });
    }

    result.push(...edgePoints);
  }

  return result;
}

function quadraticPathThroughPoints(points: Point[], rand: () => number): string {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0]!.x} ${points[0]!.y}`;

  let d = `M ${points[0]!.x.toFixed(2)} ${points[0]!.y.toFixed(2)}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]!;
    const curr = points[i]!;
    const cpx = (prev.x + curr.x) / 2 + (rand() * 2 - 1) * 0.8;
    const cpy = (prev.y + curr.y) / 2 + (rand() * 2 - 1) * 0.8;
    d += ` Q ${cpx.toFixed(2)} ${cpy.toFixed(2)} ${curr.x.toFixed(2)} ${curr.y.toFixed(2)}`;
  }
  return d;
}

function pathsFromCenterline(
  points: Point[],
  opts: SketchPathOptions,
  rand: () => number,
  closed: boolean,
): SketchPathResult {
  const centerPath = closed
    ? quadraticPathThroughPoints(points, rand) + ' Z'
    : quadraticPathThroughPoints(points, rand);
  const fillPath = ribbonFromCenterline(points, opts, rand, closed);
  return { fillPath, centerPath };
}

function ribbonFromCenterline(
  points: Point[],
  opts: SketchPathOptions,
  rand: () => number,
  closed: boolean,
): string {
  const pressureVariance = opts.pressureVariance ?? 0.3;
  const baseHalf = opts.strokeWidth / 2;
  const outer: Point[] = [];
  const inner: Point[] = [];

  const n = points.length;
  for (let i = 0; i < n; i++) {
    const curr = points[i]!;
    const prev = points[i === 0 ? (closed ? n - 1 : i) : i - 1]!;
    const next = points[i === n - 1 ? (closed ? 0 : i) : i + 1]!;

    let tx: number;
    let ty: number;
    if (i === 0 && !closed) {
      tx = next.x - curr.x;
      ty = next.y - curr.y;
    } else if (i === n - 1 && !closed) {
      tx = curr.x - prev.x;
      ty = curr.y - prev.y;
    } else {
      tx = next.x - prev.x;
      ty = next.y - prev.y;
    }

    const len = Math.hypot(tx, ty) || 1;
    const nx = -ty / len;
    const ny = tx / len;

    const cornerFactor = i === 0 || i === n - 1 ? 1 + pressureVariance * 0.5 : 1;
    const pressure = baseHalf * cornerFactor * (1 + (rand() * 2 - 1) * pressureVariance * 0.3);

    outer.push({ x: curr.x + nx * pressure, y: curr.y + ny * pressure });
    inner.push({ x: curr.x - nx * pressure, y: curr.y - ny * pressure });
  }

  let d = `M ${outer[0]!.x.toFixed(2)} ${outer[0]!.y.toFixed(2)}`;
  for (let i = 1; i < outer.length; i++) {
    d += ` L ${outer[i]!.x.toFixed(2)} ${outer[i]!.y.toFixed(2)}`;
  }
  for (let i = inner.length - 1; i >= 0; i--) {
    d += ` L ${inner[i]!.x.toFixed(2)} ${inner[i]!.y.toFixed(2)}`;
  }
  d += ' Z';
  return d;
}

export function generateTornRectPath(
  width: number,
  height: number,
  opts: SketchPathOptions,
): SketchPathResult {
  const rand = createSeededRandom(opts.seed + 99);
  const w = Math.max(width, 1);
  const h = Math.max(height, 1);
  const maxOffset = opts.roughness * 2;

  const corners: Point[] = [
    { x: rand() * maxOffset, y: rand() * maxOffset },
    { x: w - rand() * maxOffset, y: rand() * maxOffset * 0.8 },
    { x: w - rand() * maxOffset * 0.6, y: h - rand() * maxOffset },
    { x: rand() * maxOffset * 0.5, y: h - rand() * maxOffset * 0.7 },
  ];

  const centerPoints = buildWobblyLoop(corners, rand, maxOffset * 0.5, opts.overshoot ?? 0.04);
  return pathsFromCenterline(centerPoints, opts, rand, true);
}

export function generateUnderlinePath(
  width: number,
  y: number,
  opts: SketchPathOptions,
): SketchPathResult {
  return generateLinePath(0, y, width, y + opts.roughness * 0.3, opts);
}
