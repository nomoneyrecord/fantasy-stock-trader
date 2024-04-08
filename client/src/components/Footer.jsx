import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        Created By: Gary Hughes Jr
        <div>
          <button
            className="footer-button"
            onClick={() => (window.location.href = "mailto:3rdeye.ghj@gmail.com")}
          >
            Contact
          </button>
        </div>
        <div>
          <button
            className="footer-button"
            onClick={() => window.open("https://garyhughesjr.netlify.app/")}
          >
            My Website
          </button>
        </div>
        <div>
          <button
            className="footer-button"
            onClick={() => window.open("https://github.com/nomoneyrecord")}
          >
            GitHub
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
