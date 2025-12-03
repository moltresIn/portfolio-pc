import React, { useState } from 'react';
import './ProjectsWindow.css';

const ProjectsWindow = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      name: 'RetroTunes Player',
      icon: '🎵',
      description: 'A browser-based audio player styled like a 90s media console',
      tech: ['JavaScript', 'Web Audio API', 'CSS3'],
      features: [
        'Retro Winamp-inspired interface',
        'Playlist management',
        'Visualizer with multiple themes',
        'Keyboard shortcuts'
      ],
      status: 'Completed'
    },
    {
      id: 2,
      name: 'PixelBoard',
      icon: '🎨',
      description: 'A collaborative pixel-art drawing tool with real-time sockets',
      tech: ['React', 'Node.js', 'Socket.io', 'Canvas API'],
      features: [
        'Real-time collaborative drawing',
        'Multiple brush sizes and colors',
        'Export to PNG/GIF',
        'Room-based sessions'
      ],
      status: 'In Progress'
    }
  ];

  return (
    <div className="projects-window">
      <div className="projects-sidebar">
        <div className="sidebar-title">MY PROJECTS</div>
        {projects.map(project => (
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