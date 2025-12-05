import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../services/api'

const AuthContext = createContext(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [company, setCompany] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(null)

  // Load auth state from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token')
    const storedUser = localStorage.getItem('auth_user')
    const storedCompany = localStorage.getItem('auth_company')
    
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
      if (storedCompany) {
        setCompany(JSON.parse(storedCompany))
      }
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    try {
      const response = await authAPI.login(username, password)
      const { access, refresh, user: userData } = response
      
      // Store tokens and user data
      localStorage.setItem('auth_token', access)
      localStorage.setItem('auth_refresh', refresh)
      localStorage.setItem('auth_user', JSON.stringify(userData))
      
      setToken(access)
      setUser(userData)
      
      // Get company from response if available
      if (response.company) {
        setCompany(response.company)
        localStorage.setItem('auth_company', JSON.stringify(response.company))
      }
      
      return { success: true, user: userData }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const register = async (registrationData) => {
    try {
      const response = await authAPI.register(registrationData)
      const { tokens, user: userData, company: companyData, message } = response
      
      // Store tokens and user data
      localStorage.setItem('auth_token', tokens.access)
      localStorage.setItem('auth_refresh', tokens.refresh)
      localStorage.setItem('auth_user', JSON.stringify(userData))
      if (companyData) {
        localStorage.setItem('auth_company', JSON.stringify(companyData))
      }
      
      setToken(tokens.access)
      setUser(userData)
      if (companyData) {
        setCompany(companyData)
      }
      
      return { 
        success: true, 
        user: userData, 
        company: companyData,
        message: message || 'Registration successful! Your account is pending approval.'
      }
    } catch (error) {
      console.error('Registration error:', error)
      // Handle error object from API
      let errorMessage = error.message || 'Registration failed. Please try again.'
      if (error.response && error.response.data) {
        const errorData = error.response.data
        if (errorData.error && typeof errorData.error === 'object') {
          // Multiple validation errors
          errorMessage = errorData.error
        } else if (errorData.error) {
          errorMessage = errorData.error
        }
      }
      return { success: false, error: errorMessage }
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_refresh')
    localStorage.removeItem('auth_user')
    localStorage.removeItem('auth_company')
    setToken(null)
    setUser(null)
    setCompany(null)
  }

  const isAuthenticated = () => {
    return !!token && !!user
  }

  const value = {
    user,
    company,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

