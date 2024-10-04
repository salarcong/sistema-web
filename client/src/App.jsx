import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="p-6 w-full max-w-md">
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/admin" element={<PrivateRoute role="admin"><AdminPage /></PrivateRoute>} />
                            <Route path="/user" element={<PrivateRoute role="user"><UserPage /></PrivateRoute>} />
                            <Route path="*" element={<Navigate to="/login" />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </AuthProvider>
    );
};

const PrivateRoute = ({ children, role }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user.role !== role) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default App;