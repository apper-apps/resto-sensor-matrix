/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E0F7F4',
          100: '#B3EDE6',
          200: '#80E1D6',
          300: '#4DD5C5',
          400: '#26CCB8',
          500: '#00BFA6',
          600: '#00A693',
          700: '#008A7C',
          800: '#006E65',
          900: '#004A47',
        },
        secondary: {
          50: '#FFE8E8',
          100: '#FFBCBC',
          200: '#FF9B9B',
          300: '#FF8080',
          400: '#FF7171',
          500: '#FF6B6B',
          600: '#E05555',
          700: '#C24444',
          800: '#A33636',
          900: '#852929',
        },
        accent: {
          50: '#E6F9F7',
          100: '#B3F0EB',
          200: '#80E6DE',
          300: '#4DDCD1',
          400: '#26D4C7',
          500: '#4ECDC4',
          600: '#44B8B0',
          700: '#39A299',
          800: '#2E8C82',
          900: '#1F5F5B',
        },
        gray: {
          50: '#F8FAFB',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      borderRadius: {
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}