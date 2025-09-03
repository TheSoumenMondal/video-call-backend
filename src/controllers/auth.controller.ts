import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import AuthRepository from '../repositories/auth.repository.js';
import AuthService from '../services/auth.service.js';
import ApiResponse from '../utils/apiResponse.js';
import NotImplementedError from '../error/notImplementedError.js';
import ValidationError from '../error/validationError.js';
import asyncHandler from '../utils/asyncHandler.js';

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, password, email, username } = req.body || {};

  if (!name || !password || !email || !username) {
    throw new ValidationError('All fields are required');
  }

  const user = await authService.register({ name, password, email, username });

  return new ApiResponse(res).send({
    data: user,
    status: StatusCodes.CREATED,
    error: null,
    message: 'Account created successfully',
    success: true,
  });
});

export const login = asyncHandler(async (_req: Request, _res: Response) => {
  throw new NotImplementedError('LogIn Controller not implemented');
});
