import type {
  Meta,
  StoryObj,
  StoryFn,
  StoryContext,
} from '@storybook/react';
import InputGroup from '../../components/InputGroup';
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';
import { within, userEvent } from '@storybook/testing-library';
import React, { useEffect } from 'react';
import { FiMail, FiUser } from 'react-icons/fi';

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

const meta: Meta<typeof InputGroup> = {
  title: 'Components/InputGroup',
  component: InputGroup,
  decorators: [withThemeProvider], // 加入 ThemeProvider 裝飾器
  argTypes: {
    label: { control: 'text', description: '設定顯示在 Input 上方的標籤' },
    helperText: { control: 'text', description: '設定顯示在 Input 下方的提示訊息' },
    errorMessage: { control: 'text', description: '設定顯示在 Input 下方的錯誤訊息' },
    showLabel: { control: 'boolean', description: '是否顯示標籤' },
    showHelperText: { control: 'boolean', description: '是否顯示提示訊息' },
    showErrorMessage: { control: 'boolean', description: '是否顯示錯誤訊息' },
    className: { control: 'text', description: '自定義外層容器樣式類名' },
    labelClassName: { control: 'text', description: '自定義 Label 樣式類名' },
    helperTextClassName: { control: 'text', description: '自定義 Helper Text 樣式類名' },
    errorMessageClassName: { control: 'text', description: '自定義 Error Message 樣式類名' },
    layout: { control: { type: 'select' }, options: ['vertical', 'horizontal'], description: '設定 InputGroup 的佈局類型' },
  },
  args: {
    label: 'Username',
    helperText: 'Enter your username.',
    errorMessage: '',
    showLabel: true,
    showHelperText: true,
    showErrorMessage: false,
    layout: 'vertical',
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof InputGroup>;

export const Default: Story = {
  args: {
    inputProps: {
      type: 'text',
      placeholder: 'Enter your username...',
      variant: 'primary',
    },
  },
};

export const WithError: Story = {
  args: {
    errorMessage: 'This field is required.',
    showErrorMessage: true,
    inputProps: {
      type: 'text',
      placeholder: 'Username...',
      variant: 'danger',
    },
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Email Address',
    inputProps: {
      type: 'email',
      placeholder: 'Enter your email...',
      icon: <FiMail />,
      iconPosition: 'left',
      variant: 'primary',
    },
  },
};

export const HorizontalWithHelperText: Story = {
  args: {
    layout: 'horizontal',
    label: 'Email Address',
    helperText: 'We will never share your email.',
    inputProps: {
      type: 'email',
      placeholder: 'Enter your email...',
      variant: 'primary',
    },
  },
};

export const VerticalWithError: Story = {
  args: {
    layout: 'vertical',
    label: 'Password',
    errorMessage: 'Password must be at least 8 characters long.',
    showErrorMessage: true,
    inputProps: {
      type: 'password',
      placeholder: 'Enter your password...',
      variant: 'danger',
    },
  },
};

export const WithoutLabelWithHelperText: Story = {
  args: {
    showLabel: false,
    helperText: 'Your username must be unique.',
    inputProps: {
      type: 'text',
      placeholder: 'Enter your username...',
      variant: 'info',
    },
  },
};

export const WithHelperText: Story = {
  args: {
    helperText: 'Your username must be 6-20 characters long.',
    inputProps: {
      type: 'text',
      placeholder: 'Username...',
      variant: 'success',
    },
  },
};

export const DisabledInputGroup: Story = {
  args: {
    label: 'Phone Number',
    showLabel: true,
    helperText: 'Please enter a valid phone number.',
    inputProps: {
      type: 'tel',
      placeholder: 'Enter your phone number...',
      variant: 'light',
      disabled: true,
    },
  },
};

export const FullFeatureInputGroup: Story = {
  args: {
    label: 'Username',
    helperText: 'Your username must be 6-20 characters long.',
    errorMessage: 'This username is already taken.',
    showErrorMessage: true,
    showHelperText: true,
    inputProps: {
      type: 'text',
      placeholder: 'Username...',
      icon: <FiUser />,
      iconPosition: 'left',
      variant: 'danger',
    },
  },
};

// 失效的因為沒有切換成 textarea
export const TextareaInputGroup: Story = {
  args: {
    label: 'Comments',
    helperText: 'Please provide your feedback.',
    inputProps: {
      type: 'text',
      multiline: true, // 加入這個屬性來切換成 `textarea`
      placeholder: 'Write your comments here...',
      variant: 'primary',
      style: { minHeight: '80px' }, // 設定多行輸入的樣式
    },
  },
};

export const DynamicErrorMessage: Story = {
  args: {
    label: 'Password',
    helperText: 'Minimum 8 characters.',
    errorMessage: '',
    showErrorMessage: false,
    inputProps: {
      type: 'password',
      placeholder: 'Enter your password...',
      variant: 'primary',
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = await canvas.getByPlaceholderText('Enter your password...');
    await userEvent.type(input, '123');

    // 使用 `Object.assign` 來更新 `args` 的值
    Object.assign(args, {
      showErrorMessage: true,
      errorMessage: 'Password is too short!',
    });
  },
};
