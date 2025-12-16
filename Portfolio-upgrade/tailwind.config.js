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
        // Exact Reference Colors - Nikhila Koneru Palette
        navy: "#0a192f",        // Main deep background
        "light-navy": "#112240", // Home highlight pill background
        teal: "#64ffda",        // Exact accent color for text/hover
        slate: "#8892b0",       // Muted text for unselected links
        lightSlate: "#ccd6f6",  // Primary text
        // Legacy aliases (backward compatibility)
        lightNavy: "#112240",
        green: "#64ffda",
        glass: "rgba(255, 255, 255, 0.25)",
        glassDark: "rgba(0, 0, 0, 0.25)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"], // Clean, geometric sans-serif
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    },
  },
  plugins: [],
}
