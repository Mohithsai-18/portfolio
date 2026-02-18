import React from 'react';
import './Certifications.css';

const certificationsData = [
  {
    id: 1,
    title: "C Programming Certification",
    issuer: "Udemy",
    year: "2023",
    description:
      "Completed practical training in C programming covering structured programming, problem solving, and core software development concepts."
  },
  {
    id: 2,
    title: "Introduction to Python",
    issuer: "Udemy",
    year: "2024",
    description:
      "Learned Python fundamentals including data structures, scripting, and application development with a focus on engineering use cases."
  },
  {
    id: 3,
    title: "Verilog HDL",
    issuer: "Udemy",
    year: "2024",
    description:
      "Hands-on certification covering digital design using Verilog HDL, simulation concepts, and hardware modeling techniques."
  },
  {
    id: 4,
    title: "VLSI Design Fundamentals",
    issuer: "Udemy",
    year: "2025",
    description:
      "Studied core VLSI concepts including chip design basics, digital circuits, and hardware architecture fundamentals."
  },
  {
    id: 5,
    title: "Java Programming",
    issuer: "Udemy",
    year: "2025",
    description:
      "Completed structured coursework on Java programming, object-oriented design, and application development principles."
  }
];

const Certifications = () => {
  return (
    <section id="certifications" className="section">
      <div className="section-header">
        <div className="section-label">Professional Development</div>
        <h2 className="section-title">Certifications</h2>
      </div>
      <div className="certifications-grid">
        {certificationsData.map((cert) => (
          <div key={cert.id} className="card cert-card">
            <h3 className="card-title">{cert.title}</h3>
            <div className="card-subtitle">
              {cert.issuer} • {cert.year}
            </div>
            <p className="card-description">{cert.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
