/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        glass: "rgba(255, 255, 255, 0.25)",
        glassDark: "rgba(0, 0, 0, 0.25)",
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
