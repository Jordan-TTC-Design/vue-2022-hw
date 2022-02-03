import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/scss/all.scss";',
      },
    },
  },
  // base: '/vue-2022-hw/', // 对应GitHub项目名称
  // eslint-disable-next-line no-undef
  base: process.env.NODE_ENV === 'production' ? '/vue-2022-hw/' : './',
});
