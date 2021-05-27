const theme = require('./src/theme')
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme:{extend:theme},
  variants: {
    extend: {},
  },
  plugins: [],
}
