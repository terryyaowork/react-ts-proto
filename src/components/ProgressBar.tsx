import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface ProgressBarProps {
  value: number;
  label?: boolean;
  striped?: boolean;
  animated?: boolean;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  style?: React.CSSProperties;
}

const variantClasses: Record<string, string> = {
  primary: 'bg-blue-500',
  secondary: 'bg-gray-500',
  success: 'bg-green-500',
  danger: 'bg-red-500',
  warning: 'bg-yellow-500',
  info: 'bg-teal-500',
  light: 'bg-gray-200',
  dark: 'bg-gray-800',
};

const sizeClasses: Record<string, string> = {
  small: 'h-2',
  medium: 'h-4',
  large: 'h-6',
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label = false,
  striped = false,
  animated = false,
  variant = 'primary',
  size = 'medium',
  style = {},
}) => {
  const { isDarkMode } = useTheme();  // 引用主題上下文
  const barClass = `
    ${variantClasses[variant]} 
    ${sizeClasses[size]} 
    ${striped ? 'progress-bar-striped' : ''} 
    ${animated ? 'progress-bar-animated' : ''}
    ${isDarkMode ? 'dark-mode-progress-bar' : ''}  // 判斷暗黑模式
  `;

  return (
    <div className="relative w-full bg-gray-200 rounded" style={style}>
      <div
        className={`progress-bar ${barClass} transition-all duration-300 ease-in-out`}
        style={{ width: `${value}%` }}
      >
        {label && <span className="absolute left-1/2 transform -translate-x-1/2 text-white">{value}%</span>}
      </div>
    </div>
  );
};

export default ProgressBar;
