import type {
  Meta,
  StoryObj,
  StoryFn,
  StoryContext,
} from '@storybook/react';
import Alert from '../../components/Alert';
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';
import React, { useEffect } from 'react';

// 新增一個同步主題狀態的元件，並修正 `children` 類型
const ThemeSyncWrapper: React.FC<{
  theme: 'light' | 'dark';
  children: React.ReactNode;
}> = ({ theme, children }) => {
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
    <ThemeProvider initialTheme={theme}>
      <ThemeSyncWrapper theme={theme}>
        <div className={theme === 'dark' ? 'dark' : ''} style={{ padding: '20px' }}>
          <Story />
        </div>
      </ThemeSyncWrapper>
    </ThemeProvider>
  );
};

// 定義 Meta 資訊
const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  decorators: [withThemeProvider],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
      description: '設定 Alert 的類型',
    },
    message: {
      control: 'text',
      description: '顯示的主要訊息，可以是文字或 ReactNode',
    },
    dismissible: {
      control: 'boolean',
      description: '是否可以被關閉',
    },
    outline: {
      control: 'boolean',
      description: '是否使用 outline 樣式',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '調整不同大小的 Alert',
    },
    autoClose: {
      control: { type: 'number', min: 1000, step: 500 },
      description: '自動消失時間（毫秒）',
    },
  },
  args: {
    type: 'info',
    message: '這是一個提示訊息！',
    dismissible: false,
    outline: false,
    size: 'medium',
    autoClose: 0, // 預設不自動關閉
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {};
export const Dismissible: Story = {
  args: {
    dismissible: true,
    message: '這是一個可關閉的訊息。',
  },
};
export const AutoClose: Story = {
  args: {
    dismissible: true,
    autoClose: 3000,
    message: '這個訊息會在 3 秒後自動消失。',
  },
};
export const OutlineAlert: Story = {
  args: {
    outline: true,
    type: 'danger',
    message: '這是一個使用 Outline 樣式的警告訊息。',
  },
};
export const LargeAlert: Story = {
  args: {
    size: 'large',
    message: '這是一個大型的訊息提示。',
  },
};
export const MultiLine: Story = {
  args: {
    message: (
      <div>
        <p>這是一個多行的訊息。</p>
        <p>可以使用 React 元素來呈現不同格式的訊息。</p>
      </div>
    ),
  },
};
export const AutoCloseWithFadeOut: Story = {
  args: {
    autoClose: 3000,
    dismissible: true,
    message: '這個訊息會在 3 秒後淡出並消失。',
  },
};
