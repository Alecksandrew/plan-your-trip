/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        'main': '#FDFBF7',
        'text': '#343A40',
        'action': '#D95D39',
        'suport': '#EACAB5',
      }
    },
  },
  plugins: [],
}