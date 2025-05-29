import React, { useState } from 'react';
import Icons from '../../../components/common/Icons';

const OrderList = ({ orders, onUpdateStatus }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'dateOrdered', direction: 'desc' });
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'pending', 'completed', 'canceled'

  const handleStatusFilter = () => {
    const statusOrder = ['all', 'pending', 'completed', 'canceled'];
    const currentIndex = statusOrder.indexOf(statusFilter);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    setStatusFilter(statusOrder[nextIndex]);
  };

  const sortOrders = (key) => {
    if (key === 'orderStatus') {
      handleStatusFilter();
      return;
    }
    
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedOrders = [...orders]
    .filter(order => {
      if (statusFilter === 'all') return true;
      if (statusFilter === 'pending') return order.orderStatus === 0;
      if (statusFilter === 'completed') return order.orderStatus === 1;
      if (statusFilter === 'canceled') return order.orderStatus === 2;
      return true;
    })
    .sort((a, b) => {
      if (sortConfig.key === 'orderQuantity' || sortConfig.key === 'orderStatus') {
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
      return sortConfig.direction === 'asc'
        ? a[sortConfig.key].localeCompare(b[sortConfig.key])
        : b[sortConfig.key].localeCompare(a[sortConfig.key]);
    });

  const renderStatus = (status) => {
    const statusMap = {
      0: { text: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
      1: { text: 'Completed', color: 'bg-green-100 text-green-800' },
      2: { text: 'Canceled', color: 'bg-red-100 text-red-800' }
    };
    const { text, color } = statusMap[status] || { text: 'Unknown', color: 'bg-gray-100 text-gray-800' };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
        {text}
      </span>
    );
  };

  const getStatusFilterIcon = () => {
    switch (statusFilter) {
      case 'all':
        return (
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full border border-gray-500"></span>
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
          </div>
        );
      case 'completed':
        return (
          <div className="flex items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
          </div>
        );
      case 'canceled':
        return (
          <div className="flex items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
          </div>
        );
      default:
        return (
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            <span className="w-2 h-2 rounded-full bg-red-400"></span>
          </div>
        );
    }
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

  if (!orders || orders.length === 0) {
    return <p className="text-center py-5">No orders to display.</p>;
  }

  return (
    <div className="flex flex-col h-full relative">
      {/* Sticky header */}
      <div className="grid grid-cols-[1fr_1.5fr_1fr_2fr_2fr_0.8fr] px-4 py-3 font-bold text-gray-600 border-b border-gray-200 bg-white sticky top-0 z-10">
        <button 
          onClick={() => sortOrders('orderStatus')}
          className="flex items-center space-x-2 text-left hover:text-gray-800"
        >
          {getStatusFilterIcon()}
          <span>Status</span>
        </button>
        <button 
          onClick={() => sortOrders('productId')}
          className="text-left hover:text-gray-800"
        >
          Product Name {sortConfig.key === 'productId' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
        </button>
        <button 
          onClick={() => sortOrders('orderQuantity')}
          className="text-left hover:text-gray-800"
        >
          Quantity {sortConfig.key === 'orderQuantity' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
        </button>
        <button 
          onClick={() => sortOrders('email')}
          className="text-left hover:text-gray-800"
        >
          Customer Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
        </button>
        <button 
          onClick={() => sortOrders('dateOrdered')}
          className="text-left hover:text-gray-800"
        >
          Date & Time {sortConfig.key === 'dateOrdered' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
        </button>
        <span className="text-left flex justify-end">Actions</span>
      </div>
      
      {/* Scrollable content */}
      <div className="overflow-y-auto flex-1">
        {filteredAndSortedOrders.map((order) => (
          <div 
            key={order._id} 
            className="grid grid-cols-[1fr_1.5fr_1fr_2fr_2fr_0.8fr] px-4 py-4 border-b border-gray-100 items-center min-h-[50px] bg-white text-sm hover:bg-gray-50"
          >
            <div>{renderStatus(order.orderStatus)}</div>
            <span className="break-words text-gray-800">{order.productId?.productName || 'N/A'}</span>
            <span className="break-words text-gray-800">{order.orderQuantity}</span>
            <span className="break-words text-gray-800">{order.email}</span>
            <span className="break-words text-gray-800">{formatDate(order.dateOrdered)}</span>
            <div className="flex justify-end">
              {order.orderStatus === 0 ? (
                <div className="flex space-x-2">
                  <button
                    onClick={() => onUpdateStatus(order._id, 1)}
                    className="inline-flex items-center px-2.5 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                    title="Mark order as completed"
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => onUpdateStatus(order._id, 2)}
                    className="inline-flex items-center px-2.5 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                    title="Cancel this order"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <span className={`text-sm ${order.orderStatus === 1 ? 'text-gray-400' : 'text-gray-400'}`}>
                  {order.orderStatus === 1 ? 'Completed' : 'Cancelled'}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;