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
      external: [
        '@angular/core',
        '@angular/common'
      ],
      output: {
        entryFileNames: 'plugin.mjs'
      }
    },
    target: 'es2022',
    sourcemap: true
  }
});
