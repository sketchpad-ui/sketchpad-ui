import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const tokensPath = join(__dirname, '../dist/index.js');

const { tokensLight, tokensDark } = await import(tokensPath);

function emitColorVars(colors, indent = '  ') {
  const lines = [];
  for (const [key, value] of Object.entries(colors)) {
    lines.push(`${indent}--sk-colors-${key}: ${value};`);
  }
  return lines;
}

function emitSharedVars(tokens, indent = '  ') {
  const lines = [];
  for (const [group, values] of Object.entries(tokens)) {
    if (group === 'colors') continue;
    for (const [key, value] of Object.entries(values)) {
      lines.push(`${indent}--sk-${group}-${key}: ${value};`);
    }
  }
  return lines;
}

function emitThemeBlock(tokens) {
  return [...emitColorVars(tokens.colors), ...emitSharedVars(tokens)];
}

const lines = [
  ':root {',
  ...emitThemeBlock(tokensLight),
  '}',
  '',
  '@media (prefers-color-scheme: dark) {',
  '  :root:not([data-sk-theme="light"]) {',
  ...emitThemeBlock(tokensDark).map((l) => `  ${l}`),
  '  }',
  '}',
  '',
  '[data-sk-theme="dark"] {',
  ...emitThemeBlock(tokensDark),
  '}',
  '',
  '[data-sk-theme="light"] {',
  ...emitThemeBlock(tokensLight),
  '}',
  '',
  '@media (max-width: 480px) {',
  '  :root {',
  '    --sk-stroke-thin: 0.85;',
  '    --sk-stroke-medium: 1.1;',
  '    --sk-stroke-thick: 1.75;',
  '    --sk-roughness-subtle: 0.28;',
  '    --sk-roughness-low: 0.38;',
  '    --sk-roughness-medium: 0.65;',
  '    --sk-roughness-high: 1.05;',
  '  }',
  '}',
];

const outDir = join(__dirname, '../dist');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'tokens.css'), lines.join('\n'));
console.log('Generated tokens.css');
