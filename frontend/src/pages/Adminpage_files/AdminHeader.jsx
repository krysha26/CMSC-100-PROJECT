import React from 'react';
import Icons from '../../components/common/Icons'; 

const AdminHeader = ({ name }) => {
  return (
    <div className="flex items-center justify-between py-6 px-10 bg-transparent border-b "> 
      <div className="text-2xl font-semibold font-poppins text-[#23231e]"> 
        {name} {/* Use the name prop */}
      </div>
      <div className="flex gap-4"> 
        {/* <Icons name="user" size={40} color="#e2e1db" /> */}
        {/* <Icons name="user" size={40} color="#e2e1db" /> */}
      </div>
    </div>
  );
};

export default AdminHeader;