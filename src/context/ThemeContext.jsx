import { createContext, useContext, useState, useEffect } from 'react'
import { getTheme, defaultTheme } from '../config/themes'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [currentThemeId, setCurrentThemeId] = useState(() => {
    // Load from localStorage or use default
    return localStorage.getItem('theme') || defaultTheme
  })

  const currentTheme = getTheme(currentThemeId)

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('theme', currentThemeId)
    
    // Apply theme to document root
    const root = document.documentElement
    const theme = currentTheme.colors

    // Set CSS variables for primary colors
    Object.entries(theme.primary).forEach(([key, value]) => {
      root.style.setProperty(`--color-primary-${key}`, value)
    })

    // Set accent colors
    root.style.setProperty('--color-accent', theme.accent.DEFAULT)
    root.style.setProperty('--color-accent-light', theme.accent.light)
    root.style.setProperty('--color-accent-dark', theme.accent.dark)

    // Set background colors
    root.style.setProperty('--color-bg-card', theme.background.card)
    root.style.setProperty('--color-bg-surface', theme.background.surface)

    // Set text colors
    root.style.setProperty('--color-text-primary', theme.text.primary)
    root.style.setProperty('--color-text-secondary', theme.text.secondary)
    root.style.setProperty('--color-text-inverse', theme.text.inverse)

    // Set gradient classes
    root.setAttribute('data-theme', currentThemeId)
  }, [currentThemeId, currentTheme])

  const changeTheme = (themeId) => {
    setCurrentThemeId(themeId)
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, currentThemeId, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

