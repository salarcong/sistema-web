// client/vite-project/src/components/EditUserModal.jsx
import React, { useState } from 'react';
import Modal from 'react-modal';
import { updateUserRequest } from '../api/axios';

Modal.setAppElement('#root'); // Asegúrate de que esto apunte al elemento raíz de tu aplicación

const EditUserModal = ({ isOpen, onRequestClose, user, onSave }) => {
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await updateUserRequest(user._id, editedUser);
      if (response.status === 200) {
        onSave(editedUser);
        alert('User updated successfully');
        onRequestClose();
      } else {
        alert('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('An error occurred while updating the user');
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Edit User">
      <h2>Edit User</h2>
      <input
        type="text"
        name="username"
        value={editedUser.username}
        onChange={handleChange}
        className="mb-2 p-2 border rounded"
      />
      <input
        type="email"
        name="email"
        value={editedUser.email}
        onChange={handleChange}
        className="mb-2 p-2 border rounded"
      />
      <input
        type="text"
        name="role"
        value={editedUser.role}
        onChange={handleChange}
        className="mb-2 p-2 border rounded"
      />
      <button
        onClick={handleSave}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Save
      </button>
      <button
        onClick={onRequestClose}
        className="mt-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 ml-2"
      >
        Cancel
      </button>
    </Modal>
  );
};

export default EditUserModal;