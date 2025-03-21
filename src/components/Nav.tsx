import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

const Nav: React.FC = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = user
    ? [
        { to: '/', label: 'Home' },
        { to: '/menu', label: 'Menu' },
        { to: '/cart', label: `Cart (${cartCount})` },
        ...(user.role === 'superadmin'
          ? [{ to: '/dashboard', label: 'Dashboard' }]
          : [{ to: '/orders', label: 'Orders' }]),
        { to: '/profile', label: 'Profile' },
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact' },
        { to: '/subscribe', label: 'Subscribe' },
        { to: '#', label: 'Logout', onClick: () => { logout(); navigate('/'); } },
      ]
    : [
        { to: '/', label: 'Home' },
        { to: '/menu', label: 'Menu' },
        { to: '/cart', label: `Cart (${cartCount})` },
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact' },
        { to: '/subscribe', label: 'Subscribe' },
        { to: '/login', label: 'Login', className: 'highlight' },
      ];

  return (
    <nav className="top-nav" aria-label="Main navigation">
      <NavLink to="/" className="logo">Nomio</NavLink>
      <div
        className="nav-toggle"
        aria-label="Toggle menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </div>
      <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={item.className}
              onClick={item.onClick ? item.onClick : () => setIsOpen(false)}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;