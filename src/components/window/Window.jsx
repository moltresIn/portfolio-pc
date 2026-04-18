import React, { useState, useRef, useEffect } from 'react';
import './Window.css';

const Window = ({ id, title, children, x, y, width, height, zIndex, onClose, onMinimize, onFocus, onMove }) => {
  const [position, setPosition] = useState({ x, y });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  useEffect(() => {
    setPosition({ x, y });
  }, [x, y]);

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-button')) return;
    
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    onFocus();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const newX = Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - width));
    const newY = Math.max(0, Math.min(e.clientY - dragOffset.y, window.innerHeight - height - 48));
    
    setPosition({ x: newX, y: newY });
    onMove(newX, newY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  return (
    <div
      ref={windowRef}
      className="window"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${width}px`,
        height: `${height}px`,
        zIndex
      }}
      onMouseDown={() => onFocus()}
    >
      <div 
        className="window-titlebar"
        onMouseDown={handleMouseDown}
      >
        <span className="window-title">{title}</span>
        <div className="window-buttons">
          <button className="window-button minimize" onClick={onMinimize}>_</button>
          <button className="window-button maximize" disabled>□</button>
          <button className="window-button close" onClick={onClose}>×</button>
        </div>
      </div>
      <div className="window-content">
        {children}
      </div>
    </div>
  );
};

export default Window;