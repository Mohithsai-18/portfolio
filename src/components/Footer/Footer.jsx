import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="contact">
      <div className="footer-content">
        <div className="footer-quote">
          "I believe strong engineering is not about tools — it’s about decisions made under constraints."
        </div>

        <div className="footer-divider"></div>

        <div className="footer-text">
          <p className="footer-cta">Let's build something amazing together</p>

          <p className="footer-contact">
            📧 mn3701@srmist.edu.in | ✉️ mohithsainadipi@gmail.com | 📱 +91 9553119756 |{" "}
            <a
              href="https://linkedin.com/in/mohith-sai1801"
              target="_blank"
              rel="noopener noreferrer"
            >
              💼 LinkedIn
            </a>{" "}
            |{" "}
            <a
              href="https://github.com/Mohithsai-18"
              target="_blank"
              rel="noopener noreferrer"
            >
              🐙 GitHub
            </a>{" "}
            |{" "}
            <a
              href="https://instagram.com/mohith_sai_06"
              target="_blank"
              rel="noopener noreferrer"
            >
              📸 Instagram
            </a>
          </p>

          <p className="footer-copyright">
            © 2026 Mohith Sai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

