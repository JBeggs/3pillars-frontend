function Services({ department }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <h2 className="text-3xl font-bold text-theme-primary mb-6">
          Available Services
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {department.services.map((service) => (
            <div
              key={service.id}
              className="p-6 rounded-lg border border-theme hover:border-primary-500 transition-colors"
              style={{ backgroundColor: 'var(--color-bg-surface)' }}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold text-theme-primary">
                  {service.name}
                </h3>
                <span 
                  className="px-2 py-1 text-xs font-medium rounded"
                  style={{
                    backgroundColor: 'var(--color-primary-100)',
                    color: 'var(--color-primary-700)',
                  }}
                >
                  {service.category}
                </span>
              </div>
              <p className="text-theme-secondary">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Services

