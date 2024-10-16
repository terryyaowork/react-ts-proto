import React, { useState, useEffect, useRef } from 'react';

interface SelectProps {
  id?: string;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  searchable?: boolean;
  multiple?: boolean;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
}

interface SelectOption {
  label: string;
  value: string | number;
  group?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  id = 'select',
  value,
  onChange,
  options,
  label,
  placeholder = 'Select an option',
  error,
  disabled = false,
  searchable = false,
  multiple = false,
  variant = 'primary',
  size = 'medium',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);

  // 監聽點擊事件，點擊到 `Select` 元件外時關閉選單
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    if (!disabled) setIsOpen(!isOpen);
  };

  const handleSelectOption = (optionValue: string | number) => {
    const stringValue = String(optionValue); // 將 number 轉換為 string
    if (multiple) {
      const newValue = Array.isArray(value)
        ? value.includes(stringValue)
          ? value.filter((v) => v !== stringValue)
          : [...value, stringValue]
        : [stringValue];
      onChange(newValue); // 確保 onChange 傳遞 string[]
    } else {
      onChange(stringValue); // 傳遞 string 型別
      setIsOpen(false);
    }
  };

  const filteredOptions = searchable
    ? options.filter((option) => option.label.toLowerCase().includes(searchValue.toLowerCase()))
    : options;

  return (
    <div className="select-component" ref={selectRef}>
      {label && (
        <label htmlFor={id} className="select-label" onClick={handleToggle}>
          {label}
        </label>
      )}
      <div className={`select-container ${disabled ? 'select-disabled' : ''}`}>
        <div
          id={id}
          className={`
              select-display ${variant} ${size} ${isOpen ? 'select-open' : ''} 
              border rounded-md py-2 px-3 cursor-pointer shadow-sm focus:ring-2
              focus:ring-${variant} ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
            }`}
          onClick={handleToggle}
        >
          {value && value.length > 0
            ? Array.isArray(value)
              ? value.map((v) => options.find((opt) => opt.value === v)?.label).join(', ')
              : options.find((opt) => opt.value === value)?.label
            : placeholder}
        </div>
        {isOpen && (
          <div className="select-dropdown border border-gray-300 mt-1 rounded-md shadow-lg bg-white">
            {searchable && (
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search..."
                className="select-search w-full border-b p-2 outline-none"
                onClick={(e) => e.stopPropagation()} // 阻止冒泡
              />
            )}
            <ul className="select-options">
              {filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className={`select-option p-2 cursor-pointer hover:bg-gray-100 ${option.disabled ? 'select-option-disabled text-gray-400 cursor-not-allowed' : ''}`}
                  onClick={() => !option.disabled && handleSelectOption(option.value)}
                >
                  {option.icon && <span className="select-option-icon mr-2">{option.icon}</span>}
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {error && <span className="select-error text-red-500">{error}</span>}
    </div>
  );
};

export default Select;
