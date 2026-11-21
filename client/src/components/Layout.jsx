// components/Layout.jsx
// Main layout wrapper for student portal pages (Dashboard, To-Do, DSA, Interview, GitHub).
// Matches the reference layout: Sidebar on the left, Top Navigation + Content on the right.

import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function Layout({ children }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="saas-app-layout">
      {/* Left Sidebar */}
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Backdrop for mobile drawer */}
      {mobileSidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Right Column: Top Navigation Bar + Main Content Area */}
      <div className="saas-main-wrapper">
        <Navbar
          isWorkspace={true}
          onToggleMobileMenu={() => setMobileSidebarOpen((prev) => !prev)}
        />
        <main className="saas-content-area">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
