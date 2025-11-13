import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

interface ApiError extends Error {
  status?: number;
  details?: unknown;
}

export const errorHandler = (err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status ?? 500;
  const payload = {
    error: {
      message: err.message ?? 'Internal server error',
      details: err.details ?? null,
    },
  };

  if (status >= 500) {
    logger.error('Unhandled error', { error: err.message, stack: err.stack });
  } else {
    logger.warn('API error', { status, message: err.message });
  }

  res.status(status).json(payload);
};

