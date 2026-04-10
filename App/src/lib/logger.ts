import * as Sentry from "@sentry/nextjs";

export type LogLevel = "info" | "warn" | "error" | "debug";

interface LogContext {
  userId?: string;
  requestId?: string;
  path?: string;
  method?: string;
  duration?: number;
  statusCode?: number;
  [key: string]: any;
}

/**
 * Structured Logger for application events
 * Logs to console and Sentry for error tracking
 *
 * Usage:
 * logger.info("User logged in", { userId: "123" });
 * logger.error("Database error", { error: err, query: "SELECT ..." });
 */
class Logger {
  private isDevelopment = process.env.NODE_ENV === "development";

  /**
   * Log info level message
   */
  info(message: string, context?: LogContext) {
    const logEntry = this.formatLog("info", message, context);
    console.log(JSON.stringify(logEntry));
  }

  /**
   * Log warning level message
   */
  warn(message: string, context?: LogContext) {
    const logEntry = this.formatLog("warn", message, context);
    console.warn(JSON.stringify(logEntry));

    // Send to Sentry
    Sentry.captureMessage(message, {
      level: "warning",
      contexts: { additional: context },
    });
  }

  /**
   * Log error level message
   */
  error(message: string, error?: Error | unknown, context?: LogContext) {
    const logEntry = this.formatLog("error", message, context);

    if (error instanceof Error) {
      logEntry.errorName = error.name;
      logEntry.errorMessage = error.message;
      logEntry.stack = error.stack;
    } else if (error) {
      logEntry.error = String(error);
    }

    console.error(JSON.stringify(logEntry));

    // Send to Sentry
    if (error instanceof Error) {
      Sentry.captureException(error, {
        tags: { service: context?.path || "unknown" },
        contexts: { additional: this.sanitizeContext(context) },
      });
    } else {
      Sentry.captureMessage(message, {
        level: "error",
        contexts: { additional: this.sanitizeContext(context) },
      });
    }
  }

  /**
   * Log debug level message (development only)
   */
  debug(message: string, context?: LogContext) {
    if (this.isDevelopment) {
      const logEntry = this.formatLog("debug", message, context);
      console.debug(JSON.stringify(logEntry));
    }
  }

  /**
   * Log API request/response
   */
  logRequest(method: string, path: string, statusCode: number, duration: number) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      type: "request",
      method,
      path,
      statusCode,
      duration: `${duration}ms`,
    };

    if (statusCode >= 400) {
      console.warn(JSON.stringify(logEntry));
    } else {
      console.log(JSON.stringify(logEntry));
    }
  }

  /**
   * Format log entry
   */
  private formatLog(level: LogLevel, message: string, context?: LogContext) {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...(context && this.sanitizeContext(context)),
    };
  }

  /**
   * Remove sensitive data from logs
   */
  private sanitizeContext(context?: LogContext): LogContext | undefined {
    if (!context) return undefined;

    const sensitiveKeys = [
      "password",
      "token",
      "secret",
      "apiKey",
      "creditCard",
      "ssn",
      "authorization",
    ];

    const sanitized: LogContext = {};

    for (const [key, value] of Object.entries(context)) {
      if (sensitiveKeys.some((sensitiveKey) =>
        key.toLowerCase().includes(sensitiveKey.toLowerCase())
      )) {
        sanitized[key] = "[REDACTED]";
      } else {
        sanitized[key] = value;
      }
    }

    return sanitized;
  }
}

export const logger = new Logger();

/**
 * Error handler middleware
 * Captures unhandled errors and logs them
 */
export function handleError(
  error: unknown,
  context?: LogContext
): { status: number; message: string } {
  if (error instanceof Error) {
    logger.error(error.message, error, context);

    // Return user-friendly error message
    return {
      status: 500,
      message: "An unexpected error occurred. Please try again later.",
    };
  }

  logger.error("Unknown error", undefined, context);
  return {
    status: 500,
    message: "An unexpected error occurred. Please try again later.",
  };
}
