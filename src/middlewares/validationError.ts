import { validationResult } from 'express-validator';

// Types
import type { Request, Response, NextFunction } from 'express';

const validationError = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      code: 'ValidationError',
      errors: errors.mapped(),
    });
    return;
  }
  next();
};

export default validationError;
