import React, { useState } from 'react';
import './ContactWindow.css';

const ContactWindow = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    { icon: '📧', label: 'Email', value: 'alex.carter.dev@example.com' },
    { icon: '👨‍💻', label: 'GitHub', value: 'github.com/alexcarter-dev' }
  ];

  return (
    <div className="contact-window">
      <div className="contact-info-section">
        <h3>Contact Information</h3>
        <div className="contact-info-list">
          {contactInfo.map((info, idx) => (
            <div key={idx} className="contact-info-item">
              <span className="contact-icon">{info.icon}</span>
              <div className="contact-details">
                <div className="contact-label">{info.label}</div>
                <div className="contact-value">{info.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="contact-form-section">
        <h3>Send a Message</h3>
        {submitted ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <div className="success-text">
              Message sent successfully!
              <br />
              <small>(This is a demo - no actual message was sent)</small>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Message:</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="form-textarea"
              />
            </div>

            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactWindow;