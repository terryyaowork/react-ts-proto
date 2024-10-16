import React, { useState } from 'react';
import type { Meta, StoryFn, StoryContext } from '@storybook/react';
import Offcanvas from '../../components/Offcanvas';
import Button from '../../components/Button';
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';

// 用來同步主題狀態的元件
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

const meta: Meta<typeof Offcanvas> = {
  title: 'Components/Offcanvas',
  component: Offcanvas,
  decorators: [withThemeProvider],
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['start', 'end', 'top', 'bottom'],
      description: '控制 Offcanvas 的出現位置',
    },
    show: {
      control: { type: 'boolean' },
      description: '是否顯示 Offcanvas',
    },
  },
  args: {
    placement: 'start',
    show: false,
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

const Template: StoryFn<typeof Offcanvas> = (args) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button onClick={() => setShow(true)}>Open Offcanvas</Button>
      <Offcanvas {...args} show={show} onClose={() => setShow(false)}>
        <p>This is the Offcanvas content.</p>
      </Offcanvas>
    </>
  );
};

export const Default = Template.bind({});

export const StartPlacement = Template.bind({});
StartPlacement.args = { placement: 'start' };

export const EndPlacement = Template.bind({});
EndPlacement.args = { placement: 'end' };

export const TopPlacement = Template.bind({});
TopPlacement.args = { placement: 'top' };

export const BottomPlacement = Template.bind({});
BottomPlacement.args = { placement: 'bottom' };

// 新增一個測試背景點擊關閉的 story
export const BackgroundClickClose: StoryFn<typeof Offcanvas> = (args) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button onClick={() => setShow(true)}>Open Offcanvas</Button>
      <Offcanvas {...args} show={show} onClose={() => setShow(false)}>
        <p>This is the Offcanvas content. Click outside to close.</p>
      </Offcanvas>
    </>
  );
};
