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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/users" element={<Users />} /> {/* Añadir ruta para Users */}
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/create-client" element={<CreateClientPage />} />
        <Route path="/upload-data" element={<UploadDataPage />} />
      </Routes>
    </Router>
  );
};

export default App;