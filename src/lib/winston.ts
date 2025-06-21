import winston from 'winston';

import config from '@/config';

const { combine, timestamp, json, errors, align, printf, colorize } =
  winston.format;

// Define the transports array to hold the logging transports
const transports: winston.transport[] = [];

// if the application is not in production, add the Console transport
if (config.NODE_ENV !== 'production') {
  transports.push(
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }), // Add colours to all log levels
        timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }), // Add timestamp to each log
        align(), // Align the log messages
        printf(({ level, message, timestamp, ...meta }) => {
          const metaStr = Object.keys(meta).length
            ? `\n${JSON.stringify(meta)}`
            : '';

          return `${timestamp} [${level}]: ${message}${metaStr}`;
        }),
      ),
    }),
  );
}

// create a logger instance using winston
const logger = winston.createLogger({
  level: config.LOG_LEVEL || 'info', // Set the log level from config or default to 'info'
  format: combine(timestamp(), errors({ stack: true }), json()), // Combine formats for structured logging
  transports,
  silent: config.NODE_ENV === 'test', // Disable logs in test environment
});

export { logger };
