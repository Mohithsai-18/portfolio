import React from 'react';
import { projectsData } from '../../data/projectsData';
import './Projects.css';

const Projects = () => {
  return (
    <section id="projects" className="section">
      <div className="section-header">
        <div className="section-label">Featured Work</div>
        <h2 className="section-title">Projects</h2>
      </div>
      <div className="projects-grid">
        {projectsData.map((project) => (
          <div key={project.id} className="card project-card">
            <h3 className="card-title">{project.title}</h3>
            <div className="card-subtitle">{project.subtitle}</div>
            <p className="card-description">{project.description}</p>
            <div className="card-meta">
              {project.tags.map((tag, index) => (
                <span key={index}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
