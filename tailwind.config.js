module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:
      {
        primary: '#6366F1',
        secondary: '#6B7280',
        danger: '#EF4444',
        ['primary-dark']: '#4338CA',
        ['secondary-dark']: '#374151',
        ['danger-dark']: '#B91C1C',
        ['primary-light']: '#A5B4FC',
        ['secondary-light']: '#D1D5DB',
        ['danger-light']: '#FCA5A5'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
