import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/maguibing',
  plugins: [
    vue({
      reactivityTransform: true
    }),
    Components({
      // dts: false,
      resolvers: [VantResolver({ importStyle: false })]
    }),
    AutoImport({ imports: ['vue', 'vue-router'] }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/icons')]
    })
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
