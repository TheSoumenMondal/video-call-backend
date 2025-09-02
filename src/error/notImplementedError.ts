import { StatusCodes } from 'http-status-codes';
import BaseError from './baseError.js';

class NotImplementedError extends BaseError {
  constructor(message?: string) {
    super(message, 'NotImplementedError');
    this.statusCode = StatusCodes.NOT_IMPLEMENTED;
  }
}

export default NotImplementedError;
