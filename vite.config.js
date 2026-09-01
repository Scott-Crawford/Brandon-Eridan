import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom domain (brandoneridan.com) serves from root, so base is '/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
