import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Order } from '../types';
import { api } from '../services/api';
import { useAuth } from './useAuth';

export const useOrders = () => {
  const { user } = useAuth();
  const [orderHistory, setOrderHistory] = useState<Order[]>(JSON.parse(localStorage.getItem('orderHistory') || '[]'));

  const { data, refetch } = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: () => (user ? api.getOrders(user.id).then((res) => res.data) : Promise.resolve([])),
    enabled: !!user,
  });

  useEffect(() => {
    if (data) {
      setOrderHistory(data);
      localStorage.setItem('orderHistory', JSON.stringify(data));
    }
  }, [data]);

  return { orderHistory, refetchOrders: refetch };
};