import React, { useState } from 'react';

// AccordionItem 元件定義
interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  isDisabled?: boolean; // 是否禁用此項目
  customIcon?: React.ReactNode; // 自定義圖標
  isAnimated?: boolean; // 是否啟用動畫效果
}

const AccordionItem: React.FC<AccordionItemProps> = ({ 
  title, 
  children, 
  isOpen = false, 
  onToggle, 
  isDisabled = false, 
  customIcon, 
  isAnimated = false
}) => {
  return (
    <div className={`border-b ${isDisabled ? 'opacity-50' : ''}`}>
      <button 
        className="w-full text-left p-4 hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={isDisabled ? undefined : onToggle}
        disabled={isDisabled}
      >
        <div className="flex justify-between items-center">
          <div className={`font-semibold ${isOpen ? 'text-blue-500' : 'text-black dark:text-white'}`}>
            {title}
          </div>
          {customIcon && <span>{customIcon}</span>}
        </div>
      </button>
      <div 
        className={`overflow-hidden ${isOpen ? (isAnimated ? 'max-h-screen' : 'max-h-auto') : 'max-h-0'} 
        ${isAnimated ? 'transition-all duration-500 ease-in-out' : ''}`}  // 決定是否應用動畫
      >
        {isOpen && (
          <div className="p-4 border-t bg-gray-50 dark:bg-gray-800">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

// Accordion 元件定義
interface AccordionProps {
  allowMultiple?: boolean; // 是否允許多個部分同時展開
  children: React.ReactNode;
  isAnimated?: boolean; // 是否添加展開/收起動畫效果
}

const Accordion: React.FC<AccordionProps> & { Item: React.FC<AccordionItemProps> } = ({ 
  allowMultiple = false, 
  children, 
  isAnimated = false 
}) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const handleToggle = (index: number) => {
    if (allowMultiple) {
      setOpenIndexes((prevIndexes) => 
        prevIndexes.includes(index) ? prevIndexes.filter(i => i !== index) : [...prevIndexes, index]
      );
    } else {
      setOpenIndexes((prevIndexes) => 
        prevIndexes.includes(index) ? [] : [index]
      );
    }
  };

  return (
    <div className="accordion">
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          // 傳遞 isAnimated 屬性給子項目
          return React.cloneElement(child as React.ReactElement<AccordionItemProps>, {
            isOpen: openIndexes.includes(index),
            onToggle: () => handleToggle(index),
            isAnimated: isAnimated,
          });
        }
        return null;
      })}
    </div>
  );
};

// 將 AccordionItem 添加到 Accordion 上，這樣可以使用 <Accordion.Item>
Accordion.Item = AccordionItem;

export default Accordion;
