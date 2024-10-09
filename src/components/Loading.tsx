import React from 'react';
import Spinner from './Spinner';
import { useTheme } from '../contexts/ThemeContext';
import { getColor } from '../utils/getColor';
import { SpinnerSize, BorderWidth, BorderStyle } from '../typings/components/spinner';
import { LIGHT_COLORS } from '../typings/components/base/colors';

interface LoadingProps {
  message?: string;
  color?: keyof typeof LIGHT_COLORS; // 使用 LIGHT_COLORS 來匹配 getColor 的鍵值
  size?: SpinnerSize;
  borderWidth?: BorderWidth;
  borderStyle?: BorderStyle;
  backgroundOpacity?: number;
  isLoading?: boolean;
  isShowText?: boolean;
  className?: string;
  containerStyle?: React.CSSProperties;
  variant?: 'spinner' | 'dots';
  spinnerClassName?: string;
  spinnerStyle?: React.CSSProperties;
}

const Loading: React.FC<LoadingProps> = ({
  message = 'Loading...',
  color = 'PRIMARY',
  size = 64,
  borderWidth = 4,
  borderStyle = 'dashed',
  backgroundOpacity = 0.5,
  isLoading = true,
  isShowText = true,
  className = '',
  containerStyle,
  variant = 'spinner',
  spinnerClassName = '',
  spinnerStyle,
}) => {
  const { isDarkMode } = useTheme(); // 取得當前主題模式

  // 動態計算顏色
  const resolvedColor = getColor(color, isDarkMode);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center z-50 ${className}`}
      style={{ backgroundColor: `rgba(55, 65, 81, ${backgroundOpacity})`, ...containerStyle }}
      role="status"
      aria-live="polite"
    >
      <div className="text-center flex flex-col items-center">
        {variant === 'spinner' ? (
          <Spinner
            color={color}
            size={size}
            borderWidth={borderWidth}
            borderStyle={borderStyle}
            className={spinnerClassName}
            style={spinnerStyle}
          />
        ) : (
          <div
            className="animate-ping rounded-full bg-current opacity-75"
            style={{ width: size, height: size, backgroundColor: resolvedColor }}
          ></div>
        )}
        {isShowText && (
          <h2 className="mt-4 text-lg font-semibold" style={{ color: resolvedColor }}>
            {message}
          </h2>
        )}
      </div>
    </div>
  );
};

export default Loading;
