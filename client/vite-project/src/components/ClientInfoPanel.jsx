// client/vite-project/src/components/ClientInfoPanel.jsx
import React, { useEffect, useState } from 'react';
import { getClientRequest } from '../api/axios';
import { FaEnvelope, FaPhone, FaBirthdayCake } from 'react-icons/fa';

const ClientInfoPanel = ({ clientId }) => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await getClientRequest(clientId);
        setClient(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching client information');
        setLoading(false);
      }
    };

    fetchClient();
  }, [clientId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-4xl mb-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Client Information</h1>
      {client ? (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center rounded-full text-2xl font-bold">
              {client.firstName.charAt(0)}{client.lastName.charAt(0)}
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-800">{client.firstName} {client.lastName}</p>
              <p className="text-gray-600">{client.position} at {client.company}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-gray-600 flex items-center"><FaEnvelope className="mr-2" /> <strong>Email:</strong> {client.email}</p>
            <p className="text-gray-600 flex items-center"><FaPhone className="mr-2" /> <strong>Phone:</strong> {client.phone}</p>
            <p className="text-gray-600 flex items-center"><FaBirthdayCake className="mr-2" /> <strong>Age:</strong> {client.age}</p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">No client information available</p>
      )}
    </div>
  );
};

export default ClientInfoPanel;