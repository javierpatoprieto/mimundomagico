/**
 * Query Optimization Utilities
 * Prevents N+1 queries and optimizes database access patterns
 */

export interface QueryMetrics {
  queryName: string
  duration: number
  rowCount: number
  timestamp: Date
}

const metricsBuffer: QueryMetrics[] = []

/**
 * Track query performance
 */
export function recordQueryMetric(
  queryName: string,
  duration: number,
  rowCount: number
) {
  metricsBuffer.push({
    queryName,
    duration,
    rowCount,
    timestamp: new Date(),
  })

  // Keep only last 100 metrics
  if (metricsBuffer.length > 100) {
    metricsBuffer.shift()
  }

  // Warn if query takes > 200ms
  if (duration > 200) {
    console.warn(`[SLOW QUERY] ${queryName}: ${duration}ms`)
  }
}

/**
 * Get query performance report
 */
export function getQueryMetrics() {
  return {
    totalQueries: metricsBuffer.length,
    averageDuration:
      metricsBuffer.reduce((sum, m) => sum + m.duration, 0) / metricsBuffer.length || 0,
    slowQueries: metricsBuffer.filter((m) => m.duration > 200),
    lastQueries: metricsBuffer.slice(-10),
  }
}

/**
 * Optimized pattern: Fetch parent + children in single query
 * Instead of:
 *   const profiles = await supabase.from('profiles').select('*')
 *   profiles.forEach(p => {
 *     const stories = await supabase.from('stories').select('*').eq('profile_id', p.id)
 *   })
 *
 * Use:
 *   const data = await supabase.from('profiles').select('*, stories(*)')
 */
export const optimizationPatterns = {
  // Pattern 1: Use Supabase select() to get related data in one query
  fetchProfilesWithStories: `
    const { data, error } = await supabase
      .from('profiles')
      .select('id, name, avatar_emoji, stories(id, title, is_favorite)')
      .eq('user_id', userId)
  `,

  // Pattern 2: Batch queries instead of looping
  batchFetchStories: `
    const profileIds = profiles.map(p => p.id)
    const { data: stories } = await supabase
      .from('stories')
      .select('*')
      .in('profile_id', profileIds)
  `,

  // Pattern 3: Use LIMIT for pagination instead of fetching all
  paginatedQuery: `
    const { data, count } = await supabase
      .from('stories')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)
  `,

  // Pattern 4: Cache frequently accessed data
  cachedSubscriptionCheck: `
    // Cache for 5 minutes
    const cacheKey = 'subscription:\${userId}'
    const cached = await redis.get(cacheKey)
    if (cached) return cached

    const { data } = await supabase
      .from('subscriptions')
      .select('plan, expires_at')
      .eq('user_id', userId)
      .single()

    await redis.setex(cacheKey, 300, JSON.stringify(data))
    return data
  `,
}

/**
 * Query execution wrapper with timing and logging
 */
export async function executeQuery<T>(
  queryName: string,
  queryFn: () => Promise<T>
): Promise<T> {
  const startTime = performance.now()

  try {
    const result = await queryFn()
    const duration = performance.now() - startTime
    const rowCount = Array.isArray(result) ? result.length : 1

    recordQueryMetric(queryName, duration, rowCount)

    return result
  } catch (error) {
    const duration = performance.now() - startTime
    console.error(`[QUERY ERROR] ${queryName}: ${duration}ms`, error)
    throw error
  }
}

/**
 * Batch loader pattern to prevent N+1 queries
 */
export class BatchDataLoader<K, V> {
  private batch: Map<K, V[]> = new Map()
  private batchScheduled: boolean = false

  constructor(
    private batchFn: (keys: K[]) => Promise<Map<K, V[]>>
  ) {}

  async load(key: K): Promise<V[]> {
    if (!this.batch.has(key)) {
      this.batch.set(key, [])
    }

    if (!this.batchScheduled) {
      this.batchScheduled = true
      await new Promise((resolve) => setImmediate(resolve))
      await this.flush()
    }

    return this.batch.get(key) || []
  }

  private async flush() {
    const keys = Array.from(this.batch.keys())
    if (keys.length === 0) return

    const results = await this.batchFn(keys)
    this.batch = results
    this.batchScheduled = false
  }

  clear() {
    this.batch.clear()
  }
}
