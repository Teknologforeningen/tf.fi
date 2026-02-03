import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#f1e792',
        darkblue: '#001627',
        creamwhite: '#ffffe8',
        teknologröd: '#b20738',
        koppargron: '#7ecbb3',
        eventblue: '#8ad7d7',
        blogpink: '#d79ad1',
        darkgray: '#242424',
        gray: '#38404b',
        lightGray: '#f5f5f5',
      },
      fontFamily: {
        body: ['var(--font-montserrat)'],
        display: ['var(--font-montserrat)'],
      },
      screens: {
        xxs: '450px',
      },
      typography: {
        DEFAULT: {
          css: {
            fontSize: '1rem',
            h1: {
              fontSize: '2.5rem',
              fontWeight: 600,
            },
            'h1 strong': {
              fontWeight: 700,
            },
            h2: {
              fontSize: '2rem',
              fontWeight: 500,
            },
            'h2 strong': {
              fontWeight: 600,
            },
            h3: {
              fontSize: '1.5rem',
              fontWeight: 500,
            },
            'h3 strong': {
              fontWeight: 600,
            },
            h4: {
              fontSize: '1.25rem',
              fontWeight: 500,
            },
            'h4 strong': {
              fontWeight: 600,
            },
          },
        },
      },
    },
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    },
  },
  plugins: [
    ({ addVariant }) => {
      addVariant('descendant', '& *')
      addVariant('child', '& > *')
    },
    typography,
  ],
}

export default config
