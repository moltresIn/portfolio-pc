import React, { useState } from 'react';
import './DesktopIcon.css';

const DesktopIcon = ({ label, icon, onDoubleClick, style }) => {
  const [clicks, setClicks] = useState(0);
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(true);
    setClicks(prev => prev + 1);
    
    setTimeout(() => {
      if (clicks === 0) {
        setTimeout(() => setClicks(0), 300);
      } else {
        onDoubleClick();
        setClicks(0);
        setSelected(false);
      }
    }, 250);
  };

  return (
    <div 
      className={`desktop-icon ${selected ? 'selected' : ''}`}
      onClick={handleClick}
      style={style}
    >
      <div className="icon-image">{icon}</div>
      <div className="icon-label">{label}</div>
    </div>
  );
};

export default DesktopIcon;