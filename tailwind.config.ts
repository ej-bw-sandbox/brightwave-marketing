import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Brightwave Gray Scale - from www.brightwave.io CSS vars */
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
        /* Brightwave Yellow / Primary Accent */
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
        /* Semantic aliases */
        brand: {
          400: '#f2f218',
          500: '#e7e70d',
          600: '#c1c10b',
        },
        surface: {
          DEFAULT: '#0f0f0f',
          1: '#282829',
          2: '#0f0f0f',
          card: '#282829',
          elevated: '#282829',
        },
        border: {
          DEFAULT: '#414142',
          subtle: '#282829',
          accent: '#d9d9d9',
        },
      },
      fontFamily: {
        sans: ['"PST Mail Sans"', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        /* Brightwave type scale */
        'title-1': ['6.875rem', { lineHeight: '0.95', letterSpacing: '-0.02em', fontWeight: '500' }],
        'title-2': ['5.625rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '500' }],
        'title-3': ['3.75rem', { lineHeight: '0.95', letterSpacing: '-0.02em', fontWeight: '500' }],
        'title-4': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '500' }],
        'title-5': ['1.25rem', { lineHeight: '1.2', fontWeight: '700' }],
        'body-1': ['2.65rem', { lineHeight: '1.15', letterSpacing: '-0.03em' }],
        'body-2': ['1.875rem', { lineHeight: '1.1', fontWeight: '500' }],
        'body-3': ['1.5rem', { lineHeight: '1.2' }],
        'body-4': ['1.125rem', { lineHeight: '1.35' }],
        'body-5': ['1rem', { lineHeight: '1.35' }],
      },
      spacing: {
        section: '6rem',
        'section-sm': '4rem',
      },
      maxWidth: {
        site: '87.5rem', /* 1400px - Brightwave max-width */
      },
      borderRadius: {
        sm: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
