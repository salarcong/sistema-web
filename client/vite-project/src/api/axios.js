import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Añadir token de autenticación
  },
});

export const getUsersRequest = () => api.get('/usersAll');
export const deleteUserRequest = (id) => api.delete(`/deleteUser/${id}`);