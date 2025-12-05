function Overview({ department }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="card mb-6">
        <h2 className="text-3xl font-bold text-theme-primary mb-4">
          {department.name}
        </h2>
        <p className="text-theme-secondary text-lg leading-relaxed">
          {department.description}
        </p>
      </div>

      <div className="card">
        <h3 className="text-2xl font-bold text-theme-primary mb-4">Our Services</h3>
        <p className="text-theme-secondary mb-4">
          We offer a comprehensive range of services to help your business succeed.
          Explore our services tab to learn more about what we can do for you.
        </p>
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {department.services.slice(0, 4).map((service) => (
            <div
              key={service.id}
              className="p-4 rounded-lg border border-theme"
              style={{ backgroundColor: 'var(--color-bg-surface)' }}
            >
              <h4 className="font-semibold text-theme-primary mb-2">
                {service.name}
              </h4>
              <p className="text-sm text-theme-secondary">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Overview

