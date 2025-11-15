import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/public-api.ts',
  output: {
    file: '../dist/module.umd.js',
    format: 'umd',
    name: 'HelloModule',
    globals: {
      '@angular/core': 'ng.core',
      '@angular/common': 'ng.common',
      '@angular/router': 'ng.router',
      '@angular/common/http': 'ng.common.http',
      'rxjs': 'rxjs',
      'rxjs/operators': 'rxjs.operators'
    },
    sourcemap: true
  },
  external: [
    '@angular/core',
    '@angular/common',
    '@angular/router',
    '@angular/common/http',
    'rxjs',
    'rxjs/operators'
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false
    })
  ]
};