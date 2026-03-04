import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
    AutoImport({
      imports: ['vue'],
      dts: true,
    }),
  ],
  base: './',
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          $van-primary-color: #4096ff;
          $van-success-color: #52c41a;
          $van-background: #f8fbff;
        `
      }
    }
  }
})
