/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        roxo: '#4a1d96',
        'header-verde': '#d1fae5',
        'botao-verde': '#a7f3d0',
        'botao-verde-hover': '#6ee7b7'
      },
    },
  },
  plugins: [],
};