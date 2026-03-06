/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        hayat: {
          50: '#fdf8f0',
          100: '#faefd9',
          200: '#f4dbb2',
          300: '#ecc280',
          400: '#e2a050',
          500: '#d4823a',
          600: '#c4692e',
          700: '#a35128',
          800: '#834027',
          900: '#6b3523',
          950: '#3a1a10',
        },
        earth: {
          50: '#f7f5f2',
          100: '#ede8e0',
          200: '#dbd2c3',
          300: '#c3b59e',
          400: '#ab9478',
          500: '#9a7f62',
          600: '#8d7056',
          700: '#755c48',
          800: '#614c3e',
          900: '#504038',
          950: '#2a201c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
