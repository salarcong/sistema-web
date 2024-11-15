import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientPanel from '../components/ClientPanel';
import PanelUser from '../components/componentesUser/panelUser';
import ClientPanelUser from '../components/componentesUser/ClientPanelUser';

const ClientsPageUser = () => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
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

  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token de localStorage
    navigate('/login'); // Redirigir a la página de inicio de sesión
  };

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-blue-500 to-purple-600">
      <PanelUser isPanelOpen={isPanelOpen} togglePanel={togglePanel} handleLogout={handleLogout} />
      <main className="flex-1 p-8 flex flex-col items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Clientes</h1>
          <div className="mb-6 text-center flex justify-center space-x-4">
            <button
              onClick={() => navigate('/user-dashboard')}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 shadow-lg transform hover:scale-105"
            >
              Back to User Dashboard
            </button>
            <button
              onClick={() => navigate('/create-client-user')}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 shadow-lg transform hover:scale-105"
            >
              Add Client
            </button>
          </div>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {clients.slice(0, 4).map((client) => ( // Limita el número de clientes a 4 para mostrar dos filas de dos paneles cada una
                <ClientPanelUser key={client._id} client={client} onDelete={handleDeleteClient} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ClientsPageUser;