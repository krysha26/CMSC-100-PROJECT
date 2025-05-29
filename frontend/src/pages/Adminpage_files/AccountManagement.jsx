import React, { useState, useEffect } from 'react';
import AdminHeader from './AdminHeader';
import AccountList from './AccountList';
import farmerImage from '../../assets/img/farmer.jpg';
import farmerImage1 from '../../assets/img/farmer1.jpg';
import farmerImage2 from '../../assets/img/farmer2.jpg';
import farmerImage3 from '../../assets/img/farmer3.webp';
import farmerImage4 from '../../assets/img/farmer4.jpeg';
import farmerImage5 from '../../assets/img/farmer5.avif';
import axios from 'axios';

const farmerImages = [
  farmerImage,
  farmerImage1,
  farmerImage2,
  farmerImage3,
  farmerImage4,
  farmerImage5
];



const AccountManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/');
        console.log("Fetched users:", response.data);  // The data is in response.data
        setAccounts(response.data);  // Update the state with the fetched accounts
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, []);

  const changeToNextImage = () => {
    if (isTransitioning) return;
    const nextIndex = (currentImageIndex + 1) % farmerImages.length;
    setNextImageIndex(nextIndex);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex(nextIndex);
      setIsTransitioning(false);
    }, 600);
  };

  const changeToPrevImage = () => {
    if (isTransitioning) return;
    const prevIndex = currentImageIndex === 0 ? farmerImages.length - 1 : currentImageIndex - 1;
    setNextImageIndex(prevIndex);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex(prevIndex);
      setIsTransitioning(false);
    }, 600);
  };

  useEffect(() => {
    const autoplay = setInterval(() => {
      changeToNextImage();
    }, 3000);
    return () => clearInterval(autoplay);
  }, [currentImageIndex, isTransitioning]);

const handleDeleteAccount = async (accountId) => {
  try {
    console.log("Attempting to delete account with ID:", accountId);

    const response = await axios.delete(`http://localhost:5000/api/users/${accountId}`);

    if (response.status === 200) {
      const updatedAccounts = accounts.filter(acc => String(acc._id) !== String(accountId));
      console.log('Updated account list:', updatedAccounts);
      setAccounts(updatedAccounts);
    } else {
      console.warn(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Failed to delete account with ID ${accountId}:`, error);
  }
};





  return (
    <div className="account-management-page min-h-screen">
      <AdminHeader name="Account Management" />
      <div className="content-area p-6 flex gap-6">
        <div className="w-2/3 relative rounded-lg border border-gray-200 overflow-hidden flex-shrink-0 h-[calc(100vh-180px)]">
          <div className="account-list-card bg-white rounded-lg h-full">
            <h2 className="mt-0 mb-5 text-xl font-medium text-[#333] px-6 pt-6">Account List</h2>
            <div className="h-[calc(100%-80px)]">
              {/* Pass the accounts and the delete handler as props to AccountList */}
              <AccountList accounts={accounts} onDeleteAccount={handleDeleteAccount} />
            </div>
          </div>
        </div>

        <div className="w-1/3 relative rounded-lg overflow-hidden flex-shrink-0 h-[calc(100vh-180px)] shadow-md transform transition-all duration-300 ease-in-out hover:scale-101 hover:shadow-xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${farmerImages[currentImageIndex]})` }}
          ></div>
          <div
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-in-out ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url(${farmerImages[nextImageIndex]})` }}
          ></div>
          <div className="absolute inset-0 bg-green-800 opacity-45"></div>
          <div className="absolute inset-0 flex items-end justify-end p-6 z-10">
            <div className="text-right">
              <p className="text-white text-sm mb-1">Total Users</p>
              <p className="text-white text-7xl font-bold">{accounts.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;
