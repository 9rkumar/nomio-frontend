import { useState, useEffect } from 'react';
import { User } from '../types';
import { api } from '../services/api';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(JSON.parse(localStorage.getItem('user') || 'null'));
  const [isSubscribed, setIsSubscribed] = useState<boolean>(
    JSON.parse(localStorage.getItem('isSubscribed') || 'false')
  );

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isSubscribed', JSON.stringify(isSubscribed));
  }, [user, isSubscribed]);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.login(email, password);
      const userData = response.data.user;
      setUser(userData);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.msg || 'Login failed' };
    }
  };

  const register = async (data: { username: string; email: string; password: string; address: string; role: string }) => {
    try {
      const response = await api.register(data);
      const userData = response.data.user;
      setUser(userData);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.msg || 'Registration failed' };
    }
  };

  const logout = () => {
    setUser(null);
    setIsSubscribed(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isSubscribed');
    localStorage.removeItem('token'); // Clear token as in nomio-website
  };

  const toggleSubscription = () => {
    setIsSubscribed((prev) => !prev);
  };

  return { user, isSubscribed, login, register, logout, toggleSubscription };
};