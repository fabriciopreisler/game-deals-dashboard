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
          600: '#7c3aed',
          700: '#6b46c1',
          800: '#4a1d96', // Roxo escuro para cabeçalhos
          900: '#3b0764',
        },
        gray: {
          800: '#1f2937',  // Para comboboxes
          900: '#111827',  // Para cards/fundos
          950: '#030712',  // Para fundo da página
        }
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.25)',
      },
      borderRadius: {
        'lg': '0.5rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};