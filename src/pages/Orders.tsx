import React from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../hooks/useOrders';
import { useAuth } from '../hooks/useAuth';

const Orders: React.FC = () => {
  const { user } = useAuth();
  const { orderHistory, refetchOrders } = useOrders();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="orders">
        <p>Please log in to view your orders.</p>
        <Button onClick={() => navigate('/login')}>Go to Login</Button>
      </div>
    );
  }

  return (
    <div className="orders">
      <h1 className="animate-slide-up">Your Orders ({orderHistory.length})</h1>
      {orderHistory.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="orders-container">
          {orderHistory.map((order) => (
            <Card key={order.orderId} className="order-item">
              <h2>Order #{order.orderId}</h2>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total:</strong> ₹{order.total}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <div className="order-items">
                <h3>Items:</h3>
                {order.items.map((item, index) => (
                  <p key={index}>{item.name} - ₹{item.price} x {item.quantity}</p>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
      <Button onClick={() => refetchOrders()}>Refresh Orders</Button>
    </div>
  );
};

export default Orders;