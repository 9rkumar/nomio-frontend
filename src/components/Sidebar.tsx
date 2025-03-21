import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const links = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu' },
    { to: '/cart', label: 'Cart' },
    { to: '/orders', label: 'Orders' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <div className="sidebar" aria-label="Quick links">
      <h2>Quick Links</h2>
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? 'active' : '')}>
          {link.label}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;