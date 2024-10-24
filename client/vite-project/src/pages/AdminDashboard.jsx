import React from 'react';
import { FaUser, FaCog, FaChartBar, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token de localStorage
    navigate('/login'); // Redirigir a la página de inicio de sesión
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-blue-500 to-purple-600">
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-center text-2xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 flex flex-col">
          <ul className="flex-1">
            <li className="mb-4">
              <button
                onClick={() => navigate('/users')}
                className="flex items-center p-2 hover:bg-gray-700 rounded w-full text-left"
              >
                <FaUser className="mr-2" /> Usuarios
              </button>
            </li>
            <li className="mb-4">
              <a href="#settings" className="flex items-center p-2 hover:bg-gray-700 rounded">
                <FaCog className="mr-2" /> Configuración
              </a>
            </li>
            <li className="mb-4">
              <a href="#reports" className="flex items-center p-2 hover:bg-gray-700 rounded">
                <FaChartBar className="mr-2" /> Reportes
              </a>
            </li>
          </ul>
          <button
            onClick={handleLogout}
            className="flex items-center p-2 hover:bg-gray-700 rounded w-full text-left mt-auto"
          >
            <FaSignOutAlt className="mr-2" /> Salir
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-white rounded-lg shadow-lg m-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Admin Dashboard</h1>
        <p className="text-lg text-center">Bienvenido, administrador.</p>
        {/* Aquí puedes añadir más contenido del dashboard */}
      </main>
    </div>
  );
};

export default AdminDashboard;