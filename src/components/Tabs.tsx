import React, { useState } from 'react';

interface TabProps {
  label: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export const Tab: React.FC<TabProps> = ({ children }) => {
  return <div>{children}</div>;
};

interface TabsProps {
  activeTab?: number;
  onTabChange?: (index: number) => void;
  className?: string;
  children: React.ReactNode;
}

interface TabsComponent extends React.FC<TabsProps> {
  Tab: typeof Tab;
}

const Tabs: TabsComponent = ({ activeTab = 0, onTabChange, className, children }) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleTabClick = (index: number, disabled?: boolean) => {
    if (disabled) return;
    setCurrentTab(index);
    if (onTabChange) onTabChange(index);
  };

  return (
    <div className={`flex flex-col ${className || ''}`}>
      <ul className="flex border-b"> {/* 水平排列并添加底部边框 */}
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            const { disabled } = child.props;
            return (
              <li
                className={`mr-2 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${
                  currentTab === index ? 'border-t border-l border-r bg-white -mb-px' : 'border-b'
                }`}
                onClick={() => handleTabClick(index, disabled)}
              >
                <a
                  className={`px-4 py-2 block transition-all ${
                    currentTab === index ? 'text-blue-600' : 'text-gray-600'
                  } ${disabled ? 'text-gray-400' : 'hover:text-blue-600'}`}
                >
                  {child.props.label}
                </a>
              </li>
            );
          }
          return null;
        })}
      </ul>
      <div className="p-4 -mt-px">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child) && currentTab === index) {
            return <div>{child.props.children}</div>;
          }
          return null;
        })}
      </div>
    </div>
  );
};

Tabs.Tab = Tab;

export default Tabs;
