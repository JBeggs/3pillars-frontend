import { useNavigate, Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { getAllDepartments } from '../config/departments'
import ThemeSwitcher from '../components/common/ThemeSwitcher'

function Landing() {
  const navigate = useNavigate()
  const departments = getAllDepartments()
  const { currentTheme } = useTheme()

  const handlePillarClick = (pillarId) => {
    navigate(`/department/${pillarId}`)
  }

  // Get gradient classes from theme
  const gradientClass = `bg-gradient-to-br ${currentTheme.colors.background.gradient}`

  return (
    <div className={`min-h-screen ${gradientClass}`}>
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Three Pillars</h1>
          <div className="flex gap-4 items-center">
            <ThemeSwitcher />
            <Link
              to="/login"
              className="btn bg-white bg-opacity-20 text-white hover:bg-opacity-30 border border-white border-opacity-30"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn btn-primary"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            Three Pillars of Success
          </h2>
          <p className="text-xl text-white text-opacity-90 max-w-2xl mx-auto">
            Connect with our business through three core pillars. 
            Choose your department to get started.
          </p>
        </div>

        {/* Pillar Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="card card-hover cursor-pointer"
              onClick={() => handlePillarClick(dept.id)}
            >
              <div className="text-6xl mb-4 text-center">{dept.icon}</div>
              <h3 className="text-2xl font-bold text-theme-primary mb-3 text-center">
                {dept.name}
              </h3>
              <p className="text-theme-secondary mb-6 text-center">
                {dept.description}
              </p>
              <button
                className="btn btn-primary w-full"
                onClick={(e) => {
                  e.stopPropagation()
                  handlePillarClick(dept.id)
                }}
              >
                Enter Department
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-white text-opacity-80">
        <p>&copy; 2024 Three Pillars Business Portal. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Landing

