import type {
  Meta,
  StoryObj,
  StoryFn,
  StoryContext,
} from '@storybook/react';
import Spinner from '../../components/Spinner';
import { SPINNER_SIZES, BORDER_WIDTH, BORDER_STYLE } from '../../typings/components/spinner';
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';
import React, { useEffect } from 'react';
import { LIGHT_COLORS } from '../../typings/components/base/colors'; // 引入 LIGHT_COLORS 以確保類型對應

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

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  decorators: [withThemeProvider],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: Object.keys(LIGHT_COLORS), // 以 LIGHT_COLORS 的鍵值作為選項
      description: '設定 Spinner 的顏色',
    },
    size: {
      control: { type: 'select' },
      options: SPINNER_SIZES,
      description: '設定 Spinner 的大小',
    },
    borderWidth: {
      control: { type: 'select' },
      options: BORDER_WIDTH,
      description: '設定 Spinner 的邊框寬度',
    },
    borderStyle: {
      control: { type: 'select' },
      options: BORDER_STYLE,
      description: '設定 Spinner 的邊框樣式',
    },
  },
  args: {
    color: 'PRIMARY',
    size: 64,
    borderWidth: 4,
    borderStyle: 'dashed',
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

// 預設故事：普通 Spinner 畫面
export const Default: Story = {};

// 大型 Spinner
export const LargeSize: Story = {
  args: {
    size: 120,
  },
};

// 自訂顏色 Spinner
export const CustomColor: Story = {
  args: {
    color: 'DANGER',
  },
};

// 不同邊框寬度的 Spinner
export const ThickBorder: Story = {
  args: {
    borderWidth: 16,
    size: 80,
  },
};

// 多樣化 Spinner 邊框樣式
export const MultipleStyles: Story = {
  args: {
    color: 'PURPLE',
    size: 120,
    borderWidth: 8,
    borderStyle: 'dotted',
  },
};

// 新增 Dark Mode 故事範例
export const DarkModeSpinner: Story = {
  args: {
    color: 'LIGHT',
    size: 80,
    borderWidth: 8,
    borderStyle: 'solid',
  },
};
