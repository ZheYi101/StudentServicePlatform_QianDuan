import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  server: {
    proxy: {
        '/api': {
            target: 'http://121.40.27.84:8080/',
            changeOrigin: true,
            pathRewrite: { '^/api': '' }
        }
    }
  }
})
