// components/Navbar.jsx
// Main navigation bar rendered at the top of pages.

import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  // Helper function to check if a route is currently active
  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand Logo & Tag */}
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">📚</span>
          <span className="brand-name">MyDesk</span>
          <span className="brand-tag">Student Hub</span>
        </Link>

        {/* Navigation Links */}
        <nav className="navbar-nav">
          <Link
            to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link
            to="/todo"
            className={`nav-link ${isActive('/todo') ? 'active' : ''}`}
          >
            To-Do
          </Link>
          <Link
            to="/dsa"
            className={`nav-link ${isActive('/dsa') ? 'active' : ''}`}
          >
            DSA Practice
          </Link>
          <Link
            to="/interview"
            className={`nav-link ${isActive('/interview') ? 'active' : ''}`}
          >
            Interview Prep
          </Link>
          <Link
            to="/github"
            className={`nav-link ${isActive('/github') ? 'active' : ''}`}
          >
            GitHub
          </Link>
        </nav>

        {/* User Auth Buttons / Links */}
        <div className="navbar-actions">
          <Link to="/login" className="btn btn-outline">
            Login
          </Link>
          <Link to="/register" className="btn btn-primary">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
