import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ItemCard from '../components/ItemCard';
import { FaEgg } from "react-icons/fa6";
import { CiWheat } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import './Shop.css';
import axios from 'axios';

 

  
const Shop = ({cart,setCart}) => {

  const [items, setItems] = useState([]);
  const [poultryCount, setPoultryCount] = useState(0);
  const [wheatCount, setWheatCount] = useState(0);

  // Fetch items and then count
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/');
        const products = response.data;
        setItems(products);
        countItems(products); // count based on fetched data
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    };

    fetchItems();
  }, []);

  // Count logic based on category
  const countItems = (products) => {
    let poultry = 0;
    let wheat = 0;

    products.forEach((item) => {
      if (item.productType === 1) {
        poultry += item.productQuantity;
      } else if (item.productType === 2) {
        wheat += item.productQuantity;
      }
    });

    setPoultryCount(poultry);
    setWheatCount(wheat);
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

      <div className="foodCards">
        {items.map((item, index) => {
          const setCount = item.productType === 1 ? setPoultryCount : setWheatCount;
          const origCount = item.productType === 1 ? poultryCount : wheatCount;

          return (
            <ItemCard
              key={index}
              price={item.productPrice}
              name={item.productName}
              stock={origCount}
              category={item.productType}
              desc={item.productDescription}
              productId={item._id}
              quantity={item.productQuantity} // Pass product quantity
              setStock={setCount} // Pass the correct setter for count
              cart={cart}
              setCart={setCart} // Pass setCart
            />
          );
        })}
      </div>

    </div>
  );
};

export default Shop;
