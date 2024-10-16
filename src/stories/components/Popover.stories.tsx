import React from 'react';
import type { Meta, StoryFn, StoryContext } from '@storybook/react';
import Popover from '../../components/Popover';
import Button from '../../components/Button';
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
    <ThemeProvider initialTheme={theme}>
      <ThemeSyncWrapper theme={theme}>
        <div className={theme === 'dark' ? 'dark' : ''}
          style={{
            padding: '20px',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Story />
        </div>
      </ThemeSyncWrapper>
    </ThemeProvider>
  );
};

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  decorators: [withThemeProvider],
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: '控制 Popover 的出現位置',
    },
    trigger: {
      control: { type: 'select' },
      options: ['click', 'hover'],
      description: '控制 Popover 的觸發方式',
    },
  },
  args: {
    placement: 'top',
    trigger: 'click',
  },
};

export default meta;

const Template: StoryFn<typeof Popover> = (args) => (
  <Popover {...args} content="This is the popover content." title="Popover Title">
    <Button>Open Popover</Button>
  </Popover>
);

export const Default = Template.bind({});

export const BottomPlacement = Template.bind({});
BottomPlacement.args = { placement: 'bottom' };

export const LeftPlacement = Template.bind({});
LeftPlacement.args = { placement: 'left' };

export const RightPlacement = Template.bind({});
RightPlacement.args = { placement: 'right' };

export const HoverTrigger = Template.bind({});
HoverTrigger.args = { trigger: 'hover' };
