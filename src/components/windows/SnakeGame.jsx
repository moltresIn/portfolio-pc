import React, { useState, useEffect, useRef, useCallback } from 'react';
import './SnakeGame.css';

const COLS = 20;
const ROWS = 18;
const CELL = 22; // px per cell
const W = COLS * CELL;
const H = ROWS * CELL;

const SPEED_START = 220; // ms per tick
const SPEED_MIN   = 80;
const SPEED_STEP  = 8;   // ms faster per food eaten

const rand = (max) => Math.floor(Math.random() * max);
const newFood = (snake) => {
  let pos;
  do { pos = { x: rand(COLS), y: rand(ROWS) }; }
  while (snake.some(s => s.x === pos.x && s.y === pos.y));
  return pos;
};

const INIT_SNAKE = [{ x: 10, y: 9 }, { x: 9, y: 9 }, { x: 8, y: 9 }];
const INIT_DIR   = { x: 1, y: 0 };

// Draw the whole scene onto the canvas
const draw = (ctx, snake, food, status) => {
  // Background
  ctx.fillStyle = '#000d1a';
  ctx.fillRect(0, 0, W, H);

  // Grid dots
  ctx.fillStyle = 'rgba(0, 212, 255, 0.04)';
  for (let x = 0; x < COLS; x++) {
    for (let y = 0; y < ROWS; y++) {
      ctx.fillRect(x * CELL + CELL / 2 - 1, y * CELL + CELL / 2 - 1, 2, 2);
    }
  }

  // Food — glowing circle
  const fx = food.x * CELL + CELL / 2;
  const fy = food.y * CELL + CELL / 2;
  const foodGlow = ctx.createRadialGradient(fx, fy, 1, fx, fy, CELL * 0.45);
  foodGlow.addColorStop(0, '#ff6688');
  foodGlow.addColorStop(1, 'rgba(255,68,102,0)');
  ctx.fillStyle = foodGlow;
  ctx.beginPath();
  ctx.arc(fx, fy, CELL * 0.45, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ff4466';
  ctx.beginPath();
  ctx.arc(fx, fy, CELL * 0.3, 0, Math.PI * 2);
  ctx.fill();

  if (snake.length === 0) return;

  // Snake body — draw tail to head so head is on top
  for (let i = snake.length - 1; i >= 0; i--) {
    const seg = snake[i];
    const t = i / (snake.length - 1 || 1); // 0 = head, 1 = tail
    const alpha = 1 - t * 0.55;
    const r = Math.round(0   + t * 0);
    const g = Math.round(136 - t * 60);
    const b = Math.round(204 - t * 80);

    const px = seg.x * CELL;
    const py = seg.y * CELL;
    const pad = 2;
    const radius = (CELL / 2) - pad;

    ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
    ctx.beginPath();
    ctx.roundRect(px + pad, py + pad, CELL - pad * 2, CELL - pad * 2, radius);
    ctx.fill();

    // Subtle inner highlight on body
    if (i > 0) {
      ctx.fillStyle = `rgba(255,255,255,0.06)`;
      ctx.beginPath();
      ctx.roundRect(px + pad + 2, py + pad + 2, CELL - pad * 2 - 4, (CELL - pad * 2) * 0.4, 3);
      ctx.fill();
    }
  }

  // Head — brighter with eyes
  const head = snake[0];
  const hx = head.x * CELL;
  const hy = head.y * CELL;
  const pad = 1;

  // Head glow
  ctx.shadowColor = '#00d4ff';
  ctx.shadowBlur = 12;
  ctx.fillStyle = '#00d4ff';
  ctx.beginPath();
  ctx.roundRect(hx + pad, hy + pad, CELL - pad * 2, CELL - pad * 2, (CELL / 2) - pad);
  ctx.fill();
  ctx.shadowBlur = 0;

  // Eyes — positioned based on direction
  const dir = snake.length > 1
    ? { x: snake[0].x - snake[1].x, y: snake[0].y - snake[1].y }
    : INIT_DIR;

  const cx = hx + CELL / 2;
  const cy = hy + CELL / 2;
  const eyeOffset = 4;
  const eyeR = 2.5;

  let eye1, eye2;
  if (dir.x === 1)       { eye1 = { x: cx + 3, y: cy - eyeOffset }; eye2 = { x: cx + 3, y: cy + eyeOffset }; }
  else if (dir.x === -1) { eye1 = { x: cx - 3, y: cy - eyeOffset }; eye2 = { x: cx - 3, y: cy + eyeOffset }; }
  else if (dir.y === -1) { eye1 = { x: cx - eyeOffset, y: cy - 3 }; eye2 = { x: cx + eyeOffset, y: cy - 3 }; }
  else                   { eye1 = { x: cx - eyeOffset, y: cy + 3 }; eye2 = { x: cx + eyeOffset, y: cy + 3 }; }

  ctx.fillStyle = '#001a33';
  [eye1, eye2].forEach(e => {
    ctx.beginPath();
    ctx.arc(e.x, e.y, eyeR, 0, Math.PI * 2);
    ctx.fill();
  });
  // Eye shine
  ctx.fillStyle = 'rgba(255,255,255,0.8)';
  [eye1, eye2].forEach(e => {
    ctx.beginPath();
    ctx.arc(e.x - 0.8, e.y - 0.8, 1, 0, Math.PI * 2);
    ctx.fill();
  });
};

const SnakeGame = () => {
  const canvasRef  = useRef(null);
  const snakeRef   = useRef(INIT_SNAKE.map(p => ({ ...p })));
  const foodRef    = useRef({ x: 15, y: 9 });
  const dirRef     = useRef(INIT_DIR);
  const statusRef  = useRef('idle');
  const speedRef   = useRef(SPEED_START);
  const intervalRef = useRef(null);

  const [score, setScore]   = useState(0);
  const [best, setBest]     = useState(() => parseInt(localStorage.getItem('snake-best') || '0'));
  const [status, setStatus] = useState('idle');
  const [speed, setSpeed]   = useState(SPEED_START);

  // Redraw canvas whenever snake/food changes
  const redraw = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    draw(ctx, snakeRef.current, foodRef.current, statusRef.current);
  }, []);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (statusRef.current !== 'running') return;

      const d = dirRef.current;
      const s = snakeRef.current;
      const head = { x: s[0].x + d.x, y: s[0].y + d.y };

      if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS ||
          s.some(seg => seg.x === head.x && seg.y === head.y)) {
        statusRef.current = 'dead';
        setStatus('dead');
        redraw();
        return;
      }

      const ate = head.x === foodRef.current.x && head.y === foodRef.current.y;
      snakeRef.current = ate ? [head, ...s] : [head, ...s.slice(0, -1)];

      if (ate) {
        const f = newFood(snakeRef.current);
        foodRef.current = f;

        setScore(prev => {
          const next = prev + 10;
          setBest(b => { const nb = Math.max(b, next); localStorage.setItem('snake-best', nb); return nb; });
          return next;
        });

        // Speed up
        const newSpeed = Math.max(SPEED_MIN, speedRef.current - SPEED_STEP);
        if (newSpeed !== speedRef.current) {
          speedRef.current = newSpeed;
          setSpeed(newSpeed);
          // Restart interval at new speed
          startInterval();
        }
      }

      redraw();
    }, speedRef.current);
  }, [redraw]);

  const reset = useCallback(() => {
    const s = INIT_SNAKE.map(p => ({ ...p }));
    const f = newFood(s);
    snakeRef.current  = s;
    foodRef.current   = f;
    dirRef.current    = { ...INIT_DIR };
    speedRef.current  = SPEED_START;
    statusRef.current = 'running';
    setScore(0);
    setSpeed(SPEED_START);
    setStatus('running');
    redraw();
    startInterval();
  }, [redraw, startInterval]);

  // Initial draw
  useEffect(() => { redraw(); }, [redraw]);

  // Cleanup on unmount
  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      const map = {
        ArrowUp:    { x: 0, y: -1 }, ArrowDown:  { x: 0, y:  1 },
        ArrowLeft:  { x: -1, y: 0 }, ArrowRight: { x: 1, y:  0 },
        w: { x: 0, y: -1 }, s: { x: 0, y: 1 },
        a: { x: -1, y: 0 }, d: { x: 1, y: 0 },
      };
      if (map[e.key]) {
        e.preventDefault();
        const next = map[e.key];
        const cur  = dirRef.current;
        if (next.x === -cur.x && next.y === -cur.y) return;
        dirRef.current = next;
      }
      if (e.key === ' ') {
        e.preventDefault();
        if (statusRef.current === 'running') {
          statusRef.current = 'paused';
          setStatus('paused');
        } else if (statusRef.current === 'paused') {
          statusRef.current = 'running';
          setStatus('running');
          startInterval();
        } else {
          reset();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [reset, startInterval]);

  // Level display
  const level = Math.floor((SPEED_START - speed) / SPEED_STEP) + 1;

  return (
    <div className="snake-game">
      <div className="snake-header">
        <span>SCORE: {score}</span>
        <span>LVL: {level}</span>
        <span>BEST: {best}</span>
      </div>

      <div className="snake-canvas-wrap">
        <canvas ref={canvasRef} width={W} height={H} className="snake-canvas" />

        {status !== 'running' && (
          <div className="snake-overlay">
            {status === 'idle'   && <><div className="snake-msg">SNAKE</div><div className="snake-sub">Press SPACE to start</div></>}
            {status === 'paused' && <><div className="snake-msg">PAUSED</div><div className="snake-sub">Press SPACE to resume</div></>}
            {status === 'dead'   && <><div className="snake-msg">GAME OVER</div><div className="snake-score">Score: {score}</div><div className="snake-sub">Press SPACE to restart</div></>}
          </div>
        )}
      </div>

      <div className="snake-footer">Arrow keys / WASD · SPACE to pause</div>
    </div>
  );
};

export default SnakeGame;
