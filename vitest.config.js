import { defineConfig } from 'vitest/config';
import path from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
    include: ['tests/**/*.{test,spec}.{js,ts}'],
    exclude: ['tests/e2e/**', 'node_modules/**'],

    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{js,ts,vue}'],
      exclude: ['src/main.js', 'node_modules/**'],
    },

    reporters: ['default'],
    watch: true,
    watchExclude: ['node_modules/**', 'dist/**'],
    testTimeout: 10000,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
