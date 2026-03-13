import React from 'react';
import './Structure.css';

const Structure = () => {
  return (
    <section className="structure">
      <div className="structure-container">
        <h2 className="section-title">Structure</h2>
        
        <div className="structure-diagram">
          <div className="structure-row">
            <div className="structure-node user-node">
              <div className="node-icon">👤</div>
              <div className="node-label">User A</div>
            </div>

            <div className="connection-line"></div>

            <div className="structure-node central-node">
              <div className="node-icon">🐍</div>
              <div className="node-label">Python Backend</div>
              <div className="node-details">
                <div>• Encryption</div>
                <div>• Blockchain Integration</div>
                <div>• AI Threat Detection</div>
              </div>
            </div>

            <div className="connection-line"></div>

            <div className="structure-node gov-node">
              <div className="node-icon">🏛️</div>
              <div className="node-label">Government Monitoring</div>
              <div className="node-details">
                <div>• Content Encrypted Message</div>
                <div>• Threat Detection AI</div>
                <div>• Maintain Integrity Report</div>
              </div>
            </div>
          </div>

          <div className="structure-row">
            <div className="structure-node app-node">
              <div className="node-icon">📱</div>
              <div className="node-label">Frontend App</div>
            </div>

            <div className="connection-line vertical"></div>

            <div className="structure-node storage-node">
              <div className="node-icon">💾</div>
              <div className="node-label">IPFS Storage</div>
              <div className="node-subtext">(Encrypted Messages)</div>
            </div>
          </div>

          <div className="structure-row">
            <div className="structure-node blockchain-node">
              <div className="node-icon">⛓️</div>
              <div className="node-label">Blockchain Ledger</div>
              <div className="node-subtext">(Immutable Security)</div>
            </div>

            <div className="connection-line"></div>

            <div className="structure-node monitor-node">
              <div className="node-icon">📊</div>
              <div className="node-label">Monitor Content</div>
            </div>

            <div className="connection-line"></div>

            <div className="structure-node identity-node">
              <div className="node-icon">🔐</div>
              <div className="node-label">Identity Reveal (Approved)</div>
              <div className="node-subtext">(By court order only)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Structure;
