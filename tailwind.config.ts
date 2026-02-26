import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        primary: '#0F766E',
        'primary-dark': '#0B5B54',
        navy: '#0B1F3B',
        mint: '#A7F3D0',
        background: '#F7FAFC',
        card: '#FFFFFF',
        text: '#111827',
        muted: '#6B7280',
        border: '#E5E7EB',
        warning: '#D97706',
        'warning-bg': '#FEF3C7',
        'teal-tint': '#F0FDF9'
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out'
      }
    }
  },
  plugins: []
} satisfies Config;