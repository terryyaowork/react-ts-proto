import { stringToBoolean } from '../utils/string';
import type { Config } from '../typings/configs/env';

const createConfig = (): Config => {
  const apiPort = import.meta.env.VITE_BASE_URL || '5173';
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
    ? `${import.meta.env.VITE_API_BASE_URL}:${apiPort}`
    : `http://localhost:${apiPort}`;
  const environment = import.meta.env.NODE_ENV || 'development';

  const enableLog = stringToBoolean(import.meta.env.VITE_API_ENABLE_LOG) || false;

  const enableLoggerMiddleware = stringToBoolean(
    import.meta.env.VITE_API_ENABLE_LOGGER_MIDDLEWARE,
  ) || false;
  const enableAuthMiddleware = stringToBoolean(
    import.meta.env.VITE_API_ENABLE_AUTH_MIDDLEWARE,
  ) || false;

  return {
    apiBaseUrl,
    environment,
    enableLog,
    enableLoggerMiddleware,
    enableAuthMiddleware,
  };
};

let configInstance: Config | null = null;

// 確保全局只有一個 Config 實例
export const getConfig = (): Config => {
  if (!configInstance) {
    configInstance = createConfig();
  }
  return configInstance;
};
