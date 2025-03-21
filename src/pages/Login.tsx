import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Popup from '../components/common/Popup';
import { useAuth } from '../hooks/useAuth';

const Login: React.FC = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    address: '',
    role: 'nomi' as 'nomi' | 'nomia' | 'rasik' | 'rasika' | 'superadmin',
  });
  const [showPopup, setShowPopup] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password, username, address, role } = formData;

    if (isLogin) {
      const result = await login(email, password);
      if (result.success) {
        setShowPopup({ type: 'success', message: 'Logged in successfully!' });
        setTimeout(() => navigate('/'), 1500);
      } else {
        setShowPopup({ type: 'error', message: result.message });
      }
    } else {
      const result = await register({ email, password, username, address, role });
      if (result.success) {
        setShowPopup({ type: 'success', message: 'Registered successfully! Logging in...' });
        setTimeout(() => navigate('/'), 1500);
      } else {
        setShowPopup({ type: 'error', message: result.message });
      }
    }
  };

  return (
    <div className="login">
      <h1 className="animate-slide-up">{isLogin ? 'Login' : 'Register'}</h1>
      <Card className="auth-form">
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required={!isLogin}
                aria-label="Username"
              />
              <input
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required={!isLogin}
                aria-label="Address"
              />
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                aria-label="Role"
              >
                <option value="nomi">Nomi</option>
                <option value="nomia">Nomia</option>
                <option value="rasik">Rasik</option>
                <option value="rasika">Rasika</option>
                <option value="superadmin">Superadmin</option>
              </select>
            </>
          )}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            aria-label="Email"
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            aria-label="Password"
          />
          <Button type="submit">{isLogin ? 'Login' : 'Register'}</Button>
        </form>
        <Button className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need to Register?' : 'Already have an account?'}
        </Button>
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

export default Login;