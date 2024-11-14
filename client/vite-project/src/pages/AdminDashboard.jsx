import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPanel from '../components/AdminPanel';
import adminImage from '../source/logo.png'; // Importa la imagen desde la carpeta src

const AdminDashboard = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const navigate = useNavigate();

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
      <main className="flex-1 p-8 flex justify-center items-center">
        {/* Aquí puedes agregar el contenido principal del panel de administración */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-8">Bienvenido al Panel de Administración</h1>
          <img src={adminImage} alt="Admin Dashboard" className="max-w-full h-auto object-cover" />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;