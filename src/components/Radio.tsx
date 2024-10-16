import React, { useState, useEffect } from 'react';

type RadioSize = 'small' | 'medium' | 'large';
type RadioVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

interface RadioProps {
  id?: string;
  name?: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  variant?: RadioVariant;
  size?: RadioSize;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  style?: React.CSSProperties;
}

const sizeStyles: Record<RadioSize, string> = {
  small: 'h-4 w-4',
  medium: 'h-5 w-5',
  large: 'h-6 w-6',
};

const Radio: React.FC<RadioProps> = ({
  id,
  name,
  label,
  checked = false,
  disabled = false,
  variant = 'primary',
  size = 'medium',
  onChange,
  className = '',
  style,
}) => {
  // 定義內部 `isChecked` 狀態來控制 `checked` 屬性
  const [isChecked, setIsChecked] = useState(checked);

  // 同步外部 `checked` 值變化
  useEffect(() => {
    setIsChecked(checked || false);
  }, [checked]);

  // 處理 `onChange` 事件
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      setIsChecked(true); // 點擊後設定 `isChecked` 為 true，因為是 radio
      if (onChange) onChange(event); // 如果有外部 `onChange`，執行傳入的處理函數
    }
  };

  return (
    <div className={`flex items-center ${className}`} style={style}>
      <input
        id={id} // 確保 id 屬性存在並與 label 的 htmlFor 匹配
        type="radio"
        name={name}
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange} // 綁定 `handleChange`
        className={`form-radio text-${variant} ${sizeStyles[size]} ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
      />
      {label && (
        <label
          htmlFor={id} // 確保 label 的 htmlFor 屬性與 input 的 id 匹配
          className={`ml-2 text-${variant} ${disabled ? 'opacity-50' : ''} cursor-pointer`}
          onClick={(e) => {
            if (!disabled) handleChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
          }}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Radio;
