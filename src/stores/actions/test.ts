import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTestJson } from '../../apis/modules/test'; // 呼叫 API 模塊
import { logger } from '../../utils/log';
import { handleError } from '../../utils/error';

// 定義一個異步 Action，並使用 `createAsyncThunk`
export const actionTestData = createAsyncThunk(
  'common/fetchTestData',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getTestJson();
      logger.info('[actions]res: ', res);
      if (res && res.success) {
        return res.data;
      }

      return rejectWithValue('Failed to fetch test data');
    } catch (error) {
      logger.error('Error in fetchTestData action:', error);
      return rejectWithValue(handleError(error));
    }
  },
);

export const actionAdditionalData = createAsyncThunk(
  'common/fetchAdditionalData',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getTestJson();
      logger.info('[actions]additional data res: ', res);
      if (res && res.success) {
        return res.data;
      }
      return rejectWithValue('Failed to fetch additional data');
    } catch (error) {
      logger.error('Error in fetchAdditionalData action:', error);
      return rejectWithValue(handleError(error));
    }
  },
);
