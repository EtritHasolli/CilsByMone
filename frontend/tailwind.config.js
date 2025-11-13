/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#D7B4A6',
          dark: '#B59486',
          light: '#F4E7E1',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F8F5F3',
          dark: '#1E1A1A',
        },
      },
      boxShadow: {
        soft: '0 8px 24px rgba(0,0,0,0.06)',
        glow: '0 10px 30px rgba(215,180,166,0.35)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};

