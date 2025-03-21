import React from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';

const Subscribe: React.FC = () => {
  const { user, toggleSubscription } = useAuth();

  return (
    <div className="subscribe">
      <h1 className="animate-slide-up">Subscribe to Nomio</h1>
      <Card className="subscribe-content">
        <h2>Why Subscribe?</h2>
        <p>Get exclusive discounts, early access to new items, and priority delivery with a Nomio subscription!</p>
        <ul>
          <li>20% off every order</li>
          <li>Free delivery on orders above ₹200</li>
          <li>Weekly special offers</li>
        </ul>
        {user ? (
          <Button onClick={toggleSubscription}>
            {user.isSubscribed ? 'Unsubscribe' : 'Subscribe Now'}
          </Button>
        ) : (
          <p>Please <a href="/login">log in</a> to subscribe.</p>
        )}
      </Card>
    </div>
  );
};

export default Subscribe;