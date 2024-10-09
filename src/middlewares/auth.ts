import { Middleware } from 'redux'; // 使用 Action 替代 PayloadAction
import { logger } from '../utils/log';

// 定義需要驗證的 action 類型
const authRequiredActions = ['SET_TEST_DATA', 'GET_USER_INFO']; // 需要身份驗證的 action 類型

// 定義 authMiddleware 中間件
const authMiddleware: Middleware = (store) => (next) => (action: unknown) => {
  const state = store.getState();

  // 確認 middleware 已掛上
  logger.info('[AuthMiddleware] Action triggered:', action);

  // 檢查 action 類型並執行對應的處理
  if (typeof action === 'object' && action !== null && 'type' in action) {
    const typedAction = action as { type: string }; // 將 action 轉型

    // 只對需要驗證的 action 進行處理
    if (authRequiredActions.includes(typedAction.type) && !state.user.isAuthenticated) {
      logger.warn('User not authenticated!', state.user.isAuthenticated);
      return next({ type: 'AUTH_ERROR', payload: 'User not authenticated' });
    }
  }

  return next(action);
};

export default authMiddleware;
