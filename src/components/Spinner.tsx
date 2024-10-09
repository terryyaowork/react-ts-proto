import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { getColor } from '../utils/getColor';
import { SpinnerSize, BorderWidth, BorderStyle } from '../typings/components/spinner';
import { LIGHT_COLORS } from '../typings/components/base/colors';

interface SpinnerProps {
  size?: SpinnerSize;
  color?: keyof typeof LIGHT_COLORS;
  borderWidth?: BorderWidth;
  borderStyle?: BorderStyle;
  className?: string;
  style?: React.CSSProperties;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 64,
  color = 'PRIMARY',
  borderWidth = 4,
  borderStyle = 'dashed',
  className = '',
  style = {},
}) => {
  const { isDarkMode } = useTheme();
  const borderColor = getColor(color, isDarkMode);

  return (
    <div
      className={`rounded-full animate-spin ${className}`}
      style={{
        width: size,
        height: size,
        borderWidth,
        borderStyle, // 使用內聯樣式設置 borderStyle
        borderColor,
        borderRadius: '50%', // 保證圓形邊框
        borderTopColor: 'transparent', // 增加動態效果（可選）
        ...style,
      }}
    ></div>
  );
};

export default Spinner;
