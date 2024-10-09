import type {
  Meta,
  StoryObj,
  StoryFn,
  StoryContext,
} from '@storybook/react';
import Loading from '../../components/Loading';
import { SPINNER_SIZES, BORDER_WIDTH, BORDER_STYLE } from '../../typings/components/spinner';
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';
import React, { useEffect } from 'react';
import { LIGHT_COLORS } from '../../typings/components/base/colors'; // 使用 LIGHT_COLORS 來對應 getColor 的鍵值

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

const meta: Meta<typeof Loading> = {
  title: 'Components/Loading',
  component: Loading,
  decorators: [withThemeProvider],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    message: { control: 'text', description: '設定顯示的訊息' },
    color: {
      control: { type: 'select' },
      options: Object.keys(LIGHT_COLORS),
      description: '設定 Spinner 顏色',
    },
    size: {
      control: { type: 'select' },
      options: SPINNER_SIZES,
      description: '設定 Spinner 大小',
    },
    borderWidth: {
      control: { type: 'select' },
      options: BORDER_WIDTH,
      description: '設定 Spinner 邊框寬度',
    },
    borderStyle: {
      control: { type: 'select' },
      options: BORDER_STYLE,
      description: '設定 Spinner 邊框樣式',
    },
    backgroundOpacity: {
      control: {
        type: 'range',
        min: 0,
        max: 1,
        step: 0.1,
      },
      description: '設定背景透明度',
    },
    variant: {
      control: { type: 'select', options: ['spinner', 'dots'] },
      description: '選擇 Loading 的樣式',
    },
    isLoading: {
      control: { type: 'boolean' },
      description: '控制 Loading 組件的顯示與隱藏',
    },
    isShowText: {
      control: { type: 'boolean' },
      description: '控制文字顯示與隱藏',
    },
  },
  args: {
    message: 'Loading...',
    color: 'PRIMARY',
    size: 64,
    borderWidth: 4,
    borderStyle: 'dashed',
    backgroundOpacity: 0.5,
    isLoading: true,
    isShowText: true,
    variant: 'spinner',
  },
};

export default meta;
type Story = StoryObj<typeof Loading>;

export const Default: Story = {};

export const LargeSize: Story = {
  args: {
    size: 120,
    message: 'Loading Large...',
  },
};

export const CustomColor: Story = {
  args: {
    color: 'SUCCESS',
    message: 'Loading with Custom Color...',
  },
};

export const LightBackground: Story = {
  args: {
    backgroundOpacity: 0.2,
    message: 'Loading with Light Background...',
  },
};

export const CustomMessage: Story = {
  args: {
    message: 'Please wait...',
  },
};

export const VariantDots: Story = {
  args: {
    variant: 'dots',
    message: 'Loading with Dots Style...',
    size: 80,
  },
};

export const DarkModeLoading: Story = {
  args: {
    color: 'LIGHT',
    size: 80,
    borderWidth: 8,
    borderStyle: 'solid',
    message: 'Loading in Dark Mode...',
  },
};
