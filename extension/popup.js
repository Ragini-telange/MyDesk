// popup.js — MyDesk Chrome Extension Logic
// Plain JavaScript (no frameworks). Manifest V3.
//
// Architecture:
//   - Token is stored in chrome.storage.local (NOT localStorage — extensions
//     cannot access the website's localStorage from a different origin).
//   - Login calls POST /api/auth/login on the MyDesk Express backend.
//   - Dashboard data comes from GET /api/dashboard (JWT protected).
//   - Quick links open the MyDesk React app in a new tab using window.open()
//     (no "tabs" permission required for window.open from a popup).
//   - The API key / token is never shown in the UI, never logged to console
//     in production paths, and is cleared on logout.

'use strict';

// -----------------------------------------------------------------
// CONFIGURATION
// In development: points to local Express (5000) and Vite (5173).
// In production: switch mode to 'production' and set your live Render & Vercel URLs.
// -----------------------------------------------------------------
const ENV_CONFIG = {
  // Mode: 'development' | 'production'
  mode: 'development',
  development: {
    API_BASE: 'http://localhost:5000',
    APP_BASE: 'http://localhost:5173'
  },
  production: {
    API_BASE: 'https://mydesk-backend.onrender.com', // Replace with your live Render backend URL
    APP_BASE: 'https://mydesk.vercel.app'           // Replace with your live Vercel frontend URL
  }
};

const CURRENT_ENV = ENV_CONFIG[ENV_CONFIG.mode] || ENV_CONFIG.development;
const API_BASE = CURRENT_ENV.API_BASE;
const APP_BASE = CURRENT_ENV.APP_BASE;

// Keys used in chrome.storage.local
const STORAGE_TOKEN_KEY = 'mydesk_token';
const STORAGE_USER_KEY = 'mydesk_user';

// -----------------------------------------------------------------
// ELEMENT REFERENCES
// -----------------------------------------------------------------
const loadingView = document.getElementById('loading-view');
const loginView = document.getElementById('login-view');
const dashboardView = document.getElementById('dashboard-view');

const loginError = document.getElementById('login-error');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const loginBtn = document.getElementById('login-btn');

const userNameEl = document.getElementById('user-name');
const userEmailEl = document.getElementById('user-email');
const logoutBtn = document.getElementById('logout-btn');

const tasksCompletedEl = document.getElementById('tasks-completed');
const tasksTotalEl = document.getElementById('tasks-total');
const dsaSolvedEl = document.getElementById('dsa-solved');
const githubStatusEl = document.getElementById('github-status');

const openMydeskBtn = document.getElementById('open-mydesk-btn');

// -----------------------------------------------------------------
// VIEW HELPERS
// -----------------------------------------------------------------

/** Show exactly one view, hide the others. */
function showView(viewEl) {
  [loadingView, loginView, dashboardView].forEach(el => {
    el.classList.add('hidden');
  });
  viewEl.classList.remove('hidden');
}

/** Show or hide the login error box with a message. */
function showError(message) {
  loginError.textContent = message;
  loginError.classList.remove('hidden');
}

function clearError() {
  loginError.textContent = '';
  loginError.classList.add('hidden');
}

// -----------------------------------------------------------------
// STORAGE HELPERS
// -----------------------------------------------------------------

/** Read token and user from chrome.storage.local. Returns a Promise. */
function getStoredCredentials() {
  return new Promise((resolve) => {
    chrome.storage.local.get([STORAGE_TOKEN_KEY, STORAGE_USER_KEY], (result) => {
      resolve({
        token: result[STORAGE_TOKEN_KEY] || null,
        user: result[STORAGE_USER_KEY] || null
      });
    });
  });
}

/** Persist token and user object into chrome.storage.local. */
function saveCredentials(token, user) {
  return new Promise((resolve) => {
    chrome.storage.local.set(
      { [STORAGE_TOKEN_KEY]: token, [STORAGE_USER_KEY]: user },
      resolve
    );
  });
}

/** Remove token and user from chrome.storage.local. */
function clearCredentials() {
  return new Promise((resolve) => {
    chrome.storage.local.remove([STORAGE_TOKEN_KEY, STORAGE_USER_KEY], resolve);
  });
}

// -----------------------------------------------------------------
// API HELPERS
// -----------------------------------------------------------------

/**
 * Fetch a protected API endpoint.
 * Returns { ok: true, data } on success or { ok: false, status, message } on error.
 * Never throws — all errors are caught and returned.
 */
async function apiFetch(path, token, options = {}) {
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...(options.headers || {})
      }
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return { ok: false, status: response.status, message: data.message || 'Request failed' };
    }

    return { ok: true, data };
  } catch (err) {
    // Network error — backend probably not running
    return { ok: false, status: 0, message: 'Cannot reach MyDesk server. Is it running?' };
  }
}

// -----------------------------------------------------------------
// LOGIN
// -----------------------------------------------------------------

/**
 * Called when the user clicks "Sign In".
 * Calls POST /api/auth/login, stores the returned token + user,
 * then loads the dashboard.
 */
async function handleLogin() {
  clearError();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  // Basic client-side validation
  if (!email || !password) {
    showError('Please enter your email and password.');
    return;
  }

  loginBtn.disabled = true;
  loginBtn.textContent = 'Signing in…';

  try {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      // Invalid credentials or server error
      showError(data.message || 'Login failed. Please check your credentials.');
      return;
    }

    // Success — save credentials securely in chrome.storage.local
    const { token, user } = data;
    await saveCredentials(token, user);

    // Clear the password field immediately after login
    passwordInput.value = '';

    // Load the dashboard
    await loadDashboard(token, user);

  } catch (err) {
    showError('Cannot reach MyDesk server. Make sure the backend is running on port 5000.');
  } finally {
    loginBtn.disabled = false;
    loginBtn.textContent = 'Sign In';
  }
}

// -----------------------------------------------------------------
// LOGOUT
// -----------------------------------------------------------------

async function handleLogout() {
  await clearCredentials();
  // Reset login form
  emailInput.value = '';
  passwordInput.value = '';
  clearError();
  showView(loginView);
}

// -----------------------------------------------------------------
// DASHBOARD
// -----------------------------------------------------------------

/**
 * Fetch GET /api/dashboard and populate the dashboard view.
 * If the token is expired (401), clear storage and show login.
 */
async function loadDashboard(token, user) {
  // Show dashboard immediately with cached user name while data loads
  if (user) {
    userNameEl.textContent = user.name || 'Student';
    userEmailEl.textContent = user.email || '';
  }

  // Show dashboard view (stats will fill in once fetched)
  showView(dashboardView);

  // Fetch live stats from backend
  const result = await apiFetch('/api/dashboard', token);

  if (!result.ok) {
    if (result.status === 401) {
      // Token expired or invalid — force re-login
      await clearCredentials();
      showView(loginView);
      return;
    }

    // Server error — show partial dashboard with "unavailable" stats
    tasksCompletedEl.textContent = '—';
    tasksTotalEl.textContent = '—';
    dsaSolvedEl.textContent = '—';
    githubStatusEl.textContent = 'Server unavailable';
    return;
  }

  const { stats, student } = result.data;

  // Update user info from server response (more reliable than cached)
  if (student) {
    userNameEl.textContent = student.name || 'Student';
    userEmailEl.textContent = student.email || '';
  }

  // ---- Tasks ----
  if (stats && stats.tasks) {
    tasksCompletedEl.textContent = stats.tasks.completed ?? '0';
    tasksTotalEl.textContent = stats.tasks.total ?? '0';
  }

  // ---- DSA ----
  if (stats && stats.dsa) {
    dsaSolvedEl.textContent = stats.dsa.solvedCount ?? '0';
  }

  // ---- GitHub Sync ----
  if (stats && stats.githubSync) {
    const gh = stats.githubSync;
    if (gh.isConnected) {
      githubStatusEl.textContent =
        `@${gh.username} · ${gh.syncedCount} synced`;
    } else {
      githubStatusEl.textContent = 'Not connected';
    }
  }
}

// -----------------------------------------------------------------
// QUICK LINKS
// -----------------------------------------------------------------

/**
 * Open the MyDesk React app at the given path in a new browser tab.
 * window.open() works from extension popups without the "tabs" permission.
 */
function openAppPage(path) {
  window.open(`${APP_BASE}${path}`, '_blank');
}

// Attach click listeners to all quick-link buttons
document.querySelectorAll('.link-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const path = btn.dataset.path;
    if (path) openAppPage(path);
  });
});

// "Open MyDesk" button — opens the dashboard page
openMydeskBtn.addEventListener('click', () => openAppPage('/dashboard'));

// -----------------------------------------------------------------
// STARTUP — runs every time the popup is opened
// -----------------------------------------------------------------

/**
 * Entry point. Checks chrome.storage.local for a saved token.
 * - If found: validates it by calling the dashboard API.
 * - If not found or token is invalid: shows the login form.
 */
async function init() {
  showView(loadingView);

  const { token, user } = await getStoredCredentials();

  if (!token) {
    // No token stored — show login form
    showView(loginView);
    return;
  }

  // Token exists — verify it by hitting the dashboard endpoint
  const result = await apiFetch('/api/dashboard', token);

  if (!result.ok) {
    if (result.status === 401) {
      // Expired token — clear it and ask the user to log in again
      await clearCredentials();
      showView(loginView);
    } else {
      // Backend is unreachable but token exists — show dashboard with cached user
      // The user is not "logged out" just because the server is temporarily down
      showView(dashboardView);
      if (user) {
        userNameEl.textContent = user.name || 'Student';
        userEmailEl.textContent = user.email || '';
      }
      tasksCompletedEl.textContent = '—';
      tasksTotalEl.textContent = '—';
      dsaSolvedEl.textContent = '—';
      githubStatusEl.textContent = 'Server unavailable';
    }
    return;
  }

  // Token is valid — populate the dashboard from the response
  const { stats, student } = result.data;

  if (student) {
    userNameEl.textContent = student.name || 'Student';
    userEmailEl.textContent = student.email || '';
  }

  if (stats && stats.tasks) {
    tasksCompletedEl.textContent = stats.tasks.completed ?? '0';
    tasksTotalEl.textContent = stats.tasks.total ?? '0';
  }

  if (stats && stats.dsa) {
    dsaSolvedEl.textContent = stats.dsa.solvedCount ?? '0';
  }

  if (stats && stats.githubSync) {
    const gh = stats.githubSync;
    githubStatusEl.textContent = gh.isConnected
      ? `@${gh.username} · ${gh.syncedCount} synced`
      : 'Not connected';
  }

  showView(dashboardView);
}

// -----------------------------------------------------------------
// EVENT LISTENERS
// -----------------------------------------------------------------

// Login button
loginBtn.addEventListener('click', handleLogin);

// Allow pressing Enter in the password field to submit
passwordInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleLogin();
});

// Email field — pressing Enter moves focus to password
emailInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') passwordInput.focus();
});

// Logout button
logoutBtn.addEventListener('click', handleLogout);

// -----------------------------------------------------------------
// RUN
// -----------------------------------------------------------------
init();
