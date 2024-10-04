import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [role, setRole] = useState('');
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(role);
    };

    return (
        <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-center text-2xl mb-6">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Role:</label>
                    <select 
                        value={role} 
                        onChange={(e) => setRole(e.target.value)} 
                        required 
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select a role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>
                <button 
                    type="submit" 
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;