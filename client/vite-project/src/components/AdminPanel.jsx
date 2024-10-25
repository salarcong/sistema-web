// client/vite-project/src/components/AdminPanel.jsx
import React from 'react';
import { FaUser, FaCog, FaChartBar, FaSignOutAlt, FaBars, FaTimes, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminPanel = ({ isPanelOpen, togglePanel, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <aside className={`bg-gray-800 text-white flex flex-col transition-width duration-300 ${isPanelOpen ? 'w-64' : 'w-16'}`}>
      <div className="p-4 text-center text-2xl font-bold border-b border-gray-700 flex justify-between items-center">
        {isPanelOpen && <span>Admin Panel</span>}
        <button onClick={togglePanel} className="text-white focus:outline-none">
          {isPanelOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <nav className="flex-1 p-4 flex flex-col">
        <ul className="flex-1">
          <li className="mb-4">
            <button
              onClick={() => navigate('/users')}
              className="flex items-center p-2 hover:bg-gray-700 rounded w-full text-left"
            >
              <FaUser className="mr-2" /> {isPanelOpen && 'Usuarios'}
            </button>
          </li>
          <li className="mb-4">
            <button
              onClick={() => navigate('/clients')}
              className="flex items-center p-2 hover:bg-gray-700 rounded w-full text-left"
            >
              <FaUsers className="mr-2" /> {isPanelOpen && 'Clientes'}
            </button>
          </li>
          <li className="mb-4">
            <a href="#reports" className="flex items-center p-2 hover:bg-gray-700 rounded">
              <FaChartBar className="mr-2" /> {isPanelOpen && 'Reportes'}
            </a>
          </li>
        </ul>
        <button
          onClick={handleLogout}
          className="flex items-center p-2 hover:bg-gray-700 rounded w-full text-left"
        >
          <FaSignOutAlt className="mr-2" /> {isPanelOpen && 'Cerrar sesión'}
        </button>
      </nav>
    </aside>
  );
};

export default AdminPanel;