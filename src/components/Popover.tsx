import React, { useState } from 'react';

interface PopoverProps {
  content: React.ReactNode; // Popover 內容
  title?: string; // Popover 標題
  placement?: 'top' | 'bottom' | 'left' | 'right'; // Popover 的位置
  trigger?: 'click' | 'hover'; // 觸發的方式
  children: React.ReactNode; // 被包覆的子元件
}

const Popover: React.FC<PopoverProps> = ({
  content,
  title,
  placement = 'top',
  trigger = 'click',
  children,
}) => {
  const [visible, setVisible] = useState(false);

  const handleToggle = () => {
    setVisible(!visible);
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setVisible(false);
    }
  };

  // 設定箭頭樣式
  const getArrowStyle = () => {
    switch (placement) {
      case 'top':
        return 'bottom-[-4px] left-1/2 transform -translate-x-1/2 rotate-45';
      case 'bottom':
        return 'top-[-4px] left-1/2 transform -translate-x-1/2 rotate-45';
      case 'left':
        return 'right-[-4px] top-1/2 transform -translate-y-1/2 rotate-45';
      case 'right':
        return 'left-[-4px] top-1/2 transform -translate-y-1/2 rotate-45';
      default:
        return '';
    }
  };

  const getPopoverPosition = () => {
    switch (placement) {
      case 'top':
        return 'bottom-full mb-2 left-1/2 transform -translate-x-1/2';
      case 'bottom':
        return 'top-full mt-2 left-1/2 transform -translate-x-1/2';
      case 'left':
        return 'right-full mr-2 top-1/2 transform -translate-y-1/2';
      case 'right':
        return 'left-full ml-2 top-1/2 transform -translate-y-1/2';
      default:
        return '';
    }
  };

  return (
    <div
      className="relative inline-block"
      onClick={trigger === 'click' ? handleToggle : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {visible && (
        <div className={`absolute z-10 p-2 bg-white dark:bg-gray-800 shadow-lg rounded ${getPopoverPosition()}`}>
          {/* 顯示三角形 */}
          <div
            className={`absolute w-3 h-3 bg-white dark:bg-gray-800 ${getArrowStyle()}`}
          />

          {/* 顯示內容 */}
          {title && <div className="font-bold mb-1">{title}</div>}
          <div>{content}</div>
        </div>
      )}
    </div>
  );
};

export default Popover;
