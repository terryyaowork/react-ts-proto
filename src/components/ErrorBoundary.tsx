import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // 更新 state 以便下次渲染能顯示錯誤的 UI
    return { hasError: true };
  }

  // 禁用 ESLint 規則
  /* eslint-disable class-methods-use-this */
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // 錯誤記錄可以放在這裡，例如發送到錯誤追蹤系統
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary 捕獲的錯誤：\n [error]:', error, '\n [info]:', info);
  }
  /* eslint-enable class-methods-use-this */

  render() {
    if (this.state.hasError) {
      return <h1>抱歉，發生了一些錯誤，請稍後再試。</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
