import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { getColor } from '../utils/getColor';
import { LIGHT_COLORS } from '../typings/components/base/colors';
import { FiEye, FiEyeOff } from 'react-icons/fi';

type InputType = 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url';
type InputVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
type InputSize = 'small' | 'medium' | 'large';
type InputRadius = 'none' | 'small' | 'medium' | 'large' | 'full';
type IconPosition = 'left' | 'right';

export interface InputProps {
  id?: string;
  type?: InputType;
  value?: string;
  placeholder?: string;
  variant?: InputVariant;
  size?: InputSize;
  disabled?: boolean;
  radius?: InputRadius;
  multiline?: boolean;
  readonly?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  showPasswordToggle?: boolean;
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
  id,
  type = 'text',
  value,
  placeholder,
  variant = 'primary',
  radius = 'medium',
  size = 'medium',
  disabled = false,
  multiline,
  readonly = false,
  onChange,
  icon,
  iconPosition = 'left',
  showPasswordToggle = false,
  className = '',
  style,
}) => {
  const { isDarkMode } = useTheme();
  const borderColor = getColor(variant.toUpperCase() as keyof typeof LIGHT_COLORS, isDarkMode);
  const textColor = getColor(variant.toUpperCase() as keyof typeof LIGHT_COLORS, isDarkMode);
  const focusRingColor = `${borderColor}80`;
  const disabledBackgroundColor = `${borderColor}20`;
  const readonlyBackgroundColor = isDarkMode ? '#333' : '#f8f9fa';
  const readonlyBorderColor = 'transparent';

  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  let inputType: InputType = type;
  if (type === 'password' && showPasswordToggle) {
    inputType = isPasswordVisible ? 'text' : 'password';
  }

  let inputPaddingClass = '';
  if (icon) {
    inputPaddingClass = iconPosition === 'left' ? 'pl-9' : 'pr-9';
  }

  let rightIcon;
  if (type === 'password' && showPasswordToggle) {
    rightIcon = isPasswordVisible ? (
      <FiEyeOff onClick={() => setIsPasswordVisible(false)} />
    ) : (
      <FiEye onClick={() => setIsPasswordVisible(true)} />
    );
  } else {
    rightIcon = icon;
  }

  // 設定 backgroundColor 變數來避免巢狀三元運算子
  let backgroundColor;
  if (readonly) {
    backgroundColor = readonlyBackgroundColor;
  } else if (disabled) {
    backgroundColor = disabledBackgroundColor;
  }

  return (
    <div
      className={`relative flex items-center ${sizeStyles[size]} ${className}`}
      style={{ color: disabled ? '#aaa' : textColor, ...style }}
    >
      {/* 左側圖標顯示 */}
      {icon && iconPosition === 'left' && <div className="absolute left-6">{icon}</div>}

      {/* Textarea 元件 */}
      {multiline ? (
        <textarea
          id={id}
          value={value}
          placeholder={placeholder}
          readOnly={readonly}
          disabled={disabled}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`transition-colors duration-200 ease-in-out
          ${sizeStyles[size]}
          ${radiusStyles[radius]}
          ${inputPaddingClass}
          ${disabled || readonly ? 'cursor-not-allowed opacity-50' : ''}
          w-full placeholder-opacity-80 placeholder-${variant.toLowerCase()}`}
          style={{
            outline: 'none',
            border: `1px solid ${readonly ? readonlyBorderColor : borderColor}`,
            backgroundColor,
            color: textColor,
            boxShadow: isFocused && !readonly ? `0 0 0 3px ${focusRingColor}` : undefined,
          }}
        />
      ) : (
        <input
          id={id}
          type={inputType}
          value={value}
          placeholder={placeholder}
          readOnly={readonly}
          disabled={disabled}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`transition-colors duration-200 ease-in-out
          ${sizeStyles[size]}
          ${radiusStyles[radius]}
          ${inputPaddingClass}
          ${disabled || readonly ? 'cursor-not-allowed opacity-50' : ''}
          w-full placeholder-opacity-80 placeholder-${variant.toLowerCase()}`}
          style={{
            outline: 'none',
            border: `1px solid ${readonly ? readonlyBorderColor : borderColor}`,
            backgroundColor,
            color: textColor,
            boxShadow: isFocused && !readonly ? `0 0 0 3px ${focusRingColor}` : undefined,
          }}
        />
      )}

      {/* 右側圖標顯示 */}
      {iconPosition === 'right' && <div className="absolute right-6 cursor-pointer">{rightIcon}</div>}
    </div>
  );
};

export default Input;
