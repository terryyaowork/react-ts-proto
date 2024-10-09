export const BuggyComponent = () => {
  throw new Error('This is a test error!'); // 故意引發錯誤
};

export default BuggyComponent; // 使用 default export
