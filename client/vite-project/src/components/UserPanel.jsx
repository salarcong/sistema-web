// client/vite-project/src/components/UserPanel.jsx
import React from 'react';
import { deleteUserRequest } from '../api/axios';

const UserPanel = ({ user, onDelete }) => {
  const handleDeleteUser = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await deleteUserRequest(user._id);
        if (response.status === 200) {
          onDelete(user._id);
        } else {
          alert('Failed to delete user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('An error occurred while deleting the user');
      }
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">{user.username}</h2>
      <p className="text-gray-700">{user.email}</p>
      <button
        onClick={handleDeleteUser}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      >
        Delete User
      </button>
    </div>
  );
};

export default UserPanel;
