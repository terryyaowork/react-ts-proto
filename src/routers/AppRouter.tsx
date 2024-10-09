import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes } from './routes'; // 引入路由配置
import { CustomizeRoute } from '../typings/routers';

// 遞歸渲染路由
const renderRoutes = (routeList: CustomizeRoute[]) => routeList.map((route) => {
  if (route.children) {
    return (
      <Route key={route.path} path={route.path} element={route.element}>
        {renderRoutes(route.children)}
      </Route>
    );
  }
  return <Route key={route.path} path={route.path} element={route.element} />;
});

const AppRouter = () => (
  <Router>
    <Routes>{renderRoutes(routes)}</Routes>
  </Router>
);

export default AppRouter;
