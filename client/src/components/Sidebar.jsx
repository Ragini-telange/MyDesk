// components/Sidebar.jsx
// Sidebar navigation for student workspace sections with live user profile and logout.

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/todo', label: 'To-Do & Planner', icon: '📝' },
    { path: '/dsa', label: 'DSA Practice', icon: '💻' },
    { path: '/interview', label: 'Interview Prep', icon: '🎯' },
    { path: '/github', label: 'GitHub Sync', icon: '🐙' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      {/* Student Profile Card (Dynamic user information from AuthContext) */}
      <div className="sidebar-profile">
        <div className="avatar-placeholder">🎓</div>
        <div className="profile-info">
          <h4 className="student-name">{user?.name || 'Student Account'}</h4>
          <p className="student-role">{user?.email || 'Placement Aspirant'}</p>
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

      {/* Logout Action & Phase Info */}
      <div className="sidebar-footer">
        <button
          onClick={handleLogout}
          className="btn btn-outline btn-sm btn-block"
          style={{ marginBottom: '0.75rem', color: 'var(--danger-text)', borderColor: '#fecaca' }}
        >
          🚪 Sign Out
        </button>
        <p className="sidebar-footer-title">MyDesk v1.0</p>
        <p className="sidebar-footer-sub">Phase 3: Auth Active</p>
      </div>
    </aside>
  );
}

export default Sidebar;
