import type { Meta, StoryObj } from '@storybook/react';
import Accordion from '../../components/Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {
    allowMultiple: { control: 'boolean', description: '是否允許多個部分同時展開' },
    isAnimated: { control: 'boolean', description: '是否啟用展開/收起動畫' },
  },
  args: {
    allowMultiple: false,
    isAnimated: true,  // 預設啟用動畫效果
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

// 基本範例
export const Default: Story = {
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item title="Section 1">Content for section 1</Accordion.Item>
      <Accordion.Item title="Section 2">Content for section 2</Accordion.Item>
      <Accordion.Item title="Section 3">Content for section 3</Accordion.Item>
    </Accordion>
  ),
};

// 多重展開範例
export const MultipleSections: Story = {
  args: { allowMultiple: true },
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item title="Section 1">Content for section 1</Accordion.Item>
      <Accordion.Item title="Section 2">Content for section 2</Accordion.Item>
      <Accordion.Item title="Section 3">Content for section 3</Accordion.Item>
    </Accordion>
  ),
};

// 暗黑模式範例
export const DarkModeAccordion: Story = {
  render: (args) => (
    <div className="dark">
      <Accordion {...args}>
        <Accordion.Item title="Section 1">Content for section 1</Accordion.Item>
        <Accordion.Item title="Section 2">Content for section 2</Accordion.Item>
        <Accordion.Item title="Section 3">Content for section 3</Accordion.Item>
      </Accordion>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// 禁用項目範例
export const DisabledItem: Story = {
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item title="Section 1" isDisabled>Content for section 1 (Disabled)</Accordion.Item>
      <Accordion.Item title="Section 2">Content for section 2</Accordion.Item>
    </Accordion>
  ),
};

// 自定義圖標範例
export const CustomIconAccordion: Story = {
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item title="Section 1" customIcon={<span>🌟</span>}>
        Content with custom icon
      </Accordion.Item>
      <Accordion.Item title="Section 2" customIcon={<span>🔥</span>}>
        Another section with custom icon
      </Accordion.Item>
    </Accordion>
  ),
};

// 帶動畫效果的 Accordion
export const AnimatedAccordion: Story = {
  args: { allowMultiple: false, isAnimated: true },
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item title="Section 1">Content for section 1</Accordion.Item>
      <Accordion.Item title="Section 2">Content for section 2</Accordion.Item>
      <Accordion.Item title="Section 3">Content for section 3</Accordion.Item>
    </Accordion>
  ),
};
