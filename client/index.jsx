import React from 'react';
import ReactDOM from 'react-dom';
import Login from './login.jsx'; // Asegúrate de que la ruta sea correcta

const App = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));