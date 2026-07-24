import { cpSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const sourceDirectory = join(scriptDirectory, '../src');
const outputDirectory = join(scriptDirectory, '../dist');

mkdirSync(outputDirectory, { recursive: true });
cpSync(sourceDirectory, outputDirectory, {
  recursive: true,
  filter: (source) => !source.includes('/__tests__/') && !source.endsWith('.tsx') && !source.endsWith('.ts'),
});
cpSync(
  join(sourceDirectory, 'styles/global.css'),
  join(outputDirectory, 'styles.css'),
);
