import React, { useState, useEffect } from 'react';
import BootSequence from './BootSequence';
import Desktop from './desktop/Desktop';
import Taskbar from './taskbar/Taskbar';
import Window from './window/Window';
import Terminal from './windows/Terminal';
import AboutWindow from './windows/AboutWindow';
import ProjectsWindow from './windows/ProjectsWindow';
import SkillsWindow from './windows/SkillsWindow';
import ContactWindow from './windows/ContactWindow';
import './RetroDesktop.css';

const RetroDesktop = () => {
  const [booting, setBooting] = useState(true);
  const [windows, setWindows] = useState([]);
  const [nextZIndex, setNextZIndex] = useState(100);

  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setBooting(false);
    }, 4000);
    return () => clearTimeout(bootTimer);
  }, []);

  const openWindow = (type) => {
    const existingWindow = windows.find(w => w.type === type);
    if (existingWindow) {
      bringToFront(existingWindow.id);
      return;
    }

    const windowConfig = {
      about: { title: 'About.exe', width: 600, height: 400 },
      projects: { title: 'Projects', width: 700, height: 500 },
      skills: { title: 'Skills.txt - Notepad', width: 500, height: 400 },
      contact: { title: 'Contact.app', width: 500, height: 450 },
      terminal: { title: 'C:\\WINDOWS\\System32\\cmd.exe', width: 700, height: 450 }
    };

    const config = windowConfig[type];
    const newWindow = {
      id: Date.now(),
      type,
      title: config.title,
      x: 100 + windows.length * 30,
      y: 80 + windows.length * 30,
      width: config.width,
      height: config.height,
      minimized: false,
      zIndex: nextZIndex
    };

    setWindows([...windows, newWindow]);
    setNextZIndex(nextZIndex + 1);
  };

  const closeWindow = (id) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  const minimizeWindow = (id) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, minimized: true } : w
    ));
  };

  const restoreWindow = (id) => {
    const window = windows.find(w => w.id === id);
    if (window) {
      setWindows(windows.map(w => 
        w.id === id ? { ...w, minimized: false, zIndex: nextZIndex } : w
      ));
      setNextZIndex(nextZIndex + 1);
    }
  };

  const bringToFront = (id) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, zIndex: nextZIndex } : w
    ));
    setNextZIndex(nextZIndex + 1);
  };

  const updateWindowPosition = (id, x, y) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, x, y } : w
    ));
  };

  const renderWindowContent = (type) => {
    switch(type) {
      case 'about':
        return <AboutWindow />;
      case 'projects':
        return <ProjectsWindow />;
      case 'skills':
        return <SkillsWindow />;
      case 'contact':
        return <ContactWindow />;
      case 'terminal':
        return <Terminal onCommand={(cmd) => handleTerminalCommand(cmd)} />;
      default:
        return <div>Unknown window type</div>;
    }
  };

  const handleTerminalCommand = (command) => {
    const cmd = command.toLowerCase().trim();
    if (cmd === 'about') openWindow('about');
    else if (cmd === 'projects') openWindow('projects');
    else if (cmd === 'skills') openWindow('skills');
    else if (cmd === 'contact') openWindow('contact');
  };

  if (booting) {
    return <BootSequence />;
  }

  return (
    <div className="retro-desktop-container">
      <div className="crt-effect" />
      <div className="scanlines" />
      
      <Desktop onIconDoubleClick={openWindow} />
      
      {windows.map(window => (
        !window.minimized && (
          <Window
            key={window.id}
            id={window.id}
            title={window.title}
            x={window.x}
            y={window.y}
            width={window.width}
            height={window.height}
            zIndex={window.zIndex}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onFocus={() => bringToFront(window.id)}
            onMove={(x, y) => updateWindowPosition(window.id, x, y)}
          >
            {renderWindowContent(window.type)}
          </Window>
        )
      ))}
      
      <Taskbar 
        windows={windows} 
        onWindowClick={restoreWindow}
        onStartClick={() => openWindow('about')}
      />
    </div>
  );
};

export default RetroDesktop;