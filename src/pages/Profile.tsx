import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Popup from '../components/common/Popup';
import { useAuth } from '../hooks/useAuth';

const Profile: React.FC = () => {
  const { user, logout, toggleSubscription } = useAuth();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    address: user?.address || '',
  });
  const [showPopup, setShowPopup] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  if (!user) {
    return (
      <div className="profile">
        <p>Please log in to view your profile.</p>
        <Button onClick={() => navigate('/login')}>Go to Login</Button>
      </div>
    );
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Placeholder for update API call (not implemented in api.ts yet)
      // await api.updateUser(user.id, formData);
      setShowPopup({ type: 'success', message: 'Profile updated successfully!' });
      setEditMode(false);
    } catch (err) {
      setShowPopup({ type: 'error', message: 'Failed to update profile.' });
    }
  };

  return (
    <div className="profile">
      <h1 className="animate-slide-up">Your Profile</h1>
      <Card className="profile-card">
        {editMode ? (
          <form onSubmit={handleUpdate}>
            <label>
              Username:
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                aria-label="Username"
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                aria-label="Email"
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                aria-label="Address"
              />
            </label>
            <Button type="submit">Save</Button>
            <Button className="cancel-btn" onClick={() => setEditMode(false)}>Cancel</Button>
          </form>
        ) : (
          <div className="profile-details">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Subscribed:</strong> {user.isSubscribed ? 'Yes' : 'No'}</p>
            <Button onClick={() => setEditMode(true)}>Edit Profile</Button>
            <Button onClick={toggleSubscription}>
              {user.isSubscribed ? 'Unsubscribe' : 'Subscribe'}
            </Button>
            <Button className="logout-btn" onClick={() => { logout(); navigate('/'); }}>Logout</Button>
          </div>
        )}
      </Card>
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

export default Profile;