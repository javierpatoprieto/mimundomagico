import { NextRequest, NextResponse } from 'next/server'

// In-memory rate limit store (use Redis in production)
interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

// Clean old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key)
    }
  }
}, 5 * 60 * 1000)

/**
 * Rate limiter middleware
 * @param req - NextRequest
 * @param limit - Max requests
 * @param windowMs - Time window in milliseconds
 * @returns { allowed: boolean, remaining: number, resetTime: number }
 */
export function checkRateLimit(
  req: NextRequest,
  limit: number = 100,
  windowMs: number = 60 * 1000 // 1 minute default
): {
  allowed: boolean
  remaining: number
  resetTime: number
  retryAfter?: number
} {
  const ip = getClientIp(req)
  const key = `${ip}`
  const now = Date.now()

  let entry = rateLimitStore.get(key)

  if (!entry || entry.resetTime < now) {
    // Create new entry
    entry = {
      count: 1,
      resetTime: now + windowMs,
    }
    rateLimitStore.set(key, entry)
    return {
      allowed: true,
      remaining: limit - 1,
      resetTime: entry.resetTime,
    }
  }

  entry.count++

  if (entry.count > limit) {
    const retryAfter = Math.ceil((entry.resetTime - now) / 1000)
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
      retryAfter,
    }
  }

  return {
    allowed: true,
    remaining: limit - entry.count,
    resetTime: entry.resetTime,
  }
}

/**
 * Get client IP from request
 */
function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  const real = req.headers.get('x-real-ip')

  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  if (real) {
    return real
  }

  return 'unknown'
}

/**
 * Format rate limit response
 */
export function rateLimitResponse(result: ReturnType<typeof checkRateLimit>) {
  const response = NextResponse.json(
    {
      error: 'Too Many Requests',
      message: 'Rate limit exceeded. Please try again later.',
      retryAfter: result.retryAfter,
    },
    { status: 429 }
  )

  // Add rate limit headers
  response.headers.set('X-RateLimit-Limit', '100')
  response.headers.set('X-RateLimit-Remaining', '0')
  response.headers.set('X-RateLimit-Reset', new Date(result.resetTime).toISOString())

  if (result.retryAfter) {
    response.headers.set('Retry-After', String(result.retryAfter))
  }

  return response
}

/**
 * Add rate limit headers to successful response
 */
export function addRateLimitHeaders(
  response: NextResponse,
  result: ReturnType<typeof checkRateLimit>
) {
  response.headers.set('X-RateLimit-Limit', '100')
  response.headers.set('X-RateLimit-Remaining', String(result.remaining))
  response.headers.set('X-RateLimit-Reset', new Date(result.resetTime).toISOString())
  return response
}
