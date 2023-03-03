import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import checker from 'vite-plugin-checker';
const path = require('path');
export default defineConfig({
  plugins: [
    vue(),
    // checker({
    //   typescript: true,
    // }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
