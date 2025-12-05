import axios from 'axios'
import { API_BASE_URL, API_ENDPOINTS } from '../config/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token and company ID
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Add company ID from stored company data
    const companyData = localStorage.getItem('auth_company')
    if (companyData) {
      try {
        const company = JSON.parse(companyData)
        if (company.id) {
          config.headers['X-Company-Id'] = company.id
        }
      } catch (e) {
        // Ignore parse errors
      }
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // Server responded with error
      const errorData = error.response.data
      // Handle different error formats
      let errorMessage = 'An error occurred'
      if (typeof errorData === 'string') {
        errorMessage = errorData
      } else if (errorData.error) {
        errorMessage = typeof errorData.error === 'string' ? errorData.error : JSON.stringify(errorData.error)
      } else if (errorData.detail) {
        errorMessage = errorData.detail
      } else if (errorData.message) {
        errorMessage = errorData.message
      } else if (typeof errorData === 'object') {
        // Try to extract first error message from object
        const firstKey = Object.keys(errorData)[0]
        if (firstKey) {
          const firstError = errorData[firstKey]
          errorMessage = Array.isArray(firstError) ? firstError[0] : firstError
        }
      }
      const apiError = new Error(errorMessage)
      apiError.response = error.response
      throw apiError
    } else if (error.request) {
      // Request made but no response
      throw new Error('Network error. Please check your connection.')
    } else {
      // Something else happened
      throw new Error(error.message || 'An unexpected error occurred')
    }
  }
)

// Auth API
export const authAPI = {
  login: (username, password) => {
    return api.post(API_ENDPOINTS.AUTH.LOGIN, { username, password })
  },
  register: (userData) => {
    return api.post(API_ENDPOINTS.AUTH.REGISTER, userData)
  },
  getUsers: () => {
    return api.get(API_ENDPOINTS.AUTH.USERS)
  },
}

// Request API
export const requestAPI = {
  create: (requestData) => {
    return api.post(API_ENDPOINTS.REQUESTS, requestData)
  },
  get: (id) => {
    return api.get(`${API_ENDPOINTS.REQUESTS}${id}/`)
  },
  list: (params) => {
    return api.get(API_ENDPOINTS.REQUESTS, { params })
  },
}

// Chat/Message API
export const chatAPI = {
  send: (messageData) => {
    return api.post(API_ENDPOINTS.CHAT, messageData)
  },
  list: (params) => {
    return api.get(API_ENDPOINTS.CHAT, { params })
  },
  forObject: (contentTypeId, objectId) => {
    return api.get(`${API_ENDPOINTS.CHAT}for_object/`, {
      params: { content_type_id: contentTypeId, object_id: objectId },
    })
  },
}

// Company API
export const companyAPI = {
  create: (companyData) => {
    return api.post(API_ENDPOINTS.COMPANIES, companyData)
  },
  get: (id) => {
    return api.get(`${API_ENDPOINTS.COMPANIES}${id}/`)
  },
}

// Contact API
export const contactAPI = {
  create: (contactData) => {
    return api.post(API_ENDPOINTS.CONTACTS, contactData)
  },
}

// Deal API
export const dealAPI = {
  create: (dealData) => {
    return api.post(API_ENDPOINTS.DEALS, dealData)
  },
}

// Task API
export const taskAPI = {
  create: (taskData) => {
    return api.post(API_ENDPOINTS.TASKS, taskData)
  },
}

// ContentType API
export const contentTypeAPI = {
  get: (app, model) => {
    return api.get(API_ENDPOINTS.CONTENT_TYPE, {
      params: { app, model },
    })
  },
}

export default api

