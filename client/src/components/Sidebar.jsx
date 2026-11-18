// components/Sidebar.jsx
// Sidebar navigation for student workspace sections.

import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/todo', label: 'To-Do & Planner', icon: '📝' },
    { path: '/dsa', label: 'DSA Practice', icon: '💻' },
    { path: '/interview', label: 'Interview Prep', icon: '🎯' },
    { path: '/github', label: 'GitHub Sync', icon: '🐙' },
  ];

  return (
    <aside className="sidebar">
      {/* Student Profile Card Placeholder */}
      <div className="sidebar-profile">
        <div className="avatar-placeholder">🎓</div>
        <div className="profile-info">
          <h4 className="student-name">Student Account</h4>
          <p className="student-role">Placement Aspirant</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-menu">
        <span className="sidebar-section-title">MAIN NAVIGATION</span>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${isActive ? 'active' : ''}`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Quick Phase Notice */}
      <div className="sidebar-footer">
        <p className="sidebar-footer-title">MyDesk v1.0</p>
        <p className="sidebar-footer-sub">Phase 2: Frontend Design</p>
      </div>
    </aside>
  );
}

export default Sidebar;
