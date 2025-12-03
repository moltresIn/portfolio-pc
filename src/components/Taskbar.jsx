import React, { useState, useEffect } from 'react';
import './Taskbar.css';

const Taskbar = ({ windows, onWindowClick, onStartClick }) => {
  const [time, setTime] = useState(new Date());
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="taskbar">
      <div className="start-menu-container">
        <button 
          className="start-button"
          onClick={() => setStartMenuOpen(!startMenuOpen)}
        >
          <span className="start-logo">⊞</span>
          <span>Start</span>
        </button>
        
        {startMenuOpen && (
          <div className="start-menu">
            <div className="start-menu-header">
              <div className="start-menu-title">PORTFOLIO OS 98</div>
              <div className="start-menu-subtitle">Alex Carter</div>
            </div>
            <div className="start-menu-items">
              <div className="start-menu-item" onClick={() => { onStartClick(); setStartMenuOpen(false); }}>About Me</div>
              <div className="start-menu-separator"></div>
              <div className="start-menu-item" onClick={() => setStartMenuOpen(false)}>Close Menu</div>
            </div>
          </div>
        )}
      </div>

      <div className="taskbar-windows">
        {windows.map(window => (
          <button
            key={window.id}
            className={`taskbar-window ${window.minimized ? '' : 'active'}`}
            onClick={() => onWindowClick(window.id)}
          >
            {window.title}
          </button>
        ))}
      </div>

      <div className="system-tray">
        <div className="tray-icons">
          <span className="tray-icon" title="Volume">🔊</span>
          <span className="tray-icon" title="Network">📡</span>
        </div>
        <div className="clock">{formatTime(time)}</div>
      </div>
    </div>
  );
};

export default Taskbar;