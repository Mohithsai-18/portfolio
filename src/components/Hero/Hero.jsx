import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="label">Electronics & Communication Engineering Student </div>
        <h1 className="hero-title">
          <span className="portfolio-text">NADIPI</span>
        </h1>
        <div className="signature">Mohith Sai</div>
        <p className="hero-subtitle">
          I work across hardware and software with equal depth, combining embedded system knowledge with full-stack development and data analytics to build complete end-to-end solutions.
        </p>
        <div className="cta-buttons">
          <a href="#projects" className="btn btn-primary">View My Work</a>
          <a href="#contact" className="btn btn-secondary">Get In Touch</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
