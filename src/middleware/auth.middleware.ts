import { NextFunction, Request, Response } from 'express';
import ApiResponse from '../utils/apiResponse.js';
import { StatusCodes } from 'http-status-codes';

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token;
  if (!token) {
    return new ApiResponse(res).send({
      status: StatusCodes.UNAUTHORIZED,
      message: 'You are not authorized to access this resource',
      error: null,
      data: null,
      success: false,
    });
  }

  next();
};

export default authMiddleware;
