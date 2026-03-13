import React from 'react';
import './Features.css';

const Features = () => {
  const features = [
    {
      icon: '👤',
      title: 'Anonymity',
      description: 'Users are fully Masked and are the devices.'
    },
    {
      icon: '🔍',
      title: 'Transparency',
      description: 'It can help Govern to catch them if they are in any type of crime or illegal activity.'
    },
    {
      icon: '🔒',
      title: 'Highly Secured',
      description: 'It can help to secure a blockchain system and if got hacked or some one want to change.'
    }
  ];

  return (
    <section className="features">
      <div className="features-container">
        <h2 className="section-title">Product Features</h2>
        
        <div className="features-grid">
          {features.map((item, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">{item.icon}</div>
              </div>
              <h3 className="feature-title">{item.title}</h3>
              <p className="feature-description">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="features-visual">
          <div className="phone-mockup">
            <div className="phone-screen">
              <div className="screen-glow"></div>
            </div>
          </div>
          <div className="floating-elements">
            <div className="float-element el-1"></div>
            <div className="float-element el-2"></div>
            <div className="float-element el-3"></div>
          </div>
        </div>

        <footer className="footer">
          <p className="footer-text">Developed by</p>
          <div className="developers">
            <span>Gaurav Garg</span>
            <span>Harendra Kumar</span>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Features;
