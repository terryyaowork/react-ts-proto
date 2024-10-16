import React from 'react';
import type {
  Meta,
  StoryObj,
  StoryFn,
  StoryContext,
} from '@storybook/react';
import FileInput from '../../components/FileInput';
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

const meta: Meta<typeof FileInput> = {
  title: 'Components/FileInput',
  component: FileInput,
  decorators: [withThemeProvider as any], // 使用 `as any` 暫時忽略類型問題
  argTypes: {
    id: { control: 'text', description: 'FileInput 的 id 屬性' },
    label: { control: 'text', description: '顯示在 FileInput 上方的標籤' },
    multiple: { control: 'boolean', description: '是否支援多檔上傳' },
    disabled: { control: 'boolean', description: '是否禁用' },
    accept: { control: 'text', description: '接受的檔案類型，例如 .jpg, .png, image/*' },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
      description: 'FileInput 的樣式變體',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'FileInput 的大小',
    },
    onChange: { action: 'changed', description: '檔案選擇變更時的事件' },
    className: { control: 'text', description: '自定義樣式類名' },
    style: { control: 'object', description: '自定義行內樣式' },
  },
  args: {
    id: 'file-input-1',
    label: 'Upload a File',
    multiple: false,
    disabled: false,
    accept: '',
    variant: 'primary',
    size: 'medium',
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof FileInput>;

// 基本範例
export const Default: Story = {};

// 禁用範例
export const DisabledFileInput: Story = {
  args: {
    label: 'Disabled File Input',
    disabled: true,
  },
};

// 多檔上傳
export const MultipleFileInput: Story = {
  args: {
    label: 'Multiple File Upload',
    multiple: true,
  },
};

// 接受指定格式
export const AcceptImageFiles: Story = {
  args: {
    label: 'Accept Image Files Only',
    accept: 'image/*',
  },
};

// 單檔上傳，僅接受 PNG
export const SinglePNGFileInput: Story = {
  args: {
    label: 'Accept Only .png Files',
    accept: '.png',
    multiple: false,
  },
};

// 測試各種樣式變體
export const PrimaryVariant: Story = { args: { variant: 'primary', label: 'Primary Variant' } };
export const DangerVariant: Story = { args: { variant: 'danger', label: 'Danger Variant' } };

// 測試不同大小
export const SmallFileInput: Story = { args: { size: 'small', label: 'Small Size File Input' } };
export const MediumFileInput: Story = { args: { size: 'medium', label: 'Medium Size File Input' } };
export const LargeFileInput: Story = { args: { size: 'large', label: 'Large Size File Input' } };

// 暗黑模式範例
export const DarkModeFileInput: Story = {
  args: { variant: 'primary', label: 'Dark Mode File Input' },
  parameters: { backgrounds: { default: 'dark' } },
};
