import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { getColor, getTextColor } from '../utils/getColor'; // 引入顏色工具函式
import { LIGHT_COLORS } from '../typings/components/base/colors';

type InputType = 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url';
type InputVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
type InputSize = 'small' | 'medium' | 'large';
type InputRadius = 'none' | 'small' | 'medium' | 'large' | 'full';

interface InputProps {
  type?: InputType;
  value?: string;
  placeholder?: string;
  variant?: InputVariant;
  size?: InputSize;
  disabled?: boolean;
  radius?: InputRadius;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  style?: React.CSSProperties;
}

const radiusStyles: Record<InputRadius, string> = {
  none: 'rounded-none',
  small: 'rounded-sm',
  medium: 'rounded-md',
  large: 'rounded-lg',
  full: 'rounded-full',
};

const sizeStyles: Record<InputSize, string> = {
  small: 'px-2 py-1 text-sm',
  medium: 'px-3 py-2 text-base',
  large: 'px-4 py-3 text-lg',
};

const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  placeholder,
  variant = 'primary',
  radius = 'medium',
  size = 'medium',
  disabled = false,
  onChange,
  className = '',
  style,
}) => {
  const { isDarkMode } = useTheme(); // 確認當前是否為暗黑模式
  const borderColor = getColor(
    variant.toUpperCase() as keyof typeof LIGHT_COLORS,
    isDarkMode,
  ); // 取得不同變體的邊框色
  const textColor = getTextColor(
    variant.toUpperCase() as keyof typeof LIGHT_COLORS,
    isDarkMode,
  ); // 取得文字顏色
  const focusRingColor = `${borderColor}80`; // 設定 focus 狀態下的 ring 顏色（80 的透明度）
  const disabledBackgroundColor = `${borderColor}20`; // 設定 disabled 狀態的背景色

  const [isFocused, setIsFocused] = useState(false);

  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={`transition-colors duration-200 ease-in-out
        ${sizeStyles[size]}
        ${disabled ? 'cursor-not-allowed opacity-50' : ''}
        ${radiusStyles[radius]} 
        ${className}`}
      style={{
        outline: 'none', // 移除瀏覽器預設的 outline 樣式
        border: `1px solid ${isFocused ? borderColor : borderColor}`, // 使用手動設定的 `border` 顏色
        color: disabled ? '#aaa' : textColor, // 調整 disabled 狀態下的文字顏色
        backgroundColor: disabled ? disabledBackgroundColor : undefined, // 使用自定義背景色
        boxShadow: isFocused ? `0 0 0 3px ${focusRingColor}` : undefined, // Focus 時的 box-shadow 顯示
        ...style,
      }}
    />
  );
};

export default Input;
