import React from 'react';
import './Achievements.css';

const achievementsData = [
  {
    id: 1,
    icon: "🏆",
    text: "Winner – AI Zypher (Code Auction), SRMIST"
  },
  {
    id: 2,
    icon: "🥇",
    text: "Winner – Project Presentation, Dept. of ECE, SRMIST"
  },
  {
    id: 3,
    icon: "🚀",
    text: "Participant – Smart India Hackathon 2025"
  },
  {
    id: 4,
    icon: "🎯",
    text: "Technoathon – St. Joseph College"
  },
  {
    id: 5,
    icon: "👥",
    text: "Active Member – Camogenics Club"
  }
];

const Achievements = () => {
  return (
    <section id="achievements" className="section">
      <div className="section-header">
        <div className="section-label">Recognition</div>
        <h2 className="section-title">Achievements</h2>
      </div>
      <div className="achievements-container">
        {achievementsData.map((achievement) => (
          <div key={achievement.id} className="achievement-badge">
            <span className="achievement-icon">{achievement.icon}</span>
            <span>{achievement.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
