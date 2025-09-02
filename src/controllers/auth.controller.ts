import { Request, Response } from 'express';
import AuthRepository from '../repositories/auth.repository.js';
import AuthService from '../services/auth.service.js';
import ApiResponse from '../utils/apiResponse.js';
import { StatusCodes } from 'http-status-codes';

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);

export async function register(req: Request, res: Response) {
  const { name, password, email, username } = req.body;
  try {
    const user = await authService.register({
      name,
      password,
      email,
      username,
    });
    return new ApiResponse(res).send({
      data: user,
      status: StatusCodes.CREATED,
      error: null,
      message: 'Account created successfully',
      success: true,
    });
  } catch (error) {
    return new ApiResponse(res).send({
      data: null,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error: error,
      message: 'Account creation failed',
      success: false,
    });
  }
}
