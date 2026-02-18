import React from 'react';
import './Languages.css';

const languagesData = [
  { name: "Telugu", level: "Native", progress: 100 },
  { name: "English", level: "Fluent", progress: 95 },
  { name: "Hindi", level: "fluent", progress: 80 },
  { name: "Tamil", level: "Intermediate", progress: 50 }
];

const Languages = () => {
  return (
    <section id="languages" className="section">
      <div className="section-header">
        <div className="section-label">Communication</div>
        <h2 className="section-title">Languages</h2>
      </div>
      <div className="card languages-card">
        {languagesData.map((lang, index) => (
          <div key={index} className="language-item">
            <div className="language-header">
              <span className="language-name">{lang.name}</span>
              <span className="language-level">{lang.level}</span>
            </div>
            <div className="language-bar">
              <div 
                className="language-progress" 
                style={{ width: `${lang.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Languages;
