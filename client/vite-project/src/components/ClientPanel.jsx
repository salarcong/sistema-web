import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteClientRequest } from '../api/axios';
import EditClientModal from './EditClientModal';

const ClientPanel = ({ client, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const handleDeleteClient = async () => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        const response = await deleteClientRequest(client._id);
        if (response.status === 200) {
          onDelete(client._id);
        } else {
          alert('Failed to delete client');
        }
      } catch (error) {
        console.error('Error deleting client:', error);
        alert('An error occurred while deleting the client');
      }
    }
  };

  const handleSaveClient = (updatedClient) => {
    setIsEditing(false);
    // Aquí puedes actualizar el estado del cliente si es necesario
    window.location.reload(); // Recargar la página automáticamente
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{client.firstName} {client.lastName}</h2>
      <p className="text-gray-600 mb-2"><strong>Email:</strong> {client.email}</p>
      <p className="text-gray-600 mb-2"><strong>Phone:</strong> {client.phone}</p>
      <p className="text-gray-600 mb-4"><strong>Company:</strong> {client.company}</p>
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <button
          onClick={() => setIsEditing(true)}
          className="bg-yellow-500 text-white text-sm py-2 px-4 w-full sm:w-auto rounded-md hover:bg-yellow-600 transition duration-300 shadow-md transform hover:scale-105"
        >
          Edit Client
        </button>
        <button
          onClick={handleDeleteClient}
          className="bg-red-500 text-white text-sm py-2 px-4 w-full sm:w-auto rounded-md hover:bg-red-600 transition duration-300 shadow-md transform hover:scale-105"
        >
          Delete Client
        </button>
        <button
          onClick={() => navigate(`/upload-data?clientId=${client._id}`)}
          className="bg-blue-500 text-white text-sm py-2 px-4 w-full sm:w-auto rounded-md hover:bg-blue-600 transition duration-300 shadow-md transform hover:scale-105"
        >
          Data
        </button>
      </div>
      <EditClientModal
        isOpen={isEditing}
        onRequestClose={() => setIsEditing(false)}
        client={client}
        onSave={handleSaveClient}
      />
    </div>
  );
};

export default ClientPanel;