import React from 'react';
import type { Meta, StoryObj, StoryFn, StoryContext } from '@storybook/react';
import Select from '../../components/Select';
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';

// 同步主題狀態的元件
const ThemeSyncWrapper: React.FC<{ theme: 'light' | 'dark'; children: React.ReactNode }> = ({ theme, children }) => {
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

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  decorators: [withThemeProvider],
  argTypes: {
    value: { control: 'text', description: '選擇的值' },
    label: { control: 'text', description: '顯示在 Select 上方的標籤' },
    placeholder: { control: 'text', description: '顯示的佔位符文字' },
    disabled: { control: 'boolean', description: '是否禁用' },
    searchable: { control: 'boolean', description: '是否可搜尋' },
    multiple: { control: 'boolean', description: '是否支持多選' },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
      description: 'Select 的樣式變體',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Select 的大小',
    },
    onChange: { action: 'changed', description: '當值改變時的事件' },
  },
  args: {
    value: '',
    label: 'Select an option',
    placeholder: 'Select an option',
    disabled: false,
    searchable: false,
    multiple: false,
    variant: 'primary',
    size: 'medium',
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

// 模擬選項數據
const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Disabled Option', value: '4', disabled: true },
  { label: 'Option 5', value: '5' },
];

// 基本範例
export const Default: Story = {
  args: {
    options,
  },
};

// 禁用範例
export const DisabledSelect: Story = {
  args: {
    label: 'Disabled Select',
    options,
    disabled: true,
  },
};

// 搜尋範例
export const SearchableSelect: Story = {
  args: {
    label: 'Searchable Select',
    options,
    searchable: true,
  },
};

// 多選範例
export const MultipleSelect: Story = {
  args: {
    label: 'Multiple Select',
    options,
    multiple: true,
  },
};

// 多選與搜尋結合範例
export const SearchableMultipleSelect: Story = {
  args: {
    label: 'Searchable Multiple Select',
    options,
    searchable: true,
    multiple: true,
  },
};

// 各種樣式變體
export const SuccessSelect: Story = { args: { variant: 'success', label: 'Success Select', options } };
export const DangerSelect: Story = { args: { variant: 'danger', label: 'Danger Select', options } };
export const WarningSelect: Story = { args: { variant: 'warning', label: 'Warning Select', options } };

// 不同尺寸範例
export const SmallSelect: Story = { args: { size: 'small', label: 'Small Select', options } };
export const LargeSelect: Story = { args: { size: 'large', label: 'Large Select', options } };

// 帶有佔位符的範例
export const PlaceholderSelect: Story = {
  args: {
    label: 'Placeholder Select',
    options,
    placeholder: 'Please select...',
  },
};
