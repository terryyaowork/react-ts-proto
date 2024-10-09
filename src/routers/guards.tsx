import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../stores'; // 確保這裡的store正確導入

export const RequireAdmin = ({ children }: { children: React.JSX.Element }) => {
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const RequireAuth = ({ children }: { children: React.JSX.Element }) => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
