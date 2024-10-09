import {
  LIGHT_COLORS,
  DARK_COLORS,
} from '../typings/components/base/colors';

// 根據主題模式來選擇顏色設定
export const COLORS = (isDarkMode: boolean) => (isDarkMode ? DARK_COLORS : LIGHT_COLORS);

// 根據主題模式取得指定的背景顏色
export const getColor = (variant: keyof typeof LIGHT_COLORS, isDarkMode: boolean) => {
  const colors = COLORS(isDarkMode);
  return colors[variant].bg; // 返回背景顏色
};

// 根據主題模式取得文字顏色
export const getTextColor = (variant: keyof typeof LIGHT_COLORS, isDarkMode: boolean) => {
  const colors = COLORS(isDarkMode);
  return colors[variant].text; // 返回文字顏色
};
