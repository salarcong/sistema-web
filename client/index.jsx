import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Importa el archivo CSS de Tailwind
import Login from './components/login.jsx'; // Asegúrate de que la ruta sea correcta

const App = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Login />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));