// client/vite-project/src/components/ClientPanel.jsx
import React, { useState } from 'react';
import { deleteClientRequest, updateClientRequest } from '../api/axios';
import EditClientModal from './EditClientModal';

const ClientPanel = ({ client, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

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
    <div className="bg-gray-100 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">{client.firstName} {client.lastName}</h2>
      <p className="text-gray-700">{client.email}</p>
      <p className="text-gray-700">Phone: {client.phone}</p>
      <p className="text-gray-700">Company: {client.company}</p>
      <div className="flex space-x-2 mt-4">
        <button
          onClick={() => setIsEditing(true)}
          className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-300 shadow-lg transform hover:scale-105"
        >
          Edit Client
        </button>
        <button
          onClick={handleDeleteClient}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300 shadow-lg transform hover:scale-105"
        >
          Delete Client
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