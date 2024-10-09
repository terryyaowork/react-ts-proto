import { CustomizeRoute, RoutePath } from '../typings/routers';
import { lazy } from 'react';
import Layout from '../layouts/main/Layout'; // 主版面 Layout
import NotFound from '../pages/NotFound'; // 引入404頁面
import PrivateRoute from './PrivateRoute';

// 動態載入頁面
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Dashboard = lazy(() => import('../pages/admin/Dashboard'));
const Buggy = lazy(() => import('../pages/Buggy'));

// 定義路由
export const routes: CustomizeRoute[] = [
  {
    path: RoutePath.HOME,
    element: <Layout />,
    children: [
      {
        path: RoutePath.EMPTY,
        element: <Home />,
        breadcrumb: 'Home',
      },
      {
        path: RoutePath.ABOUT,
        element: <About />,
        breadcrumb: 'About',
      },
      {
        path: RoutePath.ADMIN,
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        breadcrumb: 'Admin',
      },
      // 處理404
      {
        path: RoutePath.NOT_FOUND,
        element: <NotFound />,
        breadcrumb: '404 NotFound',
      },
      {
        path: RoutePath.ERROR_PAGE,
        element: <Buggy />,
        breadcrumb: 'Error',
      },
    ],
  },
];
