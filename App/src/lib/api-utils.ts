/**
 * API Utilities - Shared functions for API routes
 */

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  code?: string
}

export interface ApiError {
  message: string
  code: string
  statusCode: number
}

/**
 * Format consistent API responses
 */
export function successResponse<T>(data: T, statusCode = 200): [ApiResponse<T>, number] {
  return [{ success: true, data }, statusCode]
}

export function errorResponse(message: string, code = 'ERROR', statusCode = 400): [ApiResponse, number] {
  return [{ success: false, error: message, code }, statusCode]
}

/**
 * Input validation helpers
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validateAge(age: number): boolean {
  return age >= 2 && age <= 10
}

/**
 * Escape HTML special characters to prevent injection attacks
 * Used for all dynamic values in email templates and HTML content
 */
export function escapeHtml(text: string): string {
  const escapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }
  return text.replace(/[&<>"']/g, (char) => escapeMap[char] || char)
}

export function sanitizeString(input: string, maxLength = 1000): string {
  return input.trim().slice(0, maxLength).replace(/[<>]/g, '')
}

export function sanitizeArray(arr: unknown[]): string[] {
  if (!Array.isArray(arr)) return []
  return arr
    .map((item) => {
      if (typeof item === 'string') return sanitizeString(item, 100)
      return ''
    })
    .filter(Boolean)
}

/**
 * Logger for API operations
 */
export function logOperation(operation: string, details: Record<string, unknown>) {
  const timestamp = new Date().toISOString()
  console.log(`[${timestamp}] [${operation}]`, JSON.stringify(details, null, 2))
}

export function logError(operation: string, error: unknown, details?: Record<string, unknown>) {
  const timestamp = new Date().toISOString()
  const errorMsg = error instanceof Error ? error.message : String(error)
  console.error(`[${timestamp}] [${operation}] ERROR:`, errorMsg, details)
}
