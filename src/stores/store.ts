import { configureStore } from '@reduxjs/toolkit';
import { getConfig } from '../configs/env';
import commonReducer from './states/common'; // 假設您的 reducer 位於 ./states 目錄
import userReducer from './states/user';
import authMiddleware from '../middlewares/auth';
import loggerMiddleware from '../middlewares/logger';

import { logger } from '../utils/log';

const {
  enableLoggerMiddleware,
  enableAuthMiddleware,
} = getConfig();

// 使用 configureStore 替換 createStore
const store = configureStore({
  reducer: {
    common: commonReducer, // 將您的 reducer 添加到這裡
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => {
    // 根據 enableLoggerMiddleware 的值來動態添加 loggerMiddleware
    const middlewares = [];

    logger.info('enableAuthMiddleware:', enableAuthMiddleware);

    if (enableAuthMiddleware) {
      middlewares.push(authMiddleware);
    }

    if (enableLoggerMiddleware) {
      middlewares.push(loggerMiddleware);
    }

    return getDefaultMiddleware({ thunk: true }).concat(...middlewares);
  },
});

// 定義 RootState 型別
export type RootState = ReturnType<typeof store.getState>;
// 定義 AppDispatch 型別，根據 store 的 dispatch 推斷類型
export type AppDispatch = typeof store.dispatch;

export default store; // 將 store 作為 default export
