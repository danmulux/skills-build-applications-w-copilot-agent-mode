import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  status?: number;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || 'Internal server error';

  console.error(`[${status}] ${message}`);

  res.status(status).json({
    error: {
      status,
      message,
    },
  });
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error: AppError = new Error(`Not found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};
