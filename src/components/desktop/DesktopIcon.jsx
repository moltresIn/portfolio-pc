import React, { useState, useEffect, useRef } from 'react';
import './DesktopIcon.css';

const DesktopIcon = ({ label, icon, onDoubleClick, style }) => {
  const [selected, setSelected] = useState(false);
  const containerRef = useRef(null);

  // Deselect when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setSelected(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`desktop-icon ${selected ? 'selected' : ''}`}
      onClick={() => setSelected(true)}
      onDoubleClick={() => {
        setSelected(false);
        onDoubleClick();
      }}
      style={style}
    >
      <div className="icon-image">{icon}</div>
      <div className="icon-label">{label}</div>
    </div>
  );
};

export default DesktopIcon;
