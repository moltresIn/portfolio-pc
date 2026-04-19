import React from 'react';
import './AboutWindow.css';

const AboutWindow = () => {
  return (
    <div className="about-window">
      <div className="about-header">
        <div className="about-avatar">👨‍💻</div>
        <div className="about-title">
          <h1>Kishor Arjunan</h1>
          <h2>Senior Software Engineer</h2>
        </div>
      </div>

      <div className="about-section">
        <h3>Bio</h3>
        <p>
          Senior Software Engineer based in Erode, Tamil Nadu, India. Currently leading technical 
          operations at Aracreate India, with hands-on responsibility for software architecture, 
          system design, and end-to-end development workflows. Specialises in building scalable, 
          high-performance applications with a strong focus on clean architecture and modern 
          development practices.
        </p>
      </div>

      <div className="about-section">
        <h3>Contact</h3>
        <ul className="expertise-list">
          <li>💻 <a href="https://github.com/moltresIn" target="_blank" rel="noopener noreferrer">github.com/moltresIn</a></li>
          <li>📧 <a href="mailto:kishor@aracreate.group">kishor@aracreate.group</a></li>
          <li>🔗 <a href="https://linkedin.com/in/kishor-arjunan" target="_blank" rel="noopener noreferrer">linkedin.com/in/kishor-arjunan</a></li>
        </ul>
      </div>

      <div className="about-section">
        <h3>Core Skills</h3>
        <ul className="expertise-list">
          <li>Frontend: React, React Native, Hooks, Redux/Zustand, Tailwind, UI/UX optimization</li>
          <li>Backend: Node.js, Express.js, REST APIs, Authentication</li>
          <li>Database: MongoDB, MySQL</li>
          <li>Real-Time: WebSockets (Socket.io), Server-Sent Events</li>
          <li>DevOps & Cloud: Docker, Kubernetes, CI/CD, Nginx, cloud-agnostic deployments</li>
          <li>Architecture: Modular/Micro-Frontends, Serverless, Clean Code principles</li>
        </ul>
      </div>

      <div className="about-section">
        <h3>Key Experience & Achievements</h3>
        <ul className="expertise-list">
          <li>Built an AI-driven real-time people detection system with a React frontend and optimized backend, delivering live analytics</li>
          <li>Developed a social media platform (React Native, Node.js, MySQL) supporting 5,000+ users, improving API response times by ~40%</li>
          <li>Implemented micro-frontend architecture to improve scalability and independent feature development</li>
          <li>Designed real-time messaging and secure authentication systems for production environments</li>
        </ul>
      </div>

      <div className="about-footer">
        <div className="status-bar">
          <span>Status: Available for opportunities</span>
          <span>Version 2.1</span>
        </div>
      </div>
    </div>
  );
};

export default AboutWindow;