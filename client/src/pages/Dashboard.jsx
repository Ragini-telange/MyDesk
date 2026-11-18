// pages/Dashboard.jsx
// Main Student Dashboard displaying productivity overview and placeholders.

import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

function Dashboard() {
  return (
    <Layout>
      <div className="page-header">
        <div>
          <h1 className="page-title">Student Dashboard</h1>
          <p className="page-subtitle">Track your preparation metrics, daily tasks, and placement milestones.</p>
        </div>
        <div className="header-badge">
          <span>Academic Term 2026-27</span>
        </div>
      </div>

      {/* 1. Welcome Section & Student Profile Placeholder */}
      <section className="dashboard-card profile-banner-card">
        <div className="profile-banner-content">
          <div className="profile-avatar-large">👨‍🎓</div>
          <div className="profile-details">
            <h2 className="welcome-heading">Welcome back, Alex Sharma!</h2>
            <p className="profile-meta">
              Computer Science & Engineering &bull; 7th Semester &bull; Target: Software Development Engineer (SDE)
            </p>
            <div className="profile-quick-tags">
              <span className="tag">GPA: 8.7</span>
              <span className="tag">Daily Streak: 5 Days 🔥</span>
              <span className="tag">Active Target: Tech Placement 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Metrics Grid */}
      <section className="metrics-grid">
        {/* DSA Progress Placeholder */}
        <div className="dashboard-card metric-card">
          <div className="metric-header">
            <h3>DSA Practice Progress</h3>
            <span className="metric-icon">💻</span>
          </div>
          <div className="metric-body">
            <div className="progress-number">
              <span className="current-val">28</span>
              <span className="total-val">/ 100 Solved</span>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: '28%' }}></div>
            </div>
            <div className="progress-breakdown">
              <span className="badge-easy">Easy: 14</span>
              <span className="badge-medium">Medium: 11</span>
              <span className="badge-hard">Hard: 3</span>
            </div>
          </div>
          <div className="card-action">
            <Link to="/dsa" className="text-link">Open DSA Practice →</Link>
          </div>
        </div>

        {/* Pending Tasks Placeholder */}
        <div className="dashboard-card metric-card">
          <div className="metric-header">
            <h3>Today's Pending Tasks</h3>
            <span className="metric-icon">📝</span>
          </div>
          <div className="metric-body">
            <ul className="simple-task-list">
              <li>
                <span className="dot dot-high"></span>
                <span>Revise Binary Search Tree algorithms</span>
              </li>
              <li>
                <span className="dot dot-medium"></span>
                <span>DBMS: Normalization Forms (1NF to BCNF)</span>
              </li>
              <li>
                <span className="dot dot-low"></span>
                <span>Review resume for upcoming campus drive</span>
              </li>
            </ul>
          </div>
          <div className="card-action">
            <Link to="/todo" className="text-link">Manage All Tasks (4 remaining) →</Link>
          </div>
        </div>

        {/* Interview Preparation Progress Placeholder */}
        <div className="dashboard-card metric-card">
          <div className="metric-header">
            <h3>Interview Preparation</h3>
            <span className="metric-icon">🎯</span>
          </div>
          <div className="metric-body">
            <div className="subject-progress-list">
              <div className="subject-row">
                <span>Database Management (DBMS)</span>
                <span className="subject-stat">75%</span>
              </div>
              <div className="subject-row">
                <span>Operating Systems (OS)</span>
                <span className="subject-stat">60%</span>
              </div>
              <div className="subject-row">
                <span>Computer Networks (CN)</span>
                <span className="subject-stat">40%</span>
              </div>
              <div className="subject-row">
                <span>OOP & System Design</span>
                <span className="subject-stat">50%</span>
              </div>
            </div>
          </div>
          <div className="card-action">
            <Link to="/interview" className="text-link">Continue Revision →</Link>
          </div>
        </div>

        {/* GitHub Connection Status Placeholder */}
        <div className="dashboard-card metric-card">
          <div className="metric-header">
            <h3>GitHub Integration Status</h3>
            <span className="metric-icon">🐙</span>
          </div>
          <div className="metric-body">
            <div className="github-status-box">
              <span className="status-pill status-connected">
                ● Ready for Sync
              </span>
              <p className="github-repo-name">
                Target Repo: <strong>mydesk-dsa-solutions</strong>
              </p>
              <p className="github-desc">
                Your solved solutions will automatically sync to your personal GitHub repository.
              </p>
            </div>
          </div>
          <div className="card-action">
            <Link to="/github" className="text-link">Configure GitHub Sync →</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Dashboard;
