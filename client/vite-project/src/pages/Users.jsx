import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserPanel from '../components/UserPanel';
import AdminPanel from '../components/AdminPanel';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/usersAll');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user._id !== userId));
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token de localStorage
    navigate('/login'); // Redirigir a la página de inicio de sesión
  };

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-blue-500 to-purple-600">
      <AdminPanel isPanelOpen={isPanelOpen} togglePanel={togglePanel} handleLogout={handleLogout} />
      <main className="flex-1 p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Usuarios</h1>
          <div className="mb-6 text-center flex justify-center space-x-4">
            <button
              onClick={() => navigate('/admin-dashboard')}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 shadow-lg transform hover:scale-105"
            >
              Regresar al Admin Dashboard
            </button>
            <button
              onClick={() => navigate('/register')}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 shadow-lg transform hover:scale-105"
            >
              Registrar Nuevo Usuario
            </button>
          </div>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <UserPanel key={user._id} user={user} onDelete={handleDeleteUser} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Users;