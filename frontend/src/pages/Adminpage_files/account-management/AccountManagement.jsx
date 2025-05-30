import React, { useState, useEffect } from 'react';
import AdminHeader from '../AdminHeader';
import AccountList from './AccountList';
import farmerImage from '../../../assets/img/farmer.jpg';
import farmerImage1 from '../../../assets/img/farmer1.jpg';
import farmerImage2 from '../../../assets/img/farmer2.jpg';
import farmerImage3 from '../../../assets/img/farmer3.webp';
import farmerImage4 from '../../../assets/img/farmer4.jpeg';
import farmerImage5 from '../../../assets/img/farmer5.avif';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-hot-toast';

const farmerImages = [
  farmerImage,
  farmerImage1,
  farmerImage2,
  farmerImage3,
  farmerImage4,
  farmerImage5
];

const AccountManagement = () => {
  const { auth } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log('Fetching accounts with token:', auth.accessToken);
        
        const response = await axios.get('https://anico-api.vercel.app/api/users', {
          headers: {
            'Authorization': `Bearer ${auth.accessToken}`
          }
        });
        
        console.log("Fetched users:", response.data);
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
        if (error.response?.status === 401) {
          setError('Please sign in to view accounts');
          toast.error('Please sign in to view accounts');
        } else if (error.response?.status === 403) {
          setError('You do not have permission to view accounts');
          toast.error('Access denied: Admin privileges required');
        } else {
          setError('Failed to fetch accounts');
          toast.error('Failed to fetch accounts');
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (auth.accessToken) {
      fetchAccounts();
    } else {
      setError('Please sign in to view accounts');
      setIsLoading(false);
    }
  }, [auth.accessToken]);

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

      const response = await axios.delete(`https://anico-api.vercel.app/api/users/${accountId}`, {
        headers: {
          'Authorization': `Bearer ${auth.accessToken}`
        }
      });

      if (response.status === 200) {
        const updatedAccounts = accounts.filter(acc => String(acc._id) !== String(accountId));
        console.log('Updated account list:', updatedAccounts);
        setAccounts(updatedAccounts);
        toast.success('Account deleted successfully');
      } else {
        console.warn(`Unexpected response status: ${response.status}`);
        toast.error('Failed to delete account');
      }
    } catch (error) {
      console.error(`Failed to delete account with ID ${accountId}:`, error);
      if (error.response?.status === 401) {
        toast.error('Please sign in to delete accounts');
      } else if (error.response?.status === 403) {
        toast.error('You do not have permission to delete accounts');
      } else {
        toast.error('Failed to delete account');
      }
    }
  };

  return (
    <div className="account-management-page min-h-screen">
      <AdminHeader name="Account Management" />
      <div className="content-area p-6 flex gap-6">
        {/* Account List Container */}
        <div className="w-2/3 bg-white rounded-lg border border-gray-200 p-6 h-[calc(100vh-180px)]">
          <AccountList accounts={accounts} onDeleteAccount={handleDeleteAccount} />
        </div>

        {/* Total Accounts Container */}
        <div className="w-1/3 relative rounded-lg overflow-hidden flex-shrink-0 h-[calc(100vh-180px)] shadow-md transform transition-all duration-300 ease-in-out hover:scale-101 hover:shadow-xl cursor-pointer">
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
              <p className="text-white text-sm mb-1 cursor-pointer">Total Users</p>
              <p className="text-white text-7xl font-bold cursor-pointer">{accounts.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;
