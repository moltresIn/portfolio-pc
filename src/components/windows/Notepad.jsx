import React, { useState } from 'react';
import './Notepad.css';

const Notepad = () => {
  const [text, setText] = useState(() => localStorage.getItem('notepad') || '');
  const [saved, setSaved] = useState(true);

  const handleChange = (e) => {
    setText(e.target.value);
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem('notepad', text);
    setSaved(true);
  };

  const handleNew = () => {
    if (!saved && !window.confirm('Discard unsaved changes?')) return;
    setText('');
    localStorage.removeItem('notepad');
    setSaved(true);
  };

  return (
    <div className="notepad">
      <div className="notepad-menubar">
        <span className="notepad-menu-item" onClick={handleNew}>New</span>
        <span className="notepad-menu-item" onClick={handleSave}>Save</span>
        <span className="notepad-status">{saved ? 'Saved' : '● Unsaved'}</span>
      </div>
      <textarea
        className="notepad-area"
        value={text}
        onChange={handleChange}
        onKeyDown={(e) => { if (e.ctrlKey && e.key === 's') { e.preventDefault(); handleSave(); } }}
        placeholder="Start typing..."
        spellCheck={false}
        autoFocus
      />
      <div className="notepad-footer">
        Ln {text.split('\n').length} · {text.length} chars · Ctrl+S to save
      </div>
    </div>
  );
};

export default Notepad;
