import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const path = require('path');
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    proxy: {
      '/users': {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        // rewrite: path => path.replace('/users', ''),
      }
    }
  },
});
