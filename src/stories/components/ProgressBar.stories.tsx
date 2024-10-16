import React from 'react';
import type { Meta, StoryObj, StoryFn, StoryContext } from '@storybook/react';
import ProgressBar from '../../components/ProgressBar';
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';

// 同步主題狀態的元件
const ThemeSyncWrapper: React.FC<{ theme: 'light' | 'dark'; children: React.ReactNode }> = ({
  theme,
  children,
}) => {
  const { setIsDarkMode } = useTheme();

  React.useEffect(() => {
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

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  decorators: [withThemeProvider],
  argTypes: {
    value: { control: 'number', description: '進度值 (0-100)' },
    label: { control: 'boolean', description: '是否顯示百分比' },
    striped: { control: 'boolean', description: '是否使用條紋樣式' },
    animated: { control: 'boolean', description: '是否使用動畫效果' },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
      description: '進度條樣式變體',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '進度條大小',
    },
    style: { control: 'object', description: '自訂行內樣式' },
  },
  args: {
    value: 50,
    label: true,
    striped: false,
    animated: false,
    variant: 'primary',
    size: 'medium',
    style: { width: '300px' },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

// 基本範例
export const Default: Story = {};

// 條紋進度條
export const StripedProgressBar: Story = {
  args: {
    striped: true,
    value: 75,
  },
};

// 動畫進度條
export const AnimatedProgressBar: Story = {
  args: {
    animated: true,
    striped: true,
    value: 70,
  },
};

// 不同大小的進度條
export const SmallProgressBar: Story = {
  args: {
    size: 'small',
    value: 60,
    style: { width: '200px' },
  },
};

export const LargeProgressBar: Story = {
  args: {
    size: 'large',
    value: 85,
    style: { width: '600px' },
  },
};

// 不同樣式的進度條
export const SuccessProgressBar: Story = {
  args: {
    variant: 'success',
    value: 90,
  },
};

export const DangerProgressBar: Story = {
  args: {
    variant: 'danger',
    value: 40,
  },
};

export const WarningProgressBar: Story = {
  args: {
    variant: 'warning',
    value: 25,
  },
};

export const InfoProgressBar: Story = {
  args: {
    variant: 'info',
    value: 50,
  },
};

// 顯示或隱藏進度百分比標籤
export const NoLabelProgressBar: Story = {
  args: {
    label: false,
    value: 65,
  },
};

// 全寬進度條
export const FullWidthProgressBar: Story = {
  args: {
    value: 100,
    style: { width: '100%' },
  },
};

// 暗黑模式範例
export const DarkModeProgressBar: Story = {
  args: { variant: 'primary', value: 75 },
  parameters: { backgrounds: { default: 'dark' } },
};
