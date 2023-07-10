/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
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
        body: ['var(--font-raleway)'],
        display: ['var(--font-montserrat)'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100ch',
          }
        }
      }
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
