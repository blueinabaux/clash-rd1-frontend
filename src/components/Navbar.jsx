import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" className="nav-logo">
          CLASH
        </Link>
        <div className="nav-links">
          <Link to="/leaderboard" className="nav-link">LEADERBOARD</Link>
          <Link to="/about" className="nav-link">ABOUT</Link>
          <Link to="/login" className="nav-button">LOGIN</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 