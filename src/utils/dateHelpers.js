/**
 * Date utility functions
 */

/**
 * Get today's date in YYYY-MM-DD format
 */
export function getTodayDate() {
  const today = new Date()
  return formatDate(today)
}

/**
 * Get next business day (or Monday if weekend)
 * @returns {string} Date in YYYY-MM-DD format
 */
export function getNextBusinessDay() {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  const dayOfWeek = tomorrow.getDay() // 0 = Sunday, 6 = Saturday
  
  // If it's Saturday (6), add 2 days to get Monday
  if (dayOfWeek === 6) {
    tomorrow.setDate(tomorrow.getDate() + 2)
  }
  // If it's Sunday (0), add 1 day to get Monday
  else if (dayOfWeek === 0) {
    tomorrow.setDate(tomorrow.getDate() + 1)
  }
  
  return formatDate(tomorrow)
}

/**
 * Format date to YYYY-MM-DD format
 * @param {Date} date - Date object to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Format date to ISO string for API (YYYY-MM-DDTHH:mm:ss format)
 * @param {Date} date - Date object to format
 * @returns {string} ISO formatted date string
 */
export function formatDateForAPI(date) {
  return date.toISOString().split('T')[0] // Returns YYYY-MM-DD
}

