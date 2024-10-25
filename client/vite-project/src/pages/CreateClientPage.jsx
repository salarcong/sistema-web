// client/vite-project/src/pages/CreateClientPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClientRequest } from '../api/axios';

const CreateClientPage = () => {
  const [client, setClient] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    age: '',
    company: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createClientRequest(client);
      if (response.status === 201) {
        alert('Client created successfully');
        navigate('/clients');
      } else {
        alert('Failed to create client');
      }
    } catch (error) {
      console.error('Error creating client:', error);
      alert('An error occurred while creating the client');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-500 to-purple-600 p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Client</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            value={client.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="mb-2 p-2 border rounded w-full"
          />
          <input
            type="text"
            name="lastName"
            value={client.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="mb-2 p-2 border rounded w-full"
          />
          <input
            type="email"
            name="email"
            value={client.email}
            onChange={handleChange}
            placeholder="Email"
            className="mb-2 p-2 border rounded w-full"
          />
          <input
            type="text"
            name="phone"
            value={client.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="mb-2 p-2 border rounded w-full"
          />
          <input
            type="number"
            name="age"
            value={client.age}
            onChange={handleChange}
            placeholder="Age"
            className="mb-2 p-2 border rounded w-full"
          />
          <input
            type="text"
            name="company"
            value={client.company}
            onChange={handleChange}
            placeholder="Company"
            className="mb-2 p-2 border rounded w-full"
          />
          <div className="flex justify-center mt-4 space-x-4">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 shadow-lg transform hover:scale-105"
            >
              Create Client
            </button>
            <button
              type="button"
              onClick={() => navigate('/clients')}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300 shadow-lg transform hover:scale-105"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClientPage;