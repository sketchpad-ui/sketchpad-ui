export function fnv1aHash(str: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

export function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createSeededRandom(seed: string | number): () => number {
  return mulberry32(typeof seed === 'string' ? fnv1aHash(seed) : seed);
}

export function resolveSeed(seed: string | number | undefined, fallback: string): number {
  if (seed !== undefined) {
    return typeof seed === 'string' ? fnv1aHash(seed) : seed;
  }
  return fnv1aHash(fallback);
}
