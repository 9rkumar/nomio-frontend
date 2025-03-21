import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { api } from '../services/api';

export const useOrders = () => {
  const { user } = useAuth();
  const [orderHistory, setOrderHistory] = useState<any[]>([]);

  const fetchOrders = async () => {
    if (!user) return;
    try {
      const response = user.role === 'superadmin' ? await api.getAllOrders() : await api.getOrders(user.id);
      setOrderHistory(response.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err.response?.data);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const refetchOrders = () => {
    fetchOrders();
  };

  return { orderHistory, refetchOrders };
};