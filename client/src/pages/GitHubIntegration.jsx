// pages/GitHubIntegration.jsx
// Student GitHub OAuth connection, repository management, and solution synchronization status page (Phase 8).

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

function GitHubIntegration() {
  const { token } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [githubData, setGithubData] = useState({
    isConnected: false,
    username: '',
    avatarUrl: '',
    profileUrl: '',
    targetRepo: 'MyDesk-DSA-Solutions',
    targetBranch: 'main',
    connectedAt: null,
    lastSyncedAt: null,
    syncedCount: 0,
    failedCount: 0,
    unSyncedCount: 0
  });

  const [repos, setRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState('MyDesk-DSA-Solutions');
  const [isCreatingRepo, setIsCreatingRepo] = useState(false);
  const [newRepoName, setNewRepoName] = useState('MyDesk-DSA-Solutions');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // Get authentication header
  const getAuthHeaders = () => {
    const activeToken = token || localStorage.getItem('mydesk_token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${activeToken}`
    };
  };

  // Fetch GitHub connection status
  const fetchGitHubStatus = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/github/status', {
        headers: getAuthHeaders()
      });

      if (!res.ok) {
        throw new Error('Failed to fetch GitHub status');
      }

      const resJson = await res.json();
      if (resJson.success && resJson.isConnected && resJson.data) {
        setGithubData({
          isConnected: true,
          ...resJson.data
        });
        setSelectedRepo(resJson.data.targetRepo || 'MyDesk-DSA-Solutions');
        // If connected, fetch student's repositories
        fetchRepositories();
      } else {
        setGithubData({
          isConnected: false,
          username: '',
          avatarUrl: '',
          profileUrl: '',
          targetRepo: 'MyDesk-DSA-Solutions',
          targetBranch: 'main',
          syncedCount: 0,
          failedCount: 0,
          unSyncedCount: 0
        });
      }
    } catch (err) {
      console.error('Error fetching GitHub status:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch student's repositories from GitHub
  const fetchRepositories = async () => {
    try {
      setLoadingRepos(true);
      const res = await fetch('http://localhost:5000/api/github/repos', {
        headers: getAuthHeaders()
      });

      const resJson = await res.json();
      if (res.ok && resJson.success) {
        setRepos(resJson.repos || []);
      }
    } catch (err) {
      console.error('Error fetching repositories:', err);
    } finally {
      setLoadingRepos(false);
    }
  };

  // Handle URL parameters from OAuth callback redirect
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (query.get('connected') === '1') {
      setStatusMessage({
        type: 'success',
        text: '🎉 GitHub account connected successfully! Solutions will automatically sync on Accepted verdicts.'
      });
      // Clean query parameter from URL
      navigate('/github', { replace: true });
    } else if (query.get('error')) {
      const err = query.get('error');
      setStatusMessage({
        type: 'error',
        text: `⚠️ GitHub connection error: ${err.replace(/_/g, ' ')}`
      });
      navigate('/github', { replace: true });
    }

    fetchGitHubStatus();
  }, [location.search]);

  // Initiate GitHub OAuth flow
  const handleConnect = async () => {
    try {
      setIsSubmitting(true);
      const res = await fetch('http://localhost:5000/api/github/auth-url', {
        headers: getAuthHeaders()
      });

      const resJson = await res.json();
      if (!resJson.configured) {
        setStatusMessage({
          type: 'error',
          text: 'GitHub OAuth is not configured on the backend. Please add GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET to server/.env.'
        });
        setIsSubmitting(false);
        return;
      }

      if (resJson.success && resJson.authUrl) {
        // Redirect browser to GitHub OAuth authorization URL
        window.location.href = resJson.authUrl;
      } else {
        setStatusMessage({
          type: 'error',
          text: resJson.message || 'Could not initiate GitHub authorization.'
        });
        setIsSubmitting(false);
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: 'Failed to contact backend server for OAuth URL: ' + err.message
      });
      setIsSubmitting(false);
    }
  };

  // Disconnect GitHub account
  const handleDisconnect = async () => {
    if (!window.confirm('Are you sure you want to disconnect your GitHub account? Automatic solution synchronization will be paused.')) {
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch('http://localhost:5000/api/github/disconnect', {
        method: 'POST',
        headers: getAuthHeaders()
      });

      const resJson = await res.json();
      if (res.ok && resJson.success) {
        setStatusMessage({
          type: 'success',
          text: 'GitHub account disconnected successfully.'
        });
        fetchGitHubStatus();
      } else {
        setStatusMessage({
          type: 'error',
          text: resJson.message || 'Failed to disconnect account.'
        });
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: 'Error contacting backend: ' + err.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update target repository
  const handleSaveRepo = async (repoNameToSave) => {
    try {
      setIsSubmitting(true);
      const res = await fetch('http://localhost:5000/api/github/select-repo', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ repoName: repoNameToSave || selectedRepo })
      });

      const resJson = await res.json();
      if (res.ok && resJson.success) {
        setStatusMessage({
          type: 'success',
          text: `Target repository updated to '${resJson.targetRepo}'.`
        });
        fetchGitHubStatus();
      } else {
        setStatusMessage({
          type: 'error',
          text: resJson.message || 'Failed to update repository.'
        });
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: 'Error updating target repository: ' + err.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Create a new dedicated repository on GitHub
  const handleCreateRepo = async (e) => {
    e.preventDefault();
    if (!newRepoName.trim()) return;

    try {
      setIsSubmitting(true);
      const res = await fetch('http://localhost:5000/api/github/create-repo', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ repoName: newRepoName.trim() })
      });

      const resJson = await res.json();
      if (res.ok && resJson.success) {
        setStatusMessage({
          type: 'success',
          text: `🎉 Repository '${resJson.repo.name}' created successfully on your GitHub account!`
        });
        setIsCreatingRepo(false);
        fetchGitHubStatus();
      } else {
        setStatusMessage({
          type: 'error',
          text: resJson.message || 'Failed to create repository on GitHub.'
        });
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: 'Error creating repository: ' + err.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Batch sync past Accepted submissions
  const handleSyncAllAccepted = async () => {
    try {
      setIsSyncingAll(true);
      setStatusMessage({
        type: 'info',
        text: '🔄 Synchronizing past Accepted submissions to your GitHub repository...'
      });

      const res = await fetch('http://localhost:5000/api/github/sync-all', {
        method: 'POST',
        headers: getAuthHeaders()
      });

      const resJson = await res.json();
      if (res.ok && resJson.success) {
        setStatusMessage({
          type: 'success',
          text: `🎉 ${resJson.message}`
        });
        fetchGitHubStatus();
      } else {
        setStatusMessage({
          type: 'error',
          text: resJson.message || 'Failed to sync past submissions.'
        });
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: 'Error synchronizing submissions: ' + err.message
      });
    } finally {
      setIsSyncingAll(false);
    }
  };

  return (
    <Layout>
      <div className="page-header">
        <div>
          <h1 className="page-title">MyDesk-to-GitHub Integration</h1>
          <p className="page-subtitle">
            Automatically synchronize and showcase your verified DSA solutions directly inside your personal GitHub repository.
          </p>
        </div>
      </div>

      {statusMessage.text && (
        <div
          className={`alert-box ${
            statusMessage.type === 'success'
              ? 'alert-success'
              : statusMessage.type === 'error'
              ? 'alert-danger'
              : 'alert-info'
          }`}
          style={{ marginBottom: '1.25rem' }}
        >
          {statusMessage.text}
        </div>
      )}

      {/* GitHub Account Connection Card */}
      <section className="dashboard-card github-card">
        <div className="github-header-row">
          <div className="github-info-left">
            {githubData.isConnected && githubData.avatarUrl ? (
              <img
                src={githubData.avatarUrl}
                alt={githubData.username}
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  border: '2px solid #3b82f6'
                }}
              />
            ) : (
              <span className="github-big-icon" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--text-main)' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </span>
            )}
            <div>
              <h3>
                {githubData.isConnected ? `@${githubData.username}` : 'GitHub Account Connection'}
              </h3>
              <p className="github-sub">
                {githubData.isConnected
                  ? 'Your GitHub account is connected. Verified Accepted solutions are automatically synced.'
                  : 'Connect your personal GitHub profile to push verified DSA solutions automatically.'}
              </p>
            </div>
          </div>
          <div className="github-status-pill">
            <span
              className="pulse-dot"
              style={{ backgroundColor: githubData.isConnected ? '#10b981' : '#64748b' }}
            ></span>
            <span style={{ fontWeight: 600 }}>
              {githubData.isConnected ? `Connected: @${githubData.username}` : 'Not Connected'}
            </span>
          </div>
        </div>

        <div className="github-actions-row">
          {githubData.isConnected ? (
            <>
              <button
                type="button"
                onClick={handleDisconnect}
                disabled={isSubmitting}
                className="btn btn-outline"
                style={{ color: '#ef4444', borderColor: '#ef4444' }}
              >
                Disconnect GitHub
              </button>
              {githubData.profileUrl && (
                <a
                  href={githubData.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  View Profile ↗
                </a>
              )}
            </>
          ) : (
            <button
              type="button"
              onClick={handleConnect}
              disabled={isSubmitting || loading}
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>{isSubmitting ? 'Connecting...' : 'Connect GitHub Account'}</span>
            </button>
          )}

          <span className="github-note">
            * Uses official GitHub OAuth. Your token is encrypted at rest and never exposed to the browser.
          </span>
        </div>
      </section>

      {/* Target Repository Settings Card */}
      {githubData.isConnected && (
        <section className="dashboard-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <div>
              <h3 className="card-section-title" style={{ margin: 0 }}>⚙️ Target Repository Settings</h3>
              <p className="form-subtext" style={{ margin: 0 }}>
                Choose or create the repository where MyDesk should commit your solved DSA solutions.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsCreatingRepo(!isCreatingRepo)}
              className="btn btn-outline btn-sm"
            >
              {isCreatingRepo ? 'Cancel' : '+ Create Dedicated Repo'}
            </button>
          </div>

          {isCreatingRepo && (
            <form onSubmit={handleCreateRepo} style={{ background: 'var(--border-light)', padding: '1rem', borderRadius: '8px', marginBottom: '1.25rem', border: '1px solid var(--border-color)' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem' }}>Create New Repository on GitHub</h4>
              <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                MyDesk will initialize this repository with a root README explaining your placement practice journey.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  value={newRepoName}
                  onChange={(e) => setNewRepoName(e.target.value)}
                  placeholder="e.g. MyDesk-DSA-Solutions"
                  style={{ padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-main)', flex: 1, minWidth: '220px' }}
                />
                <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-sm">
                  {isSubmitting ? 'Creating...' : 'Create & Select'}
                </button>
              </div>
            </form>
          )}

          <div className="repo-settings-grid">
            <div className="form-group">
              <label htmlFor="repoSelect">Active Repository</label>
              {loadingRepos ? (
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Loading repositories from GitHub...</div>
              ) : repos.length > 0 ? (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <select
                    id="repoSelect"
                    value={selectedRepo}
                    onChange={(e) => setSelectedRepo(e.target.value)}
                    style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  >
                    {repos.map((r) => (
                      <option key={r.id} value={r.name}>
                        {r.name} {r.isPrivate ? '(Private)' : '(Public)'}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => handleSaveRepo(selectedRepo)}
                    disabled={isSubmitting || selectedRepo === githubData.targetRepo}
                    className="btn btn-primary btn-sm"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    value={selectedRepo}
                    onChange={(e) => setSelectedRepo(e.target.value)}
                    placeholder="MyDesk-DSA-Solutions"
                    style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveRepo(selectedRepo)}
                    disabled={isSubmitting}
                    className="btn btn-primary btn-sm"
                  >
                    Save
                  </button>
                </div>
              )}
              <span style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.25rem', display: 'block' }}>
                Target: <strong>{githubData.username}/{githubData.targetRepo}</strong> (Branch: {githubData.targetBranch})
              </span>
            </div>

            <div className="form-group">
              <label>Target Branch</label>
              <input type="text" value={githubData.targetBranch || 'main'} disabled className="input-disabled" />
            </div>

            <div className="form-group">
              <label>Clean Folder Structure</label>
              <input
                type="text"
                value="/{Topic}/{Problem-Title}.{ext}"
                disabled
                className="input-disabled"
              />
            </div>
          </div>
        </section>
      )}

      {/* Synchronization Status & Overview Card */}
      {githubData.isConnected && (
        <section className="dashboard-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <h3 className="card-section-title" style={{ margin: 0 }}>📊 Synchronization Overview</h3>
            {githubData.unSyncedCount > 0 && (
              <button
                type="button"
                onClick={handleSyncAllAccepted}
                disabled={isSyncingAll}
                className="btn btn-primary btn-sm"
              >
                {isSyncingAll ? '🔄 Syncing...' : `Sync ${githubData.unSyncedCount} Past Accepted Solution${githubData.unSyncedCount === 1 ? '' : 's'}`}
              </button>
            )}
          </div>

          <div className="metrics-grid" style={{ marginBottom: '1rem' }}>
            <div className="dashboard-card metric-card" style={{ padding: '1rem' }}>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Unique Solutions Synced</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#10b981' }}>{githubData.syncedCount}</div>
            </div>
            <div className="dashboard-card metric-card" style={{ padding: '1rem' }}>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Un-synced / Pending</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#f59e0b' }}>{githubData.unSyncedCount}</div>
            </div>
            <div className="dashboard-card metric-card" style={{ padding: '1rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Target Repository</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.4rem', wordBreak: 'break-all' }}>
                <a
                  href={`https://github.com/${githubData.username}/${githubData.targetRepo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--primary)', textDecoration: 'none' }}
                >
                  {githubData.targetRepo} ↗
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* How it Works Information Card */}
      <section className="dashboard-card info-card">
        <h3 className="card-section-title">💡 How MyDesk-to-GitHub Integration Works</h3>
        <div className="steps-flow">
          <div className="step-item">
            <div className="step-circle">1</div>
            <h4>Solve on MyDesk</h4>
            <p>Write, run, and pass sample and hidden test cases for any DSA problem on MyDesk.</p>
          </div>
          <div className="step-item">
            <div className="step-circle">2</div>
            <h4>Automatic Sync on Accepted</h4>
            <p>When your submission receives an Accepted verdict, MyDesk automatically uploads the solution file.</p>
          </div>
          <div className="step-item">
            <div className="step-circle">3</div>
            <h4>Detailed Documentation</h4>
            <p>MyDesk auto-generates a problem README with constraints, sample cases, and an index in your repository.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default GitHubIntegration;
