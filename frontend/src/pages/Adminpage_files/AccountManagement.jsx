import { useState } from 'react';
import axios from 'axios';
import './AccountManagement.css';
import AdminNavbar from './AdminNavbar';
import AdminHeader from './AdminHeader';

function AccountManagement() {
  return (
    <div className="adminpage-container">
      <div className="adminpage-navbar">
        <AdminNavbar/>
      </div>
      <div className="adminpage-content">
        <div className="adminpage-content-header">
            <AdminHeader/>
        </div>
        <div className="adminpage-content-container">

        </div>
      </div>
    </div>
  );
}

export default AccountManagement; 