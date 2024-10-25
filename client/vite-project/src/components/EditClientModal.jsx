// client/vite-project/src/components/EditClientModal.jsx
import React, { useState } from 'react';
import Modal from 'react-modal';
import { updateClientRequest } from '../api/axios';

Modal.setAppElement('#root'); // Asegúrate de que esto apunte al elemento raíz de tu aplicación

const EditClientModal = ({ isOpen, onRequestClose, client, onSave }) => {
  const [editedClient, setEditedClient] = useState({ ...client });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await updateClientRequest(client._id, editedClient);
      if (response.status === 200) {
        onSave(editedClient);
        alert('Client updated successfully');
        onRequestClose();
      } else {
        alert('Failed to update client');
      }
    } catch (error) {
      console.error('Error updating client:', error);
      alert('An error occurred while updating the client');
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Edit Client" className="modal" overlayClassName="modal-overlay">
      <h2 className="text-2xl font-bold mb-4">Edit Client</h2>
      <input
        type="text"
        name="firstName"
        value={editedClient.firstName}
        onChange={handleChange}
        className="mb-2 p-2 border rounded w-full"
      />
      <input
        type="text"
        name="lastName"
        value={editedClient.lastName}
        onChange={handleChange}
        className="mb-2 p-2 border rounded w-full"
      />
      <input
        type="email"
        name="email"
        value={editedClient.email}
        onChange={handleChange}
        className="mb-2 p-2 border rounded w-full"
      />
      <input
        type="text"
        name="phone"
        value={editedClient.phone}
        onChange={handleChange}
        className="mb-2 p-2 border rounded w-full"
      />
      <input
        type="text"
        name="company"
        value={editedClient.company}
        onChange={handleChange}
        className="mb-2 p-2 border rounded w-full"
      />
      <div className="flex space-x-2 mt-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 shadow-lg transform hover:scale-105"
        >
          Save
        </button>
        <button
          onClick={onRequestClose}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300 shadow-lg transform hover:scale-105"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default EditClientModal;