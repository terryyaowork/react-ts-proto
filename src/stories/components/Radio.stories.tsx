import React from 'react';
import type {
  Meta,
  StoryObj,
  StoryFn,
  StoryContext,
} from '@storybook/react';
import Radio from '../../components/Radio';
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';
import { within, userEvent } from '@storybook/testing-library';

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

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  decorators: [withThemeProvider],
  argTypes: {
    id: { control: 'text', description: 'Radio 的 id 屬性' },
    name: { control: 'text', description: 'Radio 的 name 屬性，用於分組' },
    label: { control: 'text', description: '顯示在 Radio 旁的標籤' },
    checked: { control: 'boolean', description: '是否選中' },
    disabled: { control: 'boolean', description: '是否禁用' },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
      description: 'Radio 的樣式變體',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Radio 的大小',
    },
    onChange: { action: 'changed', description: '選中狀態改變時的事件' },
    className: { control: 'text', description: '自定義樣式類名' },
    style: { control: 'object', description: '自定義行內樣式' },
  },
  args: {
    id: 'radio-1',
    name: 'group-1',
    label: 'Default Radio',
    checked: false,
    disabled: false,
    variant: 'primary',
    size: 'medium',
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

// 基本範例
export const Default: Story = {};

// 不同樣式變體
export const PrimaryRadio: Story = { args: { variant: 'primary', label: 'Primary Radio' } };
export const SecondaryRadio: Story = { args: { variant: 'secondary', label: 'Secondary Radio' } };
export const SuccessRadio: Story = { args: { variant: 'success', label: 'Success Radio' } };
export const DangerRadio: Story = { args: { variant: 'danger', label: 'Danger Radio' } };
export const WarningRadio: Story = { args: { variant: 'warning', label: 'Warning Radio' } };
export const InfoRadio: Story = { args: { variant: 'info', label: 'Info Radio' } };
export const LightRadio: Story = { args: { variant: 'light', label: 'Light Radio' } };
export const DarkRadio: Story = { args: { variant: 'dark', label: 'Dark Radio' } };

// 不同大小
export const SmallRadio: Story = { args: { size: 'small', label: 'Small Radio' } };
export const MediumRadio: Story = { args: { size: 'medium', label: 'Medium Radio' } };
export const LargeRadio: Story = { args: { size: 'large', label: 'Large Radio' } };

// 禁用狀態
export const DisabledRadio: Story = { args: { label: 'Disabled Radio', disabled: true } };
export const CheckedRadio: Story = {
  args: {
    label: 'Checked & Radio',
    checked: true,
  },
};
export const CheckedDisabledRadio: Story = {
  args: {
    label: 'Checked & Disabled Radio',
    checked: true,
    disabled: true,
  },
};

// 暗黑模式範例
export const DarkModeRadio: Story = {
  args: { variant: 'primary', label: 'Dark Mode Radio' },
  parameters: { backgrounds: { default: 'dark' } },
};

// 互動測試
export const ToggleRadio: Story = {
  args: { label: 'Toggle Radio', name: 'group-1', checked: false },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const radio = await canvas.getByLabelText('Toggle Radio');
    await userEvent.click(radio);

    // 更新 `checked` 狀態
    Object.assign(args, {
      checked: !args.checked,
    });
  },
};
