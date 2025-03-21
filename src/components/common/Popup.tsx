import React from 'react';
import Button from './Button';

interface PopupProps {
  title: string;
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ title, message, type, onClose }) => {
  return (
    <div className="popup-overlay active">
      <div className={`popup ${type}`}>
        <div className="popup-header">{title}</div>
        <div className="popup-message">{message}</div>
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};

export default Popup;