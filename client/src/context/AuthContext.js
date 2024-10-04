import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = (role) => {
        // Aquí puedes agregar la lógica para autenticar al usuario
        // y obtener su rol desde el backend.
        // Por simplicidad, vamos a simular la autenticación.
        if (role === 'admin') {
            setUser({ role: 'admin' });
            navigate('/admin');
        } else if (role === 'user') {
            setUser({ role: 'user' });
            navigate('/user');
        } else {
            alert('Invalid role');
        }
    };

    const logout = () => {
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);