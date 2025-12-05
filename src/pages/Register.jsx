import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Modal from '../components/common/Modal'

function Register() {
  const [formData, setFormData] = useState({
    // User fields
    username: '',
    email: '',
    password: '',
    password_confirm: '',
    first_name: '',
    last_name: '',
    // Company fields
    company_name: '',
    company_email: '',
    company_phone: '',
    company_website: '',
    company_address_street: '',
    company_address_city: '',
    company_address_province: '',
    company_address_postal_code: '',
    company_address_country: 'ZA',
    company_registration_number: '',
    company_tax_number: '',
  })
  
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Basic validation
    if (!formData.username || !formData.email || !formData.password) {
      setError('Please fill in all required fields')
      setLoading(false)
      return
    }

    if (formData.password !== formData.password_confirm) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (!formData.company_name || !formData.company_email) {
      setError('Company name and email are required')
      setLoading(false)
      return
    }

    const result = await register(formData)
    
    if (result.success) {
      // Show success modal with full message
      const message = result.message || 'Registration successful! Your account is pending approval. You will be notified once your account is activated.'
      setSuccessMessage(message)
      setShowSuccessModal(true)
    } else {
      // Handle validation errors
      if (result.error && typeof result.error === 'object') {
        const errorMessages = Object.values(result.error).flat()
        setError(errorMessages.join(', '))
      } else {
        setError(result.error || 'Registration failed. Please try again.')
      }
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Register Your Business
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Create an account to manage your products and orders
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* User Account Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Account Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="password_confirm" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    id="password_confirm"
                    name="password_confirm"
                    required
                    value={formData.password_confirm}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Company Information Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Business Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="company_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Business Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="company_name"
                    name="company_name"
                    required
                    value={formData.company_name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="company_email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Business Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="company_email"
                    name="company_email"
                    required
                    value={formData.company_email}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="company_phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Business Phone
                  </label>
                  <input
                    type="tel"
                    id="company_phone"
                    name="company_phone"
                    value={formData.company_phone}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="company_website" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Website
                  </label>
                  <input
                    type="url"
                    id="company_website"
                    name="company_website"
                    value={formData.company_website}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="company_address_street" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="company_address_street"
                    name="company_address_street"
                    value={formData.company_address_street}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="company_address_city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    City
                  </label>
                  <input
                    type="text"
                    id="company_address_city"
                    name="company_address_city"
                    value={formData.company_address_city}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="company_address_province" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Province
                  </label>
                  <input
                    type="text"
                    id="company_address_province"
                    name="company_address_province"
                    value={formData.company_address_province}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="company_address_postal_code" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="company_address_postal_code"
                    name="company_address_postal_code"
                    value={formData.company_address_postal_code}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="company_registration_number" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    id="company_registration_number"
                    name="company_registration_number"
                    value={formData.company_registration_number}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="company_tax_number" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Tax Number
                  </label>
                  <input
                    type="text"
                    id="company_tax_number"
                    name="company_tax_number"
                    value={formData.company_tax_number}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link
                to="/login"
                className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                Already have an account? Sign in
              </Link>
              
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Registering...' : 'Register Business'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false)
          navigate('/dashboard')
        }}
        title="Registration Successful!"
        size="md"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 dark:bg-green-900 rounded-full">
            <svg
              className="w-8 h-8 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {successMessage}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Register

