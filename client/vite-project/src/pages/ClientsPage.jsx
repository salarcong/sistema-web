// client/vite-project/src/pages/ClientsPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientPanel from '../components/ClientPanel';

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/clientsAll'); // Asegúrate de que esta ruta exista en tu backend
      const data = await response.json();
      setClients(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteClient = (clientId) => {
    setClients(clients.filter(client => client._id !== clientId));
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-500 to-purple-600 p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Clientes</h1>
        <div className="mb-6 text-center">
          <button
            onClick={() => navigate('/admin-dashboard')}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 shadow-lg transform hover:scale-105"
          >
            Back to Admin Dashboard
          </button>
        </div>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client) => (
              <ClientPanel key={client._id} client={client} onDelete={handleDeleteClient} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientsPage;