import React, { useState } from 'react';
import './ContactWindow.css';

// Replace with your Formspree form ID from https://formspree.io
const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID';

const ContactWindow = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
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

        {status === 'success' && (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <div className="success-text">Message sent! I'll get back to you soon.</div>
          </div>
        )}

        {status === 'error' && (
          <div className="error-message">
            ⚠ Something went wrong. Try emailing directly at akishor2001@gmail.com
          </div>
        )}

        {(status === 'idle' || status === 'sending' || status === 'error') && (
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
            <button type="submit" className="submit-button" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactWindow;
