import React, { useState } from 'react';

const ReportList = ({ orders }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'dateOrdered', direction: 'desc' });

  const sortOrders = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const formatDate = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const sortedOrders = [...orders].sort((a, b) => {
    if (sortConfig.key === 'orderQuantity') {
      return sortConfig.direction === 'asc' 
        ? a[sortConfig.key] - b[sortConfig.key]
        : b[sortConfig.key] - a[sortConfig.key];
    }
    if (sortConfig.key === 'dateOrdered') {
      const dateA = new Date(a.dateOrdered);
      const dateB = new Date(b.dateOrdered);
      return sortConfig.direction === 'asc' 
        ? dateA - dateB
        : dateB - dateA;
    }
    if (sortConfig.key === 'productId') {
      const productNameA = a.productId?.productName || '';
      const productNameB = b.productId?.productName || '';
      return sortConfig.direction === 'asc'
        ? productNameA.localeCompare(productNameB)
        : productNameB.localeCompare(productNameA);
    }
    if (sortConfig.key === 'sales') {
      const salesA = (a.productId?.productPrice || 0) * a.orderQuantity;
      const salesB = (b.productId?.productPrice || 0) * b.orderQuantity;
      return sortConfig.direction === 'asc'
        ? salesA - salesB
        : salesB - salesA;
    }
    return sortConfig.direction === 'asc'
      ? a[sortConfig.key].localeCompare(b[sortConfig.key])
      : b[sortConfig.key].localeCompare(a[sortConfig.key]);
  });

  if (!orders || orders.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-center text-gray-500">No orders to display</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Sticky header */}
      <div className="flex-none grid grid-cols-[2fr_1fr_2fr_2fr_1.5fr] px-4 py-3 font-bold text-gray-600 border-b border-gray-200 bg-white sticky top-0 z-10">
        <button 
          onClick={() => sortOrders('productId')}
          className="text-left hover:text-gray-800 cursor-pointer"
        >
          Product Name {sortConfig.key === 'productId' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
        </button>
        <button 
          onClick={() => sortOrders('orderQuantity')}
          className="text-left hover:text-gray-800 cursor-pointer"
        >
          Quantity {sortConfig.key === 'orderQuantity' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
        </button>
        <button 
          onClick={() => sortOrders('email')}
          className="text-left hover:text-gray-800 cursor-pointer"
        >
          Customer Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
        </button>
        <button 
          onClick={() => sortOrders('dateOrdered')}
          className="text-left hover:text-gray-800 cursor-pointer"
        >
          Date & Time {sortConfig.key === 'dateOrdered' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
        </button>
        <button 
          onClick={() => sortOrders('sales')}
          className="text-left hover:text-gray-800 cursor-pointer"
        >
          Sales {sortConfig.key === 'sales' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
        </button>
      </div>
      
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {sortedOrders.map((order) => {
          const sales = (order.productId?.productPrice || 0) * order.orderQuantity;
          
          return (
            <div 
              key={order._id} 
              className="grid grid-cols-[2fr_1fr_2fr_2fr_1.5fr] px-4 py-4 border-b border-gray-100 items-center min-h-[50px] bg-white text-sm hover:bg-gray-50"
            >
              <span className="break-words text-gray-800 cursor-pointer">{order.productId?.productName || 'N/A'}</span>
              <span className="break-words text-gray-800 cursor-pointer">{order.orderQuantity}</span>
              <span className="break-words text-gray-800 cursor-pointer">{order.email}</span>
              <span className="break-words text-gray-800 cursor-pointer">{formatDate(order.dateOrdered)}</span>
              <span className="break-words text-gray-800 cursor-pointer">P{sales.toFixed(2)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReportList; 