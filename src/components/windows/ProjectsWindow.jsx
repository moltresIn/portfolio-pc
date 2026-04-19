import React, { useState } from 'react';
import './ProjectsWindow.css';

const PROJECTS = [
  {
    id: 1,
    name: 'AI People Detection System',
    icon: '🤖',
    description: 'An AI-driven real-time people detection system with live analytics dashboard',
    tech: ['React', 'Node.js', 'Python', 'TensorFlow', 'WebSockets', 'Computer Vision'],
    features: [
      'Real-time video processing and detection',
      'Live analytics dashboard with React frontend',
      'Optimized backend for high-performance inference',
      'WebSocket integration for instant updates',
      'Scalable architecture for multiple camera feeds'
    ],
    status: 'Completed',
    github: 'https://github.com/moltresIn',
    live: null,
  },
  {
    id: 2,
    name: 'Social Media Platform',
    icon: '📱',
    description: 'A full-featured social media platform supporting 5,000+ active users',
    tech: ['React Native', 'Node.js', 'Express.js', 'MySQL', 'Redis', 'JWT'],
    features: [
      'Cross-platform mobile app (iOS & Android)',
      'API response time improved by ~40%',
      'Secure authentication and authorization',
      'Real-time notifications and updates',
      'Scalable database architecture',
      'Image upload and processing pipeline'
    ],
    status: 'Completed',
    github: 'https://github.com/moltresIn',
    live: null,
  },
  {
    id: 3,
    name: 'Micro-Frontend Architecture',
    icon: '🏗️',
    description: 'Implemented modular frontend architecture for improved scalability',
    tech: ['React', 'Module Federation', 'Webpack', 'Docker', 'Kubernetes', 'CI/CD'],
    features: [
      'Independent feature development and deployment',
      'Shared component library across micro-apps',
      'Improved build times and team productivity',
      'Isolated testing environments',
      'Zero-downtime deployments'
    ],
    status: 'Completed',
    github: 'https://github.com/moltresIn',
    live: null,
  },
  {
    id: 4,
    name: 'Real-Time Messaging System',
    icon: '💬',
    description: 'Secure real-time messaging platform with end-to-end encryption',
    tech: ['Node.js', 'Socket.io', 'MongoDB', 'Redis', 'JWT', 'Encryption'],
    features: [
      'Real-time bidirectional communication',
      'Message encryption and secure authentication',
      'Typing indicators and read receipts',
      'File sharing capabilities',
      'Scalable message queue system',
      'Production-ready deployment'
    ],
    status: 'Completed',
    github: 'https://github.com/moltresIn',
    live: null,
  }
];

const ProjectsWindow = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="projects-window">
      <div className="projects-sidebar">
        <div className="sidebar-title">MY PROJECTS</div>
        {PROJECTS.map(project => (
          <div
            key={project.id}
            className={`project-item ${selectedProject?.id === project.id ? 'selected' : ''}`}
            onClick={() => setSelectedProject(project)}
          >
            <span className="project-icon">{project.icon}</span>
            <span className="project-name">{project.name}</span>
          </div>
        ))}
      </div>

      <div className="projects-content">
        {selectedProject ? (
          <div className="project-details">
            <div className="project-header">
              <span className="project-icon-large">{selectedProject.icon}</span>
              <div>
                <h2>{selectedProject.name}</h2>
                <span className={`status-badge ${selectedProject.status.toLowerCase().replace(' ', '-')}`}>
                  {selectedProject.status}
                </span>
              </div>
            </div>

            <div className="project-section">
              <h3>Description</h3>
              <p>{selectedProject.description}</p>
            </div>

            <div className="project-section">
              <h3>Technologies</h3>
              <div className="tech-tags">
                {selectedProject.tech.map((tech, idx) => (
                  <span key={idx} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>

            <div className="project-section">
              <h3>Key Features</h3>
              <ul className="features-list">
                {selectedProject.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="project-links">
              {selectedProject.github && (
                <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="project-link github-link">
                  👨‍💻 View on GitHub
                </a>
              )}
              {selectedProject.live && (
                <a href={selectedProject.live} target="_blank" rel="noopener noreferrer" className="project-link live-link">
                  🌐 Live Demo
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className="project-placeholder">
            <div className="placeholder-icon">📁</div>
            <p>Select a project from the list to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsWindow;