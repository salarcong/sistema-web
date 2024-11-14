// client/vite-project/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Verifica si hay un token en localStorage

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redirige a la página de inicio de sesión si no está autenticado
  }

  return children;
};

export default ProtectedRoute;