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
        /* Brightwave Gray Scale */
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
          DEFAULT: '#ffffff',
          1: '#eff1f5',
          2: '#d9d9d9',
          card: '#282829',
          elevated: '#282829',
        },
        onsurface: {
          DEFAULT: '#0f0f0f',
          white: '#ffffff',
          border: '#bebfc2',
          subtle: '#282829',
          weak: '#414142',
        },
        border: {
          DEFAULT: '#bebfc2',
          subtle: '#d7d8db',
          accent: '#d9d9d9',
        },
        accent: {
          blue: '#335ff9',
          purple: '#7443ff',
          lightblue: '#7ed8ff',
          lightpurple: '#ebe6ff',
        },
      },
      fontFamily: {
        sans: ['"PST Mail Sans"', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        switzer: ['Switzer', 'sans-serif'],
      },
      fontSize: {
        /* Brightwave type scale */
        'title-1': ['6.875rem', { lineHeight: '0.95', letterSpacing: '-0.02em', fontWeight: '500' }],
        'title-2': ['5.625rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '500' }],
        'title-3': ['3.75rem', { lineHeight: '0.95', letterSpacing: '-0.02em', fontWeight: '500' }],
        'title-4': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '500' }],
        'title-5': ['1.25rem', { lineHeight: '1.2', fontWeight: '700' }],
        'title-cta': ['10em', { lineHeight: '1', letterSpacing: '-0.04em', fontWeight: '400' }],
        'body-1': ['2.65rem', { lineHeight: '1.15', letterSpacing: '-0.03em' }],
        'body-2': ['1.875rem', { lineHeight: '1.1', fontWeight: '500' }],
        'body-3': ['1.5rem', { lineHeight: '1.2' }],
        'body-4': ['1.125rem', { lineHeight: '1.35' }],
        'body-5': ['1rem', { lineHeight: '1.35' }],
        'body-6': ['0.875rem', { lineHeight: '1' }],
        'link': ['1rem', { lineHeight: '1', letterSpacing: '0.01em', fontWeight: '600' }],
      },
      spacing: {
        section: '6.25rem',
        'section-sm': '4rem',
      },
      maxWidth: {
        site: '90rem',
        'nav-inner': '87.5rem',
        '10cols': '1144px',
        '8cols': '924px',
        '6cols': '704px',
        'slider-text': '42.5rem',
        text: '45rem',
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '0.5rem',
        lg: '1rem',
        logo: '0.5625rem',
      },
      boxShadow: {
        prompt: '0 2px 5px 0 #bebfc2',
        paywall: '0.125rem 0.125rem rgba(0,0,0,0.2)',
      },
      transitionTimingFunction: {
        accordion: 'cubic-bezier(0, 0, 0.14, 1.02)',
        stagger: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        footer: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
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
