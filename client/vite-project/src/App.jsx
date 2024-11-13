import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Users from './pages/Users'; // Añadir importación de Users
import ClientsPage from './pages/ClientsPage';
import CreateClientPage from './pages/CreateClientPage';
import UploadDataPage from './pages/UploadDataPage';
import ProtectedRoute from './components/ProtectedRoute'; // Importar el componente ProtectedRoute

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/register"
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        /> {/* Añadir ruta para Users */}
        <Route
          path="/clients"
          element={
            <ProtectedRoute>
              <ClientsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-client"
          element={
            <ProtectedRoute>
              <CreateClientPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload-data"
          element={
            <ProtectedRoute>
              <UploadDataPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;