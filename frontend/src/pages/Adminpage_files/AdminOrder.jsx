import React from 'react';
import AdminHeader from './AdminHeader';

const AdminOrder = () => {
  return (
    <div className="admin-order-page min-h-screen">
      <AdminHeader name="Order Management" />
      <div className="content-area p-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-medium text-[#333] mb-4">
            Order List
          </h2>
          <p className="text-gray-500">Order functionality here</p>
        </div>
      </div>
    </div>
  );
};

export default AdminOrder; 