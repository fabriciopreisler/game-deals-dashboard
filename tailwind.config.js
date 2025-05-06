/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        roxo: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed', // Cor principal para botões ativos
          700: '#6b46c1',
          800: '#4a1d96',
          900: '#3b0764',
        },
        gray: {
          200: '#e5e7eb',
          400: '#9ca3af',
          600: '#4b5563',
          800: '#1f2937', // Fundo do combobox
          900: '#111827', // Fundo escuro
          950: '#030712',
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};