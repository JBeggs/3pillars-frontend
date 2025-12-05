import { useTheme } from '../../context/ThemeContext'
import { getAllThemes } from '../../config/themes'

function ThemeSwitcher({ className = '' }) {
  const { currentThemeId, changeTheme } = useTheme()
  const themes = getAllThemes()

  return (
    <div className={`relative ${className}`}>
      <select
        value={currentThemeId}
        onChange={(e) => changeTheme(e.target.value)}
        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent cursor-pointer"
        aria-label="Select theme"
      >
        {themes.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  )
}

export default ThemeSwitcher

