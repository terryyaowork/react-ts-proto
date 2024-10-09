import React from 'react';
import { FiLoader } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';
import { getColor, getTextColor } from '../utils/getColor';

export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: ButtonType;
  outline?: boolean;
  block?: boolean;
  rounded?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right' | 'top' | 'bottom';
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

// 定義不同大小的樣式
const sizeStyles: Record<ButtonSize, string> = {
  small: 'px-2 py-1 text-sm',
  medium: 'px-4 py-2 text-base',
  large: 'px-6 py-3 text-lg',
};

// 將小寫 `ButtonVariant` 轉換成大寫格式
const toUpperCase = (type: ButtonVariant) => type.toUpperCase() as keyof typeof getColor;

// 建立 Button 組件
const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  type = 'button',
  outline = false,
  block = false,
  rounded = false,
  loading = false,
  disabled = false,
  className = '',
  children,
  icon,
  iconPosition = 'left',
  href,
  onClick,
}) => {
  const { isDarkMode } = useTheme();

  // 取得背景色與文字色
  const backgroundColor = outline ? 'transparent' : getColor(toUpperCase(variant), isDarkMode);
  const borderColor = getColor(toUpperCase(variant), isDarkMode);
  const textColor = outline
    ? getColor(toUpperCase(variant), isDarkMode)
    : getTextColor(toUpperCase(variant), isDarkMode);

  // 設定 class 結構
  const classes = `
    ${block ? 'w-full' : ''}
    ${rounded ? 'rounded-full' : 'rounded'}
    ${sizeStyles[size]} 
    border 
    flex 
    items-center 
    justify-center 
    font-medium 
    transition 
    duration-300 
    ease-in-out 
    focus:outline-none 
    ${loading || disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'} 
    ${className}
  `;

  // 根據 `iconPosition` 決定圖標和文字的排列順序
  const iconOrder = iconPosition === 'right' ? 'order-last' : 'order-first';
  const textOrder = iconPosition === 'right' ? 'order-first' : 'order-last';

  // 根據 `iconPosition` 設定圖標和文字的間距樣式
  const iconMarginClass = {
    left: 'mr-2',
    right: 'ml-2',
    top: 'mb-2',
    bottom: 'mt-2',
  }[iconPosition];

  // 建立按鈕內的內容
  const content = (
    <span
      className={`flex items-center ${
        iconPosition === 'top' || iconPosition === 'bottom' ? 'flex-col' : ''
      }`}
    >
      {loading ? (
        <FiLoader className={`animate-spin ${iconOrder} ${iconMarginClass}`} />
      ) : (
        icon && <span className={`${iconOrder} ${iconMarginClass}`}>{icon}</span>
      )}
      <span className={textOrder}>{children}</span>
    </span>
  );

  // 根據 href 決定使用 `<a>` 或 `<button>`
  return href ? (
    <a
      href={href}
      className={classes}
      style={{
        backgroundColor,
        borderColor,
        color: textColor,
      }}
      onClick={onClick}
      aria-disabled={disabled}
    >
      {content}
    </a>
  ) : (
    <button
      type={type}
      className={classes}
      style={{
        backgroundColor,
        borderColor,
        color: textColor,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default Button;
