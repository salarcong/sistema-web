// client/vite-project/src/components/AdminRoute.jsx
import React from 'react';
import AccessDenied from './AccessDenied';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = token ? JSON.parse(atob(token.split('.')[1])) : null; // Decodifica el token para obtener el rol del usuario

  if (!user || user.role !== 'admin') {
    return <AccessDenied />; // Muestra el componente AccessDenied si no es administrador
  }

  return children;
};

export default AdminRoute;