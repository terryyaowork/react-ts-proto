import React, { useState, useRef, useEffect } from 'react';

interface DropdownProps {
  label: string; // 下拉選單的觸發按鈕顯示的標籤
  children: React.ReactNode; // 下拉選單的選項內容
}

const Dropdown: React.FC<DropdownProps> = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false); // 控制選單的開啟或關閉
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 點擊外部關閉選單
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 鍵盤導航處理
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* 觸發按鈕 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        {label}
      </button>

      {/* 下拉選單 */}
      {isOpen && (
        <div className="absolute mt-2 py-2 w-48 bg-white rounded-lg shadow-lg z-10">
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
