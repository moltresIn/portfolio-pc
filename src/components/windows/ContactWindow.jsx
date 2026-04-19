import React, { useState } from 'react';
import './ContactWindow.css';

const ContactWindow = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const subject = encodeURIComponent(`Message from ${formData.name}`);
  const body = encodeURIComponent(
    `Name: ${formData.name}\n` +
    `Email: ${formData.email}\n\n` +
    `Message:\n${formData.message}`
  );

  window.location.href = `mailto:akishor2001@gmail.com?subject=${subject}&body=${body}`;
};

  const contactInfo = [
    { icon: '📧', label: 'Email', value: 'akishor2001@gmail.com', href: 'mailto:akishor2001@gmail.com' },
    { icon: '👨‍💻', label: 'GitHub', value: 'github.com/moltresIn', href: 'https://github.com/moltresIn' },
    { icon: '🔗', label: 'LinkedIn', value: 'linkedin.com/in/kishor-arjunan', href: 'https://linkedin.com/in/kishor-arjunan' },
  ];

  return (
    <div className="contact-window">
      <div className="contact-info-section">
        <h3>Contact Information</h3>
        <div className="contact-info-list">
          {contactInfo.map((info, idx) => (
            <a key={idx} className="contact-info-item" href={info.href} target="_blank" rel="noopener noreferrer">
              <span className="contact-icon">{info.icon}</span>
              <div className="contact-details">
                <div className="contact-label">{info.label}</div>
                <div className="contact-value">{info.value}</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="contact-form-section">
        <h3>Send a Message</h3>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-input" />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-input" />
            </div>
            <div className="form-group">
              <label>Message:</label>
              <textarea name="message" value={formData.message} onChange={handleChange} required rows="4" className="form-textarea" />
            </div>
            <button type="submit" className="submit-button">
            </button>
          </form>
      </div>
    </div>
  );
};

export default ContactWindow;
