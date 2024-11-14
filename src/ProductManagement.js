import React, { useState, useEffect } from 'react';
import './App.css';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({ name: '', desc: '', category: '', price: '', quantity: '' });
  const [editIndex, setEditIndex] = useState(-1);

  // Fetch all products from backend
  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Handle input changes for form fields
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProduct({ ...product, [id]: value });
  };

  // Add or update product
  const addOrUpdateProduct = (e) => {
    e.preventDefault();

    // Determine whether we are adding or updating
    const method = editIndex === -1 ? 'POST' : 'PUT';
    const url = editIndex === -1 ? 'http://localhost:5000/products' : `http://localhost:5000/products/${products[editIndex].id}`;

    // Make the API call
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((newProduct) => {
        const updatedProducts = [...products];

        if (editIndex === -1) {
          // Add new product to list (POST)
          updatedProducts.push(newProduct);
        } else {
          // Update existing product (PUT)
          updatedProducts[editIndex] = newProduct;
          setEditIndex(-1);
        }

        setProducts(updatedProducts);
        setProduct({ name: '', desc: '', category: '', price: '', quantity: '' });
      })
      .catch((error) => console.error('Error adding/updating product:', error));
  };

  // Sell product (reduce quantity by 1)
  const sellProduct = (index) => {
    const productId = products[index].id;
    fetch(`http://localhost:5000/products/sell/${productId}`, { method: 'PUT' })
      .then((response) => response.json())
      .then((updatedProduct) => {
        const updatedProducts = [...products];
        updatedProducts[index] = updatedProduct;
        setProducts(updatedProducts);
      })
      .catch((error) => console.error('Error selling product:', error));
  };

  // Edit a product (populate form with current product data)
  const editProduct = (index) => {
    setEditIndex(index);
    setProduct({ ...products[index] });
  };

  // Delete a product
  const deleteProduct = (index) => {
    const productId = products[index].id;
    fetch(`http://localhost:5000/products/${productId}`, { method: 'DELETE' })
      .then(() => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
      })
      .catch((error) => console.error('Error deleting product:', error));
  };

  return (
    <div id="product-management">
      <h2>Product Management</h2>

      {/* Product Form */}
      <form onSubmit={addOrUpdateProduct} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          id="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          id="desc" 
          placeholder="descr"
          value={product.desc} 
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          id="category"
          placeholder="Category"
          value={product.category}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          id="price"
          placeholder="Price"
          value={product.price}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          id="quantity"
          placeholder="Quantity"
          value={product.quantity}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{editIndex === -1 ? 'Add Product' : 'Update Product'}</button>
      </form>

      {/* Product List Table */}
      <h3>Product List</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Product Name</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Description</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Category</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Price</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Quantity</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr key={index}>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{product.name}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{product.desc}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{product.category}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>${product.price}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{product.quantity}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  <button onClick={() => sellProduct(index)} disabled={product.quantity <= 0}>Sell</button>
                  <button onClick={() => editProduct(index)}>Edit</button>
                  <button onClick={() => deleteProduct(index)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '10px' }}>No products available. Please add products first.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
