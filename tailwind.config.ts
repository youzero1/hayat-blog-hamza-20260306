import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fefdf8',
          100: '#fdf9ed',
          200: '#faf2d3',
          300: '#f5e7af',
          400: '#edd880',
          500: '#e3c54f',
          600: '#cda83a',
          700: '#aa8530',
          800: '#8a6a2c',
          900: '#725827',
        },
        forest: {
          50: '#f2f7f2',
          100: '#e0ece0',
          200: '#c3d9c3',
          300: '#97be97',
          400: '#649b64',
          500: '#4a7c4a',
          600: '#3a6339',
          700: '#2f4f2e',
          800: '#283f27',
          900: '#223522',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
