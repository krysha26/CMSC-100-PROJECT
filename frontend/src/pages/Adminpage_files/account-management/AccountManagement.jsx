import React, { useState, useEffect } from 'react';
import AdminHeader from '../AdminHeader';
import AccountList from './AccountList';
import farmerImage from '../../../assets/img/farmer.jpg';
import farmerImage1 from '../../../assets/img/farmer1.jpg'
import farmerImage2 from '../../../assets/img/farmer2.jpg'
import farmerImage3 from '../../../assets/img/farmer3.webp'
import farmerImage4 from '../../../assets/img/farmer4.jpeg'
import farmerImage5 from '../../../assets/img/farmer5.avif'

const farmerImages = [
  farmerImage,
  farmerImage1,
  farmerImage2,
  farmerImage3,
  farmerImage4,
  farmerImage5
];

// Sample initial data based on image_723cd5.png
const initialAccountsData = [
  { id: 'acc1', name: 'Justin Dayne Bryant Lunar Pena', email: 'jlpenal@up.edu.ph' },
  { id: 'acc2', name: 'Franz Saragena', email: 'fsaragena@up.edu.ph' },
  { id: 'acc3', name: 'Krysha Maceda', email: 'kmaceda@up.edu.ph' },
  { id: 'acc4', name: 'Christian Concordia', email: 'jlpenal@up.edu.ph' }, // Assuming IDs are unique
  { id: 'acc5', name: 'Koy Come Near Me', email: 'kme@up.edu.ph' },
  { id: 'acc6', name: 'Dummy User 6', email: 'dummy6@example.com' },
  { id: 'acc7', name: 'Dummy User 7', email: 'dummy7@example.com' },
  { id: 'acc8', name: 'Dummy User 8', email: 'dummy8@example.com' },
  { id: 'acc9', name: 'Dummy User 9', email: 'dummy9@example.com' },
  { id: 'acc10', name: 'Dummy User 10', email: 'dummy10@example.com' },
  { id: 'acc11', name: 'Dummy User 11', email: 'dummy11@example.com' },
  { id: 'acc12', name: 'Dummy User 12', email: 'dummy12@example.com' },
  { id: 'acc13', name: 'Dummy User 13', email: 'dummy13@example.com' },
  { id: 'acc14', name: 'Dummy User 14', email: 'dummy14@example.com' },
  { id: 'acc15', name: 'Dummy User 15', email: 'dummy15@example.com' },
  { id: 'acc16', name: 'Dummy User 16', email: 'dummy16@example.com' },
  { id: 'acc17', name: 'Dummy User 17', email: 'dummy17@example.com' },
  { id: 'acc18', name: 'Dummy User 18', email: 'dummy18@example.com' },
  { id: 'acc19', name: 'Dummy User 19', email: 'dummy19@example.com' },
  { id: 'acc20', name: 'Dummy User 20', email: 'dummy20@example.com' },
];

const AccountManagement = () => {
  const [accounts, setAccounts] = useState(initialAccountsData);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const changeToNextImage = () => {
    if (isTransitioning) return; // Prevent multiple transitions
    
    const nextIndex = currentImageIndex === farmerImages.length - 1 ? 0 : currentImageIndex + 1;
    setNextImageIndex(nextIndex);
    setIsTransitioning(true);
    
    // After crossfade completes, update current image and reset
    setTimeout(() => {
      setCurrentImageIndex(nextIndex);
      setIsTransitioning(false);
    }, 600); // Slightly longer than CSS transition to ensure completion
  };

  const changeToPrevImage = () => {
    if (isTransitioning) return; // Prevent multiple transitions
    
    const prevIndex = currentImageIndex === 0 ? farmerImages.length - 1 : currentImageIndex - 1;
    setNextImageIndex(prevIndex);
    setIsTransitioning(true);
    
    // After crossfade completes, update current image and reset
    setTimeout(() => {
      setCurrentImageIndex(prevIndex);
      setIsTransitioning(false);
    }, 600); // Slightly longer than CSS transition to ensure completion
  };

  const prevSlide = () => {
    changeToPrevImage();
  };

  const nextSlide = () => {
    changeToNextImage();
  };

  useEffect(() => {
    const autoplay = setInterval(() => {
      changeToNextImage();
    }, 3000);
    
    return () => clearInterval(autoplay);
  }, [currentImageIndex, isTransitioning]);

  const handleDeleteAccount = (accountId) => {
    setAccounts(prevAccounts => prevAccounts.filter(account => account.id !== accountId));
    // In a real application, you would also call an API to delete the account from the server.
    console.log(`Delete account with ID: ${accountId}`);
  };

  return (
    <div className="account-management-page min-h-screen">
      <AdminHeader name="Account Management" />
      <div className="content-area p-6 flex gap-6">

        <div className="w-2/3 relative rounded-lg border border-gray-200 overflow-hidden flex-shrink-0 h-[calc(100vh-180px)]">
          <div className="account-list-card bg-white rounded-lg h-full">
              <AccountList accounts={accounts} onDeleteAccount={handleDeleteAccount} />
          </div>
        </div>

        <div className="w-1/3 relative rounded-lg overflow-hidden flex-shrink-0 h-[calc(100vh-180px)] shadow-md transform transition-all duration-300 ease-in-out hover:scale-101 hover:shadow-xl">
          {/* Base Image Layer - Always visible when not transitioning */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${farmerImages[currentImageIndex]})`
            }}
          ></div>
          
          {/* Transition Image Layer - Only visible during transitions */}
          <div
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-in-out ${
              isTransitioning ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${farmerImages[nextImageIndex]})`
            }}
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