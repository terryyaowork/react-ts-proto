import React, { useState } from 'react';

type CheckboxSize = 'small' | 'medium' | 'large';
type CheckboxVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

interface CheckboxProps {
  id?: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  variant?: CheckboxVariant;
  size?: CheckboxSize;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  style?: React.CSSProperties;
}

const sizeStyles: Record<CheckboxSize, string> = {
  small: 'h-4 w-4',
  medium: 'h-5 w-5',
  large: 'h-6 w-6',
};

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked = false,
  disabled = false,
  variant = 'primary',
  size = 'medium',
  onChange,
  className = '',
  style,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 切換內部狀態
    if (!disabled) {
      setIsChecked(event.target.checked);

      // 如果有外部傳入的 `onChange`，也一併觸發
      if (onChange) {
        onChange(event);
      }
    }
  };

  return (
    <div className={`flex items-center ${className}`} style={style}>
      <input
        id={id}
        type="checkbox"
        checked={isChecked} // 使用內部狀態控制 `checked`
        disabled={disabled}
        onChange={handleChange}
        className={`form-checkbox text-${variant} ${sizeStyles[size]} ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
      />
      {label && (
        <label
          htmlFor={id}
          className={`ml-2 text-${variant} ${disabled ? 'opacity-50' : ''} cursor-pointer`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
