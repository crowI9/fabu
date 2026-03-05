import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: '装修服务',
        short_name: '装修服务',
        description: '装修服务 App',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'pwa-192x192.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: 'pwa-512x512.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      }
    }),
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
