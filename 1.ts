import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  extract: {
    include: [
      'src/**/*.{vue,html,jsx,tsx}',
      'core/**/*.{vue,html,jsx,tsx}',
      'fuzzy-next/**/*.{vue,html,jsx,tsx}',
    ],
  },
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
