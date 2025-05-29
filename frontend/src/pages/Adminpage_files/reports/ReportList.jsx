import React, { useState } from 'react';

const ReportList = ({ data }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'productName', direction: 'asc' });

  const sortData = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.key === 'productName') {
      const nameA = a?.productName || '';
      const nameB = b?.productName || '';
      return sortConfig.direction === 'asc'
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    }
    if (sortConfig.key === 'productPrice' || sortConfig.key === 'totalQuantity' || sortConfig.key === 'totalSales') {
      const valueA = a?.[sortConfig.key] || 0;
      const valueB = b?.[sortConfig.key] || 0;
      return sortConfig.direction === 'asc'
        ? valueA - valueB
        : valueB - valueA;
    }
    if (sortConfig.key === 'dateRange') {
      const rangeA = a?.dateRange || '';
      const rangeB = b?.dateRange || '';
      return sortConfig.direction === 'asc'
        ? rangeA.localeCompare(rangeB)
        : rangeB.localeCompare(rangeA);
    }
    return 0;
  });

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-center text-gray-500">No data to display</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Sticky header */}
      <div className="flex-none grid grid-cols-[2fr_1fr_1fr_2fr_1.5fr] px-4 py-3 font-bold text-gray-600 border-b border-gray-200 bg-white sticky top-0 z-10">
        <button 
          onClick={() => sortData('productName')}
          className="text-left hover:text-gray-800 cursor-pointer"
        >
          Product Name {sortConfig.key === 'productName' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
        </button>
        <button 
          onClick={() => sortData('productPrice')}
          className="text-left hover:text-gray-800 cursor-pointer"
        >
          Price {sortConfig.key === 'productPrice' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
        </button>
        <button 
          onClick={() => sortData('totalQuantity')}
          className="text-left hover:text-gray-800 cursor-pointer"
        >
          Total Quantity {sortConfig.key === 'totalQuantity' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
        </button>
        <button 
          className="text-left"
        >
          Date Range
        </button>
        <button 
          onClick={() => sortData('totalSales')}
          className="text-left hover:text-gray-800 cursor-pointer"
        >
          Total Sales {sortConfig.key === 'totalSales' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
        </button>
      </div>
      
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {sortedData.map((item) => (
          <div 
            key={item?._id || Math.random()} 
            className="grid grid-cols-[2fr_1fr_1fr_2fr_1.5fr] px-4 py-4 border-b border-gray-100 items-center min-h-[50px] bg-white text-sm hover:bg-gray-50"
          >
            <span className="break-words text-gray-800 cursor-pointer">{item?.productName || 'N/A'}</span>
            <span className="break-words text-gray-800 cursor-pointer">
              P{(item?.productPrice || 0).toFixed(2)}
            </span>
            <span className="break-words text-gray-800 cursor-pointer">{item?.totalQuantity || 0}</span>
            <span className="break-words text-gray-800 cursor-pointer">{item?.dateRange || 'All Time'}</span>
            <span className="break-words text-gray-800 cursor-pointer">
              P{(item?.totalSales || 0).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportList; 