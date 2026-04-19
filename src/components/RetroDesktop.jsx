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
import SnakeGame from './windows/SnakeGame';
import Notepad from './windows/Notepad';
import ErrorBoundary from './ErrorBoundary';
import './RetroDesktop.css';

const WALLPAPERS = [
  { label: 'Default',  value: '/assets/bg.jpg' },
  { label: 'Navy',     value: null, color: '#001433' },
  { label: 'Midnight', value: null, color: '#0a0a1a' },
  { label: 'Teal',     value: null, color: '#002233' },
];

const WINDOW_CONFIG = {
  about:    { title: 'About.exe',                      width: 600, height: 420 },
  projects: { title: 'Projects',                       width: 700, height: 500 },
  skills:   { title: 'Skills.txt - Notepad',           width: 500, height: 420 },
  contact:  { title: 'Contact.app',                    width: 500, height: 460 },
  terminal: { title: 'C:\\WINDOWS\\System32\\cmd.exe', width: 700, height: 450 },
  snake:    { title: 'Snake.exe',                      width: 480, height: 420 },
  notepad:  { title: 'Notepad.exe',                    width: 520, height: 400 },
};

const RetroDesktop = () => {
  const [booting, setBooting] = useState(true);
  const [windows, setWindows] = useState([]);
  const [nextZIndex, setNextZIndex] = useState(100);
  const [wallpaper, setWallpaper] = useState(WALLPAPERS[0]);

  useEffect(() => {
    // Boot duration is driven by BootSequence via onComplete
  }, []);

  const openWindow = (type) => {
    const existing = windows.find(w => w.type === type);
    if (existing) { bringToFront(existing.id); return; }
    const cfg = WINDOW_CONFIG[type];
    if (!cfg) return;
    setWindows(prev => [...prev, {
      id: Date.now(), type,
      title: cfg.title,
      x: 100 + prev.length * 30,
      y: 80  + prev.length * 30,
      width: cfg.width, height: cfg.height,
      minimized: false, zIndex: nextZIndex,
    }]);
    setNextZIndex(z => z + 1);
  };

  const closeWindow    = (id) => setWindows(w => w.filter(x => x.id !== id));
  const minimizeWindow = (id) => setWindows(w => w.map(x => x.id === id ? { ...x, minimized: true } : x));

  const restoreWindow = (id) => {
    setWindows(w => w.map(x => x.id === id ? { ...x, minimized: false, zIndex: nextZIndex } : x));
    setNextZIndex(z => z + 1);
  };

  const bringToFront = (id) => {
    setWindows(w => w.map(x => x.id === id ? { ...x, zIndex: nextZIndex } : x));
    setNextZIndex(z => z + 1);
  };

  const updateWindowPosition = (id, x, y) =>
    setWindows(w => w.map(x2 => x2.id === id ? { ...x2, x, y } : x2));

  const handleTerminalCommand = (cmd) => {
    const c = cmd.toLowerCase().trim();
    if (WINDOW_CONFIG[c]) openWindow(c);
  };

  const renderContent = (type) => {
    switch (type) {
      case 'about':    return <AboutWindow />;
      case 'projects': return <ProjectsWindow />;
      case 'skills':   return <SkillsWindow />;
      case 'contact':  return <ContactWindow />;
      case 'terminal': return <Terminal onCommand={handleTerminalCommand} />;
      case 'snake':    return <SnakeGame />;
      case 'notepad':  return <Notepad />;
      default:         return null;
    }
  };

  const bgStyle = wallpaper.value
    ? { backgroundImage: `url(${wallpaper.value})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: wallpaper.color };

  if (booting) return <BootSequence onComplete={() => setBooting(false)} />;

  return (
    <div className="retro-desktop-container" style={bgStyle}>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="grain-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
          <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" />
        </filter>
      </svg>
      <div className="crt-effect" />
      <div className="scanlines" />
      <div className="grain" />

      <Desktop
        onIconDoubleClick={openWindow}
        wallpapers={WALLPAPERS}
        currentWallpaper={wallpaper}
        onWallpaperChange={setWallpaper}
      />

      {windows.map(win => !win.minimized && (
        <Window
          key={win.id}
          id={win.id}
          title={win.title}
          x={win.x} y={win.y}
          width={win.width} height={win.height}
          zIndex={win.zIndex}
          onClose={() => closeWindow(win.id)}
          onMinimize={() => minimizeWindow(win.id)}
          onFocus={() => bringToFront(win.id)}
          onMove={(x, y) => updateWindowPosition(win.id, x, y)}
        >
          <ErrorBoundary>
            {renderContent(win.type)}
          </ErrorBoundary>
        </Window>
      ))}

      <Taskbar
        windows={windows}
        onWindowClick={restoreWindow}
        onStartClick={() => openWindow('about')}
        onOpenApp={openWindow}
      />
    </div>
  );
};

export default RetroDesktop;
