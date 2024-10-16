import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { getColor, getTextColor } from '../utils/getColor';
import type { LIGHT_COLORS } from '../typings/components/base/colors';

type ToastType = 'success' | 'danger' | 'info' | 'warning';
type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface ToastProps {
  id?: string; // 用於多個 Toast 的堆疊識別
  message: string | React.ReactNode;
  type?: ToastType;
  duration?: number; // 自動消失時間（毫秒）
  onClose?: () => void; // 手動關閉事件
  position?: ToastPosition; // Toast 的位置
  style?: React.CSSProperties; // 用於傳遞自定義樣式（例如：動態調整位置）
}

// 將小寫 `ToastType` 轉換成大寫格式
const toUpperCase = (
  type: ToastType,
): keyof typeof LIGHT_COLORS => type.toUpperCase() as keyof typeof LIGHT_COLORS;

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 5000, // 預設 5 秒
  onClose,
  position = 'top-right',
  style = {},
}) => {
  const { isDarkMode } = useTheme();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) {
          onClose();
        }
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!visible) return null;

  // 根據主題模式設定背景色與文字色
  const backgroundColor = getColor(toUpperCase(type), isDarkMode);
  const textColor = getTextColor(toUpperCase(type), isDarkMode);

  return (
    <div
      className={`fixed ${position.includes('top') ? 'top-4' : 'bottom-4'} ${
        position.includes('right') ? 'right-4' : 'left-4'
      } px-4 py-2 rounded shadow-lg transition-opacity duration-300 z-50`}
      style={{
        backgroundColor,
        color: textColor,
        opacity: visible ? 1 : 0,
        ...style, // 接受來自外部的自定義樣式（例如：堆疊時的間距調整）
      }}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={() => {
            setVisible(false);
            if (onClose) onClose();
          }}
          className="ml-4 font-bold"
          style={{ color: textColor }}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Toast;
