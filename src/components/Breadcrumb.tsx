import React from 'react';

interface BreadcrumbItemProps {
  label: string; // 項目的標籤
  href?: string; // 若有，為超連結
  isActive?: boolean; // 是否是當前項目
}

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({ label, href, isActive = false }) => {
  if (isActive) {
    return (
      <li className="breadcrumb-item text-gray-500 dark:text-gray-400" aria-current="page">
        {label}
      </li>
    );
  }

  return (
    <li className="breadcrumb-item">
      <a href={href} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500">
        {label}
      </a>
    </li>
  );
};

interface BreadcrumbProps {
  items: { label: string; href?: string; isActive?: boolean }[]; // Breadcrumb 項目列表
  separator?: React.ReactNode; // 自定義分隔符號
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, separator = '/' }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex space-x-2">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem {...item} />
            {index < items.length - 1 && <span className="text-gray-500 dark:text-gray-400">{separator}</span>}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
