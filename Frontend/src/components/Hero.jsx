import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="floating-icon icon-1"></div>
        <div className="floating-icon icon-2"></div>
        <div className="floating-icon icon-3"></div>
      </div>
      
      <div className="hero-content">
        <div className="logo-container">
          <div className="logo-circle">
            <div className="logo-inner">b</div>
          </div>
          <h1 className="brand-name">Chat Nova</h1>
        </div>
        
        <h2 className="hero-title">
          Decentralized Anonymous Messaging with<br />
          Content-Level National Threat Detection
        </h2>
        
        <p className="hero-subtitle">
          A chatting app with secure blockchain<br />
          technology solutions.
        </p>
        
        <div className="hero-visual">
          <div className="blockchain-stack">
            <div className="stack-layer layer-1"></div>
            <div className="stack-layer layer-2"></div>
            <div className="stack-layer layer-3"></div>
            <div className="stack-layer layer-4"></div>
          </div>
          <div className="floating-nodes">
            <div className="node node-1"></div>
            <div className="node node-2"></div>
            <div className="node node-3"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
