import React from 'react';
import Button from './Button';
import { useTheme } from '../contexts/ThemeContext';

type ModalSize = 'small' | 'medium' | 'large';
type ModalPadding = 'none' | 'small' | 'medium' | 'large';
type ModalFooterAlignment = 'left' | 'center' | 'right';

interface ModalProps {
  isOpen: boolean;
  title?: string;
  children?: React.ReactNode;
  footerButtons?: React.ReactNode[];
  onClose?: () => void;
  size?: ModalSize;
  paddingSize?: ModalPadding;
  footerAlignment?: ModalFooterAlignment;
  showHeaderDivider?: boolean;
  showFooterDivider?: boolean;
  showOverlay?: boolean;
  closeOnOverlayClick?: boolean;
  showCloseIcon?: boolean;
  showDefaultFooter?: boolean;
}

// 定義各大小的樣式
const sizeStyles: Record<ModalSize, string> = {
  small: 'max-w-xs',
  medium: 'max-w-md',
  large: 'max-w-lg',
};

// 定義 padding 尺寸的樣式
const paddingStyles: Record<ModalPadding, string> = {
  none: 'p-0',
  small: 'p-4',
  medium: 'p-6',
  large: 'p-8',
};

// 定義按鈕對齊方式的樣式
const footerAlignmentStyles: Record<ModalFooterAlignment, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  children,
  footerButtons,
  onClose,
  size = 'medium',
  paddingSize = 'medium',
  footerAlignment = 'right',
  showHeaderDivider = true,
  showFooterDivider = true,
  showOverlay = true,
  closeOnOverlayClick = true,
  showCloseIcon = false,
  showDefaultFooter = false,
}) => {
  const { isDarkMode } = useTheme(); // 取得當前主題模式

  // 當 Modal 關閉時，直接返回 null，不渲染任何內容
  if (!isOpen) return null;

  const backgroundColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const borderColor = isDarkMode ? 'border-gray-600' : 'border-gray-300';

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${showOverlay ? 'bg-black bg-opacity-50' : ''}`}
      onClick={closeOnOverlayClick && onClose ? onClose : undefined}
    >
      {/* Modal 內容區域 */}
      <div
        className={`${backgroundColor} ${textColor} border ${borderColor} rounded shadow-lg w-full ${sizeStyles[size]}`}
        onClick={(e) => e.stopPropagation()} // 阻止事件冒泡，避免點擊 Modal 內容關閉
      >
        {/* Modal 標題區域 */}
        {title && (
          <div className={`px-6 py-4 flex items-center justify-between ${showHeaderDivider ? 'border-b' : ''} ${borderColor}`}>
            <h2 className="text-xl font-semibold">{title}</h2>
            {showCloseIcon && (
              <button onClick={onClose} className="text-2xl font-bold leading-none focus:outline-none">
                &times;
              </button>
            )}
          </div>
        )}

        {/* Modal 主體區域 */}
        <div className={`px-6 py-4 ${paddingStyles[paddingSize]}`}>{children}</div>

        {/* Modal 底部按鈕區域 */}
        {(showDefaultFooter || footerButtons) && (
          <div className={`px-6 py-4 flex ${footerAlignmentStyles[footerAlignment]} gap-2 ${showFooterDivider ? 'border-t' : ''} ${borderColor}`}>
            {footerButtons ? (
              footerButtons.map((button, index) => <div key={index}>{button}</div>)
            ) : (
              showDefaultFooter && (
                <>
                  <Button variant="secondary" onClick={onClose}>
                    Close
                  </Button>
                  <Button variant="primary">Save changes</Button>
                </>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
