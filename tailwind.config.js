/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaria: "#2563eb",
        secundaria: "#3b82f6",
      },
    },
  },
  plugins: [],
};