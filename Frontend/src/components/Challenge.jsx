import React from 'react';
import './Challenge.css';

const Challenge = () => {
  const challenges = [
    {
      icon: '🔒',
      title: 'Privacy',
      description: 'This chat app should have privacy cause it is a basic Right.'
    },
    {
      icon: '🔐',
      title: 'Misuse of End Encryption',
      description: 'Many terror groups use the end to end encryption for their Chats so the one can caught them.'
    },
    {
      icon: '⚠️',
      title: 'Cyber attacks',
      description: 'If some want to change something in Someone chats it can be easily.'
    }
  ];

  return (
    <section className="challenge">
      <div className="challenge-container">
        <h2 className="section-title">The Challenge</h2>
        <p className="section-subtitle">
          Current messaging platforms focus either on privacy or surveillance.
        </p>
        <p className="section-description">
          End-to-end encrypted apps protect users but make it difficult for authorities to detect serious threats such as terrorism planning or Cybercrime.
        </p>

        <div className="challenge-grid">
          {challenges.map((item, index) => (
            <div key={index} className="challenge-card">
              <div className="challenge-icon">{item.icon}</div>
              <h3 className="challenge-title">{item.title}</h3>
              <p className="challenge-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Challenge;
