import React, { useState, useEffect, useRef } from 'react';
import DesktopIcon from './DesktopIcon';
import './Desktop.css';

const Desktop = ({ onIconDoubleClick, wallpapers, currentWallpaper, onWallpaperChange }) => {
  const icons = [
    { id: 'about',    label: 'About.exe',    icon: '👤', type: 'about' },
    { id: 'projects', label: 'Projects',     icon: '📁', type: 'projects' },
    { id: 'skills',   label: 'Skills.txt',   icon: '📄', type: 'skills' },
    { id: 'contact',  label: 'Contact.app',  icon: '📧', type: 'contact' },
    { id: 'terminal', label: 'Terminal',     icon: '💻', type: 'terminal' },
    { id: 'snake',    label: 'Snake.exe',    icon: '🐍', type: 'snake' },
    { id: 'notepad',  label: 'Notepad',      icon: '📝', type: 'notepad' },
  ];

  const [contextMenu, setContextMenu] = useState(null);
  const [wallpaperMenu, setWallpaperMenu] = useState(false);
  const menuRef = useRef(null);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
    setWallpaperMenu(false);
  };

  const handleMenuClick = (action) => {
    onIconDoubleClick(action);
    setContextMenu(null);
  };

  useEffect(() => {
    const close = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setContextMenu(null);
        setWallpaperMenu(false);
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
            style={{ top: `${20 + index * 90}px`, left: '20px' }}
          />
        ))}
      </div>

      {contextMenu && (
        <ul ref={menuRef} className="context-menu" style={{ top: contextMenu.y, left: contextMenu.x }}>
          <li className="context-menu-item" onClick={() => handleMenuClick('terminal')}>💻 Open Terminal</li>
          <li className="context-menu-item" onClick={() => handleMenuClick('notepad')}>📝 Notepad</li>
          <li className="context-menu-item" onClick={() => handleMenuClick('snake')}>🐍 Play Snake</li>
          <li className="context-menu-separator" />
          <li className="context-menu-item" onClick={() => handleMenuClick('about')}>👤 About Me</li>
          <li className="context-menu-item" onClick={() => handleMenuClick('projects')}>📁 Projects</li>
          <li className="context-menu-separator" />
          <li
            className="context-menu-item context-menu-item--arrow"
            onMouseEnter={() => setWallpaperMenu(true)}
            onMouseLeave={() => setWallpaperMenu(false)}
          >
            🖼 Wallpaper ▶
            {wallpaperMenu && (
              <ul className="context-submenu">
                {wallpapers.map((wp, i) => (
                  <li
                    key={i}
                    className={`context-menu-item ${currentWallpaper.label === wp.label ? 'active' : ''}`}
                    onClick={(e) => { e.stopPropagation(); onWallpaperChange(wp); setContextMenu(null); }}
                  >
                    {currentWallpaper.label === wp.label ? '✔ ' : '   '}{wp.label}
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      )}
    </div>
  );
};

export default Desktop;
