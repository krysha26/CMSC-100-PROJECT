import React from 'react';
import Navbar from '../components/Navbar';
import ItemCard from '../components/ItemCard';

const items = Array(8).fill({
  price: 'PXXX.XX',
  name: 'Product Name',
  stock: 'Stock: xxxx',
  category: 'Poultry',
});

const Shop = () => {
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Shop; 