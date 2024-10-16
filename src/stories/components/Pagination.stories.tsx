import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Pagination from '../../components/Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  argTypes: {
    totalPages: { control: 'number', description: '總頁數' },
    currentPage: { control: 'number', description: '當前頁數' },
    size: { control: 'select', options: ['sm', 'md', 'lg'], description: '按鈕大小' },
    enableJumpByTen: { control: 'boolean', description: '啟用前後 10 頁跳轉' },
    enableDirectPageInput: { control: 'boolean', description: '啟用指定頁數跳轉' },
    onPageChange: { action: '頁數變更', description: '頁數變更的回呼' },
  },
  args: {
    totalPages: 10,  // 預設總頁數
    currentPage: 1,  // 預設當前頁數
    size: 'md',      // 預設按鈕大小
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// 基本範例
export const Default: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage);

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
      args.onPageChange(page);
    };

    return (
      <Pagination
        {...args}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    );
  },
};

// 加入頁數跳轉範例（前後 10 頁）
export const JumpByTenAtEdges: Story = {
  args: { totalPages: 30, enableJumpByTen: true },
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage);

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
      args.onPageChange(page);
    };

    return (
      <Pagination
        {...args}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    );
  },
};

// 無效頁數輸入測試：跳到指定頁面邊界情況
export const InvalidPageInput: Story = {
  args: { totalPages: 10, enableDirectPageInput: true },
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage);

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
      args.onPageChange(page);
    };

    return (
      <div>
        <h3>測試無效頁數輸入</h3>
        <Pagination
          {...args}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    );
  },
};

// 動態頁數範例
export const DynamicTotalPages: Story = {
  args: { totalPages: 15 },
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
      args.onPageChange(page);
    };

    return (
      <Pagination
        {...args}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    );
  },
};

// 指定頁數跳轉範例
export const DirectPageInput: Story = {
  args: { totalPages: 20, enableDirectPageInput: true },
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage);

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
      args.onPageChange(page);
    };

    return (
      <Pagination
        {...args}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    );
  },
};

// 按鈕大小範例
export const Sizes: Story = {
  args: { totalPages: 10 },
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage);

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
      args.onPageChange(page);
    };

    return (
      <>
        <div className="mb-4">
          <h3>小按鈕</h3>
          <Pagination
            {...args}
            currentPage={currentPage}
            size="sm"
            onPageChange={handlePageChange}
          />
        </div>
        <div className="mb-4">
          <h3>中按鈕</h3>
          <Pagination
            {...args}
            currentPage={currentPage}
            size="md"
            onPageChange={handlePageChange}
          />
        </div>
        <div className="mb-4">
          <h3>大按鈕</h3>
          <Pagination
            {...args}
            currentPage={currentPage}
            size="lg"
            onPageChange={handlePageChange}
          />
        </div>
      </>
    );
  },
};
