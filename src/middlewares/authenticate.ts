// Node Modules
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

// Custom Modules
import { verifyAccessToken } from '@/lib/jwt';
import { logger } from '@/lib/winston';

// Types
import type { Request, Response, NextFunction } from 'express';
import type { Types } from 'mongoose';

/**
 * @function authenticate
 * @description Middleware to verify the user's access token from the request/Authorization header.
 *               If the token is valid, it attaches the user ID to the request object.
 *               Otherwise, it sends an error response.
 *
 * @param {Request} req - Express request object. Expects a Bearer token in the Authorization header.
 *
 * @param {Response} res - Express response object. Used to send the response back to the client.
 *
 * @param {NextFunction} next - Express next function. Calls the next middleware if the token is valid.
 *
 * @returns {void}
 **/

const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  // if there's no Bearer token, respond with 401 Unauthorized
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({
      code: 'AuthenticationError',
      message: 'Access denied. No access token provided.',
    });
    return;
  }

  // Split out the token from the 'Bearer ' prefix
  const [_, token] = authHeader.split(' ');

  try {
    // verify the token and extract the userId from the payload
    const jwtPayload = verifyAccessToken(token) as { userId: Types.ObjectId };

    // Attach the userId to the request object for use in subsequent middleware or route handlers
    req.userId = jwtPayload.userId;

    // Call the next middleware in the stack
    return next();
  } catch (error) {
    // Handle Expired Token Error
    if (error instanceof TokenExpiredError) {
      res.status(401).json({
        code: 'AuthenticationError',
        message:
          'Access token has expired. request a new one with refresh token.',
      });
      return;
    }

    // Handle Invalid Token Error
    if (error instanceof JsonWebTokenError) {
      res.status(401).json({
        code: 'AuthenticationError',
        message: 'Invalid access token provided.',
      });
      return;
    }

    // Catch-all for any other errors
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: error,
    });
    logger.error('Error during authentication', error);
  }
};

export default authenticate;
