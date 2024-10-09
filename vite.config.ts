import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // 其他配置
  envPrefix: 'VITE_', // 確保 VITE_ 前綴的環境變量被讀取
  plugins: [react()],
});
