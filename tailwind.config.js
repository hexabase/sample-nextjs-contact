/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './containers/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }
      md: '768px',
      // => @media (min-width: 768px) { ... }
      lg: '1024px',
      // => @media (min-width: 1024px) { ... }
      xl: '1280px',
      // => @media (min-width: 1280px) { ... }
      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    container: {},
    extend: {
      maxWidth: {
        '1/2': '50%',
        '3/4': '75%',
      },
      width: {
        100: '100px',
        200: '200px',
        250: '250px',
        300: '300px',
        500: '500px',
      },
    },
    colors: {
      'primary': '#1890ff',
      'text-primary': '#808080',
      black: {
        DEFAULT: '#32303b'
      },
      blue: {
        300: '#487CA5'
      },
      red: {
        500: '#C4554D'
      }
    },
  },
  plugins: [],
};
