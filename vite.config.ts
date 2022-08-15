import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'playground')}/`,
    },
  },
  css: {
    preprocessorOptions: {
      css: {
        charset: false,
      },
      style: {
        charset: false,
      },
      scss: {
        charset: false,
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: [
        'vue',
      ],
      dts: './playground/auto-imports.d.ts',
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
      entry: path.resolve(__dirname, 'fuzzy-next/runtime-core/index.ts'),
      name: 'Fuzzy',
      fileName: format => `vue-fuzzy.${
        format}.js`,
    },
    outDir: 'lib',
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
