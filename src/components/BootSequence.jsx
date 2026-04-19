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

const BootSequence = ({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState([]);
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (stage !== 0) return;
    if (visibleLines.length >= BIOS_LINES.length) {
      const t = setTimeout(() => setStage(1), 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setVisibleLines(prev => [...prev, BIOS_LINES[prev.length]]);
    }, 180);
    return () => clearTimeout(t);
  }, [visibleLines, stage]);

  useEffect(() => {
    if (stage !== 1) return;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete?.(), 300);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [stage, onComplete]);

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
