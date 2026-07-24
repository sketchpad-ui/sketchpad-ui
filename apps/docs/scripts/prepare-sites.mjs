import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const appDirectory = join(dirname(fileURLToPath(import.meta.url)), '..');
const exportDirectory = join(appDirectory, 'out');
const distDirectory = join(appDirectory, 'dist');
const clientDirectory = join(distDirectory, 'client');
const serverDirectory = join(distDirectory, 'server');

rmSync(distDirectory, { recursive: true, force: true });
mkdirSync(clientDirectory, { recursive: true });
mkdirSync(serverDirectory, { recursive: true });
cpSync(exportDirectory, clientDirectory, { recursive: true });

writeFileSync(
  join(serverDirectory, 'index.js'),
  `export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};
`,
);
