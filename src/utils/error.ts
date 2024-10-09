export const handleError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  // 可選處理：如果錯誤對象中有自定義消息
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return (error as { message: string }).message;
  }
  return 'Unknown error occurred';
};
