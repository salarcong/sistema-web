import React, { useEffect, useState } from 'react';
import { getDataRequest, deleteDataRequest } from '../api/axios'; // Importa la función deleteDataRequest
import { FaEdit, FaTrash } from 'react-icons/fa';

const UploadDataPanel = ({ handleFileChange, handleUpload }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDataRequest();
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        const response = await deleteDataRequest(id);
        if (response.status === 200) {
          setData(data.filter(item => item._id !== id));
        } else {
          alert('Failed to delete client');
        }
      } catch (error) {
        console.error('Error deleting client:', error);
        alert('An error occurred while deleting the client');
      }
    }
  };

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
    <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Upload Data</h1>
      <div className="mb-6 text-center">
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleUpload}
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 shadow-lg transform hover:scale-105"
        >
          Upload File
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Uploaded Data</h2>
      {data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600 font-semibold">First Name</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600 font-semibold">Last Name</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600 font-semibold">Phone</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600 font-semibold">Email</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600 font-semibold">Age</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600 font-semibold">Position</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b border-gray-200">{item.firstName}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{item.lastName}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{item.phone}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{item.email}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{item.age}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{item.position}</td>
                  <td className="py-2 px-4 border-b border-gray-200 flex space-x-2">
                    <button className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition duration-300 shadow-md transform hover:scale-105">
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-300 shadow-md transform hover:scale-105"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">No data uploaded yet.</p>
      )}
    </div>
  );
};

export default UploadDataPanel;