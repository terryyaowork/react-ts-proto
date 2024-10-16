import React from 'react';
import type {
  Meta,
  StoryObj,
  StoryFn,
  StoryContext,
} from '@storybook/react';
import Checkbox from '../../components/Checkbox';
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';
import { within, userEvent } from '@storybook/testing-library';

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

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  decorators: [withThemeProvider],
  argTypes: {
    id: { control: 'text', description: 'Checkbox 的 id 屬性' },
    label: { control: 'text', description: '顯示在 Checkbox 旁的標籤' },
    checked: { control: 'boolean', description: '是否選中' },
    disabled: { control: 'boolean', description: '是否禁用' },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
      description: 'Checkbox 的樣式變體',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Checkbox 的大小',
    },
    onChange: { action: 'changed', description: '選中狀態改變時的事件' },
    className: { control: 'text', description: '自定義樣式類名' },
    style: { control: 'object', description: '自定義行內樣式' },
  },
  args: {
    id: 'checkbox-1',
    label: 'Default Checkbox',
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
type Story = StoryObj<typeof Checkbox>;

// 基本樣式
export const Default: Story = {};

// 不同樣式變體
export const PrimaryCheckbox: Story = { args: { variant: 'primary', label: 'Primary Checkbox' } };
export const SecondaryCheckbox: Story = { args: { variant: 'secondary', label: 'Secondary Checkbox' } };
export const SuccessCheckbox: Story = { args: { variant: 'success', label: 'Success Checkbox' } };
export const DangerCheckbox: Story = { args: { variant: 'danger', label: 'Danger Checkbox' } };
export const WarningCheckbox: Story = { args: { variant: 'warning', label: 'Warning Checkbox' } };
export const InfoCheckbox: Story = { args: { variant: 'info', label: 'Info Checkbox' } };
export const LightCheckbox: Story = { args: { variant: 'light', label: 'Light Checkbox' } };
export const DarkCheckbox: Story = { args: { variant: 'dark', label: 'Dark Checkbox' } };

// 不同大小
export const SmallCheckbox: Story = { args: { size: 'small', label: 'Small Checkbox' } };
export const MediumCheckbox: Story = { args: { size: 'medium', label: 'Medium Checkbox' } };
export const LargeCheckbox: Story = { args: { size: 'large', label: 'Large Checkbox' } };

// 不同狀態
export const CheckedCheckbox: Story = { args: { label: 'Checked Checkbox', checked: true } };
export const UncheckedCheckbox: Story = { args: { label: 'Unchecked Checkbox', checked: false } };

// 禁用狀態
export const DisabledCheckbox: Story = { args: { label: 'Disabled Checkbox', disabled: true } };
export const CheckedDisabledCheckbox: Story = {
  args: {
    label: 'Checked & Disabled Checkbox',
    checked: true,
    disabled: true,
  },
};

// 動態測試
export const ToggleCheckbox: Story = {
  args: { label: 'Toggle Checkbox' },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const checkbox = (await canvas.getByLabelText('Toggle Checkbox')) as HTMLInputElement;
    await userEvent.click(checkbox);

    // 使用 Object.assign 來更新 `args`
    Object.assign(args, {
      checked: !args.checked,
    });
  },
};

// 暗黑模式
export const DarkModeCheckbox: Story = {
  args: { variant: 'primary', label: 'Dark Mode Checkbox' },
  parameters: { backgrounds: { default: 'dark' } },
};
