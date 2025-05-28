import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavBar from '../../components/admin/AdminNavBar';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen font-sans">
      <AdminNavBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main
        className={`
          flex-1
          p-6 md:p-8
          transition-all
          duration-300
          ease-in-out
          overflow-y-auto
          ${isSidebarOpen ? 'ml-60' : 'ml-17'}
        `}
      >
        {/* The Outlet will render the matched child route (Dashboard, Members, Fees) */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;