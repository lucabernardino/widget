import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: {
        main: 'src/main.js',  // Main application entry with cache buster
        separate: 'src/dawnvox.js'  // Separate entry without cache buster
      },
      output: {
        // Configure output file names based on the chunk name
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'separate') {
            return 'dawnvox.js';  // No cache buster for 'separate' entry
          }
          return `[name].[hash].js`;  // Include cache buster for all other entries
        },
        chunkFileNames: `[name].[hash].js`,
        assetFileNames: `[name].[ext]`
      }
    }
  }
});
