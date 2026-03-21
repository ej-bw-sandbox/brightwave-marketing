import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    screens: {
      'sm': '480px',
      'md': '768px',
      'lg': '992px',
      'xl': '1280px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        'bw-gray': {
          50: '#ffffff',
          75: '#eff1f5',
          100: '#d7d8db',
          200: '#bebfc2',
          300: '#a5a6a8',
          500: '#5a5b5c',
          600: '#414142',
          700: '#282829',
          800: '#0f0f0f',
        },
        'bw-yellow': {
          200: '#fdfdd8',
          300: '#f8f88b',
          400: '#f5f551',
          500: '#f2f218',
          550: '#e7e70d',
          600: '#c1c10b',
          700: '#878708',
          800: '#4d4d04',
        },
        brand: {
          400: '#f2f218',
          500: '#e7e70d',
          600: '#c1c10b',
        },
        surface: {
          DEFAULT: '#ffffff',
          1: '#eff1f5',
          2: '#d9d9d9',
          card: '#282829',
          elevated: '#282829',
        },
      },
      fontFamily: {
        sans: ['"PST Mail Sans"', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
