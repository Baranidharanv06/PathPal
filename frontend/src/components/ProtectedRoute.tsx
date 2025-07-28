import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../context/AppContext'; // Corrected import and hook name

const ProtectedRoute = () => {
  const { isAuthenticated } = useAppContext(); // Corrected hook name

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;