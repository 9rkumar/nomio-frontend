import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Popup from '../components/common/Popup';
import { useAuth } from '../hooks/useAuth';
import { useOrders } from '../hooks/useOrders';
import { api } from '../services/api';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { orderHistory, refetchOrders } = useOrders();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  if (!user || user.role !== 'superadmin') {
    return (
      <div className="dashboard">
        <p>Access denied. Superadmin privileges required.</p>
        <Button onClick={() => navigate('/')}>Go to Home</Button>
      </div>
    );
  }

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      await api.updateOrderStatus(orderId, newStatus);
      refetchOrders();
      setShowPopup({ type: 'success', message: `Order #${orderId} status updated to ${newStatus}!` });
    } catch (err) {
      setShowPopup({ type: 'error', message: 'Failed to update order status.' });
    }
  };

  return (
    <div className="dashboard">
      <h1 className="animate-slide-up">Admin Dashboard</h1>
      <Card className="dashboard-summary">
        <h2>Summary</h2>
        <p>Total Orders: {orderHistory.length}</p>
        <p>Pending Orders: {orderHistory.filter((o) => o.status === 'Pending').length}</p>
        <p>Delivered Orders: {orderHistory.filter((o) => o.status === 'Delivered').length}</p>
      </Card>
      <h2 className="animate-slide-up">All Orders</h2>
      {orderHistory.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="orders-container">
          {orderHistory.map((order) => (
            <Card key={order.orderId} className="order-item">
              <h3>Order #{order.orderId}</h3>
              <p><strong>User:</strong> {order.userId}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total:</strong> ₹{order.total}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <div className="order-items">
                <h4>Items:</h4>
                {order.items.map((item, index) => (
                  <p key={index}>{item.name} - ₹{item.price} x {item.quantity}</p>
                ))}
              </div>
              <div className="status-controls">
                <Button
                  onClick={() => handleUpdateStatus(order.orderId, 'Pending')}
                  disabled={order.status === 'Pending'}
                >
                  Set Pending
                </Button>
                <Button
                  onClick={() => handleUpdateStatus(order.orderId, 'Delivered')}
                  disabled={order.status === 'Delivered'}
                >
                  Set Delivered
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
      <Button onClick={() => refetchOrders()}>Refresh Orders</Button>
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

export default Dashboard;