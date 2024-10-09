import { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { useCookieHandler } from '../utils/cookie';
import { axiosErrorHandler } from './errorHandler';
import { ACCESS_TOKEN } from '../typings/enums/utils/common';
import { logger } from '../utils/log';

const cookie = useCookieHandler();
const getAccessToken = () => cookie.getCookie(ACCESS_TOKEN);

// 定義 request 成功攔截器
export const requestSuccessHandler = (config: InternalAxiosRequestConfig) => {
  if (config.headers && getAccessToken()) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${getAccessToken()}`;
  }

  // TODOS: add enable interceptors log flag
  logger.info('Request Sent', {
    url: config.url,
    method: config.method,
    headers: config.headers,
  });

  return config;
};

// 定義 request 錯誤攔截器
export const requestErrorHandler = (error: AxiosError) => {
  logger.error('Request Error', error);
  return Promise.reject(error);
};

// 定義 response 成功攔截器
export const responseSuccessHandler = (response: AxiosResponse) => {
  logger.info('Response Received', {
    url: response.config.url,
    status: response.status,
    data: response.data,
  });
  return response.data;
};

// 定義 response 錯誤攔截器
export const responseErrorHandler = (error: AxiosError) => {
  axiosErrorHandler(error);
  logger.error('Response Error', error);
  return Promise.reject(error?.response?.data);
};
