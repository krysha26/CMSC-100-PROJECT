import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-white px-8 py-5 shadow-md font-sans">
      <div className="text-2xl font-bold tracking-wide">
        <span className="text-[#b6d53c]">an</span><span className="text-[#8c6239]">ico</span>
      </div>
      <ul className="flex gap-10 list-none">
        <li><a href="#" className="font-medium text-lg text-black underline">Shop</a></li>
        <li><a href="#" className="font-medium text-lg text-black">Cart</a></li>
        <li><a href="#" className="font-medium text-lg text-black">Orders</a></li>
      </ul>
      <div className="flex items-center gap-3">
        <span className="text-lg">User</span>
        <div className="w-8 h-8 bg-black rounded-full"></div>
      </div>
    </nav>
  );
};

export default Navbar; 