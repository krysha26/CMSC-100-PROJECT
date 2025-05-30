import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ItemCard from '../components/ItemCard';
import { FaEgg } from "react-icons/fa6";
import { CiWheat } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import './Shop.css';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const Shop = ({cart, setCart}) => {
  const { auth } = useAuth();
  const [items, setItems] = useState([]);
  const [poultryCount, setPoultryCount] = useState(0);
  const [wheatCount, setWheatCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch items and then count
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await axios.get('https://anico-api.vercel.app/api/products/', {
          headers: auth.accessToken ? {
            'Authorization': `Bearer ${auth.accessToken}`
          } : {}
        });
        
        const products = response.data;
        setItems(products);
        countItems(products);
      } catch (error) {
        console.error('Failed to fetch items:', error);
        if (error.response?.status === 401) {
          setError('Please sign in to view products');
          toast.error('Please sign in to view products');
        } else {
          setError('Failed to fetch products');
          toast.error('Failed to fetch products');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [auth.accessToken]);

  // Count logic based on category
  const countItems = (products) => {
    let crop = 0;
    let poultry = 0;

    products.forEach((item) => {
      if (item.productType === 1) {
        crop += item.productQuantity;
      } else if (item.productType === 2) {
        poultry += item.productQuantity;
      }
    });

    setWheatCount(crop);
    setPoultryCount(poultry);
  };

  return (
    <div className="shopSection">
      <Navbar />
      <div className="foodSection">
        <div className="titleSection">
          <h3>Shop</h3>
          <div className="productSection">
            <div className="productItem">
              <FaEgg className="product" />
              <p>{poultryCount}</p>
            </div>
            <div className="productItem">
              <CiWheat className="product" />
              <p>{wheatCount}</p>
            </div>
            <button className="buttonRd">
              Filter
              <IoMdArrowDropdown />
            </button>
          </div>
        </div>
        <hr />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading products...</p>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <div className="foodCards">
          {items.map((item) => (
            <ItemCard
              key={item._id}
              price={item.productPrice}
              name={item.productName}
              stock={item.productType === 1 ? poultryCount : wheatCount}
              category={item.productType}
              desc={item.productDescription}
              productId={item._id}
              quantity={item.productQuantity}
              setStock={item.productType === 1 ? setPoultryCount : setWheatCount}
              cart={cart}
              setCart={setCart}
              photo={item.photo || "https://via.placeholder.com/206x200"}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
