import axios from 'axios';

const BASE_URL = 'https://nomio-backend.onrender.com'; // Adjust based on your backend

export const api = {
  login: (email: string, password: string) =>
    axios.post(`${BASE_URL}/auth/login`, { email, password }),

  register: (data: { username: string; email: string; password: string; address: string; role: string }) =>
    axios.post(`${BASE_URL}/auth/register`, data),

  createOrder: (order: { userId: string; items: any[]; total: number; address: string }) =>
    axios.post(`${BASE_URL}/orders`, order, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }),

  getOrders: (userId: string) =>
    axios.get(`${BASE_URL}/orders/user/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }),

  updateOrderStatus: (orderId: string, status: string) =>
    axios.put(`${BASE_URL}/orders/${orderId}/status`, { status }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }),
};