import React from 'react';

const ItemCard = ({ price, name, stock, category }) => {
  return (
    <div className="bg-[#f4f3ef] rounded-xl shadow-md w-[220px] m-3 flex flex-col overflow-hidden transition-shadow">
      <div className="bg-gray-300 h-[140px] w-full rounded-t-xl" />
      <div className="bg-white px-4 pt-3 pb-4">
        <div className="text-[1.1rem] font-semibold mb-2 text-[#222]">{price}</div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-base font-medium text-[#222]">{name}</div>
            <div className="text-xs text-gray-500">{stock}</div>
          </div>
          <span className="bg-green-600 text-white text-sm px-3 py-1 rounded-md font-medium">{category}</span>
        </div>
      </div>
    </div>
  );
};

export default ItemCard; 