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
        // Nikhila Koneru Color Palette - Navy & Teal
        navy: "#0a192f",      // Main background
        lightNavy: "#112240", // Card/active background
        green: "#64ffda",     // Signature teal accent
        slate: "#8892b0",     // Secondary text
        lightSlate: "#ccd6f6",// Primary text
        // Legacy colors (keep for compatibility)
        glass: "rgba(255, 255, 255, 0.25)",
        glassDark: "rgba(0, 0, 0, 0.25)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"], // Clean, geometric sans-serif
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
