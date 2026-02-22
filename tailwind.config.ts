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
        muted: '#6B7280'
      }
    }
  },
  plugins: []
} satisfies Config;