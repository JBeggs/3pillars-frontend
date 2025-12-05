import ThemeSwitcher from '../common/ThemeSwitcher'

function Header({ department, onHome }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={onHome}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Home
            </button>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{department.icon}</span>
              <div>
                <h1 className="text-2xl font-bold text-theme-primary">
                  {department.name}
                </h1>
                <p className="text-sm text-theme-secondary">{department.description}</p>
              </div>
            </div>
          </div>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  )
}

export default Header

