import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icons from '../common/Icons';
import AnicoIcon from '../../assets/img/ANICO_icon-admin.png'; // Your image import

export const NavItem = ({ iconName, text, path, isActive, isOpen }) => (
  <Link
    to={path}
    className={`flex items-center h-10 text-md text-gray-100 hover:bg-white/5 rounded-l-2xl transition-colors duration-200
      ${isActive ? 'bg-white/5 font-semibold' : ''}
      ${isOpen ? 'px-14' : 'px-0 justify-center w-full rounded-2xl'}
    `}
    title={!isOpen ? text : ''}
  >
    <Icons name={iconName} size={20} color="white" className={isOpen ? "mr-3" : "mr-0"} />
    {isOpen && <span className="whitespace-nowrap">{text}</span>}
  </Link>
);

const AdminNavBar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const navItems = [
    {
      name: 'Accounts',
      iconName: 'accountManagement',
      path: '/admin/account-management'
    },
    {
      name: 'Products',
      iconName: 'products',
      path: '/admin/products'
    },
    {
      name: 'Orders',
      iconName: 'orders',
      path: '/admin/orders'
    },
    {
      name: 'Reports',
      iconName: 'salesReport',
      path: '/admin/reports'
    },
  ];

  const gradientStyle = "bg-linear-140 from-[#1A4D2E] via-[#256C36] to-[#47B261]";

  return (
    <div
      className={`
        ${gradientStyle}
        font-poppins
        text-white
        h-screen
        fixed
        left-0
        top-0
        z-50
        transition-all
        duration-300
        ease-in-out
        flex
        flex-col
        rounded-r-4xl
        ${isOpen ? 'w-60 shadow-lg' : 'w-17 shadow-md'}
      `}
    >
      <div className={`flex items-center ${isOpen ? 'justify-between' : 'justify-center'} p-6 py-10 h-20`}>
        {isOpen && (
          <img
            src={AnicoIcon}
            alt="ANICO Admin Logo"
            className="h-7 w-auto pl-10"
          />
        )}
        <button
          onClick={toggleSidebar}
          className="text-white cursor-pointer p-1"
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          <Icons name={isOpen ? 'close1' : 'menu'} size={20} color="white" />
        </button>
      </div>

      <nav className={`flex-grow pt-4 space-y-3 ${isOpen ? 'pl-3' : 'px-3 flex flex-col items-center'}`}>
        {navItems.map((item) => (
          <NavItem
            key={item.name}
            iconName={item.iconName}
            text={item.name}
            path={item.path}
            isOpen={isOpen}
            isActive={location.pathname === item.path || location.pathname.startsWith(item.path + '/')}
          />
        ))}
      </nav>
    </div>
  );
};

export default AdminNavBar;