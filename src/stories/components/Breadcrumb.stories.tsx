import type { Meta, StoryObj } from '@storybook/react';
import Breadcrumb from '../../components/Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  argTypes: {
    items: { control: 'object', description: 'Breadcrumb 項目列表' },
    separator: { control: 'text', description: '自定義分隔符號' },
  },
  args: {
    separator: '/',
    items: [
      { label: 'Home', href: '#' },
      { label: 'Library', href: '#' },
      { label: 'Data', isActive: true },
    ],
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

// 基本範例
export const Default: Story = {
  render: (args) => <Breadcrumb {...args} />,
};

// 自定義分隔符號範例
export const CustomSeparator: Story = {
  args: {
    separator: '>',
  },
  render: (args) => <Breadcrumb {...args} />,
};

// 含有多個連結的範例
export const MultipleLinks: Story = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Library', href: '#' },
      { label: 'Data', href: '#' },
      { label: 'Final', isActive: true },
    ],
  },
  render: (args) => <Breadcrumb {...args} />,
};

// 暗黑模式範例
export const DarkModeBreadcrumb: Story = {
  render: (args) => (
    <div className="dark">
      <Breadcrumb {...args} />
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
