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
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  const contactInfo = [
    { icon: '📧', label: 'Email', value: 'akishor2001@gmail.com' },
    { icon: '👨‍💻', label: 'GitHub', value: 'github.com/moltresIn' }
  ];

  return (
    <div className="contact-window">
      <div className="contact-header">
        <h2>Get In Touch</h2>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          {contactInfo.map((info, idx) => (
            <div key={idx} className="info-item">
              <span className="info-icon">{info.icon}</span>
              <div>
                <strong>{info.label}</strong>
                <p>{info.value}</p>
              </div>
            </div>
          ))}
        </div>

        {submitted && <div className="success-message">✓ Message sent successfully!</div>}

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
            />
          </div>
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactWindow;