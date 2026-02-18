import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="section">
      <div className="section-header">
        <div className="section-label">About Me</div>
        <h2 className="section-title">Who Am I</h2>
      </div>
      <div className="card about-card">
        <p className="about-text">
         A pre final year student in Electronics and Communication  at SRM Institute of Science and Technology and Innovative 
         professional blending creative vision with technical expertise in Java Full Stack development and Python programming. 
         Skilled at utilizing industry-standard VLSI design tools to transform abstract concepts into tangible, high-impact hardware 
          and software results.
        </p>
      </div>
    </section>
  );
};

export default About;
