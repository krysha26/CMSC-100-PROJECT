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
    photos: []
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
    // In a real application, you would upload these files to a server
    // and get back URLs. For now, we'll use FileReader to create local URLs
    const photoPromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(photoPromises).then(photoUrls => {
      setNewProduct(prev => ({
        ...prev,
        photos: [...prev.photos, ...photoUrls]
      }));
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/products', newProduct);
      setProducts([...products, res.data]);
      setNewProduct({
        productName: '',
        productDescription: '',
        productType: 1,
        productPrice: '',
        productQuantity: '',
        photos: []
      });
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };

  const handleUpdateProduct = async (product) => {
    setEditingProduct(product);
    setNewProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  return (
    <div className="products-page min-h-screen">
      <AdminHeader name="Product Management" />
      <div className="content-area p-6 flex gap-6">
        <div className="w-2/3 relative rounded-lg border border-gray-200 overflow-hidden flex-shrink-0 h-[calc(100vh-180px)]">
          <div className="product-list-card bg-white rounded-lg h-full">
            <div className="flex justify-between items-center px-6 pt-6 pb-4">
              <h2 className="text-xl font-medium text-[#333]">
                Product List
              </h2>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setNewProduct({
                    productName: '',
                    productDescription: '',
                    productType: 1,
                    productPrice: '',
                    productQuantity: '',
                    photos: []
                  });
                  setIsModalOpen(true);
                }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Product
              </button>
            </div>
            <div className="h-[calc(100%-80px)] px-6">
              <ProductList
                products={products}
                onDeleteProduct={handleDeleteProduct}
                onUpdateProduct={handleUpdateProduct}
              />
            </div>
          </div>
        </div>

        {/* Add/Edit Product Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-medium mb-4">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    value={newProduct.productName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    name="productType"
                    value={newProduct.productType}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="productDescription"
                    value={newProduct.productDescription}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Photos</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="mt-1 block w-full"
                  />
                  {newProduct.photos.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {newProduct.photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`Preview ${index + 1}`}
                          className="h-20 w-20 object-cover rounded"
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
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