import React from 'react';
import { experienceData } from '../../data/experienceData';
import './Experience.css';

const Experience = () => {
  return (
    <section id="experience" className="section">
      <div className="section-header">
        <div className="section-label">Professional Journey</div>
        <h2 className="section-title">Experience</h2>
      </div>
      <div className="timeline">
        {experienceData.map((exp) => (
          <div key={exp.id} className="timeline-item">
            <div className="timeline-date">{exp.date}</div>
            <h3 className="timeline-title">{exp.title}</h3>
            <div className="timeline-org">{exp.organization}</div>
            <p className="timeline-description">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
