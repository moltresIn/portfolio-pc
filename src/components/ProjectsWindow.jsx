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
      <div className="projects-header">
        <h2>My Projects</h2>
      </div>
      
      <div className="projects-list">
        {projects.map((project) => (
          <div 
            key={project.id}
            className="project-card"
            onClick={() => setSelectedProject(project)}
          >
            <div className="project-icon">{project.icon}</div>
            <div className="project-info">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <span className={`status ${project.status.toLowerCase().replace(' ', '-')}`}>
                {project.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="project-details">
          <h3>{selectedProject.name}</h3>
          <p>{selectedProject.description}</p>
          <strong>Tech Stack:</strong>
          <div className="tech-stack">
            {selectedProject.tech.map((t, idx) => (
              <span key={idx} className="tech-badge">{t}</span>
            ))}
          </div>
          <strong>Features:</strong>
          <ul>
            {selectedProject.features.map((f, idx) => (
              <li key={idx}>{f}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProjectsWindow;