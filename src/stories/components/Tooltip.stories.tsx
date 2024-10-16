import React from 'react';
import type { Meta, StoryObj, StoryFn, StoryContext } from '@storybook/react';
import Tooltip from '../../components/Tooltip';
import Button from '../../components/Button';  // 假設已經有 Button 元件
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';
import { within, userEvent } from '@storybook/testing-library'; // 匯入測試庫

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

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  decorators: [withThemeProvider],  // 使用 ThemeProvider
  argTypes: {
    content: { control: 'text', description: 'Tooltip 顯示的內容' },
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Tooltip 顯示的位置',
    },
    delay: { control: 'number', description: '顯示 Tooltip 的延遲時間（毫秒）' },
    className: { control: 'text', description: '自定義樣式類名' },
    children: { table: { disable: true } },
  },
  args: {
    content: 'This is a tooltip',
    position: 'top',
    delay: 200,
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

// 基本範例
export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <span>Hover over me</span>
    </Tooltip>
  ),
};

// 各種位置的 Tooltip
export const TopTooltip: Story = {
  args: { position: 'top', content: 'Tooltip on top' },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="primary">Hover me (Top)</Button>
    </Tooltip>
  ),
};

export const BottomTooltip: Story = {
  args: { position: 'bottom', content: 'Tooltip on bottom' },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="secondary">Hover me (Bottom)</Button>
    </Tooltip>
  ),
};

export const LeftTooltip: Story = {
  args: { position: 'left', content: 'Tooltip on left' },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="success">Hover me (Left)</Button>
    </Tooltip>
  ),
};

export const RightTooltip: Story = {
  args: { position: 'right', content: 'Tooltip on right' },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="danger">Hover me (Right)</Button>
    </Tooltip>
  ),
};

// 暗黑模式範例
export const DarkModeTooltip: Story = {
  args: { position: 'top', content: 'Tooltip in Dark Mode' },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="primary">Hover me (Dark Mode)</Button>
    </Tooltip>
  ),
  parameters: { backgrounds: { default: 'dark' } },
};

// 新增範例

// Tooltip with Delay
export const TooltipWithDelay: Story = {
  args: { content: 'Tooltip with delay', delay: 1000 },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="warning">Hover me (With Delay)</Button>
    </Tooltip>
  ),
};

// Tooltip with Long Text
export const TooltipWithLongText: Story = {
  args: {
    content:
      'This is a longer tooltip text that goes beyond the usual short message.',
    position: 'top',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="primary">Hover me (Long Text)</Button>
    </Tooltip>
  ),
};

// Tooltip on Disabled Button
export const TooltipOnDisabledButton: Story = {
  args: { content: 'Tooltip on disabled button' },
  render: (args) => (
    <Tooltip {...args}>
      <span>
        <Button variant="secondary" disabled>
          Disabled Button
        </Button>
      </span>
    </Tooltip>
  ),
};

// Tooltip with Different Sizes
export const SmallTooltip: Story = {
  args: { content: 'Small Tooltip', className: 'text-sm' },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="light">Hover me (Small Tooltip)</Button>
    </Tooltip>
  ),
};

export const LargeTooltip: Story = {
  args: { content: 'Large Tooltip', className: 'text-lg' },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="light">Hover me (Large Tooltip)</Button>
    </Tooltip>
  ),
};

// Interactive Tooltip
export const InteractiveTooltip: Story = {
  args: { content: 'Interactive Tooltip' },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="success">Click me (Interactive)</Button>
    </Tooltip>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByText('Click me (Interactive)');
    await userEvent.click(button);
  },
};
