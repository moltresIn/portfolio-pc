import React, { useState, useEffect, useRef } from 'react';
import './Taskbar.css';

// ─── Web Audio helpers ────────────────────────────────────────────────────────
const audioCtx = () => new (window.AudioContext || window.webkitAudioContext)();

const playTone = (freq1, freq2, duration, gainLevel) => {
  try {
    const ctx = audioCtx();
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq1, ctx.currentTime);
    if (freq2 !== freq1) osc.frequency.linearRampToValueAtTime(freq2, ctx.currentTime + duration * 0.7);
    gain.gain.setValueAtTime(gainLevel, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
    osc.onended = () => ctx.close();
  } catch (_) {}
};

const playVolumeSound = (volume, prevVolume) => {
  if (volume === 0)            playTone(180, 180, 0.08, 0.15);
  else if (volume > prevVolume) playTone(520, 780, 0.18, volume * 0.003);
  else                          playTone(780, 420, 0.18, volume * 0.003);
};

const playNetworkSound = () => playTone(880, 1100, 0.12, 0.08);

const VOLUME_ICONS = ['🔇', '🔈', '🔉', '🔊'];
const getVolumeIcon = (v) => v === 0 ? VOLUME_ICONS[0] : v < 34 ? VOLUME_ICONS[1] : v < 67 ? VOLUME_ICONS[2] : VOLUME_ICONS[3];

const DAYS   = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const buildCalendar = (year, month) => {
  const first = new Date(year, month, 1).getDay();
  const days  = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  return cells;
};

const Taskbar = ({ windows, onWindowClick, onStartClick, onOpenApp }) => {
  const [time, setTime]               = useState(new Date());
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [volume, setVolume]           = useState(80);
  const [showVolume, setShowVolume]   = useState(false);
  const [showNetwork, setShowNetwork] = useState(false);
  const [showClock, setShowClock]     = useState(false);
  const [calDate, setCalDate]         = useState({ year: new Date().getFullYear(), month: new Date().getMonth() });

  const prevVolumeRef = useRef(80);
  const volumeRef     = useRef(null);
  const networkRef    = useRef(null);
  const clockRef      = useRef(null);
  const startRef      = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (volumeRef.current  && !volumeRef.current.contains(e.target))  setShowVolume(false);
      if (networkRef.current && !networkRef.current.contains(e.target)) setShowNetwork(false);
      if (clockRef.current   && !clockRef.current.contains(e.target))   setShowClock(false);
      if (startRef.current   && !startRef.current.contains(e.target))   setStartMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleVolumeChange = (val) => {
    const prev = prevVolumeRef.current;
    prevVolumeRef.current = val;
    setVolume(val);
    playVolumeSound(val, prev);
  };

  const handleScroll = (e) => {
    e.preventDefault();
    const next = Math.min(100, Math.max(0, volume + (e.deltaY < 0 ? 5 : -5)));
    if (next !== volume) handleVolumeChange(next);
  };

  const handleMuteToggle = () => {
    if (volume > 0) { prevVolumeRef.current = volume; handleVolumeChange(0); }
    else handleVolumeChange(prevVolumeRef.current || 80);
  };

  // ── Network ──
  const handleNetworkClick = () => {
    playNetworkSound();
    setShowNetwork(v => !v);
  };

  // ── Calendar nav ──
  const prevMonth = () => setCalDate(({ year, month }) =>
    month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 });
  const nextMonth = () => setCalDate(({ year, month }) =>
    month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 });

  const formatTime = (d) => d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const formatDate = (d) => d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const today    = new Date();
  const cells    = buildCalendar(calDate.year, calDate.month);
  const isToday  = (d) => d === today.getDate() && calDate.month === today.getMonth() && calDate.year === today.getFullYear();

  return (
    <div className="taskbar">
      {/* ── Start ── */}
      <div className="start-menu-container" ref={startRef}>
        <button className="start-button" onClick={() => setStartMenuOpen(s => !s)}>
          <span className="start-logo">⊞</span>
          <span>Start</span>
        </button>

        {startMenuOpen && (
          <div className="start-menu">
            <div className="start-menu-header">
              <div className="start-menu-title">PORTFOLIO OS 98</div>
              <div className="start-menu-subtitle">Kishor Arjunan</div>
            </div>
            <div className="start-menu-items">
              <div className="start-menu-item" onClick={() => { onStartClick(); setStartMenuOpen(false); }}>👤 About Me</div>
              <div className="start-menu-item" onClick={() => { onOpenApp('projects'); setStartMenuOpen(false); }}>📁 Projects</div>
              <div className="start-menu-item" onClick={() => { onOpenApp('skills'); setStartMenuOpen(false); }}>📄 Skills</div>
              <div className="start-menu-item" onClick={() => { onOpenApp('contact'); setStartMenuOpen(false); }}>📧 Contact</div>
              <div className="start-menu-separator" />
              <div className="start-menu-item" onClick={() => { onOpenApp('terminal'); setStartMenuOpen(false); }}>💻 Terminal</div>
              <div className="start-menu-item" onClick={() => { onOpenApp('notepad'); setStartMenuOpen(false); }}>📝 Notepad</div>
              <div className="start-menu-item" onClick={() => { onOpenApp('snake'); setStartMenuOpen(false); }}>🐍 Snake</div>
              <div className="start-menu-separator" />
              <div className="start-menu-item" onClick={() => setStartMenuOpen(false)}>✖ Close Menu</div>
            </div>
          </div>
        )}
      </div>

      {/* ── Open windows ── */}
      <div className="taskbar-windows">
        {windows.map(win => (
          <button
            key={win.id}
            className={`taskbar-window ${win.minimized ? '' : 'active'}`}
            onClick={() => onWindowClick(win.id)}
          >
            {win.title}
          </button>
        ))}
      </div>

      {/* ── System tray ── */}
      <div className="system-tray">
        <div className="tray-icons">

          {/* Volume */}
          <div className="volume-container" ref={volumeRef} onWheel={handleScroll}>
            <span className="tray-icon" title={`Volume: ${volume}%`} onClick={() => setShowVolume(v => !v)}>
              {getVolumeIcon(volume)}
            </span>
            {showVolume && (
              <div className="volume-popup">
                <div className="volume-label">{volume}%</div>
                <div className="volume-slider-wrap">
                  <input
                    type="range" min="0" max="100" value={volume}
                    onChange={(e) => handleVolumeChange(Number(e.target.value))}
                    className="volume-slider"
                    orient="vertical"
                  />
                </div>
                <button className="volume-mute-btn" onClick={handleMuteToggle}>
                  {volume === 0 ? '🔊 Unmute' : '🔇 Mute'}
                </button>
              </div>
            )}
          </div>

          {/* Network */}
          <div className="tray-popup-container" ref={networkRef}>
            <span className="tray-icon" title="Network" onClick={handleNetworkClick}>📡</span>
            {showNetwork && (
              <div className="tray-popup network-popup">
                <div className="tray-popup-title">Network Status</div>
                <div className="network-row">
                  <span className="network-dot connected" />
                  <span>Internet</span>
                  <span className="network-status">Connected</span>
                </div>
                <div className="network-row">
                  <span className="network-dot connected" />
                  <span>Wi-Fi</span>
                  <span className="network-status">akishor.com</span>
                </div>
                <div className="network-row">
                  <span className="network-dot" />
                  <span>VPN</span>
                  <span className="network-status off">Off</span>
                </div>
                <div className="network-ping">
                  Ping: {Math.floor(Math.random() * 20) + 4}ms
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Clock → Calendar */}
        <div className="clock-container" ref={clockRef}>
          <div className="clock" onClick={() => setShowClock(v => !v)} title="Click for calendar">
            <div>{formatTime(time)}</div>
            <div className="clock-date">{today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
          </div>

          {showClock && (
            <div className="tray-popup calendar-popup">
              <div className="calendar-today">{formatDate(today)}</div>
              <div className="calendar-time">{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}</div>

              <div className="calendar-nav">
                <button className="cal-nav-btn" onClick={prevMonth}>◀</button>
                <span className="cal-month-label">{MONTHS[calDate.month]} {calDate.year}</span>
                <button className="cal-nav-btn" onClick={nextMonth}>▶</button>
              </div>

              <div className="calendar-grid">
                {DAYS.map(d => <div key={d} className="cal-day-header">{d}</div>)}
                {cells.map((d, i) => (
                  <div key={i} className={`cal-cell ${d === null ? 'empty' : ''} ${d && isToday(d) ? 'today' : ''}`}>
                    {d}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
