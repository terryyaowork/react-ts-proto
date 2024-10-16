import React from 'react';

interface OffcanvasProps {
  title?: string;
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  placement?: 'start' | 'end' | 'top' | 'bottom';
}

const Offcanvas: React.FC<OffcanvasProps> = ({
  title,
  show,
  onClose,
  children,
  placement = 'start',
}) => {
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose(); // 當點擊背景時觸發 onClose
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black bg-opacity-50 ${
        show ? 'block' : 'hidden'
      }`}
      onClick={handleBackgroundClick} // 添加背景點擊事件
    >
      <div
        className={`fixed bg-white dark:bg-gray-800 h-full ${
          placement === 'start'
            ? 'left-0 top-0 w-64'
            : placement === 'end'
            ? 'right-0 top-0 w-64'
            : placement === 'top'
            ? 'left-0 top-0 w-full h-1/3'
            : 'left-0 bottom-0 w-full h-1/3'
        } transition-transform transform ${
          show ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          {title && <h5 className="text-lg font-bold">{title}</h5>}
          <button
            className="absolute top-4 right-4 text-gray-700 dark:text-gray-300"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Offcanvas;
