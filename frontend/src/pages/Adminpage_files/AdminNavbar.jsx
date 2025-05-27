import './AdminNavbar.css';
import anicoLogo from '../../assets/img/ANICO_icon_admin.png';
import { FaUser, FaShoppingCart, FaFileInvoiceDollar} from 'react-icons/fa';
import { TbLogout2 } from "react-icons/tb";
import { LuWheat } from "react-icons/lu";
import { NavLink } from 'react-router-dom';

function AdminNavbar() {
  return (
    <div className="admin-navbar">
      <div className="admin-navbar-logo-section">
        <img src={anicoLogo} alt="anico logo" className="admin-navbar-logo" />
      </div>
      <nav className="admin-navbar-menu">
        <ul>
          <li>
            <NavLink to="/account-management" end className={({ isActive }) => isActive ? 'active' : ''}>
              <FaUser className="admin-navbar-icon" />
              <span>Account Management</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>
              <LuWheat className="admin-navbar-icon" />
              <span>Products</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" className={({ isActive }) => isActive ? 'active' : ''}>
              <FaShoppingCart className="admin-navbar-icon" />
              <span>Orders</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/sales-report" className={({ isActive }) => isActive ? 'active' : ''}>
              <FaFileInvoiceDollar className="admin-navbar-icon" />
              <span>Sales Report</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="admin-navbar-logout">
        <TbLogout2 className="admin-navbar-icon" />
        <span>Log out</span>
      </div>
    </div>
  );
}

export default AdminNavbar; 