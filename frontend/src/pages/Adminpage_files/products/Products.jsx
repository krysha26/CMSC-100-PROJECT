import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHeader from '../AdminHeader';
import ProductList from './ProductList';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [newProduct, setNewProduct] = useState({
    productName: '',
    productDescription: '',
    productType: 1,
    productPrice: '',
    productQuantity: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else {
        console.error('Expected an array of products but got:', res.data);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

const handlePhotoUpload = (e) => {
  const files = Array.from(e.target.files);
  setNewProduct((prev) => ({
    ...prev,
    photos: prev.photos ? [...prev.photos, ...files] : files,  // Ensure photos is an array
  }));
};


const handleAddProduct = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/api/products', newProduct, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setProducts([...products, res.data]);
    resetForm();
    setIsModalOpen(false);
  } catch (err) {
    console.error('Error adding product:', err);
  }
};


  const resetForm = () => {
    setNewProduct({
      productName: '',
      productDescription: '',
      productType: 1,
      productPrice: '',
      productQuantity: '',
    });
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

const handleEditSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.put(
  `http://localhost:5000/api/products/${editingProduct._id}`,
  newProduct,
  {
    headers: {
      'Content-Type': 'application/json',
    },
  }
);


    setProducts(products.map((p) => (p._id === editingProduct._id ? res.data : p)));
    resetForm();
    setIsModalOpen(false);
  } catch (err) {
    console.error('Error updating product:', err);
  }
};



const handleUpdateProduct = (product) => {
  setEditingProduct(product);  // Set the product to be edited
  setNewProduct({
    productName: product.productName,
    productDescription: product.productDescription,
    productType: product.productType,
    productPrice: product.productPrice,
    productQuantity: product.productQuantity,
  });
  setIsModalOpen(true); // Open the modal
};

return (
    <div className="products-page min-h-screen">
      <AdminHeader name="Order Management" />
      <div className="content-area p-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 h-[calc(100vh-180px)]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-[#333]">
              Product List
            </h2>
            <button
              onClick={() => {
                resetForm();
                setIsModalOpen(true);
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-200"
            >
              Add Product
            </button>
          </div>
          <div className="h-[calc(100%-80px)] px-6 py-4 overflow-y-auto">
            <ProductList
              products={products}
              onDeleteProduct={handleDeleteProduct}
              onUpdateProduct={handleUpdateProduct}
            />
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}className="fixed inset-0 z-50  flex items-center justify-center p-4">

            <div className="bg-white w-full max-w-lg rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <form onSubmit={editingProduct ? handleEditSubmit : handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    value={newProduct.productName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 focus:outline-none transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    name="productType"
                    value={newProduct.productType}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 focus:outline-none transition"
                  >
                    <option value={1}>Crop</option>
                    <option value={2}>Poultry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    name="productPrice"
                    value={newProduct.productPrice}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 focus:outline-none transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="productDescription"
                    value={newProduct.productDescription}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 focus:outline-none transition"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quantity</label>
                  <input
                    type="number"
                    name="productQuantity"
                    value={newProduct.productQuantity}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 focus:outline-none transition"
                    required
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                  >
                    {editingProduct ? 'Update' : 'Add'} Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;