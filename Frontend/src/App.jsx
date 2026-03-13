import React, { useState } from 'react';
import Login from './pages/Login';
import ChatApp from './pages/ChatApp';
import GovPortal from './pages/GovPortal';
import ParticleBackground from './components/ParticleBackground';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentPage('chat');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
  };

  return (
    <div className="app">
      <ParticleBackground />
      {currentPage === 'login' && (
        <Login onLogin={handleLogin} onGovPortal={() => setCurrentPage('gov')} />
      )}
      {currentPage === 'chat' && (
        <ChatApp user={user} onLogout={handleLogout} />
      )}
      {currentPage === 'gov' && (
        <GovPortal onBack={() => setCurrentPage('login')} />
      )}
    </div>
  );
}

export default App;
