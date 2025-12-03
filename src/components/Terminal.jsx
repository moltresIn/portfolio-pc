import React, { useState, useRef, useEffect } from 'react';
import './Terminal.css';

const Terminal = ({ onCommand }) => {
  const [history, setHistory] = useState([
    { type: 'output', text: 'Portfolio OS [Version 2.1.98]' },
    { type: 'output', text: '(c) 2025 Kishor Arjunan. All rights reserved.' },
    { type: 'output', text: '' },
    { type: 'output', text: 'Type "help" for available commands.' },
    { type: 'output', text: '' }
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

  const handleCommand = (cmd) => {
    const command = cmd.trim().toLowerCase();
    let output = [];

    switch(command) {
      case 'help':
        output = [
          'Available commands:',
          '  about      - View information about Alex Carter',
          '  projects   - Browse project portfolio',
          '  skills     - Display technical skills',
          '  contact    - Get contact information',
          '  ls         - List available programs',
          '  cd         - Change directory (simulated)',
          '  clear      - Clear terminal screen',
          '  help       - Show this help message'
        ];
        break;
      case 'about':
        output = ['Opening About.exe...'];
        onCommand('about');
        break;
      case 'projects':
        output = ['Opening Projects folder...'];
        onCommand('projects');
        break;
      case 'skills':
        output = ['Opening Skills.txt...'];
        onCommand('skills');
        break;
      case 'contact':
        output = ['Opening Contact.app...'];
        onCommand('contact');
        break;
      case 'ls':
      case 'dir':
        output = [
          'Directory of C:\\PORTFOLIO',
          '',
          '  About.exe',
          '  Projects <DIR>',
          '  Skills.txt',
          '  Contact.app',
          '  Terminal.exe',
          '',
          '5 File(s)     42,069 bytes'
        ];
        break;
      case 'cd ..':
      case 'cd':
        output = ['C:\\PORTFOLIO>'];
        break;
      case 'clear':
      case 'cls':
        setHistory([]);
        return;
      case '':
        break;
      default:
        output = [`'${cmd}' is not recognized as an internal or external command.`, 'Type "help" for available commands.'];
    }

    setHistory(prev => [
      ...prev,
      { type: 'input', text: cmd },
      ...output.map(text => ({ type: 'output', text }))
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setCommandHistory(prev => [...prev, input]);
      setHistoryIndex(-1);
      handleCommand(input);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
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
            {line.type === 'input' && <span className="prompt">C:\PORTFOLIO&gt; </span>}
            {line.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="terminal-input-form">
        <span className="prompt">C:\PORTFOLIO&gt; </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="terminal-input"
          autoFocus
          spellCheck={false}
        />
      </form>
    </div>
  );
};

export default Terminal;