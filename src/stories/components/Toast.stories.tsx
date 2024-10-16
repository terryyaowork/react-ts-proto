import React, { useState } from 'react';
import type { Meta, StoryFn, StoryContext } from '@storybook/react';
import Toast from '../../components/Toast';
import type { ToastProps } from '../../components/Toast';
import Button from '../../components/Button';
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';
import { v4 as uuidv4 } from 'uuid'; // 用於生成唯一 ID

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
    <ThemeProvider initialTheme={theme}>
      <ThemeSyncWrapper theme={theme}>
        <div className={theme === 'dark' ? 'dark' : ''} style={{ padding: '20px' }}>
          <Story />
        </div>
      </ThemeSyncWrapper>
    </ThemeProvider>
  );
};

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  decorators: [withThemeProvider],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['success', 'danger', 'info', 'warning'],
      description: 'Toast 的樣式類型',
    },
    duration: {
      control: { type: 'number' },
      description: '自動消失的時間',
    },
    position: {
      control: { type: 'select' },
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      description: 'Toast 出現的位置',
    },
  },
  args: {
    type: 'info',
    duration: 5000,
    position: 'top-right',
    message: '這是一條訊息！',
  },
};

export default meta;

const Template: StoryFn<typeof Toast> = (args) => <Toast {...args} />;

// 預設的 Toast 示例
export const Default = Template.bind({});
Default.args = {
  message: '這是一條預設的訊息！',
};

// 成功訊息
export const SuccessToast = Template.bind({});
SuccessToast.args = {
  message: '操作成功！',
  type: 'success',
};

// 錯誤訊息
export const ErrorToast = Template.bind({});
ErrorToast.args = {
  message: '發生錯誤！',
  type: 'danger',
};

// 連續觸發多個通知的情境
export const ContinuousToasts: StoryFn = (args) => {
  const [toasts, setToasts] = useState<{ id: string; message: string }[]>([]);

  // 模擬連續觸發多個通知
  const triggerToasts = () => {
    const messages = [
      '這是第一個通知',
      '這是第二個通知',
      '這是第三個通知',
      '這是第四個通知',
    ];

    messages.forEach((message, index) => {
      setTimeout(() => {
        const id = uuidv4();
        setToasts((prevToasts) => [...prevToasts, { id, message }]);
      }, index * 1000); // 每 1 秒觸發一個通知
    });
  };

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <div>
      <Button onClick={triggerToasts}>觸發連續通知</Button>
      <div style={{ position: 'fixed', top: '10px', right: '10px' }}>
        {toasts.map((toast, index) => (
          <Toast
            key={toast.id}
            message={toast.message}
            onClose={() => removeToast(toast.id)}
            style={{ marginTop: index * 60 }} // 堆疊間隔設置
            {...args}
          />
        ))}
      </div>
    </div>
  );
};
