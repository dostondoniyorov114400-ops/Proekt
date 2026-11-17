import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// FreeToGame CORS headerlarini bermaydi, shuning uchun dev rejimida proxy ishlatamiz.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://www.freetogame.com',
        changeOrigin: true,
      },
    },
  },
})
