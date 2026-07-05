import { describe, expect, it } from 'vitest';
import { getInkOnPaperContrastRatio } from './index.js';

describe('tokens', () => {
  it('passes WCAG AA contrast for ink on paper', () => {
    expect(getInkOnPaperContrastRatio()).toBeGreaterThanOrEqual(4.5);
  });
});
