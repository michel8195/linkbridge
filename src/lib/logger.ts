type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  context?: string;
  data?: Record<string, unknown>;
  timestamp: string;
}

function createEntry(
  level: LogLevel,
  message: string,
  context?: string,
  data?: Record<string, unknown>
): LogEntry {
  return {
    level,
    message,
    context,
    data,
    timestamp: new Date().toISOString(),
  };
}

function format(entry: LogEntry): string {
  const prefix = `[${entry.timestamp}] [${entry.level.toUpperCase()}]`;
  const ctx = entry.context ? ` [${entry.context}]` : "";
  const dataStr = entry.data ? ` ${JSON.stringify(entry.data)}` : "";
  return `${prefix}${ctx} ${entry.message}${dataStr}`;
}

export const logger = {
  debug(message: string, context?: string, data?: Record<string, unknown>) {
    if (process.env.NODE_ENV === "development") {
      console.debug(format(createEntry("debug", message, context, data)));
    }
  },

  info(message: string, context?: string, data?: Record<string, unknown>) {
    console.log(format(createEntry("info", message, context, data)));
  },

  warn(message: string, context?: string, data?: Record<string, unknown>) {
    console.warn(format(createEntry("warn", message, context, data)));
  },

  error(
    message: string,
    context?: string,
    data?: Record<string, unknown>,
    error?: unknown
  ) {
    const errorData = {
      ...data,
      ...(error instanceof Error && {
        errorMessage: error.message,
        errorStack:
          process.env.NODE_ENV === "development" ? error.stack : undefined,
      }),
    };
    console.error(format(createEntry("error", message, context, errorData)));
  },
};
