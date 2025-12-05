// API Configuration
// Loads from .env file (VITE_API_BASE_URL)
// Fallback to localhost if not set
const getApiBaseUrl = () => {
  // Priority 1: .env file (VITE_API_BASE_URL)
  if (import.meta.env.VITE_API_BASE_URL) {
    const url = import.meta.env.VITE_API_BASE_URL.trim()
    // Ensure it ends with /api
    if (url.endsWith('/api')) {
      return url
    }
    return url.endsWith('/') ? `${url}api` : `${url}/api`
  }
  
  // Priority 2: Default based on environment
  if (import.meta.env.DEV) {
    return 'http://192.168.1.100:8000/api'  // Local network backend
  }
  
  // Fallback to localhost
  return 'http://localhost:8000/api'
}

export const API_BASE_URL = getApiBaseUrl()

// Debug mode (from .env or default to true in dev)
export const DEBUG_MODE = import.meta.env.VITE_DEBUG === 'true' || import.meta.env.DEV

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login/',
    REGISTER: '/auth/register/',
    REFRESH: '/auth/refresh/',
    USERS: '/auth/users/',
  },
  REQUESTS: '/requests/',
  CHAT: '/chat/',
  COMPANIES: '/companies/',
  CONTACTS: '/contacts/',
  DEALS: '/deals/',
  TASKS: '/tasks/',
  CONTENT_TYPE: '/contenttype/',
}

