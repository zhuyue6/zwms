import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  resolve: {
    alias: [
      // { find: /^@zwms\/(.*)/, replacement: path.resolve(__dirname, '../$1/src') },
      { find: /^@zwms\/(.*)/, replacement: path.resolve(__dirname, '../../packages/$1/src') },
    ],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.d.ts', '.json'],
  },
  server: {
    proxy: {
      '/static': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true
      }
    },
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
