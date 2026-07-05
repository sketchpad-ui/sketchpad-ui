'use client';

import type { ReactNode } from 'react';
import { tokens, colorVars } from '@sketchpad/tokens';
import { generateLinePath, generateOvalPath, resolveSeed } from '@sketchpad/sketch-core';

export interface IconProps {
  size?: number;
  seed?: string | number;
  className?: string;
}

function IconSvg({
  size = 24,
  children,
  className,
}: {
  size?: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function IconClose({ size = 24, seed = 'icon-close' }: IconProps) {
  const path = generateLinePath(6, 6, size - 6, size - 6, {
    roughness: tokens.roughness.low,
    strokeWidth: tokens.stroke.medium,
    seed: resolveSeed(seed, 'close'),
  });
  const path2 = generateLinePath(size - 6, 6, 6, size - 6, {
    roughness: tokens.roughness.low,
    strokeWidth: tokens.stroke.medium,
    seed: resolveSeed(`${seed}-2`, 'close2'),
  });
  return (
    <IconSvg size={size}>
      <path d={path.fillPath} fill={colorVars.ink} />
      <path d={path2.fillPath} fill={colorVars.ink} />
    </IconSvg>
  );
}

export function IconCheck({ size = 24, seed = 'icon-check' }: IconProps) {
  const path = generateLinePath(4, size / 2, size / 2 - 2, size - 6, {
    roughness: tokens.roughness.low,
    strokeWidth: tokens.stroke.medium,
    seed: resolveSeed(seed, 'check'),
  });
  return (
    <IconSvg size={size}>
      <path d={path.fillPath} fill={colorVars.ink} />
    </IconSvg>
  );
}

export function IconSearch({ size = 24, seed = 'icon-search' }: IconProps) {
  const circle = generateOvalPath(size * 0.5, size * 0.5, {
    roughness: tokens.roughness.low,
    strokeWidth: tokens.stroke.medium,
    seed: resolveSeed(seed, 'search'),
  });
  const handle = generateLinePath(size * 0.55, size * 0.55, size - 4, size - 4, {
    roughness: tokens.roughness.low,
    strokeWidth: tokens.stroke.medium,
    seed: resolveSeed(`${seed}-h`, 'handle'),
  });
  return (
    <IconSvg size={size}>
      <path d={circle.fillPath} fill="none" stroke={colorVars.ink} strokeWidth={1.5} />
      <path d={handle.fillPath} fill={colorVars.ink} />
    </IconSvg>
  );
}

export function IconMenu({ size = 24, seed = 'icon-menu' }: IconProps) {
  return (
    <IconSvg size={size}>
      {[8, 12, 16].map((y, i) => {
        const line = generateLinePath(4, y, size - 4, y, {
          roughness: tokens.roughness.low,
          strokeWidth: tokens.stroke.medium,
          seed: resolveSeed(`${seed}-${i}`, `menu-${i}`),
        });
        return <path key={i} d={line.fillPath} fill={colorVars.ink} />;
      })}
    </IconSvg>
  );
}

export function IconAlert({ size = 24, seed = 'icon-alert' }: IconProps) {
  const circle = generateOvalPath(size - 4, size - 4, {
    roughness: tokens.roughness.low,
    strokeWidth: tokens.stroke.medium,
    seed: resolveSeed(seed, 'alert'),
  });
  return (
    <IconSvg size={size}>
      <g transform="translate(2, 2)">
        <path d={circle.fillPath} fill="none" stroke={colorVars.accentRed} strokeWidth={1.5} />
      </g>
      <text x={size / 2} y={size / 2 + 4} textAnchor="middle" fontSize={14} fill={colorVars.accentRed}>
        !
      </text>
    </IconSvg>
  );
}
