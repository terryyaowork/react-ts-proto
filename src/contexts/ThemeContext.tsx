import React, {
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react';

interface ThemeContextProps {
  isDarkMode: boolean; // 是否為暗色模式
  toggleTheme: () => void; // 切換主題模式
  // eslint-disable-next-line no-unused-vars
  setIsDarkMode: (value: boolean) => void; // 手動設置主題模式
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode; initialTheme?: 'light' | 'dark' }> = ({
  children,
  initialTheme = 'light',
}) => {
  const [isDarkMode, setIsDarkMode] = useState(initialTheme === 'dark');

  // 監聽 `body` 的 class，來同步 dark mode 狀態
  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme 必須在 ThemeProvider 中使用');
  return context;
};
