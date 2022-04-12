import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import WindiCSS from 'vite-plugin-windicss'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    WindiCSS(),
    AutoImport({
      // resolvers: [ElementPlusResolver()],
      imports: [
        'vue',
      ],
      dts: './src/auto-imports.d.ts',
    }),
  ],
  optimizeDeps: {
    include: [
      'vue',
    ],
    exclude: [
      'vue-demi',
    ],
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'Fuzzy',
      fileName: format => `vue-fuzzy.${
        format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
