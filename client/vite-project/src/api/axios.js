// client/vite-project/src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Añadir token de autenticación
  },
});

export const getUserRequest = (id) => api.get(`/user/${id}`);
export const deleteUserRequest = (id) => api.delete(`/deleteUser/${id}`);
export const updateUserRequest = (id, user) => api.put(`/updateUser/${id}`, user);