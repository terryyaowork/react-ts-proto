import React, { useState, useEffect } from 'react';
import {
  SketchPicker,
  ChromePicker,
  TwitterPicker,
  CirclePicker,
  ColorResult,
  ColorPickerProps,
} from 'react-color';
import type { LIGHT_COLORS } from '../typings/components/base/colors';
import { useTheme } from '../contexts/ThemeContext';
import { getColor } from '../utils/getColor';

type PickerType = 'default' | 'sketch' | 'chrome' | 'twitter' | 'circle';
type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
type Size = 'small' | 'medium' | 'large';

export interface ColorInputProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  pickerType?: PickerType;
  variant?: Variant;
  size?: Size;
  className?: string;
  style?: React.CSSProperties;
}

const pickerComponents: Record<PickerType, React.ComponentType<ColorPickerProps<any>>> = {
  default: SketchPicker,
  sketch: SketchPicker,
  chrome: ChromePicker,
  twitter: TwitterPicker,
  circle: CirclePicker,
};

// 移除 variantClasses
const sizeClasses: Record<Size, string> = {
  small: 'px-2 py-1 text-sm',
  medium: 'px-3 py-2 text-base',
  large: 'px-4 py-3 text-lg',
};

const ColorInput: React.FC<ColorInputProps> = ({
  id = 'color-input',
  value,
  onChange,
  label,
  error,
  disabled = false,
  pickerType = 'default',
  variant = 'primary',
  size = 'medium',
  className = '',
  style = {},
}) => {
  const { isDarkMode } = useTheme();
  const [inputValue, setInputValue] = useState(value);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // 新增 focus 狀態

  // 確保顏色設定在變更時更新
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // 使用 getColor 函數動態獲取顏色
  const borderColor = getColor(
    variant.toUpperCase() as keyof typeof LIGHT_COLORS,
    isDarkMode
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  const togglePicker = () => {
    if (!disabled) {
      setIsPickerOpen(!isPickerOpen);
    }
  };

  const handlePickerChange = (color: ColorResult) => {
    setInputValue(color.hex);
    onChange(color.hex);
  };

  const PickerComponent = pickerComponents[pickerType] || SketchPicker;

  return (
    <div className={`flex flex-col ${className}`} style={style}>
      {label && (
        <label htmlFor={id} className="mb-1 text-sm font-medium">
          {label}
        </label>
      )}
      <div className="flex items-center">
        <input
          id={id}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          onFocus={() => setIsFocused(true)} // 設置 focus 狀態
          onBlur={() => setIsFocused(false)} // 移除 focus 狀態
          className={`flex-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${sizeClasses[size]} ${
            error ? 'border-red-500' : ''
          } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
          style={{
            borderColor: borderColor, // 使用 borderColor
            boxShadow: isFocused ? `0 0 0 2px ${borderColor}` : undefined, // 動態設置焦點環
          }}
        />
        <div
          className={`w-10 h-10 ml-2 border rounded-md cursor-pointer flex items-center justify-center ${
            disabled ? 'cursor-not-allowed' : ''
          }`}
          style={{ backgroundColor: inputValue }}
          onClick={togglePicker}
          role="button"
          tabIndex={0}
          aria-label="Open color picker"
          onKeyPress={(e) => {
            if (e.key === 'Enter') togglePicker();
          }}
        />
      </div>
      {error && (
        <span id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </span>
      )}
      {isPickerOpen && (
        <div className="mt-2">
          <PickerComponent color={inputValue} onChange={handlePickerChange} />
        </div>
      )}
    </div>
  );
};

export default ColorInput;
