// components/Layout.jsx
// Main layout wrapper for student portal pages (Dashboard, To-Do, DSA, Interview, GitHub).

import Navbar from './Navbar';
import Sidebar from './Sidebar';

function Layout({ children }) {
  return (
    <div className="layout-root">
      <Navbar />
      <div className="layout-body">
        <Sidebar />
        <main className="layout-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
