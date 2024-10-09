import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useRouteHandler } from '../utils/route';
import { logger } from '../utils/log';

export class ApiError extends Error {
  public status?: number;

  public request?: AxiosRequestConfig;

  public response?: AxiosResponse;

  constructor(
    message: string,
    status?: number,
    request?: AxiosRequestConfig,
    response?: AxiosResponse,
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.request = request;
    this.response = response;
  }

  toString() {
    return `[API Error] Status: ${this.status}, Message: ${this.message}`;
  }
}

// 使用範例
export const axiosErrorHandler = (error: AxiosError) => {
  const { navigateTo } = useRouteHandler();
  const status = error?.response?.status;
  const apiError = new ApiError(error.message, status, error.config, error.response);

  switch (status) {
    case 401:
      logger.warn('401 Unauthorized', apiError.toString());
      break;
    case 403:
      logger.warn('403 Access Denied', apiError.toString());
      navigateTo('/');
      break;
    case 404:
      logger.warn('404 Not Found', apiError.toString());
      navigateTo('/404');
      break;
    case 422:
      logger.warn('422 Validation Error', apiError.toString());
      break;
    default:
      logger.error('Unhandled API Error:', apiError.toString());
      break;
  }

  return apiError;
};
