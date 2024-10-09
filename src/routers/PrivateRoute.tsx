import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../stores';

const PrivateRoute = (
  { children, requiredRole }: { children: React.JSX.Element, requiredRole?: string },
) => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const userRole = useSelector((state: RootState) => state.user.role);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
};

export default PrivateRoute;
