'use client';

import { useRef, useState, type ReactNode } from 'react';
import { SketchBorder } from '../../primitives/SketchBorder.js';
import { cn } from '../../utils.js';
import styles from './Display.module.css';

export function Carousel({
  slides,
  seed = 'carousel',
}: {
  slides: ReactNode[];
  seed?: string | number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const scrollTo = (i: number) => {
    const next = Math.max(0, Math.min(slides.length - 1, i));
    setIndex(next);
    trackRef.current?.scrollTo({ left: next * trackRef.current.clientWidth, behavior: 'smooth' });
  };

  return (
    <SketchBorder variant="rounded" seed={seed} fill="paper" className={styles.carousel}>
      <button type="button" className={cn(styles.carouselNav, styles.carouselPrev)} aria-label="Previous slide" onClick={() => scrollTo(index - 1)}>
        ‹
      </button>
      <div ref={trackRef} className={styles.carouselTrack}>
        {slides.map((slide, i) => (
          <div key={i} className={styles.carouselSlide}>
            {slide}
          </div>
        ))}
      </div>
      <button type="button" className={cn(styles.carouselNav, styles.carouselNext)} aria-label="Next slide" onClick={() => scrollTo(index + 1)}>
        ›
      </button>
    </SketchBorder>
  );
}

export interface ChartPoint {
  label: string;
  value: number;
}

export function Chart({
  data,
  type = 'bar',
  seed = 'chart',
  height = 180,
}: {
  data: ChartPoint[];
  type?: 'bar' | 'line';
  seed?: string | number;
  height?: number;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const width = 320;
  const pad = 24;
  const innerW = width - pad * 2;
  const innerH = height - pad * 2;

  return (
    <SketchBorder variant="rounded" seed={seed} fill="paper" className={styles.chartWrap}>
      <svg viewBox={`0 0 ${width} ${height}`} className={styles.chartSvg} role="img" aria-label="Chart">
        <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} className={styles.chartAxis} />
        <line x1={pad} y1={pad} x2={pad} y2={height - pad} className={styles.chartAxis} />
        {type === 'bar' &&
          data.map((point, i) => {
            const barW = innerW / data.length - 8;
            const x = pad + i * (innerW / data.length) + 4;
            const h = (point.value / max) * innerH;
            const y = height - pad - h;
            return (
              <g key={point.label}>
                <rect x={x} y={y} width={barW} height={h} className={styles.chartBar} />
                <text x={x + barW / 2} y={height - 6} textAnchor="middle" className={styles.chartLabel}>
                  {point.label}
                </text>
              </g>
            );
          })}
        {type === 'line' && (
          <polyline
            className={styles.chartLine}
            points={data
              .map((point, i) => {
                const x = pad + (i / Math.max(data.length - 1, 1)) * innerW;
                const y = height - pad - (point.value / max) * innerH;
                return `${x},${y}`;
              })
              .join(' ')}
          />
        )}
      </svg>
    </SketchBorder>
  );
}
