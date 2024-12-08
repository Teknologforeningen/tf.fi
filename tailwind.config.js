/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#f1e792',
        darkblue: '#001627',
        creamwhite: '#ffffe8',
        teknologröd: '#b20738',
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
            },
            h2: {
              fontSize: '2rem',
            },
            h3: {
              fontSize: '1.5rem',
            },
            h4: {
              fontSize: '1.25rem',
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
    require('@tailwindcss/typography'),
  ],
}
