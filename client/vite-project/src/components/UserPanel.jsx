// client/vite-project/src/components/UserPanel.jsx
import React from 'react';

const UserPanel = ({ username, email }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">{username}</h2>
      <p className="text-gray-700">{email}</p>
    </div>
  );
};

export default UserPanel;