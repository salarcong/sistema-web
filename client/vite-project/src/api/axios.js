// client/vite-project/src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Añadir token de autenticación
  },
});

// Funciones para usuarios
export const getUserRequest = (id) => api.get(`/user/${id}`);
export const deleteUserRequest = (id) => api.delete(`/deleteUser/${id}`);
export const updateUserRequest = (id, user) => api.put(`/updateUser/${id}`, user);

// Funciones para clientes
export const getClientsRequest = () => api.get('/clients');
export const getClientRequest = (id) => api.get(`/client/${id}`);
export const deleteClientRequest = (id) => api.delete(`/delete-client/${id}`);
export const updateClientRequest = (id, client) => api.put(`/update-client/${id}`, client);
export const createClientRequest = (client) => api.post('/add-client', client);