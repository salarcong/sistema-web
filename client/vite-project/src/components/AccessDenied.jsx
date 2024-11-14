// client/vite-project/src/components/AccessDenied.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AccessDenied = () => {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    if (countdown === 0) {
      localStorage.removeItem('token'); // Eliminar el token de localStorage
      navigate('/login'); // Redirigir a la página de inicio de sesión
    }

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Acceso Denegado</h1>
        <p className="text-gray-700 mb-4">No tienes permiso para acceder a esta página.</p>
        <p className="text-gray-700">Serás redirigido a la página de inicio de sesión en {countdown} segundos.</p>
      </div>
    </div>
  );
};

export default AccessDenied;