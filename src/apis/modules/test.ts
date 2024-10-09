import { apiGetTestJson } from '../instances/test';
import { ApiResponse, TestData } from '../../typings/apis/index';
import { logger } from '../../utils/log';

export const getTestJson = async (): Promise<ApiResponse<TestData>> => {
  try {
    const res = await apiGetTestJson();
    return res;
  } catch (error) {
    logger.error('Error fetching test JSON:', error);
    throw error;
  }
};
