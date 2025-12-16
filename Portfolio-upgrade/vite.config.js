import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Use root path for Vercel (change to /Portfolio/ for GitHub Pages)
  server: {
    host: true, // Allow all hosts
    allowedHosts: ['*'] // Allow any host to access the dev server
  }
})
