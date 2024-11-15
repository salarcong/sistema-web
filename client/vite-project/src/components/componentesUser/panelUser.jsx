import React from 'react';
import { FaUser, FaCog, FaChartBar, FaSignOutAlt, FaBars, FaTimes, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const panelUser = ({ isPanelOpen, togglePanel, handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.removeItem('token'); // Eliminar el token de localStorage
    navigate('/login'); // Redirigir a la página de inicio de sesión
  };

  return (
    <aside className={`bg-gray-800 text-white flex flex-col transition-width duration-300 ${isPanelOpen ? 'w-64' : 'w-16'}`}>
      <div className="p-4 text-center text-2xl font-bold border-b border-gray-700 flex justify-between items-center">
        {isPanelOpen && <span>User Panel</span>}
        <button onClick={togglePanel} className="text-white focus:outline-none">
          {isPanelOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <nav className="flex-1 p-4 flex flex-col">
        <ul className="flex-1">
          <li className="mb-4">
            <button
              onClick={() => navigate('/clientsUser')}
              className="flex items-center p-2 hover:bg-gray-700 rounded w-full text-left"
            >
              <FaUsers className="mr-2" /> {isPanelOpen && 'Clientes'}
            </button>
          </li>
        </ul>
        <button
          onClick={handleLogoutClick}
          className="flex items-center p-2 hover:bg-gray-700 rounded w-full text-left"
        >
          <FaSignOutAlt className="mr-2" /> {isPanelOpen && 'Cerrar sesión'}
        </button>
      </nav>
    </aside>
  );
};

export default panelUser;