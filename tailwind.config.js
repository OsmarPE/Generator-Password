/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html","./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily:{
        Outfit:['Outfit', 'sans-serif']
      }
    },
  },
  plugins: [],
}