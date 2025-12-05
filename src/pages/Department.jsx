import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { getDepartment } from '../config/departments'
import Header from '../components/layout/Header'
import Overview from '../components/department/Overview'
import Services from '../components/department/Services'
import RequestForm from '../components/department/RequestForm'
import ContactForm from '../components/department/ContactForm'

function Department() {
  const { pillar } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  
  const department = getDepartment(pillar)

  if (!department) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Department not found</h1>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Go Home
          </button>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'services', label: 'Services' },
    { id: 'request', label: 'Request Service' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header department={department} onHome={() => navigate('/')} />
      
      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-theme-secondary hover:text-theme-primary'
                }`}
                style={{
                  borderBottomColor: activeTab === tab.id ? 'var(--color-primary-600)' : 'transparent',
                  color: activeTab === tab.id ? 'var(--color-primary-600)' : undefined,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'overview' && <Overview department={department} />}
        {activeTab === 'services' && <Services department={department} />}
        {activeTab === 'request' && <RequestForm department={department} />}
        {activeTab === 'contact' && <ContactForm department={department} />}
      </main>
    </div>
  )
}

export default Department

