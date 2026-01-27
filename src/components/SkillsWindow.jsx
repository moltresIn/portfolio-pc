import React from 'react';
import './SkillsWindow.css';

const SkillsWindow = () => {
  const skills = [
    {
      category: 'Frontend',
      items: [
        { name: 'React & React Native', level: 95 },
        { name: 'Hooks & Redux/Zustand', level: 90 },
        { name: 'Tailwind CSS', level: 90 },
        { name: 'UI/UX Optimization', level: 85 }
      ]
    },
    {
      category: 'Backend',
      items: [
        { name: 'Node.js & Express.js', level: 90 },
        { name: 'REST APIs', level: 90 },
        { name: 'Authentication', level: 85 }
      ]
    },
    {
      category: 'Database',
      items: [
        { name: 'MongoDB', level: 85 },
        { name: 'MySQL', level: 85 }
      ]
    },
    {
      category: 'Real-Time',
      items: [
        { name: 'WebSockets (Socket.io)', level: 85 },
        { name: 'Server-Sent Events', level: 80 }
      ]
    },
    {
      category: 'DevOps & Cloud',
      items: [
        { name: 'Docker & Kubernetes', level: 80 },
        { name: 'CI/CD & Nginx', level: 80 },
        { name: 'Cloud-Agnostic Deployments', level: 75 }
      ]
    },
    {
      category: 'Architecture',
      items: [
        { name: 'Modular/Micro-Frontends', level: 85 },
        { name: 'Serverless', level: 75 },
        { name: 'Clean Code Principles', level: 90 }
      ]
    }
  ];

  return (
    <div className="skills-window">
      <div className="notepad-header">
        <div className="notepad-menu">
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Help</span>
        </div>
      </div>

      <div className="skills-content">
        <div className="ascii-header">
          <pre>{`
 ____  _  ___ _     _     ____  
/ ___|| |/ (_) |   | |   / ___| 
\___ \| ' /| | |   | |   \___ \ 
 ___) | . \| | |___| |___ ___) |
|____/|_|\_\_|_____|_____|____/ 
          `}</pre>
        </div>

        {skills.map((skillGroup, idx) => (
          <div key={idx} className="skill-group">
            <h3 className="skill-category">{skillGroup.category}</h3>
            <div className="skill-divider">{'='.repeat(50)}</div>
            
            {skillGroup.items.map((skill, sidx) => (
              <div key={sidx} className="skill-item">
                <div className="skill-name">{skill.name}</div>
                <div className="skill-bar-container">
                  <div className="skill-bar" style={{ width: `${skill.level}%` }}>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

        <div className="skills-footer">
          <pre>{`
----------------------------------------------------
Last Updated: 2026 | Status: Continuously Learning
----------------------------------------------------
          `}</pre>
        </div>
      </div>
    </div>
  );
};

export default SkillsWindow;