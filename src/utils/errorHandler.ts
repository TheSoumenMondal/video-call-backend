import { NextFunction, Request, Response } from 'express';
import BaseError from '../error/baseError.js';

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(err.stack);

  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        name: err.name,
        message: err.message,
        statusCode: err.statusCode,
      },
    });
  }

  return res.status(500).json({
    success: false,
    error: {
      name: 'InternalServerError',
      message: 'Something went wrong',
      statusCode: 500,
    },
  });
};

export default errorHandler;
