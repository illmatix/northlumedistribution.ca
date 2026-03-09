import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-vue': ['vue', 'vue-router'],
        },
      },
    },
  },

  css: {
    devSourcemap: true,
  },

  server: {
    port: 5173,
    strictPort: false,
    open: false,
  },

  preview: {
    port: 4173,
  },

  plugins: [vue(), tailwindcss()],
});
