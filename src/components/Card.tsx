import React from 'react';
import Button from './Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import type { ButtonVariant } from './Button';
import { useTheme } from '../contexts/ThemeContext'; // 引入 useTheme 來取得主題狀態
import { getColor, getTextColor } from '../utils/getColor'; // 引入動態顏色函數

type CardVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
type ButtonElement = React.ReactNode | {
  label: string; onClick: () => void; variant?: ButtonVariant
};

interface CardProps {
  title?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageSlides?: string[];
  variant?: CardVariant;
  maxWidth?: string;
  shadow?: 'none' | 'small' | 'medium' | 'large';
  children?: React.ReactNode;
  footerButtons?: ButtonElement[];
  footerAlignment?: 'left' | 'center' | 'right';
  className?: string;
  style?: React.CSSProperties;
  multiCardMode?: 'scroll' | 'slide';
  slideInterval?: number;
  arrowColor?: string;
  dotColor?: string;
}

const shadowStyles: Record<'none' | 'small' | 'medium' | 'large', string> = {
  none: 'shadow-none',
  small: 'shadow-sm',
  medium: 'shadow-md',
  large: 'shadow-lg',
};

const alignmentStyles: Record<'left' | 'center' | 'right', string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

const isButtonConfig = (
  element: ButtonElement,
): element is { label: string; onClick: () => void; variant?: ButtonVariant } => typeof element === 'object' && element !== null && 'label' in element && 'onClick' in element;

const Card: React.FC<CardProps> = ({
  title,
  imageSrc,
  imageAlt,
  imageSlides = [],
  variant = 'light',
  maxWidth,
  shadow = 'medium',
  children,
  footerButtons,
  footerAlignment = 'right',
  className = '',
  style,
  multiCardMode = 'scroll',
  slideInterval = 3000,
  arrowColor = '#000',
  dotColor = '#000',
}) => {
  const { isDarkMode } = useTheme(); // 取得主題模式狀態

  // 根據主題模式設定卡片背景色與文字色
  const backgroundColor = getColor(variant.toUpperCase() as keyof typeof getColor, isDarkMode);
  const textColor = getTextColor(variant.toUpperCase() as keyof typeof getTextColor, isDarkMode);

  const customSwiperStyles = `
    .swiper-button-next, .swiper-button-prev {
      color: ${arrowColor};
    }
    .swiper-pagination-bullet {
      background-color: ${dotColor};
    }
  `;

  const renderContent = () => {
    if (multiCardMode === 'slide') {
      return (
        <>
          <style>{customSwiperStyles}</style>
          <Swiper
            spaceBetween={30}
            pagination={{ clickable: true }}
            navigation
            modules={[Navigation, Pagination]}
            autoplay={{ delay: slideInterval, disableOnInteraction: false }}
          >
            {imageSlides.map((src, index) => (
              <SwiperSlide key={index}>
                <img src={src} alt={`${imageAlt || 'Slide'} ${index + 1}`} className="w-full h-48 object-cover rounded-t" />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      );
    }

    if (multiCardMode === 'scroll') {
      return (
        <div className="flex overflow-x-auto gap-4 p-2" style={{ whiteSpace: 'nowrap' }}>
          {imageSlides.map((src, index) => (
            <div key={index} className="flex-none">
              <img src={src} alt={`${imageAlt || 'Slide'} ${index + 1}`} className="w-full h-48 object-cover rounded-t" style={{ width: '250px' }} />
            </div>
          ))}
        </div>
      );
    }

    return imageSrc ? <img src={imageSrc} alt={imageAlt} className="w-full h-48 object-cover rounded-t" /> : null;
  };

  return (
    <div
      className={`border rounded ${shadowStyles[shadow]} ${className}`}
      style={{
        maxWidth,
        width: '100%',
        backgroundColor,
        color: textColor,
        ...style,
      }}
    >
      {renderContent()}
      <div className="p-4">
        {title && <h5 className="font-bold text-lg mb-2">{title}</h5>}
        <div className="text-base">{children}</div>
      </div>

      {footerButtons && (
        <div className={`border-t p-4 flex ${alignmentStyles[footerAlignment]} gap-2`}>
          {footerButtons.map((button, index) => {
            if (isButtonConfig(button)) {
              return (
                <Button key={index} variant={button.variant} onClick={button.onClick}>
                  {button.label}
                </Button>
              );
            }
            return <div key={index}>{button}</div>;
          })}
        </div>
      )}
    </div>
  );
};

export default Card;
