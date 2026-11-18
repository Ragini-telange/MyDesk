// App.jsx
// Main router configuration linking all MyDesk pages.

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TodoList from './pages/TodoList';
import DsaPractice from './pages/DsaPractice';
import InterviewPrep from './pages/InterviewPrep';
import GitHubIntegration from './pages/GitHubIntegration';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student Workspace Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/todo" element={<TodoList />} />
        <Route path="/dsa" element={<DsaPractice />} />
        <Route path="/interview" element={<InterviewPrep />} />
        <Route path="/github" element={<GitHubIntegration />} />

        {/* Fallback route for unknown paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
