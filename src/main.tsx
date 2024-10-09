import './assets/index.css';
// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './stores'; // 導入已經配置好的 Redux store

createRoot(document.getElementById('root')!).render(
  // <StrictMode> // 打開會造成畫面打兩次 api
    <Provider store={store}>
      <App />
    </Provider>,
  // </StrictMode>,
);
