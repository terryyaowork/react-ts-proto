import axios from 'axios';
import {
  requestSuccessHandler,
  requestErrorHandler,
  responseSuccessHandler,
  responseErrorHandler,
} from './interceptors';
import { getConfig } from '../configs/env';

// 使用環境變量來設置 baseURL
const { apiBaseUrl } = getConfig();

// 定義通用的 `headers` 設定
const commonHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

// 使用統一的 `config` 定義不同的 axios 實例
export const apiWithoutToken = axios.create({
  baseURL: apiBaseUrl,
  headers: commonHeaders,
});

export const apiWithToken = axios.create({
  baseURL: apiBaseUrl,
  headers: commonHeaders,
});

export const apiWithUploadFile = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// 使用攔截器
[apiWithToken, apiWithUploadFile, apiWithoutToken].forEach((instance) => {
  instance.interceptors.request.use(requestSuccessHandler, requestErrorHandler);
  instance.interceptors.response.use(responseSuccessHandler, responseErrorHandler);
});
