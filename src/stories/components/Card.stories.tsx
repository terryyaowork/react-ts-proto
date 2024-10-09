/* eslint-disable no-alert */
import type {
  Meta,
  StoryObj,
  StoryFn,
  StoryContext,
} from '@storybook/react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import React, { useEffect } from 'react';
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';

// 同步主題狀態的元件
const ThemeSyncWrapper: React.FC<{ theme: 'light' | 'dark'; children: React.ReactNode }> = ({
  theme,
  children,
}) => {
  const { setIsDarkMode } = useTheme();

  useEffect(() => {
    setIsDarkMode(theme === 'dark');
  }, [theme, setIsDarkMode]);

  return <>{children}</>;
};

// 自定義 ThemeProvider 裝飾器
const withThemeProvider = (Story: StoryFn, context: StoryContext) => {
  const { theme } = context.globals;
  return (
    <ThemeProvider>
      <ThemeSyncWrapper theme={theme}>
        <div className={theme === 'dark' ? 'dark' : ''} style={{ padding: '20px' }}>
          <Story />
        </div>
      </ThemeSyncWrapper>
    </ThemeProvider>
  );
};

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  decorators: [withThemeProvider], // 使用自定義 ThemeProvider
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
      description: '設定 Card 的樣式變體',
    },
    title: { control: 'text', description: '設定 Card 的標題' },
    imageSrc: { control: 'text', description: '設定 Card 的顯示圖片' },
    imageAlt: { control: 'text', description: '設定 Card 圖片的替代文字' },
    footerAlignment: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: '控制 Footer 中按鈕的對齊方式',
    },
    footerButtons: { control: 'object', description: 'Footer 中顯示的按鈕組合' },
    className: { control: 'text', description: '自定義 className' },
    children: { control: 'text', description: '卡片主體顯示的內容' },
    multiCardMode: {
      control: { type: 'select' },
      options: ['scroll', 'slide'],
      description: '多卡片顯示模式（scroll 或 slide）',
    },
    slideInterval: {
      control: { type: 'number' },
      description: '圖片滑動切換的時間間隔（毫秒）',
    },
    maxWidth: {
      control: { type: 'text' },
      description: '設定卡片的最大寬度 (如: "400px", "100%" 或 "auto")',
    },
  },
  args: {
    variant: 'light',
    title: '範例卡片標題',
    footerAlignment: 'right',
    children: '這是一個卡片範例內容。',
    multiCardMode: 'scroll',
    slideInterval: 3000,
    maxWidth: '400px', // 設定預設最大寬度
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// Default Card
export const Default: Story = {};

// 主題卡片範例
export const PrimaryCard: Story = {
  args: {
    variant: 'primary',
    title: 'Primary Card',
    children: '這是一個 Primary 樣式的卡片。',
    maxWidth: '300px', // 在這個範例中指定 maxWidth
  },
};

// Secondary Card
export const SecondaryCard: Story = {
  args: {
    variant: 'secondary',
    title: 'Secondary Card',
    children: '這是一個 Secondary 樣式的卡片。',
    maxWidth: '500px', // 在這個範例中指定更寬的 maxWidth
  },
};

// 帶有 Footer 按鈕的卡片
export const WithFooter: Story = {
  args: {
    title: '帶有按鈕的卡片',
    children: '這是一個帶有 Footer 按鈕的卡片範例。',
    footerButtons: [
      { label: '顯示詳情', onClick: () => alert('顯示詳情'), variant: 'primary' },
      { label: '刪除', onClick: () => alert('刪除卡片'), variant: 'danger' },
    ],
  },
};

// 帶有單一圖片的卡片
export const ImageCard: Story = {
  args: {
    title: '帶有圖片的卡片',
    imageSrc: 'https://via.placeholder.com/300x150.png?text=Image+cap',
    imageAlt: '範例圖片',
    children: '這是帶有圖片的卡片範例。',
    footerButtons: [{ label: '了解更多', onClick: () => alert('了解更多'), variant: 'primary' }],
  },
};

// 大型卡片範例
export const LargeCard: Story = {
  args: {
    variant: 'light',
    title: '大型卡片範例',
    imageSrc: 'https://via.placeholder.com/600x300.png?text=Large+Image',
    imageAlt: '大型範例圖片',
    children: '這是一個大型卡片範例，可以用於展示更多內容。',
    maxWidth: '600px',
    footerButtons: [
      { label: '開始', onClick: () => alert('開始操作'), variant: 'success' },
      { label: '取消', onClick: () => alert('取消操作'), variant: 'secondary' },
    ],
  },
};

// 左對齊 Footer 的卡片範例
export const LeftAlignedFooter: Story = {
  args: {
    title: '左對齊 Footer 按鈕',
    footerAlignment: 'left',
    children: '這是一個左對齊按鈕的範例。',
    footerButtons: [
      { label: '返回', onClick: () => alert('返回操作'), variant: 'secondary' },
      { label: '繼續', onClick: () => alert('繼續操作'), variant: 'primary' },
    ],
  },
};

// 帶有多圖滑動功能的卡片
export const SlideImageCard: Story = {
  args: {
    title: '多圖滑動的卡片',
    imageSlides: [
      'https://via.placeholder.com/300x150.png?text=Slide+1',
      'https://via.placeholder.com/300x150.png?text=Slide+2',
      'https://via.placeholder.com/300x150.png?text=Slide+3',
    ],
    children: '這是一個帶有多圖滑動效果的卡片，可以自動切換。',
    footerButtons: [{ label: '瞭解更多', onClick: () => alert('瞭解更多'), variant: 'info' }],
    multiCardMode: 'slide',
    slideInterval: 2000,
  },
};

// 多卡片顯示模式（scroll）
export const ScrollCardList: Story = {
  render: () => (
    <div className="overflow-x-auto flex gap-4 w-90" style={{ whiteSpace: 'nowrap' }}>
      <Card
        title="卡片 1"
        children="這是卡片 1 的內容。"
        footerButtons={[{ label: '查看更多', onClick: () => alert('查看卡片 1') }]}
        style={{ minWidth: '250px' }}
      />
      <Card
        title="卡片 2"
        imageSrc="https://via.placeholder.com/300x150.png?text=Card+Image"
        children="這是卡片 2 的內容。"
        footerButtons={[
          <Button key="more-info" variant="info">
            了解更多
          </Button>,
          { label: '刪除', onClick: () => alert('刪除卡片 2'), variant: 'danger' },
        ]}
        style={{ minWidth: '250px' }}
      />
      <Card
        title="卡片 3"
        imageSrc="https://via.placeholder.com/300x150.png?text=Card+Image"
        children="這是卡片 3 的內容。"
        footerButtons={[{ label: '開始', onClick: () => alert('開始卡片 3 操作'), variant: 'success' }]}
        style={{ minWidth: '250px' }}
      />
      <Card
        title="卡片 4"
        imageSrc="https://via.placeholder.com/300x150.png?text=Card+Image"
        children="這是卡片 4 的內容。"
        footerButtons={[{ label: '開始', onClick: () => alert('開始卡片 4 操作'), variant: 'info' }]}
        style={{ minWidth: '250px' }}
      />
      <Card
        title="卡片 5"
        imageSrc="https://via.placeholder.com/300x150.png?text=Card+Image"
        children="這是卡片 5 的內容。"
        footerButtons={[{ label: '開始', onClick: () => alert('開始卡片 5 操作'), variant: 'danger' }]}
        style={{ minWidth: '250px' }}
      />
      <Card
        title="卡片 6"
        imageSrc="https://via.placeholder.com/300x150.png?text=Card+Image"
        children="這是卡片 6 的內容。"
        footerButtons={[{ label: '開始', onClick: () => alert('開始卡片 6 操作'), variant: 'success' }]}
        style={{ minWidth: '250px' }}
      />
      <Card
        title="卡片 7"
        imageSrc="https://via.placeholder.com/300x150.png?text=Card+Image"
        children="這是卡片 7 的內容。"
        footerButtons={[{ label: '開始', onClick: () => alert('開始卡片 7 操作'), variant: 'info' }]}
        style={{ minWidth: '250px' }}
      />
      <Card
        title="卡片 8"
        imageSrc="https://via.placeholder.com/300x150.png?text=Card+Image"
        children="這是卡片 8 的內容。"
        footerButtons={[{ label: '開始', onClick: () => alert('開始卡片 8 操作'), variant: 'danger' }]}
        style={{ minWidth: '250px' }}
      />
    </div>
  ),
};
