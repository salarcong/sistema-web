// client/vite-project/src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
import AdminPanel from '../components/AdminPanel';

const AdminDashboard = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token de localStorage
    navigate('/login'); // Redirigir a la página de inicio de sesión
  };

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-blue-500 to-purple-600">
      <AdminPanel isPanelOpen={isPanelOpen} togglePanel={togglePanel} handleLogout={handleLogout} />
      <main className="flex-1 p-8">
        {/* Aquí puedes agregar el contenido principal del panel de administración */}
        <h1 className="text-4xl font-bold text-white">Bienvenido al Panel de Administración</h1>
      </main>
    </div>
  );
};

export default AdminDashboard;