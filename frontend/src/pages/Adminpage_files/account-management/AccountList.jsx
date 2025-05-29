import React from 'react';
import Icons from '../../../components/common/Icons';

const AccountList = ({ accounts, onDeleteAccount }) => {
  if (!accounts || accounts.length === 0) {
    return <p className="text-center py-5">No accounts to display.</p>;
  }

  return (
    <div className="flex flex-col h-full relative">
      {/* Sticky header */}
      <div className="grid grid-cols-[2.5fr_2.5fr_1fr] px-4 py-3 font-bold text-gray-600 border-b border-gray-200 bg-white sticky top-0 z-10">
        <span>Name</span>
        <span>Email</span>
        <span className="text-left">Action</span>
      </div>
      
      {/* Scrollable content */}
      <div className="overflow-y-auto flex-1">
        {accounts.map((account) => (
          <div 
            key={account.id} 
            className="grid grid-cols-[2.5fr_2.5fr_1fr] px-4 py-4 border-b border-gray-100 items-center min-h-[50px] bg-white"
          >
            <span className="break-words text-gray-800">{account.name}</span>
            <span className="break-words text-gray-800">{account.email}</span>
            <button
              onClick={() => onDeleteAccount(account.id)}
              title="Delete Account"
              className="bg-transparent border-none cursor-pointer p-0 flex"
            >
              <Icons name="delete" size={20} color="#6c757d" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountList;