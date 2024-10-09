import { Middleware } from 'redux'; // 導入 Middleware 類型
import { logger } from '../utils/log';

// 定義 loggerMiddleware 中間件
const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  // 在 action 觸發前，獲取當前 state
  const prevState = store.getState();

  // 顯示即將被觸發的 action 及前置狀態
  logger.info('Previous State:', prevState);
  logger.info('Action Triggered:', action);

  // 調用下一個 middleware 或 reducer
  const result = next(action);

  // 在 action 觸發後，獲取更新後的 state
  const nextState = store.getState();

  // 顯示觸發後的 state
  logger.info('Next State:', nextState);

  // 返回下一個 middleware 的結果
  return result;
};

export default loggerMiddleware;
