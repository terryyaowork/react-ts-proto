import type { Meta, StoryObj } from '@storybook/react';
import { FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import Dropdown from '../../components/Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {
    label: { control: 'text', description: '下拉選單的觸發按鈕標籤' },
  },
  args: {
    label: 'Dropdown',
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

// 基本範例
export const Default: Story = {
  render: (args) => (
    <Dropdown {...args}>
      <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
        Profile
      </a>
      <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
        Settings
      </a>
      <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
        Logout
      </a>
    </Dropdown>
  ),
};

// 添加更多選項範例
export const WithMoreOptions: Story = {
  render: (args) => (
    <Dropdown {...args}>
      <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
        Dashboard
      </a>
      <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
        Profile
      </a>
      <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
        Settings
      </a>
      <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
        Logout
      </a>
    </Dropdown>
  ),
};

// 禁用狀態
export const DisabledDropdown: Story = {
  render: (args) => (
    <Dropdown {...args}>
      <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
        Profile
      </a>
      <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
        Settings
      </a>
      <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 disabled:opacity-50" aria-disabled>
        Logout (Disabled)
      </a>
    </Dropdown>
  ),
};

// 添加分隔線
export const WithDivider: Story = {
  render: (args) => (
    <Dropdown {...args}>
      <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
        Profile
      </a>
      <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
        Settings
      </a>
      <div className="border-t my-2"></div>
      <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
        Logout
      </a>
    </Dropdown>
  ),
};

// 帶有圖標的選項
export const WithIcons: Story = {
  render: (args) => (
    <Dropdown {...args}>
      <a href="#" className="px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center">
        <FiUser className="mr-2" /> Profile
      </a>
      <a href="#" className="px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center">
        <FiSettings className="mr-2" /> Settings
      </a>
      <a href="#" className="px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center">
        <FiLogOut className="mr-2" /> Logout
      </a>
    </Dropdown>
  ),
};

// 使用暗黑模式範例
export const DarkModeDropdown: Story = {
  render: (args) => (
    <div className="dark">
      <Dropdown {...args}>
        <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">
          Profile
        </a>
        <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">
          Settings
        </a>
        <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">
          Logout
        </a>
      </Dropdown>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
