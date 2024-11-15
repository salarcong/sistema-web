// client/vite-project/src/components/UserPanel.jsx
import React, { useState } from 'react';
import { deleteUserRequest } from '../api/axios';
import EditUserModal from './EditUserModal';

const UserPanel = ({ user, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

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

  const handleSaveUser = (updatedUser) => {
    setIsEditing(false);
    window.location.reload(); // Recargar la página automáticamente
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">{user.username}</h2>
      <p className="text-gray-700">{user.email}</p>
      <p className="text-gray-700">Role: {user.role}</p>
      <div className="flex space-x-2 mt-4">
        {/*<button
          onClick={() => setIsEditing(true)}
          className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-300 shadow-lg transform hover:scale-105"
        >
          Edit User
        </button>*/}
        <button
          onClick={handleDeleteUser}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300 shadow-lg transform hover:scale-105"
        >
          Delete User
        </button>
      </div>
      <EditUserModal
        isOpen={isEditing}
        onRequestClose={() => setIsEditing(false)}
        user={user}
        onSave={handleSaveUser}
      />
    </div>
  );
};

export default UserPanel;