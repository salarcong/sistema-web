import React, { useState } from 'react';
import Modal from 'react-modal';
import { updateUserRequest } from '../api/axios';

Modal.setAppElement('#root');

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
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Edit User" className="modal" overlayClassName="modal-overlay">
      <h2 className="text-2xl font-bold mb-4">Edit User</h2>
      <input
        type="text"
        name="username"
        value={editedUser.username}
        onChange={handleChange}
        className="mb-2 p-2 border rounded w-full"
      />
      <input
        type="email"
        name="email"
        value={editedUser.email}
        onChange={handleChange}
        className="mb-2 p-2 border rounded w-full"
      />
      <div className="mb-4">
        <label htmlFor="role" className="block text-gray-700">Rol</label>
        <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
          <div className="relative w-full">
            <select
              id="role"
              name="role"
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded-md leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={editedUser.role}
              onChange={handleChange}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7 10l5 5 5-5H7z"/></svg>
            </div>
          </div>
        </div>
      </div>
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

export default EditUserModal;