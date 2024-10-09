import React, { Suspense } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import AppRouter from './routers/AppRouter'; // 路由文件
import ErrorBoundary from './components/ErrorBoundary'; // 錯誤邊界元件
import Loading from './components/Loading';
import ThemeToggle from './components/ThemeToggle'; // 引入獨立的主題切換按鈕

const App: React.FC = () => (
  <ErrorBoundary>
    <Suspense fallback={<Loading />}>
      <ThemeProvider>
        <div
          className="App"
          style={{
            background: 'var(--color-bg-primary)',
            color: 'var(--color-text-primary)',
            height: '100vh',
          }}
        >
          <ThemeToggle />
          <AppRouter />
        </div>
      </ThemeProvider>
    </Suspense>
  </ErrorBoundary>
);

export default App;
