import React, { useState } from 'react';
import type { Meta, StoryObj, StoryFn, StoryContext } from '@storybook/react';
import Tabs from '../../components/Tabs';
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
    <ThemeProvider>
      <ThemeSyncWrapper theme={theme}>
        <div className={theme === 'dark' ? 'dark' : ''} style={{ padding: '20px' }}>
          <Story />
        </div>
      </ThemeSyncWrapper>
    </ThemeProvider>
  );
};

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  decorators: [withThemeProvider],
  argTypes: {
    activeTab: { control: 'number', description: '當前激活的標籤索引' },
    onTabChange: { action: 'tab changed', description: '標籤變更的回呼' },
    className: { control: 'text', description: '自定義樣式類名' },
  },
  args: {
    activeTab: 0,
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// 基本範例
export const Default: Story = {
  render: (args) => (
    <Tabs {...args}>
      <Tabs.Tab label="Tab 1">Tab 1 Content</Tabs.Tab>
      <Tabs.Tab label="Tab 2">Tab 2 Content</Tabs.Tab>
      <Tabs.Tab label="Tab 3">Tab 3 Content</Tabs.Tab>
    </Tabs>
  ),
};

// 加入暗黑模式支援的範例
export const DarkModeTabs: Story = {
  args: { activeTab: 1 },
  render: (args) => (
    <Tabs {...args}>
      <Tabs.Tab label="Tab A">Tab A Content</Tabs.Tab>
      <Tabs.Tab label="Tab B">Tab B Content</Tabs.Tab>
      <Tabs.Tab label="Tab C">Tab C Content</Tabs.Tab>
    </Tabs>
  ),
  parameters: { backgrounds: { default: 'dark' } },
};

// 禁用 Tab 的範例
export const DisabledTab: Story = {
  args: { activeTab: 0 },
  render: (args) => (
    <Tabs {...args}>
      <Tabs.Tab label="Tab 1">Tab 1 Content</Tabs.Tab>
      <Tabs.Tab label="Tab 2" disabled>Tab 2 (Disabled)</Tabs.Tab>
      <Tabs.Tab label="Tab 3">Tab 3 Content</Tabs.Tab>
    </Tabs>
  ),
};

// 動態新增和刪除 Tab 的範例
export const DynamicTabs: Story = {
  render: (args) => {
    const [tabs, setTabs] = useState([
      { label: 'Tab 1', content: 'Tab 1 Content' },
      { label: 'Tab 2', content: 'Tab 2 Content' },
      { label: 'Tab 3', content: 'Tab 3 Content' },
    ]);
    const [activeTab, setActiveTab] = useState(0);

    const addTab = () => {
      const newTab = { label: `Tab ${tabs.length + 1}`, content: `Tab ${tabs.length + 1} Content` };
      setTabs([...tabs, newTab]);
    };

    const removeTab = (index: number) => {
      if (tabs.length > 1 && index >= 0 && index < tabs.length) {
        const newTabs = tabs.filter((_, i) => i !== index);
        setTabs(newTabs);
        setActiveTab(Math.min(activeTab, newTabs.length - 1));
      }
    };

    return (
      <div>
        <Tabs {...args} activeTab={activeTab} onTabChange={setActiveTab}>
          {tabs.map((tab, index) => (
            <Tabs.Tab key={index} label={tab.label}>
              {tab.content}
            </Tabs.Tab>
          ))}
        </Tabs>
        <div className="mt-4">
          <button onClick={addTab} className="btn btn-primary mr-2">Add Tab</button>
          <button onClick={() => removeTab(1)} className="btn btn-danger">Remove Tab 2</button>
        </div>
      </div>
    );
  },
};

// 垂直排列 Tab 的範例
export const VerticalTabs: Story = {
  render: (args) => (
    <Tabs {...args} className="flex">
      <Tabs.Tab label="Tab 1">Tab content goes here.</Tabs.Tab>
      <Tabs.Tab label="Tab 2">More tab content here.</Tabs.Tab>
      <Tabs.Tab label="Tab 3">Final tab content here.</Tabs.Tab>
    </Tabs>
  ),
};

// Bootstrap 樣式的 Tab
export const BootstrapStyledTabs: Story = {
  render: (args) => (
    <Tabs {...args} className="nav nav-tabs">
      <Tabs.Tab label="Home">This is the Home content.</Tabs.Tab>
      <Tabs.Tab label="Profile">This is the Profile content.</Tabs.Tab>
      <Tabs.Tab label="Contact">This is the Contact content.</Tabs.Tab>
    </Tabs>
  ),
};
