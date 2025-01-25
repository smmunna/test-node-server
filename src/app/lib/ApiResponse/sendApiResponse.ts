import { Response } from 'express';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  result?: T;
  error?: {
    code: number;
    message: string;
  };
  pagination?: {
    total: number;
    pageSize: number;
    currentPage: number;
  };
}


const sendApiResponse = <T>(
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  result?: any,
) => {
  // Disable caching
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  const response: ApiResponse<T> = {
    success,
    message,
    result,
  };
  return res.status(statusCode).json(response);
};

export default sendApiResponse;
