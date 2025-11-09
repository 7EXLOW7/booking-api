import { body, validationResult, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';

export const validateReserveBooking: ValidationChain[] = [
  body('event_id')
    .isInt({ min: 1 })
    .withMessage('event_id must be a positive integer'),
  body('user_id')
    .notEmpty()
    .withMessage('user_id is required')
    .isString()
    .withMessage('user_id must be a string'),
];

export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const response: ApiResponse = {
      success: false,
      error: errors.array().map(e => e.msg).join(', '),
    };
    res.status(400).json(response);
    return;
  }
  
  next();
};

