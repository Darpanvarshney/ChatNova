import React, { useState, useEffect } from 'react';
import './GovPortal.css';
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const GovPortal = ({ onBack }) => {

  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const [monitoredMessages, setMonitoredMessages] = useState([]);
  const [messageCount, setMessageCount] = useState(0);
  const [threatCount, setThreatCount] = useState(0);

  // SOCKET CONNECTION FOR GOVERNMENT MONITORING
  useEffect(() => {

    socket.emit("government_join");

    socket.on("government_monitor", (data) => {

      const message = data.message.toLowerCase();

      let threat = "Low";
      let analysis = "Normal conversation detected";

      if (
        message.includes("bomb") ||
        message.includes("attack") ||
        message.includes("kill") ||
        message.includes("terror")
      ) {
        threat = "High";
        analysis = "Potential violent threat detected";
      }
      else if (
        message.includes("meet") ||
        message.includes("plan") ||
        message.includes("location")
      ) {
        threat = "Medium";
        analysis = "Suspicious coordination detected";
      }

      const newMessage = {
        id: Date.now(),
        encryptedContent: "ENC_" + btoa(data.message),
        timestamp: new Date().toLocaleTimeString(),
        blockchainHash: data.tx_hash,
        threatLevel: threat,
        aiAnalysis: analysis
      };

      setMonitoredMessages(prev => [newMessage, ...prev]);

      setMessageCount(prev => prev + 1);

      if (threat === "High" || threat === "Medium") {
        setThreatCount(prev => prev + 1);
      }

    });

  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (password === "gov123") {
      setAuthenticated(true);
    } else {
      alert("Invalid credentials");
    }
  };

  if (!authenticated) {
    return (
      <div className="gov-portal">

        <div className="gov-login">

          <button className="back-btn" onClick={onBack}>
            ← Back
          </button>

          <div className="gov-logo">🏛️</div>

          <h1>Government Monitoring Portal</h1>

          <p className="gov-subtitle">
            Authorized Access Only
          </p>

          <form onSubmit={handleLogin} className="gov-form">

            <div className="form-group">
              <label>Access Code</label>

              <input
                type="password"
                placeholder="Enter government access code"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>

            <button type="submit" className="btn-gov">
              Access Portal
            </button>

            <p className="hint">
              Hint: gov123
            </p>

          </form>

        </div>

      </div>
    );
  }

  return (

    <div className="gov-portal authenticated">

      <div className="gov-header">

        <div className="gov-title">

          <span className="gov-icon">🏛️</span>

          <div>

            <h1>Government Monitoring Dashboard</h1>

            <p>Content-Level Threat Detection System</p>

          </div>

        </div>

        <button className="back-btn" onClick={onBack}>
          Exit Portal
        </button>

      </div>

      <div className="gov-stats">

        <div className="stat-card">

          <div className="stat-icon">📊</div>

          <div className="stat-info">

            <div className="stat-value">
              {messageCount}
            </div>

            <div className="stat-label">
              Messages Monitored
            </div>

          </div>

        </div>

        <div className="stat-card">

          <div className="stat-icon">⚠️</div>

          <div className="stat-info">

            <div className="stat-value">
              {threatCount}
            </div>

            <div className="stat-label">
              Threats Detected
            </div>

          </div>

        </div>

        <div className="stat-card">

          <div className="stat-icon">🔒</div>

          <div className="stat-info">

            <div className="stat-value">
              100%
            </div>

            <div className="stat-label">
              Privacy Protected
            </div>

          </div>

        </div>

      </div>

      <div className="gov-content">

        <div className="section-header">

          <h2>Monitored Messages</h2>

          <div className="filter-badges">

            <span className="badge low">
              Low Risk
            </span>

            <span className="badge medium">
              Medium Risk
            </span>

            <span className="badge high">
              High Risk
            </span>

          </div>

        </div>

        <div className="messages-table">

          {monitoredMessages.length === 0 ? (

            <p>No monitored messages yet</p>

          ) : (

            monitoredMessages.map(msg => (

              <div
                key={msg.id}
                className={`message-row ${msg.threatLevel.toLowerCase()}`}
              >

                <div className="message-col">

                  <div className="col-label">
                    Encrypted Content
                  </div>

                  <div className="col-value encrypted">
                    {msg.encryptedContent}
                  </div>

                </div>

                <div className="message-col">

                  <div className="col-label">
                    Timestamp
                  </div>

                  <div className="col-value">
                    {msg.timestamp}
                  </div>

                </div>

                <div className="message-col">

                  <div className="col-label">
                    Blockchain Hash
                  </div>

                  <div className="col-value hash">
                    {msg.blockchainHash}
                  </div>

                </div>

                <div className="message-col">

                  <div className="col-label">
                    Threat Level
                  </div>

                  <div
                    className={`threat-badge ${msg.threatLevel.toLowerCase()}`}
                  >
                    {msg.threatLevel}
                  </div>

                </div>

                <div className="message-col full-width">

                  <div className="col-label">
                    AI Analysis
                  </div>

                  <div className="col-value">
                    {msg.aiAnalysis}
                  </div>

                </div>

              </div>

            ))

          )}

        </div>

        <div className="privacy-notice">

          <span className="notice-icon">🔐</span>

          <p>

            <strong>Privacy Protection:</strong>

            User identities remain anonymous.
            Only message content is analyzed
            for threat detection.

            Identity reveal requires
            court order approval.

          </p>

        </div>

      </div>

    </div>

  );

};

export default GovPortal;

