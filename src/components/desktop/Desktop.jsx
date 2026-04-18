import React from 'react';
import DesktopIcon from './DesktopIcon';
import './Desktop.css';

const Desktop = ({ onIconDoubleClick }) => {
  const icons = [
    { id: 'about', label: 'About.exe', icon: '👤', type: 'about' },
    { id: 'projects', label: 'Projects', icon: '📁', type: 'projects' },
    { id: 'skills', label: 'Skills.txt', icon: '📄', type: 'skills' },
    { id: 'contact', label: 'Contact.app', icon: '📧', type: 'contact' },
    { id: 'terminal', label: 'Terminal', icon: '💻', type: 'terminal' }
  ];

  return (
    <div className="desktop">
      <div className="desktop-icons">
        {icons.map((icon, index) => (
          <DesktopIcon
            key={icon.id}
            label={icon.label}
            icon={icon.icon}
            onDoubleClick={() => onIconDoubleClick(icon.type)}
            style={{ top: `${20 + index * 100}px`, left: '20px' }}
          />
        ))}
      </div>
    </div>
  );
};

export default Desktop;