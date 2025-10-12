import React from "react";
import { Link } from "react-router-dom";
import './footer.css'

function Footer() {
  return (
    <div className="footer">
      <div className="footer-section">
        <Link to="/">
          <h2>JocodeHotel</h2>
          <a href="tel:+251962561350">+251 962 561 350</a>
        </Link>
        <p>&copy; 2024 All rights reserved</p>
      </div>

      <div className="footer-section">
        <h3>Useful Links</h3>
        <Link to="/register">Register</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/addmenu">Add Menu</Link>
      </div>

      <div className="footer-section">
        <h3>Contact Us</h3>
        <a
          href="https://josephteka.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Website
        </a>
        <a
          href="https://youtube.com/@jocode216"
          target="_blank"
          rel="noopener noreferrer"
        >
          YouTube
        </a>
        <a
          href="https://www.linkedin.com/in/josephteka/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}

export default Footer;
