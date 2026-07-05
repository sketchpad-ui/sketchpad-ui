import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const tokensPath = join(__dirname, '../dist/index.js');

const { tokens } = await import(tokensPath);

const lines = [':root {'];

function addVars(obj, prefix) {
  for (const [key, value] of Object.entries(obj)) {
    const varName = prefix ? `${prefix}-${key}` : key;
    if (typeof value === 'object' && value !== null) {
      addVars(value, varName);
    } else {
      lines.push(`  --sk-${varName}: ${value};`);
    }
  }
}

addVars(tokens, '');

lines.push('}');
lines.push('');
lines.push('@media (max-width: 480px) {');
lines.push('  :root {');
lines.push('    --sk-stroke-thin: 0.85;');
lines.push('    --sk-stroke-medium: 1.25;');
lines.push('    --sk-stroke-thick: 2;');
lines.push('    --sk-roughness-low: 0.45;');
lines.push('    --sk-roughness-medium: 0.9;');
lines.push('    --sk-roughness-high: 1.6;');
lines.push('  }');
lines.push('}');

const outDir = join(__dirname, '../dist');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'tokens.css'), lines.join('\n'));
console.log('Generated tokens.css');
