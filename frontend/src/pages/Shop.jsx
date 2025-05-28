import React from 'react';
import Navbar from '../components/Navbar';
import ItemCard from '../components/ItemCard';
import { FaEgg } from "react-icons/fa6";
import { CiWheat } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from 'react';
import './Shop.css';



const items = Array(8).fill({
  price: 'PXXX.XX',
  name: 'Product Name',
  stock: 'Stock: xxxx',
  category: 'Poultry',
});

const Shop = () => {
  const [poultryCount,setpoultryCount] = useState(0); // For poultry number initialize to 0
  const [wheatCount,setwheatCount] = useState(0); // For wheat number initialize to 0
  return (
    <div class="shopSection">
      <Navbar />
      <div class="foodSection">
        <div class ="titleSection">
        <h3>Shop</h3>
        <div class="productSection">
          <div class="productItem">
          <FaEgg class="product"/>
          <p>{poultryCount}</p>
          </div>
          <div class="productItem">
          <CiWheat class="product"/>
          <p>{wheatCount}</p>
          </div>
          <button className='buttonRd'>
          Filter
          <IoMdArrowDropdown/>
          </button>
        </div>
        </div> {/*End of title Sec */}
        <hr/>
      </div>
      
    </div>
  );
};

export default Shop; 