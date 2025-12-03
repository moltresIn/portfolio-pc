import React from 'react';
import './AboutWindow.css';

const AboutWindow = () => {
  return (
    <div className="about-window">
      <div className="about-header">
        <div className="about-avatar">👨‍💻</div>
        <div className="about-title">
          <h1>Alex Carter</h1>
          <h2>Full Stack Developer</h2>
        </div>
      </div>

      <div className="about-section">
        <h3>Bio</h3>
        <p>
          Passionate full-stack developer with expertise in building modern web applications.
          I specialize in creating seamless user experiences backed by robust server architecture.
          Always exploring new technologies and pushing the boundaries of what's possible on the web.
        </p>
      </div>

      <div className="about-section">
        <h3>Expertise</h3>
        <ul className="expertise-list">
          <li>Frontend: React, TypeScript, Modern CSS</li>
          <li>Backend: Node.js, Express, API Design</li>
          <li>Database: MongoDB, PostgreSQL, Redis</li>
          <li>Tools: Git, Docker, AWS, CI/CD</li>
        </ul>
      </div>

      <div className="about-section">
        <h3>Philosophy</h3>
        <p>
          I believe in writing clean, maintainable code and creating products that users love.
          Every line of code should serve a purpose, and every feature should solve a real problem.
        </p>
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