/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cinzel': ['Cinzel', 'serif'],
        'dancing-script': ['Dancing Script', 'cursive'],
        'cormorant': ['Cormorant', 'serif'],
        'poiret-one': ['Poiret One', 'cursive'],
        'tangerine': ['Tangerine', 'cursive'],
        'bad-script': ['Bad Script', 'cursive'],
        'elsie': ['Elsie', 'cursive'],
        'libre-caslon-display': ['Libre Caslon Display', 'serif'],
        'handlee': ['Handlee', 'cursive'],
        'merienda': ['Merienda', 'cursive'],
      },
    },
  },
  plugins: [],
}
