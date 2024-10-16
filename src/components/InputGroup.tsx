import React, { useMemo } from 'react';
import Input, { InputProps } from './Input';

type InputGroupLayout = 'vertical' | 'horizontal'; // 定義佈局選項

interface InputGroupProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  showLabel?: boolean;
  showHelperText?: boolean;
  showErrorMessage?: boolean;
  inputProps?: InputProps & { id?: string };
  className?: string;
  labelClassName?: string;
  helperTextClassName?: string;
  errorMessageClassName?: string;
  style?: React.CSSProperties;
  layout?: InputGroupLayout; // 新增佈局屬性
}

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  helperText,
  errorMessage,
  showLabel = true,
  showHelperText = true,
  showErrorMessage = true,
  inputProps = {}, // 默認空物件
  className = '',
  labelClassName = '',
  helperTextClassName = '',
  errorMessageClassName = '',
  style,
  layout = 'vertical', // 預設為垂直佈局
}) => {
  // 如果 `inputProps` 中沒有 id，生成一個唯一 id
  const inputId = useMemo(() => inputProps.id || `input-${Math.random().toString(36).substr(2, 9)}`, [inputProps.id]);

  return (
    <div
      className={`flex ${
        layout === 'horizontal' ? 'flex-row items-center space-x-4' : 'flex-col'
      } ${className}`}
      style={style}
    >
      {/* 顯示 Label */}
      {showLabel && label && (
        <label
          className={`text-sm font-medium mb-1 ${labelClassName} ${
            layout === 'horizontal' ? 'mb-0' : ''
          }`}
          htmlFor={inputId} // 使用生成的 `inputId`
        >
          {label}
        </label>
      )}

      {/* Input 元件，傳入 id */}
      <Input {...inputProps} id={inputId} />

      {/* 顯示 Helper Text */}
      {showHelperText && helperText && (
        <p className={`text-xs mt-1 ${helperTextClassName}`}>
          {helperText}
        </p>
      )}

      {/* 顯示 Error Message */}
      {showErrorMessage && errorMessage && (
        <p className={`text-xs text-red-600 mt-1 ${errorMessageClassName}`}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default InputGroup;
