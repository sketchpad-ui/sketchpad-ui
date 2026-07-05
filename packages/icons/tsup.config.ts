import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  external: ['react'],
  esbuildOptions(options) {
    options.banner = { js: '"use client";' };
  },
});
