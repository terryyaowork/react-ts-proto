import { ReactNode } from 'react';

// 定義 CustomizeRoute 的類型
export interface CustomizeRoute {
  path: string;
  element: ReactNode;
  breadcrumb?: string; // 可選麵包屑名稱
  children?: CustomizeRoute[]; // 支持嵌套路由
}

export enum RoutePath {
  EMPTY = '',
  HOME = '/',
  ABOUT = '/about',
  ADMIN = '/admin',
  NOT_FOUND = '*',
  ERROR_PAGE = '/error',
}
