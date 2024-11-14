import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaUserTag } from 'react-icons/fa';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Valor predeterminado 'user'
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password, role }),
    });
    if (response.ok) {
      alert('Registro exitoso');
    } else {
      alert('Error en el registro');
    }
  };

  const handleBack = () => {
    navigate('/users'); // Redirigir a la página de usuarios
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Registro</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Nombre de usuario</label>
            <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
              <span className="px-3 text-gray-500"><FaUser /></span>
              <input
                type="text"
                id="username"
                className="mt-1 block w-full px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Correo electrónico</label>
            <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
              <span className="px-3 text-gray-500"><FaEnvelope /></span>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Contraseña</label>
            <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
              <span className="px-3 text-gray-500"><FaLock /></span>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700">Rol</label>
            <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
              <span className="px-3 text-gray-500"><FaUserTag /></span>
              <div className="relative w-full">
                <select
                  id="role"
                  className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded-md leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7 10l5 5 5-5H7z"/></svg>
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Registrar
          </button>
        </form>
        <button
          onClick={handleBack}
          className="w-full mt-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          Regresar
        </button>
      </div>
    </div>
  );
};

export default Register;