// context/AuthContext.jsx
// React Context providing global authentication state (user, token, login, logout) across the app.

import { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // On initial mount, verify if a token exists in localStorage and validate with backend
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('mydesk_token');
      const storedUser = localStorage.getItem('mydesk_user');

      if (storedToken && storedUser) {
        try {
          // Verify with backend /api/auth/me to confirm token is still valid
          const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          });

          if (response.ok) {
            const data = await response.json();
            setToken(storedToken);
            setUser(data.user);
          } else {
            // Token expired or invalid - clear localStorage
            localStorage.removeItem('mydesk_token');
            localStorage.removeItem('mydesk_user');
            setToken(null);
            setUser(null);
          }
        } catch (error) {
          console.warn('Could not reach backend during token verification, using cached user:', error);
          // Fallback to stored user so offline or local dev works smoothly
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  // Login handler
  const login = (newToken, newUser) => {
    localStorage.setItem('mydesk_token', newToken);
    localStorage.setItem('mydesk_user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem('mydesk_token');
    localStorage.removeItem('mydesk_user');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token && !!user,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for consuming auth context easily in components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
