import React from 'react';
import './Education.css';

const Education = () => {
  return (
    <section id="education" className="section">
      <div className="section-header">
        <div className="section-label">Academic Background</div>
        <h2 className="section-title">Education</h2>
      </div>

      <div className="timeline">

        {/* B.Tech */}
        <div className="timeline-item">
          <div className="timeline-date">2023 - Present</div>
          <h3 className="timeline-title">
            B.Tech in Electronics & Communication Engineering
          </h3>
          <div className="timeline-org">
            SRM Institute of Science and Technology
          </div>
          <p className="timeline-description">
            Focus areas: Embedded Systems, VLSI Design, Full Stack Development,
            Machine Learning Applications in ECE
          </p>
        </div>

        {/* +2 Intermediate */}
        <div className="timeline-item">
          <div className="timeline-date">2021 - 2023</div>
          <h3 className="timeline-title">
            Higher Secondary (+2)  PCM
          </h3>
          <div className="timeline-org">
            Sai Sri Chaitanya Junior College
          </div>
          <p className="timeline-description">
            Physics, Chemistry and Mathematics (PCM) — Scored 94.9%
          </p>
        </div>

        {/* Secondary Schooling */}
        <div className="timeline-item">
          <div className="timeline-date">2020 - 2021</div>
          <h3 className="timeline-title">
            Secondary Schooling (SSC)
          </h3>
          <div className="timeline-org">
            Sri Sarada English Medium School
          </div>
          <p className="timeline-description">
            Completed secondary education with a score of 9.3 CGPA
          </p>
        </div>

      </div>
    </section>
  );
};

export default Education;
