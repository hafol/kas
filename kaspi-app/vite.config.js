import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      ignored: ['**/new icon for bg image/**', '**/_archive/**', '**/dist/**', '**/.git/**']
    }
  }
})
