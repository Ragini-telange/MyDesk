import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State to store backend connection health response
  const [backendStatus, setBackendStatus] = useState('Checking backend connection...');
  const [dbStatus, setDbStatus] = useState('Checking...');
  const [isBackendOnline, setIsBackendOnline] = useState(false);

  // Check backend health on component mount using useEffect
  useEffect(() => {
    fetch('http://localhost:5000/api/health')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setBackendStatus(data.message);
          setDbStatus(data.database.status);
          setIsBackendOnline(true);
        } else {
          setBackendStatus('Backend responded with an error');
        }
      })
      .catch((error) => {
        console.error('Error connecting to backend:', error);
        setBackendStatus('Backend server is not running or unreachable');
        setDbStatus('Disconnected');
        setIsBackendOnline(false);
      });
  }, []);

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <header className="navbar">
        <div className="nav-brand">
          <span className="logo-text">MyDesk</span>
          <span className="badge">Phase 1</span>
        </div>
        <nav>
          <ul className="nav-links">
            <li><a href="#about" className="nav-link">About</a></li>
            <li><a href="#features" className="nav-link">Features</a></li>
            <li><a href="#status" className="nav-link">Status</a></li>
          </ul>
        </nav>
      </header>

      {/* Main Hero Section */}
      <main>
        <section id="about" className="hero-section">
          <h1 className="hero-title">
            Welcome to <span>MyDesk</span>
          </h1>
          <p className="hero-subtitle">
            A comprehensive student productivity and placement preparation platform.
            Empowering students to organize tasks, master DSA, and prepare for technical interviews.
          </p>

          {/* System Status Card */}
          <div id="status" className="status-card">
            <div className="status-card-header">
              <h3>System Status (Phase 1)</h3>
              <div className="status-indicator">
                <span
                  className="pulse-dot"
                  style={{ backgroundColor: isBackendOnline ? '#10b981' : '#ef4444' }}
                ></span>
                <span>{isBackendOnline ? 'Online' : 'Offline / Standalone'}</span>
              </div>
            </div>
            <div className="status-info">
              <p>
                <strong>Frontend:</strong> React + Vite (Port 5173) - Running
              </p>
              <p>
                <strong>Backend Server:</strong> Express.js (Port 5000) - {backendStatus}
              </p>
              <p>
                <strong>Database:</strong> MongoDB - {dbStatus}
              </p>
            </div>
          </div>
        </section>

        {/* Feature Roadmap Overview */}
        <section id="features" className="features-container">
          <h2 className="features-title">Planned Project Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-number">Feature 1</div>
              <h3>Student Dashboard</h3>
              <p>Personalized overview of practice progress, daily tasks, and upcoming goals.</p>
            </div>
            <div className="feature-card">
              <div className="feature-number">Feature 2</div>
              <h3>To-Do List & Planner</h3>
              <p>Structured daily schedule and academic task management system.</p>
            </div>
            <div className="feature-card">
              <div className="feature-number">Feature 3</div>
              <h3>DSA Practice Platform</h3>
              <p>Over 100 curated coding questions with direct code execution and test cases.</p>
            </div>
            <div className="feature-card">
              <div className="feature-number">Feature 4</div>
              <h3>MyDesk-to-GitHub</h3>
              <p>Push coding solutions directly to student personal GitHub repositories.</p>
            </div>
            <div className="feature-card">
              <div className="feature-number">Feature 5</div>
              <h3>Interview Preparation</h3>
              <p>Core CS subjects, system design basics, and technical interview questions.</p>
            </div>
            <div className="feature-card">
              <div className="feature-number">Feature 6</div>
              <h3>Chrome Extension</h3>
              <p>Quick access productivity tool seamlessly connected to the same backend.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>MyDesk Project &copy; {new Date().getFullYear()} - Built for Student Success</p>
      </footer>
    </div>
  );
}

export default App;
