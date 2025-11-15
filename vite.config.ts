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
        '@angular/common',
        '@angular/platform-browser'
      ],
      output: {
        entryFileNames: 'plugin.mjs',
        globals: {
          '@angular/core': 'ng.core',
          '@angular/common': 'ng.common'
        }
      }
    },
    target: 'es2022',
    minify: false,
    sourcemap: true
  }
});