/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': { 100: '#fffdf5', 300: '#fff3cc', 500: '#ffefb8'},
        'gray': { 20: '#eeeef1', 50: '#d8d8df', 100: '#b6b7c4', 500: '#72748d'},
        'secondary': { 100: '#ff7366', 300: '#ff2814', 500: '#c21000'},
        'button-white': { 100: '#e6e7e8'}
      },
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"]
      },
      width: {
        '108': '27rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '176': '44rem',
        '192': '48rem',
      },
      height: {
        '108': '27rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '176': '44rem',
        '192': '48rem',
      },
    }
  },
  plugins: [],
}

