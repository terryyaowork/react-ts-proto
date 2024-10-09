/* eslint-disable no-alert */
import type {
  Meta,
  StoryObj,
  StoryFn,
  StoryContext,
} from '@storybook/react';
import React, { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
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

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  decorators: [withThemeProvider],
  argTypes: {
    isOpen: { control: 'boolean', description: '控制 Modal 是否顯示' },
    title: { control: 'text', description: 'Modal 標題' },
    size: { control: { type: 'select' }, options: ['small', 'medium', 'large'], description: 'Modal 大小' },
    paddingSize: { control: { type: 'select' }, options: ['none', 'small', 'medium', 'large'], description: '內容區域 padding 大小' },
    footerAlignment: { control: { type: 'select' }, options: ['left', 'center', 'right'], description: '底部按鈕對齊方式' },
    showHeaderDivider: { control: 'boolean', description: '是否顯示標題分隔線' },
    showFooterDivider: { control: 'boolean', description: '是否顯示底部分隔線' },
    showOverlay: { control: 'boolean', description: '是否顯示背景遮罩' },
    closeOnOverlayClick: { control: 'boolean', description: '點擊遮罩是否關閉' },
    showCloseIcon: { control: 'boolean', description: '是否顯示右上角的關閉按鈕' },
    showDefaultFooter: { control: 'boolean', description: '是否顯示預設的 Footer 按鈕組合' },
  },
  args: {
    isOpen: true,
    title: '範例 Modal 標題',
    size: 'medium',
    paddingSize: 'medium',
    footerAlignment: 'right',
    showHeaderDivider: true,
    showFooterDivider: true,
    showOverlay: true,
    closeOnOverlayClick: true,
    showCloseIcon: false,
    showDefaultFooter: false,
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// 預設情境：普通的 Modal
export const Default: Story = {
  args: {
    children: '這是 Modal 的範例內容。',
  },
};

// 帶有多個按鈕的 Modal
export const WithMultipleButtons: Story = {
  args: {
    title: '帶有多個按鈕的 Modal',
    children: '這個 Modal 包含兩個按鈕：一個 "取消"，一個 "儲存變更"。',
    footerButtons: [
      <Button key="cancel" className='me-4' variant="secondary" onClick={() => alert('取消操作')}>
        取消
      </Button>,
      <Button key="save" variant="primary" onClick={() => alert('儲存變更')}>
        儲存變更
      </Button>,
    ],
  },
};

// 使用按鈕控制顯示與隱藏的 Template Story
const Template = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        開啟 Modal
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="帶有按鈕的 Modal"
      >
        <p>這是一個使用按鈕來開啟的 Modal。</p>
        <Button variant="secondary" onClick={() => setIsOpen(false)}>
          關閉 Modal
        </Button>
      </Modal>
    </>
  );
};

export const WithButton = Template.bind({});

// 大型 Modal
export const LargeModal: Story = {
  args: {
    size: 'large',
    children: '這是一個大型的 Modal 內容。',
  },
};

// 使用不同主題樣式的 Modal
export const ThemedModal: Story = {
  args: {
    children: (
      <div className="text-red-600">
        <p>這是一個使用紅色文字的樣式範例。</p>
      </div>
    ),
  },
};

// 帶有多行內容的 Modal
export const MultiContent: Story = {
  args: {
    children: (
      <>
        <p>這是第一行內容。</p>
        <p>這是第二行內容。</p>
        <hr className='my-4' />
        <Button variant="danger">操作按鈕</Button>
      </>
    ),
  },
};

// 類似 Bootstrap 樣式的 Modal
export const BootstrapModal: Story = {
  args: {
    title: 'Modal title',
    size: 'medium',
    paddingSize: 'medium',
    footerButtons: [
      <Button key="close" variant="secondary" className='me-4' onClick={() => alert('取消操作')}>
        Close
      </Button>,
      <Button key="save" variant="primary" onClick={() => alert('儲存變更')}>
        Save changes
      </Button>,
    ],
    children: (
      <>
        <p className="my-2">Modal body text goes here.</p>
      </>
    ),
  },
};

// 帶有不同 padding 的 Modal
export const PaddedModal: Story = {
  args: {
    title: '帶有不同 Padding 的 Modal',
    paddingSize: 'large',
    children: (
      <>
        <p>這是一個使用 large padding 的 Modal 內容。</p>
      </>
    ),
  },
};

// 小尺寸的 Modal
export const SmallModal: Story = {
  args: {
    title: '小尺寸的 Modal',
    size: 'small',
    paddingSize: 'small',
    children: '這是一個小尺寸的 Modal 範例。',
  },
};

// 透明背景的 Modal
export const TransparentOverlay: Story = {
  args: {
    title: '透明背景的 Modal',
    showOverlay: false, // 移除背景遮罩
    children: '這是一個沒有背景遮罩的 Modal。',
  },
};

// 增加的範例：按鈕對齊方式變化
export const CenterAlignedFooter: Story = {
  args: {
    title: '置中對齊的 Footer 按鈕',
    footerAlignment: 'center',
    children: '這個 Modal 使用置中對齊的按鈕。',
    footerButtons: [
      <Button key="confirm" variant="primary" onClick={() => alert('確認操作')}>
        確認
      </Button>,
    ],
  },
};

export const LeftAlignedFooter: Story = {
  args: {
    title: '左對齊的 Footer 按鈕',
    footerAlignment: 'left',
    children: '這個 Modal 使用左對齊的按鈕。',
    showCloseIcon: true, // 確保右上角的關閉按鈕顯示
    footerButtons: [
      <Button key="back" className="me-4" variant="secondary" onClick={() => alert('返回操作')}>
        返回
      </Button>,
      <Button key="proceed" variant="success" onClick={() => alert('繼續操作')}>
        繼續
      </Button>,
    ],
  },
};
