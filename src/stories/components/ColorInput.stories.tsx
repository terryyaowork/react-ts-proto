import React from 'react';
import type { Meta, StoryObj, StoryFn, StoryContext } from '@storybook/react';
import ColorInput from '../../components/ColorInput';
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';

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

const meta: Meta<typeof ColorInput> = {
  title: 'Components/ColorInput',
  component: ColorInput,
  decorators: [withThemeProvider],
  argTypes: {
    id: { control: 'text', description: 'ColorInput 的 id 屬性' },
    label: { control: 'text', description: '顯示在 ColorInput 上方的標籤' },
    value: { control: 'color', description: '選擇的顏色值' },
    disabled: { control: 'boolean', description: '是否禁用' },
    pickerType: {
      control: { type: 'select' },
      options: ['default', 'sketch', 'chrome', 'twitter', 'circle'],
      description: '選擇顏色選擇器的顯示類型',
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
      description: 'ColorInput 的樣式變體',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'ColorInput 的大小',
    },
    onChange: { action: 'changed', description: '選擇顏色變更時的事件' },
    className: { control: 'text', description: '自定義樣式類名' },
    style: { control: 'object', description: '自定義行內樣式' },
  },
  args: {
    id: 'color-input-1',
    label: 'Choose a Color',
    value: '#000000',
    disabled: false,
    pickerType: 'default',
    variant: 'primary',
    size: 'medium',
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ColorInput>;

// 基本範例
export const Default: Story = {};

// 禁用範例
export const DisabledColorInput: Story = {
  args: {
    label: 'Disabled Color Input',
    disabled: true,
  },
};

// 自定義顏色值範例
export const PredefinedColorInput: Story = {
  args: {
    label: 'Predefined Color Input',
    value: '#ff0000',
  },
};

// 各種樣式變體
export const SuccessColorInput: Story = { args: { variant: 'success', label: 'Success Color' } };
export const DangerColorInput: Story = { args: { variant: 'danger', label: 'Danger Color' } };
export const WarningColorInput: Story = { args: { variant: 'warning', label: 'Warning Color' } };

// 不同尺寸範例
export const SmallColorInput: Story = { args: { size: 'small', label: 'Small Color Input' } };
export const LargeColorInput: Story = { args: { size: 'large', label: 'Large Color Input' } };

// 暗黑模式範例
export const DarkModeColorInput: Story = {
  args: { variant: 'primary', label: 'Dark Mode Color Input' },
  parameters: { backgrounds: { default: 'dark' } },
};

// 各種顏色選擇器範例
export const SketchPickerExample: Story = { args: { pickerType: 'sketch', label: 'Sketch Picker' } };
export const ChromePickerExample: Story = { args: { pickerType: 'chrome', label: 'Chrome Picker' } };
export const TwitterPickerExample: Story = { args: { pickerType: 'twitter', label: 'Twitter Picker' } };
export const CirclePickerExample: Story = { args: { pickerType: 'circle', label: 'Circle Picker' } };
