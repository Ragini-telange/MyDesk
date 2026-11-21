// pages/Home.jsx
// Homepage with project introduction, feature highlights, and navigation buttons.

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { API_BASE_URL } from '../config/api';

function Home() {
  const [backendStatus, setBackendStatus] = useState('Checking backend...');
  const [isOnline, setIsOnline] = useState(false);

  // Preserve Phase 1 check: probe backend health
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/health`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBackendStatus(`Online (${data.database.status} Database)`);
          setIsOnline(true);
        }
      })
      .catch(() => {
        setBackendStatus('Offline / Standalone mode');
        setIsOnline(false);
      });
  }, []);

  const features = [
    {
      title: 'Student Dashboard',
      desc: 'Track your daily productivity, coding milestones, and placement roadmap all in one centralized hub.',
      icon: '📊',
      path: '/dashboard'
    },
    {
      title: 'To-Do List & Planner',
      desc: 'Organize daily study routines, prioritize semester coursework, and manage interview deadlines.',
      icon: '📝',
      path: '/todo'
    },
    {
      title: 'DSA Practice Platform',
      desc: 'Solve approximately 100 hand-picked Data Structures and Algorithms questions categorized by difficulty and topic.',
      icon: '💻',
      path: '/dsa'
    },
    {
      title: 'MyDesk-to-GitHub Integration',
      desc: 'Directly commit and push your verified code solutions from MyDesk into your personal GitHub repositories.',
      icon: '🐙',
      path: '/github'
    },
    {
      title: 'Technical Interview Prep',
      desc: 'Prepare for campus placements with curated questions across Core CS subjects (DBMS, OS, CN, OOP) and System Design.',
      icon: '🎯',
      path: '/interview'
    }
  ];

  return (
    <div className="home-wrapper">
      <Navbar />

      <main className="home-main">
        {/* Hero Section */}
        <section className="hero-banner">
          <div className="hero-content">
            <div className="badge-pill">
              <span className="pulse-dot" style={{ backgroundColor: isOnline ? '#10b981' : '#f59e0b' }}></span>
              <span>Backend Status: {backendStatus}</span>
            </div>

            <h1 className="hero-headline">
              Your Complete Workspace for <span className="highlight">Productivity</span> & <span className="highlight">Placement Success</span>
            </h1>

            <p className="hero-subtext">
              <strong>MyDesk</strong> brings together task management, 100+ curated DSA coding challenges,
              one-click GitHub solution syncing, and comprehensive technical interview prep into one seamless platform.
            </p>

            <div className="hero-actions">
              <Link to="/dashboard" className="btn btn-primary btn-lg">
                Get Started →
              </Link>
              <Link to="/login" className="btn btn-outline btn-lg">
                Login
              </Link>
              <Link to="/register" className="btn btn-secondary btn-lg">
                Create Account
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Highlights Section */}
        <section className="features-section">
          <div className="section-header">
            <h2 className="section-title">Core Platform Features</h2>
            <p className="section-desc">
              Everything an engineering student needs to prepare for placements and stay organized.
            </p>
          </div>

          <div className="features-cards-grid">
            {features.map((feature, idx) => (
              <div key={idx} className="feature-box">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-box-title">{feature.title}</h3>
                <p className="feature-box-desc">{feature.desc}</p>
                <Link to={feature.path} className="feature-link">
                  Explore {feature.title} →
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>MyDesk &copy; {new Date().getFullYear()} - Student Productivity & Placement Preparation Platform</p>
      </footer>
    </div>
  );
}

export default Home;
