import React, { useState, useEffect } from 'react';
import UserPanel from './UserPanel';
import { getUsersRequest } from '../api/task';

const ParentComponent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the API
    const fetchUsers = async () => {
      try {
        const response = await getUsersRequest();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user._id !== userId));
  };

  return (
    <div>
      {users.map(user => (
        <UserPanel
          key={user._id}
          id={user._id}
          username={user.username}
          email={user.email}
          onDelete={handleDeleteUser}
        />
      ))}
    </div>
  );
};

export default ParentComponent;