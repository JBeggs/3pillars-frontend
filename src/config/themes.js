// Theme Configuration - 5 Professional Themes

export const themes = {
  ocean: {
    id: 'ocean',
    name: 'Ocean Blue',
    description: 'Calm and professional blue tones',
    colors: {
      primary: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0ea5e9',
        600: '#0284c7',
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e',
      },
      accent: {
        DEFAULT: '#06b6d4',
        light: '#22d3ee',
        dark: '#0891b2',
      },
      background: {
        gradient: 'from-blue-600 via-blue-700 to-blue-900',
        card: '#ffffff',
        surface: '#f8fafc',
      },
      text: {
        primary: '#1e293b',
        secondary: '#64748b',
        inverse: '#ffffff',
      },
    },
  },
  forest: {
    id: 'forest',
    name: 'Forest Green',
    description: 'Natural and trustworthy green palette',
    colors: {
      primary: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d',
      },
      accent: {
        DEFAULT: '#10b981',
        light: '#34d399',
        dark: '#059669',
      },
      background: {
        gradient: 'from-green-600 via-green-700 to-green-900',
        card: '#ffffff',
        surface: '#f0fdf4',
      },
      text: {
        primary: '#1e293b',
        secondary: '#64748b',
        inverse: '#ffffff',
      },
    },
  },
  sunset: {
    id: 'sunset',
    name: 'Sunset Purple',
    description: 'Creative and modern purple gradient',
    colors: {
      primary: {
        50: '#faf5ff',
        100: '#f3e8ff',
        200: '#e9d5ff',
        300: '#d8b4fe',
        400: '#c084fc',
        500: '#a855f7',
        600: '#9333ea',
        700: '#7e22ce',
        800: '#6b21a8',
        900: '#581c87',
      },
      accent: {
        DEFAULT: '#8b5cf6',
        light: '#a78bfa',
        dark: '#7c3aed',
      },
      background: {
        gradient: 'from-purple-600 via-purple-700 to-purple-900',
        card: '#ffffff',
        surface: '#faf5ff',
      },
      text: {
        primary: '#1e293b',
        secondary: '#64748b',
        inverse: '#ffffff',
      },
    },
  },
  charcoal: {
    id: 'charcoal',
    name: 'Charcoal Gray',
    description: 'Sophisticated and minimalist gray tones',
    colors: {
      primary: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      },
      accent: {
        DEFAULT: '#6366f1',
        light: '#818cf8',
        dark: '#4f46e5',
      },
      background: {
        gradient: 'from-gray-700 via-gray-800 to-gray-900',
        card: '#ffffff',
        surface: '#f9fafb',
      },
      text: {
        primary: '#111827',
        secondary: '#6b7280',
        inverse: '#ffffff',
      },
    },
  },
  crimson: {
    id: 'crimson',
    name: 'Crimson Red',
    description: 'Bold and energetic red palette',
    colors: {
      primary: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
      },
      accent: {
        DEFAULT: '#dc2626',
        light: '#f87171',
        dark: '#991b1b',
      },
      background: {
        gradient: 'from-red-600 via-red-700 to-red-900',
        card: '#ffffff',
        surface: '#fef2f2',
      },
      text: {
        primary: '#1e293b',
        secondary: '#64748b',
        inverse: '#ffffff',
      },
    },
  },
}

export const defaultTheme = 'ocean'

export const getTheme = (themeId) => themes[themeId] || themes[defaultTheme]

export const getAllThemes = () => Object.values(themes)

