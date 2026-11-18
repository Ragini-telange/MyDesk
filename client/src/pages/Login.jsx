// pages/Login.jsx
// Student Login page with form inputs and link to register.

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Login() {
  const navigate = useNavigate();

  // Local state for form inputs
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission (Phase 2 navigation placeholder)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setMessage('Please enter both email and password.');
      return;
    }

    // In Phase 2, we simulate successful client-side navigation to the dashboard
    setMessage('Login successful! Redirecting to dashboard...');
    setTimeout(() => {
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="auth-page-wrapper">
      <Navbar />

      <main className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <span className="auth-icon">🔐</span>
            <h2 className="auth-title">Welcome Back</h2>
            <p className="auth-subtitle">Sign in to your MyDesk student workspace</p>
          </div>

          {message && <div className="alert-box">{message}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">College / Personal Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="student@college.edu"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Sign In to MyDesk
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account yet?{' '}
              <Link to="/register" className="auth-link">
                Register here
              </Link>
            </p>
            <p className="auth-note">
              * Note: Backend authentication will be connected in Phase 3.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
