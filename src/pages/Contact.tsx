import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Popup from '../components/common/Popup';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [showPopup, setShowPopup] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for contact form submission (not in nomio-website backend)
    setShowPopup({ type: 'success', message: 'Message sent successfully!' });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact">
      <h1 className="animate-slide-up">Contact Us</h1>
      <Card className="contact-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            aria-label="Name"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            aria-label="Email"
          />
          <textarea
            placeholder="Your Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            aria-label="Message"
          ></textarea>
          <Button type="submit">Send</Button>
        </form>
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>Email: support@nomio.com</p>
          <p>Phone: +91-9876543210</p>
          <p>Address: Delhi-NCR, India</p>
        </div>
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

export default Contact;