import { CaseReducer, AnyAction } from '@reduxjs/toolkit';
import type { CommonState } from '../../typings/stores/states/common';

// 定義一組 CaseReducers 來處理不同的 Action
const fetchTestDataPending: CaseReducer<CommonState> = (state) => {
  state.isLoading = true;
  state.requestError = null;
  state.requestSuccess = false;
};

const fetchTestDataFulfilled: CaseReducer<CommonState, AnyAction> = (state, action) => {
  state.isLoading = false;
  state.additionalData = action.payload;
  state.requestSuccess = true;
};

// 修改此處類型，使其能夠訪問 `action.error`
const fetchTestDataRejected: CaseReducer<CommonState, AnyAction> = (state, action) => {
  state.isLoading = false;

  // 讀取 action.error 中的錯誤信息
  const errorMessage = action.error?.message || 'Unknown error';
  state.requestError = errorMessage;
  state.requestSuccess = false;
};

// 匯出所有 reducers 作為一個對象，並使用 `addCase` 方法指定正確類型
export const testDataReducers = {
  pending: fetchTestDataPending,
  fulfilled: fetchTestDataFulfilled,
  rejected: fetchTestDataRejected,
};
