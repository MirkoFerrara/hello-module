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
      output: {
        entryFileNames: 'plugin.mjs',
      }
    },
    target: 'es2022',
    minify: true,  // ✅ Minify per ridurre dimensioni
    sourcemap: true
  }
});