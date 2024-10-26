// client/vite-project/src/pages/UploadDataPage.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { uploadFileRequest } from '../api/axios'; // Importa la función
import ClientInfoPanel from '../components/ClientInfoPanel';
import UploadDataPanel from '../components/UploadDataPanel';
import AdminPanel from '../components/AdminPanel'; // Importa el componente AdminPanel

const UploadDataPage = () => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const clientId = new URLSearchParams(location.search).get('clientId');

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert('Please select files first');
      return;
    }

    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file);
    }
    console.log('clientId:', clientId);
    formData.append('clientId', clientId); // Añade el clientId al formData

    try {
      const response = await uploadFileRequest(formData);
      if (response.status === 200) {
        alert('Files uploaded successfully');
        setFiles([]);
      } else {
        alert('Failed to upload files');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('An error occurred while uploading the files');
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
      <AdminPanel clientId={clientId} /> {/* Añade el componente AdminPanel */}
    </div>
  );
};

export default UploadDataPage;