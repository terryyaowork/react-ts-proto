import type {
  Meta,
  StoryObj,
  StoryFn,
  StoryContext,
} from '@storybook/react';
import Button from '../../components/Button';
import {
  FiArrowRight,
  FiCheckCircle,
  FiDownload,
  FiTrash,
} from 'react-icons/fi';
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';
import React, { useEffect } from 'react';

// 同步主題狀態的元件
const ThemeSyncWrapper: React.FC<{ theme: 'light' | 'dark'; children: React.ReactNode }> = ({ theme, children }) => {
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

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  decorators: [withThemeProvider],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
      description: '按鈕樣式變體',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '按鈕大小設定',
    },
    outline: {
      control: 'boolean',
      description: '是否使用邊框樣式',
    },
    block: {
      control: 'boolean',
      description: '按鈕是否撐滿整行',
    },
    rounded: {
      control: 'boolean',
      description: '是否使用圓角樣式',
    },
    loading: {
      control: 'boolean',
      description: '顯示載入狀態',
    },
    disabled: {
      control: 'boolean',
      description: '禁用按鈕',
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom'],
      description: '設定圖標的位置',
    },
    icon: {
      table: { disable: true }, // 在 Controls 面板中隱藏 `icon` 控制項
    },
    href: {
      control: 'text',
      description: '如果設置為鏈接，按鈕會變為 `<a>` 標籤',
    },
    children: {
      control: 'text',
      description: '按鈕顯示的內容',
    },
  },
  args: {
    variant: 'primary',
    size: 'medium',
    outline: false,
    block: false,
    rounded: false,
    loading: false,
    disabled: false,
    children: 'Button',
    href: '',
    iconPosition: 'left',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

// Outline Button
export const OutlineButton: Story = {
  args: {
    outline: true,
    children: 'Outline Button',
  },
};

// Loading Button
export const LoadingButton: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
};

// Disabled Button
export const DisabledButton: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

// Button with Icon
export const IconButton: Story = {
  args: {
    icon: <FiDownload />,
    children: 'Download',
  },
};

// Button with Left Icon
export const LeftIconButton: Story = {
  args: {
    icon: <FiCheckCircle />,
    children: 'Check',
  },
};

// Button with Right Icon
export const RightIconButton: Story = {
  args: {
    icon: <FiArrowRight />,
    children: 'Next',
    iconPosition: 'right', // 確保 icon 在右邊
  },
};

// Block Button
export const BlockButton: Story = {
  args: {
    icon: <FiTrash />,
    block: true,
    children: 'Block Button',
  },
};

// Round Button
export const RoundedButton: Story = {
  args: {
    rounded: true,
    children: 'Rounded Button',
  },
};

// 新增 LinkButton 測試案例
export const LinkButton: Story = {
  args: {
    href: 'https://example.com', // 指定 href，按鈕變成一個鏈接
    children: 'Go to Example',
    variant: 'primary', // 選擇變體
    icon: <FiArrowRight />, // 添加一個圖標
    iconPosition: 'right', // 設置圖標位置為右側
  },
};
