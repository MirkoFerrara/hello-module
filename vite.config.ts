import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'frontend/src/public-api.ts'),
      name: 'HelloModule',
      fileName: 'plugin',
      formats: ['es']
    },
    rollupOptions: {
      // ✅ NESSUN external! Includi tutto!
      output: {
        entryFileNames: 'plugin.mjs',
      }
    },
    target: 'es2022',
    minify: true,
    sourcemap: true
  },
  esbuild: {
    target: 'es2022',
    keepNames: true
  }
});