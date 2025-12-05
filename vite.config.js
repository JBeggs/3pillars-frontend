import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  // Get API base URL from .env or use default
  const apiBaseUrl = env.VITE_API_BASE_URL || 'http://192.168.1.100:8000'
  const port = parseInt(env.VITE_PORT || '3000', 10)
  const host = env.VITE_HOST || '0.0.0.0'
  
  return {
    plugins: [react()],
    server: {
      port: port,
      host: host, // Allow access from network (e.g., 192.168.1.100:3000)
      proxy: {
        '/api': {
          target: apiBaseUrl,  // Backend server from .env
          changeOrigin: true,
          secure: false,
        }
      }
    }
  }
})

