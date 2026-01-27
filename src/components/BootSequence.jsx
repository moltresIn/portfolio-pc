import React, { useState, useEffect } from 'react';
import './BootSequence.css';

const BootSequence = () => {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stages = [
      { duration: 1000, stage: 0 },
      { duration: 2000, stage: 1 },
      { duration: 1000, stage: 2 }
    ];

    let currentTime = 0;
    stages.forEach((s, idx) => {
      setTimeout(() => setStage(idx), currentTime);
      currentTime += s.duration;
    });

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div className="boot-sequence">
      {stage === 0 && (
        <div className="bios-screen">
          <div className="bios-text">
            <div>KISHOR ARJUNAN BIOS v2.1</div>
            <div>Copyright (C) 2026, Portfolio Systems Inc.</div>
            <div style={{ marginTop: '20px' }}>Detecting hardware...</div>
            <div>CPU: Software Engineer Core</div>
            <div>RAM: Unlimited Creativity</div>
            <div>GPU: High Performance UI/UX Engine</div>
          </div>
        </div>
      )}

      {stage >= 1 && (
        <div className="loading-screen">
          <div className="loading-logo">PORTFOLIO OS 98</div>
          <div className="loading-bar-container">
            <div className="loading-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="loading-text">Starting Windows 98...</div>
        </div>
      )}
    </div>
  );
};

export default BootSequence;