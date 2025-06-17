import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(async () => ({
    plugins: [react()],
    server: {
        host: true,
        port: 5173,
        proxy: {
            '/api': 'http://localhost:8000',
        }
    },
}))
