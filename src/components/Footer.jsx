import React from 'react';
import './Footer.css'; // Custom CSS import yahan ho gayi

function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-logo">
        FASHION<span className="footer-logo-dot">.</span>
      </div>
      <p className="footer-text">
        © 2026 Fashion Blog. Powered by React & Contentful. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;