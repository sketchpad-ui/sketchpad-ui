import { describe, expect, it } from 'vitest';
import {
  createSeededRandom,
  fnv1aHash,
  generateLinePath,
  generateRectPath,
  clearPathCache,
} from './index.js';

describe('random', () => {
  it('returns identical sequences for the same seed', () => {
    const a = createSeededRandom('test-seed');
    const b = createSeededRandom('test-seed');
    const seqA = Array.from({ length: 10 }, () => a());
    const seqB = Array.from({ length: 10 }, () => b());
    expect(seqA).toEqual(seqB);
  });

  it('returns different sequences for different seeds', () => {
    const a = createSeededRandom('seed-a');
    const b = createSeededRandom('seed-b');
    const seqA = Array.from({ length: 5 }, () => a());
    const seqB = Array.from({ length: 5 }, () => b());
    expect(seqA).not.toEqual(seqB);
  });

  it('hashes strings deterministically', () => {
    expect(fnv1aHash('button-1')).toBe(fnv1aHash('button-1'));
    expect(fnv1aHash('button-1')).not.toBe(fnv1aHash('button-2'));
  });
});

describe('paths', () => {
  const opts = { roughness: 1.2, strokeWidth: 1.5, seed: 42 };

  it('generates deterministic rect paths', () => {
    clearPathCache();
    const a = generateRectPath(100, 50, 8, opts);
    clearPathCache();
    const b = generateRectPath(100, 50, 8, opts);
    expect(a.fillPath).toBe(b.fillPath);
    expect(a.centerPath).toContain('M');
  });

  it('caches repeated calls', () => {
    clearPathCache();
    const a = generateRectPath(80, 40, 4, opts);
    const b = generateRectPath(80, 40, 4, opts);
    expect(a).toBe(b);
  });

  it('handles tiny dimensions', () => {
    const result = generateRectPath(2, 2, 0, opts);
    expect(result.fillPath.length).toBeGreaterThan(0);
  });

  it('generates line paths', () => {
    const result = generateLinePath(0, 0, 100, 0, opts);
    expect(result.fillPath).toContain('M');
    expect(result.centerPath).toContain('M');
  });
});
