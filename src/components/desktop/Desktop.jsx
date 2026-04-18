import React, { useState, useEffect, useRef } from 'react';
import DesktopIcon from './DesktopIcon';
import './Desktop.css';

const MENU_ITEMS = [
  { label: '💻 Open Terminal', action: 'terminal' },
  { label: '👤 About Me', action: 'about' },
  { separator: true },
  { label: '📁 Projects', action: 'projects' },
  { label: '📄 Skills', action: 'skills' },
  { label: '📧 Contact', action: 'contact' },
];

const Desktop = ({ onIconDoubleClick }) => {
  const icons = [
    { id: 'about', label: 'About.exe', icon: '👤', type: 'about' },
    { id: 'projects', label: 'Projects', icon: '📁', type: 'projects' },
    { id: 'skills', label: 'Skills.txt', icon: '📄', type: 'skills' },
    { id: 'contact', label: 'Contact.app', icon: '📧', type: 'contact' },
    { id: 'terminal', label: 'Terminal', icon: '💻', type: 'terminal' }
  ];

  const [contextMenu, setContextMenu] = useState(null);
  const menuRef = useRef(null);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleMenuClick = (action) => {
    onIconDoubleClick(action);
    setContextMenu(null);
  };

  useEffect(() => {
    const close = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setContextMenu(null);
      }
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <div className="desktop" onContextMenu={handleContextMenu}>
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

      {contextMenu && (
        <ul
          ref={menuRef}
          className="context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          {MENU_ITEMS.map((item, i) =>
            item.separator
              ? <li key={i} className="context-menu-separator" />
              : <li key={i} className="context-menu-item" onClick={() => handleMenuClick(item.action)}>
                  {item.label}
                </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Desktop;
