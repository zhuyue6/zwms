import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: /^@zwms\/(.*)/, replacement: '@zwms/$1/src' },
    ],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.d.ts', '.json'],
  },
  server: {
    host: true,
    port: 8080,
    cors: true,
  },
  plugins: [
    vuePlugin(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
