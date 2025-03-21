import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const CartFloat: React.FC = () => {
  const { cartCount } = useCart();
  const navigate = useNavigate();

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