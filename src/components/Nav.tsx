import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Placeholder for user state (will integrate with useAuth later)
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const navItems = user
    ? [
        { to: '/', label: 'Home' },
        { to: '/menu', label: 'Menu' },
        { to: '/cart', label: 'Cart' },
        ...(user.role === 'superadmin'
          ? [{ to: '/dashboard', label: 'Dashboard' }]
          : [{ to: '/orders', label: 'Orders' }]),
        { to: '/profile', label: 'Profile' },
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact' },
        { to: '/subscribe', label: 'Subscribe' },
        { to: '#', label: 'Logout', onClick: () => localStorage.removeItem('user') },
      ]
    : [
        { to: '/', label: 'Home' },
        { to: '/menu', label: 'Menu' },
        { to: '/cart', label: 'Cart' },
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