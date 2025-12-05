import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { requestAPI, taskAPI } from '../../services/api'
import { getTodayDate, getNextBusinessDay } from '../../utils/dateHelpers'

function RequestForm({ department }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Create request in Django CRM
      const requestData = {
        request_for: data.service || 'Service Request',
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        company_name: data.companyName,
        remark: data.message,
        department: department.id, // This will need to map to Django Group ID
      }

      await requestAPI.create(requestData)
      
      // Create a task for this service request
      const startDate = getTodayDate()
      const endDate = getNextBusinessDay()
      
      const taskData = {
        name: data.service || `Service Request from ${data.firstName} ${data.lastName}`,
        description: `Service Request\n\nService: ${data.service || 'Not specified'}\nFrom: ${data.firstName} ${data.lastName}\nEmail: ${data.email}\nPhone: ${data.phone || 'Not provided'}\nCompany: ${data.companyName || 'Not provided'}\n\nRequirements:\n${data.message}`,
        start_date: startDate,
        due_date: endDate,
        // Stage will be set to default by the API if not provided
        // Owner will be set to current user by the API
      }

      await taskAPI.create(taskData)
      
      setSubmitStatus({ 
        type: 'success', 
        message: 'Request submitted successfully! A task has been created and we will process your request soon.' 
      })
      reset()
    } catch (error) {
      console.error('Error submitting request form:', error)
      setSubmitStatus({ 
        type: 'error', 
        message: error.message || 'Failed to submit request. Please try again.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h2 className="text-3xl font-bold text-theme-primary mb-6">
          Request a Service
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Service Selection */}
          <div>
            <label className="label">Service</label>
            <select
              {...register('service', { required: 'Please select a service' })}
              className="input"
            >
              <option value="">Select a service</option>
              {department.services.map((service) => (
                <option key={service.id} value={service.name}>
                  {service.name}
                </option>
              ))}
            </select>
            {errors.service && (
              <p className="text-red-600 text-sm mt-1">{errors.service.message}</p>
            )}
          </div>

          {/* Name Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">First Name *</label>
              <input
                type="text"
                {...register('firstName', { required: 'First name is required' })}
                className="input"
              />
              {errors.firstName && (
                <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label className="label">Last Name *</label>
              <input
                type="text"
                {...register('lastName', { required: 'Last name is required' })}
                className="input"
              />
              {errors.lastName && (
                <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <label className="label">Email *</label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              className="input"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="label">Phone</label>
            <input
              type="tel"
              {...register('phone')}
              className="input"
            />
          </div>

          <div>
            <label className="label">Company Name</label>
            <input
              type="text"
              {...register('companyName')}
              className="input"
            />
          </div>

          {/* Message */}
          <div>
            <label className="label">Message / Requirements *</label>
            <textarea
              {...register('message', { required: 'Please provide details about your request' })}
              rows="6"
              className="input"
              placeholder="Describe your service request, requirements, timeline, etc."
            />
            {errors.message && (
              <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Status */}
          {submitStatus && (
            <div
              className={`p-4 rounded-lg ${
                submitStatus.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default RequestForm

