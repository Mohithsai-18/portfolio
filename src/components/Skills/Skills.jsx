import React from 'react';
import { skillsData } from '../../data/skillsData';
import './Skills.css';

const Skills = () => {
  return (
    <section id="skills" className="section">
      <div className="section-header">
        <div className="section-label">Technical Expertise</div>
        <h2 className="section-title">Skills</h2>
      </div>
      <div className="skills-grid">
        {Object.entries(skillsData).map(([key, category]) => (
          <div key={key} className="skill-category">
            <h3>{category.title}</h3>
            <div className="skill-list">
              {category.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
