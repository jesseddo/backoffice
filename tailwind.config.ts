import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        eddo: {
          50: '#E1F5EE',
          100: '#C7EBDD',
          500: '#0F6E56',
          600: '#085041',
          700: '#063D31',
        },
        level: {
          'strong-bg': '#E1F5EE',
          'strong-text': '#085041',
          'develop-bg': '#FAEEDA',
          'develop-text': '#633806',
          'emerge-bg': '#FCEBEB',
          'emerge-text': '#791F1F',
        },
        warning: {
          DEFAULT: '#B45309',
        },
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      maxWidth: {
        wizard: '680px',
      },
    },
  },
  plugins: [],
} satisfies Config;
