import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Popup from '../components/common/Popup';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';

const Cart: React.FC = () => {
  const { cart, cartCount, removeItem, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const [showPopup, setShowPopup] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!user) {
      setShowPopup({ type: 'error', message: 'Please log in to place an order.' });
      return;
    }

    try {
      await api.createOrder({
        userId: user.id,
        items: cart,
        total,
        address: user.address,
      });
      clearCart();
      setShowPopup({ type: 'success', message: 'Order placed successfully!' });
    } catch (err) {
      setShowPopup({ type: 'error', message: 'Failed to place order. Try again.' });
    }
  };

  return (
    <div className="cart">
      <h1 className="animate-slide-up">Your Cart ({cartCount})</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cart.map((item, index) => (
              <Card key={index} className="cart-item">
                <h3>{item.name}</h3>
                <p>₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}</p>
                <div className="quantity-controls">
                  <Button onClick={() => updateQuantity(index, item.quantity - 1)}>-</Button>
                  <span>{item.quantity}</span>
                  <Button onClick={() => updateQuantity(index, item.quantity + 1)}>+</Button>
                </div>
                <Button className="remove-btn" onClick={() => removeItem(index)}>Remove</Button>
              </Card>
            ))}
          </div>
          <Card className="cart-summary">
            <h2>Summary</h2>
            <p>Total Items: {cartCount}</p>
            <p>Total Amount: ₹{total}</p>
            <textarea placeholder="Delivery Address" defaultValue={user?.address || ''} readOnly={!!user}></textarea>
            <Button onClick={handleCheckout}>Checkout</Button>
          </Card>
        </div>
      )}
      <section className="tips animate-slide-up">
        <h2>Tips</h2>
        <p>Check your order details before checkout!</p>
      </section>
      {showPopup && (
        <Popup
          title={showPopup.type === 'success' ? 'Success' : 'Error'}
          message={showPopup.message}
          type={showPopup.type}
          onClose={() => setShowPopup(null)}
        />
      )}
    </div>
  );
};

export default Cart;