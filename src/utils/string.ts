const stringToBoolean = (str: string): boolean => {
  if (!str) return false; // 如果字符串為空，默認返回 false
  const lowerStr = str.trim().toLowerCase(); // 去除空格並轉換為小寫
  return lowerStr === 'true' || lowerStr === '1' || lowerStr === 'yes';
};

// 將字串的首字母轉大寫
const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// 檢查字串是否為空或僅包含空白字元
const isEmptyOrWhitespace = (str: string): boolean => !str || str.trim().length === 0;

// 去除字串兩端的空白字元
const trimWhitespace = (str: string): string => str.trim();

// 檢查字串是否包含另一個字串（忽略大小寫）
const containsIgnoreCase = (str: string, searchValue: string): boolean => (
  str.toLowerCase().includes(searchValue.toLowerCase())
);

// 將字串轉換為數字
const stringToNumber = (str: string): number | null => {
  const num = parseFloat(str);
  return Number.isNaN(num) ? null : num;
};

// 將字串反轉
const reverseString = (str: string): string => str.split('').reverse().join('');

// 檢查字串是否以特定字元結尾
const endsWith = (str: string, target: string): boolean => str.endsWith(target);

// 檢查字串是否以特定字元開頭
const startsWith = (str: string, target: string): boolean => str.startsWith(target);

export {
  stringToBoolean,
  capitalize,
  isEmptyOrWhitespace,
  trimWhitespace,
  containsIgnoreCase,
  stringToNumber,
  reverseString,
  endsWith,
  startsWith,
};
