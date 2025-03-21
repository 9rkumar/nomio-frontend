import axios from 'axios';

const backendUrl = 'https://nomio-backend.onrender.com';

export const api = {
  login: (email: string, password: string) =>
    axios.post(`${backendUrl}/api/auth/login`, { email, password }),
  register: (data: { username: string; email: string; password: string; address: string; role: string }) =>
    axios.post(`${backendUrl}/api/auth/register`, data),
  getOrders: (userId: string) => axios.get(`${backendUrl}/api/orders/${userId}`),
  createOrder: (order: any) => axios.post(`${backendUrl}/api/orders`, order),
  updateOrderStatus: (orderId: string, status: string) =>
    axios.put(`${backendUrl}/api/orders/${orderId}`, { status }),
  getAllOrders: () => axios.get(`${backendUrl}/api/orders`),
  getUsers: () => axios.get(`${backendUrl}/api/auth/users`),
  updateUser: (userId: string, data: any) =>
    axios.put(`${backendUrl}/api/auth/update/${userId}`, data),
};