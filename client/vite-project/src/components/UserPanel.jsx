// client/vite-project/src/components/UserPanel.jsx
import React, { useState } from 'react';
import { deleteUserRequest } from '../api/axios';
import EditUserForm from './EditUserForm';

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
    // Aquí puedes actualizar el estado del usuario si es necesario
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow">
      {isEditing ? (
        <EditUserForm
          user={user}
          onCancel={() => setIsEditing(false)}
          onSave={handleSaveUser}
        />
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-2">{user.username}</h2>
          <p className="text-gray-700">{user.email}</p>
          <p className="text-gray-700">Role: {user.role}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
          >
            Edit User
          </button>
          <button
            onClick={handleDeleteUser}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 ml-2"
          >
            Delete User
          </button>
        </div>
      )}
    </div>
  );
};

export default UserPanel;