import { apiWithToken } from '../index';
import { ApiResponse } from '../../typings/apis/index';

// 使用 async/await 來進行 API 請求
export const apiGetTest = async () => apiWithToken.get('https://randomuser.me/api/');

// 這邊固定回傳格式
export const apiGetTestJson = async (): Promise<ApiResponse> => apiWithToken.get('/mock/test_api.json');
