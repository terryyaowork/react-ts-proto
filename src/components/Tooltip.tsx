import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  children: React.ReactNode;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'top',
  delay = 200,
  children,
  className = '',
}) => {
  const [visible, setVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    const id = setTimeout(() => {
      setVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setVisible(false);
    }
  };

  const tooltipPositionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };

  // 使用伪元素在 Tooltip 上方或下方顯示三角形
  const trianglePositionClasses = {
    top: 'before:content-[""] before:absolute before:left-1/2 before:bottom-[-12px] before:border-[6px] before:border-transparent before:border-t-black before:transform before:-translate-x-1/2',
    bottom: 'before:content-[""] before:absolute before:left-1/2 before:top-[-12px] before:border-[6px] before:border-transparent before:border-b-black before:transform before:-translate-x-1/2',
    left: 'before:content-[""] before:absolute before:right-[-12px] before:top-1/2 before:border-[6px] before:border-transparent before:border-l-black before:transform before:-translate-y-1/2',
    right: 'before:content-[""] before:absolute before:left-[-12px] before:top-1/2 before:border-[6px] before:border-transparent before:border-r-black before:transform before:-translate-y-1/2',
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {visible && (
        <div
          className={`absolute z-10 px-2 py-1 text-white bg-black rounded shadow-md whitespace-nowrap ${tooltipPositionClasses[position]} ${trianglePositionClasses[position]}`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
