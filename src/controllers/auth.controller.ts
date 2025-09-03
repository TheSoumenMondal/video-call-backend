import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import AuthRepository from '../repositories/auth.repository.js';
import AuthService from '../services/auth.service.js';
import ApiResponse from '../utils/apiResponse.js';
import ValidationError from '../error/validationError.js';
import asyncHandler from '../utils/asyncHandler.js';
import JwtUtility from '../utils/jwt.js';

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

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, confirmPassword } = req.body || {};
  if (!email || !password || !confirmPassword) {
    throw new ValidationError('All fields are required');
  }
  
  const user = await authService.login({ email, password, confirmPassword });
  const token = JwtUtility.generateJWTToken(user._id as string);
  req.cookies.token = token;

  return new ApiResponse(res).send({
    data: user,
    status: StatusCodes.OK,
    error: null,
    message: 'Login successful',
    success: true,
  });
});
