// pages/Dashboard.jsx
// Functional Student Dashboard displaying real data fetched from the backend API.

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { token, logout } = useAuth();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to fetch real dashboard data from backend
  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Handle unauthenticated or expired token
      if (response.status === 401) {
        logout();
        return;
      }

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to load dashboard data.');
      }

      setDashboardData(data);
    } catch (err) {
      setError(err.message || 'Unable to connect to the backend server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [token]);

  // Helper function to format MongoDB ISO dates cleanly for students
  const formatJoinDate = (isoString) => {
    if (!isoString) return 'Recent';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // 1. Loading State
  if (loading) {
    return (
      <Layout>
        <div className="dashboard-loading-card">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading your student dashboard...</p>
        </div>
      </Layout>
    );
  }

  // 2. Error State with Retry Button
  if (error) {
    return (
      <Layout>
        <div className="dashboard-error-card">
          <span className="error-icon">⚠️</span>
          <h2>Unable to Load Dashboard</h2>
          <p className="error-message">{error}</p>
          <button onClick={fetchDashboardData} className="btn btn-primary">
            Retry Loading
          </button>
        </div>
      </Layout>
    );
  }

  const { student, stats } = dashboardData;

  return (
    <Layout>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Student Dashboard</h1>
          <p className="page-subtitle">
            Your centralized hub for academic productivity, DSA challenges, and placement preparation.
          </p>
        </div>
        <div className="header-badge">
          <span>Active Session</span>
        </div>
      </div>

      {/* 1. Student Profile & Account Info Section (Real Data from MongoDB) */}
      <section className="dashboard-card profile-banner-card">
        <div className="profile-banner-content">
          <div className="profile-avatar-large">👨‍🎓</div>
          <div className="profile-details">
            <h2 className="welcome-heading">Welcome back, {student.name}!</h2>
            <p className="profile-meta">
              <strong>Email:</strong> {student.email} &bull; <strong>Role:</strong> Student Account
            </p>
            <div className="profile-quick-tags">
              <span className="tag">📅 Member Since: {formatJoinDate(student.createdAt)}</span>
              <span className="tag">🛡️ Account Status: Verified</span>
              <span className="tag">🎯 Target: Campus Placement 2026-27</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Modules & Real Status Grid */}
      <section className="metrics-grid">
        {/* DSA Practice Platform Card */}
        <div className="dashboard-card metric-card">
          <div className="metric-header">
            <h3>DSA Practice Platform</h3>
            <span className="metric-icon">💻</span>
          </div>
          <div className="metric-body">
            <div className="progress-number">
              <span className="current-val">{stats.dsa.solvedCount}</span>
              <span className="total-val">/ {stats.dsa.totalCount} Solved</span>
            </div>
            <div className="progress-bar-container">
              <div
                className="progress-bar-fill"
                style={{ width: `${(stats.dsa.solvedCount / stats.dsa.totalCount) * 100}%` }}
              ></div>
            </div>
            <div className="module-status-box">
              <span className="status-pill status-empty">● {stats.dsa.status}</span>
              <p className="module-status-message">{stats.dsa.message}</p>
            </div>
          </div>
          <div className="card-action">
            <Link to="/dsa" className="text-link">
              Go to DSA Practice →
            </Link>
          </div>
        </div>

        {/* To-Do List & Planner Card */}
        <div className="dashboard-card metric-card">
          <div className="metric-header">
            <h3>To-Do List & Planner</h3>
            <span className="metric-icon">📝</span>
          </div>
          <div className="metric-body">
            <div className="progress-number">
              <span className="current-val">{stats.tasks.pending}</span>
              <span className="total-val">Pending ({stats.tasks.total} Total)</span>
            </div>
            <div className="progress-breakdown" style={{ marginBottom: '0.6rem' }}>
              <span className="badge-stat" style={{ padding: '0.15rem 0.5rem', fontSize: '0.78rem' }}>
                Completed: {stats.tasks.completed}
              </span>
              <span className="badge-stat pending" style={{ padding: '0.15rem 0.5rem', fontSize: '0.78rem' }}>
                Pending: {stats.tasks.pending}
              </span>
            </div>
            <div className="module-status-box">
              <span className={`status-pill ${stats.tasks.total > 0 && stats.tasks.pending === 0 ? 'status-connected' : 'status-empty'}`}>
                ● {stats.tasks.status}
              </span>
              <p className="module-status-message">{stats.tasks.message}</p>
            </div>
          </div>
          <div className="card-action">
            <Link to="/todo" className="text-link">
              Open Study Planner →
            </Link>
          </div>
        </div>

        {/* Technical Interview Prep Card */}
        <div className="dashboard-card metric-card">
          <div className="metric-header">
            <h3>Technical Interview Prep</h3>
            <span className="metric-icon">🎯</span>
          </div>
          <div className="metric-body">
            <div className="progress-number">
              <span className="current-val">5</span>
              <span className="total-val">Core Subjects</span>
            </div>
            <div className="module-status-box">
              <span className="status-pill status-empty">● {stats.interviewPrep.status}</span>
              <p className="module-status-message">{stats.interviewPrep.message}</p>
            </div>
          </div>
          <div className="card-action">
            <Link to="/interview" className="text-link">
              Start Interview Revision →
            </Link>
          </div>
        </div>

        {/* GitHub Integration Card */}
        <div className="dashboard-card metric-card">
          <div className="metric-header">
            <h3>GitHub Integration</h3>
            <span className="metric-icon">🐙</span>
          </div>
          <div className="metric-body">
            <div className="progress-number">
              <span className="current-val">0</span>
              <span className="total-val">Synced Repositories</span>
            </div>
            <div className="module-status-box">
              <span className="status-pill status-empty">● {stats.githubSync.status}</span>
              <p className="module-status-message">{stats.githubSync.message}</p>
            </div>
          </div>
          <div className="card-action">
            <Link to="/github" className="text-link">
              Configure GitHub Sync →
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Dashboard;
