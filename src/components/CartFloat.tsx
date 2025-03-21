import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartFloat: React.FC = () => {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartCount = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);

  return (
    <div className="cart-float">
      <a
        href="/cart"
        className="cart-icon"
        aria-label="View Cart"
        onClick={(e) => {
          e.preventDefault();
          navigate('/cart');
        }}
      >
        <i className="fas fa-shopping-cart"></i>
        <span id="cart-count-float">{cartCount}</span>
      </a>
    </div>
  );
};

export default CartFloat;