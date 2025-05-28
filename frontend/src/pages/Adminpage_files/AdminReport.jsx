import React from 'react';
import AdminHeader from './AdminHeader';

const AdminReport = () => {
  return (
    <div className="admin-report-page min-h-screen">
      <AdminHeader name="Sales Report" />
      <div className="content-area p-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-medium text-[#333] mb-4">
            Sales Analytics
          </h2>
          <p className="text-gray-500">Sales report here</p>
        </div>
      </div>
    </div>
  );
};

export default AdminReport; 