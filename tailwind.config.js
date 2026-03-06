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
        primary: {
          50: '#fdf8f0',
          100: '#faefd9',
          200: '#f4dcb0',
          300: '#ecc47e',
          400: '#e3a54a',
          500: '#d98c28',
          600: '#c4741e',
          700: '#a35a1a',
          800: '#84481c',
          900: '#6c3c1a',
        },
        warm: {
          50: '#fafaf9',
          100: '#f5f5f0',
          200: '#e8e8df',
          300: '#d4d4c8',
          400: '#a8a895',
          500: '#7c7c6a',
          600: '#5e5e4e',
          700: '#4a4a3c',
          800: '#3a3a2e',
          900: '#2e2e24',
        },
        sage: {
          50: '#f4f7f4',
          100: '#e4ece4',
          200: '#c9d9c9',
          300: '#a2bda2',
          400: '#739973',
          500: '#527a52',
          600: '#3f613f',
          700: '#334d33',
          800: '#2b3f2b',
          900: '#243524',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [],
};
