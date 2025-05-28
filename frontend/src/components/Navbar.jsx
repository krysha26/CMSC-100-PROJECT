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
          className={({ isActive }) => (isActive ? 'active-link' : '')} >
          Shop 
        </NavLink> </li>
          <li href="#">Cart</li> {/*Add nav link */}
          <li href="#">Orders</li>
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