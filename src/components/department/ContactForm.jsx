import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { chatAPI, contentTypeAPI, taskAPI } from '../../services/api'
import { getTodayDate, getNextBusinessDay } from '../../utils/dateHelpers'

function ContactForm({ department }) {
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
      // Get User ContentType ID (for sending message to department)
      // This creates a message that will be visible to department users
      const contentTypeData = await contentTypeAPI.get('auth', 'user')
      const userContentTypeId = contentTypeData.id

      // Create message - this will need department user ID
      // For now, we'll create a general message
      const messageData = {
        content: `Contact Form Submission from ${data.name} (${data.email})\n\nMessage: ${data.message}`,
        content_type: userContentTypeId,
        object_id: 1, // This should be a department user ID - needs proper implementation
      }

      await chatAPI.send(messageData)
      
      // Create a task for this contact form submission
      const startDate = getTodayDate()
      const endDate = getNextBusinessDay()
      
      const taskData = {
        name: data.subject || `Contact from ${data.name}`,
        description: `Contact Form Submission\n\nFrom: ${data.name} (${data.email})\n\nMessage:\n${data.message}`,
        start_date: startDate,
        due_date: endDate,
        // Stage will be set to default by the API if not provided
        // Owner will be set to current user by the API
      }

      await taskAPI.create(taskData)
      
      setSubmitStatus({ 
        type: 'success', 
        message: 'Message sent successfully! A task has been created and we will get back to you soon.' 
      })
      reset()
    } catch (error) {
      console.error('Error submitting contact form:', error)
      setSubmitStatus({ 
        type: 'error', 
        message: error.message || 'Failed to send message. Please try again.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h2 className="text-3xl font-bold text-theme-primary mb-6">
          Contact {department.shortName}
        </h2>
        <p className="text-theme-secondary mb-6">
          Have a question or need assistance? Send us a message and we'll get back to you as soon as possible.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="label">Your Name *</label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="input"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

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
            <label className="label">Subject</label>
            <input
              type="text"
              {...register('subject')}
              className="input"
            />
          </div>

          <div>
            <label className="label">Message *</label>
            <textarea
              {...register('message', { required: 'Please enter your message' })}
              rows="6"
              className="input"
              placeholder="How can we help you?"
            />
            {errors.message && (
              <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

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

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ContactForm

