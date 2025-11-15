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
      // ✅ VUOTO - niente external, niente globals
      output: {
        entryFileNames: 'plugin.mjs',
        inlineDynamicImports: true,  // ✅ AGGIUNTO
      }
    },
    target: 'es2022',
    minify: false,  // ✅ DISABILITATO per vedere meglio
    sourcemap: true,
    commonjsOptions: {
      include: [/node_modules/],  // ✅ Include node_modules
    }
  },
  optimizeDeps: {
    include: ['@angular/core', '@angular/common']  // ✅ Force include
  },
  esbuild: {
    target: 'es2022',
    keepNames: true
  }
});