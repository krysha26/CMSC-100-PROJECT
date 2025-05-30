import React, { useState } from 'react';
import { Pencil } from 'lucide-react';

const ProductList = ({ products, onDeleteProduct, onUpdateProduct }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'productName', direction: 'asc' });

  const sortProducts = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedProducts = [...products].sort((a, b) => {
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
    }

    const aStr = String(aVal ?? '');
    const bStr = String(bVal ?? '');
    return sortConfig.direction === 'asc'
      ? aStr.localeCompare(bStr)
      : bStr.localeCompare(aStr);
  });

  const renderType = (typeCode) => {
    return typeCode === 1 ? 'Crop' : typeCode === 2 ? 'Poultry' : 'Unknown';
  };

  return (
    <div className="flex flex-col h-full relative w-full">
      {/* Sticky header */}
      <div className="grid grid-cols-[1.5fr_1fr_1fr_2fr_1fr_1fr_0.8fr] px-4 py-3 font-bold text-gray-600 border-b border-gray-200 bg-white sticky top-0 z-10 w-full">
        <button onClick={() => sortProducts('productName')} className="text-left hover:text-gray-800">
          Product Name {sortConfig.key === 'productName' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
        </button>
        <button onClick={() => sortProducts('productType')} className="text-left hover:text-gray-800">
          Type {sortConfig.key === 'productType' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
        </button>
        <button onClick={() => sortProducts('productPrice')} className="text-left hover:text-gray-800">
          Price {sortConfig.key === 'productPrice' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
        </button>
        <span className="text-left">Description</span>
        <button onClick={() => sortProducts('productQuantity')} className="text-left hover:text-gray-800">
          Quantity {sortConfig.key === 'productQuantity' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
        </button>
        <span className="text-left flex justify-end">Actions</span>
      </div>

      {/* Scrollable content */}
      <div className="overflow-y-auto flex-1 w-full">
        {sortedProducts.length === 0 ? (
          <div className="px-4 py-4 text-center text-gray-500">
            No products found
          </div>
        ) : (
          sortedProducts.map((product) => (
            <div
              key={product._id}
              className="grid grid-cols-[1.5fr_1fr_1fr_2fr_1fr_1fr_0.8fr] px-4 py-4 border-b border-gray-100 items-center min-h-[50px] bg-white text-sm hover:bg-gray-50 w-full"
            >
              <div className="flex items-center space-x-3">
                <span className="flex justify-center items-center text-gray-800 break-words">{product.productName}</span>
              </div>
              <span className="flex text-gray-800 break-words">{renderType(product.productType)}</span>
              <span className="flex text-gray-800 break-words">₱{product.productPrice}</span>
              <span className="flex justify-center items-center text-gray-800 break-words truncate">{product.productDescription}</span>
              <span className="flex justify-center items-center text-gray-800 break-words">{product.productQuantity}</span>
              <div className="flex justify-end space-x-2 pr-1">
                <button
                  onClick={() => onUpdateProduct(product)}
                  className="inline-flex px-2.5 py-1 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
                >
                  <Pencil className="w-3 h-3" />
                </button>
                <button
                  onClick={() => onDeleteProduct(product._id)}
                  className="inline-flex px-2.5 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                >
                  ✕
                </button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;