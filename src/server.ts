// Node Modules
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';

// Custom Modules
import config from '@/config';
import limiter from '@/lib/express_rate_limit';
import { connectToDatabase, disconnectFromDatabase } from '@/lib/mongoose';
import { logger } from '@/lib/winston';

// Router
import v1Routes from '@/routes/v1';

// Types
import { CorsOptions } from 'cors';

// Express app Initialization
const app = express();

// Configure CORS options
const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (
      config.NODE_ENV === 'development' ||
      !origin ||
      config.WHITELIST_ORIGINS.includes(origin)
    ) {
      callback(null, true);
    } else {
      // Reject the request if the origin is not whitelisted
      callback(
        new Error(`CORS error: ${origin} is not allowed by CORS`),
        false,
      );
      logger.warn(`CORS error: ${origin} is not allowed by CORS`);
    }
  },
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Enable JSON request body parsing
app.use(express.json());

// Enable URL-encoded request body parsing
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Enable compression to reduce payload size and improve performance
app.use(
  compression({
    threshold: 1024, // Compress responses larger than 1KB
  }),
);

// Use Helmet to enhance security by setting various HTTP headers
app.use(helmet());

// Apply rate limiting middleware to prevent excessive requests and DDoS attacks
app.use(limiter);

/*
 * Immediately Invoked Function Expression (IIFE) to start the server
 * - Tries to connect to the database before initializing the server
 * - Defines the API routes under the `/api/v1` path
 * - If an error occurs, it logs the error and exits the process in production
 * - If successful, it starts the server and listens on the specified port
 */
(async () => {
  try {
    await connectToDatabase();

    app.use('/api/v1', v1Routes);

    app.listen(config.PORT, () => {
      logger.info(`Server is running: http://localhost:${config.PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start the server:', error);
    if (config.NODE_ENV === 'production') {
      process.exit(1); // Exit the process in production on error
    }
  }
})();

/*
 * Handles server shutdown gracefully by disconnecting from the database.
 * - Attempts to close the server and database connection.
 * - Logs a success message indicating the server is shutting down.
 * - If an error occurs during shutdown, it logs the error.
 * - Exits the process with a success code (0). (indicating a clean shutdown)
 */

const handleServerShutdown = async () => {
  try {
    await disconnectFromDatabase();
    logger.warn('Server SHUTDOWN');
    process.exit(0);
  } catch (error) {
    logger.error('Error during server shutdown:', error);
    process.exit(1);
  }
};

// Listen for termination signals to handle graceful shutdown
process.on('SIGTERM', handleServerShutdown);
process.on('SIGINT', handleServerShutdown);
