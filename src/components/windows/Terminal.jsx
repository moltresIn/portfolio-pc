import React, { useState, useRef, useEffect } from 'react';
import './Terminal.css';

const NEOFETCH = [
  '        ██████╗  ██████╗ ',
  '       ██╔═══██╗██╔════╝ ',
  '       ██║   ██║╚█████╗  ',
  '       ██║   ██║ ╚═══██╗ ',
  '       ╚██████╔╝██████╔╝ ',
  '        ╚═════╝ ╚═════╝  ',
  '',
  '  kishor@portfolio-os',
  '  ─────────────────────────',
  '  OS:       Portfolio OS 98',
  '  Role:     Senior Software Engineer',
  '  Company:  Aracreate India',
  '  Location: Erode, Tamil Nadu, India',
  '  Stack:    React · Node.js · Docker · K8s',
  '  Shell:    cmd.exe v2.1.98',
  '  Website:  https://akishor.com',
];

const HELP_TEXT = [
  'Available commands:',
  '',
  '  about      - Open About window',
  '  projects   - Open Projects window',
  '  skills     - Open Skills window',
  '  contact    - Open Contact window',
  '  snake      - Play Snake',
  '  notepad    - Open Notepad',
  '  open <app> - Open any app by name',
  '  whoami     - Display current user info',
  '  neofetch   - System information',
  '  date       - Show current date & time',
  '  echo <msg> - Print a message',
  '  ls / dir   - List available programs',
  '  clear/cls  - Clear terminal screen',
  '  help       - Show this help message',
];

const Terminal = ({ onCommand }) => {
  const [history, setHistory] = useState([
    { type: 'output', text: 'Portfolio OS [Version 2.1.98]' },
    { type: 'output', text: '(c) 2026 Kishor Arjunan. All rights reserved.' },
    { type: 'output', text: '' },
    { type: 'output', text: 'Type "help" for available commands.' },
    { type: 'output', text: '' },
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const push = (...lines) =>
    lines.map(text => ({ type: 'output', text }));

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim();
    const lower = trimmed.toLowerCase();
    const parts = lower.split(' ');
    let output = [];

    switch (parts[0]) {
      case 'help':
        output = push(...HELP_TEXT);
        break;

      case 'whoami':
        output = push(
          'User:     Kishor Arjunan',
          'Role:     Senior Software Engineer',
          'Company:  Aracreate India',
          'Location: Erode, Tamil Nadu, India',
          'Email:    akishor2001@gmail.com',
          'GitHub:   github.com/moltresIn',
          'LinkedIn: linkedin.com/in/kishor-arjunan',
        );
        break;

      case 'neofetch':
        output = push(...NEOFETCH);
        break;

      case 'date':
        output = push(new Date().toString());
        break;

      case 'echo':
        output = push(trimmed.slice(5) || '');
        break;

      case 'about':
        output = push('Opening About.exe...');
        onCommand('about');
        break;

      case 'projects':
        output = push('Opening Projects folder...');
        onCommand('projects');
        break;

      case 'skills':
        output = push('Opening Skills.txt...');
        onCommand('skills');
        break;

      case 'contact':
        output = push('Opening Contact.app...');
        onCommand('contact');
        break;

      case 'snake':
        output = push('Loading Snake.exe...');
        onCommand('snake');
        break;

      case 'notepad':
        output = push('Opening Notepad.exe...');
        onCommand('notepad');
        break;

      case 'open': {
        const app = parts[1];
        const valid = ['about', 'projects', 'skills', 'contact', 'terminal', 'snake', 'notepad'];
        if (valid.includes(app)) {
          output = push(`Opening ${app}...`);
          onCommand(app);
        } else {
          output = push(
            app
              ? `'${app}' is not a recognized program.`
              : 'Usage: open <about|projects|skills|contact|terminal|snake|notepad>',
          );
        }
        break;
      }

      case 'ls':
      case 'dir':
        output = push(
          'Directory of C:\\PORTFOLIO',
          '',
          '  About.exe',
          '  Projects    <DIR>',
          '  Skills.txt',
          '  Contact.app',
          '  Terminal.exe',
          '',
          '5 File(s)     42,069 bytes',
        );
        break;

      case 'cd':
        output = push('C:\\PORTFOLIO>');
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        return;

      case '':
        output = [];
        break;

      default:
        output = push(
          `'${trimmed}' is not recognized as an internal or external command.`,
          'Type "help" for available commands.',
        );
    }

    setHistory(prev => [
      ...prev,
      { type: 'input', text: trimmed },
      ...output,
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() && input !== '') {
      setHistory(prev => [...prev, { type: 'input', text: '' }]);
      setInput('');
      return;
    }
    setCommandHistory(prev => [...prev, input]);
    setHistoryIndex(-1);
    handleCommand(input);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="terminal" ref={terminalRef} onClick={() => inputRef.current?.focus()}>
      <div className="terminal-output">
        {history.map((line, index) => (
          <div key={index} className={`terminal-line ${line.type}`}>
            {line.type === 'input' && <span className="prompt">C:\PORTFOLIO&gt;&nbsp;</span>}
            {line.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="terminal-input-form">
        <span className="prompt">C:\PORTFOLIO&gt;&nbsp;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="terminal-input"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </form>
    </div>
  );
};

export default Terminal;
