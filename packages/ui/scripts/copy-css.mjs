import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = readFileSync(join(__dirname, '../src/styles/global.css'), 'utf8');
const outDir = join(__dirname, '../dist');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'styles.css'), src);
