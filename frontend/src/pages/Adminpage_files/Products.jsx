import { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [sortKey, setSortKey] = useState('productName');
  const [sortOrder, setSortOrder] = useState('asc');

  // Form state
  const [newProduct, setNewProduct] = useState({
    productName: '',
    productDescription: '',
    productType: 1,
    productPrice: '',
    productQuantity: ''
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

  const sortProducts = (key) => {
    const order = sortKey === key && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortKey(key);
    setSortOrder(order);

    const sorted = [...products].sort((a, b) => {
      const valA = a[key];
      const valB = b[key];

      if (typeof valA === 'string') {
        return order === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      } else {
        return order === 'asc' ? valA - valB : valB - valA;
      }
    });

    setProducts(sorted);
  };

  const renderType = (typeCode) => {
    return typeCode === 1 ? 'Crop' : typeCode === 2 ? 'Poultry' : 'Unknown';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
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
        productQuantity: ''
      });
    } catch (err) {
      console.error('Error adding product:', err);
    }
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
    <div className="adminpage-content-container">
      <h2>Product Inventory</h2>

      {/* Add Product Form */}
      <form onSubmit={handleAddProduct} className="add-product-form">
        <input
          type="text"
          name="productName"
          placeholder="Name"
          value={newProduct.productName}
          onChange={handleInputChange}
          required
        />
        <select
          name="productType"
          value={newProduct.productType}
          onChange={handleInputChange}
        >
          <option value={1}>Crop</option>
          <option value={2}>Poultry</option>
        </select>
        <input
          type="number"
          name="productPrice"
          placeholder="Price"
          value={newProduct.productPrice}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="productDescription"
          placeholder="Description"
          value={newProduct.productDescription}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="productQuantity"
          placeholder="Quantity"
          value={newProduct.productQuantity}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Product</button>
      </form>

      {/* Sort Controls */}
      <div className="sort-controls">
        <label>Sort by:</label>
        {['productName', 'productType', 'productPrice', 'productQuantity'].map((key) => (
          <button key={key} onClick={() => sortProducts(key)}>
            {key.replace('product', '')} {sortKey === key ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
          </button>
        ))}
      </div>

      {/* Product Table */}
      <table className="products-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Price (₱)</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr><td colSpan="6">No products found.</td></tr>
          ) : (
            products.map(product => (
              <tr key={product._id}>
                <td>{product.productName}</td>
                <td>{renderType(product.productType)}</td>
                <td>₱{product.productPrice}</td>
                <td>{product.productDescription}</td>
                <td>{product.productQuantity}</td>
                <td>
                  <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Products;