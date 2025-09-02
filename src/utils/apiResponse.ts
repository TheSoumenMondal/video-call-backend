import { Response } from 'express';
import { ApiResponseType } from '../types/apiResponse.js';

class ApiResponse {
  private response: Response;
  constructor(response: Response) {
    this.response = response;
  }
  send(data: ApiResponseType) {
    this.response.status(data.status).json({
      success: data.success,
      data: data.data,
      error: data.error,
      status: data.status,
      message: data.message,
    });
  }
}

export default ApiResponse;
