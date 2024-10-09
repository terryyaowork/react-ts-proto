export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

export interface TestData {}

export interface AdditionalData {}
