import React from 'react';
import { useTheme } from '../contexts/ThemeContext'; // 從 Context 中取值

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme, showToggle } = useTheme();

  if (!showToggle) return null; // 根據 `showToggle` 屬性來決定是否顯示按鈕

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: '10px 20px',
        margin: '20px',
        cursor: 'pointer',
        background: isDarkMode ? '#666' : '#ddd',
        color: isDarkMode ? '#fff' : '#000',
      }}
    >
      切換到 {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default ThemeToggle;
