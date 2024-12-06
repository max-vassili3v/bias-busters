import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  publicDir: 'public',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'src': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        // Ensure assets are resolved correctly for Electron
        manualChunks: undefined,
      },
    },
  }
})
