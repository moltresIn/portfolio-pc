import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RetroDesktop from './components/RetroDesktop';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RetroDesktop />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;