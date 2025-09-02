import { StatusCodes } from 'http-status-codes';

class BaseError extends Error {
  statusCode: number;
  constructor(message?: string, name?: string, statusCode?: number) {
    super(message);
    this.name = name || 'BaseError';
    this.message = message || 'Something went wrong';
    this.statusCode = statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

export default BaseError;
