import type {
  Meta,
  StoryObj,
  StoryFn,
  StoryContext,
} from '@storybook/react';
import Input from '../../components/Input';
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';
import React, { useEffect } from 'react';
import { FiSearch, FiUser, FiLock } from 'react-icons/fi';

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

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  decorators: [withThemeProvider],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number', 'search', 'tel', 'url'],
      description: '設定 Input 的類型',
    },
    value: { control: 'text', description: '設定 Input 的值' },
    placeholder: { control: 'text', description: '設定顯示的提示字' },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
      description: '設定 Input 的樣式變體',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '設定 Input 的大小',
    },
    radius: {
      control: { type: 'select' },
      options: ['none', 'small', 'medium', 'large', 'full'],
      description: '設定 Input 的圓角樣式',
    },
    icon: {
      control: false, // 禁用控制面板顯示
      description: '顯示在輸入框內的圖標',
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: '設定圖標顯示位置',
    },
    showPasswordToggle: {
      control: 'boolean',
      description: '是否顯示密碼切換按鈕（僅當類型為 password 時生效）',
    },
    disabled: { control: 'boolean', description: '是否禁用' },
    onChange: { action: 'changed', description: '值變更時觸發的函式' },
    className: { control: 'text', description: '自定義樣式類名' },
    style: { control: 'object', description: '自定義行內樣式' },
  },
  args: {
    type: 'text',
    placeholder: '請輸入文字...',
    variant: 'primary',
    size: 'medium',
    radius: 'medium',
    disabled: false,
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// 預設故事：普通 Input 畫面
export const Default: Story = {};

// 樣式變體
export const PrimaryInput: Story = { args: { variant: 'primary', placeholder: 'Primary Input' } };
export const SuccessInput: Story = { args: { variant: 'success', placeholder: 'Success Input' } };
export const DangerInput: Story = { args: { variant: 'danger', placeholder: 'Danger Input' } };
export const WarningInput: Story = { args: { variant: 'warning', placeholder: 'Warning Input' } };

// 禁用狀態
export const DisabledPrimary: Story = { args: { variant: 'primary', placeholder: 'Disabled Primary Input', disabled: true } };
export const DisabledSuccess: Story = { args: { variant: 'success', placeholder: 'Disabled Success Input', disabled: true } };
export const DisabledDanger: Story = { args: { variant: 'danger', placeholder: 'Disabled Danger Input', disabled: true } };
export const DisabledWarning: Story = { args: { variant: 'warning', placeholder: 'Disabled Warning Input', disabled: true } };

// 大小範例
export const SmallInput: Story = { args: { size: 'small', placeholder: 'Small Input' } };
export const LargeInput: Story = { args: { size: 'large', placeholder: 'Large Input' } };

// 圓角樣式範例
export const FullRoundedInput: Story = { args: { radius: 'full', placeholder: 'Full Rounded Input' } };

// 圖標範例
export const LeftIconInput: Story = { args: { icon: <FiUser />, placeholder: 'Left Icon Input', iconPosition: 'left' } };
export const RightIconInput: Story = { args: { icon: <FiSearch />, placeholder: 'Right Icon Input', iconPosition: 'right' } };

// 密碼顯示切換範例
export const PasswordInputWithToggle: Story = {
  args: {
    type: 'password',
    placeholder: 'Password Input',
    showPasswordToggle: true,
    icon: <FiLock />,
    iconPosition: 'left',
  },
};

// 暗黑模式範例
export const DarkModePrimary: Story = { args: { variant: 'primary', placeholder: 'Dark Mode Primary Input' }, parameters: { backgrounds: { default: 'dark' } } };
export const DarkModeDanger: Story = { args: { variant: 'danger', placeholder: 'Dark Mode Danger Input' }, parameters: { backgrounds: { default: 'dark' } } };

// read-only 範例
export const ReadOnlyWithGrayText: Story = {
  args: {
    type: 'text',
    value: 'This is read-only with gray text',
    placeholder: 'Read-only Input',
    variant: 'primary',
    readonly: true,
  },
};
