/**
 * Simple in-memory rate limiter for API routes.
 * Resets on server restart — good enough for Vercel serverless.
 */

const store = new Map<string, { count: number; resetAt: number }>()

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: limit - 1 }
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0 }
  }

  entry.count++
  return { allowed: true, remaining: limit - entry.count }
}

// Cleanup old entries periodically
setInterval(() => {
  const now = Date.now()
  store.forEach((val, key) => {
    if (now > val.resetAt) store.delete(key)
  })
}, 60000)
