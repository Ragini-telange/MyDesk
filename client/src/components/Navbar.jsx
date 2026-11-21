// components/Navbar.jsx
// Top Navigation Bar matching the professional SaaS design.
// Contains workspace status pill, theme toggle switch, and student profile dropdown.

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import MyDeskLogo from './MyDeskLogo';

function Navbar({ isWorkspace = false, onToggleMobileMenu }) {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Helper to extract student initials
  const getInitials = (name) => {
    if (!name) return 'RT';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <header className={`top-navbar ${isWorkspace ? 'workspace-navbar' : 'public-navbar'}`}>
      <div className="top-navbar-inner">
        {/* Left: Mobile menu toggle + Workspace status badge (workspace) or Brand logo (public) */}
        <div className="navbar-left-section">
          {isWorkspace ? (
            <div className="workspace-header-meta">
              <button
                type="button"
                className="mobile-menu-toggle-btn"
                onClick={onToggleMobileMenu}
                aria-label="Toggle Navigation Menu"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
              <div className="workspace-portal-badge">
                <span className="portal-badge-dot"></span>
                <span className="portal-badge-label">Student Workspace</span>
              </div>
            </div>
          ) : (
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <MyDeskLogo size={32} />
            </Link>
          )}
        </div>

        {/* Public navigation links when viewed outside workspace */}
        {!isWorkspace && (
          <nav className="public-nav-links">
            <Link to="/" className="public-nav-link">Home</Link>
            <Link to="/dashboard" className="public-nav-link">Dashboard</Link>
            <Link to="/dsa" className="public-nav-link">DSA Catalog</Link>
            <Link to="/interview" className="public-nav-link">Interview Prep</Link>
          </nav>
        )}

        {/* Right Section: Theme switch pill & Profile avatar pill */}
        <div className="navbar-right-section">
          {/* Theme switch pill with Sun & Moon icons */}
          <button
            type="button"
            onClick={toggleTheme}
            className={`theme-switch-pill ${theme === 'dark' ? 'is-dark' : 'is-light'}`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Dark / Light Theme"
          >
            <span className="theme-pill-icon sun-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            </span>
            <span className="theme-pill-icon moon-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </span>
            <span className="theme-pill-thumb"></span>
          </button>

          {/* Profile Badge Pill with Initials */}
          {isAuthenticated ? (
            <div className="profile-badge-relative">
              <button
                type="button"
                className="profile-avatar-pill"
                onClick={() => setProfileOpen((prev) => !prev)}
                aria-label="User Profile Menu"
              >
                <span className="profile-initials-circle">
                  {getInitials(user?.name)}
                </span>
                <span className="profile-name-text">
                  {user?.name?.split(' ')[0] || 'Student'}
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {profileOpen && (
                <div className="profile-dropdown-menu">
                  <div className="profile-dropdown-header">
                    <p className="dropdown-user-name">{user?.name || 'Student'}</p>
                    <p className="dropdown-user-email">{user?.email || ''}</p>
                  </div>
                  <div className="profile-dropdown-divider"></div>
                  <Link
                    to="/dashboard"
                    onClick={() => setProfileOpen(false)}
                    className="profile-dropdown-item"
                  >
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    to="/todo"
                    onClick={() => setProfileOpen(false)}
                    className="profile-dropdown-item"
                  >
                    <span>To-Do Planner</span>
                  </Link>
                  <Link
                    to="/github"
                    onClick={() => setProfileOpen(false)}
                    className="profile-dropdown-item"
                  >
                    <span>GitHub Sync</span>
                  </Link>
                  <div className="profile-dropdown-divider"></div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="profile-dropdown-item dropdown-logout-btn"
                  >
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="public-auth-actions">
              <Link to="/login" className="btn btn-outline btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
