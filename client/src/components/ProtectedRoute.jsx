// components/ProtectedRoute.jsx
// Route wrapper that restricts access to authenticated students only.

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: 'inherit',
        color: '#64748b'
      }}>
        <p>Checking authentication status...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect unauthenticated students to login, preserving intended location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
