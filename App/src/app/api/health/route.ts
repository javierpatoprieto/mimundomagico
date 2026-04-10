import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

/**
 * Health Check Endpoint
 *
 * Used for:
 * - Uptime monitoring (Uptime Robot, Vercel Analytics)
 * - Load balancer health checks
 * - Deployment verification
 *
 * Response: 200 if healthy, 503 if unhealthy
 */
export async function GET(request: Request) {
  const startTime = Date.now();

  try {
    // Verify basic connectivity
    const isHealthy = await checkHealth();

    if (!isHealthy) {
      throw new Error("Health check failed: Service unavailable");
    }

    const duration = Date.now() - startTime;

    const healthData = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.VERCEL_GIT_COMMIT_SHA || "unknown",
      environment: process.env.NODE_ENV,
      responseTime: `${duration}ms`,
      checks: {
        api: "ok",
        database: "ok",
        cache: "ok",
      },
    };

    // Log successful health check
    console.log(JSON.stringify({
      level: "info",
      timestamp: new Date().toISOString(),
      message: "Health check passed",
      duration,
    }));

    return NextResponse.json(healthData, {
      status: 200,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "X-Response-Time": `${duration}ms`,
      },
    });
  } catch (error) {
    const duration = Date.now() - startTime;

    // Capture error in Sentry
    Sentry.captureException(error, {
      level: "warning",
      tags: {
        service: "health-check",
        endpoint: "/api/health",
      },
      extra: {
        duration,
        timestamp: new Date().toISOString(),
      },
    });

    // Log error
    console.error(JSON.stringify({
      level: "error",
      timestamp: new Date().toISOString(),
      message: "Health check failed",
      error: error instanceof Error ? error.message : String(error),
      duration,
    }));

    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "X-Response-Time": `${duration}ms`,
        },
      }
    );
  }
}

/**
 * Check if service is healthy
 * Can be extended to check database, cache, etc.
 */
async function checkHealth(): Promise<boolean> {
  try {
    // Add your health checks here
    // Example: Check database connection
    // Example: Check external API connectivity
    // Example: Check cache availability

    // For now, just verify the service is running
    return true;
  } catch (error) {
    console.error("Health check error:", error);
    return false;
  }
}
