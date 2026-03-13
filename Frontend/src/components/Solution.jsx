import React from 'react';
import './Solution.css';

const Solution = () => {
  const solutions = [
    {
      number: '1',
      title: 'Privacy',
      description: 'In this app the users are fully Anonymous and their chats are also encrypted.'
    },
    {
      number: '2',
      title: 'Transparency',
      description: 'In this app there is a special portal for government where from they can see chats but not Who sent it and to whom it was sent. So it do not break the privacy of the users.'
    },
    {
      number: '3',
      title: 'AI Filterization of chats',
      description: 'It is a phase of our application where the chats get filter like if someone write some or any number or OTP only the sender and receiver can it.'
    },
    {
      number: '4',
      title: 'Highly Secured',
      description: 'In this if someone want to change any thing try to modify something it cannot do that because of multiple copy of block in each system.'
    }
  ];

  return (
    <section className="solution">
      <div className="solution-container">
        <h2 className="section-title">Our Blockchain Solution</h2>
        
        <div className="solution-grid">
          {solutions.map((item, index) => (
            <div key={index} className="solution-card">
              <div className="solution-number">{item.number}</div>
              <h3 className="solution-title">{item.title}</h3>
              <p className="solution-description">{item.description}</p>
              <div className="solution-arrow">→</div>
            </div>
          ))}
        </div>

        <div className="solution-visual">
          <div className="visual-grid">
            <div className="visual-item item-1"></div>
            <div className="visual-item item-2"></div>
            <div className="visual-item item-3"></div>
            <div className="visual-item item-4"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
