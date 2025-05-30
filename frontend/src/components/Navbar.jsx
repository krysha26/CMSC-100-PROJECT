import React from 'react';
import './navbar.css';
import anicoicon from '../assets/img/anico.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import Icons from './common/Icons';

const Navbar = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/signIn');
  };

  return (
    <nav className="navBar">
      <div className="logoPlace">
        <img src={anicoicon} alt="icon"/>
      </div>
      <div>
        <ul className="routePage">
          <li>
            <NavLink
              to="/shop"
              className={({ isActive }) => (isActive ? 'active-link' : 'not-active')}
            >
              Shop 
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) => (isActive ? 'active-link' : 'not-active')}
            >
              Cart 
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/orders"
              className={({ isActive }) => (isActive ? 'active-link' : 'not-active')}
            >
              Orders 
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="iconCont">
        {auth.accessToken && (
          <button 
            onClick={handleLogout}
            className="logout-button"
            title="Logout"
          >
            <Icons name="logout" size={24} color="#1A1A1A" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 