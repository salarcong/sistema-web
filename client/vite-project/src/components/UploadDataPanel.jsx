// client/vite-project/src/components/UploadDataPanel.jsx
import React, { useEffect, useState } from 'react';
import { getDataRequest } from '../api/axios';

const UploadDataPanel = ({ handleFileChange, handleUpload, navigate }) => {
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

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Upload Data</h1>
      <div className="mb-6 text-center">
        <input type="file" onChange={handleFileChange} className="mb-4" />
        <button
          onClick={handleUpload}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 shadow-lg transform hover:scale-105"
        >
          Upload File
        </button>
      </div>
      <div className="mb-6 text-center">
        <button
          onClick={() => navigate('/clients')}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 shadow-lg transform hover:scale-105"
        >
          Back to Clients
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Uploaded Data</h2>
      {data.length > 0 ? (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">First Name</th>
              <th className="py-2">Last Name</th>
              <th className="py-2">Phone</th>
              <th className="py-2">Email</th>
              <th className="py-2">Age</th>
              <th className="py-2">Position</th>
              <th className="py-2">Department</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td className="py-2">{item.firstName}</td>
                <td className="py-2">{item.lastName}</td>
                <td className="py-2">{item.phone}</td>
                <td className="py-2">{item.email}</td>
                <td className="py-2">{item.age}</td>
                <td className="py-2">{item.position}</td>
                <td className="py-2">{item.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data uploaded yet.</p>
      )}
    </div>
  );
};

export default UploadDataPanel;