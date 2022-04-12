import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#0971FF',
        },
      },
    },
  },
})
