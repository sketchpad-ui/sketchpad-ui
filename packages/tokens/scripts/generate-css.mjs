import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const { accentPresets, tokensLight, tokensDark } = await import(
  join(scriptDirectory, '../dist/index.js')
);

function emitObject(prefix, object, indent = '  ') {
  return Object.entries(object).map(([key, value]) => `${indent}--sk-${prefix}-${key}: ${value};`);
}

function emitTheme(tokens, indent = '  ') {
  const output = [];
  for (const [group, values] of Object.entries(tokens)) {
    output.push(...emitObject(group, values, indent));
  }
  return output;
}

function accentLines(indent = '  ') {
  return Object.entries(accentPresets).map(
    ([name, value]) => `${indent}--sk-accent-${name}: ${value};`,
  );
}

const lines = [
  ':root {',
  ...emitTheme(tokensLight),
  ...accentLines(),
  '  --sk-accent: var(--sk-accent-blue);',
  '  --sk-on-accent: #171717;',
  '  --sk-accent-hover: color-mix(in srgb, var(--sk-accent) 86%, #ffffff);',
  '  --sk-accent-pressed: color-mix(in srgb, var(--sk-accent) 82%, #000000);',
  '  color-scheme: light;',
  '}',
  '',
  '@media (prefers-color-scheme: dark) {',
  '  :root:not([data-sk-theme="light"]) {',
  ...emitTheme(tokensDark, '    '),
  '    color-scheme: dark;',
  '  }',
  '}',
  '',
  '[data-sk-theme="dark"] {',
  ...emitTheme(tokensDark),
  '  color-scheme: dark;',
  '}',
  '',
  '[data-sk-theme="light"] {',
  ...emitTheme(tokensLight),
  '  color-scheme: light;',
  '}',
  '',
  ...Object.keys(accentPresets).flatMap((name) => [
    `[data-sk-color="${name}"] {`,
    `  --sk-accent: var(--sk-accent-${name});`,
    '  --sk-on-accent: #171717;',
    '}',
    '',
  ]),
  '[data-sk-custom-accent] {',
  '  --sk-accent: var(--sk-custom-accent);',
  '  --sk-on-accent: var(--sk-custom-on-accent);',
  '}',
];

const outputDirectory = join(scriptDirectory, '../dist');
mkdirSync(outputDirectory, { recursive: true });
writeFileSync(join(outputDirectory, 'tokens.css'), lines.join('\n'));
