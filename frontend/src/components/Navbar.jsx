  import React from 'react';
  import './navbar.css';
  import anicoicon from '../assets/img/anico.png';
  import { NavLink } from 'react-router-dom';
  import { FaCircleUser } from "react-icons/fa6";

  const Navbar = () => {
    
    return (
    <nav className = "navBar">
      <div className="logoPlace">
        <img src={anicoicon} alt="icon"/>
      </div>
      <div>
        <ul className="routePage">
         <li> <NavLink
          to="/shop"
          className={({ isActive }) => (isActive ? 'active-link' : 'not-active')} >
          Shop 
        </NavLink> </li>
          <li>  <NavLink
          to="/cart"
          className={({ isActive }) => (isActive ? 'active-link' : 'not-active')} >
          Cart 
        </NavLink> 
          </li> 
          <li href="#">Orders</li> {/*Add nav link */}
        </ul>

      </div>
      <div className = "iconCont">
        {/* <p>User</p> */}
        <FaCircleUser className="iconUser"/>
      </div>

    </nav>

    );
  };

  export default Navbar; 