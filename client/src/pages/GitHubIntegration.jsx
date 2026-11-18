// pages/GitHubIntegration.jsx
// MyDesk-to-GitHub Integration setup page (placeholder for Phase 5 real OAuth/PAT sync).

import { useState } from 'react';
import Layout from '../components/Layout';

function GitHubIntegration() {
  const [isConnected, setIsConnected] = useState(false);
  const [repoName, setRepoName] = useState('mydesk-dsa-solutions');
  const [statusMessage, setStatusMessage] = useState('');

  // Handle mock connect / disconnect button click
  const handleToggleConnect = () => {
    if (!isConnected) {
      setIsConnected(true);
      setStatusMessage('Connected successfully! Solutions solved in MyDesk will be staged for sync.');
    } else {
      setIsConnected(false);
      setStatusMessage('GitHub account disconnected.');
    }
  };

  return (
    <Layout>
      <div className="page-header">
        <div>
          <h1 className="page-title">MyDesk-to-GitHub Integration</h1>
          <p className="page-subtitle">
            Automatically save and showcase your verified DSA solutions directly inside your personal GitHub repository.
          </p>
        </div>
      </div>

      {/* GitHub Account Connection Card */}
      <section className="dashboard-card github-card">
        <div className="github-header-row">
          <div className="github-info-left">
            <span className="github-big-icon">🐙</span>
            <div>
              <h3>GitHub Account Sync</h3>
              <p className="github-sub">Connect your personal GitHub profile to push code commits.</p>
            </div>
          </div>
          <div className="github-status-pill">
            <span
              className="pulse-dot"
              style={{ backgroundColor: isConnected ? '#10b981' : '#64748b' }}
            ></span>
            <span>{isConnected ? 'Connected: alex-sharma-dev' : 'Not Connected'}</span>
          </div>
        </div>

        {statusMessage && (
          <div className={`alert-box ${isConnected ? 'alert-success' : ''}`}>
            {statusMessage}
          </div>
        )}

        <div className="github-actions-row">
          <button
            onClick={handleToggleConnect}
            className={`btn ${isConnected ? 'btn-danger' : 'btn-primary'}`}
          >
            {isConnected ? 'Disconnect GitHub' : 'Connect GitHub Account'}
          </button>
          <span className="github-note">
            * Note: Real GitHub OAuth authentication and repository push API will be implemented in Phase 5.
          </span>
        </div>
      </section>

      {/* Repository Setup Settings (Placeholder) */}
      <section className="dashboard-card">
        <h3 className="card-section-title">⚙️ Target Repository Settings</h3>
        <p className="form-subtext">Choose the repository where MyDesk should commit your solved DSA solutions.</p>

        <div className="repo-settings-grid">
          <div className="form-group">
            <label htmlFor="repoName">Repository Name</label>
            <input
              type="text"
              id="repoName"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              placeholder="e.g. mydesk-dsa-solutions"
            />
          </div>

          <div className="form-group">
            <label>Target Branch</label>
            <input type="text" value="main" disabled className="input-disabled" />
          </div>

          <div className="form-group">
            <label>Folder Structure</label>
            <input
              type="text"
              value="/solutions/{topic}/{question-name}.js"
              disabled
              className="input-disabled"
            />
          </div>
        </div>
      </section>

      {/* How it Works Information Card */}
      <section className="dashboard-card info-card">
        <h3 className="card-section-title">💡 How MyDesk-to-GitHub Integration Works</h3>
        <div className="steps-flow">
          <div className="step-item">
            <div className="step-circle">1</div>
            <h4>Solve on MyDesk</h4>
            <p>Write, run, and pass test cases for any DSA problem on MyDesk.</p>
          </div>
          <div className="step-item">
            <div className="step-circle">2</div>
            <h4>One-Click Push</h4>
            <p>Click "Push Solution to GitHub" right from the MyDesk code editor.</p>
          </div>
          <div className="step-item">
            <div className="step-circle">3</div>
            <h4>Automatic Commit</h4>
            <p>MyDesk creates a clean commit in your repository with problem description and verified code.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default GitHubIntegration;
