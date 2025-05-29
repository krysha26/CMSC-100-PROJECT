import React, { useState } from 'react';
import Icons from '../../../components/common/Icons';

const AccountList = ({ accounts, onDeleteAccount }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'fullName', direction: 'asc' });

  const sortAccounts = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  if (!accounts || accounts.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-center text-gray-500">No accounts to display</p>
      </div>
    );
  }

  const sortedAccounts = [...accounts].sort((a, b) => {
    if (sortConfig.key === 'fullName') {
      const nameA = `${a?.firstName || ''} ${a?.middleName ? a.middleName + ' ' : ''}${a?.lastName || ''}`.trim();
      const nameB = `${b?.firstName || ''} ${b?.middleName ? b.middleName + ' ' : ''}${b?.lastName || ''}`.trim();
      return sortConfig.direction === 'asc'
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    }
    
    // Handle email sorting with null checks
    const valueA = a?.[sortConfig.key] || '';
    const valueB = b?.[sortConfig.key] || '';
    return sortConfig.direction === 'asc'
      ? valueA.localeCompare(valueB)
      : valueB.localeCompare(valueA);
  });

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Sticky header */}
      <div className="flex-none grid grid-cols-[2.5fr_2.5fr_1fr] px-4 py-3 font-bold text-gray-600 border-b border-gray-200 bg-white sticky top-0 z-10">
        <button 
          onClick={() => sortAccounts('fullName')}
          className="text-left hover:text-gray-800 cursor-pointer"
        >
          Name {sortConfig.key === 'fullName' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
        </button>
        <button 
          onClick={() => sortAccounts('email')}
          className="text-left hover:text-gray-800 cursor-pointer"
        >
          Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
        </button>
        <span className="text-left">Action</span>
      </div>
      
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {sortedAccounts.map((account) => (
          <div
            key={account._id}
            className="grid grid-cols-[2.5fr_2.5fr_1fr] px-4 py-4 border-b border-gray-100 items-center min-h-[50px] bg-white text-sm hover:bg-gray-50"
          >
            <span className="break-words text-gray-800 cursor-pointer">
              {`${account.firstName} ${account.middleName ? account.middleName + ' ' : ''}${account.lastName}`}
            </span>
            <span className="break-words text-gray-800 cursor-pointer">{account.email}</span>
            <button
              onClick={() => onDeleteAccount(account._id)}
              title="Delete Account"
              className="bg-transparent border-none cursor-pointer p-0 flex hover:text-red-600 transition-colors"
            >
              <Icons name="delete" size={20} color="currentColor" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountList;
