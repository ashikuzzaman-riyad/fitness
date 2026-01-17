

import { Response } from 'express';

interface IApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T | null | undefined;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    meta: data.meta || null || undefined,
    data: data.data || null || undefined,
  });
};

export default sendResponse;