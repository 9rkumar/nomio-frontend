import { useState, useEffect } from 'react';
import { CartItem } from '../types';
import { api } from '../services/api';
import { useAuth } from './useAuth';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>(JSON.parse(localStorage.getItem('cart') || '[]'));
  const [cartCount, setCartCount] = useState<number>(0);
  const { user } = useAuth();

  useEffect(() => {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) {
        return prev.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });

    if (user) {
      try {
        await api.createOrder({
          userId: user.id,
          items: [...cart, item],
          total: cart.reduce((sum, i) => sum + i.price * i.quantity, 0) + item.price * item.quantity,
          address: user.address,
        });
      } catch (err) {
        console.error('Error syncing cart:', err);
      }
    }
  };

  const removeItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item, i) => (i === index ? { ...item, quantity: Math.max(1, quantity) } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return { cart, cartCount, addToCart, removeItem, updateQuantity, clearCart };
};