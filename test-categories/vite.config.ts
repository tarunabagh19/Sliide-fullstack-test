import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: './frontend', // points to frontend folder
  build: {
    outDir: '../dist', // relative to root, outputs to /app/dist
  },
   server: {
    proxy: {
      "/api": "http://localhost:5000", 
    },
  },
  plugins: [react()],
})
