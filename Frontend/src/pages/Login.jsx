import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin, onGovPortal }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');

  const generateAnonymousId = () => {
    return 'anon_' + Math.random().toString(36).substr(2, 9);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const anonymousId = generateAnonymousId();
    const userData = {
      username: username || 'Anonymous User',
      anonymousId: anonymousId,
      publicKey: 'PK_' + Math.random().toString(36).substr(2, 16)
    };

    try {
      const res = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          anonymousId: userData.anonymousId,
          displayName: userData.username
        })
      });

      const createdUser = await res.json();
      onLogin({ ...userData, displayName: createdUser.displayName });
    } catch (error) {
      console.error('Failed to create user:', error);
      onLogin(userData);
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg">
        <div className="floating-particle p1"></div>
        <div className="floating-particle p2"></div>
        <div className="floating-particle p3"></div>
      </div>

      <div className="login-container">
        <div className="logo-section">
          <div className="logo-circle">
            <div className="logo-inner">CN</div>
          </div>
          <h1 className="app-title">Chat Nova</h1>
          <p className="app-subtitle">Decentralized Anonymous Messaging</p>
        </div>

        <div className="login-card">
          <h2>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="card-subtitle">Your identity will be fully anonymous</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Display Name (Optional)</label>
              <input
                type="text"
                placeholder="Leave empty for anonymous"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="info-box">
              <span className="info-icon">🔒</span>
              <p>Your real identity is protected by blockchain encryption</p>
            </div>

            <button type="submit" className="btn-primary">
              {isSignup ? 'Create Anonymous Account' : 'Enter Securely'}
            </button>
          </form>

          <div className="toggle-mode">
            <button onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>

        <button className="gov-portal-btn" onClick={onGovPortal}>
          🏛️ Government Portal
        </button>
      </div>
    </div>
  );
};

export default Login;
