// pages/Register.jsx
// Student Registration page with input fields and validation.

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Register() {
  const navigate = useNavigate();

  // Local state for registration form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic frontend validations
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all the required fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    // In Phase 2, we simulate registration success and navigate to login
    setSuccess('Registration successful! Redirecting to login...');
    setTimeout(() => {
      navigate('/login');
    }, 700);
  };

  return (
    <div className="auth-page-wrapper">
      <Navbar />

      <main className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <span className="auth-icon">📝</span>
            <h2 className="auth-title">Create Account</h2>
            <p className="auth-subtitle">Join MyDesk to start your placement preparation</p>
          </div>

          {error && <div className="alert-box alert-error">{error}</div>}
          {success && <div className="alert-box alert-success">{success}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="e.g. Alex Sharma"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">College Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="alex@college.edu"
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
                placeholder="Create a password (min 6 characters)"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Create MyDesk Account
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Sign in here
              </Link>
            </p>
            <p className="auth-note">
              * Note: User records will be saved to MongoDB in Phase 3.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Register;
