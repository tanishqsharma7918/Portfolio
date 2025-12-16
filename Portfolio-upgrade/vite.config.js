import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures assets are relative, working for GitHub Pages (subdir) and Vercel
  server: {
    host: true, // Allow all hosts
    allowedHosts: ['*'] // Allow any host to access the dev server
  }
})
