/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundImage: {
      'search': "url('./icons/SearchIcon.svg')",
    },
    extend: {},
  },
  plugins: [],
}