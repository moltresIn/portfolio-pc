import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Window.css';

const TASKBAR_HEIGHT = 48;

const Window = ({ title, children, x, y, width, height, zIndex, onClose, onMinimize, onFocus, onMove }) => {
  const [position, setPosition] = useState({ x, y });
  const [maximized, setMaximized] = useState(false);
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const preMaximize = useRef({ x, y, width, height });

  useEffect(() => {
    if (!maximized) setPosition({ x, y });
  }, [x, y, maximized]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    const newX = Math.max(0, Math.min(e.clientX - dragOffset.current.x, window.innerWidth - width));
    const newY = Math.max(0, Math.min(e.clientY - dragOffset.current.y, window.innerHeight - height - TASKBAR_HEIGHT));
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
    if (maximized) return; // don't drag when maximized
    isDragging.current = true;
    dragOffset.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    onFocus();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMaximize = (e) => {
    e.stopPropagation();
    if (!maximized) {
      preMaximize.current = { x: position.x, y: position.y, width, height };
    }
    setMaximized(m => !m);
    onFocus();
  };

  const handleTitlebarDoubleClick = (e) => {
    if (e.target.closest('.window-button')) return;
    handleMaximize(e);
  };

  const style = maximized
    ? { left: 0, top: 0, width: '100vw', height: `calc(100vh - ${TASKBAR_HEIGHT}px)`, zIndex }
    : { left: `${position.x}px`, top: `${position.y}px`, width: `${width}px`, height: `${height}px`, zIndex };

  return (
    <div className={`window ${maximized ? 'maximized' : ''}`} style={style} onMouseDown={onFocus}>
      <div
        className="window-titlebar"
        onMouseDown={handleTitlebarMouseDown}
        onDoubleClick={handleTitlebarDoubleClick}
      >
        <span className="window-title">{title}</span>
        <div className="window-buttons">
          <button className="window-button minimize" onClick={(e) => { e.stopPropagation(); onMinimize(); }}>_</button>
          <button className="window-button maximize" onClick={handleMaximize}>{maximized ? '❐' : '□'}</button>
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
