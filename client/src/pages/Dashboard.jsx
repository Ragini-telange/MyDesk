// pages/Dashboard.jsx
// Final Professional SaaS Student Dashboard.
// Directly matches the layout, metrics, and components from the design reference.

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config/api';

function Dashboard() {
  const { token, logout } = useAuth();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showExtModal, setShowExtModal] = useState(false);

  // Fetch real dashboard data from backend
  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

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

  // Loading View
  if (loading) {
    return (
      <Layout>
        <div className="dashboard-loading-card">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading your dashboard...</p>
        </div>
      </Layout>
    );
  }

  // Error View with Retry
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
  const firstName = student?.name ? student.name.split(' ')[0] : 'Student';

  // Calculations for real progress metrics
  const taskProgressPct = stats.tasks.total > 0
    ? Math.round((stats.tasks.completed / stats.tasks.total) * 100)
    : 0;

  const dsaProgressPct = stats.dsa.totalCount > 0
    ? Math.round((stats.dsa.solvedCount / stats.dsa.totalCount) * 100)
    : 0;

  // SVG Circular Ring parameters
  const ringRadius = 42;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringStrokeOffset = ringCircumference - (dsaProgressPct / 100) * ringCircumference;

  return (
    <Layout>
      <div className="dashboard-grid-container">
        {/* ==========================================================
            LEFT / MAIN COLUMN (Welcome, 3 Stats, Quick Access, Goal)
        =========================================================== */}
        <div className="dashboard-main-column">

          {/* 1. Welcome Banner matching reference image */}
          <section className="welcome-hero-banner">
            <div className="welcome-hero-text">
              <h1 className="welcome-hero-title">
                Welcome back, <span className="welcome-name">{firstName}!</span>
              </h1>
              <p className="welcome-hero-subtitle">
                Your study journey, all in one place.
              </p>
              <Link to="/dsa" className="welcome-cta-btn">
                <span>Continue Learning</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>

            {/* Laptop & Plant SVG Illustration */}
            <div className="welcome-hero-graphic" aria-hidden="true">
              <svg width="220" height="150" viewBox="0 0 220 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Desk Surface Shadow */}
                <ellipse cx="110" cy="138" rx="85" ry="8" fill="rgba(8, 126, 139, 0.12)" />

                {/* Laptop Base */}
                <path d="M45 125L52 128H158L165 125H45Z" fill="#8FA0AF" />
                <rect x="52" y="126" width="106" height="3" rx="1.5" fill="#55B8C1" />

                {/* Laptop Screen / Lid (Angled) */}
                <rect x="56" y="44" width="98" height="82" rx="6" fill="#172B3A" />
                <rect x="60" y="48" width="90" height="74" rx="4" fill="#0E1823" />

                {/* MyDesk 'M' Logo on Laptop Screen */}
                <path d="M96 76L105 87L101.5 91.5L94 82V76H96Z" fill="#087E8B" />
                <path d="M114 76L105 87L108.5 91.5L116 82V76H114Z" fill="#55B8C1" />
                <path d="M105 80L110.5 87L105 94L99.5 87L105 80Z" fill="#55B8C1" />

                {/* Desk Plant Pot */}
                <ellipse cx="178" cy="132" rx="12" ry="3" fill="rgba(8, 126, 139, 0.15)" />
                <path d="M170 114L173 132H183L186 114H170Z" fill="var(--bg-card)" stroke="var(--border-color)" strokeWidth="1.5" />
                {/* Plant Leaves */}
                <path d="M178 114C175 102 165 96 163 94C165 104 175 110 178 114Z" fill="#10B981" />
                <path d="M178 114C180 100 190 95 193 92C191 103 182 110 178 114Z" fill="#059669" />
                <path d="M178 114C178 98 174 86 178 82C182 86 178 98 178 114Z" fill="#34D399" />
              </svg>
            </div>
          </section>

          {/* 2. Three Summary Progress Metric Cards */}
          <section className="dashboard-metrics-summary">
            {/* Card 1: Tasks Done */}
            <div className="summary-metric-card">
              <div className="metric-card-top">
                <div className="metric-icon-box teal-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div className="metric-info-text">
                  <span className="metric-title-label">Tasks Done</span>
                  <span className="metric-value-num">
                    {stats.tasks.completed} <span className="metric-value-total">/ {stats.tasks.total}</span>
                  </span>
                </div>
              </div>
              <div className="metric-mini-bar">
                <div className="mini-bar-fill teal-bar-fill" style={{ width: `${taskProgressPct}%` }}></div>
              </div>
            </div>

            {/* Card 2: DSA Solved */}
            <div className="summary-metric-card">
              <div className="metric-card-top">
                <div className="metric-icon-box purple-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <div className="metric-info-text">
                  <span className="metric-title-label">DSA Solved</span>
                  <span className="metric-value-num">
                    {stats.dsa.solvedCount} <span className="metric-value-total">/ {stats.dsa.totalCount}</span>
                  </span>
                </div>
              </div>
              <div className="metric-mini-bar">
                <div className="mini-bar-fill purple-bar-fill" style={{ width: `${dsaProgressPct}%` }}></div>
              </div>
            </div>

            {/* Card 3: GitHub Sync */}
            <div className="summary-metric-card">
              <div className="metric-card-top">
                <div className="metric-icon-box dark-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </div>
                <div className="metric-info-text">
                  <span className="metric-title-label">GitHub Sync</span>
                  <span className="metric-value-num">
                    {stats.githubSync?.syncedCount || 0} <span className="metric-value-total">Solutions</span>
                  </span>
                </div>
              </div>
              <div className="metric-mini-bar">
                <div
                  className="mini-bar-fill dark-bar-fill"
                  style={{ width: stats.githubSync?.isConnected ? '100%' : '0%' }}
                ></div>
              </div>
            </div>
          </section>

          {/* 3. Quick Access Grid matching reference image */}
          <section className="quick-access-section">
            <div className="section-title-row">
              <h2 className="section-heading-text">Quick Access</h2>
              <Link to="/dsa" className="section-action-link">
                <span>Explore all</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>

            <div className="quick-access-grid">
              {/* 1. To-Do Planner */}
              <Link to="/todo" className="quick-card">
                <div className="quick-card-left">
                  <div className="quick-icon-wrapper teal-light-bg">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                      <path d="M9 14l2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="quick-card-title">To-Do Planner</h3>
                    <p className="quick-card-sub">Organize your tasks</p>
                  </div>
                </div>
                <div className="quick-arrow-circle">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </Link>

              {/* 2. DSA Practice */}
              <Link to="/dsa" className="quick-card">
                <div className="quick-card-left">
                  <div className="quick-icon-wrapper purple-light-bg">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="quick-card-title">DSA Practice</h3>
                    <p className="quick-card-sub">Solve 100+ questions</p>
                  </div>
                </div>
                <div className="quick-arrow-circle">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </Link>

              {/* 3. Interview Prep */}
              <Link to="/interview" className="quick-card">
                <div className="quick-card-left">
                  <div className="quick-icon-wrapper cyan-light-bg">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="quick-card-title">Interview Prep</h3>
                    <p className="quick-card-sub">Get ready for placements</p>
                  </div>
                </div>
                <div className="quick-arrow-circle">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </Link>

              {/* 4. GitHub Integration */}
              <Link to="/github" className="quick-card">
                <div className="quick-card-left">
                  <div className="quick-icon-wrapper dark-light-bg">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="quick-card-title">GitHub Integration</h3>
                    <p className="quick-card-sub">Sync your solutions</p>
                  </div>
                </div>
                <div className="quick-arrow-circle">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </Link>

              {/* 5. Chrome Extension */}
              <div
                className="quick-card clickable-cursor"
                onClick={() => setShowExtModal(true)}
                role="button"
                tabIndex={0}
              >
                <div className="quick-card-left">
                  <div className="quick-icon-wrapper purple-badge-bg">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="quick-card-title">Chrome Extension</h3>
                    <p className="quick-card-sub">Access MyDesk anywhere</p>
                  </div>
                </div>
                <div className="quick-arrow-circle">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>

              {/* 6. View Progress */}
              <Link to="/dsa" className="quick-card">
                <div className="quick-card-left">
                  <div className="quick-icon-wrapper mint-light-bg">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="20" x2="18" y2="10" />
                      <line x1="12" y1="20" x2="12" y2="4" />
                      <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="quick-card-title">View Progress</h3>
                    <p className="quick-card-sub">Track your performance</p>
                  </div>
                </div>
                <div className="quick-arrow-circle">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </Link>
            </div>
          </section>

          {/* 4. Placement Motivation Banner matching reference footer */}
          <section className="placement-goal-banner">
            <div className="goal-banner-left">
              <div className="goal-target-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <div className="goal-text-content">
                <h3 className="goal-banner-title">Your Placement Goal is Near!</h3>
                <p className="goal-banner-sub">Keep practicing and improving your skills.</p>
              </div>
            </div>
            <Link to="/dsa" className="goal-banner-btn">
              <span>Start DSA</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </section>

        </div>

        {/* ==========================================================
            RIGHT SIDEBAR PANEL (Progress Ring, Sub-stats, Activity)
        =========================================================== */}
        <aside className="dashboard-right-panel">

          {/* Your Progress Card with Circular Progress Ring */}
          <div className="saas-panel-card progress-ring-card">
            <div className="panel-card-header">
              <h3 className="panel-card-title">Your Progress</h3>
              <Link to="/dsa" className="panel-card-link">
                <span>View Details</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>

            <div className="progress-ring-row">
              {/* Circular SVG Progress Meter */}
              <div className="circular-progress-wrapper">
                <svg width="104" height="104" viewBox="0 0 104 104" className="circular-svg">
                  <circle
                    cx="52"
                    cy="52"
                    r={ringRadius}
                    className="circular-bg-ring"
                    strokeWidth="9"
                    fill="none"
                  />
                  <circle
                    cx="52"
                    cy="52"
                    r={ringRadius}
                    className="circular-fill-ring"
                    strokeWidth="9"
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={ringStrokeOffset}
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
                <div className="circular-center-text">
                  <span className="circular-percent">{dsaProgressPct}%</span>
                </div>
              </div>

              {/* Progress Summary Text */}
              <div className="progress-ring-info">
                <span className="ring-info-label">DSA Solved</span>
                <span className="ring-info-count">
                  {stats.dsa.solvedCount} <span className="ring-info-total">/ {stats.dsa.totalCount}</span>
                </span>
                <span className="ring-status-pill">
                  {stats.dsa.solvedCount > 0 ? `${stats.dsa.solvedCount} Solved` : 'Getting Started'}
                </span>
              </div>
            </div>

            {/* Sub-Metrics: Rank & Streak */}
            <div className="sub-metrics-row">
              <div className="sub-metric-pill" title="Student ranking is not yet calculated">
                <span className="sub-metric-icon trophy-icon">🏆</span>
                <div>
                  <span className="sub-pill-label">Rank</span>
                  <span className="sub-pill-val rank-empty-state">
                    {stats?.rank ? `#${stats.rank}` : 'Not ranked yet'}
                  </span>
                </div>
              </div>

              <div className="sub-metric-pill">
                <span className="sub-metric-icon fire-icon">🔥</span>
                <div>
                  <span className="sub-pill-label">Streak</span>
                  <span className="sub-pill-val">
                    {stats.dsa.solvedCount > 0 ? 'Active' : '0 days'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Card matching reference image */}
          <div className="saas-panel-card recent-activity-card">
            <div className="panel-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="activity-wave-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </span>
                <h3 className="panel-card-title">Recent Activity</h3>
              </div>
            </div>

            {/* Vertical Activity Timeline */}
            <div className="activity-timeline">
              {/* Item 1: DSA Practice */}
              <div className="timeline-item">
                <div className="timeline-dot-connector">
                  <span className="timeline-dot"></span>
                  <span className="timeline-line"></span>
                </div>
                <div className="timeline-content">
                  <p className="timeline-title">
                    {stats.dsa.solvedCount > 0 ? 'Completed DSA Problem' : 'Practicing in DSA Workspace'}
                  </p>
                  <span className="timeline-time">
                    {stats.dsa.solvedCount > 0 ? 'Recent submission' : 'Ready to start'}
                  </span>
                </div>
              </div>

              {/* Item 2: To-Do Planner */}
              <div className="timeline-item">
                <div className="timeline-dot-connector">
                  <span className="timeline-dot"></span>
                  <span className="timeline-line"></span>
                </div>
                <div className="timeline-content">
                  <p className="timeline-title">
                    {stats.tasks.total > 0
                      ? `${stats.tasks.completed} of ${stats.tasks.total} Tasks Done`
                      : 'Create daily study tasks'}
                  </p>
                  <span className="timeline-time">
                    {stats.tasks.pending > 0 ? `${stats.tasks.pending} pending tasks` : 'All tasks up to date'}
                  </span>
                </div>
              </div>

              {/* Item 3: GitHub Sync */}
              <div className="timeline-item">
                <div className="timeline-dot-connector">
                  <span className="timeline-dot"></span>
                </div>
                <div className="timeline-content">
                  <p className="timeline-title">
                    {stats.githubSync?.isConnected ? 'Synced to GitHub' : 'GitHub Integration'}
                  </p>
                  <span className="timeline-time">
                    {stats.githubSync?.isConnected
                      ? `${stats.githubSync.syncedCount} solutions committed`
                      : 'Connect your account to sync'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Student Profile Overview Card */}
          <div className="saas-panel-card student-overview-card">
            <div className="student-profile-header">
              <div className="student-avatar-badge">
                {firstName.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h4 className="student-full-name">{student.name}</h4>
                <p className="student-email-text">{student.email}</p>
              </div>
            </div>
            <div className="student-status-tag-row">
              <span className="status-micro-tag">Placement 2026-27</span>
              <span className="status-micro-tag verified-tag">Verified Student</span>
            </div>
          </div>

        </aside>
      </div>

      {/* Chrome Extension Information Modal */}
      {showExtModal && (
        <div className="modal-backdrop-overlay" onClick={() => setShowExtModal(false)}>
          <div className="saas-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span className="modal-icon-badge">🧩</span>
                <h3 className="modal-title-text">MyDesk Chrome Extension</h3>
              </div>
              <button
                type="button"
                className="modal-close-icon-btn"
                onClick={() => setShowExtModal(false)}
                aria-label="Close Modal"
              >
                &times;
              </button>
            </div>
            <div className="modal-body-content">
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1rem', lineHeight: 1.6 }}>
                The official MyDesk Chrome Extension lets you monitor tasks, view DSA question counters, and navigate directly into your workspace from any browser tab!
              </p>
              <div className="ext-instructions-box">
                <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  Quick Installation (Unpacked):
                </h4>
                <ol style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  <li>Open <code>chrome://extensions/</code> in Google Chrome.</li>
                  <li>Enable <strong>Developer Mode</strong> in the top right.</li>
                  <li>Click <strong>Load unpacked</strong> and select the <code>MyDesk/extension</code> folder.</li>
                  <li>Sign in with your MyDesk credentials to access live stats!</li>
                </ol>
              </div>
            </div>
            <div className="modal-footer-row">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => setShowExtModal(false)}
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Dashboard;
