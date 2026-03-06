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
        primary: {
          50: '#fdf8f0',
          100: '#faefd9',
          200: '#f4dbb0',
          300: '#ecc07f',
          400: '#e29f4c',
          500: '#d4832a',
          600: '#c06a1f',
          700: '#9e511b',
          800: '#7f401d',
          900: '#68361a',
          950: '#381a0c',
        },
        warm: {
          50: '#faf9f7',
          100: '#f2ede6',
          200: '#e8ddd1',
          300: '#d5c4b0',
          400: '#bfa48a',
          500: '#a98869',
          600: '#8f6e52',
          700: '#775a44',
          800: '#634c3b',
          900: '#544134',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
