import './AdminHeader.css';
import { FaUser, FaShoppingCart, FaFileInvoiceDollar} from 'react-icons/fa';
import { TbLogout2 } from "react-icons/tb";
import { LuWheat } from "react-icons/lu";
import { NavLink } from 'react-router-dom';

function AdminHeader() {
  return (
    <div className="admin-header">
      <div className="admin-header-title">
        Account Management
      </div>
      <div className="admin-header-actions">
        <div className="admin-header-circle" />
        <div className="admin-header-circle" />
      </div>
    </div>
  );
}

export default AdminHeader; 