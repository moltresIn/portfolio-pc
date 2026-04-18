import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Window.css';

const Window = ({ id, title, children, x, y, width, height, zIndex, onClose, onMinimize, onFocus, onMove }) => {
  const [position, setPosition] = useState({ x, y });
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setPosition({ x, y });
  }, [x, y]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    const newX = Math.max(0, Math.min(e.clientX - dragOffset.current.x, window.innerWidth - width));
    const newY = Math.max(0, Math.min(e.clientY - dragOffset.current.y, window.innerHeight - height - 48));
    setPosition({ x: newX, y: newY });
    onMove(newX, newY);
  }, [width, height, onMove]);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  const handleTitlebarMouseDown = (e) => {
    if (e.target.closest('.window-button')) return;
    isDragging.current = true;
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
    onFocus();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      className="window"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${width}px`,
        height: `${height}px`,
        zIndex
      }}
      onMouseDown={onFocus}
    >
      <div
        className="window-titlebar"
        onMouseDown={handleTitlebarMouseDown}
      >
        <span className="window-title">{title}</span>
        <div className="window-buttons">
          <button className="window-button minimize" onClick={(e) => { e.stopPropagation(); onMinimize(); }}>_</button>
          <button className="window-button maximize" disabled>□</button>
          <button className="window-button close" onClick={(e) => { e.stopPropagation(); onClose(); }}>×</button>
        </div>
      </div>
      <div className="window-content">
        {children}
      </div>
    </div>
  );
};

export default Window;
