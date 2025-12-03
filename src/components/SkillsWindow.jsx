import React from 'react';
import './SkillsWindow.css';

const SkillsWindow = () => {
  const skills = [
    {
      category: 'Languages & Frameworks',
      items: [
        { name: 'JavaScript & TypeScript', level: 95 },
        { name: 'React & Node.js', level: 90 },
        { name: 'HTML & CSS', level: 95 }
      ]
    },
    {
      category: 'UI/UX Design',
      items: [
        { name: 'Responsive Design', level: 90 },
        { name: 'User Interface Design', level: 85 },
        { name: 'Prototyping', level: 80 }
      ]
    },
    {
      category: 'Tools & Technologies',
      items: [
        { name: 'Git & Version Control', level: 90 },
        { name: 'Docker & CI/CD', level: 75 },
        { name: 'AWS & Cloud Services', level: 70 }
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
Last Updated: 2025 | Status: Continuously Learning
----------------------------------------------------
          `}</pre>
        </div>
      </div>
    </div>
  );
};

export default SkillsWindow;