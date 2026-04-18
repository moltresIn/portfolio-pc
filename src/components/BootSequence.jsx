import React, { useState, useEffect } from 'react';
import './BootSequence.css';

const BIOS_LINES = [
  'KISHOR ARJUNAN BIOS v2.1',
  'Copyright (C) 2026, Portfolio Systems Inc.',
  '',
  'Detecting hardware...',
  'CPU: Senior Software Engineer Core @ 4.2GHz',
  'RAM: 16GB Unlimited Creativity',
  'GPU: High Performance UI/UX Engine',
  'HDD: 500GB Project Storage',
  '',
  'Running POST...',
  'Memory test: OK',
  'System check: PASSED',
  '',
  'Loading Portfolio OS 98...',
];

const BootSequence = () => {
  const [visibleLines, setVisibleLines] = useState([]);
  const [stage, setStage] = useState(0); // 0 = bios, 1 = loading
  const [progress, setProgress] = useState(0);

  // Typewriter: reveal one BIOS line every 180ms
  useEffect(() => {
    if (stage !== 0) return;
    if (visibleLines.length >= BIOS_LINES.length) {
      // All lines shown — switch to loading screen after short pause
      const t = setTimeout(() => setStage(1), 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setVisibleLines(prev => [...prev, BIOS_LINES[prev.length]]);
    }, 180);
    return () => clearTimeout(t);
  }, [visibleLines, stage]);

  // Progress bar fills over ~2.5s once loading screen appears
  useEffect(() => {
    if (stage !== 1) return;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [stage]);

  return (
    <div className="boot-sequence">
      {stage === 0 && (
        <div className="bios-screen">
          <div className="bios-text">
            {visibleLines.map((line, i) => (
              <div key={i} className="bios-line">{line || '\u00A0'}</div>
            ))}
            <span className="bios-cursor">_</span>
          </div>
        </div>
      )}

      {stage === 1 && (
        <div className="loading-screen">
          <div className="loading-logo">PORTFOLIO OS 98</div>
          <div className="loading-bar-container">
            <div className="loading-bar" style={{ width: `${progress}%` }} />
          </div>
          <div className="loading-text">Starting Windows 98...</div>
        </div>
      )}
    </div>
  );
};

export default BootSequence;
