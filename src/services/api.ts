import axios from 'axios';

const BASE_URL = 'https://nomio-backend.onrender.com'; // Adjust based on your backend

export const api = {
  login: (email: string, password: string) =>
    axios.post(`${BASE_URL}/login`, { email, password }).then((res) => {
      localStorage.setItem('token', res.data.token); // Store token as in nomio-website
      return res;
    }),

  register: (data: { username: string; email: string; password: string; address: string; role: string }) =>
    axios.post(`${BASE_URL}/register`, data).then((res) => {
      localStorage.setItem('token', res.data.token);
      return res;
    }),

  createOrder: (order: { items: any[]; total: number; address: string }) =>
    axios.post(`${BASE_URL}/orders`, order, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }),

  getOrders: (userId: string) =>
    axios.get(`${BASE_URL}/orders`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      params: { userId },
    }),

  updateOrderStatus: (orderId: string, status: string) =>
    axios.post(`${BASE_URL}/orders/update-status`, { orderId, status }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }),
};