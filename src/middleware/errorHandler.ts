import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Internal server error';

  if (err.message === 'Event not found') {
    statusCode = 404;
    message = err.message;
  } else if (
    err.message === 'User has already booked this event' ||
    err.message === 'No available seats'
  ) {
    statusCode = 400;
    message = err.message;
  } else if (err.message.includes('duplicate key value')) {
    statusCode = 400;
    message = 'User has already booked this event';
  } else if (err.message) {
    message = err.message;
  }

  const response: ApiResponse = {
    success: false,
    error: message,
  };

  res.status(statusCode).json(response);
};

