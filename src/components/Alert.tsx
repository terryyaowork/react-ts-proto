import React, { useEffect, useState } from 'react';
import {
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiAlertTriangle,
} from 'react-icons/fi';
import { getColor, getTextColor } from '../utils/getColor';
import type { LIGHT_COLORS } from '../typings/components/base/colors';
import { useTheme } from '../contexts/ThemeContext';

type AlertType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
type AlertSize = 'small' | 'medium' | 'large';

interface AlertProps {
  type?: AlertType; // 設定 Alert 的類型
  message: string | React.ReactNode; // 顯示的訊息，可以是文字或 ReactNode
  dismissible?: boolean; // 是否可以被關閉
  onClose?: () => void; // 當關閉按鈕被點擊時觸發的回調函數
  icon?: React.ReactNode; // 自定義圖標
  className?: string; // 自定義的 className
  style?: React.CSSProperties; // 自定義的 style
  outline?: boolean; // 是否使用 outline 樣式
  size?: AlertSize; // 調整不同大小的 Alert
  autoClose?: number; // 自動消失時間（毫秒）
}

// 預設的 icon 組件
const defaultIcons: Record<AlertType, React.ReactNode> = {
  primary: <FiInfo />,
  secondary: <FiInfo />,
  success: <FiCheckCircle />,
  danger: <FiAlertCircle />,
  warning: <FiAlertTriangle />,
  info: <FiInfo />,
  light: <FiInfo />,
  dark: <FiAlertCircle />,
};

// 定義不同大小的樣式
const sizeStyles: Record<AlertSize, string> = {
  small: 'p-2 text-sm',
  medium: 'p-4 text-base',
  large: 'p-6 text-lg',
};

// 將小寫 `AlertType` 轉換成大寫格式
const toUpperCase = (
  type: AlertType,
): keyof typeof LIGHT_COLORS => type.toUpperCase() as keyof typeof LIGHT_COLORS;

const Alert: React.FC<AlertProps> = ({
  type = 'info',
  message,
  dismissible = false,
  onClose,
  icon,
  className = '',
  style,
  outline = false,
  size = 'medium',
  autoClose,
}) => {
  const { isDarkMode } = useTheme();
  const [fadeOut, setFadeOut] = useState(false);

  // 自動消失功能
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setFadeOut(true); // 開啟淡出效果
        setTimeout(() => {
          if (onClose) {
            onClose(); // 等待動畫完成後關閉
          }
        }, 500); // 假設動畫時間為 500ms
      }, autoClose);
      return () => clearTimeout(timer); // 清除定時器
    }
    return () => {}; // 當 autoClose 為 falsy 時，回傳空的清理函式
  }, [autoClose, onClose]);

  // 根據主題模式設定背景色與文字色
  const backgroundColor = outline ? 'transparent' : getColor(toUpperCase(type), isDarkMode);
  const borderColor = getColor(toUpperCase(type), isDarkMode);
  const textColor = outline
    ? getColor(toUpperCase(type), isDarkMode)
    : getTextColor(toUpperCase(type), isDarkMode);

  return (
    <div
      className={`border rounded flex items-center justify-between
        ${fadeOut ? 'opacity-0 transition-opacity duration-500' : ''}
        ${sizeStyles[size]} ${className}`}
      style={{
        backgroundColor,
        borderColor,
        color: textColor,
        ...style,
      }}
    >
      {/* 圖標和訊息區域 */}
      <div className="flex items-center">
        <span className="mr-2 text-lg">{icon || defaultIcons[type]}</span>
        <span className="font-medium">{message}</span>
      </div>
      {/* 可關閉按鈕 */}
      {dismissible && (
        <button
          onClick={onClose}
          className="ml-4 text-xl font-bold leading-none focus:outline-none"
          aria-label="Close"
          style={{ color: textColor }}
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;
