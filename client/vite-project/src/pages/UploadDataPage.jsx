// client/vite-project/src/pages/UploadDataPage.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { uploadFileRequest } from '../api/axios'; // Importa la función
import ClientInfoPanel from '../components/ClientInfoPanel';
import UploadDataPanel from '../components/UploadDataPanel';

const UploadDataPage = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const clientId = new URLSearchParams(location.search).get('clientId');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('clientId', clientId); // Añade el clientId al formData

    try {
      const response = await uploadFileRequest(formData);
      if (response.status === 200) {
        alert('File uploaded successfully');
        setFile(null);
      } else {
        alert('Failed to upload file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while uploading the file');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-500 to-purple-600 p-8">
      <ClientInfoPanel clientId={clientId} />
      <UploadDataPanel
        handleFileChange={handleFileChange}
        handleUpload={handleUpload}
        clientId={clientId} // Pasa el clientId al componente UploadDataPanel
      />
    </div>
  );
};

export default UploadDataPage;